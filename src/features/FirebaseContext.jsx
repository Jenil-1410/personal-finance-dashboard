"use client"
import { auth, db } from '@/FirebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore/lite';
import React, { useState, createContext, useContext, useEffect } from 'react'

export const FirebaseContext = createContext()

export const FirebaseProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isUser, setIsUser] = useState(false);
    const [usrData, setUsrData] = useState({});

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setLoggedIn(true);
                // User is signed in
                const uid = user.uid;
                console.log("User ID:", uid);
    
                const docRef = doc(db, "users", uid);
                const docSnap = await getDoc(docRef);    
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setUsrData(data);
                    data.role === 'admin' ? setIsAdmin(true) : setIsUser(true);
                } else {
                    // docSnap.data() will be undefined in this case
                    console.log("No such document!");
                }
            } else {
                setLoggedIn(false);
                setIsAdmin(false);
                setIsUser(false);
                console.log("User not present");
            }
        });
    
        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);

    console.log("data", usrData)

    return (
        <FirebaseContext.Provider value={{ loggedIn, isAdmin, isUser, usrData }}>
            {children}
        </FirebaseContext.Provider>
    );
};

export const useFirebase = () => {
    const context = useContext(FirebaseContext);
    if (!context) {
        throw new Error('useForm must be used within a FormProvider');
    }
    return context;
};