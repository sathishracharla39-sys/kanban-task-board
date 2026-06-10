import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import TaskCard from "./TaskCard";

function DraggableTask({
  task,
  removeTask,
  changeTaskStage,
  saveTaskChanges,
  editTask,
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({
    id: task.id,
  });

  const cardStyle = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={cardStyle}
      className="draggable-wrapper"
    >
      <TaskCard
        task={task}
        removeTask={removeTask}
        changeTaskStage={changeTaskStage}
        saveTaskChanges={saveTaskChanges}
        editTask={editTask}
        dragListeners={listeners}
        dragAttributes={attributes}
      />
    </div>
  );
}

export default DraggableTask;