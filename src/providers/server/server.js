var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/timeout';
var ServerProvider = /** @class */ (function () {
    function ServerProvider(http) {
        this.http = http;
        this.DOMAIN = 'http://localhost/';
        this.BASE_URL = this.DOMAIN + 'urbanapp/modelo/';
    }
    ServerProvider.prototype.getServer = function (url) {
        return this.http.get(url).timeout(10000).toPromise().then(function (Response) {
            return Response.json();
        }).catch(this.error);
    };
    ServerProvider.prototype.postServer = function (url, body) {
        var options = new RequestOptions({
            headers: new Headers({
                'Content-Type': 'application/x-www-form-urlendoced; charset=utf-8'
            })
        });
        return this.http.post(url, body, options).timeout(10000).toPromise().then(function (Response) { return Response.json(); }).catch(this.error);
    };
    ServerProvider.prototype.error = function (error) {
        return Promise.reject(error.message || error);
    };
    ServerProvider.prototype.getParroquias = function () {
        var url = this.BASE_URL + 'tomaParroquias.php';
        return this.getServer(url)
            .then(function (json) {
            return Promise.resolve(json);
        }).catch(this.error);
    };
    ServerProvider.prototype.getZonas = function (parroquia) {
        var url = this.BASE_URL + 'tomaZonas.php';
        var body = JSON.stringify({ parroquias: parroquia });
        ;
        return this.postServer(url, body)
            .then(function (json) {
            return Promise.resolve(json);
        }).catch(this.error);
    };
    ServerProvider.prototype.getSectores = function (parroquia, zona) {
        var url = this.BASE_URL + 'tomaSectores.php';
        var body = JSON.stringify({ parroquias: parroquia, zonas: zona });
        ;
        return this.postServer(url, body)
            .then(function (json) {
            return Promise.resolve(json);
        }).catch(this.error);
    };
    ServerProvider.prototype.getPredios = function (parroquia, zona, sector) {
        var url = this.BASE_URL + 'tomaPredios.php';
        var body = JSON.stringify({ parroquias: parroquia, zonas: zona, sectores: sector });
        ;
        return this.postServer(url, body)
            .then(function (json) {
            return Promise.resolve(json);
        }).catch(this.error);
    };
    ServerProvider.prototype.getUbicacion = function (clave) {
        var url = this.BASE_URL + 'tomaUbicacion.php';
        var body = JSON.stringify({ claves: clave });
        ;
        return this.postServer(url, body)
            .then(function (json) {
            return Promise.resolve(json);
        }).catch(this.error);
    };
    ServerProvider.prototype.getPersona = function (clave) {
        var url = this.BASE_URL + 'tomaPersonas.php';
        var body = JSON.stringify({ claves: clave });
        ;
        return this.postServer(url, body)
            .then(function (json) {
            return Promise.resolve(json);
        }).catch(this.error);
    };
    ServerProvider.prototype.getPersonaDatos = function (busca) {
        var url = this.BASE_URL + 'tomaPersonaDatos.php';
        var body = JSON.stringify({ buscar: busca });
        ;
        return this.postServer(url, body)
            .then(function (json) {
            return Promise.resolve(json);
        }).catch(this.error);
    };
    ServerProvider.prototype.getDireccion = function (busca) {
        var url = this.BASE_URL + 'tomaDirecciones.php';
        var body = JSON.stringify({ buscar: busca });
        ;
        return this.postServer(url, body)
            .then(function (json) {
            return Promise.resolve(json);
        }).catch(this.error);
    };
    ServerProvider.prototype.getBarrio = function (busca) {
        var url = this.BASE_URL + 'tomaBarrio.php';
        var body = JSON.stringify({ buscar: busca });
        ;
        return this.postServer(url, body)
            .then(function (json) {
            return Promise.resolve(json);
        }).catch(this.error);
    };
    ServerProvider.prototype.setDireccion = function (clave, nuevaCallePri, claveAnt, nuevaCalleSec, nuevaInter, nuevoBarrio, nuevaUrb) {
        var url = this.BASE_URL + 'actualizarCallePri.php';
        var body = JSON.stringify({ claves: clave, calle: nuevaCallePri, claveant: claveAnt, callesec: nuevaCalleSec, inter: nuevaInter, barrio: nuevoBarrio, urb: nuevaUrb });
        ;
        return this.postServer(url, body)
            .then(function (json) {
            return Promise.resolve(json);
        }).catch(this.error);
    };
    ServerProvider.prototype.setCarLote = function (clave, superficie, frente, perimetro, fondo) {
        var url = this.BASE_URL + 'actualizarCARLotes.php';
        var body = JSON.stringify({ claves: clave, superficies: superficie, frentes: frente, perimetros: perimetro, fondos: fondo });
        ;
        return this.postServer(url, body)
            .then(function (json) {
            return Promise.resolve(json);
        }).catch(this.error);
    };
    ServerProvider.prototype.getAlerta = function () {
        var url = this.BASE_URL + 'actualizarCallePri.php';
        return this.getServer(url)
            .then(function (json) {
            return Promise.resolve(json);
        }).catch(this.error);
    };
    ServerProvider.prototype.setPersonaNatural = function (cedula, nombres, tipdocu, estcivil, fecha, email, convencional, celular, direccion, segmento, discapacidad) {
        var url = this.BASE_URL + 'cargarPersonasNaturales.php';
        var body = JSON.stringify({ cedula: cedula, nombres: nombres, tipdocu: tipdocu, estcivil: estcivil, fecha: fecha, email: email, convencional: convencional, celular: celular, direccion: direccion, segmento: segmento, discapacidad: discapacidad });
        ;
        return this.postServer(url, body)
            .then(function (json) {
            return Promise.resolve(json);
        }).catch(this.error);
    };
    ServerProvider.prototype.setPersonaJuridica = function (ruc, razsocial, numregistro, inscrito, cedula, tipdocu, fecha, email, celular, convencional, direccion, discapacidad) {
        var url = this.BASE_URL + 'cargarPersonasJuridicas.php';
        var body = JSON.stringify({ ruc: ruc, razsocial: razsocial, numregistro: numregistro, inscrito: inscrito, cedula: cedula, tipdocu: tipdocu, fecha: fecha, email: email, celular: celular, convencional: convencional, direccion: direccion, discapacidad: discapacidad });
        ;
        return this.postServer(url, body)
            .then(function (json) {
            return Promise.resolve(json);
        }).catch(this.error);
    };
    ServerProvider.prototype.getAlternativas = function (id) {
        var url = this.BASE_URL + 'tomaAlternativas.php';
        var body = JSON.stringify({ id: id });
        ;
        return this.postServer(url, body)
            .then(function (json) {
            return Promise.resolve(json);
        }).catch(this.error);
    };
    ServerProvider.prototype.getCaractLote = function (claves) {
        var url = this.BASE_URL + 'tomaCaractLote.php';
        var body = JSON.stringify({ claves: claves });
        ;
        return this.postServer(url, body)
            .then(function (json) {
            return Promise.resolve(json);
        }).catch(this.error);
    };
    ServerProvider.prototype.getAlterSuelo = function (clave) {
        var url = this.BASE_URL + 'cargarAlterSuelo.php';
        var body = JSON.stringify({ claves: clave });
        ;
        return this.postServer(url, body)
            .then(function (json) {
            return Promise.resolve(json);
        }).catch(this.error);
    };
    ServerProvider.prototype.setAlterSuelo = function (clave, topo, terr, local, forma) {
        var url = this.BASE_URL + 'actualizarAlterSuelo.php';
        var body = JSON.stringify({ claves: clave, topografia: topo, terremoto: terr, localizacion: local, formas: forma });
        ;
        return this.postServer(url, body)
            .then(function (json) {
            return Promise.resolve(json);
        }).catch(this.error);
    };
    ServerProvider.prototype.getActSocioEco = function (clave) {
        var url = this.BASE_URL + 'tomaActSocioEco.php';
        var body = JSON.stringify({ claves: clave });
        ;
        return this.postServer(url, body)
            .then(function (json) {
            return Promise.resolve(json);
        }).catch(this.error);
    };
    ServerProvider.prototype.getDemografico = function (clave) {
        var url = this.BASE_URL + 'tomaDemograficos.php';
        var body = JSON.stringify({ claves: clave });
        ;
        return this.postServer(url, body)
            .then(function (json) {
            return Promise.resolve(json);
        }).catch(this.error);
    };
    ServerProvider.prototype.getConstruccion = function (clave) {
        var url = this.BASE_URL + 'tomaConstruccion.php';
        var body = JSON.stringify({ claves: clave });
        ;
        return this.postServer(url, body)
            .then(function (json) {
            return Promise.resolve(json);
        }).catch(this.error);
    };
    ServerProvider.prototype.getPrediosShape = function (parroquia, zona, sector) {
        var url = this.BASE_URL + 'tomaPrediosShape.php';
        var body = JSON.stringify({ parroquias: parroquia, zonas: zona, sectores: sector });
        ;
        return this.postServer(url, body)
            .then(function (json) {
            return Promise.resolve(json);
        }).catch(this.error);
    };
    ServerProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Http])
    ], ServerProvider);
    return ServerProvider;
}());
export { ServerProvider };
//# sourceMappingURL=server.js.map