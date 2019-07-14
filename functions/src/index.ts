import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as https from 'https';
import { SimplePuzzle } from './common/puzzle';
import { mapsApiKey } from './common/map';

admin.initializeApp();

export const createThumbnail = functions.region('europe-west1').firestore
    .document('puzzles/{puzzleId}')
    .onCreate(async (doc, context) => {
        const puzzleId = context.params.puzzleId;
        const puzzle = doc.data() as SimplePuzzle;

        console.log('Creating thumbnail for ', puzzleId);

        const pos = puzzle.startView.position;
        const pov = puzzle.startView.pov;
        const fov = 90;
        const width = 600;
        const height = 200;

        const streetviewApiUrl = 'https://maps.googleapis.com/maps/api/streetview'
            + `?size=${width}x${height}`
            + `&location=${pos.lat},${pos.lng}`
            + `&fov=${fov}`
            + `&heading=${pov.heading}&pitch=${pov.pitch}`
            + `&key=${mapsApiKey}`;

        const file = admin.storage().bucket().file(puzzleId);
        await new Promise((resolve, reject) => {
            https.get(streetviewApiUrl, response => response.pipe(file.createWriteStream()))
                .on('finish', () => {
                    console.log('Thumbnail created for ', puzzleId);
                    resolve();
                })
                .on('error', (e) => {
                    console.error('Error while uploading thumbnail for ', puzzleId);
                    reject();
                });
        });

        const fileUrl = `https://firebasestorage.googleapis.com/v0/b/streetviewpuzzle.appspot.com/o/${puzzleId}?alt=media`;
        console.log('Thumbnail url: ', fileUrl);

        await doc.ref.set({
            thumbnail: fileUrl
        }, { merge: true });
    });

export const createUser = functions.auth.user().onCreate( authUser => {
    const userRecord = {
        // TODO workaround, see https://github.com/firebase/firebase-functions/issues/270#issuecomment-457759775
        authUser: JSON.parse(JSON.stringify(authUser.toJSON()))
    }
    const uid = authUser.uid;

    console.log('Storinh user to db:', userRecord);

    return admin.firestore().collection('users').doc(uid).set(userRecord)
    .then(() => {
        console.log('User successfully created.');
    }).catch((e) => {
        console.error('Error while creating user.', e);
    });
})