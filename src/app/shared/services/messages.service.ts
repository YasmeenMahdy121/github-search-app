import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  constructor() {}

  popup(title: string, message: string, icon: SweetAlertIcon = 'info') {
    return Swal.fire({
      title: title,
      text: message,
      icon: icon,
      background: '#fff',
      buttonsStyling: false,
      customClass: {
        confirmButton: `confirm-btn`,
      },
    });
  }
}
