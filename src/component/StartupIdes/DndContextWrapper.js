"use client";

import { DndContext } from "@dnd-kit/core";
import { useDispatch } from "react-redux";
import { setMotherField, removeMotherField } from "../../lib/features/startupIdea/builderSlice";
import "../../app/globals.css";


export default function DndContextWrapper({ children }) {
  const dispatch = useDispatch();

  const onDragEnd = ({ active, over }) => {
    if (!over) {
      dispatch(removeMotherField(active.data.current.group));
      return;
    }

    if (over.id === "mother-board") {
      dispatch(
        setMotherField({
          key: active.data.current.group,
          value: active.data.current.value,
        })
      );
    }
  };

  return <DndContext onDragEnd={onDragEnd}>{children}</DndContext>;
}
