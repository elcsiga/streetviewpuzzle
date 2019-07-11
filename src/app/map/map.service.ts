import { Injectable } from '@angular/core';
import loadGoogleMapsApi from 'load-google-maps-api';
import * as appConfig from '../../../app-config-private.json';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PanoView, PanoPos, PanoPov } from './common.js';

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

  currentPos$ = new BehaviorSubject<PanoPos>({
    lat: 37.869260,
    lng: -122.254811
  });

  currentPov$ = new BehaviorSubject<PanoPov>({
    heading: 165,
    pitch: 0
  });

  currentView$: Observable<PanoView> = combineLatest(
    this.currentPos$,
    this.currentPov$
  ).pipe(
    map(([position, pov]) => ({ position, pov, zoom: 1 }))
  );
}
