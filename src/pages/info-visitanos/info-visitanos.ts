import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServerProvider } from '../../providers/server/server';
import { InAppBrowser } from '@ionic-native/in-app-browser';

/**
 * Generated class for the InfoVisitanosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-info-visitanos',
  templateUrl: 'info-visitanos.html',
})
export class InfoVisitanosPage {

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public server: ServerProvider,
              private iab: InAppBrowser
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InfoVisitanosPage');
  }

  openlink(link){
    console.log(link);
    const browser = this.iab.create(link);

    // browser.executeScript(...);

    // browser.insertCSS(...);
    browser.on('loadstop').subscribe(event => {
      browser.insertCSS({ code: "body{color: red;" });
    });

    browser.close();
  }

}
