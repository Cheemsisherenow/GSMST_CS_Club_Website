import React, { useRef } from "react";
import { useMediaQuery } from "react-responsive";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Typewriter from "../Typewriter";
import { FitText } from "../FitText";
import {
  AlgoOfficers,
  CS101Officers,
  CyberOfficers,
  Executives,
  Heads,
  GWC,
} from "../constants";

import { CodeLine, CodeSection, RowBlock } from "../CodeLine";

gsap.registerPlugin(ScrollTrigger);

const Officers = () => {
  return (
    <CodeSection
      className="bg-[#1C1512] overflow-hidden border border-[#3a2f26]"
      contentClassName="pr-[calc(var(--row)*13/18)] text-[#f4efe8]"
    >
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
          <CodeLine indent={2}>
            &lt;<span className="text-[#C97B63]">section</span>{" "}
            class=
            <span className="text-[#E7B96B]">"divisions"</span>&gt;
          </CodeLine>
          <CodeLine indent={4}>
            &lt;
            <span className="text-[#7FA396]">h1</span>&gt;
          </CodeLine>
          <CodeLine>{""}</CodeLine>

          <RowBlock minGapRows={1}>
            <h1 className="code-h1 pl-[calc(var(--row)*4/3)] text-[#E7B96B] leading-none whitespace-nowrap">
              <Typewriter>
                The people who
                <br />
                keeps the room
                <br />
                open
              </Typewriter>
            </h1>
          </RowBlock>

          <CodeLine indent={4}>
            <span className="text-[#B5AFA6]">
              &lt;!-- /* Each division has their own lead, officers, meeting
            </span>
          </CodeLine>
          <CodeLine indent={4}>
            <span className="text-[#B5AFA6]">
              time, resource, calendar, and specializes in different fields.
            </span>
          </CodeLine>
          <CodeLine indent={4}>
            <span className="text-[#B5AFA6]">
              Each student can join multiple divisions at once */ --&gt;
            </span>
          </CodeLine>
          <CodeLine>{""}</CodeLine>
          <CodeLine indent={4}>
            &lt;
            <span className="text-[#7FA396]">/h1</span>&gt;
          </CodeLine>
          <CodeLine indent={2}>
            &lt;<span className="text-[#C97B63]">/section</span>&gt;
          </CodeLine>
          <CodeLine>
            &lt;<span className="text-[#C97B63]">/html</span>&gt;
          </CodeLine>
          <CodeLine>{""}</CodeLine>
          <CodeLine>{""}</CodeLine>
    </CodeSection>
  );
};

const MailIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
    <path d="M3 5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H3zm0 2 9 6 9-6v2l-9 6-9-6V7z" />
  </svg>
);

const OfficerCard = ({
  role,
  name,
  description,
  email,
  photo,
  color,
  title,
}) => (
  <div
    className="rounded-xl border-2 border-[var(--color)] overflow-hidden bg-[#1C1512] hover:-translate-y-0.5 duration-300 ease-in-out hover:ring-2 hover:ring-[var(--color)]/60"
    style={{ "--color": color }}
    loading="lazy"
  >
    <div className="flex items-center gap-2 bg-[var(--color)]/40 px-4 py-3">
      <span className="w-3 h-3 rounded-full bg-[#C97B63]" />
      <span className="w-3 h-3 rounded-full bg-[#E7B96B]" />
      <span className="w-3 h-3 rounded-full bg-[#7FA396]" />
      <span className="ml-2 text-2xl text-[#B5AFA6]">User@{title}:~$</span>
    </div>

    <div className="px-6 py-4 text-[#F4EFE8]">
      <div className="text-xl mb-4">
        <span className="text-[#7FA396]"> &gt; </span> {name.replace(" ", "_")}
        _Picture.png
      </div>
      <img
        src={photo}
        alt={name}
        loading="lazy"
        className="place-self-center w-3/4 aspect-square object-cover p-2 border-2 border-[var(--color)] mb-6"
      />

      <FitText className="text-[#F4EFE8] text-2xl">
        {" "}
        <span className="text-[#7FA396]"> &gt; </span> {role}
      </FitText>
      <FitText className="text-5xl font-bold leading-none text-[var(--color)] mt-2 mb-4">
        {name}
      </FitText>

      <div className="text-[#F4EFE8] mb-6 text-xl h-28 line-clamp-4">
        {" "}
        <span className="text-[#7FA396]"> &gt; </span> {description}
      </div>

      <a
        href={`mailto:${email}`}
        className="inline-flex items-center gap-2 rounded-lg border text-xl border-[#3a2f26] bg-[#241C18] px-4 py-2 hover:opacity-85 transition-all hover:-translate-y-0.5 duration-300 ease-in-out"
      >
        <MailIcon />
        Email Contact
      </a>
    </div>
  </div>
);

