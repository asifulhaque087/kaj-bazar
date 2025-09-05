interface Props {
  children: React.ReactNode;
}
const Container = (props: Props) => {
  const { children } = props;
  return (
    <div className="mx-auto overflow-x-hidden  px-[20px] md:max-w-[1200px] md:px-[40px] xl:max-w-[1450px] 2xl:max-w-[1736px] xl:px-[60px]">
      {children}
    </div>
  );
};

export default Container;
