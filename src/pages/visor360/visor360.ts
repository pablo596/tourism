import { Component, ViewChild, ElementRef, Input, AfterViewInit } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import { ServerProvider } from '../../providers/server/server';
import 'pannellum/build/pannellum.js';
import { Vista360Page } from '../vista360/vista360';

/**
 * Generated class for the Visor360Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var window: any;

@IonicPage()
@Component({
  selector: 'page-visor360',
  templateUrl: 'visor360.html',
})
export class Visor360Page implements AfterViewInit {
titulo:any;
img:any; 

@ViewChild('container') container: ElementRef;
@ViewChild('frame') frame: ElementRef;
@Input() src: string;
@Input() options: Object;
viewer: any;
id: string;
img360:any=[];
loader = this.loadingCtrl.create({
  content: '',
});
defaultOptions:any={};
combinedOptions:any={};
  constructor(public nav: NavController, 
              public navParams: NavParams,
              public loadingCtrl: LoadingController,
              public server: ServerProvider) {
    this.titulo = this.navParams.get('titulo');
    this.img = 'https://pannellum.org/images/cerro-toco-0.jpg';
    console.log(this.container);
    if (!window.FileReader.prototype.addEventListener) {
      window.FileReader.prototype.addEventListener = function (type, listener) {
        if (type === 'loadend') {
          this.onloadend = listener;
        }
      };
      console.log('FileReader patch for loadend injected');
    }
    this.id = 'panoid';
  }
  ngAfterViewInit() {
    console.log(this.container);
    this.loader.present().then(()=>{
      this.server.getImage360().then(data => {
        this.img360 = data['RES'];
        this.loader.dismiss();
      });
    });
  }
  ver360(id,nombre,lugar){
    this.nav.push(Vista360Page,{id:id,nombre:nombre,lugar:lugar});
  }
}
