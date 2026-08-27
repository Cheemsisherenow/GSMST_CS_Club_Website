import React, { useState } from "react";
import { header_Links } from "./constants";
import { NavLink, useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();
  return (
    <div className="flex flex-col overflow-hidden p-12 text-[#F7F8F4] border-t-2 border-[#3a2f26] bg-[#241C18]">
      <div className="grid grid-cols-[3fr_2fr] justify-between">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <img src="/CSClubLogo.png" className="object-contain w-16 h-16" />
            <div className="text-4xl">GSMST CS Club Website</div>
          </div>
          <div className="text-2xl text-[#B5AFA6]">
            We are the best, the greatest, and also the best best best best best
            best best best best best best club in GSMST. Did I mention we are
            the best club in GSMST?
          </div>
        </div>
        <nav className="flex text-2xl justify-end">
          <div>
            <div className="text-4xl h-16 flex items-center">Navigation</div>
            <div className="flex flex-col items-start list-inside text-[#B5AFA6]">
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
            </div>
          </div>
        </nav>
      </div>
      <div className="flex border-t-2 border-[#3a2f26] mt-12 pt-12 text-3xl">
        © 2026 GSMST CS Club. All rights reserved.
      </div>
    </div>
  );
};

export default Footer;
