import { TodoInfo } from '../TodoInfo';
import { useTodo } from '../../providers/TodoProvider';
import { Todo } from '../../api/api.model';

export const TodoList = () => {
  const { todos, removeTodo, setEditedTodo } = useTodo();

  const handleRemove = (id: number) => () => {
    removeTodo(id);
  };

  const handleEdit = (todo: Todo) => () => {
    setEditedTodo(todo);
  };

  return (
    <section className="TodoList">
      {todos.map((todo) => (
        <TodoInfo
          key={todo.id}
          todo={todo}
          onRemove={handleRemove(todo.id)}
          onEdit={handleEdit(todo)}
        />
      ))}
    </section>
  );
};
