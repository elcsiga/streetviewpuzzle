export interface PanoView {
    position: {
        lat: number;
        lng: number;
    },
    pov: {
        heading: number; 
        pitch: number;
    }
    zoom: number;
}