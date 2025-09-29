import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

interface FormValue {
  searchInput: string;
}

const SearchBox = () => {
  const router = useRouter();

  const { register, handleSubmit } = useForm<FormValue>({
    defaultValues: {
      searchInput: "",
    },
  });

  return (
    <form
      className="w-full grid grid-cols-12  bg-[#E8E7D9] rounded-[12px] border border-gray-300 transition-all duration-300 ease-in-out pl-[16px] pr-[6px] py-[5px] grow"
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
        className="col-span-10 placeholder:tracking-[0.14px] placeholder:text-[16px] placeholder:font-[500]   placeholder-[#735858] bg-transparent outline-none focus:outline-none font-inter grow"
      />

      <button
        type="submit"
        className="col-span-2 bg-[#27C9BE]  p-[8px] grid place-items-center rounded-[8px] cursor-pointer hover:bg-[#20A89F] transition-all duration-200 ease-in- transform hover:scale-105 active:scale-95"
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
