import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(ScrollTrigger);

const CODE_LINES = 24;

function CodeLine({ children }) {
  return <div className="h-9 leading-7 whitespace-pre text-xl">{children}</div>;
}

const GalleryHero = () => {
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
            <span className="text-[#C97B63]">INSERT INTO</span>{" "}
            archive_db.images (file_name, description, folder_name, tag_name,
            uploaded_at)
          </CodeLine>
          <CodeLine>{""}</CodeLine>
          <CodeLine>
            <span className="text-[#453D34]">-- Proof the club is alive</span>
          </CodeLine>
          <CodeLine>
            <span className="text-[#C97B63]">SELECT</span> i.file_name,
            i.description, f.folder_name, it.tag_name, i.uploaded_at
          </CodeLine>
          <CodeLine>{""}</CodeLine>

          {/* --- HEADLINE: not a CodeLine, so it ignores the 36px rhythm --- */}
          <h1 className="text-8xl pl-12 text-[#E7B96B] leading-none whitespace-nowrap mb-9">
            Saving
            <br />
            memories of
            <br />
            the club
          </h1>

          <CodeLine>
            &nbsp;&nbsp;
            <span className="text-[#B5AFA6]">
              /* Events photos, recap videos, project showcases, and the
            </span>
          </CodeLine>
          <CodeLine>
            &nbsp;&nbsp;
            <span className="text-[#B5AFA6]">history of CS club */</span>
          </CodeLine>
          <CodeLine>{""}</CodeLine>
          <CodeLine>
            <span className="text-[#C97B63]">FROM</span> gallery_db.images{" "}
            <span className="text-[#C97B63]">i</span>
          </CodeLine>
          <CodeLine>
            <span className="text-[#C97B63]">JOIN</span> gallery_db.folders{" "}
            <span className="text-[#C97B63]">f ON</span> f.folder_id =
            i.folder_id
          </CodeLine>
          <CodeLine>
            <span className="text-[#C97B63]">LEFT JOIN</span>{" "}
            gallery_db.image_tags <span className="text-[#C97B63]">it ON</span>{" "}
            it.image_id = i.image_id
          </CodeLine>
          <CodeLine>{""}</CodeLine>
          <CodeLine>
            <span className="text-[#C97B63]">WHERE</span> f.published ={" "}
            <span className="text-[#7FA396]">TRUE</span>
          </CodeLine>
          <CodeLine>
            <span className="text-[#C97B63]">ON CONFLICT</span> (file_name){" "}
            <span className="text-[#C97B63]">DO NOTHING</span>;
          </CodeLine>
          <CodeLine>{""}</CodeLine>
        </div>
      </div>
    </div>
  );
};

const SlideingGallery = () => {
  const scrollerRef = useRef(null);

  useGSAP(() => {
    const images = gsap.utils.toArray(".gallery-img");
    images.forEach((img) => {
      gsap.from(img, {
        opacity: 0,
        duration: 0.6,
        scrollTrigger: {
          trigger: img,
          scroller: scrollerRef.current,
          horizontal: true,
          start: "left 90%",
          toggleActions: "play reverse play reverse",
        },
      });
    });

    const unloaded = images.filter((img) => !img.complete);
    if (unloaded.length === 0) return;
    let remaining = unloaded.length;
    const onLoad = () => {
      remaining -= 1;
      if (remaining === 0) ScrollTrigger.refresh();
    };
    unloaded.forEach((img) => img.addEventListener("load", onLoad));
    return () =>
      unloaded.forEach((img) => img.removeEventListener("load", onLoad));
  }, []);
  return (
    <div className="bg-[#1C1512] overflow-hidden p-12 text-[#E7B96B] text-6xl ">
      Gallery Caraselle
      <div ref={scrollerRef} className="flex gap-4 mt-8 overflow-x-auto">
        <div className="flex text-[#F4EFE8] text-3xl gap-8 flex-col">
          Placeholder
          <div className="flex gap-4 items-center border-l-2 p-4 pl-8 h-[60vh] ">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdQogZKb-T6BI-dJRKvEXik0uD8bapenlK3xYUqQU6wA&s=10"
              alt=""
              className="gallery-img max-h-full shrink-0 rounded-xl"
              loading="lazy"
            />
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdQogZKb-T6BI-dJRKvEXik0uD8bapenlK3xYUqQU6wA&s=10"
              alt=""
              className=" gallery-img max-h-full shrink-0"
            />
            <img
              src="/c++.webp"
              alt=""
              className="gallery-img max-h-full bg-white shrink-0"
            />
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdQogZKb-T6BI-dJRKvEXik0uD8bapenlK3xYUqQU6wA&s=10"
              alt=""
              className=" gallery-img max-h-full shrink-0"
            />

            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdQogZKb-T6BI-dJRKvEXik0uD8bapenlK3xYUqQU6wA&s=10"
              alt=""
              className=" gallery-img max-h-full shrink-0 "
              loading="lazy"
            />
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdQogZKb-T6BI-dJRKvEXik0uD8bapenlK3xYUqQU6wA&s=10"
              alt=""
              className=" gallery-img max-h-full shrink-0 "
              loading="lazy"
            />
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdQogZKb-T6BI-dJRKvEXik0uD8bapenlK3xYUqQU6wA&s=10"
              alt=""
              className=" gallery-img max-h-full shrink-0 "
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const Gallery = () => {
  return (
    <>
      <GalleryHero />
      <SlideingGallery />
    </>
  );
};
export default Gallery;
