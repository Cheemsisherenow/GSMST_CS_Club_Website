import React, { useState } from "react";
import { header_Links } from "./constants";
import { NavLink, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  return (
    <div className="sticky top-0 z-50 flex justify-between bg-[#1C1512] items-center gap-3 md:gap-6 pl-3 md:pl-5 pr-3 md:pr-12 py-3 md:py-3.5 border-b border-[#3a2f26]">
      <div className="hidden sm:flex gap-2 shrink-0">
        <span className="w-3 h-3 rounded-full bg-[#C97B63]" />
        <span className="w-3 h-3 rounded-full bg-[#E7B96B]" />
        <span className="w-3 h-3 rounded-full bg-[#7FA396]" />
      </div>
      {/* Nav bar right here, set the default color of home to green, once another tab is clicked,
      the previous dot is set to red and the new one is set to green.
      On small screens the links scroll horizontally rather than wrapping — the
      header is sticky, so a wrapped second row would eat vertical space on
      every page. */}
      <nav className="flex gap-4 md:gap-12 divide-x-2 divide-[#3a2f26] text-[#B5AFA6] text-sm md:text-xl overflow-x-auto no-scrollbar">
        {header_Links.map((item) => {
          const isActive = location.pathname === item.path;
          let markerColor = "marker:text-[#C97B63]";
          if (isActive) {
            markerColor = "marker:text-[#7FA396]";
          }
          return (
            <li
              key={item.label}
              className={`relative group pr-2 md:pr-6 shrink-0 hover:-translate-y-0.5 transition-all duration-300 ease-in-out ${markerColor}`}
            >
              <NavLink to={item.path}>{item.label}</NavLink>
              <span className="absolute -left-4 right-6 bottom-0 h-0.5 bg-[#B5AFA6] scale-x-0 origin-center transition-all duration-300 ease-in-out group-hover:scale-x-100"></span>{" "}
            </li>
          );
        })}
      </nav>
    </div>
  );
};

export default Header;
