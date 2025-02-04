"use client";
import { useState } from "react";

export default function Home() {
  const [inputValue, setInputValue] = useState<string>("");

  return (
    <div>
      <form>
        <center><h1>Todo List</h1></center>
        <input 
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="button">Add</button>
      </form>
    </div>
  );
}
