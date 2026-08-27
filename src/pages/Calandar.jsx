import React, { useState } from "react";

const CODE_LINES = 24;

function CodeLine({ children }) {
  return <div className="h-9 leading-7 whitespace-pre text-xl">{children}</div>;
}

const TODAY = new Date().toLocaleDateString("en-US", {
  weekday: "long",
  month: "long",
  day: "numeric",
  year: "numeric",
});

const Calandar = () => {
  return (
    <div className="bg-[#1C1512] overflow-hidden border border-[#3a2f26]">
      {/* the two independent columns */}
      <div className="flex gap-6">
        {/* GUTTER — just a list of numbers, each locked to 28px.
            It knows nothing about what's happening in the content column. */}
        <div className="py-[26px] text-center px-2 border-r border-[#3a2f26]">
          {Array.from({ length: CODE_LINES }, (_, i) => (
            <div key={i} className="h-9 leading-7 w-10 text-[#6b5c49] text-xl">
              {i + 1}
            </div>
          ))}
        </div>

        {/* CONTENT — normal code lines use CodeLine (h-9) so they snap
            to the gutter. The date + headline block doesn't — it just
            takes whatever space it naturally needs. */}
        <div className="pt-[26px] pr-[26px] pb-10 text-[#f4efe8]">
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

          {/* --- DATE + HEADLINE: not a CodeLine, so it ignores the 36px
              rhythm. date line + 3-line headline + margin = exactly
              9 gutter rows (324px). --- */}
          <div className="pl-12 mb-8">
            <div className="text-2xl text-[#cfc3ae] mb-2 whitespace-nowrap">
              {TODAY}
            </div>
            <h1 className="text-8xl text-[#E7B96B] leading-none whitespace-nowrap">
              Live schedules
              <br />
              and events
              <br />
              in one place
            </h1>
          </div>

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
        </div>
      </div>
      <EmbbededCalendar/>
    </div>
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
    <div className="bg-[#1C1512] overflow-hidden border border-[#3a2f26] p-12">
      <div className="grid grid-cols-[3fr_1fr] gap-2">
        <div className="flex flex-col gap-4">
          <div className="text-6xl text-[#E7B96B]">Monthly Calendar</div>
          <iframe
            src="https://calendar.google.com/calendar/u/0?cid=Y2xhc3Nyb29tMTEwNTkxNjE1OTQ4ODEwNDY0MTI3QGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20"
            className="aspect-4/3 rounded-lg bg-[#F4EFE8]"
          ></iframe>
        </div>
        <div>
          <div className="flex flex-col gap-2">
            <div className="text-6xl text-[#E7B96B]">Upcoming</div>
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
}

export default Calandar;
