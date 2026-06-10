import { useDroppable } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import DraggableTask from "./DraggableTask";

function TaskColumn({
  title,
  status,
  tasks,
  removeTask,
  changeTaskStage,
  saveTaskChanges,
  editTask,
}) {
  const { setNodeRef } = useDroppable({
    id: status,
  });

  return (
    <div ref={setNodeRef} className="column">
      <div className="column-header">
        <h2>{title}</h2>
      </div>

      <SortableContext items={tasks.map((item) => item.id)}>
        <div className="task-list">
          {tasks.length > 0 ? (
            tasks.map((item) => (
              <DraggableTask
                key={item.id}
                task={item}
                removeTask={removeTask}
                changeTaskStage={changeTaskStage}
                saveTaskChanges={saveTaskChanges}
                editTask={editTask}
              />
            ))
          ) : (
            <div className="empty-column">
              <p>Drop tasks here</p>
            </div>
          )}
        </div>
      </SortableContext>
    </div>
  );
}

export default TaskColumn;