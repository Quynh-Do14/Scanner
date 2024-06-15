import {User} from '@/types';
import {FirebaseError} from 'firebase/app';
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import {getUserService} from '../user/get-user.service';

const auth = getAuth();

export const loginWithEmailService = (
  email: string,
  password: string,
  onSuccess: (data: User) => void,
  onError: (err: FirebaseError) => void,
) => {
  signInWithEmailAndPassword(auth, email, password)
    .then(async userCredential => {
      const userId = userCredential.user.uid;
      getUserService(
        userId,
        data => {
          onSuccess(data);
        },
        error => {},
      );
    })
    .catch(error => {
      onError(error);
    });
};
