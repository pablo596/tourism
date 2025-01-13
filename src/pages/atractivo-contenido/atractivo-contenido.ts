import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ServerProvider } from '../../providers/server/server';

/**
 * Generated class for the AtractivoContenidoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-atractivo-contenido',
  templateUrl: 'atractivo-contenido.html',
})
export class AtractivoContenidoPage {
  titulo:any;
  contenido:any=[];
  aux:any=[];
  imgInfo:any=[];
  tipo:any;
  loader = this.loadingCtrl.create({
    content: '',
  });
  constructor(public navCtrl: NavController,
              // public menu: MenuController,
              public loadingCtrl: LoadingController,
              public server: ServerProvider, 
              public navParams: NavParams) {
    // this.menu.swipeEnable(true);
    this.titulo = this.navParams.get('titulo');
    this.tipo = this.navParams.get('tipo');
    this.loader.present().then(()=>{
      console.log(this.tipo);
      this.server.getAtractivoContenido(this.tipo).then(data => {
        this.contenido = data['RES'];
        console.log(this.contenido);
        this.aux = this.contenido;
        this.contenido.forEach(a => {
          
          this.server.getImageInfoAtractivo(a.id).then(dato => {
            this.imgInfo = dato['RES'];
            for (let index = 0; index < this.aux.length; index++) {
              for (let a = 0; a < this.imgInfo.length; a++) {
                if (this.aux[index]['id']==this.imgInfo[a]['id_guia']) {
                  this.aux[index]['image'] = this.imgInfo;    
                }
              }
              if (this.imgInfo.length) {
                this.aux[index]['nimage'] = this.imgInfo.length;  
              }else {
                this.aux[index]['nimage'] = 0;
              }
              this.loader.dismiss();
            } 
          });  
        });
      });
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AtractivoContenidoPage');
  }

  doRefresh(event) {
    this.server.getAtractivoContenido(this.tipo).then(data => {
      this.contenido = data['RES'];
      this.aux = this.contenido;
      this.contenido.forEach(a => {
        this.server.getImageInfoAtractivo(a.id).then(dato => {
          this.imgInfo = dato['RES'];
          for (let index = 0; index < this.aux.length; index++) {
            for (let a = 0; a < this.imgInfo.length; a++) {
              if (this.aux[index]['id']==this.imgInfo[a]['id_guia']) {
                this.aux[index]['image'] = this.imgInfo;    
              }
            }
            if (this.imgInfo.length) {
              this.aux[index]['nimage'] = this.imgInfo.length;  
            }else {
              this.aux[index]['nimage'] = 0;
            }
            event.complete();
          } 
          // console.log(this.aux);
        });  
      });
    });
  }
}
