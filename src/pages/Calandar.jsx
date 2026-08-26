import React from "react";

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
    </div>
  );
};

export default Calandar;
