import { PanoView } from './pano';
import { PublicUser } from './auth';

export interface SimplePuzzle {
    startView: PanoView;
    title: string;
    question: string;
    answers: string[];
    thumbnail: string;
    author: {
        uid: string;
        publicUser: PublicUser | null
    } 

}
