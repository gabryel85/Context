import { Todo } from '../../api/api.model';

export type Props = React.PropsWithChildren<{}>;

export interface TodoContextType {
  todos: Todo[],
  addTodo: (todo: Todo) => void,
  editTodo: (todo: Todo) => void,
  removeTodo: (todoId: number) => void,
  editedTodo: Todo | null,
  setEditedTodo: (todo: Todo) => void
}
