const Welcome = () => {
  return (
    <div className="bg-[#FEFEFF]  rounded-[8px] p-[8px]  min-h-[120px] flex">
      <div className="bg-[#EFF0F6]   rounded-[8px] grow relative z-0 overflow-hidden flex flex-col gap-y-[20px] p-[24px]">
        <h1 className=" font-[Roboto] font-medium text-[28px] text-[#0E0F19] capitalize">
          Your delivery is now at work
        </h1>

        <div className="flex gap-x-[14px] items-end">
          <p className="font-[Roboto] text-[16px] font-normal text-[#3E3F47]">
            A timeline of all events related to your order.
            {/* <span className="text-[#9FBB89] underline">
              download your invoice
            </span> */}
          </p>
        </div>

        {/* decorative circles */}
        <div className="w-[1078px]  h-[1078px] rounded-full bg-[#C0C4DB] absolute -top-[100px] left-[50%] -z-[1]" />
      </div>
    </div>
  );
};

export default Welcome;
