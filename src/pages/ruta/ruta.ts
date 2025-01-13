// import { GuiaTuristicaPage } from './../guia-turistica/guia-turistica';
import { NavController, Events } from 'ionic-angular';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavParams, AlertController, Platform, Nav  } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
declare var google;

@IonicPage()
@Component({
  selector: 'page-ruta',
  templateUrl: 'ruta.html',
})
export class RutaPage {

  @ViewChild('map') mapElement: ElementRef;

  map:any;
  marker: any;
  lat: any;
  lng: any;
  distancia: any;
  imageYo:any;
  markerYo:any;
  confirm = this.alertCtrl.create({
    title: 'Error en la dirección',
    message: 'Se produjo un error al trazar la ruta hacia la ubicación escogida.',
    buttons: [
      {
        text: 'Volver',
        handler: () => {
          this.navCtrl.pop();  
        }
      }
    ]
  });
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public geolocation: Geolocation,
              private locationAccuracy: LocationAccuracy,
              public alertCtrl: AlertController,
              public platform: Platform,
              public nav: Nav, public events: Events) {
    this.lat = this.navParams.get('lat');
    this.lng = this.navParams.get('lng');
    if (this.platform.is('android')) {
      this.locationAccuracy.canRequest().then((canRequest: boolean) => {
        this
        if(canRequest) {
          // the accuracy option will be ignored by iOS
          this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
            () =>{this.initMap();},
            error => console.log('Error requesting location permissions', error)
          );
        }
      
      });
    }else{
      this.initMap();
    }
    
  }

  ionViewDidLoad() {
    // this.loadMap();
    // this.getPosition();
    
    // this.initMap();
  }
  // showPrompt() {
    
  // }
  /*------------------- funciona*/
  
  // loadMap(){
  //   this.geolocation.getCurrentPosition().then((position)=>{
  //   let latLng = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);

  //     let mapOptions = {
  //       center: latLng,
  //       zoom:16,
  //       mapTypeId: google.maps.MapTypeId.ROADMAP,
  //       streetViewControl: false,
  //       mapTypeControl:false
  //     }

  //     this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
  //     let ubicacion = new google.maps.LatLng(this.lat,this.lng);
  //     console.log(ubicacion);
  //     console.log(latLng);
  //     var marker1 = new google.maps.Marker({position: latLng, map: this.map});
  //     var infowindow1 = new google.maps.InfoWindow({
  //       content: '<h2 style="color:red;">Usted esta aqui</h2>'
  //     });
  //     marker1.addListener('click', function() {
  //       infowindow1.open(this.map, marker1);
  //     });
  //     var marker2 = new google.maps.Marker({icon:'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',position: ubicacion, map: this.map});
  //     var infowindow2 = new google.maps.InfoWindow({
  //       content: '<h2 >Ubicacion del evento</h2>'
  //     });
  //     marker2.addListener('click', function() {
  //       infowindow2.open(this.map, marker2);
  //     });
  //   }, (err) => {
  //     console.log(err);
  //   });
  // }

  /*------------------- funciona*/

  
  centrar(){
    // gMap.setCenter(new google.maps.LatLng(37.4419, -122.1419));
    this.initMap();
    // this.geolocation.getCurrentPosition().then((position)=>{
    //   this.map.setCenter({lat:position.coords.latitude,lng:position.coords.longitude});
    // });
  }


  initMap() {

    this.geolocation.getCurrentPosition().then((position)=>{
      // let latLng = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
      this.imageYo = {
        url: 'assets/icon/me.png',
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(40, 40)
      };
      var imageB = {
        url: 'assets/icon/meta.png',
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(0, 40),
        scaledSize: new google.maps.Size(40, 40)
      };
      var pointA = new google.maps.LatLng(position.coords.latitude,position.coords.longitude),
          pointB = new google.maps.LatLng(this.lat,this.lng),
          myOptions = {
              zoom: 7,
              center: pointA,
              streetViewControl:false,
              mapTypeControl: false,
              fullscreenControl:false
          };
      this.map = new google.maps.Map(this.mapElement.nativeElement, myOptions);
          // Instantiate a directions service.
      var  directionsService = new google.maps.DirectionsService,
          directionsDisplay = new google.maps.DirectionsRenderer({
              map: this.map,
              polylineOptions: {
                strokeColor: "#F48E28"
              }
          });
        this.markerYo = new google.maps.Marker({
              position: pointA,
              map: this.map,
              icon: this.imageYo,
          });
        var markerB = new google.maps.Marker({
              position: pointB,
              map: this.map,
              icon: imageB
          });
          directionsDisplay.addListener('directions_changed', function() {
            var result = directionsDisplay.getDirections();
            var total = 0;
            var myroute = result.routes[0];
            for (var i = 0; i < myroute.legs.length; i++) {
              total += myroute.legs[i].distance.value;
            }
            total = total / 1000;
            if (total>1) {
              total = total;
              console.log(total+' km');
              this.distancia =total+ ' km';
            } else {
              total = total*1000;
              this.distancia = total+ ' m';
              console.log(total+' m');
            }
            
            document.getElementById('distancia').innerText = this.distancia;
            // console.log(total);
          //  this.computeTotalDistance(directionsDisplay.getDirections());
          });
      // get route from A to B
      try {
        this.calculateAndDisplayRoute(directionsService, directionsDisplay, pointA, pointB, markerB);  
        setInterval(() => {
          this.markerYo.setMap(null);
          this.geolocation.getCurrentPosition().then((position)=>{
            var pointRA = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
            // markerA.setMap(null);
            this.markerYo = new google.maps.Marker({
              position: pointRA,
              map: this.map,
              icon: this.imageYo,
            });
            directionsService.route({
              origin: pointRA,
              destination: pointB,
              avoidTolls: true,
              avoidHighways: false,
              travelMode: google.maps.TravelMode.WALKING,
              
          },  (response, status) => {
            // console.log(status);
            // console.log(response);
              if (status == google.maps.DirectionsStatus.OK) {
                console.log('ok')
                  directionsDisplay.setDirections(response);
                  directionsDisplay.setOptions( { suppressMarkers: true } );
              } else {
                  // window.alert('Directions request failed due to ' + status);
                  console.log('mal')
                  this.confirm.present();
              }
          });
            // this.map.setCenter(pointA);
            // this.calculateAndDisplayRoute(directionsService, directionsDisplay, pointRA, pointB, markerB);  
          })
        },4000)
      } catch (error) {
        console.log(error);
      }
      
      // console.log('hola');
    }, (err) => {
      console.log('hola');
      
      console.log(err);
    });
  }



calculateAndDisplayRoute(directionsService, directionsDisplay, pointA, pointB, markerB) {
    directionsService.route({
        origin: pointA,
        destination: pointB,
        avoidTolls: true,
        avoidHighways: false,
        travelMode: google.maps.TravelMode.WALKING,
        
    },  (response, status) => {
      // console.log(status);
      // console.log(response);
        if (status == google.maps.DirectionsStatus.OK) {
          console.log('ok')
            directionsDisplay.setDirections(response);
            directionsDisplay.setOptions( { suppressMarkers: true } );
        } else {
            // window.alert('Directions request failed due to ' + status);
            console.log('mal')
            this.confirm.present();
        }
    });
    // if(status == 'ZERO_RESULT'){
    //   this.navCtrl.pop();
    // }
    
}

computeTotalDistance(result) {
  var total = 0;
  var myroute = result.routes[0];
  for (var i = 0; i < myroute.legs.length; i++) {
    total += myroute.legs[i].distance.value;
  }
  total = total / 1000;
  // document.getElementById('total').innerHTML = total + ' km';
  console.log(total);
}
regresar(){
  this.navCtrl.pop();
}

}
