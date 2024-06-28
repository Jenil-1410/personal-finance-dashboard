"use client"
import conf from '@/_conf/conf';
import axios from 'axios';
import React, { useState, createContext, useContext, useEffect } from 'react'

export const MainContext = createContext()

export const MainProvider = ({ children }) => {
    const [currData, setCurrData] = useState([]);
    
    const BASE_URL = `https://v6.exchangerate-api.com/v6/${conf.apiKey}/latest/INR`;

    useEffect(() => {
        const localStorageData = localStorage.getItem('currData');

        if (localStorageData) {
            setCurrData(JSON.parse(localStorageData));
        } else {
            axios.get(BASE_URL)
            .then(response => {
                setCurrData(response.data.conversion_rates);
                localStorage.setItem('currData', JSON.stringify(response.data.conversion_rates));
            })
            .catch(error => console.error(error));
        }
    }, [BASE_URL]);
    
    useEffect(() => {
    if (Object.keys(currData).length > 0) {
        console.log("currData", currData);
        localStorage.setItem('currData', JSON.stringify(currData));
    }
    }, [currData]);

    return (
        <MainContext.Provider value={{ currData }}>
            {children}
        </MainContext.Provider>
    );
};

export const useMain = () => {
    const context = useContext(MainContext);
    if (!context) {
        throw new Error('useMain must be used within a MainProvider');
    }
    return context;
};