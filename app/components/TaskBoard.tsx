"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { editTaskTitle } from "@/convex/tasks";
import { Button } from "@/components/ui/button";
import { Delete, DeleteIcon } from "lucide-react";

export default function TaskBoard() {
  const sections = useQuery(api.tasks.getSectionsWithTasks);
  const addTask = useMutation(api.tasks.addTask);
  const toggleTask = useMutation(api.tasks.toggleTask);
  const addSection = useMutation(api.tasks.addSection);
  const editTask = useMutation(api.tasks.editTaskTitle)
  const [newSectionTitle, setNewSectionTitle] = useState("");
  const [newTasks, setNewTasks] = useState<{ [key: string]: string }>({});
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editingValue, setEditingValue] = useState("");
  const deleteTask = useMutation(api.tasks.deleteTask)


  if (!sections) return <p>Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto bg-white p-5 rounded-2xl shadow mt-10">
      <h1 className="text-2xl font-bold mb-6 text-center">📋 Project Task Board</h1>

      {sections.map((section) => (
        <div key={section._id} className="mb-6 border-b pb-4">
          <h2 className="text-lg font-semibold mb-3">
            {section.order}. {section.title}
          </h2>

          {section.tasks.map((task: any) => (
            <div key={task._id} className="flex items-center gap-2 mb-2">
              <input
                type="checkbox"
                checked={task.done}
                onChange={() =>
                  toggleTask({ id: task._id, done: !task.done })
                }
              />
              {editingTaskId === task._id ? <Input autoFocus placeholder="{taskName}" value={editingValue} onChange={(e) => setEditingValue(e.target.value)} onKeyDown={async (e) => {
                if (e.key === "Enter") {
                  await editTask({ id: task._id, title: editingValue })
                  setEditingTaskId(null)
                }
                if (e.key === "Escape") {

                  setEditingTaskId(null)

                }

              }} /> : <span
                className={`text-base ${task.done ? "line-through text-gray-400" : ""
                  } cursor-pointer flex justify-between items-center w-full`}
                onClick={() => {
                  setEditingTaskId(task._id)
                  setEditingValue(task.title)

                }}
              >
                {task.title}
                <span className="cursor-pointer text-red-500" onClick={() => deleteTask({ id: task._id })}><DeleteIcon /></span>
              </span>}

            </div>
          ))}

          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const title = newTasks[section._id];
              if (!title?.trim()) return;
              await addTask({ sectionId: section._id, title });
              setNewTasks({ ...newTasks, [section._id]: "" });
            }}
            className="flex gap-2 mt-2"
          >
            <input
              className="border px-3 py-1 rounded w-full"
              placeholder="Add new task..."
              value={newTasks[section._id] ?? ""}
              onChange={(e) =>
                setNewTasks({ ...newTasks, [section._id]: e.target.value })
              }
            />
            <button className="bg-blue-600 text-white px-3 py-1 rounded">
              Add
            </button>
          </form>
        </div>
      ))}

      {/* Add new section */}
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          if (!newSectionTitle.trim()) return;
          await addSection({ title: newSectionTitle });
          setNewSectionTitle("");
        }}
        className="flex gap-2 mt-4"
      >
        <input
          className="border px-3 py-1 rounded w-full"
          placeholder="Add new section..."
          value={newSectionTitle}
          onChange={(e) => setNewSectionTitle(e.target.value)}
        />
        <button className="bg-green-600 text-white px-3 py-1 rounded">
          Add Section
        </button>
      </form>
    </div>
  );
}
