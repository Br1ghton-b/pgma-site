import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Contact from './pages/Contact'
import Booking from './pages/Booking'
import Visit from './pages/Visit'
import Reviews from './pages/Reviews'
import Gifting from './pages/Gifting'
import Concerns from './pages/Concerns'
import Education from './pages/Education'
import NotFound from './pages/NotFound'
import { HelmetProvider } from 'react-helmet-async'
import { SpeedInsights } from '@vercel/speed-insights/react'

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/education/:id" element={<Education />} />
            <Route path="/concerns" element={<Concerns />} />
            <Route path="/gifting" element={<Gifting />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/visit" element={<Visit />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <SpeedInsights />
    </HelmetProvider>
  )
}

export default App
