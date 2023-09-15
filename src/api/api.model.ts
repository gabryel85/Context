export type User = {
  id: number,
  name: string,
  username: string,
  email: string,
};

export interface TodoServer {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user: User | null;
}
