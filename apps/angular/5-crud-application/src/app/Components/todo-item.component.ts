import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { Todo } from '../Models/todo.interface';

@Component({
  standalone: true,
  selector: 'app-todo-item',
  template: `
    <div>
      {{ todo().title }}
      <button (click)="update.emit(todo())">Update</button>
      <button (click)="delete.emit(todo().id)">Delete</button>
    </div>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.Default,
})
export class TodoItemComponent {
  todo = input.required<Todo>();
  update = output<Todo>();
  delete = output<number>();
}
