import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ServerProvider } from '../../providers/server/server';

/**
 * Generated class for the InfoConsejoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-info-consejo',
  templateUrl: 'info-consejo.html',
})
export class InfoConsejoPage {
  loader = this.loadingCtrl.create({
    content: '',
  });
  contenido: any;
  aux: any;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public server: ServerProvider,
              public loadingCtrl: LoadingController
  ) {
    this.loader.present().then(()=>{
      this.server.getMasInfo(1).then(data => {
        this.contenido = data['RES'];
        console.log(this.contenido);
        this.aux = this.contenido;
        var j = 0;
        for (let i = 0; i < this.contenido.length; i++) {
          console.log(i)
          console.log(this.contenido[i]['icono']);
          this.aux[j]['icono'] = this.contenido[i]['icono'];
          var texto = this.contenido[i]['texto'];
          var parser  = new DOMParser();
          var html = parser.parseFromString(texto,'text/html');
          this.aux[j]['texto'] = html.activeElement;
          console.log(this.aux[j]['texto']);
          console.log(html.activeElement);
          j++;
        }
        console.log(this.aux);
        this.loader.dismiss();
        // this.contenido.forEach(a => {
          
        //   this.server.getImageInfoAtractivo(a.id).then(dato => {
        //     this.imgInfo = dato['RES'];
        //     for (let index = 0; index < this.aux.length; index++) {
        //       for (let a = 0; a < this.imgInfo.length; a++) {
        //         if (this.aux[index]['id']==this.imgInfo[a]['id_guia']) {
        //           this.aux[index]['image'] = this.imgInfo;    
        //         }
        //       }
        //       if (this.imgInfo.length) {
        //         this.aux[index]['nimage'] = this.imgInfo.length;  
        //       }else {
        //         this.aux[index]['nimage'] = 0;
        //       }
              
        //     } 
        //   });  
        // });
      });
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InfoConsejoPage');
  }

}
