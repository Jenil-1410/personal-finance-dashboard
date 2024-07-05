import React, { useId } from 'react';
import { db } from '@/FirebaseConfig';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useMain } from '@/features/MainContext';
import { useFirebase } from '@/features/FirebaseContext';
import { addDoc, arrayUnion, collection, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore/lite';

const validationSchema = Yup.object().shape({
    date: Yup.string().required('Date is required'),
    transaction_type: Yup.string().required('Transaction type is required'),
    amount: Yup.string().required('Amount is required'),
    payment_method: Yup.string().required('Payment method is required'),
  });

const AddTransc = () => {

    const { setAddTransc } = useMain();
    const { usrData, fetchTranscData } = useFirebase();
    const transcId = Date.now().toString(36);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({resolver: yupResolver(validationSchema),});

    const userDocRef = doc(db, "transactions", usrData.uid);

    const addTranscToFirestore = async (data) => {
      try {
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          // Document exists, update it
          await updateDoc(userDocRef, {
            transactions: arrayUnion({
              id: transcId,
              date: data.date,
              transaction_type: data.transaction_type,
              amount: data.amount,
              payment_method: data.payment_method
            })
          });
        } else {
          // Document does not exist, create it with initial transaction
          await setDoc(userDocRef, {
            transactions: [
              {
                id: transcId,
                date: data.date,
                transaction_type: data.transaction_type,
                amount: data.amount,
                payment_method: data.payment_method
              }
            ]
          });
        }
        console.log("Transaction added to Firestore successfully!");
      } catch (error) {
        console.error("Error adding transaction to Firestore: ", error);
      }
    };

    const addTransc = async (data) => {
      try {
        await addTranscToFirestore(data);
        fetchTranscData(usrData.uid);
        setAddTransc(false);
      } catch (err) {
        console.log("error adding transc: ", err)
        // setError(err);
      }
    }

  return (
    <>
      <div className='flex justify-center backdrop-blur-sm w-full fixed inset-0 pb-48'>
        <form className='bg-black text-white h-fit w-1/4 p-5 border border-gray-700 rounded-md shadow-white-lg top-[33%] relative' onSubmit={handleSubmit(addTransc)}>
          <div>
            <h1 className='text-2xl font-semibold'>Add Transaction</h1>
            <button className='border absolute top-2 right-2 border-black rounded bg-red-500 text-white px-2' onClick={() => setAddTransc(false)}>X</button>
          </div>
          <br/>
          <div>
            <label htmlFor='birth'>Date </label><br />
            <input id='date' type='date' className='w-full rounded-md text-black box-border pl-1' {...register("date")} />
            {errors.date && <p className='text-red-500'>{errors.date.message}</p>}
          </div>
          <br/>
          <div>
              <label htmlFor='transaction_type'>Transaction Type </label><br />
              <select
                  id='transaction_type'
                  className='w-full rounded-md text-black box-border pl-1'
                  defaultValue={""}
                  {...register('transaction_type')}
              >
                  <option value="">Select</option>
                  <option value="expense">Expense</option>
                  <option value="savings">Savings</option>
              </select>
              {errors.transaction_type && <span className="text-red-500">{errors.transaction_type.message}</span>}
          </div>
          <br/>
          <div>
            <label htmlFor='amount'>Amount </label><br />
            <input id='amount' type='tel' className='w-full rounded-md text-black box-border pl-1' {...register("amount")} />
            {errors.amount && <p className='text-red-500'>{errors.amount.message}</p>}
          </div>
          <br/>
          <div>
              <label htmlFor='payment_method'>Payment Method </label><br />
              <select
                  id='payment_method'
                  className='w-full rounded-md text-black box-border pl-1'
                  defaultValue={""}
                  {...register('payment_method')}
              >
                  <option value="">Select</option>
                  <option value="online">Online</option>
                  <option value="cheque">Cheque</option>
                  <option value="cash">Cash</option>
                  <option value="DD">DD</option>
              </select>
              {errors.payment_method && <span className="text-red-500">{errors.payment_method.message}</span>}
          </div>
          <br/>
          <div>
            <button className='bg-white w-full text-black p-1 rounded-md'>Add</button>
          </div>
        </form>
      </div>
    </>
  )
}

export default AddTransc
