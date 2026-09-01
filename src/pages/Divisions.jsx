import React, { useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Typewriter from "../Typewriter";
import { CodeLine, CodeSection, RowBlock } from "../CodeLine";

const Divisions = () => {
  return (
    <CodeSection
      className="bg-[#1C1512] overflow-hidden border border-b-2 border-[#3a2f26]"
      contentClassName="pr-[calc(var(--row)*13/18)] text-[#f4efe8]"
    >
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
        <span className="text-[#453D34]">// We have niches for everyone!</span>
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

      {/* Not a CodeLine — RowBlock measures it and pads it out to a
              whole number of rows, whatever text size it ends up. */}
      <RowBlock minGapRows={1}>
        <h1 className="text-[length:calc(var(--row)*8/3)] pl-[calc(var(--row)*4/3)] text-[#E7B96B] leading-none whitespace-nowrap">
          <Typewriter>
            Choose a track
            <br />
            without
            <br />
            choosing a box
          </Typewriter>
        </h1>
      </RowBlock>

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
    </CodeSection>
  );
};

const algoData = [
  "/DivisionPictures/Algo/IMG1.jpg",
  "/DivisionPictures/Algo/IMG2.jpg",
  "/DivisionPictures/Algo/IMG3.jpg",
];
const cyberData = [
  "/DivisionPictures/Cyber/IMG1.jpg",
  "/DivisionPictures/Cyber/IMG2.jpg",
  "/DivisionPictures/Cyber/IMG3.jpg",
];
const csData = [
  "/DivisionPictures/CS101/IMG1.jpg",
  "/DivisionPictures/CS101/IMG2.jpg",
  "/DivisionPictures/CS101/IMG3.jpg",
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
            style={{ width: `${100 / count}%` }}
          />
        ))}
      </div>
      <button
        onClick={prev}
        aria-label="Previous image"
        className="absolute left-5 top-1/2 -translate-y-1/2 text-4xl text-white drop-shadow p-2 rounded-full trnasition-all  duration-300 ease-in-out hover:bg-[#9c968e]/60"
      >
        &lt;
      </button>
      <button
        onClick={next}
        aria-label="Next image"
        className="absolute right-5 top-1/2 -translate-y-1/2 text-4xl text-white drop-shadow rounded-full trnasition-all  duration-300 ease-in-out p-2 hover:bg-[#9c968e]/60"
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
  meeting: "09/10/2026",
  room: "5.433",
  reverse: true,
  images: algoData,
};
const cyber = {
  color: "#7FA396",
  track: "// Cybersecurity Track",
  title: "CyberDragons",
  description:
    "Placeholder description for cybersecurity lessons, CTF practice, responsible disclosure, and team discussion.",
  lead: "Luke Cheng",
  meeting: "09/02/2026",
  room: "5.",
  images: cyberData,
};

const cs = {
  color: "#E7B96B",
  track: "// Beginner Track",
  title: "CS101",
  description:
    "Placeholder description for students learning programming fundamentals, web basics, debugging habits, and project confidence",
  lead: "Stephen Akrong",
  meeting: "09/08/2026",
  room: "5.401",
  reverse: true,
  images: csData,
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
  images,
}) => {
  // One slider, built from whichever image set this specific division
  // passed in — not one hardcoded/shared slider for every instance.
  const { next, prev, rowRef } = useSlider(images.length);

  return (
    <div className="bg-[#1C1512] overflow-hidden p-12 text-black">
      <div
        className={`grid ${
          reverse ? "grid-cols-[3fr_2fr]" : "grid-cols-[2fr_3fr]"
        } bg-white rounded-3xl overflow-hidden`}
      >
        {reverse && (
          <ImageCarousel
            images={images}
            rowRef={rowRef}
            next={next}
            prev={prev}
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
                className="flex flex-col text-center rounded-xl border-2 p-2 transition-all ease-in-out duration-300 hover:opacity-85 hover:-translate-y-0.5"
                style={{ borderColor: color }}
              >
                {" "}
                Resources
              </NavLink>
              <NavLink
                to="/calendar"
                className="flex flex-col text-center rounded-xl border-2 p-2 transition-all ease-in-out duration-300 hover:opacity-85 hover:-translate-y-0.5"
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
            images={images}
            rowRef={rowRef}
            next={next}
            prev={prev}
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
