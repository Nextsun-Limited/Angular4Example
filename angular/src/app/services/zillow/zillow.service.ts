import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { environment } from '../../../environments/environment';
const env = environment.localhost;

@Injectable()
export class ZillowService {

  constructor(private http: Http) { }

  GetZestimate(zpid, rentzestimate) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(env + '/zillow/GetZestimate', {zpid, rentzestimate}, {headers}).map(res => res.json());
  }

  GetSearchResults(address, citystatezip, rentzestimate) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(env + '/zillow/GetSearchResults', {address, citystatezip, rentzestimate}, {headers}).map(res => res.json());
  }

  GetChart(zpid, unitType, width, height, chartDuration) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(env + '/zillow/GetChart', {zpid, unitType, width, height, chartDuration}, {headers}).map(res => res.json());
  }

  GetComps(zpid, count, rentzestimate) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(env + '/zillow/GetComps', {zpid, count, rentzestimate}, {headers}).map(res => res.json());
  }

  GetDeepComps(zpid, count, rentzestimate) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(env + '/zillow/GetDeepComps', {zpid, count, rentzestimate}, {headers}).map(res => res.json());
  }

  GetDeepSearchResults(address, citystatezip, rentzestimate) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(env + '/zillow/GetDeepSearchResults', {address, citystatezip, rentzestimate}, {headers}).map(res => res.json());
  }

  GetUpdatedPropertyDetails(zpid) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(env + '/zillow/GetUpdatedPropertyDetails', {zpid}, {headers}).map(res => res.json());
  }
}
