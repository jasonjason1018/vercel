"use client";
import { useState, useEffect } from "react";

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

export default function Home() {
  const [inputValue, setInputValue] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    getTasks();
  }, []);

  const getTasks = () => {
    fetch("/api/tasks")
      .then((res) => res.json())
      .then((data: Task[]) => setTasks(data));
  };

  const addTask = async () => {
    const res = await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: inputValue }),
    });
    const newTask: Task = await res.json();
    setTasks([...tasks, newTask]);
    setInputValue("");
  };

  return (
    <div>
      <form>
        <center><h1>Todo List</h1></center>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="button" onClick={addTask}>Add</button>
        <div>
          {tasks.map((task: Task) => (
            <div key={task.id}>
              {task.text} {task.completed ? "✅" : "❌"}
            </div>
          ))}
        </div>
      </form>
    </div>
  );
}
