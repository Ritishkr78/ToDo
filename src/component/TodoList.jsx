import React, { useState, useEffect } from "react";

function Task({ task, onToggle, onRemove, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  function handleEditSave() {
    if (editText.trim() === "") return;
    onEdit(task.id, editText);
    setIsEditing(false);
  }

  return (
    <div
      className={`flex items-center m-3 p-3 rounded shadow-sm ${
        task.completed ? "bg-gray-100" : "bg-white"
      }`}
    >
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
        className="mr-3 accent-blue-500"
      />
      {isEditing ? (
        <>
          <input
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="flex-1 border border-gray-300 rounded px-2 py-1 mr-2"
          />
          <button
            onClick={handleEditSave}
            className="bg-green-500 text-white px-2 py-1 rounded mr-2 hover:bg-green-600"
          >
            Save
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="bg-gray-300 text-gray-700 px-2 py-1 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        </>
      ) : (
        <>
          <span
            className={`flex-1 ${
              task.completed ? "line-through text-gray-400" : ""
            }`}
          >
            {task.text}
          </span>
          <button
            onClick={() => setIsEditing(true)}
            className="bg-yellow-400 text-white px-2 py-1 rounded mr-2 hover:bg-yellow-500"
          >
            Edit
          </button>
          <button
            onClick={() => onRemove(task.id)}
            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
          >
            Remove
          </button>
        </>
      )}
    </div>
  );
}

export default function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("all");
  const [sortAsc, setSortAsc] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("tasks");
    if (saved) setTasks(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function handleAddTask() {
    const text = input.trim();
    if (!text) return alert("Task cannot be empty!");
    setTasks([...tasks, { id: Date.now(), text, completed: false }]);
    setInput("");
  }

  function handleRemoveTask(id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  function handleToggleTask(id) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }

  function handleEditTask(id, newText) {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, text: newText } : task))
    );
  }

  function handleFilterChange(e) {
    setFilter(e.target.value);
  }

  function handleSort() {
    setSortAsc(!sortAsc);
  }

  let filteredTasks = tasks;
  if (filter === "active") filteredTasks = tasks.filter((t) => !t.completed);
  if (filter === "completed") filteredTasks = tasks.filter((t) => t.completed);

  filteredTasks = [...filteredTasks].sort((a, b) =>
    sortAsc ? a.text.localeCompare(b.text) : b.text.localeCompare(a.text)
  );

  return (
    <div className="m-3 w-4xl bg-white rounded-lg shadow-lg overflow-scroll">
      <h2 className="text-2xl font-bold p-1.5 mb-6 text-center text-blue-600">
        To-Do List
      </h2>
      <div className="flex m-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleAddTask();
          }}
          placeholder="Add a new task"
          className="flex-1 border border-gray-300 rounded-l px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-400"
        />
        <button
          onClick={handleAddTask}
          className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600"
        >
          Add
        </button>
      </div>
      <div className="flex items-center m-3">
        <select
          value={filter}
          onChange={handleFilterChange}
          className="border border-gray-300 rounded px-2 py-1 mr-2"
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>
        <button
          onClick={handleSort}
          className="bg-gray-200 text-gray-700 px-3 py-1 rounded hover:bg-gray-300"
        >
          Sort {sortAsc ? "A-Z" : "Z-A"}
        </button>
      </div>
      <div>
        {filteredTasks.length === 0 ? (
          <p className="text-gray-500 text-center">No tasks.</p>
        ) : (
          filteredTasks.map((task) => (
            <Task
              key={task.id}
              task={task}
              onToggle={handleToggleTask}
              onRemove={handleRemoveTask}
              onEdit={handleEditTask}
            />
          ))
        )}
      </div>
    </div>
  );
}
