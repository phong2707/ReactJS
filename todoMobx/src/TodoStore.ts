// TodoStore.ts
import { makeAutoObservable } from "mobx";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

class TodoStore {
  todos: Todo[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  addTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      text,
      completed: false,
    };
    this.todos.push(newTodo);
  };

  toggleTodo = (id: number) => {
    const todo = this.todos.find((t) => t.id === id);
    if (todo) {
      todo.completed = !todo.completed;
    }
  };

  deleteTodo = (id: number) => {
    this.todos = this.todos.filter((t) => t.id !== id);
  };

  get remainingTodos() {
    return this.todos.filter((t) => !t.completed).length;
  }
}

export const todoStore = new TodoStore();