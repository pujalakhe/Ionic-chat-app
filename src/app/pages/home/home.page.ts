import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {
  ModalController,
  PopoverController,
  SegmentCustomEvent,
} from '@ionic/angular';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild('new_chat') modal!: ModalController;
  @ViewChild('popover') popover!: PopoverController;
  segmentVal: string = 'chats';
  open_new_chat: boolean = false;
  // user!: Observable<any[]>;
  users = [
    {
      id: 1,
      name: 'Nikhil',
      photo: 'http://i.pravatar.cc/390',
    },
  ];

  constructor(private router: Router) {}

  ngOnInit() {}
  logout() {
    this.popover.dismiss();
  }
  onSegmentChanged(event: SegmentCustomEvent) {
    console.log(event);

    console.log(event.detail.value);
  }
  newChat() {
    this.open_new_chat = true;
  }
  onWillDismiss(event: any) {}
  cancel() {
    this.modal.dismiss();
    this.open_new_chat = false;
  }
  startChat(item: any) {}
  getChat(chatItem: any) {
    this.router.navigate(['/', 'home', 'chat', chatItem?.id]);
  }
}
