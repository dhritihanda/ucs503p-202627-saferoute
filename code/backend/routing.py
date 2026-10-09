import heapq, math
from database import get_nodes
from safety import eff_risk, level

WALK_M_PER_MIN = 83


def haversine(a, b):
    p = math.pi / 180
    x = (math.sin((b[1] - a[1]) * p / 2) ** 2 +
         math.cos(a[1] * p) * math.cos(b[1] * p) * math.sin((b[2] - a[2]) * p / 2) ** 2)
    return 12742000 * math.asin(math.sqrt(x))


def dijkstra(db, nodes, src, dst, mode, night):
    """Fastest: cost = distance. Safest: cost = distance * (1 + 4 * risk)."""
    adj = {}
    for e in db.execute("SELECT * FROM edges"):
        d = haversine(nodes[e["u"]], nodes[e["v"]])
        r = eff_risk(e["risk"], night)
        w = d * (1 + 4 * r) if mode == "safest" else d
        for a, b in ((e["u"], e["v"]), (e["v"], e["u"])):
            adj.setdefault(a, []).append((b, w, d, r, e))
    queue, seen, prev = [(0, src, None)], set(), {}
    while queue:
        cost, node, p = heapq.heappop(queue)
        if node in seen:
            continue
        seen.add(node)
        prev[node] = p
        if node == dst:
            break
        for b, w, d, r, e in adj.get(node, []):
            if b not in seen:
                heapq.heappush(queue, (cost + w, b, (node, d, r, e)))
    if dst not in prev:
        return None
    legs, n = [], dst
    while prev[n]:
        p, d, r, e = prev[n]
        legs.append((p, n, d, r, e))
        n = p
    return legs[::-1]


def build_route(db, src, dst, night):
    nodes = get_nodes(db)
    result = {}
    for mode in ("fastest", "safest"):
        legs = dijkstra(db, nodes, src, dst, mode, night)
        if not legs:
            return None
        dist = sum(l[2] for l in legs)
        coords = [[nodes[legs[0][0]][1], nodes[legs[0][0]][2]]] + \
                 [[nodes[l[1]][1], nodes[l[1]][2]] for l in legs]
        steps = [{"text": f"Continue on {l[4]['name']}", "to": nodes[l[1]][0],
                  "meters": round(l[2]), "minutes": max(1, round(l[2] / WALK_M_PER_MIN)),
                  "risk": round(l[3], 2), "note": l[4]["note"], "level": level(l[3])} for l in legs]
        result[mode] = {"coords": coords, "meters": round(dist),
                        "minutes": round(dist / WALK_M_PER_MIN),
                        "avg_risk": round(sum(l[2] * l[3] for l in legs) / dist, 2),
                        "steps": steps,
                        "risk_points": [s for s in steps if s["level"] == "risk"]}
    result["diverges"] = result["fastest"]["coords"] != result["safest"]["coords"]
    return result