"use client";

import React, { useState, ChangeEvent } from "react";
import {
  useFieldArray,
  Control,
  FieldErrors,
  UseFormGetValues,
  FieldArrayWithId,
} from "react-hook-form";
import {
  DndContext,
  useSensor,
  useSensors,
  PointerSensor,
  closestCenter,
  DragOverlay,
  DragStartEvent,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  arrayMove,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useBrowser } from "@/hooks/use-browser.hook";
import { CreateGigForm } from "@/schemas";

const existingImagesData = [
  {
    // id: "img-1234",
    url: "https://placehold.co/400x300/e0e0e0/ffffff?text=Existing+1",
    // type: "existing",
    orderId: 0,
  },
  {
    // id: "img-5678",
    url: "https://placehold.co/400x300/d1d5db/374151?text=Existing+2",
    // type: "existing",
    orderId: 1,
  },
  //   {
  //     id: "img-9012",
  //     url: "https://placehold.co/400x300/e5e7eb/4b5563?text=Existing+3",
  //     type: "existing",
  //   },
  //   {
  //     id: "img-9013",
  //     url: "https://placehold.co/400x300/e5e7eb/4b5563?text=Existing+4",
  //     type: "existing",
  //   },
  //   {
  //     id: "img-9014",
  //     url: "https://placehold.co/400x300/e5e7eb/4b5563?text=Existing+5",
  //     type: "existing",
  //   },
  //   {
  //     id: "img-9015",
  //     url: "https://placehold.co/400x300/e5e7eb/4b5563?text=Existing+6",
  //     type: "existing",
  //   },
  //   {
  //     id: "img-9016",
  //     url: "https://placehold.co/400x300/e5e7eb/4b5563?text=Existing+7",
  //     type: "existing",
  //   },
];

interface ImageItemProps {
  // image: FieldArrayWithId<CreateGigForm>;
  //   image: FieldArrayWithId<GigImageSchema>;
  // image: any;
  image: FieldArrayWithId<CreateGigForm, "images", "id">;

  index: number;
  onDelete: (index: number, id: string) => void;
  isDragging: boolean;
}

function ImageItem(props: ImageItemProps) {
  const { image, index, onDelete, isDragging } = props;
  //   image.

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: image.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0 : 1, // Hide the original item when dragging
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="relative group rounded-lg overflow-hidden shadow-md transition-transform duration-200 hover:scale-105 cursor-grab grid place-items-center"
    >
      <img
        src={image.url}
        alt={`Image ${image.id}`}
        className="w-full h-auto object-cover"
      />
      <div
        onClick={() => onDelete(index, image.id)}
        className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm6 0a1 1 0 012 0v6a1 1 0 11-2 0V8z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  );
}

interface DraggingItemProps {
  image: FieldArrayWithId<CreateGigForm, "images", "id">;
}

const DraggingItem = (props: DraggingItemProps) => {
  const { image } = props;
  return (
    <div className="relative rounded-lg overflow-hidden shadow-md">
      <img
        src={image.url}
        alt={`Dragging ${image.id}`}
        className="w-full h-auto object-cover"
      />
    </div>
  );
};

interface ConfirmationModalProps {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}
const ConfirmationModal = (props: ConfirmationModalProps) => {
  const { visible, onConfirm, onCancel } = props;
  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-sm w-full text-center">
        <h2 className="text-xl font-bold mb-4 text-gray-800">
          Confirm Deletion
        </h2>
        <p className="text-gray-600 mb-6">
          Are you sure you want to remove this image? This action will be
          finalized when you click 'Update Item'.
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onCancel}
            className="bg-gray-300 text-gray-800 font-semibold py-2 px-6 rounded-lg hover:bg-gray-400 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-500 text-white font-semibold py-2 px-6 rounded-lg hover:bg-red-600 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

interface Props {
  control: Control<CreateGigForm>;
  errors: FieldErrors<CreateGigForm>;
  getValues: UseFormGetValues<CreateGigForm>;
}

