interface Props {
  title: string;
  level: string;
}
const LanguageCard = (props: Props) => {
  const { title, level } = props;
  return (
    <div className="flex flex-col gap-y-[12px] bg-[#9FBB89] rounded-[8px] min-h-[116px] items-center justify-center">
      <h2 className="font-[Roboto] text-[20px] font-bold text-[#0E0F19] leading-none text-center capitalize">
        {title}
      </h2>

      <p className="font-[Roboto] text-[12px] font-normal text-[#3E3F47] text-center capitalize">
        {level}
      </p>
    </div>
  );
};

export default LanguageCard;
