import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  constructor() {}

  getAuthApiUrl(): string {
    return environment.authApiUrl;
  }

  getTaskApiUrl(): string {
    return environment.taskApiUrl;
  }
}
