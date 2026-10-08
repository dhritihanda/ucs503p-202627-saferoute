import { useState } from "react";
import "./App.css";

const ISSUE_ICONS = {
  "Poor lighting": (
    <svg viewBox="0 0 20 20" fill="none">
      <path
        d="M10 2v2M10 16v2M4 10H2M18 10h-2M5 5l1.4 1.4M13.6 13.6L15 15M15 5l-1.4 1.4M6.4 13.6L5 15"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <circle cx="10" cy="10" r="3.4" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  ),
  "Isolated area": (
    <svg viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="7" r="3" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M4.5 17c0-3 2.5-5.2 5.5-5.2s5.5 2.2 5.5 5.2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path d="M15.5 4.5l2 2M17.5 4.5l-2 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  ),
  "Past incident": (
    <svg viewBox="0 0 20 20" fill="none">
      <path
        d="M10 2 2 5.5v4c0 5 3.5 7.6 8 8.5 4.5-.9 8-3.5 8-8.5v-4L10 2Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M10 6.5v4.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="10" cy="13.2" r="0.9" fill="currentColor" />
    </svg>
  ),
  Construction: (
    <svg viewBox="0 0 20 20" fill="none">
      <path
        d="M2.5 16 8 5.5 10 9l2-3.5L17.5 16"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <path d="M2.5 16h15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
  "Stray animals": (
    <svg viewBox="0 0 20 20" fill="none">
      <path
        d="M6 8c-1.8 0-3-1.4-3-2.8 0-.8.6-1.4 1.4-1.4 1.3 0 2.4 1.6 2.6 3M14 8c1.8 0 3-1.4 3-2.8 0-.8-.6-1.4-1.4-1.4-1.3 0-2.4 1.6-2.6 3"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <ellipse cx="10" cy="11.5" rx="5.5" ry="4.3" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="8.1" cy="11" r="0.6" fill="currentColor" />
      <circle cx="11.9" cy="11" r="0.6" fill="currentColor" />
    </svg>
  ),
};

function App() {
  const [screen, setScreen] = useState("home");
  const [view, setView] = useState("route");
  const [routeType, setRouteType] = useState("safest");
  const [issues, setIssues] = useState([]);

  const toggleIssue = (issue) => {
    setIssues((current) =>
      current.includes(issue)
        ? current.filter((item) => item !== issue)
        : [...current, issue]
    );
  };

  if (screen === "report") {
    return (
      <div className="app">
        <header className="topbar">
          <div className="brand" onClick={() => setScreen("home")}>
            <div className="brand-mark">
              <span>SR</span>
            </div>
            <span className="brand-name">SafeRoute</span>
          </div>

        </header>

        <main className="page report-page">
          <button className="back-button" onClick={() => setScreen("home")}>
            <svg viewBox="0 0 20 20" fill="none" width="14" height="14">
              <path
                d="M12.5 4 6.5 10l6 6"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Back to map
          </button>

          <div className="report-header">
            <p className="eyebrow">Community safety</p>
            <h1>Report this stretch</h1>
            <p>Help improve SafeRoute for everyone.</p>
          </div>

          <div className="report-card">
            <div className="location-box">
              <span className="location-icon">
                <svg viewBox="0 0 20 20" fill="none" width="18" height="18">
                  <path
                    d="M10 18s6-5.2 6-10a6 6 0 1 0-12 0c0 4.8 6 10 6 10Z"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  />
                  <circle cx="10" cy="8" r="2.2" stroke="currentColor" strokeWidth="1.6" />
                </svg>
              </span>
              <div>
                <small>Current location</small>
                <strong>Thapar Gate 1, Patiala</strong>
              </div>
            </div>

            <div className="section">
              <label>What did you notice?</label>
              <p className="section-hint">Select all issues you noticed</p>

              <div className="issue-grid">
                {[
                  "Poor lighting",
                  "Isolated area",
                  "Past incident",
                  "Construction",
                  "Stray animals",
                ].map((issue) => (
                  <button
                    key={issue}
                    className={`issue-button ${
                      issues.includes(issue) ? "selected" : ""
                    }`}
                    onClick={() => toggleIssue(issue)}
                  >
                    <span className="issue-icon">{ISSUE_ICONS[issue]}</span>
                    {issue}
                    {issues.includes(issue) && (
                      <span className="issue-check">
                        <svg viewBox="0 0 16 16" fill="none" width="12" height="12">
                          <path
                            d="M3.5 8.3 6.4 11l6-6.4"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="section">
              <label htmlFor="note">Additional details</label>
              <textarea
                id="note"
                placeholder="Describe what you saw, when, and anything nearby users should know."
              />
            </div>

            <button
              className="primary-button"
              onClick={() => setScreen("home")}
            >
              Submit report
            </button>
          </div>
        </main>
      </div>
    );
  }

  if (screen === "sos") {
    return (
      <div className="app app-sos">
        <header className="topbar">
          <div className="brand" onClick={() => setScreen("home")}>
            <div className="brand-mark">
              <span>SR</span>
            </div>
            <span className="brand-name">SafeRoute</span>
          </div>

          
        </header>

        <main className="page sos-page">
          <button className="back-button" onClick={() => setScreen("home")}>
            <svg viewBox="0 0 20 20" fill="none" width="14" height="14">
              <path
                d="M12.5 4 6.5 10l6 6"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Back to map
          </button>

          <div className="sos-header">
            <div className="sos-symbol">
              <span className="sos-symbol-ring ring-1"></span>
              <span className="sos-symbol-ring ring-2"></span>
              <span className="sos-symbol-core">SOS</span>
            </div>
            <p className="eyebrow">Emergency assistance</p>
            <h1>Need help?</h1>
            <p>Your location can be shared with your emergency contact.</p>
          </div>

          <div className="sos-card">
            <div className="sos-step">
              <span>01</span>
              <div>
                <strong>Hold the SOS button</strong>
                <p>Hold for 3 seconds to activate.</p>
              </div>
            </div>

            <div className="sos-step">
              <span>02</span>
              <div>
                <strong>Location is shared</strong>
                <p>Your current location is sent to your contact.</p>
              </div>
            </div>

            <div className="sos-step">
              <span>03</span>
              <div>
                <strong>Stand down</strong>
                <p>You can cancel the alert if help is no longer needed.</p>
              </div>
            </div>

            <div className="emergency-contact">
              <div className="emergency-contact-info">
                <small>Emergency contact</small>
                <strong>Mom</strong>
                <span className="emergency-contact-number">+91 XXXXX XXXXX</span>
              </div>
              <span className="location-ready">
                <span className="location-ready-dot"></span>
                Location ready to share
              </span>
            </div>

            <button className="sos-button" onClick={() => setScreen("home")}>
              <span>Hold to activate SOS</span>
              <small>Hold for 3 seconds</small>
            </button>

            <button className="cancel-button" onClick={() => setScreen("home")}>
              Cancel
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="topbar">
        <div className="brand">
          <div className="brand-mark">
            <span>SR</span>
          </div>
          <span className="brand-name">SafeRoute</span>
        </div>

      
      </header>

      <main className="page">
        {/* LOCATION BAR */}
        <section className="navigation-section">
          <div className="location-card">
            <div className="location-row">
              <span className="dot from-dot"></span>

              <div className="location-text">
                <small>From</small>
                <strong>Thapar Gate 1</strong>
              </div>
            </div>

            <div className="location-line"></div>

            <div className="location-row">
              <span className="dot to-dot"></span>

              <div className="location-text">
                <small>To</small>
                <strong>Rajpura Bus Stand</strong>
              </div>
            </div>
          </div>

          <div className="route-toggle">
            <button
              className={routeType === "fastest" ? "active" : ""}
              onClick={() => setRouteType("fastest")}
            >
              <svg viewBox="0 0 16 16" fill="none" width="13" height="13">
                <path
                  d="M2 8.5h7M6 4.5l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Fastest
            </button>

            <button
              className={routeType === "safest" ? "active" : ""}
              onClick={() => setRouteType("safest")}
            >
              <svg viewBox="0 0 16 16" fill="none" width="13" height="13">
                <path
                  d="M8 1.5 13 3.4v3.9c0 3.5-2.1 5.9-5 6.7-2.9-.8-5-3.2-5-6.7V3.4L8 1.5Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
              </svg>
              Safest
            </button>
          </div>
        </section>

        {/* STATUS */}
        <section className="status-row">
          <div className="safe-status">
            <span className="status-dot"></span>
            <strong>
              {routeType === "safest"
                ? "Safe corridor active"
                : "Fast route selected"}
            </strong>
          </div>

          <span className="night-mode">Night mode · 9:42 PM</span>

          <span className="route-time">
            {routeType === "safest" ? "14 min · +340m vs fastest" : "12 min"}
          </span>

          <div className="safety-score-chip">
            <span className="safety-score-value">92</span>
            <span className="safety-score-meta">
              <small>Safety score</small>
              <strong>Low risk</strong>
            </span>
          </div>
        </section>

        {/* VIEW TABS */}
        <div className="view-tabs">
          <button
            className={view === "route" ? "active" : ""}
            onClick={() => setView("route")}
          >
            Route
          </button>

          <button
            className={view === "heatmap" ? "active" : ""}
            onClick={() => setView("heatmap")}
          >
            Safety heatmap
          </button>
        </div>

        {/* MAIN CONTENT */}
        <section className="map-layout">
          <div className="map-container">
            {view === "route" ? (
              <div className="fake-map route-map">
                <div className="road road-1"></div>
                <div className="road road-2"></div>
                <div className="road road-3"></div>
                <div className="road road-minor road-4"></div>
                <div className="road road-minor road-5"></div>
                <div className="map-block block-1"></div>
                <div className="map-block block-2"></div>

                <div className="route-line-glow"></div>
                <div className="route-line"></div>
                <span className="route-checkpoint checkpoint-1"></span>
                <span className="route-checkpoint checkpoint-2"></span>

                <div className="map-pin start-pin">A</div>
                <div className="map-pin end-pin">B</div>

                <div className="map-label label-1">Thapar Gate 1</div>
                <div className="map-label label-2">Rajpura Bus Stand</div>

                <div className="map-status">
                  <span className="map-status-dot"></span>
                  {routeType === "safest" ? "Safest route" : "Fastest route"}
                </div>

                <div className="map-route-card">
                  <div className="map-route-card-top">
                    <span className="map-route-score">92</span>
                    <div>
                      <strong>Safety score</strong>
                      <span className="risk-pill">Low risk</span>
                    </div>
                  </div>
                  <ul className="map-route-checklist">
                    <li>Well lit</li>
                    <li>Safe corridor</li>
                    <li>Low incident density</li>
                  </ul>
                  <div className="map-route-card-bottom">
                    <span>14 min</span>
                    <span>4.2 km</span>
                  </div>
                </div>

                <div className="map-controls">
                  <button aria-label="Zoom in">+</button>
                  <button aria-label="Zoom out">−</button>
                  <button aria-label="Recenter">
                    <svg viewBox="0 0 16 16" fill="none" width="13" height="13">
                      <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.5" />
                      <path
                        d="M8 1v2.4M8 12.6V15M1 8h2.4M12.6 8H15"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ) : (
              <div className="fake-map heatmap-map">
                <div className="heat-zone zone-1"></div>
                <div className="heat-zone zone-2"></div>
                <div className="heat-zone zone-3"></div>
                <div className="heat-zone zone-4"></div>

                <div className="road road-1"></div>
                <div className="road road-2"></div>
                <div className="road road-3"></div>

                <div className="route-line heatmap-route-line"></div>

                <span className="incident-marker marker-1"></span>
                <span className="incident-marker marker-2"></span>
                <span className="incident-marker marker-3"></span>

                <div className="map-controls">
                  <button aria-label="Zoom in">+</button>
                  <button aria-label="Zoom out">−</button>
                  <button aria-label="Recenter">
                    <svg viewBox="0 0 16 16" fill="none" width="13" height="13">
                      <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.5" />
                      <path
                        d="M8 1v2.4M8 12.6V15M1 8h2.4M12.6 8H15"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                </div>

                <div className="heatmap-legend">
                  <strong>Safety level</strong>
                  <div className="legend-row">
                    <span className="legend-dot dot-low"></span>
                    Low risk
                  </div>
                  <div className="legend-row">
                    <span className="legend-dot dot-mid"></span>
                    Moderate
                  </div>
                  <div className="legend-row">
                    <span className="legend-dot dot-high"></span>
                    High risk
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* DIRECTIONS */}
          <aside className="directions">
            <div className="directions-header">
              <div>
                <small>Next turn</small>
                <h2>Continue straight</h2>
              </div>

              <span className="turn-icon">
                <svg viewBox="0 0 24 24" fill="none" width="22" height="22">
                  <path
                    d="M12 19V5M12 5l-6 6M12 5l6 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>

            <div className="distance">
              <strong>240 m</strong>
              <span>·</span>
              <span>about 3 min</span>
            </div>

            <div className="directions-list">
              <div className="direction-item current">
                <span>1</span>
                <div>
                  <strong>Continue straight</strong>
                  <p>on Bhadson Road</p>
                </div>
              </div>

              <div className="direction-item">
                <span>2</span>
                <div>
                  <strong>Turn left</strong>
                  <p>towards Rajpura Road</p>
                </div>
              </div>

              <div className="direction-item">
                <span>3</span>
                <div>
                  <strong>Arrive</strong>
                  <p>Rajpura Bus Stand</p>
                </div>
              </div>
            </div>
          </aside>
        </section>

        {/* ACTION BUTTONS */}
        <div className="action-buttons">
          <button
            className="report-button"
            onClick={() => setScreen("report")}
          >
            <svg viewBox="0 0 18 18" fill="none" width="15" height="15">
              <path d="M3 2v14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              <path
                d="M3 3h9.5l-1.6 2.6L12.5 8H3"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
            </svg>
            Report
          </button>

          <button className="sos-floating" onClick={() => setScreen("sos")}>
            <span className="sos-floating-pulse"></span>
            SOS
          </button>
        </div>
      </main>
    </div>
  );
}

export default App;