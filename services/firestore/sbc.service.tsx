import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {Sbc} from '../../types/sbc';

export class SbcService {
  constructor() {}
  async getDevices(): Promise<Sbc[]> {
    const devicesRef = firestore().collection('devices');
    const query = devicesRef.where('owner', '==', auth().currentUser?.uid);
    const snapshot = await query.get();
    const devices: Sbc[] = [];
    snapshot.forEach(doc => devices.push(doc.data() as Sbc));
    return devices;
  }
}
