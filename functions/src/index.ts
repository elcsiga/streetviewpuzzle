import * as functions from 'firebase-functions';

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const helloWorld = functions.region('europe-west1').https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
});

export const createThumbnail = functions.region('europe-west1').firestore
  .document('puzzles/{puzzleId}')
  .onCreate((doc, context) => {
    const puzzleId = context.params.puzzleId;
    const puzzle = doc.data();

    return doc.ref.set({
        thumbnail: puzzleId
    }, { merge: true })
    
  );
