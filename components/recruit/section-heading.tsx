type SectionHeadingProps = {
  label?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
};

export function SectionHeading({
  label,
  title,
  description,
  align = "left",
  light = false,
}: SectionHeadingProps) {
  return (
    <div className={align === "center" ? "text-center" : ""}>
      {label ? (
        <p
          className={`text-sm font-semibold tracking-[0.35em] uppercase ${
            light ? "text-red-200" : "text-red-600"
          }`}
        >
          {label}
        </p>
      ) : null}
      <h2
        className={`mt-3 text-3xl font-bold tracking-tight md:text-5xl ${
          light ? "text-white" : "text-gray-900"
        }`}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={`mt-5 max-w-3xl text-sm leading-7 md:text-base md:leading-8 ${
            align === "center" ? "mx-auto" : ""
          } ${light ? "text-white/80" : "text-gray-600"}`}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
