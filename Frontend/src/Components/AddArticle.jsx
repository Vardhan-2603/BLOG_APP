import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router';
import toast from 'react-hot-toast';
import { PenTool, FileText, Tag, AlignLeft, Send } from 'lucide-react';
import api from "../APIs/axios";

function AddArticle() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const navigate = useNavigate();
  const location = useLocation();

  const editData = location.state; 

  // Prefill form when editing
  useEffect(() => {
    if (editData) {
      reset(editData);
    }
  }, [editData, reset]);

  const onSubmit = async (data) => {
    try {
      if (editData) {
        // EDIT MODE
        await api.put(
          "/author-api/articles",
          {
            articleId: editData._id,
            ...data
          }
        );
        toast.success("Article updated successfully");
      } else {
        // ADD MODE
        await api.post(
          "/author-api/article",
          data
        );
        toast.success("Article published successfully");
      }
      navigate('/articles');
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto w-full">
      <div className="bg-white shadow-xl shadow-slate-200/50 rounded-3xl border border-slate-100 overflow-hidden">
        
        {/* Header */}
        <div className="bg-slate-50 border-b border-slate-100 p-8 md:p-10 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-100 text-brand-600 rounded-2xl mb-4 shadow-sm">
            <PenTool size={32} />
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            {editData ? "Edit Your Article" : "Write a New Article"}
          </h2>
          <p className="mt-2 text-slate-500">
            {editData ? "Make changes to your existing content." : "Share your knowledge and stories with the world."}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-8 md:p-10 space-y-8">
          
          {/* Title Input */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Article Title</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FileText className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="text"
                placeholder="Give it a catchy title..."
                className="appearance-none rounded-xl relative block w-full pl-12 px-4 py-4 border border-slate-300 placeholder-slate-400 text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 sm:text-lg font-medium transition-colors shadow-sm"
                {...register("title", { required: true })}
              />
            </div>
            {errors.title && <p className="text-red-500 text-sm mt-2 flex items-center gap-1"><span className="w-1 h-1 rounded-full bg-red-500"></span> Title is required</p>}
          </div>

          {/* Category Input */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Category</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Tag className="h-5 w-5 text-slate-400" />
              </div>
              <select
                className="appearance-none rounded-xl relative block w-full pl-12 px-4 py-4 border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 sm:text-base transition-colors shadow-sm bg-white"
                {...register("category", { required: true })}
              >
                <option value="" disabled selected>Select a category...</option>
                <option value="technology">Technology</option>
                <option value="programming">Programming</option>
                <option value="ai">Artificial Intelligence</option>
                <option value="news">News & Trends</option>
                <option value="lifestyle">Lifestyle</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
            {errors.category && <p className="text-red-500 text-sm mt-2 flex items-center gap-1"><span className="w-1 h-1 rounded-full bg-red-500"></span> Category is required</p>}
          </div>

          {/* Content Input */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Content</label>
            <div className="relative">
              <div className="absolute top-4 left-4 pointer-events-none">
                <AlignLeft className="h-5 w-5 text-slate-400" />
              </div>
              <textarea
                rows="12"
                placeholder="Write your amazing content here..."
                className="appearance-none rounded-xl relative block w-full pl-12 px-4 py-4 border border-slate-300 placeholder-slate-400 text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 sm:text-base transition-colors shadow-sm resize-y"
                {...register("content", { required: true })}
              />
            </div>
            {errors.content && <p className="text-red-500 text-sm mt-2 flex items-center gap-1"><span className="w-1 h-1 rounded-full bg-red-500"></span> Content is required</p>}
          </div>

          {/* Submit Button */}
          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              className="group inline-flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-200 shadow-lg hover:shadow-brand-500/30 w-full md:w-auto"
            >
              <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              {editData ? "Update Article" : "Publish Article"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default AddArticle;
