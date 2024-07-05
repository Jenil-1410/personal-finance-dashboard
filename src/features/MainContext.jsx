"use client"
import conf from '@/_conf/conf';
import axios from 'axios';
import React, { useState, createContext, useContext, useEffect } from 'react'

export const MainContext = createContext()

export const MainProvider = ({ children }) => {
    const [currData, setCurrData] = useState([]);
    const [addTransc, setAddTransc] = useState(false);
    const [editTransc, setEditTransc] = useState(false);
    
    const BASE_URL = `https://v6.exchangerate-api.com/v6/${conf.apiKey}/latest/INR`;

    useEffect(() => {
        axios.get(BASE_URL)
        .then(response => {
            setCurrData(response.data.conversion_rates);
        })
        .catch(error => console.error(error));
    }, [BASE_URL]);

    return (
        <MainContext.Provider value={{ currData, addTransc, setAddTransc, editTransc, setEditTransc }}>
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