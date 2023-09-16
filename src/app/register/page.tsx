'use client';

import axios,{AxiosError} from 'axios';
import { FormEvent, useState } from 'react';
import { signIn } from 'next-auth/react';
import {useRouter} from 'next/navigation';


function RegisterPage() {
    const [error,setError] = useState();
    const router = useRouter()

    const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        const formData = new FormData(e.currentTarget)
        const signUpResponse = await axios.post('/api/auth/signup', {
            email : formData.get('email'),
            password : formData.get('password'),
            fullname : formData.get('fullname'),
          });
          console.log(signUpResponse);

          const res = await signIn('credentials', {
            email : signUpResponse.data.email,
            password: formData.get('password'),
            redirect: false,
          });
          if(res?.ok) return router.push('/dashboard')

          console.log(res);
      } catch (error) {
        console.log(error);
        if(error instanceof AxiosError) {
          setError(error.response?.data.message)
        }
      }
    }
    return (
        <div className='justify-center h-[calc(100vh-4rem)] flex items-center'>
            <form onSubmit={handleSubmit} className='bg-neutral-950 px-8 py-10 w3/12'>
              {error && (
                <div className='bg-red-500 flex justify-center text-white p-2 mb-2'>
                  {error}
                </div>
              )}
                <h1 className='text-4xl font-bold mb-7'>SignUp</h1>
                <input 
                type="text" 
                name="fullname" 
                placeholder="Jhon Doe" 
                className="bg-zinc-800 px-4 py-2 block mb-2"
                />

                <input 
                type="email" 
                name="email" 
                placeholder="someemail@gmail.com" 
                className="bg-zinc-800 px-4 py-2 block mb-2"
                />

                <input 
                type="password" 
                name="password" 
                placeholder="password" 
                className="bg-zinc-800 px-4 py-2 block mb-2"
                />

                <button className="bg-indigo-500 px-4 py-2">
                    Register
                </button>
            </form>
        </div>
    )
}

export default RegisterPage