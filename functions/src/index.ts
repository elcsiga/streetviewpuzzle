import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { SimplePuzzle } from '../../src/app/game/interfaces';

admin.initializeApp();

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const createThumbnail = functions.region('europe-west1').firestore
    .document('puzzles/{puzzleId}')
    .onCreate((doc, context) => {
        console.log('createThumbnail runs');
        const puzzleId = context.params.puzzleId;
        const puzzle = doc.data() as SimplePuzzle;

        console.log('puzzle', puzzle);
        console.log('puzzleId', puzzleId);

        return doc.ref.set({
            title: puzzle.title + 'x',
            thumbnail: puzzleId
        }, { merge: true });
    });
