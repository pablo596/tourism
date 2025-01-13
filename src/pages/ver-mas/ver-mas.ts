import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController,Slides } from 'ionic-angular';
import { ServerProvider } from '../../providers/server/server';
import { RutaPage } from '../ruta/ruta';
@IonicPage()
@Component({
  selector: 'page-ver-mas',
  templateUrl: 'ver-mas.html',
})
export class VerMasPage {
  title:any;
  loader = this.loadingCtrl.create({
    content: '',
  });
  datos:any=[];
  img:any=[];
  descripcion:any;
  ts:any;
  lat:any;
  lng:any;
  @ViewChild('slides') slides: Slides;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public server: ServerProvider,
    public loadingCtrl: LoadingController) {
      this.title = this.navParams.get('title');
      // var id = this.navParams.get('id');
      console.log(this.slides);
      // this.loader.present().then(()=>{
      //   this.server.getGuiaId(id).then(data => {
      //     this.datos = data['RES'];
      //     // this.lat = this.datos[0]['lat'];
      //     // this.lng = this.datos[0]['lng'];
      //     console.log(this.datos);
      //     for (let a = 0; a < this.datos.length; a++) {
      //       if (this.datos[a]['tipo']==3) {
      //         this.ts = this.datos[a]['img'];     
      //         console.log(this.datos[a]['img']);
      //       }
      //     }
      //     this.descripcion = this.datos[0]['descripcion'];
          
      //     var slider = document.getElementById('slider');
      //     // slider.setAttributeNode('autoplay':'asd')
      //     // this.slides.startAutoplay();
          
      //     this.loader.dismiss();
      //   });
      // });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad VerMasPage');
  }

  irUbicacion(lat,lng){
    this.navCtrl.push(RutaPage,{lat:lat,lng:lng});
  }

}
