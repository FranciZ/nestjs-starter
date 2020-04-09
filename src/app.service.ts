import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class AppService {

  firebaseError: string;

  constructor() {
    // ...
  }

  init() {
    try {
      const serviceAccount = require('./config/kjer-si-firebase-adminsdk-v1eil-b7f0b466dc.json');
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
      });
    } catch (e) {
      console.error('ERROR: Firebase init error');
      this.firebaseError = e;
    }
  }
}
