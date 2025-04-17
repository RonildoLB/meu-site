import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SwPush, SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    ReactiveFormsModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  VAPID_PUBLIC_KEY = 'BIemS3Vptpn5XNP_LSMwI_HP8-pOfg1iDupADEzKHHPmNUpDO6yJUA4_ruiq0r_e2N3mDFlJQujUVHE-S7VOIXo';
  title = 'meu_site'
  name = ""
  public form!: FormGroup

  constructor(private pushSw: SwPush, private update: SwUpdate) {
    this.update.versionUpdates.subscribe(event => {
      if (event.type === 'VERSION_READY') {
        console.log('Nova versão disponível');
      }
    });
  
    this.pushSw.messages.subscribe(msg => {
      console.log(JSON.stringify(msg));
    });
  }

  ngOnInit() {
    this.form = new FormGroup({
      input: new FormControl(null)
    });
  }

  click() {
    localStorage.setItem('usuario', this.form.get('input')?.value)
  }

  delete() {
    localStorage.clear()
  }

  show() {
    const usuario = localStorage.getItem('usuario')
    this.name = usuario ?? ''
  }
}
