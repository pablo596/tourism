import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, Platform } from 'ionic-angular';
import { HomePage } from '../home/home';
import { StatusBar } from '@ionic-native/status-bar';

/**
 * Generated class for the LogoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-logo',
  templateUrl: 'logo.html',
})
export class LogoPage {

  splash = true;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public menu: MenuController,
              public statusBar: StatusBar,
              public platform: Platform) {
    this.menu.swipeEnable(false);
    this.platform.ready().then(() => {
      this.statusBar.backgroundColorByHexString('#fff'); 
    })
  }

  
  ionViewDidLoad(){
    let click = document.getElementById('click');
    
    setTimeout(() => {
    //   // this.splash = stop;
    click.classList.remove('nada');
    //   // this.sideMenu.style.display = 'flex';
    //   // this.navCtrl.setRoot(HomePage);
    }, 4000);
    
  }
  openApp(){
    this.navCtrl.setRoot(HomePage);
  }
}
