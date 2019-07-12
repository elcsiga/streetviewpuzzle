import { Injectable } from '@angular/core';
import loadGoogleMapsApi from 'load-google-maps-api';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map, filter, take } from 'rxjs/operators';
import { PanoView, PanoPos, PanoPov } from 'functions/src/common/pano';
import { mapsApiKey } from 'functions/src/common/map';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private panorama;
  private googleMaps = new BehaviorSubject(null);
  googleMaps$ = this.googleMaps.pipe(
    filter(m => !!m)
  );

  constructor() { }

  init() {
    loadGoogleMapsApi({
      key: mapsApiKey
    }).then(googleMaps => {
      console.log('Maps API loaded...');
      this.googleMaps.next(googleMaps);
    }).catch(error => {
      console.error('Maps API loading failed!', error);
    })
  }

  private currentPos = new BehaviorSubject<PanoPos>({
    lat: 37.869260,
    lng: -122.254811
  });
  currentPos$ = this.currentPos.asObservable();
  setPos(pos: any) { this.currentPos.next({ lat: pos.lat(), lng: pos.lng() }) };

  private currentPov = new BehaviorSubject<PanoPov>({
    heading: 165,
    pitch: 0
  });
  currentPov$ = this.currentPov.asObservable();
  setPov(pov: any) { this.currentPov.next({ heading: pov.heading, pitch: pov.pitch }) };

  currentView$: Observable<PanoView> = combineLatest(
    this.currentPos$,
    this.currentPov$
  ).pipe(
    map(([position, pov]) => ({ position, pov, zoom: 1 }))
  );

  getCurrentViewSnapshot(): PanoView {
    let view: PanoView;
    this.currentView$.pipe(take(1)).subscribe(w => view = w);
    return view;
  }
}
