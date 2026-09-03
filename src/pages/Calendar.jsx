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

function formatEventDate(dateString) {
  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

function Events({ activeFilter }) {
  const [events, setEvents] = useState([]);

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

  return (
    <div className="flex flex-col gap-4">
      {visibleEvents.map((event) => (
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
        <h1 className="text-[length:calc(var(--row)*8/3)] text-[#E7B96B] leading-none whitespace-nowrap">
          <Typewriter>
            The Entire
            <br />
            Year’s Plan
          </Typewriter>
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

  const toggleFilter = (type) => {
    setActiveFilter((current) => (current === type ? null : type));
  };

  return (
    <div className="bg-[#1C1512] overflow-hidden border-t border-[#3a2f26] p-12">
      <div className="grid grid-cols-[3fr_1fr] gap-2">
        <div className="flex flex-col gap-4">
          <div className="text-6xl text-[#E7B96B]">Monthly Calendar</div>
          <iframe
            title="GSMST CS Club Calendar"
            src="https://calendar.google.com/calendar/embed?src=classroom110591615948810464127%40group.calendar.google.com&ctz=America%2FNew_York"
            style={{ border: 0 }}
            className="w-full aspect-4/3 rounded-lg bg-[#F4EFE8]"
          ></iframe>
        </div>
        <div>
          <div className="flex flex-col gap-2 ">
            <div className="text-6xl text-[#E7B96B] mb-2">Upcoming</div>
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
