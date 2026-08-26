import React from "react";

const CODE_LINES = 24;

function CodeLine({ children }) {
  return <div className="h-9 leading-7 whitespace-pre text-xl">{children}</div>;
}

const Gallery = () => {
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

export default Gallery;
