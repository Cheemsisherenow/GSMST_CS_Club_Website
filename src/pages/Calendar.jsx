import React, { useState } from "react";
import Typewriter from "../Typewriter";
import { CodeLine, CodeSection, RowBlock } from "../CodeLine";

const TODAY = new Date().toLocaleDateString("en-US", {
  weekday: "long",
  month: "long",
  day: "numeric",
  year: "numeric",
});

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
            <h1 className="text-[length:calc(var(--row)*8/3)] text-[#E7B96B] leading-none whitespace-nowrap">
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
// TODO: once there's an actual events data source, use `activeFilter`
// (null = show everything) to filter that list instead of just toggling
// the pill's own look.
const EVENT_FILTERS = [
  { label: "Meetings", color: "#C97B63" },
  { label: "Volunteer", color: "#E7B96B" },
  { label: "Competitions", color: "#7FA396" },
];

const EmbbededCalendar = () => {
  const [activeFilter, setActiveFilter] = useState(null);

  const toggleFilter = (label) => {
    setActiveFilter((current) => (current === label ? null : label));
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
                  onClick={() => toggleFilter(f.label)}
                  className="rounded-lg py-3 text-xl text-black"
                  style={{
                    backgroundColor: f.color,
                    opacity: activeFilter && activeFilter !== f.label ? 0.4 : 1,
                  }}
                >
                  {f.label}
                </button>
              ))}
            </div>
            {EVENT_FILTERS.slice(2).map((f) => (
              <button
                key={f.label}
                onClick={() => toggleFilter(f.label)}
                className="rounded-lg py-3 text-xl font-bold text-black"
                style={{
                  backgroundColor: f.color,
                  opacity: activeFilter && activeFilter !== f.label ? 0.4 : 1,
                }}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
