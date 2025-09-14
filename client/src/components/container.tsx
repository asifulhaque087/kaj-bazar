import Footer from "@/components/footer";
import Navigation from "@/components/Navigation";

interface Props {
  children: React.ReactNode;
}
const Container = (props: Props) => {
  const { children } = props;
  return (
    <div className="mx-auto overflow-x-hidden px-[16px] md:max-w-[1200px] md:px-[24px] xl:max-w-[1450px] 2xl:max-w-[1736px] xl:px-[60px]">
      <header className="mt-[24px]">
        <Navigation />
      </header>

      {children}

      <div className="mt-[100px]">
        <Footer />
      </div>
    </div>
  );
};

export default Container;
