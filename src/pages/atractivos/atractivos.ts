import { AtractivoContenidoPage } from './../atractivo-contenido/atractivo-contenido';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { GuiaTuristicaPage } from '../guia-turistica/guia-turistica';
import { ServerProvider } from '../../providers/server/server';
/**
 * Generated class for the AtractivosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-atractivos',
  templateUrl: 'atractivos.html',
})
export class AtractivosPage {
  loader = this.loadingCtrl.create({
    content: '',
  });
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public server: ServerProvider,
              private loadingCtrl: LoadingController) {
    this.loader.present().then(()=>{ 
      
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AtractivosPage');
  }
  ngAfterViewInit(): void {
    this.loader.dismiss();
  }

  openMap(){
    this.navCtrl.push(GuiaTuristicaPage);
  }

  naturales(){
    this.navCtrl.push(AtractivoContenidoPage,{titulo:'Atractivos Naturales',tipo:'6'});
  }
  culturales(){
    this.navCtrl.push(AtractivoContenidoPage,{titulo:'Atractivos Culturales',tipo:'7'});
  }
}
