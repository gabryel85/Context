import './App.scss';
import { TodoForm } from './components/TodoForm/TodoForm';
import { TodoList } from './components/TodoList';
import { useTodo } from './providers/TodoProvider';

export const App = () => {
  const { editedTodo } = useTodo();

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <TodoForm />
      <TodoList />
      {editedTodo && (
        <TodoForm
          defaultValue={editedTodo}
        />
      )}
    </div>
  );
};
