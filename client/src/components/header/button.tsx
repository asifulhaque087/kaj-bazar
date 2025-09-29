interface Props {
  className?: string;
}

const BecomeASeller = (props: Props) => {
  const { className } = props;
  return (
    <div className={`${className} flex items-center justify-end`}>
      <button
        className={`rounded-[8px] bg-[#CDC0A8] px-[20px] py-[6px] font-roboto text-sm text-[#3E3F47] whitespace-nowrap capitalize  ${className}`}
      >
        Become a seller
        {/* join */}
      </button>
    </div>
  );
};

export default BecomeASeller;