export default function ImageField2(props: Props) {
  const { control, getValues, errors } = props;

  //   const { control, handleSubmit, watch, getValues } = useForm({
  //     defaultValues: {
  //       images: existingImagesData,
  //     },
  //   });
  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: "images",
  });

  //   const [fields, setImageList] = useState(existingImagesData);
  //   const [deletedImageIds, setDeletedImageIds] = useState([]);
  const [deletedImageIds, setDeletedImageIds] = useState<string[]>([]);

  const [modalVisible, setModalVisible] = useState(false);
  const [imageToDelete, setImageToDelete] = useState<string | null>(null);
  const [indexToDelete, setIndexToDelete] = useState<number | null>(null);
  //   const [activeId, setActiveId] = useState(null);
  const [activeId, setActiveId] = useState<string | null>(null);

  // Sync the local state with the form state only when a new item is added.
  //   useEffect(() => {
  //     setImageList(fields);
  //   }, [fields]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
  );
  const isBrowser = useBrowser();

  if (!isBrowser) return;

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id.toString());
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = fields.findIndex((field) => field.id === active.id);
      const newIndex = fields.findIndex((field) => field.id === over?.id);

      // Update local state for smooth animation
      //   setImageList((prevImages) => arrayMove(prevImages, oldIndex, newIndex));

      const current = getValues("images");
      const reordered = arrayMove(current, oldIndex, newIndex).map(
        (item, idx) => ({ ...item, orderId: idx + 1 })
      );
      replace(reordered);
    }
    setActiveId(null);
  };

  const handleDragCancel = () => {
    setActiveId(null);
  };

  const handleDeleteClick = (index: number, id: string) => {
    setImageToDelete(id);
    setIndexToDelete(index);
    setModalVisible(true);
  };

  const handleConfirmDelete = () => {
    const image = fields.find((img) => img.id === imageToDelete);

    if (image && imageToDelete) {
      setDeletedImageIds((prevIds) => [...prevIds, imageToDelete]);
    }

    if (indexToDelete !== null) {
      remove(indexToDelete);
    }

    setModalVisible(false);
    setImageToDelete(null);
    setIndexToDelete(null);
  };

  const handleCancelDelete = () => {
    setModalVisible(false);
    setImageToDelete(null);
    setIndexToDelete(null);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);

    files.forEach((file, i) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const newImage = {
          orderId: i + fields.length + 1,
          url: event.target?.result as string,
        };
        append(newImage); // Use append to update the form state
      };
      reader.readAsDataURL(file);
    });
  };

  //   const onSubmit = (data) => {
  //     const finalImageOrder = data.images.map((img) => img.id);
  //     const newImagesPayload = data.images
  //       .filter((img) => img.type === "new")
  //       .map((img) => img.url);

  //     const payload = {
  //       itemData: {
  //         title: "Example Item",
  //       },
  //       imageChanges: {
  //         newImages: newImagesPayload,
  //         deletedImageIds: deletedImageIds,
  //         imageOrder: finalImageOrder,
  //       },
  //     };

  //     console.log("Sending this payload to the Express.js backend:");
  //     console.log(JSON.stringify(payload, null, 2));
  //   };

  const activeImage = activeId
    ? fields.find((image) => image.id === activeId)
    : null;

  return (
    <div className="">
      <div className="mx-auto bg-white p-8 rounded-xl ">
        <h1 className="text-3xl font-bold mb-2 text-center text-gray-800">
          Reorderable Image Editor
        </h1>
        <p className="text-sm text-gray-500 mb-6 text-center">
          Drag and drop images to reorder them. The final payload will include
          the new order, deleted images, and new images.
        </p>

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragCancel={handleDragCancel}
        >
          <SortableContext items={fields} strategy={rectSortingStrategy}>
            {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6"> */}
            <div className="grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-5 gap-6 mb-6">
              {fields.map((image, index) => (
                <ImageItem
                  key={image.id}
                  image={image}
                  index={index}
                  onDelete={handleDeleteClick}
                  isDragging={image.id === activeId}
                />
              ))}
            </div>
          </SortableContext>
          <DragOverlay>
            {activeImage ? <DraggingItem image={activeImage} /> : null}
          </DragOverlay>
        </DndContext>

        <div className="bg-gray-50 p-6 rounded-lg border border-dashed border-gray-300 flex flex-col items-center justify-center">
          <label htmlFor="image-input" className="cursor-pointer">
            <input
              type="file"
              id="image-input"
              //   multiple
              className="hidden"
              onChange={handleFileChange}
            />
            <div className="flex flex-col items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-12 h-12 text-gray-400 mb-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                />
              </svg>
              <span className="text-gray-600 font-medium">
                Click to add new images
              </span>
              <span className="text-gray-400 text-sm mt-1">
                PNG, JPG, up to 10MB
              </span>
            </div>
          </label>
        </div>

        {/* <button
          onClick={handleSubmit(onSubmit)}
          className="mt-8 w-full bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors shadow-md"
        >
          Update Item
        </button> */}
      </div>

      <ConfirmationModal
        visible={modalVisible}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
}
