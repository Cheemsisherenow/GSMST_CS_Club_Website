import React, { useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const CODE_LINES = 24;

function CodeLine({ children }) {
  return <div className="h-9 leading-7 whitespace-pre text-xl">{children}</div>;
}

const Divisions = () => {
  return (
    <div className="bg-[#1C1512] overflow-hidden border border-b-2 border-[#3a2f26]">
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


const algoData = [
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdQogZKb-T6BI-dJRKvEXik0uD8bapenlK3xYUqQU6wA&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdQogZKb-T6BI-dJRKvEXik0uD8bapenlK3xYUqQU6wA&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdQogZKb-T6BI-dJRKvEXik0uD8bapenlK3xYUqQU6wA&s=10",
];
const cyberData = [
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdQogZKb-T6BI-dJRKvEXik0uD8bapenlK3xYUqQU6wA&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdQogZKb-T6BI-dJRKvEXik0uD8bapenlK3xYUqQU6wA&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdQogZKb-T6BI-dJRKvEXik0uD8bapenlK3xYUqQU6wA&s=10",
];
const csData = [
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdQogZKb-T6BI-dJRKvEXik0uD8bapenlK3xYUqQU6wA&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdQogZKb-T6BI-dJRKvEXik0uD8bapenlK3xYUqQU6wA&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdQogZKb-T6BI-dJRKvEXik0uD8bapenlK3xYUqQU6wA&s=10",
];

const useSlider = (itemCount) => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState("next");
  const rowRef = useRef(null);
  const next = () => {
    setDirection("next");
    setIndex((i) => (i + 1) % itemCount);
  };
  const prev = () => {
    setDirection("prev");
    setIndex((i) => (i - 1 + itemCount) % itemCount);
  };

  useGSAP(() => {
    gsap.to(rowRef.current, {
      xPercent: -index * (100 / itemCount),
      duration: 0.5,
      ease: "power2.out",
    });
  }, [index]);

  return { index, next, prev, rowRef };
};

const ImageCarousel = ({ images, rowRef, next, prev }) => {
  const count = images.length;
  return (
    <div className="relative h-full overflow-hidden">
      <div
        ref={rowRef}
        className="flex h-full"
        style={{ width: `${count * 100}%` }}
      >
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt=""
            className="h-full object-cover shrink-0"
            style={{ width: `${100 / count}%`  }}
          />
        ))}
      </div>
      <button
        onClick={prev}
        aria-label="Previous image"
        className="absolute left-5 top-1/2 -translate-y-1/2 text-4xl text-white drop-shadow"
      >
        &lt;
      </button>
      <button
        onClick={next}
        aria-label="Next image"
        className="absolute right-5 top-1/2 -translate-y-1/2 text-4xl text-white drop-shadow"
      >
        &gt;
      </button>
    </div>
  );
};

const algo = {
  color: "#C97B63",
  track: "// Competitive Track",
  title: "Algorithmic Programming",
  description:
    "Placeholder description for contest prep, data structure, problem sets, mock rounds, and team selection.",
  lead: "Evan Yang",
  meeting: "09/03/2026",
  room: "N/A",
  reverse: true,
};
const cyber = {
  color: "#7FA396",
  track: "// Cybersecurity Track",
  title: "CyberDragons",
  description:
    "Placeholder description for cybersecurity lessons, CTF practice, responsible disclosure, and team discussion.",
  lead: "Luke Cheng",
  meeting: "09/02/2026",
  room: "N/A",
};

const cs = {
  color: "#E7B96B",
  track: "// Beginner Track",
  title: "CS101",
  description:
    "Placeholder description for students learning programming fundamentals, web basics, debugging habits, and project confidence",
  lead: "Stephen Akrong",
  meeting: "09/01/2026",
  room: "N/A",
  reverse: true,
};
const DivisionSpotlight = ({
  color,
  track,
  title,
  description,
  lead,
  meeting,
  room,
  reverse = false,
}) => {
  const {
    index: indexAlgo,
    next: nextAlgo,
    prev: prevAlgo,
    rowRef: algoRef,
  } = useSlider(algoData.length);
  const {
    index: indexCyber,
    next: nextCyber,
    prev: prevCyber,
    rowRef: cyberRef,
  } = useSlider(cyberData.length);
  const {
    index: indexCS,
    next: nextCS,
    prev: prevCS,
    rowRef: csRef,
  } = useSlider(csData.length);

  return (
    <div className="bg-[#1C1512] overflow-hidden p-12 text-black">
      <div
        className={`grid ${
          reverse ? "grid-cols-[3fr_2fr]" : "grid-cols-[2fr_3fr]"
        } bg-white rounded-3xl overflow-hidden`}
      >
        {reverse && (
          <ImageCarousel
            images={cyberData}
            rowRef={cyberRef}
            next={nextCyber}
            prev={prevCyber}
          />
        )}
        <div className="flex flex-col p-4">
          <div className="text-2xl mb-1" style={{ color }}>
            {track}
          </div>
          <div className="text-7xl mb-4" style={{ color }}>
            {title}
          </div>
          <div className="text-2xl h-32">{description}</div>
          <div className="flex flex-col gap-4 mt-6 ">
            <div
              className="flex flex-col rounded-xl border-2 p-2"
              style={{ borderColor: color }}
            >
              <div className="text-xl">Division Lead</div>
              <div className="text-3xl">{lead}</div>
            </div>
            <div
              className="flex flex-col rounded-xl border-2 p-2"
              style={{ borderColor: color }}
            >
              <div className="text-xl">Next Meeting</div>
              <div className="text-3xl">{meeting}</div>
            </div>
            <div
              className="flex flex-col rounded-xl border-2 p-2"
              style={{ borderColor: color }}
            >
              <div className="text-xl">Room Number</div>
              <div className="text-3xl">{room}</div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-2xl">
              <NavLink
                to="/resources"
                className="flex flex-col text-center rounded-xl border-2 p-2"
                style={{ borderColor: color }}
              >
                {" "}
                Resources
              </NavLink>
              <NavLink
                to="/calendar"
                className="flex flex-col text-center rounded-xl border-2 p-2"
                style={{ borderColor: color }}
              >
                {" "}
                Calendar
              </NavLink>
            </div>
          </div>
        </div>
        {!reverse && (
          <ImageCarousel
            images={cyberData}
            rowRef={cyberRef}
            next={nextCyber}
            prev={prevCyber}
          />
        )}
      </div>
    </div>
  );
};

const DivisionsPage = () => {
  return (
    <>
      <Divisions />
      <DivisionSpotlight {...algo} />
      <DivisionSpotlight {...cyber} />
      <DivisionSpotlight {...cs} />
    </>
  );
};

export default DivisionsPage;
