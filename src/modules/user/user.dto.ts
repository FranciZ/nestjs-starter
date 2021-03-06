import { User } from './user.entity';

export class DAuthenticatedUser {

  _id: string;
  nickname: string;
  email: string;
  accessToken: string;

  // noinspection JSUnusedGlobalSymbols
  constructor(userDoc: User, token: string) {
    this._id = userDoc._id;
    this.nickname = userDoc.nickname;
    this.accessToken = token;
  }
}
