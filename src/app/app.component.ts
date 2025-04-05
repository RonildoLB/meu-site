import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'meu_site'
  name = ""

  ngOnInit() {
    this.requestPermission();
  }

  click() {
    localStorage.setItem('usuario', 'valor')
  }

  delete() {
    localStorage.clear()
  }

  show() {
    const usuario = localStorage.getItem('usuario')
    this.name = usuario ?? ''
  }

  requestPermission() {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          console.log('Permissão concedida para notificações');
        }
      });
    }
  }

  showNotification(title: string, options?: NotificationOptions) {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(title, options);
    } else {
      console.warn('Notificações não permitidas ou não suportadas pelo navegador.');
    }
  }

  sendNotification() {
    this.showNotification('Notificação Ativada!', {
      body: 'Essa é uma notificação do seu app Angular 🚀',
      icon: 'assets/icon.png'
    });
  }
}
