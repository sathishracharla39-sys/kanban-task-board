import { useState } from "react";
import { FaPlus } from "react-icons/fa";

function TaskForm({ createTask }) {
  const [taskName, setTaskName] = useState("");
  const [level, setLevel] = useState("medium");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!taskName.trim()) return;

    createTask(taskName, level);

    setTaskName("");
    setLevel("medium");
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="text"
          placeholder="What needs to be done?"
          value={taskName}
          onChange={(e) =>
            setTaskName(e.target.value)
          }
        />
      </div>

      <div className="form-group">
        <select
          value={level}
          onChange={(e) =>
            setLevel(e.target.value)
          }
        >
          <option value="high">
            High Priority
          </option>

          <option value="medium">
            Medium Priority
          </option>

          <option value="low">
            Low Priority
          </option>
        </select>
      </div>

      <button
        type="submit"
        className="add-task-btn"
      >
        <FaPlus />
        <span>Add Task</span>
      </button>
    </form>
  );
}

export default TaskForm;