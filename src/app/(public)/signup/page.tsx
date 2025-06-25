'use client'

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { validateEmail,validatePassword } from "@/lib/validation"

export default function signUpPage(){
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [error,setError]=useState('');
    const [loading,setLoading]=useState(false)
    const [confirmPassword,setConfirmPassword]=useState('');
    const router=useRouter();

    const handleSubmit=async(e:React.FormEvent)=>{
        e.preventDefault()
        setError('');
        //basic validation
        //validate email
        if(!validateEmail(email)){
          setError('Please enter a valid email');
        }
        
        if(password !==confirmPassword){
            setError('Passwords do not match');
            return;
        }
       const passwordErrors=validatePassword(password);
       if(passwordErrors.length >0){
        setError(passwordErrors.join(','));
        return;
       }
    setLoading(true);
    try{
        const response=await fetch('/api/signup',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({email,password})
        })
       const data=await response.json()
       if(!response.ok) {
        throw new Error(data.error || 'Sign up failed');
       }
       //redirect to login page after successful signup
       router.push('/login?signupSuccess=true');
    }catch(err:any){
        setError(err.message || 'An error occured');
        setLoading(false)
    }
   
    }
    
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
              Sign in
            </Link>
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 text-red-500 p-3 rounded-md">
              {error}
            </div>
          )}
          
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password (min 6 characters)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="confirm-password" className="sr-only">
                Confirm Password
              </label>
              <input
                id="confirm-password"
                name="confirm-password"
                type="password"
                autoComplete="new-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-300"
            >
              {loading ? 'Creating account...' : 'Sign up'}
            </button>
          </div>
          
          <div className="text-center text-sm text-gray-500">
            By signing up, you agree to our 
            <Link href="#" className="font-medium text-indigo-600 hover:text-indigo-500"> Terms of Service </Link> 
            and 
            <Link href="#" className="font-medium text-indigo-600 hover:text-indigo-500"> Privacy Policy</Link>
          </div>
        </form>
      </div>
    </div>
  );
}