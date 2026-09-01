import React from "react";
import { NavLink } from "react-router-dom";
import Typewriter from "../Typewriter";
import { CodeLine, CodeSection, RowBlock } from "../CodeLine";

/*const g = [...document.querySelectorAll('.border-r > div')];
const col = document.querySelector('.border-r').nextElementSibling;
let total = 0;
console.table([...col.children].map((d, i) => {
  const h = Math.round(d.getBoundingClientRect().height);
  const mb = parseInt(getComputedStyle(d).marginBottom);
  total += h + mb;
  return { i, h, mb, sum: h + mb, ok: (h + mb) % 36 === 0, text: d.textContent.slice(0, 20) };
}));
console.log('content', total, 'gutter', g.length * 36, 'rows needed', total / 36);*/


const Hero = () => {
  return (
    <CodeSection
      className="bg-[#1C1512] overflow-hidden border border-[#3a2f26]"
      contentClassName="pr-[calc(var(--row)*13/18)] text-[#f4efe8]"
    >
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

          <RowBlock>
            <h1 className="code-h1 pl-[calc(var(--row)*4/3)] text-[#E7B96B] leading-none whitespace-nowrap">
              <Typewriter>
                Welcome to
                <br />
                GSMST's CS Club
              </Typewriter>
            </h1>
          </RowBlock>

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

          {/* Also not a CodeLine — the border adds 2px that no row fraction
              accounts for, which RowBlock absorbs automatically. */}
          <RowBlock className="flex flex-wrap gap-[calc(var(--row)*7/18)] pl-[calc(var(--row)*4/3)]">
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSf9RmXHCNVPsQZiRgBSL1XP0mABGRPCnLSRCI6WL67fvpM8BQ/viewform?usp=header"
              target="_blank"
              rel="noopener noreferrer"
              className="px-[calc(var(--row)*10/9)] py-[calc(var(--row)*5/9)] text-[length:calc(var(--row)*2/3)] leading-[calc(var(--row)*8/9)] rounded-lg cursor-pointer bg-[#e3c088] text-[#241a10] border border-[#e3c088] hover:-translate-y-0.5 duration-300 ease-in-out hover:opacity-85 transition-all"
            >
              onClick = {'{"Join Club"}'}
            </a>
            <NavLink
              to="/calendar"
              className="px-[calc(var(--row)*10/9)] py-[calc(var(--row)*5/9)] text-[length:calc(var(--row)*2/3)] leading-[calc(var(--row)*8/9)] rounded-lg cursor-pointer bg-transparent text-[#c9b896] hover:-translate-y-0.5 duration-300 ease-in-out border border-[#3a2f26] hover:opacity-85 transition-all"
            >
              onClick = {'{"See Calendar"}'}
            </NavLink>
          </RowBlock>

          <CodeLine>&nbsp;&nbsp;)</CodeLine>
          <CodeLine>{"}"}</CodeLine>
          <CodeLine>
            <span className="text-[#c1663a]">export</span>{" "}
            <span className="text-[#c1663a]">default</span> Hero
          </CodeLine>
    </CodeSection>
  );
};

