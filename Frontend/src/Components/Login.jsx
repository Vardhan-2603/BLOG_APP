import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import {useAuth} from '../Store/AuthStore'
import { useNavigate ,NavLink } from 'react-router'
import { toast } from 'react-hot-toast'
import { Mail, Lock, User, PenTool, ArrowRight } from 'lucide-react'
import api from "../APIs/axios";

function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm({ mode: 'onChange' })
  const login=useAuth(state=>state.login)
  const isAuthenticated=useAuth(state=>state.isAuthenticated)
  const currentUser=useAuth(state=>state.currentUser)
  const error = useAuth((state) => state.error);
  const navigate=useNavigate()

  const onSubmit = async(loginCred) => {
    await login(loginCred)
  }

  useEffect(()=>{
    if(isAuthenticated){
      if(currentUser.role==="USER"){
        toast.success("Logined successfully")
        navigate("/userdashbord")
      }
      else if (currentUser.role==="AUTHOR"){
        toast.success("Logined successfully")
        navigate("/authordashbord")
      }
    }
  },[isAuthenticated,currentUser, navigate])

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand-100 via-slate-50 to-white"></div>
      
      <div className="max-w-md w-full space-y-8 bg-white p-8 md:p-10 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 z-10">
        
        <div className="text-center">
          <h2 className="mt-2 text-3xl font-extrabold text-slate-900 tracking-tight">
            Welcome back
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Please sign in to your account
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          
          {/* Role Selection */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-slate-700">Account Type</label>
            <div className="grid grid-cols-2 gap-4">
              <label className="cursor-pointer">
                <input type="radio" value="user" className="peer sr-only" {...register("role", { required: true })} />
                <div className="rounded-lg border border-slate-200 bg-white p-4 hover:bg-slate-50 peer-checked:border-brand-500 peer-checked:bg-brand-50 peer-checked:ring-1 peer-checked:ring-brand-500 transition-all flex flex-col items-center gap-2">
                  <User size={24} className="text-slate-500 peer-checked:text-brand-600" />
                  <span className="text-sm font-medium text-slate-700">Reader</span>
                </div>
              </label>

              <label className="cursor-pointer">
                <input type="radio" value="author" className="peer sr-only" {...register("role", { required: true })} />
                <div className="rounded-lg border border-slate-200 bg-white p-4 hover:bg-slate-50 peer-checked:border-brand-500 peer-checked:bg-brand-50 peer-checked:ring-1 peer-checked:ring-brand-500 transition-all flex flex-col items-center gap-2">
                  <PenTool size={24} className="text-slate-500 peer-checked:text-brand-600" />
                  <span className="text-sm font-medium text-slate-700">Author</span>
                </div>
              </label>
            </div>
            {errors?.role && <p className="text-red-500 text-xs mt-1">* Please select an account type</p>}
          </div>

          <div className="space-y-4 rounded-md shadow-sm">
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="sr-only">Email address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  className="appearance-none rounded-lg relative block w-full pl-10 px-3 py-3 border border-slate-300 placeholder-slate-400 text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 focus:z-10 sm:text-sm transition-colors"
                  placeholder="Email address"
                  {...register("email", { required: true })}
                />
              </div>
              {errors?.email && <p className="text-red-500 text-xs mt-1">* Email is required</p>}
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  className="appearance-none rounded-lg relative block w-full pl-10 px-3 py-3 border border-slate-300 placeholder-slate-400 text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 focus:z-10 sm:text-sm transition-colors"
                  placeholder="Password"
                  {...register("password", { required: true, minLength: 4 })}
                />
              </div>
              {errors.password?.type === "required" && <p className="text-red-500 text-xs mt-1">* Password is required</p>}
              {errors.password?.type === "minLength" && <p className="text-red-500 text-xs mt-1">* Password must be at least 4 characters</p>}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-brand-600 hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 transition-colors shadow-md hover:shadow-lg"
            >
              Sign in
              <ArrowRight className="ml-2 h-5 w-5 text-brand-200 group-hover:text-white transition-colors" />
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-slate-600">
            Don't have an account?{' '}
            <NavLink to="/register" className="font-medium text-brand-600 hover:text-brand-500 hover:underline transition-colors">
              Create one now
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login