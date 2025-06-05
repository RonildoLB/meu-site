import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() { }

  async showLocalNotification(title: string, body: string, icon?: string): Promise<void> {
    // 1. Verifica se o navegador suporta notificações
    if (!('Notification' in window)) {
      alert('Este navegador não suporta notificações desktop/mobile.');
      return;
    }

    // 2. Verifica se a permissão já foi concedida, senão, solicita
    if (Notification.permission === 'granted') {
      // Se a permissão já foi concedida, cria a notificação
      this.createNotification(title, body, icon);
    } else if (Notification.permission !== 'denied') {
      // Senão, e se a permissão não foi negada explicitamente antes, pede permissão
      // É importante pedir permissão em resposta a uma ação do usuário (como um clique)
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        this.createNotification(title, body, icon);
      } else {
        alert('Permissão para notificações foi negada.');
      }
    } else {
      // Permissão foi negada anteriormente
      alert('Você já negou as permissões para notificações. Por favor, habilite nas configurações do navegador.');
    }
  }

  private createNotification(title: string, body: string, icon?: string): void {
    const options: NotificationOptions = {
      body: body,
      icon: icon || 'assets/icons/icon-96x96.png', // Caminho para um ícone padrão
      // Outras opções: badge, image, tag, renotify, silent, etc.
      // https://developer.mozilla.org/en-US/docs/Web/API/notification/Notification
    };

    // Cria e exibe a notificação
    // O Service Worker não é estritamente necessário para ESTE tipo de notificação local
    // mas se você tiver um service worker registrado (ex: do @angular/pwa),
    // ele pode interceptar e exibir a notificação, oferecendo mais controle.
    // Para uma notificação local simples e imediata, o `new Notification` é suficiente.
    const notification = new Notification(title, options);

    // Você pode adicionar event listeners à notificação, se necessário
    notification.onclick = (event) => {
      event.preventDefault(); // Previne o navegador de focar a aba se você quiser outro comportamento
      // Ex: window.open('http://localhost:4200/alguma-rota', '_blank');
      console.log('Notificação clicada!');
      notification.close();
    };

    notification.onerror = () => {
      console.error('Erro ao exibir a notificação.');
    };

    // Fecha a notificação automaticamente após alguns segundos (opcional)
    setTimeout(() => notification.close(), 10000); // Fecha após 10 segundos
  }

  // Método para verificar se as notificações estão habilitadas no @angular/pwa service worker (se estiver usando)
  // No seu caso, para notificações locais imediatas, isso pode não ser diretamente usado para *mostrar*
  // a notificação, mas é bom saber. O Service Worker do Angular PWA pode mostrar
  // notificações se elas forem enviadas como "push data messages" do servidor.
  // Para notificações locais, o `new Notification()` é o principal.
}