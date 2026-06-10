import { useState } from "react";
import {
  FaTrash,
  FaEdit,
  FaArrowLeft,
  FaArrowRight,
  FaGripVertical,
  FaCheck,
} from "react-icons/fa";

function TaskCard({
  task,
  removeTask,
  changeTaskStage,
  saveTaskChanges,
  editTask,
  dragListeners,
  dragAttributes,
}) {
  const [taskText, setTaskText] = useState(task.text);

  const handleSave = () => {
    if (!taskText.trim()) return;

    saveTaskChanges(task.id, taskText);
  };

  return (
    <div className={`task-card ${task.priority}`}>
      {/* Header */}
      <div className="card-header">
        <span
          className={`priority-badge ${task.priority}`}
        >
          {task.priority.toUpperCase()}
        </span>

        <div
          className="drag-handle"
          {...dragListeners}
          {...dragAttributes}
        >
          <FaGripVertical />
        </div>
      </div>

      {/* Content */}
      {task.editing ? (
        <div className="edit-section">
          <input
            type="text"
            value={taskText}
            onChange={(e) =>
              setTaskText(e.target.value)
            }
            className="edit-input"
          />

          <button
            className="save-btn"
            onPointerDown={(e) =>
              e.stopPropagation()
            }
            onClick={handleSave}
          >
            <FaCheck />
            Save
          </button>
        </div>
      ) : (
        <div className="task-content">
          <p className="task-title">
            {task.text}
          </p>
        </div>
      )}

      {/* Footer */}
      <div className="task-footer">
        <button
          className="edit-btn"
          onPointerDown={(e) =>
            e.stopPropagation()
          }
          onClick={() =>
            editTask(task.id)
          }
        >
          <FaEdit />
        </button>

        <div className="task-actions">
          <button
            className="action-btn"
            onPointerDown={(e) =>
              e.stopPropagation()
            }
            onClick={() =>
              changeTaskStage(
                task.id,
                "backward"
              )
            }
          >
            <FaArrowLeft />
          </button>

          <button
            className="action-btn"
            onPointerDown={(e) =>
              e.stopPropagation()
            }
            onClick={() =>
              changeTaskStage(
                task.id,
                "forward"
              )
            }
          >
            <FaArrowRight />
          </button>

          <button
            className="action-btn delete-btn"
            onPointerDown={(e) =>
              e.stopPropagation()
            }
            onClick={() =>
              removeTask(task.id)
            }
          >
            <FaTrash />
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskCard;