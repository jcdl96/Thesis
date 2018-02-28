import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Socket } from 'ng-socket-io';


@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {
  message: string = '';
  _chatSubscription;
  messages: object[] = [];
  info: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private toastCtrl: ToastController,
    private socket: Socket
  ) {
      this.info = {
        lat: this.navParams.get('lat'),
        lng: this.navParams.get('lng'),
        date: this.navParams.get('date'),
        time: this.navParams.get('time'),
        image: this.navParams.get('image'),
        username: this.navParams.get('username'),
        isHospital: this.navParams.get('isHospital'),
        isPolice: this.navParams.get('isPolice'),
        isBarangay: this.navParams.get('isBarangay')
      };

    console.log(JSON.stringify(this.info));

    this.getMessages().subscribe(message => {
      this.messages.push(message);
    });

    this.getUsers().subscribe(data => {
      let user = data['user'];
      if (data['event'] === 'left') {
        this.showToast('User left: ' + user);
      } else {
        this.showToast('User joined: ' + user);
      }
    });

  }

  getUsers() {
    let observable = new Observable(observer => {
      this.socket.on('users-changed', data => {
        observer.next(data);
      });
    });
    return observable;
  }

  sendMessage() {
    // this.showToast(this.message);
    this.socket.emit('input', {
      username: this.info.username,
      message: this.message
    });
    this.message = '';
  }

  getMessages() {
    let observable = new Observable(observer => {
      this.socket.on('output', data => {
        observer.next(data);
      })
    });
    return observable;
  }

  showToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  ionViewWillLeave() {
    this.socket.disconnect();
  }

}
