'use client';

import { FormEvent, useState } from 'react';
import { signIn } from 'next-auth/react';
import {useRouter} from 'next/navigation';


function LoginPage() {
    const [error,setError] = useState('');
    const router = useRouter()

    const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget)
          const res = await signIn('credentials', {
            email : formData.get('email'),
            password: formData.get('password'),
            redirect: false,
          });
          if(res?.error) return setError(res.error as string);
          if(res?.ok) return router.push('/dashboard/profile')

          console.log(res);
     
    }
    return (
        <div className='justify-center h-[calc(100vh-4rem)] flex items-center'>
            <form onSubmit={handleSubmit} className='bg-neutral-950 px-8 py-10 w3/12'>
              {error && (
                <div className='bg-red-500 flex justify-center text-white p-2 mb-2'>
                  {error}
                </div>
              )}
                <h1 className='text-4l font-bold m-7'>SignIn</h1>
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
                    Login
                </button>
            </form>
        </div>
    )
}

export default LoginPage