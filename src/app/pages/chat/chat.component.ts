import { Component, ElementRef, ViewChild } from '@angular/core';
import { io } from 'socket.io-client';
import  JSConfetti  from 'js-confetti';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent {
  socket = io('https://chat-server-msr8.onrender.com');

  data: any = {};
  arrMensajes: any[] = [];
  numClientes: number = 0;
  audioOn: boolean = false;

  @ViewChild('chat') chat!: ElementRef;

  ngOnInit() {
    this.socket.on('mensaje_chat', (data) => {
      if (this.audioOn) {
        let audio: HTMLAudioElement = new Audio(
          'https://cdn.videvo.net/videvo_files/audio/premium/audio0303/watermarked/_Soundstorm%206_Tones-AlertDing-Melodic-H-2_B04-08417_preview.mp3'
        );
        audio.play();
      }

      //Cada vez que llegue un nuevo mensaje, lo ponemos en el array y lo pinatmos en el html
      this.arrMensajes.push(data);
      this.chat.nativeElement.scrollTop = this.chat.nativeElement.scrollHeight;
    });

    this.socket.on('clientes_conectados', (num) => {
      const jsConfetti = new JSConfetti();
      jsConfetti.addConfetti();
      this.numClientes = num;
    });
  }

  onClick() {
    this.data.socket_id = this.socket.id;
    this.socket.emit('mensaje_chat', this.data);
  }
}
