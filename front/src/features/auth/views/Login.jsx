import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { LoginSchema } from "../validations/LoginValidation";
import { loginService } from "../services/login.service";
import { SymbolIcon, EyeOpenIcon, EyeClosedIcon } from '@radix-ui/react-icons';

import fondo from '../../assets/pangeaco_fondo.jpg';

export function LoginView() {

  const navigate = useNavigate()

  const dispatch = useDispatch()

  const [isSubmiting, setIsSubmiting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(LoginSchema) });
  
  return (    
    <div className="flex-auto h-screen" style={{backgroundImage: `url(${fondo})`, backgroundSize: "cover", backgroundPosition: "center"}}>
      <h2 className='font-bold text-center relative top-[10%] text-[40px] text-white [-webkit-text-stroke:1px_black]'>Inventario de Planta Externa</h2>
      <div className='max-w-sm mx-auto px-8 md:px-0 pt-[9%] space-y-4'>
        <h1 className='font-bold text-3xl text-white [-webkit-text-stroke:1px_black]'>PangeaCo</h1>
        <div>
          <form className='block mt-0 isolation-auto bg-white rounded-lg shadow-md p-6'>
            <div className="space-y-2">
              <div className="pb-2 space-y-2">
                <label>
                  <div className="pb-1">
                    <span className="text-sm text-gray-700 select-none">Email</span>
                  </div>
                  <input 
                  {...register('email',  { required: true })}
                  spellCheck="false" autoCapitalize="false" name="email" type="email" autoComplete="username" 
                  className='py-1 px-2 text-sm rounded  outline-none focus-visible:ring-1 focus-visible:ring-offset-1 focus-visible:ring-purple-500 border
                  border-gray-200 shadow-sm focus-visible:border-gray-200 hover:border-gray-300 block w-full' />
                </label>
              </div>
              
              <div className="relative pb-2 space-y-2">
              <label>
                <div className="pb-1">
                  <span className="text-sm text-gray-700 select-none">Password</span>
                </div>
                <div className="relative">
                  <input {...register("password", { required: true })}
                    spellCheck="false" autoCapitalize="false" name="password" type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    className="py-1 px-2 text-sm rounded outline-none focus-visible:ring-1 focus-visible:ring-offset-1 focus-visible:ring-purple-500 border border-gray-200 shadow-sm focus-visible:border-gray-200 hover:border-gray-300 block w-full pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute top-1/2 right-[42px] px-2 -translate-y-1/2 text-gray-500 hover:text-gray-700 bg-white h-full"
                  >
                    {showPassword ? <EyeClosedIcon size={18} /> : <EyeOpenIcon size={18} />}
                  </button>
                </div>
              </label>
            </div>  
            </div>
            

            <div className="pt-6 pb-1 relative flex items-stretch justify-stretch">
              <button onClick={handleSubmit(async (data) => await loginService(data.email, data.password, navigate, setIsSubmiting, dispatch))} className="aria-expanded:bg-purple-600 data-state-on:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus-visible:outline-none py-1 px-3 text-md rounded inline-flex items-center gap-x-1 font-medium text-white  outline-none focus-visible:ring-1 focus-visible:ring-offset-1 focus-visible:ring-purple-500 border border-purple-500 bg-purple-500 hover:bg-purple-600 hover:shadow flex-auto justify-center">
                Sign in
              </button>   
              <SymbolIcon className={`${isSubmiting ? "opacity-50" : "opacity-0"} animate-spin transition-opacity absolute top-8 right-2.5 text-white`}/>                        
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
