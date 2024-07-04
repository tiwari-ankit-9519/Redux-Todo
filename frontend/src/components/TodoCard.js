import React, { useState } from "react";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useDispatch } from "react-redux";
import { deleteTodos, toggleTodoCompletion } from "../features/todoSlice";

export default function TodoCard({
  title,
  description,
  author,
  completed,
  id,
}) {
  const dispatch = useDispatch();

  function handleClick() {
    dispatch(toggleTodoCompletion(id));
  }

  return (
    <div className="mx-5 flex gap-10 bg-slate-300 p-5 rounded items-center justify-between">
      <div className="flex flex-col gap-3">
        <p>
          <span className="font-semibold">Title:</span> {title}
        </p>
        <p>
          <span className="font-semibold">Description: </span>
          {description}
        </p>
        <p>
          <span className="font-semibold">Author: </span>
          {author}
        </p>
        <button
          className={
            completed
              ? "bg-green-500 p-2 rounded text-white"
              : "bg-red-500 p-2 rounded text-white"
          }
          onClick={handleClick}
        >
          {completed ? "Completed" : "Not Completed"}
        </button>
      </div>
      <TrashIcon
        className="w-6 h-6 text-red-500 cursor-pointer"
        onClick={() => dispatch(deleteTodos(id))}
      />
    </div>
  );
}
