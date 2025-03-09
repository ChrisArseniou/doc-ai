import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  messages: any[] = [];
  userInput = '';
  isLoading = false;

  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
    this.addWelcomeMessage();
  }

  addWelcomeMessage() {
    this.messages.push({
      type: 'ai',
      content: 'Hello! I\'m Doc AI. How can I help you today?'
    });
  }

  sendMessage() {
    if (!this.userInput.trim()) return;

    const userMessage = {
      type: 'user',
      content: this.userInput
    };
    
    this.messages.push(userMessage);
    this.isLoading = true;
    
    this.chatService.sendMessage(this.userInput)
    .then((response) => {
      const aiMessage = {
        type: 'ai',
        content: response // response is already a string
      };
      this.messages.push(aiMessage);
    })
    .catch((error) => {
      console.error('Error:', error);
      this.messages.push({
        type: 'ai',
        content: 'Sorry, I encountered an error. Please try again.'
      });
    })
    .finally(() => {
      this.isLoading = false;
    });

    this.userInput = '';
  }
}