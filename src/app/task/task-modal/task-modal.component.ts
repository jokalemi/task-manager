import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../task.service';
import { Task } from '../task.model';

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.css'],
})
export class TaskModalComponent {
  @Input() task: Task | null = null;
  @Output() taskUpdated = new EventEmitter<boolean>();
  taskForm: FormGroup;
  statusOptions: { value: string; label: string }[] = [
    { value: 'TODO', label: 'Por hacer' },
    { value: 'IN_PROGRESS', label: 'En progreso' },
    { value: 'COMPLETED', label: 'Completado' },
  ];

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private taskService: TaskService
  ) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      status: ['TODO', Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.task) {
      this.taskForm.patchValue({
        title: this.task.title,
        description: this.task.description,
        status: this.task.status,
      });
    }
  }

  onSave(): void {
    if (this.taskForm.valid) {
      const formValues = this.taskForm.value;
      if (this.task) {
        this.taskService.updateTask({ ...this.task, ...formValues }).subscribe(
          (updatedTask) => {
            this.activeModal.close(true);
            this.taskUpdated.emit(true);
          },
          (error) => {
            console.error('Error updating task', error);
          }
        );
      } else {
        this.taskService.createTask(formValues).subscribe(
          (newTask) => {
            this.activeModal.close(true);
            this.taskUpdated.emit(true);
          },
          (error) => {
            console.error('Error creating task', error);
          }
        );
      }
    }
  }
}
