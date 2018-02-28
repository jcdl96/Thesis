import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Socket } from 'ng-socket-io';

import { ChatPage } from '../chat/chat';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  public base64image: string;
  username: string = '';
  info: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private socket: Socket
  ) {
    this.info = {
      lat: this.navParams.get('lat'),
      lng: this.navParams.get('lng'),
      date: this.navParams.get('date'),
      time: this.navParams.get('time'),
      image: this.navParams.get('image'),
      isHospital: this.navParams.get('isHospital'),
      isPolice: this.navParams.get('isPolice'),
      isBarangay: this.navParams.get('isBarangay')
    };

  }



  loginUser() {
    this.info.username = this.username;
    this.navCtrl.push(ChatPage, this.info);
  }

}
