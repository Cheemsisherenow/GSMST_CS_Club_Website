import React from 'react'
import { Routes, Route, useLocation } from "react-router-dom";
import Home from './pages/Home'
import Divisions from './pages/Divisions'
import Calandar from './pages/Calendar'
import Gallery from './pages/Gallery'
import Officers from './pages/Officers'
import Resources from './pages/Resources'
import Header from './Header'
import ScrollTop from './ScrollTop';
import Footer from './Footer';
import ErrorBoundary from './ErrorBoundary';

const App = () => {
  const location = useLocation();
  return (
    <>
      <Header />
      <ScrollTop/>
      {/* resetKey={location.pathname}: if a render ever throws (see
          ErrorBoundary.jsx for why), the next route change is the recovery
          point instead of needing a manual reload. */}
      <ErrorBoundary resetKey={location.pathname}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/divisions" element={<Divisions />} />
          <Route path="/calendar" element={<Calandar />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/officers" element={<Officers />} />
          <Route path="/resources" element={<Resources />} />
        </Routes>
      </ErrorBoundary>
      <Footer/>
    </>
  );
}

export default App
