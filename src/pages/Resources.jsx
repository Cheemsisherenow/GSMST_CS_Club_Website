import React, { useRef, useState, useLayoutEffect } from "react";
import gsap from "gsap/all";

const CODE_LINES = 27;

function CodeLine({ children }) {
  return <div className="h-9 leading-7 whitespace-pre text-xl">{children}</div>;
}

const Resources = () => {
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

          {/* --- HEADLINE: not a CodeLine, so it ignores the 36px rhythm --- */}
          <h1 className="text-8xl pl-12 text-[#E7B96B] leading-none whitespace-nowrap mb-9">
            Links that
            <br />
            makes the club
            <br />
            run faster
          </h1>

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
        </div>
      </div>
    </div>
  );
};

const Folder = ({ folderFront, folderBack }) => {
  const baseHeight = useRef(null);
  const isOpen = useRef(false);

  const open = (el) => {
    if (baseHeight.current === null) baseHeight.current = el.offsetHeight;
    gsap.to(el, { height: baseHeight.current * 2, duration: 0.6 });
    gsap.to(el.querySelector(".backFolder"), {
      rotationX: 180,
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
    >
      <div className="wrapper relative">
        <div
          className="w-[70%] mx-auto aspect-[1315/1001] bg-no-repeat bg-[length:100%_100%]"
          style={{ backgroundImage: `url(${folderBack})` }}
        ></div>
        <div
          className="backFolder absolute inset-x-0 z-10 bottom-0 w-[70%] mx-auto aspect-[1315/886] bg-no-repeat bg-[length:100%_100%]"
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
      <div className="relative">
        <div ref={firstWrapperRef} className="relative z-0">
          <Folder
            folderFront="/FolderFront4.png"
            folderBack="/FolderBack4.png"
          />
        </div>
        <div className="relative z-10" style={{ marginTop: pullUp }}>
          <Folder
            folderFront="/FolderFront3.png"
            folderBack="/FolderBack3.png"
          />
        </div>
        <div className="relative z-20" style={{ marginTop: pullUp }}>
          <Folder
            folderFront="/FolderFront2.png"
            folderBack="/FolderBack2.png"
          />
        </div>
        <div className="relative z-30" style={{ marginTop: pullUp }}>
          <Folder folderFront="/FolderFront.png" folderBack="/FolderBack.png" />
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