const Spotlight = () => {
  return (
    <div className="bg-[#241C18] overflow-hidden border text-[#f4efe8] border-[#3a2f26]">
      <div className="flex justify-between border-b border-[#3a2f26] py-4 text-[#B5AFA6]">
        <div className="flex flex-wrap gap-y-2 justify-between w-full px-6 md:px-12 items-center">
          <div className="text-2xl md:text-5xl flex gap-3 md:gap-6 items-center">
            <h2>Upcoming Dates</h2>{" "}
            <span className="flex justify-center items-center w-8 h-8 md:w-13 md:h-13 rounded-full bg-[#c9b896] text-[#f4efe8] ">
              3
            </span>
          </div>
          <NavLink
            to="/calendar"
            className="text-lg md:text-3xl cursor-pointer hover:-translate-y-0.5 hover:text-[#9c968e] duration-300 ease-in-out transition-all"
          >
            All Events &gt;&gt;
          </NavLink>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr]">
        <div className="border-b md:border-b-0 md:border-r text-lg md:text-2xl border-[#3a2f26] flex flex-col justify-center gap-8 px-6 md:px-12 py-8 md:py-0">
          <div>
            <div className="mb-4">
              <span className="text-[#7FA396]">$</span> date --{" "}
              <span className="text-[#E7B96B]">09/01/2026</span>
            </div>
            <div className="mb-2 text-2xl md:text-4xl text-[#E7B96B]">
              Orientation Meeting
            </div>
            <div className="mb-2">| MLLH - 3PM-4PM</div>
            <div>
              Come to CS club's first kickoff general meeting for the year!
            </div>
          </div>
          <div className="self-start relative inline-block">
            <div className="absolute left-4 md:left-6 -top-2 md:-top-3 w-0 h-0 border-l-[7px] md:border-l-[10px] border-l-transparent border-r-[7px] md:border-r-[10px] border-r-transparent border-b-[10px] md:border-b-[14px] border-b-[#e3c088]" />

            {/* text-[length:clamp(...)] instead of the usual text-lg/md:text-2xl
                step — a badge like this has no room to wrap, so its text needs
                to shrink continuously with the viewport instead of jumping
                between two fixed sizes (which leaves a range of widths where
                it's still the bigger size but the chip's already too narrow
                for it, and ">> Featured" wraps onto two lines). */}
            <div className="rounded-lg bg-[#e3c088] text-[#1C1512] font-bold px-4 md:px-6 py-2 md:py-3 whitespace-nowrap overflow-hidden text-ellipsis max-w-full text-[length:clamp(0.7rem,2vw,1.5rem)]">
              &gt;&gt; Featured
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] border-b px-6 md:px-12 border-[#3a2f26] text-lg md:text-2xl">
            <div className="md:pr-12 py-8 md:py-12">
              <div className="text-[#B5AFA6] mb-4">
                <span className="text-[#7FA396]">$</span> date --{" "}
                <span className="text-[#7FA396]">09/10/2026</span>
              </div>
              <div className="text-2xl md:text-4xl text-[#7FA396] mb-2">
                CyberPatriots Application Due
              </div>
              <div>
                Complete the CyberPatriots application and pay the due to join
                CyberDragons!
              </div>
            </div>
            {/* The arrow-notch clip-path only reads as a tag while the chip is
                flush against the panel's right edge, which it only is once the
                row is actually two columns — so it drops back to a plain pill
                in the stacked layout. */}
            <div className="self-start md:self-center mb-6 md:mb-0 rounded-lg md:rounded-l-none md:rounded-r-lg bg-[#7FA396] text-[#1C1512] px-4 md:px-8 py-2 md:py-4 md:[clip-path:polygon(20px_0,100%_0,100%_100%,20px_100%,0_50%)] whitespace-nowrap overflow-hidden text-ellipsis min-w-0 text-[length:clamp(0.7rem,2vw,1.5rem)]">
              &gt;&gt; Cybersecurity
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] px-6 md:px-12 text-lg md:text-2xl">
            <div className="md:pr-12 py-8 md:py-12">
              <div className="text-[#B5AFA6] mb-4">
                <span className="text-[#7FA396]">$</span> date --{" "}
                <span className="text-[#c9846a]">09/16/2026</span>
              </div>
              <div className="text-2xl md:text-4xl text-[#c9846a] mb-2">
                Escape Room
              </div>
              <div className="mb-2">| MLLH - 3PM-4PM</div>
              <div>Come join us in a escape room game for fun!</div>
            </div>
            <div className="self-start md:self-center mb-6 md:mb-0 rounded-lg md:rounded-l-none md:rounded-r-lg bg-[#c9846a] text-[#1C1512] px-4 md:px-8 py-2 md:py-4 md:[clip-path:polygon(20px_0,100%_0,100%_100%,20px_100%,0_50%)] whitespace-nowrap overflow-hidden text-ellipsis min-w-0 text-[length:clamp(0.7rem,2vw,1.5rem)]">
              &gt;&gt; Activity
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Continues the Hero section's numbering — Hero ends at 25, so this picks up
// at 26. (Hero's gutter used to render 24 from a measurement that was taken
// before its RowBlocks settled; CodeLine.jsx now re-measures after that.)
const GET_INVOLVED_START = 26;

