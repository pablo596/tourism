import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';
import { ServerProvider } from '../../providers/server/server';
import { GalleryModal } from 'ionic-gallery-modal';

/**
 * Generated class for the PhotosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-photos',
  templateUrl: 'photos.html',
})
export class PhotosPage {
  imagesResize:any[] = [];
  images:any[] = [];
  loader = this.loadingCtrl.create({
    content: '',
  });
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public server: ServerProvider,
              public loadingCtrl: LoadingController,
              public modalCtrl: ModalController
  ) {
    this.loader.present().then(()=>{
      this.server.getFotos().then((dato) =>{
        var data = dato.RES;
        for (let i = 0; i < (dato.RES).length; i++) {
          this.imagesResize.push({
            url:this.server.DOMAINIMG+'/archivos/toma/'+data[i]['nombre']+'/350x200'
          });
          this.images.push({
            url:this.server.DOMAINIMG+'/archivos/toma/'+data[i]['nombre']+''
          });
        }
      })
    });
  }
  ionViewDidLoad() {
    this.loader.dismiss();
  }
  // ionViewWillEnter(){
  
  // }
  verImagen(image,i){
    let modal = this.modalCtrl.create(GalleryModal, {
      photos: this.images,
      initialSlide: i
    });
    modal.present();
    // this.photoViewer.show(this.server.DOMAINIMG+'/archivos/toma/'+image);
  }
}