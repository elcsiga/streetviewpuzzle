import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as https from 'https';
import { SimplePuzzleDetails } from './common/puzzle';
import { PublicUser, User } from './common/auth';
import { UserRecord } from 'firebase-functions/lib/providers/auth';
import { mapsConfig } from './common/app-config-private';

admin.initializeApp();

const updatePuzzle = async (doc: FirebaseFirestore.DocumentSnapshot) => {
    const puzzle = doc.data() as SimplePuzzleDetails;
    const puzzleId = doc.id;

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
        + `&key=${mapsConfig.apiKey}`;

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

    const userSnapshot = await admin.firestore().collection('users').doc(puzzle.author.uid).get();
    const publicUser = (userSnapshot.data() as User).publicUser;
    const fileUrl = `https://firebasestorage.googleapis.com/v0/b/streetviewpuzzle.appspot.com/o/${puzzleId}?alt=media`;
    console.log('Thumbnail url: ', fileUrl);

    await doc.ref.set({
        thumbnail: fileUrl,
        author: {
            uid: puzzle.author.uid,
            publicUser
        }
    }, { merge: true });
}

export const onCreatePuzzle = functions.firestore
    .document('puzzles/{puzzleId}')
    .onCreate(async (doc) => {
        await updatePuzzle(doc);
    });

export const onUpdatePuzzle = functions.firestore
    .document('puzzles/{puzzleId}')
    .onUpdate(async (change) => {
        await updatePuzzle(change.after);
    });

export const onDeletePuzzle = functions.firestore
    .document('puzzles/{puzzleId}')
    .onDelete(async (doc) => {
        const file = admin.storage().bucket().file(doc.id);
        await file.delete();
    });

export const onRegisterUser = functions.auth.user().onCreate(async (authUser: UserRecord) => {

    const publicUser: PublicUser = {
        visualName: authUser.displayName || (typeof authUser.email === 'string' ? authUser.email.split('@')[0] : '?'),
        avatarUrl: authUser.photoURL
    }
    const userRecord: User = {
        publicUser: publicUser,
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

export const onUpdateUser = functions.firestore
    .document('users/{uid}')
    .onUpdate(async (change) => {
        const userDoc = change.after;
        const publicUser = (userDoc.data() as User).publicUser;

        // updating user's puzzles
        const batch = admin.firestore().batch();
        const puzzles = await admin.firestore().collection('puzzles').where('authot/uid', "==", userDoc.id).select().get();
        puzzles.docs.forEach( puzzleDoc => {
            const puzzle = admin.firestore().collection("puzzles").doc(puzzleDoc.id);
            batch.update(puzzle, { "author": publicUser });
        })
        await batch.commit();
    });