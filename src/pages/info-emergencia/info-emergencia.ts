import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Platform } from 'ionic-angular';
import { ServerProvider } from '../../providers/server/server';
import { CallNumber } from '@ionic-native/call-number';

/**
 * Generated class for the InfoEmergenciaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-info-emergencia',
  templateUrl: 'info-emergencia.html',
})
export class InfoEmergenciaPage {
  loader = this.loadingCtrl.create({
    content: '',
  });
  si:any;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public server: ServerProvider,
              public loadingCtrl: LoadingController,
              private callNumber: CallNumber,
              private platform: Platform
  ) {
    this.loader.present();
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InfoEmergenciaPage');
  }

  ionViewWillEnter(): void {
    this.loader.dismiss();
  }

  ionViewCanEnter(){
    this.si = 1;
  }
  
  handleIFrameLoadEvent(): void {
    this.loader.dismiss();
  }
  llamrEmergencia(numero){
    if (this.platform.is('cordova')) {
      this.callNumber.callNumber(numero, true)
      .then(res => {console.log('Launched dialer!', res);console.log('then')})
      .catch(err => console.log(JSON.stringify(err)));  
    } else {
      console.log('Llamando al numero: '+numero+'...');
    }
  }
}
