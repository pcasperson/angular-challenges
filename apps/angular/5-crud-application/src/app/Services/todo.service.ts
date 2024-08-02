import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { randText } from '@ngneat/falso';
import { Todo } from '../Models/todo.interface';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todoApiEndpoint = 'https://jsonplaceholder.typicode.com/todos';

  constructor(private http: HttpClient) {}

  initTodoList() {
    return this.http.get<Todo[]>(this.todoApiEndpoint);
  }

  updateTodo(todo: Todo) {
    return this.http.put<Todo>(
      `${this.todoApiEndpoint}/${todo.id}`,
      JSON.stringify({
        todo: todo.id,
        title: randText(),
        userId: todo.userId,
      }),
      {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      },
    );
  }
}
