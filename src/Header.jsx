import React, { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { header_Links } from "./constants";
import { NavLink, useLocation } from "react-router-dom";

const NavLinks = ({ className }) => {
  const location = useLocation();
  return header_Links.map((item) => {
    const isActive = location.pathname === item.path;
    const markerColor = isActive
      ? "marker:text-[#7FA396]"
      : "marker:text-[#C97B63]";
    return (
      <li key={item.label} className={`${className} ${markerColor}`}>
        <NavLink to={item.path}>{item.label}</NavLink>
      </li>
    );
  });
};

const Header = () => {
  // One boolean picks which whole block below renders — not two files, and
  // not a Tailwind md: prefix, because the nav bar and the hamburger menu
  // are genuinely different DOM/behavior (a horizontal scroll list vs. a
  // toggleable dropdown), not just a value that changes at a breakpoint.
  const isDesktop = useMediaQuery({ minWidth: 768 });
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className="sticky top-0 z-50 bg-[#1C1512] border-b border-[#3a2f26] relative">
      <div
        className={`flex justify-between items-center gap-3 md:gap-6 pl-3 md:pl-5 pr-3 md:pr-12 py-3 md:py-3.5`}
      >
        <div className="hidden sm:flex gap-2 shrink-0">
          <span className="w-3 h-3 rounded-full bg-[#C97B63]" />
          <span className="w-3 h-3 rounded-full bg-[#E7B96B]" />
          <span className="w-3 h-3 rounded-full bg-[#7FA396]" />
        </div>

        {/* Set the default color of home to green, once another tab is
            clicked, the previous dot is set to red and the new one is set
            to green. */}
        {isDesktop ? (
          // pl- leaves room for the FIRST link's bullet: the markers are
          // list-style-position:outside, so each paints to the left of its
          // own <li>. Without that padding the leading item sits flush
          // against the scroll box's edge and its bullet gets clipped.
          <nav className="flex gap-12 pl-6 divide-x-2 divide-[#3a2f26] text-[#B5AFA6] text-xl overflow-x-auto no-scrollbar">
            <NavLinks className="relative group pr-6 shrink-0 hover:-translate-y-0.5 transition-all duration-300 ease-in-out" />
          </nav>
        ) : (
          // Three bars morph into an X via rotate/translate on the same
          // duration/easing the rest of the site already uses for hover
          // transitions, so it doesn't feel like a different component
          // bolted on.
          <button
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="flex flex-col justify-center items-center gap-1.5 w-9 h-9 shrink-0"
          >
            <span
              className={`block w-6 h-0.5 bg-[#B5AFA6] transition-all duration-300 ease-in-out ${
                menuOpen ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-[#B5AFA6] transition-all duration-300 ease-in-out ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-[#B5AFA6] transition-all duration-300 ease-in-out ${
                menuOpen ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </button>
        )}
      </div>

      {/* Mobile-only dropdown. absolute + top-full takes it out of normal
          flow so it floats OVER the page below the header instead of
          expanding the header's own box — otherwise, since the header is
          sticky (not fixed), opening the menu would grow the sticky
          element's height and visibly shove the whole page down every time
          it's toggled. Still collapses via max-height (not display:none) so
          it animates open/closed instead of just popping. list-inside puts
          each marker dot right before its label instead of outside the box,
          which is simpler than the pl-6/scroll-edge dance the desktop bar
          needs. */}
      {!isDesktop && (
        <nav
          className={`absolute left-0 right-0 top-full bg-[#1C1512] overflow-hidden transition-[max-height] duration-300 ease-in-out ${
            menuOpen ? "max-h-96" : "max-h-0"
          }`}
        >
          <div className="flex flex-col border-t border-[#3a2f26] text-[#B5AFA6] text-lg">
            <NavLinks className="list-inside px-5 py-4 border-b border-[#3a2f26] last:border-b-0" />
          </div>
        </nav>
      )}
    </div>
  );
};

export default Header;
