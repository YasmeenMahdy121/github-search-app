import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { MessagesService } from '../../shared/services/messages.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  let message = inject(MessagesService);
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'An unexpected error occurred';

      if (error.error instanceof ErrorEvent) {
        errorMessage = `Client-side error: ${error.error.message}`;
      } else {
        errorMessage = error.error.message;
      }
      message.popup('Oops!', error.error.message, 'error');
      return throwError(() => error);
    })
  );
};
