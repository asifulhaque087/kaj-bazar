import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

interface Props {
  className?: string;
}

interface FormValue {
  searchInput: string;
}

const SearchBox = (props: Props) => {
  const { className } = props;

  const router = useRouter();

  const { register, handleSubmit } = useForm<FormValue>({
    defaultValues: {
      searchInput: "",
    },
  });

  return (
    <form
      className={`flex items-center bg-[#F7F7FA] rounded-[12px] border border-gray-300 transition-all duration-300 ease-in-out pl-[16px] pr-[6px] py-[5px] grow ${className}`}
      onSubmit={handleSubmit((data) =>
        router.push(
          `/gigs?searchKey=${encodeURIComponent(
            data.searchInput
          )}&page=1&limit=5`
        )
      )}
    >
      {/* Input Field */}
      <input
        {...register("searchInput")}
        type="text"
        placeholder="Search For Gigs"
        className="placeholder:tracking-[0.14px] placeholder:text-[14px] placeholder:font-medium   placeholder:text-[#9F9FA3] outline-none focus:outline-none font-inter grow"
      />

      <button
        type="submit"
        className=" bg-[#CDC0A8]  p-[8px] grid place-items-center rounded-[8px] cursor-pointer hover:bg-[#20A89F] transition-all duration-200 ease-in- transform hover:scale-105 active:scale-95"
      >
        <SearchIcon size={20} color="white" />
      </button>
    </form>
  );

  return (
    <form
      className="hiddenn md:flex items-center  justify-between w-full  bg-[#E8E7D9] rounded-[12px] border border-gray-300 transition-all duration-300 ease-in-out pl-[16px] pr-[6px] py-[5px] grow"
      onSubmit={handleSubmit((data) =>
        router.push(
          `/gigs?searchKey=${encodeURIComponent(
            data.searchInput
          )}&page=1&limit=5`
        )
      )}
    >
      {/* Input Field */}
      <input
        {...register("searchInput")}
        type="text"
        placeholder="Search For Gigs"
        className="placeholder:tracking-[0.14px] placeholder:text-[16px] placeholder:font-[500]   placeholder-[#735858] bg-transparent outline-none focus:outline-none font-inter grow"
      />

      <button
        type="submit"
        className=" bg-[#27C9BE]  p-[8px] grid place-items-center rounded-[8px] cursor-pointer hover:bg-[#20A89F] transition-all duration-200 ease-in- transform hover:scale-105 active:scale-95"
      >
        <SearchIcon size={20} color="white" />
      </button>
    </form>
  );
};

export default SearchBox;
