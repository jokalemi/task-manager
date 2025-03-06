import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskModalComponent } from './task-modal/task-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [TaskListComponent, TaskModalComponent],
  imports: [CommonModule, ReactiveFormsModule, NgbModalModule],
  exports: [TaskListComponent],
})
export class TaskModule {}
