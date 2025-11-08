interface Props {
  company: string;
  activeRole: string;
  description: string;
}

const ExperienceCard = (props: Props) => {
  const { company, activeRole, description } = props;

  return (
    <div className="bg-[#F7F7FA] rounded-[4px] p-[16px]">
      <h5 className="font-[Roboto] text-[16px] font-medium text-[#0E0F19] capitalize text-center">
        {company}
      </h5>
      <p className="font-[Roboto] text-[12px] font-normal text-[3E3F47] capitalize mt-[8px] text-center">
        {activeRole}
      </p>
      <div className="bg-[#FEFEFF]  rounded-[4px] p-[20px] mt-[36px] flex flex-col gap-y-[8px] mx-auto">
        <h5 className="font-[Roboto] text-[14px] font-medium text-[3E3F47]">
          Tasks
        </h5>
        <p className="font-[Roboto] text-[14px] font-normal text-[3E3F47]">
          {description}
        </p>
      </div>
    </div>
  );
};

export default ExperienceCard;
