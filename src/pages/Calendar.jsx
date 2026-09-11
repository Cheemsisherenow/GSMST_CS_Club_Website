import React, { useState, useEffect, useRef } from "react";
import { useMediaQuery } from "react-responsive";
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

function formatEventDate(dateString) {
  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

const EVENTS_PAGE_SIZE = 5;

function Events({ activeFilter }) {
  const [events, setEvents] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  function fetchPage(from) {
    let query = supabase
      .from("events")
      .select("*")
      .order("date", { ascending: true })
      .range(from, from + EVENTS_PAGE_SIZE - 1);
    // Filtering server-side (not the old client-side .filter on the fully
    // loaded list) is what makes pagination and the filter buttons work
    // together correctly — filtering AFTER paging in would mean a page of
    // mixed-type events could come back nearly empty even though more
    // matching ones exist further down.
    if (activeFilter) query = query.ilike("type", activeFilter);
    return query;
  }

  // Reload from the start whenever the active filter changes (this also
  // covers the initial mount, since activeFilter starts defined at null).
  useEffect(() => {
    setLoading(true);
    fetchPage(0).then(({ data, error }) => {
      if (error) console.error(error);
      setEvents(data || []);
      setHasMore((data?.length || 0) === EVENTS_PAGE_SIZE);
      setLoading(false);
    });
  }, [activeFilter]);

  const loadMore = () => {
    if (loading || !hasMore) return;
    setLoading(true);
    fetchPage(events.length).then(({ data, error }) => {
      if (error) console.error(error);
      else {
        setEvents((prev) => [...prev, ...(data || [])]);
        setHasMore((data?.length || 0) === EVENTS_PAGE_SIZE);
      }
      setLoading(false);
    });
  };

  // Fires more often than strictly needed, but loadMore is a no-op once
  // hasMore is false or a fetch is already in flight, so that's fine.
  const handleScroll = (e) => {
    const el = e.currentTarget;
    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 120) {
      loadMore();
    }
  };

  return (
    <div
      onScroll={handleScroll}
      className="flex flex-col gap-4 mt-4 md:mt-6 md:flex-1 md:overflow-y-auto md:pr-1 md:min-h-0"
    >
      {events.map((event) => (
        <div key={event.id} className="bg-[#F4EFE8] rounded-xl p-6 text-black">
          <div className="text-lg text-[#C97B63] mb-1">
            {formatEventDate(event.date)}
          </div>
          <div className="text-2xl font-bold text-[#C97B63] mb-2">
            {event.title}
          </div>
          <div className="text-md mb-4">{event.description}</div>
          <a
            href="https://discord.gg/2QUxxJcky"
            className="flex justify-end text-lg font-bold hover:opacity-70 transition-opacity"
          >
            # More Info &gt;&gt;
          </a>
        </div>
      ))}
      {loading && (
        <div className="text-center text-[#1C1512]/60 py-2">
          Loading more…
        </div>
      )}
    </div>
  );
}

const Calendar = () => {
  // "Year's Plan" is too wide for code-h1's mobile size once the pr-6/
  // md:pr-12 right margin (matching Home.jsx's Hero) eats into the
  // available width — same fix as Home: shorter line breaks below md,
  // desktop keeps the original two-line break.
  const isDesktop = useMediaQuery({ minWidth: 768 });
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
      <CodeLine indent={2}>
        today = date.
        <span className="text-[#7FA396]">today</span>()
      </CodeLine>
      <CodeLine indent={2}>
        <span className="text-[#C97B63]">return</span> (
      </CodeLine>
      <CodeLine indent={4}>
        <span className="text-[#7FA396]">'''</span>
      </CodeLine>

      {/* Date line + headline snapped together as one block. */}
      <RowBlock className="pl-[calc(var(--row)*4/3)]">
        <div className="text-[length:calc(var(--row)*2/3)] leading-[calc(var(--row)*8/9)] text-[#cfc3ae] mb-[calc(var(--row)*2/9)] whitespace-nowrap">
          {TODAY}
        </div>
        {/* code-h1, not the raw calc(var(--row)*8/3) — that formula never
            picks up the mobile-tuned --code-h1 override in index.css, so
            on phones it rendered at the full desktop size and "The Entire"
            got silently clipped by CodeSection's overflow-hidden. */}
        <h1 className="code-h1 text-[#E7B96B] leading-none whitespace-nowrap pr-6 md:pr-12">
          {isDesktop ? (
            <Typewriter>
              The Entire
              <br />
              Year’s Plan
            </Typewriter>
          ) : (
            <Typewriter>
              The Entire
              <br />
              Year’s
              <br />
              Plan
            </Typewriter>
          )}
        </h1>
      </RowBlock>

      <CodeLine indent={4}>
        <span className="text-[#B5AFA6]">
          Future meetings, events, competitions, 
          <br/>
          and volunteer opportunities are
          able 
          <br/>to be found here.
        </span>
      </CodeLine>
      
      <CodeLine>{""}</CodeLine>
      <CodeLine indent={4}>
        <span className="text-[#7FA396]">'''</span>
      </CodeLine>
      <CodeLine indent={2}>)</CodeLine>
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
  const [leftColHeight, setLeftColHeight] = useState(null);

  // md:h-full alone can't cap this column's height, even though it LOOKS
  // right with only a couple of events: a CSS grid's "auto" row track is
  // sized from its items' own natural content height, and a percentage
  // height (h-full) doesn't count toward that — so adding more events just
  // grows the row itself to fit them, and h-full's 100% keeps matching that
  // ever-growing row instead of ever actually capping it. Measuring the
  // left column's real rendered height and applying it as an explicit
  // pixel value sidesteps the circularity entirely, the same way
  // ResourceFolders on the Resources page measures a folder's height with
  // ResizeObserver instead of trying to express it in CSS alone.
  useEffect(() => {
    const el = leftColRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      setLeftColHeight(entry.contentRect.height);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const toggleFilter = (type) => {
    setActiveFilter((current) => (current === type ? null : type));
  };

  return (
    // p-4 md:p-12 and grid-cols-1 md:grid-cols-[3fr_1fr] — this whole panel
    // was fixed at desktop sizing (p-12, a forced 2-column grid, text-6xl)
    // with no md: fallback, so on a phone the iframe and filter buttons got
    // squeezed into slivers and "Monthly Calendar"/"Upcoming" ran off the
    // right edge. Same fix pattern as every other page's sections: stack to
    // one column and shrink text below md.
    <div className="bg-[#1C1512] overflow-hidden border-t border-[#3a2f26] p-4 md:p-12">
      <div className="grid grid-cols-1 md:grid-cols-[3fr_1fr] gap-8 md:gap-2">
        <div className="flex flex-col gap-4" ref={leftColRef}>
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
        {/* An explicit pixel height (from the ResizeObserver above), not
            md:h-full — see the comment on leftColHeight for why a
            percentage height can't actually cap this column. min-h-0
            because a flex/grid item's default min-height is "auto", which
            (like min-width on a flex row) refuses to shrink below its own
            content's height even once an explicit height is set — without
            it Events' overflow-y-auto still has nothing to actually clip
            against. */}
        <div
          className="flex flex-col md:min-h-0"
          style={leftColHeight ? { height: leftColHeight } : undefined}
        >
          <div className="flex flex-col gap-2 ">
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
          <Events activeFilter={activeFilter} />
        </div>
      </div>
    </div>
  );
};

export default Calendar;
