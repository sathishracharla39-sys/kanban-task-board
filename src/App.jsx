import { useEffect, useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";

import "./App.css";
import TaskForm from "./components/TaskForm";
import TaskColumn from "./components/TaskColumn";

function App() {
  const [searchText, setSearchText] = useState("");

  const [taskList, setTaskList] = useState(() => {
    const savedData = localStorage.getItem("tasks");

    if (!savedData) return [];

    return JSON.parse(savedData).map((item) => ({
      ...item,
      editing: false,
    }));
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(taskList));
  }, [taskList]);

  const createTask = (taskName, level) => {
    if (!taskName.trim()) return;

    const newTask = {
      id: Date.now(),
      text: taskName,
      priority: level,
      status: "todo",
      editing: false,
    };

    setTaskList((prev) => [...prev, newTask]);
  };

  const removeTask = (taskId) => {
    setTaskList((prev) =>
      prev.filter((item) => item.id !== taskId)
    );
  };

  const changeTaskStage = (taskId, moveDirection) => {
    setTaskList((prev) =>
      prev.map((item) => {
        if (item.id !== taskId) return item;

        if (moveDirection === "forward") {
          if (item.status === "todo") {
            return { ...item, status: "inprogress" };
          }

          if (item.status === "inprogress") {
            return { ...item, status: "done" };
          }
        }

        if (moveDirection === "backward") {
          if (item.status === "done") {
            return { ...item, status: "inprogress" };
          }

          if (item.status === "inprogress") {
            return { ...item, status: "todo" };
          }
        }

        return item;
      })
    );
  };

  const saveTaskChanges = (taskId, newText) => {
    setTaskList((prev) =>
      prev.map((item) =>
        item.id === taskId
          ? {
              ...item,
              text: newText,
              editing: false,
            }
          : item
      )
    );
  };

  const editTask = (taskId) => {
    setTaskList((prev) =>
      prev.map((item) =>
        item.id === taskId
          ? {
              ...item,
              editing: !item.editing,
            }
          : item
      )
    );
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) return;

    const allowedColumns = [
      "todo",
      "inprogress",
      "done",
    ];

    if (!allowedColumns.includes(over.id)) return;

    setTaskList((prev) =>
      prev.map((item) =>
        item.id === active.id
          ? {
              ...item,
              status: over.id,
            }
          : item
      )
    );
  };

  const visibleTasks = taskList.filter((item) =>
    item.text
      .toLowerCase()
      .includes(searchText.toLowerCase())
  );

  const todoTasks = visibleTasks.filter(
    (item) => item.status === "todo"
  );

  const progressTasks = visibleTasks.filter(
    (item) => item.status === "inprogress"
  );

  const doneTasks = visibleTasks.filter(
    (item) => item.status === "done"
  );

  return (
    <div className="app">
      <div className="page-header">
        <h1>Kanban Task Board</h1>
        <p>Organize and track your work efficiently</p>
      </div>

      <TaskForm createTask={createTask} />

      <input
        type="text"
        className="search-bar"
        placeholder="Search tasks..."
        value={searchText}
        onChange={(e) =>
          setSearchText(e.target.value)
        }
      />

      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <div className="board">
          <TaskColumn
            title={`To Do (${taskList.filter(
              (item) => item.status === "todo"
            ).length})`}
            status="todo"
            tasks={todoTasks}
            removeTask={removeTask}
            changeTaskStage={changeTaskStage}
            saveTaskChanges={saveTaskChanges}
            editTask={editTask}
          />

          <TaskColumn
            title={`In Progress (${taskList.filter(
              (item) =>
                item.status === "inprogress"
            ).length})`}
            status="inprogress"
            tasks={progressTasks}
            removeTask={removeTask}
            changeTaskStage={changeTaskStage}
            saveTaskChanges={saveTaskChanges}
            editTask={editTask}
          />

          <TaskColumn
            title={`Done (${taskList.filter(
              (item) => item.status === "done"
            ).length})`}
            status="done"
            tasks={doneTasks}
            removeTask={removeTask}
            changeTaskStage={changeTaskStage}
            saveTaskChanges={saveTaskChanges}
            editTask={editTask}
          />
        </div>
      </DndContext>
    </div>
  );
}

export default App;