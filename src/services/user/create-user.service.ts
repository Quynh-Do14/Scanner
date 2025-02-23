import { db } from '@/config';
import { COLLECTIONS } from '@/constants';
import { FirebaseError } from 'firebase/app';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';

const auth = getAuth();

export const createUserService = (
  email: string,
  password: string,
  fullname: string,
  onSuccess: () => void,
  onError: (error: FirebaseError) => void,
) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      const docRef = doc(db, COLLECTIONS.USERS, userCredential.user.uid);
      setDoc(docRef, {
        email: email,
        fullname: fullname,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        id: userCredential.user.uid,
        image:
          'https://jes.edu.vn/wp-content/uploads/2017/10/h%C3%ACnh-%E1%BA%A3nh.jpg',
        method: 'email',
      })
        .then(() => {
          onSuccess();
        })
        .catch((error) => {
        });
    })
    .catch((error) => {
      console.error(error)
      onError(error);
    });
};
