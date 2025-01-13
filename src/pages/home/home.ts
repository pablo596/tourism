import {Component} from "@angular/core";
import {NavController, PopoverController, MenuController, LoadingController, ActionSheetController, Events, Platform, AlertController } from "ionic-angular";
import { StatusBar } from '@ionic-native/status-bar';
// import {Storage} from '@ionic/storage';

import {NotificationsPage} from "../notifications/notifications";
import {SettingsPage} from "../settings/settings";
import {TripsPage} from "../trips/trips";
import {SearchLocationPage} from "../search-location/search-location";
// import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/timeout';
import { ServerProvider } from '../../providers/server/server';
import { ContenidoPage } from "../contenido/contenido";
import { ContenidoCompletoPage } from "../contenido-completo/contenido-completo";
import { GaleriaPage } from '../galeria/galeria';
// import { LocationAccuracy } from '@ionic-native/location-accuracy';
import { OpenNativeSettings } from '@ionic-native/open-native-settings/ngx';
import { RutaPage } from '../ruta/ruta';
import { AtractivosPage } from '../atractivos/atractivos';
import { AtractivoContenidoPage } from './../atractivo-contenido/atractivo-contenido';
import { VideosPage } from '../videos/videos';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { InformacionPage } from '../informacion/informacion';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  
})

export class HomePage {
  // search condition
  
  public search = {
    name: "Rio de Janeiro, Brazil",
    date: new Date().toISOString()
  }
  ImageArray: any = [];
  ImageCards: any = [];
  splash = true;
  datos:any =[];
  cards: any[];
  principal:any = [];
  submenu:any = [];
  imgInfo: any = [];
  loader = this.loadingCtrl.create({
    content: '',
  });
  possibleButtons:any = [];
  constructor(public nav: NavController, 
              public popoverCtrl: PopoverController,
              public menu: MenuController,
              public server: ServerProvider,
              public loadingCtrl: LoadingController,
              public actionSheetCtrl: ActionSheetController,
              private openNativeSettings: OpenNativeSettings,
              public events: Events,
              public statusBar: StatusBar,
              public platform: Platform,
              private alertCtrl: AlertController,
              private iab: InAppBrowser) {
    this.platform.ready().then(() => {
      this.statusBar.backgroundColorByHexString('#F48E28');
    })
    events.subscribe('notification:created', (titulo,id_contenido,menu,submenu,tipo,categoria) => {
      console.log('****---- LLEGO LA NOTIFICACION ----****');
      console.log("Notificacion Creada " + titulo + ' menu: '+ menu+ ' submenu: '+submenu);
      if (tipo==0) {
        this.nav.push(ContenidoCompletoPage, {titulo:titulo,id:menu,id_submenu:submenu}); 
      } else if(tipo==1){
        var titulo;
        if (categoria==8) {
          titulo = 'Atractivos Naturales';
        } else {
          titulo = 'Atractivos Culturales';
        }
        this.nav.push(AtractivoContenidoPage,{titulo:titulo,tipo:categoria});
      }      
    });

    this.ImageArray = [
      {'image':'assets/slider/p1.png'},
      {'image':'assets/slider/p2.png'},
      {'image':'assets/slider/p3.png'},
      {'image':'assets/slider/p4.png'}
    ];
    this.ImageCards = [
      {'image':'assets/segment/festividades.png'},
      {'image':'assets/segment/ecoturismo.png'},
      {'image':'assets/segment/sol-playa.png'},
      {'image':'assets/segment/deporte.png'},
      {'image':'assets/segment/gastro.png'}
    ];
    this.menu.swipeEnable(true);

    // let localData = http.get('assets/cards.json').map(res => res.json().items);
    // localData.subscribe(data => {
    //   this.cards = data;
    // });

    this.loader.present().then(()=>{ 
      this.server.getMenu().then(data => {
        this.principal = data['RES'];
        console.log(this.principal[0]['id']);
        // for (let n = 0; n < this.principal.length; n++) {
        //   this.server.getImageInfo(this.principal[n]['id']).then(data => {
        //     this.imgInfo = data['RES'];
        //     console.log(this.imgInfo);
        //   });
        // }
        this.server.getMenuCompleto().then(data => {
          this.submenu = data['RES'];
          // for (let i = 0; i < this.submenu.length; i++) {
          //   if (!this.submenu[i]['id_submenu']) {
          //   }
          // }
          this.loader.dismiss();
        });
        console.log(this.imgInfo);
        
      });
    });

  }
  
  
  doRefresh(event) {
      this.server.getMenu().then(data => {
        this.principal = data['RES'];
        console.log(this.principal);
        this.server.getMenuCompleto().then(data => {
          this.submenu = data['RES'];
        });
        console.log(this.imgInfo);
        // this.loader.dismiss();
        event.complete();
      });
  }

