import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { ServerProvider } from '../../providers/server/server';

@IonicPage()
@Component({
  selector: 'page-turismo',
  templateUrl: 'turismo.html',
})
export class TurismoPage {
  datos: any[];
  id:any;
  title:any;
  ImageArray: any = [];
  contenido:any=[];
  id_menu:any;
  id_submenu:any;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public http: Http,
              public server: ServerProvider) {
    this.id = navParams.get('id');
       
  }

  cargarSubMenu(){
    this.server.getContenido(this.id_menu,this.id_submenu).then(data => {
        this.contenido = data['RES'];
      });
  };

  ionViewDidLoad() {
    console.log('ionViewDidLoad TurismoPage');
  }

}
