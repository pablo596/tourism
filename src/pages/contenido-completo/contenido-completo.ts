import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Events  } from 'ionic-angular';
import { ServerProvider } from '../../providers/server/server';
import { RutaPage } from '../ruta/ruta';
import { VideosPage } from '../videos/videos';

/**
 * Generated class for the ContenidoCompletoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contenido-completo',
  templateUrl: 'contenido-completo.html',
})
export class ContenidoCompletoPage {
  slide: any;
  titulo:any;
  id_menu:any;
  id:any;
  id_submenu:any;
  imgInfo:any=[];
  hola:any;
  contenido:any= [];
  aux:any=[];
  imageArray:any =[];
  loader = this.loadingCtrl.create({
    content: '',
  });
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public loadingCtrl: LoadingController,
              public server: ServerProvider,
              public events: Events) {
    this.titulo = this.navParams.get('titulo');
    this.id = this.navParams.get('id');
    this.id_submenu = this.navParams.get('id_submenu');
    
    this.loader.present().then(()=>{
      
      this.server.getContenido(this.id_menu,this.id_submenu).then(data => {
        this.contenido = data['RES'];
        this.aux = this.contenido;
        this.contenido.forEach(a => {
          this.server.getImageInfo(a.id).then(data => {
            this.imgInfo = data['RES'];
            for (let index = 0; index < this.aux.length; index++) {
              for (let a = 0; a < this.imgInfo.length; a++) {
                if (this.aux[index]['id']==this.imgInfo[a]['id_turismo']) {
                  this.aux[index]['image'] = this.imgInfo;    
                }
              }
              this.aux[index]['nimage'] = this.imgInfo.length;
              this.loader.dismiss();
            }
          });  
        });
      });
    });
  }

  ionViewDidLoad() {
    
    console.log('ionViewDidLoad ContenidoCompletoPage');
  }

  doRefresh(event) {
    this.server.getContenidoId(this.id).then(data => {
      this.contenido = data['RES'];
      console.log(this.contenido);
      event.complete();
      for (let n = 0; n < this.contenido.length; n++) {
        this.server.getImageInfo(this.contenido[n]['id']).then(data => {
          this.imgInfo = data['RES'];
          console.log(this.imgInfo);
        });
      }
    });
  }

  videos(){
    this.navCtrl.push(VideosPage);
  }
  irUbicacion(lat,lng){
    this.navCtrl.push(RutaPage,{lat:lat,lng:lng});
  }
}