  enableLocation(setting: string){
    console.log('click')
    this.openNativeSettings.open('location').then(val =>{
      alert(setting);
    }).catch(err=>{
      alert(JSON.stringify(err));
    })
  }

  actionSheet(title,id,buttons) {
    console.log(title);
    console.log(buttons);
    let actionSheet = this.actionSheetCtrl.create({
      title: title,
      cssClass: 'action-sheets-basic-page',  
      buttons: buttons
    });
    
    actionSheet.present();
  }

  ionViewDidLoad(){
    // this.cargarParroquias();
  }
  // go to result page
  doSearch() {
    this.nav.push(TripsPage);
  }

  irMenu(id,menu,submenu){
    if (submenu==1) {
      for (let i = 0; i < this.submenu.length; i++) {
        if (this.submenu[i]['id_menu']==id) {
          console.log(this.submenu);
          console.log(this.submenu[i]['id_submenu']);
          console.log(this.submenu[i]['imgsub_point']);
          let button;
          if (this.submenu[i]['id_menu']==20 && this.submenu[i]['id_submenu']==18) {
            button = {
              text: this.submenu[i]['submenu'],
              // icon: this.submenu[i]['imgsub_point'],
              cssClass: 'botton',
              handler: () => {
                const browser = this.iab.create('http://www.pedernalesturistico.com/');

                // browser.executeScript(...);

                // browser.insertCSS(...);
                browser.on('loadstop').subscribe(event => {
                  browser.insertCSS({ code: "body{color: red;" });
                });

                browser.close();
              }
            }  
          } else if (this.submenu[i]['id_menu']==20 && this.submenu[i]['id_submenu']==19) {
            button = {
              text: this.submenu[i]['submenu'],
              // icon: this.submenu[i]['imgsub_point'],
              cssClass: 'botton',
              handler: () => {
                this.nav.push(InformacionPage);
              }
            }  
          }else {
            button = {
              text: this.submenu[i]['submenu'],
              // icon: this.submenu[i]['imgsub_point'],
              cssClass: 'botton',
              handler: () => {
                this.nav.push(ContenidoPage,{titulo:this.submenu[i]['submenu'],id_menu:this.submenu[i]['id_menu'],id_submenu:this.submenu[i]['id_submenu']})
              }
            }  
          }
          
          this.possibleButtons.push(button);  
        }
      }
      let buttonCancell =    {
        text: 'Cancelar',
        role: 'cancel',
        
        handler: () => {
          console.log('Cancel clicked');
        }
      }
      this.possibleButtons.push(buttonCancell);  
      console.log(this.possibleButtons);
      this.actionSheet(menu,id,this.possibleButtons);
      this.possibleButtons = [];
    }else if(menu=="GUIA TURISTICA"){
      this.nav.push(AtractivosPage);
      console.log('abriendo guia turistica')
    }else if(menu=="GALERIA"){
      this.nav.push(GaleriaPage);
      console.log('abriendo el visor')
    }else if(menu=="COMO LLEGAR"){
      this.nav.push(RutaPage,{lat:0.0731181,lng:-80.0513928});
    }else if(menu=="VIDEOS"){
      this.nav.push(VideosPage);
    }else if(menu=="MAS INFORMACION"){
      this.nav.push(InformacionPage);
    }else{
      console.log(id);
      this.server.getContenido(id,0).then(data => {
        console.log(data.RES);
        console.log(data.RES.id_menu);
        console.log(data.RES.id_menusub);
        if (data.RES) {
          this.nav.push(ContenidoPage,{titulo:menu,id_menu:data.RES[0]['id_menu'],id_submenu:data.RES[0]['id_menusub']});  
        } else {
          let confirm = this.alertCtrl.create({
            title: 'Aún no hay contenido agregado.',
            message: 'Muy pronto se agregará el contenido en esta opción.',
            buttons: [
              {
                text: 'Aceptar',
                handler: () => {
                }
              }
            ]
          });
          confirm.present();
        }
      });
    }
  }

  // choose place
  choosePlace(from) {
    this.nav.push(SearchLocationPage, from);
  }

  // to go account page
  goToAccount() {
    this.nav.push(SettingsPage);
  }

  presentNotifications(myEvent) {
    console.log(myEvent);
    let popover = this.popoverCtrl.create(NotificationsPage);
    popover.present({
      ev: myEvent
    });
  }
  
}