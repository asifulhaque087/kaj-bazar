import { useRouter } from "next/navigation";

interface Props {
  className?: string;
}

const navs = [
  { title: "sign up", path: "" },
  { title: "sign in", path: "" },
  { title: "gigs", path: "/gigs" },
];

const UnprotectedNavs = (props: Props) => {
  const { className } = props;
  const router = useRouter();
  return (
    <div
      className={`flex items-center justify-center gap-x-[24px] ${className}`}
    >
      {navs.map((nav, i) => (
        <p
          key={i}
          className="font-roboto text-[16px] text-[#F7F7FA] whitespace-nowrap capitalize cursor-pointer"
          onClick={() => (nav.path ? router.push(nav.path) : null)}
        >
          {nav.title}
        </p>
      ))}

      {/* <p className="font-roboto text-[16px] text-[#F7F7FA] whitespace-nowrap capitalize">
        sign in
      </p> */}
    </div>
  );
};

export default UnprotectedNavs;
