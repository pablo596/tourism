import { Injectable } from '@angular/core';
import { OneSignal } from '@ionic-native/onesignal';
import { Platform, Events} from "ionic-angular";

@Injectable()
export class PushnotificationsProvider {

  constructor(private oneSignal: OneSignal,
              public platform: Platform,
              public events: Events) {
    console.log('Hello PushnotificationsProvider Provider');
  }

  notifications(){
    console.log('funcion de notificacion');
    if (this.platform.is('cordova')) {
      this.oneSignal.startInit('bc8ff245-ceb0-42ad-b331-cb8e52840dd8', '143603766421');

      this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);

      this.oneSignal.handleNotificationReceived().subscribe(() => {
      // do something when notification is received
      console.log('notificacion recibida')
      });

      this.oneSignal.handleNotificationOpened().subscribe(  data => {
        // do something when a notification is opened
        console.log('notificacion abierta' + JSON.stringify (data)); 
        console.log( "tipo: "+ data["notification"]["payload"]["additionalData"]["id_contenido"])
        /* let id_contenido:any = data["notification"]["payload"]["additionalData"["id_contenido"]];
        let id:any = data["notification"]["payload"]["additionalData"["id"]]; */

      /*   if (id_contenido == 1) {
          this.app.getActiveNav().push(ShownewsPage, {idNew: id});
        } else if (id_contenido == 2) {
          this.app.getActiveNav().push(ShoweventsPage, { idEve: id });
        }
        else if (id_contenido == 3) {
        } */
        console.log('notificacion abierta');
        console.log('notificacion abierta' + JSON.stringify (data));
        console.log( "tipo: "+ data["notification"]["payload"]["additionalData"]["id_contenido"])
        let titulo:any = data["notification"]["payload"]["additionalData"]["titulo"];
        let id_contenido:any = data["notification"]["payload"]["additionalData"]["id_contenido"];
        let menu:any = data["notification"]["payload"]["additionalData"]["menu"];
        let submenu:any = data["notification"]["payload"]["additionalData"]["submenu"];
        let tipo:any = data["notification"]["payload"]["additionalData"]["tipo"];
        let categoria:any = data["notification"]["payload"]["additionalData"]["categoria"];
        // let id:any = data["notification"]["payload"]["additionalData"]["id"];
        // let id_verificacion:any = data["notification"]["payload"]["additionalData"]["id_verificacion"];
        this.events.publish('notification:created', titulo, id_contenido,menu,submenu,tipo,categoria ); 

      });

      this.oneSignal.endInit();
    } else {
      console.log('va todo bien');
    }
    
  }
  
}
