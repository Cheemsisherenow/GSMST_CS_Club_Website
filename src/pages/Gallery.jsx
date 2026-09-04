import React, { useRef, useState, useEffect, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useMediaQuery } from "react-responsive";
import Typewriter from "../Typewriter";
import { CodeLine, CodeSection, RowBlock } from "../CodeLine";
import { supabase } from "../supabaseClient";
gsap.registerPlugin(ScrollTrigger);

const GalleryHero = () => {
  // "Memory Archive" as one line overflows code-h1's mobile size and gets
  // silently clipped by CodeSection's overflow-hidden — same fix as
  // Home.jsx's Hero: break it across two lines only below the md breakpoint.
  const isDesktop = useMediaQuery({ minWidth: 768 });
  return (
    <CodeSection
      className="bg-[#1C1512] overflow-hidden border border-[#3a2f26]"
      contentClassName="pr-[calc(var(--row)*13/18)] text-[#f4efe8]"
    >
      <CodeLine>
        <span className="text-[#C97B63]">INSERT INTO</span> archive_db.images
        (file_name, description, folder_name, tag_name, uploaded_at)
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
        <h1 className="code-h1 pl-[calc(var(--row)*4/3)] text-[#E7B96B] leading-none whitespace-nowrap px-6 md:px-12">
          {isDesktop ? (
            <Typewriter>Memory Archive</Typewriter>
          ) : (
            <Typewriter>
              Memory
              <br />
              Archive
            </Typewriter>
          )}
        </h1>
      </RowBlock>

      <CodeLine indent={2}>
        <span className="text-[#B5AFA6]">
          /* Here you’ll find event photos, recap videos, 
          <br/> project showcases, and
          the history of CS club. */
        </span>
      </CodeLine>
      
      <CodeLine>{""}</CodeLine>
      <CodeLine>
        <span className="text-[#C97B63]">FROM</span> gallery_db.images{" "}
        <span className="text-[#C97B63]">i</span>
      </CodeLine>
      <CodeLine>
        <span className="text-[#C97B63]">JOIN</span> gallery_db.folders{" "}
        <span className="text-[#C97B63]">f ON</span> f.folder_id = i.folder_id
      </CodeLine>
      <CodeLine>
        <span className="text-[#C97B63]">LEFT JOIN</span> gallery_db.image_tags{" "}
        <span className="text-[#C97B63]">it ON</span> it.image_id = i.image_id
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

  // Group by category instead of one flat, unsorted strip. A Map (not a
  // plain object) preserves insertion order, so categories land in the
  // strip in the order their first (newest, since the query is already
  // created_at desc) photo appeared — not alphabetized.
  const categories = useMemo(() => {
    const map = new Map();
    for (const img of images) {
      const cat = img.category?.trim() || "Uncategorized";
      if (!map.has(cat)) map.set(cat, []);
      map.get(cat).push(img);
    }
    return [...map.entries()];
  }, [images]);

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
      <div className="flex items-center flex-wrap gap-3 md:gap-6">
        Gallery Caraselle
      </div>
      {/* No shared height on the row or max-h-full on the images — that
          forced every photo to the same clamped height regardless of its
          own dimensions (tall photos got capped, and since virtually every
          upload is taller than a 40-60vh cap, they all ended up identical).
          Instead each image gets a fixed WIDTH and h-auto, so its rendered
          height falls out of its own natural aspect ratio. */}
      <div ref={scrollerRef} className="flex gap-4 mt-8 overflow-x-auto">
        <div className="flex gap-6 items-center">
          {categories.map(([category, imgs]) => (
            <React.Fragment key={category}>
              {/* No sort button — instead, a vertical divider with the
                  category name sitting above it marks where each group
                  starts, so the photos to its right are all that category
                  until the next divider. self-stretch (not the row's own
                  items-center) is what makes the line actually reach the
                  full row height, whatever the tallest photo turns out to
                  be — items-center alone would leave it hugging its own
                  (near-zero) content height. */}
              <div className="flex flex-col items-center self-stretch shrink-0 gap-2">
                <div className="text-sm md:text-xl font-bold text-[#F4EFE8] whitespace-nowrap">
                  {category}
                </div>
                <div className="w-1 flex-1 rounded-full bg-[#3a2f26]" />
              </div>
              {imgs.map((img) => (
                <img
                  key={img.id}
                  src={img.image_url}
                  alt={img.caption || ""}
                  className="gallery-img w-[70vw] sm:w-72 md:w-96 h-auto shrink-0 rounded-xl"
                  loading="lazy"
                />
              ))}
            </React.Fragment>
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
