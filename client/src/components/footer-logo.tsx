"use client";
import { useRouter } from "next/navigation";

const logoPillars = [
  {
    color: "#6392D8",
    height: "15px",
  },

  {
    color: "#27C9BE",
    height: "20px",
  },

  {
    color: "#6392D8",
    height: "20px",
  },
];

const FooterLogo = () => {
  const router = useRouter();

  return (
    <div
      className="flex items-center gap-x-[6px] cursor-pointer"
      onClick={() => router.push("/")}
    >
      <div className="flex gap-x-[2px] items-end">
        {logoPillars.map((pillar, i) => (
          <span
            key={i}
            className="rounded-[2px]"
            style={{
              width: "7px",
              height: pillar.height,
              backgroundColor: pillar.color,
            }}
          />
        ))}
      </div>
      <span className="font-[Roboto] font-bold text-[18px] text-[#292929] tracking-[1.8]">
        kajBazar
      </span>
    </div>
  );
};

export default FooterLogo;
