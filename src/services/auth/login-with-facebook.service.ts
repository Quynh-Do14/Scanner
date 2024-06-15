import {db} from '@/config';
import {COLLECTIONS} from '@/constants';
import {doc, getDoc, serverTimestamp, setDoc} from 'firebase/firestore';
import {Platform} from 'react-native';
import {
  AccessToken,
  AuthenticationToken,
  GraphRequest,
  GraphRequestManager,
  LoginManager,
} from 'react-native-fbsdk-next';

interface UserFacebookInfo {
  email: string;
  fullname: string;
  image: string;
  id: string;
}

const createUser = async (
  user: UserFacebookInfo,
  onSuccess: (data: any) => void,
) => {
  try {
    const docRef = doc(db, COLLECTIONS.USERS, user.id);

    const inputData = {
      ...user,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      method: 'facebook',
    };
    setDoc(docRef, inputData).then(async () => {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const newData: any = {
          ...docSnap.data(),
        };

        onSuccess(newData);
      }
    });
  } catch (error) {}
};

export const getUserProfileFacebook = (token: any, onSuccess: any) => {
  const params = {
    fields: {
      string: 'id,email,first_name,last_name,picture.type(large)',
    },
  };
  const graphRequest = new GraphRequest(
    '/me',
    {accessToken: token, parameters: params},
    (error, result: any) => {
      if (error) {
        // handle error
        // console.log('Error fetching data: ' + error.toString());
      } else {
        // handle success

        const newUser: UserFacebookInfo = {
          email: result?.email,
          id: result.id,
          image: result.picture.data.url,
          fullname: result.last_name + ' ' + result.first_name,
        };
        createUser(newUser, onSuccess);
      }
    },
  );
  new GraphRequestManager().addRequest(graphRequest).start();
};

export const loginWithFacebook = async (
  onStartGetInfo: () => void,
  onSuccess: (data: any) => void,
  onError: () => void,
  onCancel: () => void,
) => {
  try {
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);

    if (result.isCancelled) {
      return onCancel();
    }

    if (Platform.OS === 'ios') {
      // flow ios
      const result = await AuthenticationToken.getAuthenticationTokenIOS();
      console.log(result?.authenticationToken);
    } else {
      // flow android
      const result = await AccessToken.getCurrentAccessToken();
      onStartGetInfo();
      getUserProfileFacebook(result?.accessToken, onSuccess);
    }
  } catch (error) {
    // console.log(error);
  }
};
