import {
  ComponentType,
  createContext, useCallback, useContext, useState,
} from 'react';
import { apiService } from '../../api/api.service';
import { Todo } from '../../api/api.model';
import { Props, TodoContextType } from './types';

const TodoContext = createContext<TodoContextType | undefined>(undefined); // Zmiana na TodoContext
const todosFromServer: Todo[] = apiService.fetchTodos();

export const ToDoProvider = ({ children }: Props) => {
  const [todos, setTodos] = useState(todosFromServer);
  const [editedTodo, setEditedTodo] = useState<null | Todo>(null); // Zmiana na editedTodo

  const addTodo = useCallback((todo) => {
    setTodos(prev => [...prev, todo]);
  }, []);

  const removeTodo = useCallback((todoId: number) => {
    setTodos(prev => prev.filter(todo => todoId !== todo.id));
  }, []);

  const editTodo = useCallback((todo) => {
    const nextTodos = [...todos];
    const editedIndex = todos.findIndex(v => v.id === todo.id);

    nextTodos[editedIndex] = todo;
    setTodos(nextTodos);
    setEditedTodo(null);
  }, [todos]);

  return (
    <TodoContext.Provider value={{
      todos, addTodo, removeTodo, editedTodo, setEditedTodo, editTodo,
    }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodo = (): TodoContextType => {
  const context = useContext(TodoContext);

  if (!context) {
    throw new Error('useTodo must be used within a ToDoProvider');
  }

  return context;
};

// eslint-disable-next-line max-len
export const withTodo = <P extends Record<string, unknown>> (Component: ComponentType<P>) => (props: P) => {
  const todoPros = useTodo();

  return <Component {...props} {...todoPros} />;
};
