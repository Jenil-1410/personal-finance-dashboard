'use client'
import React, { useEffect, useState } from 'react'
import Navbar from '@/_components/Navbar';
import UserNavbar from '@/_components/UserNavbar';
import AddTransc from '@/_components/AddTransaction';
import { useMain } from '@/features/MainContext';
import { useFirebase } from '@/features/FirebaseContext';
import { usePathname, useRouter } from 'next/navigation';
import EditTransc from '@/_components/EditTransc';
import { doc, getDoc, updateDoc } from 'firebase/firestore/lite';
import { db } from '@/FirebaseConfig';

const page = () => {

  const { usrData, transcData, setIsAuthenticated, fetchTranscData } = useFirebase();
  const { addTransc, setAddTransc, editTransc, setEditTransc, currData } = useMain();
  const [currency, setCurrency] = useState(usrData?.currency || 'INR');
  var path = usePathname();
  const [ transcId, setTranscId ] = useState(null);
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  // if (!transcData || !usrData || !currency) {
  //   return <div>Loading...</div>; // Handle loading state
  // }

  useEffect(() => {
    // Check if the cookie exists
    const cookies = document.cookie.split('; ').reduce((acc, cookie) => {
        const [name, value] = cookie.split('=');
        acc[name] = value;
        return acc;
    }, {});

    if (cookies.userToken) {
        setIsAuthenticated(true);
        console.log(usrData.first_name);
        path = `/dashboard/${usrData.first_name}`;
    } else {
        router.push('/login');
    }

    if (usrData?.uid) {
      fetchTranscData(usrData.uid).then(() => setLoading(false));
    }
  }, [router, usrData, setIsAuthenticated, fetchTranscData]);

  console.log("transaction data", transcData);

  const handleAddTransc = () => {
    setAddTransc(true)
  }
  const handleEditTransc = (id) => {
    setEditTransc(true);
    setTranscId(id);
    console.log("transcId", transcId)
  }

  const deleteTranscFromFirestore = async (id) => {
    try {
      const userDocRef = doc(db, 'transactions', usrData.uid);
      const userDoc = await getDoc(userDocRef);
  
      if (userDoc.exists()) {
        const updatedTransactions = userDoc.data().transactions.filter(
          transaction => transaction.id !== id
        );
        await updateDoc(userDocRef, {
          transactions: updatedTransactions
        });
        console.log('Transaction deleted from Firestore successfully!');
        fetchTranscData(usrData.uid); // Refresh the transaction data
      }
    } catch (error) {
      console.error('Error deleting transaction from Firestore: ', error);
    }
  };
  const handleDeleteTransc = async (id) => {
    var alrt = window.confirm('Are you sure you want to delete the transaction?');
    if(alrt === true){
      await deleteTranscFromFirestore(id);
    }
    else{
      return
    }
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
    <div className="flex h-full w-full">
      <div className="w-[15%]">
        <Navbar />
      </div>
      <div className="w-full">
        <UserNavbar />
        <div className='m-2 w-auto'>
          <div className='w-[68%] left-[15%] right-0 mx-auto flex justify-center absolute top-2'>
              <input type='search' className='flex h-9 w-full rounded-md border-[0.5px] border-gray-700 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white disabled:cursor-not-allowed disabled:opacity-50 md:w-[100px] lg:w-[300px]' placeholder='Search...'></input>
          </div>
          <div className='p-4 border-[0.5px] border-gray-700 h-auto'>
              <div className='flex justify-between'>
                <h1 className='text-4xl font-bold'>Dashboard</h1>
                <button className='border border-white px-2 rounded' onClick={handleAddTransc}>Add transaction</button>
              </div>
              {
                transcData?.length === 0 ? (
                  <p className='text-center text-gray-400'>You have not added any transactions.</p>
                ): (
                <>
              <div className='w-full flex justify-end mt-4'>
                <select
                  id='currency'
                  className='rounded text-white bg-black border border-white px-2 py-1'
                  defaultValue={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                >
                  {
                    Object.keys(currData).length > 0 && (
                      Object.keys(currData).map((curr) => (
                        <option value={curr} key={curr}>{curr}</option>
                      ))
                    )
                  }
                </select>
              </div>
              <div className='text-center text-white m-10'>
                <table className='w-full border border-gray-700 border-collapse'>
                  <thead className='text-l font-bold'>
                    <tr className='bg-white text-black'>
                      <th className='p-4 border border-b-0 border-gray-700 border-collapse'>Date</th>
                      <th className='p-4 border border-b-0 border-gray-700 border-collapse'>Transaction Type</th>
                      <th className='p-4 border border-b-0 border-gray-700 border-collapse'>{`Amount (in ${currency})`}</th>
                      <th className='p-4 border border-b-0 border-gray-700 border-collapse'>Payment Method</th>
                      <th className='p-4 border border-b-0 border-gray-700 border-collapse'>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      transcData?.map((transaction) => (
                        <tr key={transaction.id}>
                          <td className='p-4 border border-b-0 border-gray-700 border-collapse'>{transaction.date}</td>
                          <td className='p-4 border border-b-0 border-gray-700 border-collapse'>{transaction.transaction_type}</td>
                          <td className='p-4 border border-b-0 border-gray-700 border-collapse'>{transaction.amount}</td>
                          <td className='p-4 border border-b-0 border-gray-700 border-collapse'>{transaction.payment_method}</td>
                          <td className='p-4 border border-b-0 border-gray-700 border-collapse'>
                            <button className='bg-green-300 hover:bg-green-500 text-black mr-2 border px-2 rounded' onClick={() => handleEditTransc(transaction.id)}>Edit</button>
                            <button className='bg-red-300 hover:bg-red-500 text-black mr-2 border px-2 rounded' onClick={() => handleDeleteTransc(transaction.id)}>Delete</button>
                          </td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              </div>
              </>
              )}
          </div>
        </div>
        {
          addTransc && <AddTransc />
        }
        {
          editTransc && <EditTransc id={transcId} />
        }
      </div>
    </div>
    </>
  )
}

export default page