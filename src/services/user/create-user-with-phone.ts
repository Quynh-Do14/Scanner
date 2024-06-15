import { db } from "@/config";
import { COLLECTIONS } from "@/constants";
import { FirebaseError } from "firebase/app";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";

export const createUserPhoneService = async (
  id: string,
  phone: string,
  onSuccess: (data: any) => void,
  onError: (error: FirebaseError) => void
) => {
  const docRef = doc(db, COLLECTIONS.USERS, id);
  setDoc(docRef, {
    phone: phone,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    image:
      "https://jes.edu.vn/wp-content/uploads/2017/10/h%C3%ACnh-%E1%BA%A3nh.jpg",
    method: "phone",
    id: id,
  })
    .then(async () => {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const newData: any = {
          ...docSnap.data(),
        };

        onSuccess(newData);
      }
    })
    .catch((error) => {});
};
