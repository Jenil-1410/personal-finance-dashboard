// firebaseAdmin.js
import admin from 'firebase-admin';
import conf from './_conf/conf';

const serviceAccount = JSON.parse(conf.firebaseAdminSDK);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const auth = admin.auth();
export { auth };
