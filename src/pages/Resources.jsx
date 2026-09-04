import React, { useRef, useState, useLayoutEffect } from "react";
import gsap from "gsap/all";
import { useMediaQuery } from "react-responsive";
import Typewriter from "../Typewriter";
import { CodeLine, CodeSection, RowBlock } from "../CodeLine";

const Resources = () => {
  // "Club Resources" as one line is wider than code-h1's mobile size can fit
  // in a phone viewport — whitespace-nowrap means it doesn't wrap, it just
  // gets silently clipped by CodeSection's overflow-hidden. Same fix as
  // Home.jsx's Hero: break it across two lines only below the md breakpoint.
  const isDesktop = useMediaQuery({ minWidth: 768 });
  return (
    <CodeSection
      className="bg-[#1C1512] overflow-hidden border border-[#3a2f26]"
      contentClassName="pr-[calc(var(--row)*13/18)] text-[#f4efe8]"
    >
      <CodeLine>
        <span className="text-[#C97B63]">const</span> express ={" "}
        <span className="text-[#7FA396]">require</span>(
        <span className="text-[#E7B96B]">"express"</span>);
      </CodeLine>
      <CodeLine>
        <span className="text-[#C97B63]">const</span> db ={" "}
        <span className="text-[#7FA396]">require</span>(
        <span className="text-[#E7B96B]">"./db"</span>);
      </CodeLine>
      <CodeLine>
        <span className="text-[#453D34]">// Need help?</span>
      </CodeLine>
      <CodeLine>
        <span className="text-[#C97B63]">const</span> router = express.
        <span className="text-[#7FA396]">Router</span>();
      </CodeLine>
      <CodeLine>{""}</CodeLine>
      <CodeLine>
        router.<span className="text-[#7FA396]">get</span>(
        <span className="text-[#E7B96B]">"/resources"</span>, (req, res) =&gt;{" "}
        {"{"}
      </CodeLine>
      <CodeLine indent={2}>
        <span className="text-[#C97B63]">const</span> keeper = db.
        <span className="text-[#7FA396]">prepare</span>(
      </CodeLine>
      <CodeLine indent={4}>
        <span className="text-[#E7B96B]">
          "SELECT * FROM resources WHERE role = ?"
        </span>
      </CodeLine>
      <CodeLine indent={2}>
        ).<span className="text-[#7FA396]">get</span>(
        <span className="text-[#E7B96B]">"Google Drive"</span>);
      </CodeLine>
      <CodeLine>{""}</CodeLine>

      <RowBlock minGapRows={1}>
        <h1 className="code-h1 pl-[calc(var(--row)*4/3)] text-[#E7B96B] leading-none whitespace-nowrap px-6 md:px-12">
          {isDesktop ? (
            <Typewriter>Club Resources</Typewriter>
          ) : (
            <Typewriter>
              Club
              <br />
              Resources
            </Typewriter>
          )}
        </h1>
      </RowBlock>

      <CodeLine indent={2}>
        res.<span className="text-[#7FA396]">send</span>(
      </CodeLine>
      <CodeLine indent={4}>
        <span className="text-[#B5AFA6]">
          'Includes links, meeting notes/overviews, and competition resources.'
        </span>
      </CodeLine>
      
      <CodeLine indent={2}>);</CodeLine>
      <CodeLine>{""}</CodeLine>
      <CodeLine>{"});"}</CodeLine>
      <CodeLine>{""}</CodeLine>
      <CodeLine>module.exports = router;</CodeLine>
    </CodeSection>
  );
};


const studyGuides = [

  [
    {
      category: "CyberDragons",
      links: [
        {
          path: "https://lmcyberquestacademy.com/",
          title: "CyberQuest Academy",
        },
        { path: "https://www.uscyberpatriot.org/", title: "CyberPatriot" },
        {
          path: "https://www.hackthebox.com/",
          title: "Hack The Box",
        },
        {
          path: "https://ctftime.org/",
          title: "CTFtime",
        },
      ],
    },
    {
      category: "Algorithimic Programming",
      links: [
        { path: "https://usaco.guide/", title: "USACO Guide" },
        {
          path: "https://lmcodequestacademy.com/",
          title: "CodeQuest Academy",
        },
      ],
    },
  ],
  [
    {
      category: "CS101",
      links: [
        { path: "https://www.w3schools.com/", title: "W3Schools" },
        { path: "https://replit.com/", title: "Replit" },
      ],
    },
  ],
];

const meetingNotes = [
  [
    {
      category: "CyberDragons",
      links: [
        {
          path: "https://docs.google.com/document/d/1P3DcdxkvPQxcaLDiwHL99OiXnzSnPyVpv0AeCX3tRv4/edit?tab=t.d0l30rs3wtw4#heading=h.ozlmfn334fdg",
          title: "Meeting Slides",
        },
      ],
    },
    {
      category: "Algorithimic Programming",
      links: [
        {
          path: "https://docs.google.com/document/d/1P3DcdxkvPQxcaLDiwHL99OiXnzSnPyVpv0AeCX3tRv4/edit?tab=t.mt6muvbkfxf#heading=h.ozlmfn334fdg",
          title: "Meeting Slides",
        },
      ],
    },
  ],
  [
    {
      category: "CS101",
      links: [
        {
          path: "https://docs.google.com/document/d/1P3DcdxkvPQxcaLDiwHL99OiXnzSnPyVpv0AeCX3tRv4/edit?tab=t.0",
          title: "Meeting Slides",
        },
      ],
    },
    {
      category: "Artifical Intelligence",
      links: [
        {
          path: "https://docs.google.com/document/d/1P3DcdxkvPQxcaLDiwHL99OiXnzSnPyVpv0AeCX3tRv4/edit?tab=t.yh562svsquw4#heading=h.ozlmfn334fdg",
          title: "Meeting Slides",
        },
      ],
    },
  ],
];
const clubLinks = [
  [
    {
      category: "",
      links: [
        {
          path: "https://docs.google.com/spreadsheets/d/1aTGhorqidj2kdnJBK-TOjv3WCl3vbJXsDLGLE0p5x0s/edit?gid=0#gid=0",
          title: "Volunteering Opportunities ",
        },
      ],
    },
  ],
];

const competitionResources = [
  [
    {
      category: "",
      links: [
        {
          path: "https://docs.google.com/spreadsheets/d/18WmoMTBTS7A4_YEk5dnGt1tmTQ6QZf0ctPI5-updE6I/edit?gid=0#gid=0",
          title: "Competition List",
        },
      ],
    },
  ],
];

const Folder = ({ folderFront, folderBack, documents = [] }) => {
  const baseHeight = useRef(null);
  const isOpen = useRef(false);
  const [clicked, setClicked] = useState(() => new Set());

  const open = (el) => {
    if (baseHeight.current === null) baseHeight.current = el.offsetHeight;
    gsap.to(el, { height: baseHeight.current * 2, duration: 0.6 });
    gsap.to(el.querySelector(".backFolder"), {
      rotationX: 185,
      transformOrigin: "bottom center",
      duration: 0.6,
    });

    isOpen.current = true;
  };

  const close = (el) => {
    gsap.to(el, { height: baseHeight.current, duration: 0.6 });
    gsap.to(el.querySelector(".backFolder"), {
      rotationX: 0,
      transformOrigin: "bottom center",
      duration: 0.6,
    });

    isOpen.current = false;
  };

  return (
    <div
      onClick={(e) => {
        const el = e.currentTarget;
        isOpen.current ? close(el) : open(el);
      }}
      onMouseLeave={(e) => {
        if (isOpen.current) close(e.currentTarget);
      }}
      className="w-full md:w-[70%] cursor-pointer mx-auto"
    >
      <div className="wrapper relative">
        <div
          className="aspect-[1315/1001] bg-no-repeat bg-[length:100%_100%] pt-[12%] px-[6%] pb-[4%] md:pt-24 md:p-12"
          style={{ backgroundImage: `url(${folderBack})` }}
        >
          <div className="grid grid-cols-2 gap-x-4 md:gap-x-8 text-[clamp(9px,2.2vw,24px)]">
            {documents.map((column, ci) => (
              <div key={ci} className="flex flex-col gap-3 md:gap-6">
                {column.map((group, gi) => (
                  <div key={gi} className="flex flex-col gap-1.5 md:gap-3">
                    <div className="font-bold text-black">
                      {group.category}
                    </div>
                    <div className="flex flex-col gap-1.5 md:gap-3 pl-3 md:pl-6">
                      {group.links.map((doc, i) => {
                        const key = `${ci}-${gi}-${i}`;
                        return (
                          <div
                            key={key}
                            className="flex items-center gap-2 md:gap-4"
                          >
                            <img
                              src="/Doc.png"
                              className="w-4 md:w-8 shrink-0"
                            />
                            <a
                              href={doc.path}
                              className={`underline transition-all duration-100 ease-in-out hover:text-[#0202b3] ${
                                clicked.has(key)
                                  ? "text-[#800080]"
                                  : "text-[#0000FF]"
                              }`}
                              onClick={(e) => {
                                e.stopPropagation();
                                setClicked((prev) => new Set(prev).add(key));
                              }}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {doc.title}
                            </a>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div
          className="backFolder absolute inset-x-0 z-10 bottom-0 aspect-[1315/886] bg-no-repeat bg-[length:100%_100%]"
          style={{ backgroundImage: `url(${folderFront})` }}
        ></div>
      </div>
    </div>
  );
};

// Fraction of a folder's height left visible as its "tab" when the stack
// overlaps. A ratio rather than a fixed px so the overlap stays proportional
// once the folders shrink on mobile — 150px of a 640px-tall desktop folder
// reads as a tab, but of a ~260px mobile one it's most of the folder.
const TAB_REVEAL_RATIO = 0.235;

const ResourceFolders = () => {
  const firstWrapperRef = useRef(null);
  const [folderHeight, setFolderHeight] = useState(null);

  useLayoutEffect(() => {
    const wrapper = firstWrapperRef.current?.querySelector(".wrapper");
    if (!wrapper) return;
    const ro = new ResizeObserver(([entry]) => {
      setFolderHeight(entry.contentRect.height);
    });
    ro.observe(wrapper);
    return () => ro.disconnect();
  }, []);

  const pullUp =
    folderHeight === null ? 0 : -(folderHeight * (1 - TAB_REVEAL_RATIO));

  return (
    <div className="bg-[#1C1512] p-4 md:p-12">
      <div className="text-[#E7B96B] text-3xl md:text-7xl mb-8 md:mb-16 text-center">
        Folders of Resources
      </div>
      <div className="relative">
        <div ref={firstWrapperRef} className="relative z-0">
          <Folder
            folderFront="/Folder4/FolderFront4.png"
            folderBack="/Folder4/FolderBack4.png"
            documents={studyGuides}
          />
        </div>
        <div className="relative z-10" style={{ marginTop: pullUp }}>
          <Folder
            folderFront="/Folder3/FolderFront3.png"
            folderBack="/Folder3/FolderBack3.png"
            documents={clubLinks}
          />
        </div>
        <div className="relative z-20" style={{ marginTop: pullUp }}>
          <Folder
            folderFront="/Folder2/FolderFront2.png"
            folderBack="/Folder2/FolderBack2.png"
            documents={meetingNotes}
          />
        </div>
        <div className="relative z-30" style={{ marginTop: pullUp }}>
          <Folder
            folderFront="/Folder1/FolderFront.png"
            folderBack="/Folder1/FolderBack.png"
            documents={competitionResources}
          />
        </div>
      </div>
    </div>
  );
};

const ResourcesPage = () => (
  <>
    <Resources />
    <ResourceFolders />
  </>
);

export default ResourcesPage;
