interface Props {
  major: string;
  institution: string;
  location: string;
}

const EducationCard = (props: Props) => {
  const { major, institution, location } = props;
  return (
    <div className="bg-[#F7F7FA] rounded-[4px] p-[16px] grid place-items-center gap-y-[8px]">
      <h5 className="font-[Roboto] text-[16px] font-medium text-[#0E0F19] capitalize text-center">
        {major}
      </h5>
      <p className="font-[Roboto] text-[12px] font-normal text-[3E3F47] capitalize mt-[8px] text-center">
        {institution}
      </p>

      <p className="font-[Roboto] text-[12px] font-normal text-[3E3F47] capitalize mt-[8px] text-center">
        {location}
      </p>
    </div>
  );
};

export default EducationCard;
