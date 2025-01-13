import { Component,ViewChild,ElementRef,Input } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import 'pannellum/build/pannellum.js';
import { ServerProvider } from '../../providers/server/server';

/**
 * Generated class for the Vista360Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var pannellum: any;
declare var window: any;

@IonicPage()
@Component({
  selector: 'page-vista360',
  templateUrl: 'vista360.html',
})
export class Vista360Page {
  @ViewChild('container') container: ElementRef;
  @Input() options: Object;
  viewer: any;
  id: string;
  img360:any;
  titulo:any;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private server: ServerProvider) {
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad Vista360Page');
  }
  ngAfterViewInit() {
    
  }
  ngOnInit(): void {
    this.titulo = this.navParams.get('lugar');
    console.log(this.titulo);
    this.img360 = this.navParams.get('nombre');
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    console.log('cargq');
    console.log(this.container);
    console.log('in ngOnInit() Image URL::::===>' + this.img360);
    const defaultOptions = {
      "type": "equirectangular",
      "panorama": this.server.DOMAINIMG+'archivos/toma/'+this.img360,
      "autoLoad": true,
      "showZoomCtrl": false,
      "autoRotate": 1.5,
      "showFullscreenCtrl": true,
      "crossOrigin": "anonymous"
    };
    const combinedOptions = Object.assign({}, defaultOptions, this.options);
    this.viewer = pannellum.viewer(this.container.nativeElement, combinedOptions);
  }
}
