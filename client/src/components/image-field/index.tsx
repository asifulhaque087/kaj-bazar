"use client";
import { useState } from "react";
import {
  DndContext,
  closestCenter,
  DragOverlay,
  useSensor,
  useSensors,
  DragStartEvent,
  DragEndEvent,
  MeasuringStrategy,
  PointerSensor,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import {
  Control,
  FieldErrors,
  useFieldArray,
  useForm,
  UseFormGetValues,
} from "react-hook-form";
import { useBrowser } from "@/hooks/use-browser.hook";
import Grid from "@/components/image-field/grid";
import SortablePhoto from "@/components/image-field/sortable-photo";
import Header from "@/components/image-field/header";
import Photo from "@/components/image-field/photo";
import { CreateGigForm } from "@/schemas";

// ** Internal imports

interface Props {
  control: Control<CreateGigForm>;
  errors: FieldErrors<CreateGigForm>;
  getValues: UseFormGetValues<CreateGigForm>;
}

const ImageField = (props: Props) => {
  const { control, getValues, errors } = props;
  const [activeId, setActiveId] = useState<string | null>(null);
  const [selectedUrls, setSelectedUrls] = useState<string[]>([]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    })
  );
  // const { control, handleSubmit, setValue, getValues } = useForm({
  //   defaultValues: {
  //     images: photos,
  //   },
  // });

  const { fields, append, remove, move, replace } = useFieldArray({
    control,
    name: "images",
  });

  const activePhoto = activeId
    ? fields.find((field) => field.url === activeId)
    : null;

  const isBrowser = useBrowser();
  if (!isBrowser) return;

  return (
    <div className="border rounded-t-md bg-[#fefefe]">
      <Header
        totalItems={selectedUrls.length}
        removePhotos={removePhotos}
        // errors={errors}
      />
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
        measuring={{
          droppable: {
            strategy: MeasuringStrategy.Always,
          },
        }}
      >
        <SortableContext
          items={fields.map((field) => field.url)}
          strategy={rectSortingStrategy}
        >
          <Grid errors={errors} append={append} fieldCount={fields.length}>
            {fields.map(({ url, id }, index) => (
              <SortablePhoto
                key={id}
                url={url}
                index={index}
                selectPhotos={selectPhotos}
                isSelected={selectedUrls.includes(url)}
              />
            ))}
          </Grid>
        </SortableContext>

        <DragOverlay adjustScale={true}>
          {activePhoto ? (
            <Photo
              url={activePhoto.url}
              index={fields.findIndex((field) => field.url === activeId)}
            />
          ) : null}
        </DragOverlay>
      </DndContext>
      {/* <button
        onClick={handleSubmit((data) => console.log("data is ", data))}
        className="mt-8 w-full bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors shadow-md"
      >
        Update Item
      </button> */}
    </div>
  );

  function removePhotos() {
    const indicesToRemove = fields
      .filter((field) => selectedUrls.includes(field.url))
      .map((field) => fields.indexOf(field))
      .sort((a, b) => b - a); // Sort in descending order to avoid index issues

    remove(indicesToRemove);
    setSelectedUrls([]);
  }

  function selectPhotos(url: string, isSelected: boolean) {
    if (isSelected) {
      setSelectedUrls(selectedUrls.filter((item) => item !== url));
    } else {
      setSelectedUrls([...selectedUrls, url]);
    }
  }

  function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id.toString());
  }

  // function handleDragEnd(event: DragEndEvent) {
  //   const { active, over } = event;

  //   if (active.id !== over?.id) {
  //     const oldIndex = fields.findIndex(
  //       (field) => field.url === active.id.toString()
  //     );
  //     const newIndex = fields.findIndex(
  //       (field) => field.url === over?.id.toString()
  //     );
  //     if (oldIndex !== -1 && newIndex !== -1) {
  //       move(oldIndex, newIndex);
  //     }
  //   }

  //   setActiveId(null);
  // }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    setActiveId(null);
    if (!over || active.id === over.id) return;

    const oldIndex = fields.findIndex((f) => f.url === String(active.id));
    const newIndex = fields.findIndex((f) => f.url === String(over.id));
    if (oldIndex < 0 || newIndex < 0) return;

    // 1) read current values from RHF (not the stale `fields` snapshot)
    const current = getValues("images");

    // 2) reorder
    const reordered = arrayMove(current, oldIndex, newIndex)
      // 3) renumber orderId to match the new visual order
      .map((item, idx) => ({ ...item, orderId: idx + 1 }));

    // 4) write back in one atomic update so RHF + dnd stay in sync
    replace(reordered);
  }

  function handleDragCancel() {
    setActiveId(null);
  }
};

export default ImageField;
