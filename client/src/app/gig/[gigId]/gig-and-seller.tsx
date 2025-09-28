import { Star } from "lucide-react";

const GigAndSeller = () => {
  return (
    <div className="grid grid-cols-12 rounded-[4px] bg-[#FEFEFF] gap-[12px] p-[12px]">
      <div className="col-span-12 md:col-span-7 xl:col-span-8 rounded-[4px] min-h-[400px] overflow-hidden h-[458px]">
        <img
          className="w-full h-full object-cover object-center"
          src="https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/248347534/original/3f3a487e81848f53a40be787069783efb31ea61e/create-attractive-gig-image-e1fd.jpg"
          alt="gig"
        />
      </div>

      <div className="col-span-12 md:col-span-5 xl:col-span-4 rounded-[4px] h-[458px]">
        {/* image box*/}
        <div className="h-[288px] rounded-[4px] overflow-hidden relative">
          <img
            className="w-full h-full object-center object-cover"
            src="https://plus.unsplash.com/premium_photo-1671656349218-5218444643d8?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="seller"
          />

          <div className="absolute left-[20px] top-[20px] px-[12px] py-[4px] rounded-[4px] flex gap-x-[10px] bg-[#FEFEFF]">
            <Star className="w-[20px] h-[20px]" fill="#F5B113" stroke="none" />
            <span className="font-[Roboto] text-[16px] font-normal text-[#6E6F75]">
              4.3
            </span>
          </div>
        </div>

        {/* content box */}
        <div className="relative flex flex-col gap-[16px] pt-[12px] z-0 overflow-hidden">
          <div className="absolute w-[227px] h-[227px] bg-[#EBE6DC] rounded-[100px] -z-10 left-[50%] -top-[160px]" />

          <div>
            <h4 className="capitalize font-[Roboto] text-[20px] font-normal text-[#0E0F19] mt-[18px]]">
              Haris Khan
            </h4>
            <p className="capitalize font-[Roboto] text-[14px] font-normal text-[#35373F] mt-[10px]]">
              Fullstack Developer
            </p>
          </div>
          <div className="flex items-center gap-[1px] overflow-x-auto scrollbar-hide mt-[28px]]">
            {[...Array(6)].map((item, index) => (
              <div
                key={index}
                className="bg-[#ECF1E7] rounded-[4px] px-[12px] py-[8px] whitespace-nowrap font-[Roboto] text-[12px] font-light text-[#3E3F47]"
              >
                website Development
              </div>
            ))}
          </div>

          <button className="bg-[#616BA4] outline-none border-none px-[16px] py-[8px] rounded-[4px] text-[#F7F7FA] text-[16px] font-[Roboto] font-medium mt-[20px]] w-full">
            contact
          </button>
        </div>
      </div>
    </div>
  );
};

export default GigAndSeller;
