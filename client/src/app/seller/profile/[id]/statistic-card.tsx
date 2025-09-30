import { Card } from "@/components/ui/card";

interface Props {
  className?: string;
  title: string;
  count: number;
}

const StatisticCard = (props: Props) => {
  const { title, count, className } = props;
  return (
    <Card
      className={`grid place-items-center rounded-none border-none shadow-none ${className}`}
    >
      <div className="grid place-items-center gap-y-[4px]">
        <p className="font-roboto text-[32px] font-bold text-[#0E0F19] capitalize">
          {count}
        </p>
        <span className="text-xs font-normal  text-[#3E3F47] capitalize">
          {title}
        </span>
      </div>
    </Card>
  );
};

export default StatisticCard;
