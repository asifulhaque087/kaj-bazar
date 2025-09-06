"use client";
interface Props {
  totalItems: number;
  removePhotos: () => void;
}
const Header = (props: Props) => {
  const { totalItems, removePhotos } = props;

  return (
    <div className="px-[3%] flex items-center border-b border-[#d3d3d3] justify-between h-[70px]">
      {totalItems ? (
        <>
          <h1 className="text-[24px] text-[#353535] font-[700] capitalize">
            {totalItems}
            {totalItems === 1 ? " file " : " files "}
            selected
          </h1>
          <span
            className="text-[#f15151] text-[16px] font-[600] cursor-pointer"
            onClick={() => removePhotos()}
          >
            Delete {totalItems === 1 ? " file " : " files "}
          </span>
        </>
      ) : (
        <h1 className="text-[24px] text-[#353535] font-[700] capitalize">
          gallery
        </h1>
      )}
    </div>
  );
};

export default Header;
