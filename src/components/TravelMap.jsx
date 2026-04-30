import { travelAreas } from '../data/services'
import './TravelMap.css'

export default function TravelMap() {
  return (
    <section className="section travel-map-section">
      <div className="container travel-map-grid">
        <div className="travel-map-text">
          <span className="eyebrow">Service Area</span>
          <h2>Where we travel.</h2>
          <p>We bring the studio to most of Greater Johannesburg. Check your area below — if you're just outside, we may still come for a small travel fee.</p>
          
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
