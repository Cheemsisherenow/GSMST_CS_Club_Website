import React from "react";

const CODE_LINES = 24;

function CodeLine({ children }) {
  return <div className="h-9 leading-7 whitespace-pre text-xl">{children}</div>;
}

const Officers = () => {
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
            &lt;<span className="text-[#C97B63]">!DOCTYPE html</span>&gt;
          </CodeLine>
          <CodeLine>
            &lt;<span className="text-[#C97B63]">html</span>{" "}
            <span className="text-[#f4efe8]">lang</span>=
            <span className="text-[#E7B96B]">"en"</span>&gt;
          </CodeLine>
          <CodeLine>
            <span className="text-[#453D34]">
              &lt;!-- You could also be on here! --&gt;
            </span>
          </CodeLine>
          <CodeLine>
            &nbsp;&nbsp;&lt;<span className="text-[#C97B63]">section</span>{" "}
            class=
            <span className="text-[#E7B96B]">"divisions"</span>&gt;
          </CodeLine>
          <CodeLine>
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;
            <span className="text-[#7FA396]">h1</span>&gt;
          </CodeLine>
          <CodeLine>{""}</CodeLine>

          {/* --- HEADLINE: not a CodeLine, so it ignores the 36px rhythm --- */}
          <h1 className="text-8xl pl-12 text-[#E7B96B] leading-none whitespace-nowrap mb-9">
            The people who
            <br />
            keeps the room
            <br />
            open
          </h1>

          <CodeLine>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <span className="text-[#B5AFA6]">
              &lt;!-- /* Each division has their own lead, officers, meeting
            </span>
          </CodeLine>
          <CodeLine>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <span className="text-[#B5AFA6]">
              time, resource, calendar, and specializes in different fields.
            </span>
          </CodeLine>
          <CodeLine>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <span className="text-[#B5AFA6]">
              Each student can join multiple divisions at once */ --&gt;
            </span>
          </CodeLine>
          <CodeLine>{""}</CodeLine>
          <CodeLine>
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;
            <span className="text-[#7FA396]">/h1</span>&gt;
          </CodeLine>
          <CodeLine>
            &nbsp;&nbsp;&lt;<span className="text-[#C97B63]">/section</span>&gt;
          </CodeLine>
          <CodeLine>
            &lt;<span className="text-[#C97B63]">/html</span>&gt;
          </CodeLine>
          <CodeLine>{""}</CodeLine>
          <CodeLine>{""}</CodeLine>
        </div>
      </div>
    </div>
  );
};

export default Officers;
