interface Props {
  label: string;
  value: string | number;
  className?: string;
}

const MetaDetails = (props: Props) => {
  const {label, value, className} = props

  return (
    <div className={`flex flex-col gapy-y-[4px] px-[24px] py-[18px] rounded-[4px] bg-[#FEFEFF] ${className}`}>
      <p className="font-[Roboto] text-[12px] text-[#68696F] capitalize">
        
        {label}
      </p>

      <p className="font-[Roboto] text-[16px] text-[#03050F] capitalize">
        
        {value}
      </p>
    </div>
  );
};

export default MetaDetails;
