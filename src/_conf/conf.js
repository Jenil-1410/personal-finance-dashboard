const conf = {
    firebaseApikey : String(process.env.NEXT_PUBLIC_FIREBASE_APIKEY),
    firebaseAuthdomain : String(process.env.NEXT_PUBLIC_FIREBASE_AUTHDOMAIN),
    firebaseProjectId : String(process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID),
    firebaseStoragebucket : String(process.env.NEXT_PUBLIC_FIREBASE_STORAGEBUCKET),
    firebaseMessagingsenderId : String(process.env.NEXT_PUBLIC_FIREBASE_MESSAGINGSENDER_ID),
    firebaseAppId : String(process.env.NEXT_PUBLIC_FIREBASE_APP_ID),
    firebaseMeasurementId : String(process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID),
    apiKey: process.env.NEXT_PUBLIC_API_KEY,
    firebaseAdminSDK: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_SDK
};

export default conf