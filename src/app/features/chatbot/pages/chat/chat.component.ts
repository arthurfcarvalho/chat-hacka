import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    FormsModule,
    NgClass
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent {
  userInput: string = '';
  messages: {text: string, sender: string, options?: string[]}[] = [];
  selectedOption: string = '';
  i: number = 1;

  sendMessage() {
    this.messages.push({text: this.userInput, sender: 'Você'});
    //this.messages.push({text: 'enviado', sender: 'Chatbot'});
    this.userInput = '';
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
