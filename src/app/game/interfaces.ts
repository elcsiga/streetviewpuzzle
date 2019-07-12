import { PanoView } from '../map/common';

export interface SimplePuzzle {
    startView: PanoView;
    title: string;
    question: string;
    answers: string[];
    author: string;
}
