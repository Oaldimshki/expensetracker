'use client'
import Image from 'next/image'
import React from 'react'
import { useState, useEffect } from 'react'
import {collection, addDoc, getDoc, querySnapshot, onSnapshot, query, deleteDoc, doc } from 'firebase/firestore'
import { db } from './firebase'

export default function Home() {
  const [items,setItems] = useState([
    // {name: 'Coffee', price: 4.95},
    // {name: 'Movie', price: 24.95},
    // {name: 'candy', price: 2.99},
    
  ]);
  const [newItem, setNewItem] = useState({name: '', price: ''})
  const [total, setTotal] = useState(0)

//add items to database

const addItem = async (e) => {
e.preventDefault()
if (newItem.name !== '' && newItem.price !== '') {
  // setItems({...items, newItem});
  await addDoc(collection(db, 'items'), {
    name: newItem.name.trim(),
    price: newItem.price,
  });
  setNewItem({name: '', price: ''})
}
};
//read items from database
useEffect(()=>{
const q = query(collection(db, 'items'))
const unsubscribe = onSnapshot(q, (querySnapshot) => {
   let itemsArr = []
   querySnapshot.forEach((doc) =>{
    itemsArr.push({...doc.data(), id: doc.id})
   })
   setItems(itemsArr);


   //read total from itemsArr
   const calculateTotal = ()=> {
    const totalPrice = itemsArr.reduce((sum, item) => sum + parseFloat(item.price), 0)
    setTotal(totalPrice)
   }
   calculateTotal()
   return () => unsubscribe();
})
},[])
//delete items from database
const deleteItem = async (id) => {
  await deleteDoc(doc(db, 'items', id))
}

  return (
    <main className=" bg-slate-500 flex min-h-screen flex-col items-center justify-between sm:p-24 p-4">
      <div className="z-10  max-w-5xl items-center justify-between font-mono text-sm">
      <h1 className='text-4xl p-4 text-center'>Expense Tracker</h1>
      <div className=' bg-slate-800 p4 rounded-lg'>
        <form className=' grid grid-cols-6  items-center text-black' >
          <input value={newItem.name} onChange={(e) => setNewItem({...newItem, name: e.target.value})} className='col col-span-3 p3 border rounded mx-3' type="text" placeholder='Enter Item'/>
          <input value={newItem.price} onChange={(e) => setNewItem({...newItem, price: e.target.value})} className='col col-span-2 p3 border rounded mx-3' type="text" placeholder='Enter $'/>
          <button onClick={addItem} className=' text-white hover:bg-slate-900 p-3 text-xl rounded' type='submit'>+</button>
        </form>
        <ul>
          {items.map((item, id) => (
            <li key={id} className=' my-4w-full flex justify-between bg-slate-700'>
              <div className=' p-4 w-full flex justify-between'>
                <span className='capitalize'>{item.name}</span>
                <span>${item.price}</span>
              </div>
              <button onClick={() => deleteItem(item.id)} className=' ml-8 p-4 border-l-2 border-slate-950 hover:bg-slate-900 w-16'>x</button>
            </li>
          ))}
        </ul>
        {items.length < 1 ? ('') :(
          <div className=' flex justify-between p-3'>
            <span>Total</span>
            <span>${total}</span>
          </div>
        )}
      </div>
      </div>
    </main>
  )
}
