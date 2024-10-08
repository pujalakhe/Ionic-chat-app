import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  name: string = 'Sender';
  message!: string;
  isLoading: boolean = false;
  currentUserId: number = 1;
  chats = [
    { id: 1, sender: 1, message: 'hi' },
    { id: 2, sender: 2, message: 'hello' },
  ];
  constructor() {}

  ngOnInit() {}
  sendMessage() {}
}
