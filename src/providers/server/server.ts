import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions } from "@angular/http";
import "rxjs/add/operator/toPromise";
import "rxjs/add/operator/timeout";

@Injectable()
export class ServerProvider {
  // DOMAIN = 'http://172.23.212.190:8000/'
  // public DOMAINIMG = 'http://172.23.212.190:8001/'
  DOMAIN = "http://192.168.1.147:8000/";
  public DOMAINIMG = "http://192.168.1.147:8001/";
  BASE_URL = this.DOMAIN + "/toma/";

  constructor(public http: Http) {}

  private getServer(url: string) {
    return this.http
      .get(url)
      .timeout(10000)
      .toPromise()
      .then((Response) => {
        return Response.json();
      })
      .catch(this.error);
    // this.http.get(url).map(res => res.json()).subscribe(data => {});
  }

  private postServer(url: string, body: any) {
    let options = new RequestOptions({
      headers: new Headers({
        "Content-Type": "application/x-www-form-urlendoced; charset=utf-8",
      }),
    });

    return this.http
      .post(url, body, options)
      .timeout(10000)
      .toPromise()
      .then((Response) => Response.json())
      .catch(this.error);
  }

  private error(error: any) {
    return Promise.reject(error.message || error);
  }

  public getMenu() {
    let url = this.BASE_URL + "menu";
    return this.getServer(url)
      .then((json) => {
        return Promise.resolve(json);
      })
      .catch(this.error);
  }

  public getMenuCompleto() {
    let url = this.BASE_URL + "menu/completo";
    // let body = JSON.stringify({ parroquias : parroquia });;

    return this.getServer(url)
      .then((json) => {
        return Promise.resolve(json);
      })
      .catch(this.error);
  }

  public getMenuId() {
    let url = this.BASE_URL + "menu/completo";
    // let body = JSON.stringify({ parroquias : parroquia });;

    return this.getServer(url)
      .then((json) => {
        return Promise.resolve(json);
      })
      .catch(this.error);
  }

  public getContenido(menu, submenu) {
    let url = this.BASE_URL + "contenido/" + menu + "/" + submenu;
    // let body = JSON.stringify({ parroquias : parroquia });;

    return this.getServer(url)
      .then((json) => {
        return Promise.resolve(json);
      })
      .catch(this.error);
  }
  public getAtractivoContenido(tipo) {
    let url = this.BASE_URL + "contenido-atractivo/" + tipo;
    // let body = JSON.stringify({ parroquias : parroquia });;

    return this.getServer(url)
      .then((json) => {
        return Promise.resolve(json);
      })
      .catch(this.error);
  }

  public getContenidoId(id) {
    let url = this.BASE_URL + "contenido/" + id;
    // let body = JSON.stringify({ parroquias : parroquia });;

    return this.getServer(url)
      .then((json) => {
        return Promise.resolve(json);
      })
      .catch(this.error);
  }

  public getImageInfo(id) {
    let url = this.BASE_URL + "imagenes/" + id;
    // let body = JSON.stringify({ parroquias : parroquia });;

    return this.getServer(url)
      .then((json) => {
        return Promise.resolve(json);
      })
      .catch(this.error);
  }

  public getImageInfoAtractivo(id) {
    let url = this.BASE_URL + "guia/imagenes/" + id;
    // let body = JSON.stringify({ parroquias : parroquia });;

    return this.getServer(url)
      .then((json) => {
        return Promise.resolve(json);
      })
      .catch(this.error);
  }

  public getImage360() {
    let url = this.BASE_URL + "visor360/toma-imagenes";
    // let body = JSON.stringify({ parroquias : parroquia });;

    return this.getServer(url)
      .then((json) => {
        return Promise.resolve(json);
      })
      .catch(this.error);
  }

  public getFotos() {
    let url = this.BASE_URL + "fotos/toma-imagenes";
    // let body = JSON.stringify({ parroquias : parroquia });;

    return this.getServer(url)
      .then((json) => {
        return Promise.resolve(json);
      })
      .catch(this.error);
  }

  public getGuiaCategorias() {
    let url = this.BASE_URL + "guia/categorias";
    // let body = JSON.stringify({ parroquias : parroquia });;

    return this.getServer(url)
      .then((json) => {
        return Promise.resolve(json);
      })
      .catch(this.error);
  }

  public getGuiaCategoriasFull() {
    let url = this.BASE_URL + "guia";
    // let body = JSON.stringify({ parroquias : parroquia });;

    return this.getServer(url)
      .then((json) => {
        return Promise.resolve(json);
      })
      .catch(this.error);
  }

  public getGuiaCategoriasId(id) {
    let url = this.BASE_URL + "guia/" + id;
    // let body = JSON.stringify({ parroquias : parroquia });;

    return this.getServer(url)
      .then((json) => {
        return Promise.resolve(json);
      })
      .catch(this.error);
  }

  public getVideoContenido(id) {
    let url = this.BASE_URL + "videos/" + id;
    // let body = JSON.stringify({ parroquias : parroquia });;

    return this.getServer(url)
      .then((json) => {
        return Promise.resolve(json);
      })
      .catch(this.error);
  }
  public getVideos() {
    let url = this.BASE_URL + "videosfull";
    // let body = JSON.stringify({ parroquias : parroquia });;

    return this.getServer(url)
      .then((json) => {
        return Promise.resolve(json);
      })
      .catch(this.error);
  }
  public getGuiaId(id) {
    let url = this.BASE_URL + "guia/detalle/" + id;
    // let body = JSON.stringify({ parroquias : parroquia });;

    return this.getServer(url)
      .then((json) => {
        return Promise.resolve(json);
      })
      .catch(this.error);
  }

  public setDireccion(
    clave,
    nuevaCallePri,
    claveAnt,
    nuevaCalleSec,
    nuevaInter,
    nuevoBarrio,
    nuevaUrb
  ) {
    let url = this.BASE_URL + "actualizarCallePri.php";
    let body = JSON.stringify({
      claves: clave,
      calle: nuevaCallePri,
      claveant: claveAnt,
      callesec: nuevaCalleSec,
      inter: nuevaInter,
      barrio: nuevoBarrio,
      urb: nuevaUrb,
    });

    return this.postServer(url, body)
      .then((json) => {
        return Promise.resolve(json);
      })
      .catch(this.error);
  }

  public getMasInfo(tipo) {
    let url = this.BASE_URL + "masInformacion/getMasInfo/" + tipo;

    return this.getServer(url)
      .then((json) => {
        return Promise.resolve(json);
      })
      .catch(this.error);
  }
}
