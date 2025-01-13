import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, MenuController, Nav  } from 'ionic-angular';
import { ServerProvider } from '../../providers/server/server';
import { ContenidoCompletoPage } from "../contenido-completo/contenido-completo";
import { RutaPage } from '../ruta/ruta';
import { VideosPage } from '../videos/videos';

/**
 * Generated class for the ContenidoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contenido',
  templateUrl: 'contenido.html',
})
export class ContenidoPage {
  
  @ViewChild(Nav) nav: Nav;
  
  contenido:any=[];
  aux:any=[];
  tipoContenido:any;
  imgInfo:any=[];
  id_menu:any;
  id_submenu:any;
  titulo:any;
  ImageArray: any = [];
  coords:any;
  ht:any;
  loader = this.loadingCtrl.create({
    content: '',
  });
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public server: ServerProvider,
              public menu: MenuController,
              public loadingCtrl: LoadingController) {
    this.id_menu = this.navParams.get('id_menu');
    this.id_submenu = this.navParams.get('id_submenu');
    this.titulo = this.navParams.get('titulo');
    // console.log(this.titulo);
    this.menu.swipeEnable(true);
    // console.log(document.getElementsByTagName('ion-slides'));
    this.loader.present().then(()=>{
      
      this.server.getContenido(this.id_menu,this.id_submenu).then(data => {
        this.contenido = data['RES'];
        this.aux = this.contenido;
        this.contenido.forEach(a => {
          this.server.getImageInfo(a.id).then(dato => {
            this.imgInfo = dato['RES'];
            for (let index = 0; index < this.aux.length; index++) {
              for (let a = 0; a < this.imgInfo.length; a++) {
                if (this.aux[index]['id']==this.imgInfo[a]['id_turismo']) {
                  this.aux[index]['image'] = this.imgInfo;    
                }
              }
              this.aux[index]['nimage'] = this.imgInfo.length;
              this.loader.dismiss();
            } 
            console.log(this.aux);
          });  
        });
      });
    });
  }
  
  
  doRefresh(event) {
    this.server.getContenido(this.id_menu,this.id_submenu).then(data => {
      this.contenido = data['RES'];
      this.aux = this.contenido;
      this.contenido.forEach(a => {
        this.server.getImageInfo(a.id).then(dato => {
          this.imgInfo = dato['RES'];
          for (let index = 0; index < this.aux.length; index++) {
            for (let a = 0; a < this.imgInfo.length; a++) {
              if (this.aux[index]['id']==this.imgInfo[a]['id_turismo']) {
                this.aux[index]['image'] = this.imgInfo;    
              }
            }
            this.aux[index]['nimage'] = this.imgInfo.length;
            event.complete();
          } 
          console.log(this.aux);
        });  
      });
    });
  }

  

  ionViewDidLoad() {
    // this.cargarContenido();
    console.log('Ventana contenido');
    
  }
  verMas(titulo,id){
    this.navCtrl.push(ContenidoCompletoPage,{titulo:titulo,id:id});
  }

  videos(id){
    this.navCtrl.push(VideosPage,{id:id});
  }
  irUbicacion(lat,lng){
    this.navCtrl.push(RutaPage,{lat:lat,lng:lng});
  }

  loadSlider() {
    
  }
  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.loader.dismiss();
  }
  
}