const GetInvolved = () => {
  return (
    <CodeSection
      className="bg-[#1C1512] overflow-hidden border border-[#3a2f26]"
      contentClassName="flex-1 pr-[calc(var(--row)*4/3)] text-[#f4efe8]"
      start={GET_INVOLVED_START}
    >
      <CodeLine>{""}</CodeLine>

      <RowBlock>
        <h1 className="code-h2 text-[#E7B96B] leading-none whitespace-nowrap">
          Get Involved and Join
        </h1>
      </RowBlock>

      <CodeLine>{""}</CodeLine>
      <CodeLine>
        <span className="text-[#C97B63]">def</span>{" "}
        <span className="text-[#7FA396]">join_us</span>(communication):
      </CodeLine>
      <CodeLine>
        &nbsp;&nbsp;<span className="text-[#C97B63]">match</span> communication:
      </CodeLine>

      {/* The CASE lines self-align; the cards under them are arbitrary
              height, so the whole grid gets snapped as one block. */}
      <RowBlock className="grid grid-cols-1 md:grid-cols-2 gap-x-[calc(var(--row)*32/9)]">
        <div>
          <CodeLine>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <span className="text-[#C97B63]">case</span> "Talk to us!":
          </CodeLine>
          <a
            href="https://discord.gg/Ay6CR6VYY"
            className="ml-[calc(var(--row)*14/9)] flex items-center gap-[calc(var(--row)*4/9)] rounded-lg border border-[#3a2f26] bg-[#241C18] px-[calc(var(--row)*2/3)] py-[calc(var(--row)*4/9)] hover:-translate-y-0.5 duration-300 hover:opacity-85 transition-all"
          >
            <span className="flex items-center justify-center w-[calc(var(--row)*10/9)] h-[calc(var(--row)*10/9)] rounded-lg bg-[#1C1512]">
              <svg
                viewBox="0 0 24 24"
                className="w-[calc(var(--row)*2/3)] h-[calc(var(--row)*2/3)]"
                fill="currentColor"
              >
                <path d="M20.317 4.369a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.6 12.6 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.74 19.74 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.09-.32 13.68.099 18.21a.082.082 0 0 0 .031.056 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.105 13.1 13.1 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.372-.291a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.009c.12.099.246.198.373.292a.077.077 0 0 1-.006.127c-.598.35-1.22.645-1.873.893a.076.076 0 0 0-.04.105c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.84 19.84 0 0 0 6.002-3.03.077.077 0 0 0 .032-.055c.5-5.177-.838-9.673-3.548-13.66a.06.06 0 0 0-.031-.027ZM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.955 2.418-2.157 2.418Zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418Z" />
              </svg>
            </span>
            <span className="text-[length:calc(var(--row)*5/6)] leading-[var(--row)] font-bold">
              Discord
            </span>
          </a>
        </div>

        <div>
          <CodeLine>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <span className="text-[#C97B63]">case</span> "Look at our code":
          </CodeLine>
          <a
            href="https://github.com/GSMSTCSClub"
            className="ml-[calc(var(--row)*14/9)] flex items-center gap-[calc(var(--row)*4/9)] rounded-lg border border-[#3a2f26] bg-[#241C18] px-[calc(var(--row)*2/3)] py-[calc(var(--row)*4/9)] hover:-translate-y-0.5 duration-300 hover:opacity-85 transition-all"
          >
            <span className="flex items-center justify-center w-[calc(var(--row)*10/9)] h-[calc(var(--row)*10/9)] rounded-lg bg-[#1C1512]">
              <svg
                viewBox="0 0 24 24"
                className="w-[calc(var(--row)*2/3)] h-[calc(var(--row)*2/3)]"
                fill="currentColor"
              >
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.333-1.754-1.333-1.754-1.089-.744.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.42-1.305.763-1.605-2.665-.303-5.467-1.334-5.467-5.93 0-1.31.469-2.381 1.236-3.221-.124-.303-.536-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.29-1.552 3.297-1.23 3.297-1.23.655 1.653.243 2.874.12 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222 0 1.604-.014 2.896-.014 3.29 0 .32.216.694.825.576C20.565 21.795 24 17.298 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </span>
            <span className="text-[length:calc(var(--row)*5/6)] leading-[var(--row)] font-bold">
              Github
            </span>
          </a>
        </div>
      </RowBlock>

      <CodeLine>{""}</CodeLine>

      <RowBlock className="grid grid-cols-1 md:grid-cols-2 gap-x-[calc(var(--row)*32/9)]">
        <div>
          <CodeLine>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <span className="text-[#C97B63]">case</span> "Interested in
            joining?":
          </CodeLine>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSf9RmXHCNVPsQZiRgBSL1XP0mABGRPCnLSRCI6WL67fvpM8BQ/viewform?usp=header"
            className="ml-[calc(var(--row)*14/9)] flex items-center gap-[calc(var(--row)*4/9)] rounded-lg border border-[#3a2f26] bg-[#241C18] px-[calc(var(--row)*2/3)] py-[calc(var(--row)*4/9)] hover:-translate-y-0.5 duration-300 hover:opacity-85 transition-all"
          >
            <span className="flex items-center justify-center w-[calc(var(--row)*10/9)] h-[calc(var(--row)*10/9)] rounded-lg bg-[#1C1512]">
              <svg
                viewBox="0 0 24 24"
                className="w-[calc(var(--row)*2/3)] h-[calc(var(--row)*2/3)]"
                fill="currentColor"
              >
                <path d="M9 2a1 1 0 0 0-1 1v1H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-2V3a1 1 0 0 0-1-1H9zm0 2h6v2H9V4zM7 10h10v2H7v-2zm0 4h10v2H7v-2zm0 4h6v2H7v-2z" />
              </svg>
            </span>
            <span className="text-[length:calc(var(--row)*5/6)] leading-[var(--row)] font-bold">
              Interest Form
            </span>
          </a>
        </div>

        <div>
          <CodeLine>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <span className="text-[#C97B63]">case</span> "Contact any of us":
          </CodeLine>
          <NavLink
            to="/officers"
            className="ml-[calc(var(--row)*14/9)] flex items-center gap-[calc(var(--row)*4/9)] rounded-lg border border-[#3a2f26] bg-[#241C18] px-[calc(var(--row)*2/3)] py-[calc(var(--row)*4/9)] hover:-translate-y-0.5 duration-300 hover:opacity-85 transition-all"
          >
            <span className="flex items-center justify-center w-[calc(var(--row)*10/9)] h-[calc(var(--row)*10/9)] rounded-lg bg-[#1C1512]">
              <svg
                viewBox="0 0 24 24"
                className="w-[calc(var(--row)*2/3)] h-[calc(var(--row)*2/3)]"
                fill="currentColor"
              >
                <path d="M3 5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H3zm0 2 9 6 9-6v2l-9 6-9-6V7z" />
              </svg>
            </span>
            <span className="text-[length:calc(var(--row)*5/6)] leading-[var(--row)] font-bold">
              Officer Contacts
            </span>
          </NavLink>
        </div>
      </RowBlock>
    </CodeSection>
  );
};

