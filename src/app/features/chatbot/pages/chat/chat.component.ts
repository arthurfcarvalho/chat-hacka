import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../../../../core/services/chat.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent {
  userInput: {message: string} = {message: ''};
  messages: {text: string, sender: string, options?: string[], color?: string, slider?: boolean, min?: number, max?: number, value?: number}[] = [];
  selectedOption: string = '';
  data: {grupo?: string, message: string} = {message: '', grupo: 'desenvolvedor web'};

  constructor(private chatService: ChatService) {

  }

  sendMessage() {
    this.messages.push({text: this.userInput.message, sender: 'Você'});
    this.data.message = this.userInput.message;
    this.chatService.test(this.data).subscribe((response) => {
      if(response.habilidades_descritas.length > 0){
        this.messages.push({text: 'Habilidades do colaborador: ' + response.habilidades_descritas, sender: 'Chatbot', color: 'green'});
      }
      if(response.habilidades_faltantes.length > 0){
        this.messages.push({text: 'Habilidades que faltam ao colaborador: ' + response.habilidades_faltantes, sender: 'Chatbot', color: 'red'});
      }
      if(response.habilidades_relacionadas.length > 0){
        this.messages.push({text: 'Habilidades que podem estar relacionadas baseada em outros conhecimentos do colaborador: ' + response.habilidades_relacionadas, sender: 'Chatbot', color: 'orange'});
      }

      this.messages.push({text: 'Quantidade de competências: ', sender: 'Chatbot', slider: true, min: 0, max: (response.habilidades_descritas + response.habilidades_faltantes), value: response.habilidades_descritas.length});
      
    });

    this.userInput.message = '';
  }

  sendOption(option: string) {
    this.selectedOption = option;
    this.messages.push({text: option, sender: 'Você'});
    //this.messages.push({text: 'enviado', sender: 'Chatbot'});
  }

  addMessageWithOptions() {
    this.messages.push({
      text: 'Teste:',
      sender: 'Chatbot',
      options: ['Opção 1', 'Opção 2', 'Opção 3']
    });
  }
}
