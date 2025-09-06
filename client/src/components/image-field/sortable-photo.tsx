"use client";
import Photo from "@/components/image-field/photo";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { CSSProperties } from "react";

export interface SortablePhotoProps {
  url: string;
  index: number;
  faded?: boolean;
  style?: CSSProperties;
  selectPhotos?: (url: string, isSelected: boolean) => void;
  isSelected?: boolean;
}

const SortablePhoto = (props: SortablePhotoProps) => {
  const sortable = useSortable({ id: props.url, disabled: false });
  const { attributes, listeners, setNodeRef, transform, transition } = sortable;

  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Photo
      ref={setNodeRef}
      style={style}
      {...props}
      {...attributes}
      {...listeners}
    />
  );
};

export default SortablePhoto;