const Meet_Divisions = () => {
  return (
    <div className="text-lg md:text-2xl overflow-hidden text-black p-6 md:p-12">
      <div className="text-3xl md:text-6xl mb-8 md:mb-12 text-[#E7B96B] flex justify-center items-center text-center">
        Meet Our Divisions
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
        <div className="flex flex-col rounded-xl border-2 border-[#c9846a] bg-[#f4efe8] overflow-hidden">
          <div className="relative">
            <img
              src="/DivisionPictures/Algo/IMG1.jpg"
              alt="Algorithmic Programming"
              className="aspect-video object-cover w-full p-1 rounded-xl"
            />
            <div className="absolute left-1/2 top-full -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-[#f4efe8] p-1 flex items-center justify-center">
              <div className="w-full h-full rounded-full bg-[#C97B63] p-3 flex items-center justify-center">
                <img src="/c++.webp" className="p-1" />
              </div>
            </div>
          </div>
          <div className="flex flex-col flex-1 pt-20 pb-6">
            <h3 className="text-center text-3xl px-2 font-bold text-[#c9846a]">
              Algorithmic Programming
            </h3>
            <p className="mt-4 text-lg px-6 md:h-21">
              Problem solving, contest training, and fast thinking under
              constraints in a real competition.
            </p>
            <NavLink className="mt-8 md:mt-18 self-start mx-6 rounded-lg bg-[#c9846a] text-[#1C1512] font-bold px-6 py-3 hover:opacity-85 hover:-translate-y-0.5 duration-300 transition-all">
              Learn More &gt;&gt;
            </NavLink>
          </div>
        </div>
        <div className="flex flex-col rounded-xl border-2 border-[#7FA396] bg-[#f4efe8] overflow-hidden">
          <div className="relative">
            <img
              src="/DivisionPictures/Cyber/IMG1.jpg"
              alt="CyberDragons"
              className="aspect-video object-cover w-full p-1 rounded-xl"
            />
            <div className="absolute left-1/2 top-full -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-[#f4efe8] p-1 flex items-center justify-center">
              <div className="w-full h-full rounded-full bg-[#7FA396] p-3 flex items-center justify-center">
                <img src="/linux.png" />
              </div>
            </div>
          </div>
          <div className="flex flex-col flex-1 pt-20 pb-6">
            <h3 className="text-center text-3xl px-2 font-bold text-[#7FA396]">
              CyberDragons
            </h3>
            <p className="mt-4 text-lg px-6 md:h-21">
              Cybersecurity concepts, capture-the-flag practice, and digital
              defense.
            </p>
            <NavLink className="mt-8 md:mt-18 self-start mx-6 rounded-lg bg-[#7FA396] text-[#1C1512] font-bold px-6 py-3 hover:-translate-y-0.5 duration-300 hover:opacity-85 transition-all">
              Learn More &gt;&gt;
            </NavLink>
          </div>
        </div>
        <div className="flex flex-col rounded-xl border-2 border-[#E7B96B] bg-[#f4efe8] overflow-hidden">
          <div className="relative">
            <img
              src="/DivisionPictures/CS101/IMG1.jpg"
              alt="CS101"
              className="aspect-video object-cover w-full p-1 rounded-xl"
            />
            <div className="absolute left-1/2 top-full -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-[#f4efe8] p-1 flex items-center justify-center">
              <div className="w-full h-full rounded-full bg-[#E7B96B] p-3 flex items-center justify-center">
                <img src="/python.webp" className="p-1" />
              </div>
            </div>
          </div>
          <div className="flex flex-col flex-1 pt-20 pb-6">
            <h3 className="text-center text-3xl px-2 font-bold text-[#E7B96B]">
              CS101
            </h3>
            <p className="mt-4 text-lg px-6 md:h-21">
              Beginner-friendly lessons, labs, and confidence-building problems.
            </p>
            <NavLink className="mt-8 md:mt-18 self-start mx-6 rounded-lg bg-[#E7B96B] text-[#1C1512] font-bold px-6 py-3 hover:-translate-y-0.5 duration-300 hover:opacity-85 transition-all">
              Learn More &gt;&gt;
            </NavLink>
          </div>
        </div>
      </div>
      <NavLink
        to="/divisions"
        className="float-right mt-12 text-3xl text-[#B5AFA6] hover:-translate-y-0.5 duration-300 transition-all hover:text-[#9c968e]"
      >
        {" "}
        See All Divisions &gt;&gt;
      </NavLink>
    </div>
  );
};

const Home = () => {
  return (
    <>
      <Hero />
      <Spotlight />
      <GetInvolved />
      <Meet_Divisions />
    </>
  );
};

export default Home;
