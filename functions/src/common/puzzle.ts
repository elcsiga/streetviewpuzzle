import { PanoView } from './pano';

export interface SimplePuzzle {
    startView: PanoView;
    title: string;
    question: string;
    answers: string[];
    author: string;
}
