import ScrollMaskSection from "../_components/about/ScrollMaskSection";

export default function AboutPage() {
  return (
    <main>
      <ScrollMaskSection
        textLines={[
          { value: "Welcome to", className: "text-[10vw]" },
          { value: "SLIC MEDIA", className: "text-[12vw]" },
        ]}
      />

      <div className="h-[120vh] text-white flex items-center justify-center">
        <p className="opacity-70">Content after</p>
      </div>
    </main>
  );
}
