import { Injectable, signal } from '@angular/core';
import { Todo } from '../Models/todo.interface';

@Injectable({
  providedIn: 'root',
})
export class TodoStore {
  todos = signal<Todo[]>([]);

  addAll(todos: Todo[]) {
    this.todos.set(todos);
  }

  addOne(todo: Todo) {
    this.todos.set([...this.todos(), todo]);
  }

  update(newTodo: Todo) {
    this.todos.update((todo) => {
      const idx = todo.findIndex((t) => t.id === newTodo.id);
      todo[idx] = newTodo;
      return todo;
    });
  }

  deleteOne(id: number) {
    this.todos.set(this.todos().filter((t) => t.id !== id));
  }
}
