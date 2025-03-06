import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TaskModalComponent } from '../task-modal/task-modal.component';
import { TaskService } from '../task.service';
import { Task } from '../task.model';
import { TaskStatusService } from '../task-status.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];

  constructor(
    private taskService: TaskService,
    private taskStatusService: TaskStatusService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe(
      (tasks) => {
        this.tasks = tasks;
      },
      (error) => {
        console.error('Error fetching tasks', error);
      }
    );
  }

  getStatusClass(status: string): string {
    return this.taskStatusService.getStatusClass(status);
  }

  getStatusText(status: string): string {
    return this.taskStatusService.getStatusText(status);
  }

  openModal(task?: Task): void {
    const modalRef = this.modalService.open(TaskModalComponent);
    modalRef.componentInstance.task = task ? { ...task } : null;
    modalRef.result.then(
      (result) => {
        if (result) {
          this.loadTasks();
        }
      },
      (reason) => {
        console.log('Modal dismissed', reason);
      }
    );
  }

  onDelete(taskId: string | undefined): void {
    if (taskId === undefined) {
      console.error('Task ID is undefined');
      return;
    }

    if (confirm('¿Estás seguro de que quieres eliminar esta tarea?')) {
      this.taskService.deleteTask(taskId).subscribe(
        () => {
          this.tasks = this.tasks.filter((task) => task.id !== taskId);
          alert('Tarea eliminada con éxito.');
        },
        (error) => {
          console.error('Error eliminando tarea', error);
          alert('Hubo un problema al eliminar la tarea.');
        }
      );
    }
  }
}
