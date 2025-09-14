import { steps } from "@/constants";

const HowItWorks = () => {
  return (
    <>
      <h1 className="font-[Roboto] text-[32px] font-medium tracking-[1.6] text-[#222325] capitalize text-center">
        How It Works
      </h1>

      <div className="grid grid-cols-4 md:grid-cols-8 xl:grid-cols-12 gap-[16px] mt-[60px]">
        {steps.map((item, i) => (
          <div
            className="col-span-4 md:col-span-4 xl:col-span-3 min-h-[251px] bg-white/50 p-[22px] rounded-[8px]"
            key={i}
          >
            <div className="bg-[#27C9BE] h-[45px] w-[45px] rounded-[8px] grid place-items-center font-[Roboto] font-medium text-[24px] text-white">
              {i + 1}
            </div>

            <h2 className="text-[18px] text-[#222325] tracking-[0.36] font-[Roboto] font-medium mt-[70px]">
              {item.heading}
            </h2>

            <p className="text-[#33393E] font-[Roboto] text-[14px] -tracking-[0.14] mt-[20px]">
              {item.subheading}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default HowItWorks;
