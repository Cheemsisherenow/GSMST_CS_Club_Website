import React, { useRef, useState, useLayoutEffect } from "react";
import gsap from "gsap/all";
import Typewriter from "../Typewriter";
import { CodeLine, CodeSection, RowBlock } from "../CodeLine";

const Resources = () => {
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
            <span className="text-[#E7B96B]">"/resources"</span>, (req, res)
            =&gt; {"{"}
          </CodeLine>
          <CodeLine>
            &nbsp;&nbsp;<span className="text-[#C97B63]">const</span> keeper =
            db.<span className="text-[#7FA396]">prepare</span>(
          </CodeLine>
          <CodeLine>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <span className="text-[#E7B96B]">
              "SELECT * FROM resources WHERE role = ?"
            </span>
          </CodeLine>
          <CodeLine>
            &nbsp;&nbsp;).<span className="text-[#7FA396]">get</span>(
            <span className="text-[#E7B96B]">"Google Drive"</span>);
          </CodeLine>
          <CodeLine>{""}</CodeLine>

          <RowBlock>
            <h1 className="text-[length:calc(var(--row)*8/3)] pl-[calc(var(--row)*4/3)] text-[#E7B96B] leading-none whitespace-nowrap">
              <Typewriter>
                Links that
                <br />
                makes the club
                <br />
                run faster
              </Typewriter>
            </h1>
          </RowBlock>

          <CodeLine>
            &nbsp;&nbsp;res.<span className="text-[#7FA396]">send</span>(
          </CodeLine>
          <CodeLine>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <span className="text-[#B5AFA6]">
              'Study guides, meeting notes, competition references, and existing
            </span>
          </CodeLine>
          <CodeLine>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <span className="text-[#B5AFA6]">documents live here'</span>
          </CodeLine>
          <CodeLine>&nbsp;&nbsp;);</CodeLine>
          <CodeLine>{""}</CodeLine>
          <CodeLine>{"});"}</CodeLine>
          <CodeLine>{""}</CodeLine>
          <CodeLine>module.exports = router;</CodeLine>
    </CodeSection>
  );
};

const Document_Store = [
  { path: "https://mail.google.com/mail/u/0/#inbox", title: "Placeholder" },
  { path: "placeholder link", title: "Placeholder" },
  { path: "placeholder link", title: "Placeholder" },
  { path: "placeholder link", title: "Placeholder" },
  { path: "placeholder link", title: "Placeholder" },
];
const Folder = ({ folderFront, folderBack, middleFolder }) => {
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
      className="w-[70%] cursor-pointer mx-auto"
    >
      <div className="wrapper relative">
        <div
          className="aspect-[1315/1001] bg-no-repeat bg-[length:100%_100%] pt-24 p-12"
          style={{ backgroundImage: `url(${folderBack})` }}
        >
          <div className="flex flex-col gap-8 text-2xl underline">
            {Document_Store.map((doc, i) => (
              <div key={i} className="flex items-center gap-4">
                <img src="/Doc.png" className="w-8" />
                <a
                  href={doc.path}
                  className={`transition-all duration-100 ease-in-out hover:text-[#0202b3] ${
                    clicked.has(i) ? "text-[#800080]" : "text-[#0000FF]"
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setClicked((prev) => new Set(prev).add(i));
                  }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {doc.title}
                </a>
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

const TAB_REVEAL = 150; // px

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

  const pullUp = folderHeight === null ? 0 : -(folderHeight - TAB_REVEAL);

  return (
    <div className="bg-[#1C1512] p-12">
      <div className="text-[#E7B96B] text-7xl mb-16 text-center">
        Folders of Resources
      </div>
      <div className="relative">
        <div ref={firstWrapperRef} className="relative z-0">
          <Folder
            folderFront="/FolderFront4.png"
            folderBack="/FolderBack4.png"
            middleFolder="/FolderMiddle4.png"
          />
        </div>
        <div className="relative z-10" style={{ marginTop: pullUp }}>
          <Folder
            folderFront="/FolderFront3.png"
            folderBack="/FolderBack3.png"
            middleFolder="/FolderMiddle3.png"
          />
        </div>
        <div className="relative z-20" style={{ marginTop: pullUp }}>
          <Folder
            folderFront="/FolderFront2.png"
            folderBack="/FolderBack2.png"
            middleFolder="/FolderMiddle2.png"
          />
        </div>
        <div className="relative z-30" style={{ marginTop: pullUp }}>
          <Folder
            folderFront="/FolderFront.png"
            folderBack="/FolderBack.png"
            middleFolder="/FolderMiddle.png"
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
