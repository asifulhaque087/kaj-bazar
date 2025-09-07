"use client";
import { SortablePhotoProps } from "@/components/image-field/sortable-photo";
import { Check } from "lucide-react";
import { CSSProperties } from "react";

interface Props extends SortablePhotoProps {
  // ref: HTMLDivElement;
  // ref: RefObject<HTMLDivElement> | null;
  ref?: (node: HTMLElement | null) => void;
}

const Photo = (props: Props) => {
  const {
    ref,
    url,
    index,
    faded,
    style,
    isSelected,
    selectPhotos,
    ...otherProps
  } = props;

  const inlineStyles: CSSProperties = {
    touchAction: "none",
    opacity: faded ? "0.2" : "1",
    transformOrigin: "0 0",
    // gridRowStart: index === 0 ? "span 2" : undefined,
    // gridColumnStart: index === 0 ? "span 2" : undefined,
    ...style,
  };

  return (
    <div
      className={`overflow-hidden relative rounded-md border border-[#d3d3d3] bg-[#f9f8f8]`}
      ref={ref}
      style={inlineStyles}
      {...otherProps}
      onClick={() => {
        if (selectPhotos) selectPhotos(url, isSelected ? true : false);
      }}
    >
      <img
        data-testid="photo-img"
        className="w-[100%]  h-[100%] object-cover object-center"
        alt="feature product"
        src={url}
      />
      <div
        className={`absolute top-0 bottom-0 left-0 right-0  ${
          isSelected
            ? "backdrop-opacity-80 bg-white/30"
            : "opacity-0 hover:opacity-100 hover:bg-black/60"
        }  transition-all p-[20px]`}
      >
        <div
          data-testid="check-mark"
          className={`grid place-items-center text-white text-[10px] h-[20px] w-[20px] rounded ${
            isSelected ? "bg-[#305df6]" : "bg-white"
          }`}
        >
          <Check size={15} className="text-white" />
        </div>
      </div>
    </div>
  );
};

export default Photo;
