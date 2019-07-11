export interface PanoPos {
    lat: number;
    lng: number;
}

export interface PanoPov {
    heading: number; 
    pitch: number;
}

export interface PanoView {
    position: PanoPos;
    pov: PanoPov;
    zoom: number;
}