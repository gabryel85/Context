import {
  ChangeEventHandler, MouseEventHandler, useEffect, useState,
} from 'react';
import { Todo, User } from '../../api/api.model';
import { apiService } from '../../api/api.service';
import { useTodo } from '../../providers/TodoProvider';

const users = apiService.fetchUsers();

type TodoFormProps = {
  defaultValue?: Todo;
};

export const TodoForm = ({ defaultValue }: TodoFormProps) => {
  const { addTodo, editTodo, editedTodo } = useTodo();
  const [selectedUser, setSetselectedUser] = useState<User | null>(
    defaultValue?.user || null,
  );
  const [title, setTitle] = useState<string>(defaultValue?.title || '');

  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasUserError, setHasUserError] = useState(false);

  useEffect(() => {
    if (!defaultValue) {
      return;
    }

    setSetselectedUser(defaultValue.user);
    setTitle(defaultValue.title);
  }, [defaultValue]);

  const handleTitleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setHasTitleError(false);
    setTitle(e.target.value);
  };

  const handleUserChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    setHasUserError(false);
    setSetselectedUser(
      users.find((user) => user.id === Number(e.target.value)) || null,
    );
  };

  const validate = () => {
    if (!selectedUser) {
      setHasUserError(true);
    }

    if (!title) {
      setHasTitleError(true);
    }

    return !!selectedUser && !!title;
  };

  const handleSubmitClick: MouseEventHandler = (e) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }

    const todo: Todo = {
      id: defaultValue?.id || new Date().getTime(),
      completed: defaultValue?.completed || false,
      userId: (selectedUser as User).id,
      user: selectedUser as User,
      title,
    };

    if (editedTodo) {
      editTodo(todo);
    } else {
      addTodo(todo);
    }

    setTitle('');
    setSetselectedUser(null);
  };

  return (
    <form action="/api/todos" method="POST">
      <div className="field">
        <input
          type="text"
          data-cy="titleInput"
          value={title}
          onChange={handleTitleChange}
        />
        {hasTitleError && <span className="error">Please enter a title</span>}
      </div>

      <div className="field">
        <select
          data-cy="userSelect"
          defaultValue="0"
          value={selectedUser?.id || '0'}
          onChange={handleUserChange}
        >
          <option value="0" disabled>
            Choose a user
          </option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.username}
            </option>
          ))}
        </select>
        {hasUserError && <span className="error">Please choose a user</span>}
      </div>

      <button type="submit" data-cy="submitButton" onClick={handleSubmitClick}>
        Save
      </button>
    </form>
  );
};
