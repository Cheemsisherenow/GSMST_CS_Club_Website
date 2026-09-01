import React, { useState, useEffect, useRef } from "react";
import Typewriter from "../Typewriter";
import { CodeLine, CodeSection, RowBlock } from "../CodeLine";
import { supabase } from "../supabaseClient";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TODAY = new Date().toLocaleDateString("en-US", {
  weekday: "long",
  month: "long",
  day: "numeric",
  year: "numeric",
});

// Formats a plain "YYYY-MM-DD" string as e.g. "Aug 28". Doesn't just do
// `new Date(event.date)` — that parses a bare date string as UTC midnight,
// which toLocaleDateString can then roll back a day once it's converted to
// a timezone behind UTC (US timezones all are). Splitting it and building
// the Date from local year/month/day components sidesteps that entirely.
function formatEventDate(dateString) {
  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

// NOTE: assumes the "events" table has a `type` column whose values match
// EVENT_FILTERS' `type` values exactly ("meeting" / "volunteer" /
// "competition", case-insensitive) — update EVENT_FILTERS below if your
// actual data uses different values.
function Events({ activeFilter, maxHeight }) {
  const [events, setEvents] = useState([]);
  const listRef = useRef(null);

  useEffect(() => {
    supabase
      .from("events")
      .select("*")
      .then(({ data, error }) => {
        if (error) console.error(error);
        else setEvents(data);
      });
  }, []);

  const visibleEvents = activeFilter
    ? events.filter(
        (event) => event.type?.trim().toLowerCase() === activeFilter
      )
    : events;

  // Cards don't all appear the moment the data loads — each one fades/slides
  // in only once it scrolls into view *within the list's own scrollbar*
  // (scroller: listRef, not the page), so scrolling down reveals them one
  // at a time instead of dumping the whole list on screen at once.
  useGSAP(
    () => {
      const cards = gsap.utils.toArray(listRef.current.children);
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { autoAlpha: 0, y: 60 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 1.4,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              scroller: listRef.current,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    },
    {
      scope: listRef,
      dependencies: [visibleEvents.map((event) => event.id).join(",")],
    }
  );

  return (
    <div
      ref={listRef}
      // Pinned to the calendar iframe's actual rendered height (measured by
      // the parent via ResizeObserver, same pattern as ResourceFolders in
      // Resources.jsx) so the list's bottom lines up with the iframe's
      // bottom instead of stopping short or running past it. Null on mobile
      // (stacked layout) and before the first measurement, where the CSS
      // max-height below takes over instead.
      style={maxHeight ? { height: maxHeight } : undefined}
      className="events-scroll flex flex-col gap-4 overflow-y-auto pr-2 max-h-[70vh] md:max-h-none"
    >
      {visibleEvents.map((event) => (
        <div
          key={event.id}
          className="bg-[#F4EFE8] rounded-xl p-6 text-black"
        >
          {/* image_url is optional — rows added before you started attaching
              images (or ones that just don't have one) simply skip this. */}
          {event.image_url && (
            <img
              src={event.image_url}
              alt={event.title || ""}
              className="w-full h-40 object-cover rounded-lg mb-4"
            />
          )}
          <div className="text-lg text-[#C97B63] mb-1">
            {formatEventDate(event.date)}
          </div>
          <div className="text-2xl font-bold text-[#C97B63] mb-2">
            {event.title}
          </div>
          <div className="text-lg mb-4">{event.description}</div>
          <a
            href={event.link}
            className="flex justify-end text-lg font-bold hover:opacity-70 transition-opacity"
          >
            # More Info &gt;&gt;
          </a>
        </div>
      ))}
    </div>
  );
}

const Calendar = () => {
  return (
    <CodeSection
      className="bg-[#1C1512] overflow-hidden border border-[#3a2f26]"
      contentClassName="pr-[calc(var(--row)*13/18)] text-[#f4efe8]"
      after={<EmbbededCalendar />}
    >
          <CodeLine>
            <span className="text-[#C97B63]">from</span>{" "}
            <span className="text-[#E7B96B]">datetime</span>{" "}
            <span className="text-[#C97B63]">import</span>{" "}
            <span className="text-[#E7B96B]">date</span>
          </CodeLine>
          <CodeLine>{""}</CodeLine>
          <CodeLine>
            <span className="text-[#453D34]"># Want to know whats next?</span>
          </CodeLine>
          <CodeLine>
            <span className="text-[#C97B63]">def</span>{" "}
            <span className="text-[#E7B96B]">calendar</span>():
          </CodeLine>
          <CodeLine>
            &nbsp;&nbsp;today = date.
            <span className="text-[#7FA396]">today</span>()
          </CodeLine>
          <CodeLine>
            &nbsp;&nbsp;<span className="text-[#C97B63]">return</span> (
          </CodeLine>
          <CodeLine>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <span className="text-[#7FA396]">'''</span>
          </CodeLine>

          {/* Date line + headline snapped together as one block. */}
          <RowBlock className="pl-[calc(var(--row)*4/3)]">
            <div className="text-[length:calc(var(--row)*2/3)] leading-[calc(var(--row)*8/9)] text-[#cfc3ae] mb-[calc(var(--row)*2/9)] whitespace-nowrap">
              {TODAY}
            </div>
            <h1 className="code-h1 text-[#E7B96B] leading-none whitespace-nowrap">
              <Typewriter>
                Live schedules
                <br />
                and events
                <br />
                in one place
              </Typewriter>
            </h1>
          </RowBlock>

          <CodeLine>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <span className="text-[#B5AFA6]">
              We post competitions, volunteering,
            </span>
          </CodeLine>
          <CodeLine>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <span className="text-[#B5AFA6]">
              meetings, and deadlines here so
            </span>
          </CodeLine>
          <CodeLine>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <span className="text-[#B5AFA6]">nobody misses what's next</span>
          </CodeLine>
          <CodeLine>{""}</CodeLine>
          <CodeLine>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <span className="text-[#7FA396]">'''</span>
          </CodeLine>
          <CodeLine>&nbsp;&nbsp;)</CodeLine>
          <CodeLine>{""}</CodeLine>
    </CodeSection>
  );
};

// Filter labels + their pill colors, matching the palette used elsewhere
// on the site (e.g. the division accent colors on the Divisions page).
// activeFilter (null = show everything) gets passed down to <Events> to
// actually filter the list, not just toggle the pill's own look.
const EVENT_FILTERS = [
  { label: "Meetings", type: "meeting", color: "#C97B63" },
  { label: "Volunteer", type: "volunteer", color: "#E7B96B" },
  { label: "Competitions", type: "competition", color: "#7FA396" },
];

const EmbbededCalendar = () => {
  const [activeFilter, setActiveFilter] = useState(null);
  const leftColRef = useRef(null);
  const headerRef = useRef(null);
  const [eventsHeight, setEventsHeight] = useState(null);

  // Whatever's left of the left column's height (heading + calendar iframe)
  // below the right column's own heading/filters block, so the events list's
  // bottom edge lines up with the iframe's bottom edge instead of stopping
  // short at a guessed height or running past it.
  //
  // Only meaningful while the two are actually side by side. Below `md` they
  // stack, so the calendar's bottom sits ABOVE the events heading and that
  // subtraction goes negative — fall back to null there and let the list use
  // its own CSS height instead.
  useEffect(() => {
    const sideBySide = window.matchMedia("(min-width: 768px)");

    function measure() {
      if (!leftColRef.current || !headerRef.current) return;
      if (!sideBySide.matches) {
        setEventsHeight(null);
        return;
      }
      const leftBottom = leftColRef.current.getBoundingClientRect().bottom;
      const headerBottom = headerRef.current.getBoundingClientRect().bottom;
      const GAP = 16; // matches the right column's `gap-4`
      setEventsHeight(Math.max(leftBottom - headerBottom - GAP, 0));
    }
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(leftColRef.current);
    ro.observe(headerRef.current);
    window.addEventListener("resize", measure);
    sideBySide.addEventListener("change", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
      sideBySide.removeEventListener("change", measure);
    };
  }, []);

  const toggleFilter = (type) => {
    setActiveFilter((current) => (current === type ? null : type));
  };

  return (
    <div className="bg-[#1C1512] overflow-hidden border-t border-[#3a2f26] p-4 md:p-12">
      <div className="grid grid-cols-1 md:grid-cols-[3fr_1fr] gap-6 md:gap-2">
        <div ref={leftColRef} className="flex flex-col gap-4">
          <div className="text-3xl md:text-6xl text-[#E7B96B]">
            Monthly Calendar
          </div>
          <iframe
            title="GSMST CS Club Calendar"
            src="https://calendar.google.com/calendar/embed?src=classroom110591615948810464127%40group.calendar.google.com&ctz=America%2FNew_York"
            style={{ border: 0 }}
            className="w-full aspect-4/3 rounded-lg bg-[#F4EFE8]"
          ></iframe>
        </div>
        <div className="flex flex-col gap-4">
          <div ref={headerRef} className="flex flex-col gap-2 ">
            <div className="text-3xl md:text-6xl text-[#E7B96B] mb-2">
              Upcoming
            </div>
            <div className="grid grid-cols-2 gap-2">
              {EVENT_FILTERS.slice(0, 2).map((f) => (
                <button
                  key={f.label}
                  onClick={() => toggleFilter(f.type)}
                  className="rounded-lg py-3 text-xl text-black"
                  style={{
                    backgroundColor: f.color,
                    opacity: activeFilter && activeFilter !== f.type ? 0.4 : 1,
                  }}
                >
                  {f.label}
                </button>
              ))}
            </div>
            {EVENT_FILTERS.slice(2).map((f) => (
              <button
                key={f.label}
                onClick={() => toggleFilter(f.type)}
                className="rounded-lg py-3 text-xl font-bold text-black"
                style={{
                  backgroundColor: f.color,
                  opacity: activeFilter && activeFilter !== f.type ? 0.4 : 1,
                }}
              >
                {f.label}
              </button>
            ))}
          </div>
          <Events activeFilter={activeFilter} maxHeight={eventsHeight} />
        </div>
      </div>
    </div>
  );
};

export default Calendar;