// Every size the connector needs, derived from one base unit — change
// STEM_HEIGHT and everything else (junction height, dot size, line
// thickness) scales with it, instead of six separate magic numbers that
// have to be kept in sync by hand.
const LINE_THICKNESS = 3; // px
const STEM_HEIGHT = 32; // px — trunk length above the dot, and each stem's length below the branch
const JUNCTION_HEIGHT = STEM_HEIGHT * 2; // px — trunk + stem stacked = the connector's total height
const DOT_SIZE = STEM_HEIGHT * 0.6; // px
const DOT_BORDER = LINE_THICKNESS + 1; // px

const OrgChartConnector = ({ columns = 3 }) => {
  // % — half a column's width = the center of the OUTER columns in an
  // N-column grid (e.g. 1/6 for 3 columns, 1/4 for 2), so the branch's
  // ends line up with the first/last stem regardless of column count.
  const branchInset = 100 / (columns * 2);
  const containerRef = useRef(null);
  const trunkRef = useRef(null);
  const branchRef = useRef(null);
  const stemRefs = useRef([]);

  useGSAP(() => {
    gsap.set(trunkRef.current, { scaleY: 0, transformOrigin: "top" });
    gsap.set(branchRef.current, { scaleX: 0, transformOrigin: "center" });
    gsap.set(stemRefs.current, { scaleY: 0, transformOrigin: "top" });

    gsap
      .timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      })
      // trunk/stems are declared at HALF their final height below (see
      // STEM_HEIGHT / 2 in the styles), specifically so that scaleY: 2
      // lands exactly back at the real STEM_HEIGHT instead of overshooting
      // past the dot/branch — the declared size and the scale target have
      // to move together, not just the scale target alone.
      .to(trunkRef.current, { scaleY: 2, duration: 0.35, ease: "power2.out" })
      .to(branchRef.current, { scaleX: 1, duration: 0.35, ease: "power2.out" })
      .to(stemRefs.current, {
        scaleY: 2,
        duration: 0.35,
        stagger: 0.08,
        ease: "power2.out",
      });
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      style={{ height: JUNCTION_HEIGHT }}
    >
      <div
        ref={trunkRef}
        className="absolute left-1/2 top-0 bg-white -translate-x-1/2"
        style={{ width: LINE_THICKNESS, height: STEM_HEIGHT / 2 }}
      />

      <div
        ref={branchRef}
        className="absolute bg-white"
        style={{
          top: STEM_HEIGHT,
          left: `${branchInset}%`,
          right: `${branchInset}%`,
          height: LINE_THICKNESS,
        }}
      />

      <span
        className="absolute left-1/2 rounded-full bg-[#4a9eff] border-white -translate-x-1/2 -translate-y-1/2 z-10"
        style={{
          top: STEM_HEIGHT,
          width: DOT_SIZE,
          height: DOT_SIZE,
          borderWidth: DOT_BORDER,
        }}
      />
      {/* one stem per column, dropping from the branch into each card —
          gap-8 matches the officer row's own gap-8 exactly, so the two
          grids' column centers line up instead of drifting apart */}
      <div
        className={`grid ${columns === 2 ? "grid-cols-2" : "grid-cols-3"} gap-8 h-full`}
      >
        {Array.from({ length: columns }, (_, i) => i).map((i) => (
          <div key={i} className="relative">
            <div
              ref={(el) => (stemRefs.current[i] = el)}
              className="absolute left-1/2 bg-white -translate-x-1/2"
              style={{
                top: STEM_HEIGHT,
                width: LINE_THICKNESS,
                height: STEM_HEIGHT / 2,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

const OfficersChart = () => {
  // Below `md` the officer grids collapse to a single column, so the
  // trunk/branch/stems have nothing to connect — skip mounting the
  // connector at all there instead of just hiding it with CSS, so its GSAP
  // scroll-trigger setup never runs for a chart that isn't visible anyway.
  const isDesktop = useMediaQuery({ minWidth: 768 });

  return (
    <div className="flex flex-col bg-[#1C1512] p-6 md:p-12 gap-16 md:gap-32">
      <div>
        <h2 className="text-3xl md:text-6xl font-bold text-[#F4EFE8] text-center mb-8 md:mb-16">
          Executive Officers
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {Executives.map((exec, i) => (
            <div key={i} className={i === 1 ? "md:-mt-8" : ""}>
              <OfficerCard
                {...exec}
                color="#F4EFE8"
                title={i === 1 ? "President" : "VicePresident"}
              />
            </div>
          ))}
        </div>
      </div>
      <div>
        <h2 className="text-3xl md:text-6xl font-bold text-[#7FA396] -mx-6 md:-mx-12 border-t-2 border-[#7FA396] text-center mb-8 md:mb-16">
          <div className="mt-6 md:mt-12">CyberDragons Officers</div>
        </h2>

        <div className="max-w-md mx-auto">
          <OfficerCard {...Heads[0]} title="HeadOfficer" color="#7FA396" />
        </div>

        {isDesktop && <OrgChartConnector />}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CyberOfficers.map((officer, i) => (
            <div key={i}>
              <OfficerCard {...officer} color="#7FA396" />
            </div>
          ))}
        </div>
      </div>
      <div>
        <h2 className="text-3xl md:text-6xl font-bold text-[#C97B63] border-t-2 border-[#C97B63] -mx-6 md:-mx-12 text-center mb-8 md:mb-16">
          <div className="mt-6 md:mt-12">Algorithmic Officers</div>
        </h2>

        <div className="max-w-md mx-auto">
          <OfficerCard {...Heads[1]} title="HeadOfficer" color="#C97B63" />
        </div>

        {isDesktop && <OrgChartConnector />}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {AlgoOfficers.map((officer, i) => (
            <div key={i}>
              <OfficerCard {...officer} color="#C97B63" />
            </div>
          ))}
        </div>
      </div>
      <div>
        <h2 className="text-3xl md:text-6xl font-bold text-[#E7B96B] border-t-2 border-[#E7B96B] -mx-6 md:-mx-12 text-center mb-8 md:mb-16">
          <div className="mt-6 md:mt-12">CS101 Officers</div>
        </h2>

        <div className="max-w-md mx-auto">
          <OfficerCard {...Heads[2]} title="HeadOfficer" color="#E7B96B" />
        </div>

        <div className="max-w-[calc((2*(100%-4rem)/3)+2rem)] mx-auto">
          {isDesktop && <OrgChartConnector columns={2} />}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {CS101Officers.slice(0, 2).map((officer, i) => (
              <div key={i}>
                <OfficerCard {...officer} color="#E7B96B" />
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-[calc((2*(100%-4rem)/3)+2rem)] mx-auto">
          {isDesktop && <OrgChartConnector columns={2} />}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {CS101Officers.slice(2, 4).map((officer, i) => (
              <div key={i}>
                <OfficerCard {...officer} color="#E7B96B" />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div>
        <h2 className="text-3xl md:text-6xl font-bold text-[#0e9c90] border-t-2 text-center mb-8 md:mb-16 -mx-6 md:-mx-12">
          <div className="mt-6 md:mt-12">Girls Who Code</div>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {GWC.map((exec, i) => (
            <div key={i}>
              <OfficerCard {...exec} color="#0e9c90" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const OfficersPage = () => {
  return (
    <>
      <Officers />
      <OfficersChart />
    </>
  );
};

export default OfficersPage;
