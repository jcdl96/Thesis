import { Component } from '@angular/core';
import { NavController, ToastController, NavParams, AlertController } from 'ionic-angular';
import { SMS } from '@ionic-native/sms';
import { CallNumber } from '@ionic-native/call-number';

import { HomePage } from '../home/home';

@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html'
})
export class ModalPage {


  text: string = '';
  number: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private sms: SMS,
    private call: CallNumber
  ) { }

  homepage() {
    this.navCtrl.push(HomePage, {});
  }

  callToBrgy() {
    this.call.callNumber(this.number[0], true).then(() => {
    }).catch((err) => {
      alert(JSON.stringify(err));
    });
  }

  sendToBrgy() {
    // this.sms.send(this.number[i], this.text);
    for (let i = 0; i < this.number.length; i++) {
      try {
        this.sms.send(this.number[i], this.text).then(() => {
          alert('sms sent');
        });
      } catch (e) {
        console.log("error: " + e);
      }
    }
  }

}
