"use client"
import { auth, db } from '@/FirebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore/lite';
import React, { useState, createContext, useContext, useEffect, useCallback } from 'react'

export const FirebaseContext = createContext()

export const FirebaseProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isUser, setIsUser] = useState(false);
    const [usrData, setUsrData] = useState({});
    const [transcData, setTranscData] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

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

                await fetchTranscData(uid);
            } else {
                setLoggedIn(false);
                setIsAdmin(false);
                setIsUser(false);
                console.log("User not present");
            }
        });

        console.log("userData", usrData)
        console.log("transactionData", transcData)
    
        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);

    const fetchTranscData = useCallback(async (uid) => {
        try {
            const transcDocRef = doc(db, "transactions", uid);
            const transcDocSnap = await getDoc(transcDocRef);
            if (transcDocSnap.exists()) {
                const data = transcDocSnap.data();
                setTranscData(data.transactions || []);
            } else {
                console.log("No such document!");
            }
        } catch (error) {
            console.error("Error fetching transactions: ", error);
        }
    }, []);

    return (
        <FirebaseContext.Provider value={{ loggedIn, isAdmin, isUser, usrData, isAuthenticated, setIsAuthenticated, transcData, fetchTranscData }}>
            {children}
        </FirebaseContext.Provider>
    );
};

export const useFirebase = () => {
    const context = useContext(FirebaseContext);
    if (!context) {
        throw new Error('useFirebase must be used within a FirebaseProvider');
    }
    return context;
};