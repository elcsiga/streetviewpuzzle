import { Injectable } from '@angular/core';
import loadGoogleMapsApi from 'load-google-maps-api';
import * as appConfig from '../../../../app-config-private.json';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private panorama;
  googleMaps$ = new BehaviorSubject(null);

  constructor() { }

  init() {
    loadGoogleMapsApi({
      key: appConfig.maps.apiKey
    }).then(googleMaps => {
      console.log('Maps API loaded...');
      this.googleMaps$.next(googleMaps);
    }).catch(function (error) {
      console.error('Maps API loading failed!', error);
    })
  }
}
