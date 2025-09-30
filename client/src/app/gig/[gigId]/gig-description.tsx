interface Props {
  description: string;
}

const GigDescription = (props: Props) => {
  const { description } = props;
  return (
    <div className="bg-[#FEFEFF] rounded-[4px] min-h-[316px] p-[24px]">
      {description}
    </div>
  );
};

export default GigDescription;
