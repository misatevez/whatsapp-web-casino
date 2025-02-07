import { initializeApp, FirebaseApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  updateProfile as firebaseUpdateProfile,
  Auth
} from 'firebase/auth';
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  Firestore
} from 'firebase/firestore';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL as getStorageDownloadURL,
  deleteObject,
  Storage
} from 'firebase/storage';

export class FirebaseAdapter {
  private app: FirebaseApp;
  private auth: Auth;
  private db: Firestore;
  private storage: Storage;

  constructor(config: any) {
    this.app = initializeApp(config);
    this.auth = getAuth(this.app);
    this.db = getFirestore(this.app);
    this.storage = getStorage(this.app);
  }

  // Auth methods
  async signIn(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  async signOut() {
    return firebaseSignOut(this.auth);
  }

  // Firestore methods
  subscribeToCollection(path: string, queryConstraints: any[] = []) {
    const collectionRef = collection(this.db, path);
    const q = query(collectionRef, ...queryConstraints);
    return onSnapshot(q);
  }

  subscribeToDocument(path: string) {
    const docRef = doc(this.db, path);
    return onSnapshot(docRef);
  }

  // Storage methods
  uploadFile(file: File, path: string, onProgress?: (progress: number) => void) {
    const storageRef = ref(this.storage, path);
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          if (onProgress) {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            onProgress(progress);
          }
        },
        reject,
        () => {
          getStorageDownloadURL(uploadTask.snapshot.ref).then(resolve);
        }
      );
    });
  }
}