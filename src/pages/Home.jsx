import React from "react";

const CODE_LINES = 24;

function CodeLine({ children }) {
  return <div className="h-9 leading-7 whitespace-pre text-xl">{children}</div>;
}

const Home = () => {
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

        {/* CONTENT — normal code lines use CodeLine (h-7) so they snap
            to the gutter. The headline and buttons don't — they just
            take whatever space they naturally need. */}
        <div className="pt-[26px] pr-[26px] pb-10 text-[#f4efe8]">
          <CodeLine>
            <span className="text-[#C97B63]">import</span>{" "}
            <span className="text-[#7FA396]">
              React, <span className="text-[#f4efe8]">{"{"}</span>
              {" useState, useEffect "}
              <span className="text-[#f4efe8]">{"} "}</span>
            </span>
            <span className="text-[#C97B63]">from</span>{" "}
            <span className="text-[#E7B96B]">"react"</span>
          </CodeLine>
          <CodeLine>{""}</CodeLine>
          <CodeLine>
            <span className="text-[#453D34]">
              // Want to join and learn this?
            </span>
          </CodeLine>
          <CodeLine>
            <span className="text-[#C97B63]">const</span>{" "}
            <span className="text-[#7FA396]">Hero</span> = () =&gt; {"{"}
          </CodeLine>
          <CodeLine>
            &nbsp;&nbsp;<span className="text-[#C97B63]">return</span> (
          </CodeLine>
          <CodeLine>
            &nbsp;&nbsp;&nbsp;&nbsp; &lt;
            <span className="text-[#7FA396]">h1</span>&gt;
          </CodeLine>
          <CodeLine>{""}</CodeLine>

          {/* --- HEADLINE: not a CodeLine, so it ignores the 28px rhythm --- */}
          <h1 className="text-8xl pl-12 text-[#E7B96B] leading-none whitespace-nowrap mb-6">
            Welcome to
            <br />
            GSMST's CS Club
          </h1>

          <CodeLine>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <span className="text-[#B5AFA6]">
              /* We help students learn computer science, build real
            </span>
          </CodeLine>
          <CodeLine>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <span className="text-[#B5AFA6]">
              project, prepare for competitions, and find a welcoming
            </span>
          </CodeLine>
          <CodeLine>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <span className="text-[#B5AFA6]">
              place to explore technology together */
            </span>
          </CodeLine>
          <CodeLine>{""}</CodeLine>
          <CodeLine>
            &nbsp;&nbsp;&nbsp;&nbsp; &lt;
            <span className="text-[#7FA396]">/h1</span>&gt;
          </CodeLine>
          <CodeLine>{""}</CodeLine>

          {/* --- BUTTONS: also not a CodeLine, same reason --- */}
          <div className="flex gap-[14px] pl-12">
            <button className="font-mono font-bold px-10 py-5 text-2xl whitespace-nowrap rounded-lg cursor-pointer bg-[#e3c088] text-[#241a10] ring-1 ring-inset ring-[#e3c088] hover:opacity-85 transition-opacity">
              onClick = {'{"Join Club"}'}
            </button>
            <button className="font-mono font-bold px-10 py-5 text-2xl whitespace-nowrap rounded-lg cursor-pointer bg-transparent text-[#c9b896] ring-1 ring-inset ring-[#3a2f26] hover:opacity-85 transition-opacity">
              onClick = {'{"See Calendar"}'}
            </button>
          </div>

          <CodeLine>&nbsp;&nbsp;)</CodeLine>
          <CodeLine>{"}"}</CodeLine>
          <CodeLine>
            <span className="text-[#c1663a]">export</span>{" "}
            <span className="text-[#c1663a]">default</span> Hero
          </CodeLine>
        </div>
      </div>
    </div>
  );
};

export default Home;
