import { useState, useMemo } from 'react'
import { travelAreas, travelAreaStatus } from '../data/services'
import './TravelMap.css'

export default function TravelMap() {
  const [suburb, setSuburb] = useState('')
  const status = useMemo(() => travelAreaStatus(suburb), [suburb])

  return (
    <section className="section travel-map-section">
      <div className="container travel-map-grid">
        <div className="travel-map-text">
          <span className="eyebrow">Service Area</span>
          <h2>Where we travel.</h2>
          <p>We bring the studio to most of Greater Johannesburg. Check your area below — if you're just outside, we may still come for a small travel fee.</p>
          
          <div className="travel-checker">
            <label htmlFor="suburb-check">Check your suburb</label>
            <div className="travel-checker-input">
              <input
                id="suburb-check"
                type="text"
                placeholder="e.g. Randburg"
                value={suburb}
                onChange={(e) => setSuburb(e.target.value)}
                list="travel-suburb-list"
              />
              <datalist id="travel-suburb-list">
                {[...travelAreas.included, ...travelAreas.askFirst].map((a) => (
                  <option key={a} value={a} />
                ))}
              </datalist>
            </div>

            {status && (
              <div className={`travel-status travel-status-${status.status}`}>
                {status.status === 'included' && (
                  <p>✓ <strong>{status.match}</strong> is in our regular travel radius.</p>
                )}
                {status.status === 'ask' && (
                  <p>Expect a small travel fee for <strong>{status.match}</strong>. Confirm on WhatsApp.</p>
                )}
                {status.status === 'unknown' && (
                  <p>We may still come to <strong>{status.match}</strong>. <a href="https://wa.me/27635149482">Ask us</a>.</p>
                )}
              </div>
            )}
          </div>

          <div className="travel-zones">
            <div className="travel-zone">
              <div className="zone-indicator zone-included"></div>
              <div>
                <strong>Included Area</strong>
                <p>{travelAreas.included.join(', ')}</p>
              </div>
            </div>
            
            <div className="travel-zone">
              <div className="zone-indicator zone-ask"></div>
              <div>
                <strong>Extended Radius (Ask first)</strong>
                <p>{travelAreas.askFirst.join(', ')}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="travel-map-visual">
          <div className="map-placeholder">
            <div className="map-circle outer-circle"></div>
            <div className="map-circle inner-circle"></div>
            <div className="map-pin">📍</div>
            <span className="map-label">Roodepoort HQ</span>
          </div>
        </div>
      </div>
    </section>
  )
}
