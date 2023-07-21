// import admin from 'firebase-admin';

const admin = require('firebase-admin');

const serviceAccount = require('./firebase.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const messaging = admin.messaging();

module.exports = {
    messaging
}