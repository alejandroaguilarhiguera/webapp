import auth from '@react-native-firebase/auth';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';

export class UserService {
  constructor() {}
  me(): FirebaseAuthTypes.User | null {
    return auth().currentUser;
  }
  async logout(): Promise<void> {
    await auth().signOut();
  }
}
