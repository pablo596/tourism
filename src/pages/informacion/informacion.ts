import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InfoConsejoPage } from '../info-consejo/info-consejo';
import { InfoEmergenciaPage } from '../info-emergencia/info-emergencia';
import { InfoVisitanosPage } from '../info-visitanos/info-visitanos';
import { ServerProvider } from '../../providers/server/server';
/**
 * Generated class for the InformacionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-informacion',
  templateUrl: 'informacion.html',
})
export class InformacionPage {

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public server: ServerProvider
  ) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InformacionPage');
  }

  consejos(){
    this.navCtrl.push(InfoConsejoPage);
  }
  emergencia(){
    this.navCtrl.push(InfoEmergenciaPage);
  }
  visitanos(){
    this.navCtrl.push(InfoVisitanosPage);
  }
}
