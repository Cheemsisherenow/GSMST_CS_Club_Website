import React from 'react'
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home'
import Divisions from './pages/Divisions'
import Calandar from './pages/Calendar'
import Gallery from './pages/Gallery'
import Officers from './pages/Officers'
import Resources from './pages/Resources'
import Header from './Header'
import ScrollTop from './ScrollTop';
import Footer from './Footer';

const App = () => {
  return (
    <>
      <Header />
      <ScrollTop/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/divisions" element={<Divisions />} />
        <Route path="/calendar" element={<Calandar />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/officers" element={<Officers />} />
        <Route path="/resources" element={<Resources />} />
      </Routes>
      <Footer/>
    </>
  );
}

export default App
