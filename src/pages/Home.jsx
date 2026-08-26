import React from "react";
import { NavLink } from "react-router-dom";
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

const CODE_LINES = 24;

function CodeLine({ children }) {
  return <div className="h-9 leading-7 whitespace-pre text-xl">{children}</div>;
}

const Hero = () => {
  return (
    <div className="bg-[#1C1512] overflow-hidden border border-[#3a2f26]">
      {/* the two independent columns */}
      <div className="flex gap-6">
        {/* GUTTER — just a list of numbers, each locked to 36px.
            It knows nothing about what's happening in the content column. */}
        <div className="py-[26px] text-center px-2 border-r border-[#3a2f26]">
          {Array.from({ length: CODE_LINES }, (_, i) => (
            <div key={i} className="h-9 leading-7 w-10 text-[#6b5c49] text-xl">
              {i + 1}
            </div>
          ))}
        </div>

        {/* CONTENT — normal code lines use CodeLine (h-9) so they snap
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

const Spotlight = () => {
  return (
    <div className="bg-[#241C18] overflow-hidden border text-[#f4efe8] border-[#3a2f26]">
      <div className="flex justify-between border-b border-[#3a2f26] py-4 text-[#B5AFA6]">
        <div className="flex justify-between w-full px-12 items-center">
          <div className="text-5xl flex gap-6">
            <h2>Upcoming Dates</h2>{" "}
            <span className="flex justify-center items-center w-13 h-13 rounded-full bg-[#c9b896] text-[#f4efe8] ">
              3
            </span>
          </div>
          <NavLink to="/calendar" className="text-3xl">
            All Events &gt;&gt;
          </NavLink>
        </div>
      </div>
      <div className="grid grid-cols-[2fr_3fr]">
        <div className="border-r text-2xl border-[#3a2f26] flex flex-col justify-center gap-8 px-12">
          <div>
            <div className="mb-4">
              <span className="text-[#7FA396]">$</span> date --{" "}
              <span className="text-[#E7B96B]">2026/09/01</span>
            </div>
            <div className="mb-2 text-4xl text-[#E7B96B]">
              Orientation Meeting
            </div>
            <div className="mb-2">| MLLH 3PM-4PM</div>
            <div>
              Come to CS club's first kickoff general meeting for the year!
            </div>
          </div>
          <div className="self-start relative inline-block">
            <div className="absolute left-6 -top-3 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[14px] border-b-[#e3c088]" />

            <div className=" rounded-lg bg-[#e3c088] text-[#1C1512] font-bold px-6 py-3 whitespace-nowrap">
              &gt;&gt; Featured
            </div>
          </div>
        </div>
        <div className="flex flex-col px-12">
          <div className="grid grid-cols-[3fr_2fr] border-b border-[#3a2f26] text-2xl">
            <div className="pr-12 py-12">
              <div className="text-[#B5AFA6] mb-4">
                <span className="text-[#7FA396]">$</span> date --{" "}
                <span className="text-[#7FA396]">2026/09/08</span>
              </div>
              <div className="text-4xl text-[#7FA396] mb-2">
                CyberPatriots Application Due
              </div>
              <div>
                Complete the CyberPatriots application and pay the due to join
                CyberDragons!
              </div>
            </div>
            <div className="self-center rounded-r-lg bg-[#7FA396] text-[#1C1512] px-8 py-4 [clip-path:polygon(20px_0,100%_0,100%_100%,20px_100%,0_50%)]">
              &gt;&gt; Cybersecurity
            </div>
          </div>
          <div className="grid grid-cols-[3fr_2fr] border-b border-[#3a2f26]  text-2xl">
            <div className="pr-12 py-12">
              <div className="text-[#B5AFA6] mb-4">
                <span className="text-[#7FA396]">$</span> date --{" "}
                <span className="text-[#c9846a]">2026/09/23</span>
              </div>
              <div className="text-4xl text-[#c9846a] mb-2">Escape Room</div>
              <div className="mb-2">| MLLH 3PM-4PM</div>
              <div>Come join us in a escape room game for fun!</div>
            </div>
            <div className="self-center rounded-r-lg bg-[#c9846a] text-[#1C1512] px-8 py-4 [clip-path:polygon(20px_0,100%_0,100%_100%,20px_100%,0_50%)]">
              &gt;&gt; Activity
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const GET_INVOLVED_START = 25;
const GET_INVOLVED_LINES = 16;

const GetInvolved = () => {
  return (
    <div className="bg-[#1C1512] overflow-hidden border border-[#3a2f26]">
      <div className="flex gap-6">
        <div className="py-[26px] text-center px-2 border-r border-[#3a2f26]">
          {Array.from({ length: GET_INVOLVED_LINES }, (_, i) => (
            <div key={i} className="h-9 leading-7 w-10 text-[#6b5c49] text-xl">
              {GET_INVOLVED_START + i}
            </div>
          ))}
        </div>

        <div className="flex-1 pt-[26px] pr-12 pb-10 text-[#f4efe8]">
          <CodeLine>{""}</CodeLine>

          {/* --- HEADLINE: not a CodeLine, so it ignores the 36px rhythm --- */}
          <h1 className="text-6xl text-[#E7B96B] leading-none whitespace-nowrap mb-12">
            Get Involved and Join
          </h1>

          <CodeLine>{""}</CodeLine>
          <CodeLine>
            <span className="text-[#C97B63]">def</span>{" "}
            <span className="text-[#7FA396]">join_us</span>(communication):
          </CodeLine>
          <CodeLine>
            &nbsp;&nbsp;<span className="text-[#C97B63]">match</span>{" "}
            communication:
          </CodeLine>

          {/* --- CASE lines are CodeLines (36px, self-aligning); the cards
              underneath are not, so each column's total must land on 36px --- */}
          <div className="grid grid-cols-2 gap-x-32 mb-[34px]">
            <div>
              <CodeLine>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <span className="text-[#C97B63]">case</span> "Talk to us!":
              </CodeLine>
              <a
                href="https://discord.gg/Ay6CR6VYY"
                className="ml-14 flex items-center gap-4 rounded-lg border border-[#3a2f26] bg-[#241C18] px-6 py-4 hover:opacity-85 transition-opacity"
              >
                <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#1C1512]">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-6 h-6"
                    fill="currentColor"
                  >
                    <path d="M20.317 4.369a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.6 12.6 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.74 19.74 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.09-.32 13.68.099 18.21a.082.082 0 0 0 .031.056 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.105 13.1 13.1 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.372-.291a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.009c.12.099.246.198.373.292a.077.077 0 0 1-.006.127c-.598.35-1.22.645-1.873.893a.076.076 0 0 0-.04.105c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.84 19.84 0 0 0 6.002-3.03.077.077 0 0 0 .032-.055c.5-5.177-.838-9.673-3.548-13.66a.06.06 0 0 0-.031-.027ZM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.955 2.418-2.157 2.418Zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418Z" />
                  </svg>
                </span>
                <span className="text-3xl font-bold">Discord</span>
              </a>
            </div>

            <div>
              <CodeLine>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <span className="text-[#C97B63]">case</span> "Look at our code":
              </CodeLine>
              <a
                href="https://github.com/GSMSTCSClub"
                className="ml-14 flex items-center gap-4 rounded-lg border border-[#3a2f26] bg-[#241C18] px-6 py-4 hover:opacity-85 transition-opacity"
              >
                <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#1C1512]">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-6 h-6"
                    fill="currentColor"
                  >
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.333-1.754-1.333-1.754-1.089-.744.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.42-1.305.763-1.605-2.665-.303-5.467-1.334-5.467-5.93 0-1.31.469-2.381 1.236-3.221-.124-.303-.536-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.29-1.552 3.297-1.23 3.297-1.23.655 1.653.243 2.874.12 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222 0 1.604-.014 2.896-.014 3.29 0 .32.216.694.825.576C20.565 21.795 24 17.298 24 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                </span>
                <span className="text-3xl font-bold">Github</span>
              </a>
            </div>
          </div>

          <CodeLine>{""}</CodeLine>

          <div className="grid grid-cols-2 gap-x-32 mb-[34px]">
            <div>
              <CodeLine>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <span className="text-[#C97B63]">case</span> "Interested in
                joining?":
              </CodeLine>
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSf9RmXHCNVPsQZiRgBSL1XP0mABGRPCnLSRCI6WL67fvpM8BQ/viewform?usp=header"
                className="ml-14 flex items-center gap-4 rounded-lg border border-[#3a2f26] bg-[#241C18] px-6 py-4 hover:opacity-85 transition-opacity"
              >
                <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#1C1512]">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-6 h-6"
                    fill="currentColor"
                  >
                    <path d="M9 2a1 1 0 0 0-1 1v1H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-2V3a1 1 0 0 0-1-1H9zm0 2h6v2H9V4zM7 10h10v2H7v-2zm0 4h10v2H7v-2zm0 4h6v2H7v-2z" />
                  </svg>
                </span>
                <span className="text-3xl font-bold">Interest Form</span>
              </a>
            </div>

            <div>
              <CodeLine>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <span className="text-[#C97B63]">case</span> "Contact any of
                us":
              </CodeLine>
              <NavLink
                to="/officers"
                className="ml-14 flex items-center gap-4 rounded-lg border border-[#3a2f26] bg-[#241C18] px-6 py-4 hover:opacity-85 transition-opacity"
              >
                <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#1C1512]">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-6 h-6"
                    fill="currentColor"
                  >
                    <path d="M3 5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H3zm0 2 9 6 9-6v2l-9 6-9-6V7z" />
                  </svg>
                </span>
                <span className="text-3xl font-bold">Email List</span>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Meet_Divisions = () => {
  return (
    <div className="text-2xl overflow-hidden text-black p-12">
      <div className="text-6xl mb-12 text-[#E7B96B] flex justify-center items-center">
        Meet Our Divisions
      </div>
      <div className="grid grid-cols-3 gap-6 ">
        <div className="flex flex-col rounded-xl border-2 border-[#c9846a] bg-[#f4efe8] overflow-hidden">
          <div className="relative">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdQogZKb-T6BI-dJRKvEXik0uD8bapenlK3xYUqQU6wA&s=10"
              className="aspect-video object-cover w-full p-1 rounded-xl"
            />
            <div className="absolute left-1/2 top-full -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-[#f4efe8] p-1 flex items-center justify-center">
              <div className="w-full h-full rounded-full bg-[#C97B63] p-3 flex items-center justify-center">
                <img src="/c++.webp" className="p-1" />
              </div>
            </div>
          </div>
          <div className="flex flex-col flex-1 pt-20 pb-6">
            <h3 className="self-center text-3xl px-2 font-bold text-[#c9846a]">
              Algorithmic Programming
            </h3>
            <p className="mt-4 text-lg px-6 h-21">
              Problem solving, contest training, and fast thinking under
              constraints in a real competition.
            </p>
            <NavLink className="mt-18 self-start mx-6 rounded-lg bg-[#c9846a] text-[#1C1512] font-bold px-6 py-3 hover:opacity-85 transition-opacity">
              Learn More &gt;&gt;
            </NavLink>
          </div>
        </div>
        <div className="flex flex-col rounded-xl border-2 border-[#c9846a] bg-[#f4efe8] overflow-hidden">
          <div className="relative">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdQogZKb-T6BI-dJRKvEXik0uD8bapenlK3xYUqQU6wA&s=10"
              className="aspect-video object-cover w-full p-1 rounded-xl"
            />
            <div className="absolute left-1/2 top-full -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-[#f4efe8] p-1 flex items-center justify-center">
              <div className="w-full h-full rounded-full bg-[#7FA396] p-3 flex items-center justify-center">
                <img src="/linux.png"/>
              </div>
            </div>
          </div>
          <div className="flex flex-col flex-1 pt-20 pb-6">
            <h3 className="self-center text-3xl px-2 font-bold text-[#7FA396]">
              CyberDragons
            </h3>
            <p className="mt-4 text-lg px-6 h-21">
              Cybersecurity concepts, capture-the-flag practice, and digital
              defense.
            </p>
            <NavLink className="mt-18 self-start mx-6 rounded-lg bg-[#7FA396] text-[#1C1512] font-bold px-6 py-3 hover:opacity-85 transition-opacity">
              Learn More &gt;&gt;
            </NavLink>
          </div>
        </div>
        <div className="flex flex-col rounded-xl border-2 border-[#c9846a] bg-[#f4efe8] overflow-hidden">
          <div className="relative">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdQogZKb-T6BI-dJRKvEXik0uD8bapenlK3xYUqQU6wA&s=10"
              className="aspect-video object-cover w-full p-1 rounded-xl"
            />
            <div className="absolute left-1/2 top-full -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-[#f4efe8] p-1 flex items-center justify-center">
              <div className="w-full h-full rounded-full bg-[#E7B96B] p-3 flex items-center justify-center">
                <img src="/python.webp" className="p-1"/>
              </div>
            </div>
          </div>
          <div className="flex flex-col flex-1 pt-20 pb-6">
            <h3 className="self-center text-3xl px-2 font-bold text-[#E7B96B]">
              CS101
            </h3>
            <p className="mt-4 text-lg px-6 h-21">
              Beginner-friendly lessons, labs, and confidence-building problems.
            </p>
            <NavLink className="mt-18 self-start mx-6 rounded-lg bg-[#E7B96B] text-[#1C1512] font-bold px-6 py-3 hover:opacity-85 transition-opacity">
              Learn More &gt;&gt;
            </NavLink>
          </div>
        </div>
      </div>
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
