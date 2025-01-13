
import { Vista360Page } from './../pages/vista360/vista360';
import {NgModule} from "@angular/core";
import {IonicApp, IonicModule} from "ionic-angular";
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {IonicStorageModule} from '@ionic/storage';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {Keyboard} from '@ionic-native/keyboard';

import {ActivityService} from "../services/activity-service";
import {TripService} from "../services/trip-service";
import {WeatherProvider} from "../services/weather";
import { HttpModule } from '@angular/http';
import {MyApp} from "./app.component";

import {SettingsPage} from "../pages/settings/settings";
import {CheckoutTripPage} from "../pages/checkout-trip/checkout-trip";
import {HomePage} from "../pages/home/home";
import {LoginPage} from "../pages/login/login";
import {NotificationsPage} from "../pages/notifications/notifications";
import {RegisterPage} from "../pages/register/register";
import {SearchLocationPage} from "../pages/search-location/search-location";
import {TripDetailPage} from "../pages/trip-detail/trip-detail";
import {TripsPage} from "../pages/trips/trips";
import {LocalWeatherPage} from "../pages/local-weather/local-weather";
import { LocationAccuracy } from '@ionic-native/location-accuracy';
import { OpenNativeSettings } from '@ionic-native/open-native-settings/ngx';
import { CallNumber } from '@ionic-native/call-number';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';
import { OneSignal } from '@ionic-native/onesignal';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import * as ionicGalleryModal from 'ionic-gallery-modal';
import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';

import { LogoPage } from "../pages/logo/logo";
import { TurismoPage } from "../pages/turismo/turismo";
import { Geolocation } from '@ionic-native/geolocation';
import { NativePageTransitions } from '@ionic-native/native-page-transitions'; 
import { ServerProvider } from '../providers/server/server';
import { ContenidoPage } from '../pages/contenido/contenido';
import { ContenidoCompletoPage } from '../pages/contenido-completo/contenido-completo';
import { RutaPage } from '../pages/ruta/ruta';
import { GuiaTuristicaPage } from "../pages/guia-turistica/guia-turistica";
import { VerMasPage } from '../pages/ver-mas/ver-mas';
import { Visor360Page } from "../pages/visor360/visor360";
import { VideosPage } from '../pages/videos/videos';
import { PushnotificationsProvider } from '../providers/pushnotifications/pushnotifications';
import { AtractivosPage } from '../pages/atractivos/atractivos';
import { AtractivoContenidoPage } from '../pages/atractivo-contenido/atractivo-contenido';
import { InformacionPage } from '../pages/informacion/informacion';
import { InfoConsejoPage } from '../pages/info-consejo/info-consejo';
import { InfoEmergenciaPage } from '../pages/info-emergencia/info-emergencia';
import { InfoVisitanosPage } from '../pages/info-visitanos/info-visitanos';
import { GaleriaPage } from '../pages/galeria/galeria';
import { PhotosPage } from '../pages/photos/photos';

@NgModule({
  declarations: [
    MyApp,
    SettingsPage,
    CheckoutTripPage,
    HomePage,
    LoginPage,
    TurismoPage,
    ContenidoPage,
    ContenidoCompletoPage,
    RutaPage,
    GuiaTuristicaPage,
    LocalWeatherPage,
    NotificationsPage,
    RegisterPage,
    SearchLocationPage,
    TripDetailPage,
    TripsPage,
    LogoPage,
    VerMasPage,
    Visor360Page,
    VideosPage,
    Vista360Page,
    AtractivoContenidoPage,
    AtractivosPage,
    InformacionPage,
    InfoConsejoPage,
    InfoEmergenciaPage,
    InfoVisitanosPage,
    GaleriaPage,
    PhotosPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    ionicGalleryModal.GalleryModalModule,
    IonicModule.forRoot(MyApp, {
      scrollPadding: false,
      scrollAssist: true,
      autoFocusAssist: false,
      backButtonText: 'Inicio'
    }),
    IonicStorageModule.forRoot({
      name: '__ionic3_start_theme',
        driverOrder: ['indexeddb', 'sqlite', 'websql']
    }),
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SettingsPage,
    CheckoutTripPage,
    HomePage,
    LoginPage,
    LogoPage,
    TurismoPage,
    ContenidoPage,
    ContenidoCompletoPage,
    RutaPage,
    GuiaTuristicaPage,
    LocalWeatherPage,
    NotificationsPage,
    RegisterPage,
    SearchLocationPage,
    TripDetailPage,
    TripsPage,
    VerMasPage,
    Visor360Page,
    VideosPage,
    Vista360Page,
    AtractivoContenidoPage,
    AtractivosPage,
    InformacionPage,
    InfoConsejoPage,
    InfoEmergenciaPage,
    InfoVisitanosPage,
    GaleriaPage,
    PhotosPage
  ],
  providers: [
    YoutubeVideoPlayer,
    CallNumber,
    LocationAccuracy,
    OpenNativeSettings,
    StatusBar,
    ServerProvider,
    SplashScreen,
    Keyboard,
    ActivityService,
    TripService,
    WeatherProvider,
    Geolocation,
    NativePageTransitions,
    OneSignal,
    PushnotificationsProvider,
    ScreenOrientation,
    InAppBrowser,
    PhotoViewer,
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: ionicGalleryModal.GalleryModalHammerConfig,
    }
  ]
})

export class AppModule {
}
