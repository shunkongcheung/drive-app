import admin from "firebase-admin";

const getFirestore = () => {
  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID as string,
        privateKey: process.env.FIREBASE_PRIVATE_KEY as string,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL as string,
      }),
      databaseURL: "https://vercel-serverless.firebaseio.com",
    });
  } catch (error: any) {
    /*
     * We skip the already exists message which is
     * not an actual error when we're hot-reloading.
     */
    if (!/already exists/u.test(error.message)) {
      // eslint-disable-next-line no-console
      console.error("Firebase admin initialization error", error.stack);
    }
  }

  return admin.firestore();
};

export default getFirestore;
