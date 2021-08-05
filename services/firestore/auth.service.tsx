import auth from '@react-native-firebase/auth';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {ErrorFirestore} from '../../types';

export class AuthService {
  constructor() {}
  async login(
    email: string,
    password: string,
  ): Promise<FirebaseAuthTypes.User | ErrorFirestore> {
    try {
      const {user} = await auth().signInWithEmailAndPassword(email, password);
      return user;
    } catch (error: unknown) {
      return error as ErrorFirestore;
    }
  }
  async signUp(
    name: string,
    email: string,
    password: string,
  ): Promise<FirebaseAuthTypes.User> {
    try {
      const {user} = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );

      await user.updateProfile({
        displayName: name,
      });
      return user;
    } catch (error) {
      console.log('ERROR !!', JSON.stringify(error));
      return error;
    }
  }

  async sendCodePhone(
    phone: string,
  ): Promise<FirebaseAuthTypes.ConfirmationResult> {
    try {
      return auth().signInWithPhoneNumber(phone);
    } catch (error) {
      console.log('ERROR !!', JSON.stringify(error));
      return error;
    }
  }

  async confirmPhoneNumber(
    confirmationResult: FirebaseAuthTypes.ConfirmationResult,
    code: string,
  ): Promise<FirebaseAuthTypes.UserCredential | null> {
    try {
      return confirmationResult.confirm(code);
    } catch (error) {
      console.log('ERROR !!', JSON.stringify(error));
      return error;
    }
  }
}
