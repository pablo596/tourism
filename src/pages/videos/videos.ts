import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController,Platform } from 'ionic-angular';
import { SafeResourceUrl, DomSanitizer  } from "@angular/platform-browser"
import { ServerProvider } from '../../providers/server/server'; 
import { ScreenOrientation } from '@ionic-native/screen-orientation';
/**
 * Generated class for the VideosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-videos',
  templateUrl: 'videos.html',
})
export class VideosPage {
  
  // vid = 'https://www.youtube.com/embed/wkQ_eGqalVw';
  trustedVideoUrl: SafeResourceUrl = [];
  loading: Loading;
  id:any;
  nvideo:any = [];
  video: any = [];
  loader = this.loadingCtrl.create({
    content: '',
  });
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private dom: DomSanitizer,
              public loadingCtrl: LoadingController,
              private server: ServerProvider,
              public platform: Platform,
              private screenOrientation: ScreenOrientation) {
    this.id = this.navParams.get('id');
    console.log(this.id);
    this.loader.present().then(()=>{
      this.server.getVideos().then(res =>{
        console.log(res.RES);
        this.nvideo = res.RES;
        this.loader.dismiss();
      })
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VideosPage');
    if (this.platform.is('android')) {
      this.screenOrientation.unlock();
    }
    // this.screenOrientation.onChange().subscribe(
    //   value => alert('Orientation changed'),
    //   error => alert('Changed error: ' + error),
    //   () => alert('Done')
    // )
  }
  ionViewWillEnter(): void {
    console.log(this.id);
    this.server.getVideos().then(res =>{
      var data = res.RES;
      console.log(data);
      for (let i = 0; i < data.length; i++) {
        console.log(data[i]['enlace'])
        this.video[i] = 'https://www.youtube.com/embed/'+data[i]['enlace'];
        this.trustedVideoUrl[i] = this.dom.bypassSecurityTrustResourceUrl(this.video[i]);
      }
      console.log(this.trustedVideoUrl);
      this.loading = this.loadingCtrl.create({
          // content: 'Cargando...'
      });

      this.loading.present();
      this.loader.dismiss();
      // 'https://www.youtube.com/embed/'
    })
    console.log(this.video);
    console.log(this.video[0])
    console.log('aqui')
    
  }    
  handleIFrameLoadEvent(): void {
    this.loading.dismiss();
  }
  
}
