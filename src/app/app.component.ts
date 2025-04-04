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
}
