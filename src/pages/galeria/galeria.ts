import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServerProvider } from '../../providers/server/server';
import { Visor360Page } from '../visor360/visor360';
import { PhotosPage } from '../photos/photos';

/**
 * Generated class for the GaleriaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-galeria',
  templateUrl: 'galeria.html',
})
export class GaleriaPage {

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public server: ServerProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GaleriaPage');
  }
  openphotos(){
    this.navCtrl.push(PhotosPage);
  }
  open360(){
    this.navCtrl.push(Visor360Page);
  }
}
