import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

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

const president = {
  role: "President",
  name: "Jackie Lu",
  description:
    "Description blah blah blah blah blah blah blah bla blah blah blah blah blah blah blah",
  email: "Jackielu@gmail.com",
  photo: "https://placehold.co/300x300/1C1512/e3c088?text=Photo",
};
const officers = [president, president, president]; 
const MailIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
    <path d="M3 5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H3zm0 2 9 6 9-6v2l-9 6-9-6V7z" />
  </svg>
);

const OfficerCard = ({ role, name, description, email, photo, color }) => (
  <div
    className="rounded-xl border-2 border-[var(--color)] overflow-hidden bg-[#1C1512]"
    style={{ "--color": color }}
  >
    <div className="flex items-center gap-2 bg-[var(--color)]/40 px-4 py-3">
      <span className="w-3 h-3 rounded-full bg-[#C97B63]" />
      <span className="w-3 h-3 rounded-full bg-[#E7B96B]" />
      <span className="w-3 h-3 rounded-full bg-[#7FA396]" />
      <span className="ml-2 text-2xl text-[#B5AFA6]">User@{role}:~$</span>
    </div>

    <div className="px-6 py-4 text-[#F4EFE8]">
      <div className="text-xl mb-4">
        <span className="text-[#7FA396]"> &gt; </span> {name.replace(" ", "_")}
        _Picture.png
      </div>
      <img
        src={photo}
        alt={name}
        className="place-self-center w-3/4 aspect-square object-cover border-2 border-[var(--color)] mb-6"
      />

      <div className="text-[#F4EFE8] text-2xl">
        {" "}
        <span className="text-[#7FA396]"> &gt; </span> {role}
      </div>
      <div className="text-5xl font-bold text-[var(--color)] mb-4">{name}</div>

      <div className="text-[#F4EFE8] mb-6 text-xl">
        {" "}
        <span className="text-[#7FA396]"> &gt; </span> Description {description}
      </div>

      <a
        href={`mailto:${email}`}
        className="inline-flex items-center gap-2 rounded-lg border text-xl border-[#3a2f26] bg-[#241C18] px-4 py-2 hover:opacity-85 transition-opacity"
      >
        <MailIcon />
        {email}
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
const BRANCH_INSET = 100 / 6; // % — 1/6 of the width = the center of the outer columns in a 3-column grid

const OrgChartConnector = () => {
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
          left: `${BRANCH_INSET}%`,
          right: `${BRANCH_INSET}%`,
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
      <div className="grid grid-cols-3 gap-8 h-full">
        {[0, 1, 2].map((i) => (
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
  return (
    <div className="flex flex-col bg-[#1C1512] p-12 gap-32">
      <div>
        <h2 className="text-6xl font-bold text-[#F4EFE8] text-center mb-16">
          Executive Officers
        </h2>
        <div className="grid grid-cols-3 gap-8">
          {officers.map((officer, i) => (
            <div key={i} className={i === 1 ? "-mt-8" : ""}>
              <OfficerCard {...officer} color="#F4EFE8" />
            </div>
          ))}
        </div>
      </div>
      <div>
        <h2 className="text-6xl font-bold text-[#7FA396] -mx-12 border-t-2 border-[#7FA396] text-center mb-16">
          <div className="mt-12">CyberDragons Officers</div>
        </h2>

        <div className="max-w-md mx-auto">
          <OfficerCard {...president} color="#7FA396" />
        </div>

        <OrgChartConnector />

        <div className="grid grid-cols-3 gap-8">
          {officers.map((officer, i) => (
            <div key={i}>
              <OfficerCard {...officer} color="#7FA396" />
            </div>
          ))}
        </div>
      </div>
      <div>
        <h2 className="text-6xl font-bold text-[#C97B63] border-t-2 border-[#C97B63] -mx-12 text-center mb-16">
          <div className="mt-12">Algorithmic Officers</div>
        </h2>

        <div className="max-w-md mx-auto">
          <OfficerCard {...president} color="#C97B63" />
        </div>

        <OrgChartConnector />

        <div className="grid grid-cols-3 gap-8">
          {officers.map((officer, i) => (
            <div key={i}>
              <OfficerCard {...officer} color="#C97B63" />
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
