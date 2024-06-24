const conf = {
    firebaseApikey : String(process.env.REACT_APP_FIREBASE_APIKEY),
    firebaseAuthdomain : String(process.env.REACT_APP_FIREBASE_AUTHDOMAIN),
    firebaseProjectId : String(process.env.REACT_APP_FIREBASE_PROJECT_ID),
    firebaseStoragebucket : String(process.env.REACT_APP_FIREBASE_STORAGEBUCKET),
    firebaseMessagingsenderId : String(process.env.REACT_APP_FIREBASE_MESSAGINGSENDER_ID),
    firebaseAppId : String(process.env.REACT_APP_FIREBASE_APP_ID),
    firebaseMeasurementId : String(process.env.REACT_APP_FIREBASE_MEASUREMENT_ID)
}

export default conf