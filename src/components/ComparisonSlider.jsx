import { useState, useRef } from 'react'
import { img } from '../data/services'
import './ComparisonSlider.css'

export default function ComparisonSlider({ beforeId, afterId, title }) {
  const [position, setPosition] = useState(50)
  const containerRef = useRef(null)

  const handleMove = (e) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = 'touches' in e ? e.touches[0].clientX : e.clientX
    const relativeX = x - rect.left
    const percent = (relativeX / rect.width) * 100
    setPosition(Math.max(0, Math.min(100, percent)))
  }

  return (
    <div className="comparison-slider-wrap">
      <h3>{title}</h3>
      <div
        ref={containerRef}
        className="comparison-slider"
        onMouseMove={handleMove}
        onTouchMove={handleMove}
      >
        <div className="image-after">
          <img src={img(afterId, { w: 1000 })} alt="After" />
          <span className="label after-label">After</span>
        </div>
        <div
          className="image-before"
          style={{ width: `${position}%` }}
        >
          <img src={img(beforeId, { w: 1000 })} alt="Before" />
          <span className="label before-label">Before</span>
        </div>
        <div
          className="slider-handle"
          style={{ left: `${position}%` }}
        >
          <div className="handle-line"></div>
          <div className="handle-button">
            <span>↔</span>
          </div>
        </div>
      </div>
    </div>
  )
}
