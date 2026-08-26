import React from "react";

const CODE_LINES = 24;

function CodeLine({ children }) {
  return <div className="h-9 leading-7 whitespace-pre text-xl">{children}</div>;
}

const Divisions = () => {
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
            to the gutter. The headline doesn't — it just takes whatever
            space it naturally needs. */}
        <div className="pt-[26px] pr-[26px] pb-10 text-[#f4efe8]">
          <CodeLine>
            <span className="text-[#C97B63]">import</span>{" "}
            <span className="text-[#7FA396]">
              React,
              <span className="text-[#f4efe8]"> {"{"}</span>
              {" useRef, useMemo "}
              <span className="text-[#f4efe8]">{"}"} </span>
            </span>
            <span className="text-[#C97B63]">from</span>{" "}
            <span className="text-[#E7B96B]">"react"</span>
          </CodeLine>
          <CodeLine>{""}</CodeLine>
          <CodeLine>
            <span className="text-[#453D34]">
              // We have niches for everyone!
            </span>
          </CodeLine>
          <CodeLine>
            <span className="text-[#C97B63]">const</span>{" "}
            <span className="text-[#7FA396]">Divisions </span> = () =&gt; {"{"}
          </CodeLine>
          <CodeLine>
            &nbsp;&nbsp;<span className="text-[#C97B63]">return</span> (
          </CodeLine>
          <CodeLine>
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;
            <span className="text-[#7FA396]">h1</span>&gt;
          </CodeLine>
          <CodeLine>{""}</CodeLine>

          {/* --- HEADLINE: not a CodeLine, so it ignores the 36px rhythm.
              3 lines * 96px + mb-9 (36px) = 324px = exactly 9 gutter rows. --- */}
          <h1 className="text-8xl pl-12 text-[#E7B96B] leading-none whitespace-nowrap mb-9">
            Choose a track
            <br />
            without
            <br />
            choosing a box
          </h1>

          <CodeLine>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <span className="text-[#B5AFA6]">
              /* Each division has their own lead, officers, meeting time,
            </span>
          </CodeLine>
          <CodeLine>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <span className="text-[#B5AFA6]">
              resource, calendar, and specializes in different fields.
            </span>
          </CodeLine>
          <CodeLine>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <span className="text-[#B5AFA6]">
              Each student can join multiple divisions at once */
            </span>
          </CodeLine>
          <CodeLine>{""}</CodeLine>
          <CodeLine>
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;
            <span className="text-[#7FA396]">/h1</span>&gt;
          </CodeLine>
          <CodeLine>&nbsp;&nbsp;)</CodeLine>
          <CodeLine>{"}"}</CodeLine>
          <CodeLine>
            <span className="text-[#c1663a]">export</span>{" "}
            <span className="text-[#7FA396]">default Divisions </span>
          </CodeLine>
        </div>
      </div>
    </div>
  );
};

export default Divisions;
