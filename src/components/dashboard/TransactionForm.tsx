'use client'
import { useState } from "react"
import { useSession } from "next-auth/react"

//usesession is used when using session tools on client side as its less secure
export default function TransactionForm({onAddTransaction}:{onAddTransaction:(transaction:any)=>void}){
   const {data:session}=useSession()
   const [formData,setFormData]=useState({
    amount:'',
    type:'expense',
    description:'',
    category:'',
    date: new Date().toISOString().split('T')[0],
   });
   const [loading,setLoading]=useState(false)
   const  [error,setError]=useState('')
   // this tells typescript that e can be input select or textarea element
   const handleChange=(e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>)=>{
    // change or updating the values in the form name refers to the prop selected and value is its given value
    const {name,value}=e.target
    setFormData(prev=>({...prev,[name]: value}));
   }
   const handleSubmit=async (e:React.FormEvent)=>{
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
        const response= await fetch('/api/transactions',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body: JSON.stringify({
              ...formData,
              amount:parseFloat(formData.amount),
              email:session?.user?.email,
            }),
        });
        if(!response.ok){
            throw new Error('Failed to add transactions')
        }
        const newTransaction=await response.json();
        onAddTransaction(newTransaction);
        //reseting the form
        setFormData({
         amount: '',
        type: 'expense',
        description: '',
        category: '',
        date: new Date().toISOString().split('T')[0],
        });
    }catch(err){
        setError('Failed to add transaction.Please try again.')
     } finally{
        setLoading(false)
     }
   };
   return (
   <div className="bg-white p-6 rounded-lg shadow">
    <h2 className="text-xl font-semibold mb-4">
        Add New Transaction
    </h2>
    {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-500 rounded-md">
            {error}
        </div>
    )};
    <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
                Amount
            </label>
            <input 
            type="number"
            step='0.01'
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md" 
            required
            />
        </div>
        <div>
         <label className="block text-sm font-medium text-gray-700 mb-1">
            Type
         </label>
         <select name="type" 
          value={formData.type}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md">
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
        </div>
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
            </label>
            <input type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
            </label>
            <input type="text"
            name="category"
            value={formData.category} 
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"/>
        </div>
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
                Date
            </label>
            <input 
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"/>
        </div>
        </div>
        <div>
            <button 
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 disabled:bg-indigo-300">
               {loading ? 'Adding...' : 'Add transaction'} 

            </button>
        </div>
    </form>
   </div>
   )
}