import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, Link } from 'react-router'
import { toast } from "react-hot-toast"
import { Mail, Lock, User, PenTool, ImagePlus, UserCircle, ArrowRight } from 'lucide-react'
import api from "../APIs/axios";

function Register() {
  const { register, handleSubmit, formState: { errors } } = useForm({ mode: 'onChange' })
  const [loading, setLoading] = useState(false)
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState(null)
  let navigate = useNavigate()

  const onSubmit = async (newUser) => {
    setLoading(true)
    const formData = new FormData();
    let { role, profileImageUrl, ...userObj } = newUser;
    
    Object.keys(userObj).forEach((key) => {
      formData.append(key, userObj[key]);
    });
    
    formData.append("profileImageUrl", profileImageUrl[0]);
    
    try {
      if (role === 'user') {
        let resObj = await api.post("/user-api/users", formData);
        if (resObj.status === 201) {
          toast.success('Successfully registered')
          navigate('/login')
        }
      }
      if (role === 'author') {
        let resObj = await api.post("/author-api/users", formData);
        if (resObj.status === 201) {
          toast.success('Successfully registered')
          navigate('/login')
        }
      }
    } catch (err) {
      setError(err.response?.data?.error || "Registration Failed")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-indigo-100 via-slate-50 to-white"></div>
      
      <div className="max-w-2xl w-full space-y-8 bg-white p-8 md:p-10 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 z-10">
        
        <div className="text-center">
          <h2 className="mt-2 text-3xl font-extrabold text-slate-900 tracking-tight">
            Create an account
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Join ArticleHub and start exploring
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
          
          {/* Role selection */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-slate-700">I want to register as an...</label>
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
            {errors.role && <p className="text-red-500 text-xs mt-1">* Please select a role</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* First Name */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">First Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UserCircle className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="text"
                  className="appearance-none rounded-lg relative block w-full pl-10 px-3 py-3 border border-slate-300 placeholder-slate-400 text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 sm:text-sm transition-colors"
                  placeholder="John"
                  {...register("firstName", { required: true, minLength: 4 })}
                />
              </div>
              {errors?.firstName?.type === "required" && <p className="text-red-500 text-xs mt-1">* First name is required</p>}
              {errors?.firstName?.type === "minLength" && <p className="text-red-500 text-xs mt-1">* Minimum 4 characters</p>}
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Last Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UserCircle className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="text"
                  className="appearance-none rounded-lg relative block w-full pl-10 px-3 py-3 border border-slate-300 placeholder-slate-400 text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 sm:text-sm transition-colors"
                  placeholder="Doe"
                  {...register("lastName", { required: true, minLength: 4 })}
                />
              </div>
              {errors?.lastName?.type === "required" && <p className="text-red-500 text-xs mt-1">* Last name is required</p>}
              {errors?.lastName?.type === "minLength" && <p className="text-red-500 text-xs mt-1">* Minimum 4 characters</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="email"
                  className="appearance-none rounded-lg relative block w-full pl-10 px-3 py-3 border border-slate-300 placeholder-slate-400 text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 sm:text-sm transition-colors"
                  placeholder="john@example.com"
                  {...register("email", { required: true })}
                />
              </div>
              {errors?.email?.type === "required" && <p className="text-red-500 text-xs mt-1">* Email is required</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="password"
                  className="appearance-none rounded-lg relative block w-full pl-10 px-3 py-3 border border-slate-300 placeholder-slate-400 text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 sm:text-sm transition-colors"
                  placeholder="••••••••"
                  {...register("password", { required: true, minLength: 4 })}
                />
              </div>
              {errors?.password?.type === "required" && <p className="text-red-500 text-xs mt-1">* Password is required</p>}
              {errors?.password?.type === "minLength" && <p className="text-red-500 text-xs mt-1">* Minimum 4 characters</p>}
            </div>
          </div>

          {/* Profile Image */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Profile Image</label>
            <div className="flex items-center gap-6">
              <div className="shrink-0">
                {preview ? (
                  <img src={preview} alt="Profile preview" className="h-16 w-16 object-cover rounded-full border-2 border-brand-500 shadow-sm" />
                ) : (
                  <div className="h-16 w-16 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400">
                    <ImagePlus size={24} />
                  </div>
                )}
              </div>
              <label className="block w-full">
                <span className="sr-only">Choose profile photo</span>
                <input
                  type="file"
                  accept="image/png, image/jpeg"
                  className="block w-full text-sm text-slate-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-brand-50 file:text-brand-600 hover:file:bg-brand-100 transition-colors cursor-pointer"
                  {...register("profileImageUrl", { required: true })}
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      if (!["image/jpeg", "image/png"].includes(file.type)) {
                        setError("Only JPG or PNG allowed");
                        return;
                      }
                      if (file.size > 2 * 1024 * 1024) {
                        setError("File size must be less than 2MB");
                        return;
                      }
                      const previewUrl = URL.createObjectURL(file);
                      setPreview(previewUrl);
                      setError(null);
                    }
                  }}
                />
              </label>
            </div>
            {errors?.profileImageUrl && <p className="text-red-500 text-xs mt-2">* Profile image is required</p>}
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-brand-600 hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 transition-colors shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
            >
              Create Account
              <ArrowRight className="ml-2 h-5 w-5 text-brand-200 group-hover:text-white transition-colors" />
            </button>
          </div>
          
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-slate-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-brand-600 hover:text-brand-500 hover:underline transition-colors">
              Sign in instead
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;