import { Injectable } from '@angular/core';

const TaskStatuses = ['TODO', 'IN_PROGRESS', 'COMPLETED'] as const;
type TaskStatus = (typeof TaskStatuses)[number];

@Injectable({
  providedIn: 'root',
})
export class TaskStatusService {
  private statusMap: { [key in TaskStatus]: { class: string; text: string } } =
    {
      TODO: { class: 'badge bg-warning', text: 'Por hacer' },
      IN_PROGRESS: { class: 'badge bg-info', text: 'En progreso' },
      COMPLETED: { class: 'badge bg-success', text: 'Completado' },
    };

  private getStatusProperty(
    status: string,
    property: 'class' | 'text'
  ): string {
    if (TaskStatuses.includes(status as TaskStatus)) {
      return this.statusMap[status as TaskStatus]?.[property] || '';
    }
    return '';
  }

  getStatusClass(status: string): string {
    return this.getStatusProperty(status, 'class');
  }

  getStatusText(status: string): string {
    return this.getStatusProperty(status, 'text');
  }
}
