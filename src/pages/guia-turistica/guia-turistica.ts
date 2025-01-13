import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, FabContainer, ActionSheetController  } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { ServerProvider } from '../../providers/server/server';
import { VerMasPage } from '../ver-mas/ver-mas';
import { RutaPage } from '../ruta/ruta';
import { CallNumber } from '@ionic-native/call-number';
import { LocationAccuracy } from '@ionic-native/location-accuracy';

declare var google;

@IonicPage()
@Component({
  selector: 'page-guia-turistica',
  templateUrl: 'guia-turistica.html',
})
export class GuiaTuristicaPage {
  @ViewChild('map') mapElement: ElementRef;

  map:any;
  loader = this.loadingCtrl.create({
    content: '',
  });
  markerOptions: any;
  categorias: any = [];
  markers: any = [];
  tipo:any;
  markerYo:any;
  imageYo:any;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public geolocation: Geolocation,
              public server: ServerProvider,
              public loadingCtrl: LoadingController,
              public actionSheetCtrl: ActionSheetController,
              private callNumber: CallNumber,
              private locationAccuracy: LocationAccuracy) {
  this.tipo = this.navParams.get('tipo');
  console.log(this.tipo);
  this.loader.present().then(()=>{
    this.locationAccuracy.canRequest().then((canRequest: boolean) => {

      if(canRequest) {
        // the accuracy option will be ignored by iOS
        this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
          () =>{this.loadMap();},
          error => console.log('Error requesting location permissions', error)
        );
      }
    
    });
    
    this.server.getGuiaCategorias().then(data => {
      this.categorias = data['RES'];
      this.loader.dismiss();
    });
  });

  }

  actionSheet(title,id,lat,lng,telf) {
    if (telf!=null) {
      let actionSheet = this.actionSheetCtrl.create({
        title: title,
        cssClass: 'action-sheets-basic-page',  
        buttons: [
          {
            text: 'Ver Mas',
            cssClass: 'botton',
            handler: () => {
              console.log('este es el id = '+id);
              this.verMas(title,id);
            }
          },
          {
            text: 'LLamar '+telf,
            icon: 'call',
            cssClass: 'botton',
            handler: () => {
              console.log('este es el id = '+id);
              this.llamar(telf);
            }
          },
          {
            text: 'Como llegar',
            icon: 'navigate',
            cssClass: 'botton',
            handler: () => {
              this.navCtrl.push(RutaPage,{lat:lat,lng:lng});
            }
          },
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          }
        ]
      });  
      actionSheet.present();
    } else {
      let actionSheet = this.actionSheetCtrl.create({
        title: title,
        cssClass: 'action-sheets-basic-page',
        buttons: [
          {
            text: 'Ver Mas',
            // role: 'destructive',
            handler: () => {
              console.log('este es el id = '+id);
              this.verMas(title,id);
            }
          },
          {
            text: 'Como llegar',
            icon: 'navigate',
            handler: () => {
              this.navCtrl.push(RutaPage,{lat:lat,lng:lng});
            }
          },
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          }
        ]
      });
      actionSheet.present();
    }
    
 
    
  }

  centrar(){
    // gMap.setCenter(new google.maps.LatLng(37.4419, -122.1419));
    this.markerYo.setMap(null);
    this.geolocation.getCurrentPosition().then((position)=>{
      let latLng = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
      this.map.setCenter({lat:position.coords.latitude,lng:position.coords.longitude});
      this.markerYo = new google.maps.Marker({
        position: latLng,
        map: this.map,
        animation: google.maps.Animation.DROP,
        icon: this.imageYo
      });
    });
  }
  ionViewDidLoad() {
    this.loadMap();
    // this.tomarTodaCategoria();
    // this.server.getGuiaCategorias().then(data => {
    //   console.log(data);
    // });
  }

  verMas(title,id){
    this.navCtrl.push(VerMasPage,{title:title,id:id});
  }
  llamar(telf){
    this.callNumber.callNumber(telf, true)
    .then(res => {console.log('Launched dialer!', res);console.log('then')})
    .catch(err => console.log(JSON.stringify(err)));
  }

  /*------------------- funciona*/
  
 

  loadMap(){
    this.geolocation.getCurrentPosition().then((position)=>{
    let latLng = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
      // console.log(latLng);
      let mapOptions = {
        center: latLng,
        zoom:16,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        disableDefaultUI: true
      }

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      this.imageYo = {
        url: 'assets/icon/me.png',
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(40, 40)
      };
      this.markerYo = new google.maps.Marker({
        position: latLng,
        map: this.map,
        animation: google.maps.Animation.DROP,
        icon: this.imageYo
      });
    });
  }

  tomarTodaCategoria(){
    this.server.getGuiaCategoriasFull().then(data => {
      this.markers = data['RES'];
      console.log(this.markers);
      this.markers.forEach(marker => {
        if (marker.lat) {
          var latLng = {position:{latitude: marker.lat, longitude: marker.lng},icon:marker.pin,titulo:marker.titulo,id:marker.id,telf:marker.telefono};
          // var latLng = {
          //   position:{
          //     latitude: -1.038749,
          //     longitude: -80.473897,
          //   },
          //   id:'1'
          // }
          this.addMarker(latLng)  ;
        }
      });
    })
  }

  addMarker(options){
    // let latLng = new google.maps.LatLng(-1.0396448,-80.4729474);
    // console.log(options);
    var image = {
      url: this.server.DOMAINIMG+'/archivos/toma/'+options.icon,
      size: new google.maps.Size(71, 71),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(50, 50)
    };
    this.markerOptions = new google.maps.Marker({
      position: new google.maps.LatLng(options.position.latitude, options.position.longitude),
      title: options.titulo,
      map: this.map,
      animation: google.maps.Animation.DROP,
      icon:image
      
    })
    this.markers.push(this.markerOptions);
    this.addInfoWindow(this.markerOptions,options);
  }
  addInfoWindow(marker,options){
    google.maps.event.addListener(marker,'click',()=>{
      // infoWindow.open(this.map,marker);
      this.actionSheet(options.titulo,options.id,options.position.latitude, options.position.longitude,options.telf);
      // this.irFormulario(content)
    });
  }
  
  

  /*------------------- funciona*/
  
  setMapOnAll(map) {
    
    if (this.markerOptions) {
      // this.markerOptions.setMap(null);
      // this.markerOptions.forEach(mar => {
      //   console.log(mar);
      // });
      // console.log(this.markerOptions.length);
      for (var i = 0; i < this.markers.length; i++) {
        // console.log(this.markerOptions.length)
        this.markers[i].setMap(map);
      } 
    }
  }

  clearMarkers() {
    this.setMapOnAll(null);
    // this.markerOptions.setMap(null);
  }

  tomarLugares(id){
    this.clearMarkers();
    console.log(id);
    var marcador = [];
    this.server.getGuiaCategoriasId(id).then(data => {
      marcador= data.RES;
      console.log(marcador);
      marcador.forEach(lug => {
        // console.log(lug.lat)
        // console.log(lug.lng)
        var latLng = {position:{latitude: lug.lat, longitude: lug.lng},icon:lug.pin,titulo:lug.titulo,id:lug.id,telf:lug.telefono};
          // var latLng = {
          //   position:{
          //     latitude: -1.038749,
          //     longitude: -80.473897,
          //   },
          //   id:'1'
          // }
          this.addMarker(latLng)  ;
      });
    });
  }

  lugares(event,fab:FabContainer,id){
    this.loadMap();
      this.server.getGuiaCategoriasId(id).then(data => {
        this.markers = data['RES'];
        this.markers.forEach(marker => {
          if (marker.lat) {
            var latLng = {position:{latitude: marker.lat, longitude: marker.lng},icon:marker.url,titulo:marker.titulo,id:marker.id,telf:marker.telefono};
            this.addMarker(latLng)  ;
          }
        });
      })
    fab.close();  
  }
}
