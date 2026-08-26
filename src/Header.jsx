import React, { useState } from "react";
import { header_Links } from "./constants";
import { NavLink, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  return (
    <div className="sticky top-0 z-50 flex justify-between bg-[#1C1512] items-center gap-6 pl-5 pr-12 py-3.5 border-b border-[#3a2f26]">
      <div className="flex gap-2">
        <span className="w-3 h-3 rounded-full bg-[#C97B63]" />
        <span className="w-3 h-3 rounded-full bg-[#E7B96B]" />
        <span className="w-3 h-3 rounded-full bg-[#7FA396]" />
      </div>
      {/* Nav bar right here, set the default color of home to green, once another tab is clicked, 
      the previous dot is set to red and the new one is set to green */}
      <nav className="flex gap-12 text-[#B5AFA6] text-xl">
        {header_Links.map((item) => {
          const isActive = location.pathname === item.path;
          let markerColor = "marker:text-[#C97B63]";
          if (isActive) {
            markerColor = "marker:text-[#7FA396]";
          }
          return (
            <li key={item.label} className={markerColor}>
              <NavLink to={item.path}>{item.label}</NavLink>
            </li>
          );
        })}
      </nav>
    </div>
  );
};

export default Header;
