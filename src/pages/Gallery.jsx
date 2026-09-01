import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Typewriter from "../Typewriter";
import { CodeLine, CodeSection, RowBlock } from "../CodeLine";
import { supabase } from "../supabaseClient";
gsap.registerPlugin(ScrollTrigger);

const GalleryHero = () => {
  return (
    <CodeSection
      className="bg-[#1C1512] overflow-hidden border border-[#3a2f26]"
      contentClassName="pr-[calc(var(--row)*13/18)] text-[#f4efe8]"
    >
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

          <RowBlock minGapRows={1}>
            <h1 className="code-h1 pl-[calc(var(--row)*4/3)] text-[#E7B96B] leading-none whitespace-nowrap">
              <Typewriter>
                Saving
                <br />
                memories of
                <br />
                the club
              </Typewriter>
            </h1>
          </RowBlock>

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
    </CodeSection>
  );
};

const SlideingGallery = () => {
  const scrollerRef = useRef(null);
  const [images, setImages] = useState([]);

  useEffect(() => {
    supabase
      .from("gallery_images")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (error) console.error(error);
        else setImages(data);
      });
  }, []);

  // Same reveal-as-you-scroll + "wait for images to actually load before
  // trusting ScrollTrigger's measurements" logic as before, just re-run
  // whenever the set of images changes instead of only once.
  useGSAP(
    () => {
      const els = gsap.utils.toArray(".gallery-img");
      els.forEach((img) => {
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

      const unloaded = els.filter((img) => !img.complete);
      if (unloaded.length === 0) return;
      let remaining = unloaded.length;
      const onLoad = () => {
        remaining -= 1;
        if (remaining === 0) ScrollTrigger.refresh();
      };
      unloaded.forEach((img) => img.addEventListener("load", onLoad));
      return () =>
        unloaded.forEach((img) => img.removeEventListener("load", onLoad));
    },
    { dependencies: [images.map((img) => img.id).join(",")] }
  );

  return (
    <div className="bg-[#1C1512] overflow-hidden p-4 md:p-12 text-[#E7B96B] text-3xl md:text-6xl ">
      Gallery Caraselle
      <div ref={scrollerRef} className="flex gap-4 mt-8 overflow-x-auto">
        <div className="flex gap-4 items-center h-[40vh] md:h-[60vh]">
          {images.map((img) => (
            <img
              key={img.id}
              src={img.image_url}
              alt={img.caption || ""}
              className="gallery-img max-h-full shrink-0 rounded-xl"
              loading="lazy"
            />
          ))}
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
