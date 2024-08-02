import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { TodoItemComponent } from './Components/todo-item.component';
import { Todo } from './Models/todo.interface';
import { TodoService } from './Services/todo.service';
import { TodoStore } from './State/todo.store';

@Component({
  standalone: true,
  imports: [CommonModule, TodoItemComponent],
  selector: 'app-root',
  template: `
    @for (todo of todoStore.todos(); track todo.id) {
      <app-todo-item
        [todo]="todo"
        (update)="update($event)"
        (delete)="delete($event)" />
    }
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class AppComponent implements OnInit {
  todoStore = inject(TodoStore);
  todoService = inject(TodoService);

  ngOnInit(): void {
    this.todoService
      .initTodoList()
      .subscribe((todos) => this.todoStore.addAll(todos));
  }

  update(todo: Todo) {
    this.todoService.updateTodo(todo).subscribe((newTodo) => {
      this.todoStore.update(newTodo);
    });
  }

  delete(id: number) {
    this.todoStore.deleteOne(id);
  }
}
