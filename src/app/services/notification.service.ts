import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomSnackbarComponent } from 'src/assets/alerts/custom-snackbar.component';


@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private snackBar: MatSnackBar) {}

  show(type: 'success' | 'error' | 'info' | 'warn', message: string, duration = 3000) {
    const iconMap = {
      success: 'check_circle',
      error: 'error',
      info: 'info',
      warn: 'warning'
    };

    this.snackBar.openFromComponent(CustomSnackbarComponent, {
      duration,
      data: {
        message,
        icon: iconMap[type],
        type
      },
      panelClass: ['no-padding-snackbar'],
      horizontalPosition: 'end',
      verticalPosition: 'top'
    });
  }

  success(message: string, duration = 3000) {
    this.show('success', message, duration);
  }

  error(message: string, duration = 3000) {
    this.show('error', message, duration);
  }

  info(message: string, duration = 3000) {
    this.show('info', message, duration);
  }

  warn(message: string, duration = 3000) {
    this.show('warn', message, duration);
  }
}
