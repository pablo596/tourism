import { Component, ViewChild } from "@angular/core";
import { Platform, Nav  } from "ionic-angular";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Keyboard } from '@ionic-native/keyboard';

import { LogoPage } from "../pages/logo/logo";
import { HomePage } from '../pages/home/home';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { ServerProvider } from '../providers/server/server';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
// import { TurismoPage } from "../pages/turismo/turismo";
import { ContenidoCompletoPage } from "../pages/contenido-completo/contenido-completo";
import { GuiaTuristicaPage } from "../pages/guia-turistica/guia-turistica";
import { Visor360Page } from '../pages/visor360/visor360';
import { PushnotificationsProvider } from '../providers/pushnotifications/pushnotifications';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
import { InformacionPage } from "../pages/informacion/informacion";

export interface MenuItem {
    title: string;
    component: any;
    icon: string;
}

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LogoPage;

  appMenuItems: Array<MenuItem>;
  information: any[];
  menu = new Array();
  submenu: any[];
  isSubMenu = false;
  SUB = false;
  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public keyboard: Keyboard,
    public server: ServerProvider,
    public http: Http,
    public push: PushnotificationsProvider,
    private screenOrientation: ScreenOrientation,
    private locationAccuracy: LocationAccuracy
  ) {
    console.log(this.screenOrientation.type); // logs the current orientation, example: 'landscape'

    // set to landscape
    
    this.initializeApp();
    if (this.platform.is('android')) {
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
      
      this.locationAccuracy.canRequest().then((canRequest: boolean) => {
        this
        if(canRequest) {
          // the accuracy option will be ignored by iOS
          this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
            () =>{console.log('Ya sale')},
            error => console.log('Error requesting location permissions', error)
          );
        }
      });
    }
  }

  

  cargarMenu(){
    this.server.getMenu().then(data => {
        this.menu = data['RES'];
        console.log(this.menu);
      });
  };
  cargarSubMenu(){
    this.server.getMenuCompleto().then(data => {
        this.submenu = data['RES'];
        for (let i = 0; i < this.submenu.length; i++) {
          if (!this.submenu[i]['id_submenu']) {
          }
        }
        console.log(this.submenu);
      });
  };
  initializeApp() {
    this.cargarMenu();
    this.cargarSubMenu();
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.

      //*** Control Splash Screen
      // this.splashScreen.show();
      // this.splashScreen.hide();

      //*** Control Status Bar
      // this.statusBar.styleDefault();
      this.statusBar.styleLightContent()
      this.statusBar.overlaysWebView(false);
      this.push.notifications();
      if(this.platform.is('ios')) {
        this.statusBar.backgroundColorByHexString('#F48E28');
      }
      //*** Control Keyboard
      this.keyboard.disableScroll(true);
    });
  }

  toggleSection(i) {
    console.log(i);
    this.menu[i].open = !this.menu[i].open;
    console.log(this.menu);
    // this.SUB = true;
  }
 
  toggleItem(i, j) {
    console.log(i);
    console.log(j);
    // this.submenu[i].children[j].open = !this.submenu[i].children[j].open;
  }

  openPage(menu,submenu,i,a,titulo) {
    console.log('menu: '+menu);
    console.log('submenu: '+submenu);
    console.log('i: '+i);
    console.log('a: '+a);
    console.log('titulo: '+titulo);
    for (let n = 0; n < this.menu.length; n++) {
      if (this.menu[n].open) {
        this.menu[i].open = !this.menu[i].open;
      }else{
      }
    }
    console.log(i);
    console.log(a);
    if (menu==7) {
      this.nav.push(GuiaTuristicaPage);
    } else if(menu==8){
      this.nav.push(InformacionPage);
    } else if(menu==13){
      this.nav.push(Visor360Page);
    } else{
      this.nav.push(ContenidoCompletoPage,{id:menu,id_submenu:submenu,titulo:titulo});  
    }
    
    console.log(titulo);
    
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    
    // this.nav.popToRoot()
  }

  // logout() {
  //   this.nav.setRoot(HomePage);
  // }
  irInicio(){
    this.nav.setRoot(HomePage);
  }
  

}
