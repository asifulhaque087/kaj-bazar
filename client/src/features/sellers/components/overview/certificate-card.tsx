interface Props {
  title: string;
  company: string;
  time: string;
}
const CertificateCard = (props: Props) => {
  const { title, company, time } = props;
  return (
    <div className="flex flex-col gap-y-[12px] bg-[#DFE1ED] rounded-[8px] min-h-[116px] items-center justify-center">
      <h2 className="font-[Roboto] text-[20px] font-bold text-[#0E0F19] leading-none text-center capitalize">
        {title}
      </h2>

      <p className="font-[Roboto] text-[12px] font-normal text-[#3E3F47] text-center capitalize">
        {company} - {time}
      </p>
    </div>
  );
};
export default CertificateCard;
