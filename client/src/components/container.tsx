import Footer from "@/components/widgets/footer";
import Navigation from "@/components/Navigation";

interface Props {
  children: React.ReactNode;
  className?: string;
}
const Container = (props: Props) => {
  const { children, className } = props;
  return (
    <div className={`${className}`}>
      <div className="mx-auto overflow-x-hidden px-[16px] md:max-w-[1200px] md:px-[24px] xl:max-w-[1450px] 2xl:max-w-[1736px] xl:px-[60px]">
        {children}
      </div>
    </div>
  );
};

export default Container;
