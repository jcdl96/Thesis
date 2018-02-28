import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavController, ModalController, Platform, NavParams, ViewController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Geolocation } from '@ionic-native/geolocation';
import { Socket } from 'ng-socket-io';
import { GoogleMaps, GoogleMap, LatLng, GoogleMapsEvent } from '@ionic-native/google-maps';

import { LoginPage } from '../login/login';
import { ModalPage } from '../modal/modal';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public base64image: string;
  hospital: boolean;
  police: boolean;
  barangay: boolean;
  selectAllModel: boolean;
  lat: any;
  lng: any;
  currentDate: any;
  currentTime: any;
  info: any;

  constructor(
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    private camera: Camera,
    public geo: Geolocation,
    private socket: Socket
  ) { }

  ionViewDidLoad() {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this
      .camera
      .getPicture(options)
      .then((imageData) => {
        this.base64image = 'data:image/jpeg;base64,' + imageData;
      }, (err) => {
        //Handle error
      });

  }

  backToCamera() { this.ionViewDidLoad(); }

  send() {
    if (this.hospital || this.police || this.barangay) {
      console.log("send");
      var splitDate = new Date();
      splitDate.setUTCHours(splitDate.getUTCHours() + 8);
      var splitDateToString = splitDate.toISOString();
      var currentDate = splitDateToString.split("T");
      this.currentDate = currentDate[0];
      this.currentTime = currentDate[1].split("Z")[0];


      this.geo.getCurrentPosition().then((pos) => {
      }).catch(err => console.log("Error getting location", err));

      this.lat = 15.139721973558961;
      this.lng = 120.59508029021981;
      // this.lat = 15.133078;
      // this.lng = 120.590011;
      this.info = {
        lat: this.lat,
        lng: this.lng,
        date: this.currentDate,
        time: this.currentTime,
        image: this.base64image,
        isHospital: this.hospital,
        isPolice: this.police,
        isBarangay: this.barangay
      };

      this.navCtrl.push(LoginPage, this.info);
      this.socket.emit('accident', this.info);
    }

  }

  selectAll() {
    this.hospital = this.selectAllModel;
    this.police = this.selectAllModel;
    this.barangay = this.selectAllModel;
  }

  check() {
    this.selectAllModel = (!this.hospital || !this.police || !this.barangay) ? false : true;
  }

  offlineModal() {
    this.navCtrl.push(ModalPage, {});
  }
}
