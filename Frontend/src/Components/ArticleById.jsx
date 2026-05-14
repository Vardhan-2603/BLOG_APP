import { useParams, useLocation, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { useForm } from 'react-hook-form'
import { useAuth } from "../Store/AuthStore"
import toast from "react-hot-toast";
import { User, Tag, Calendar, MessageSquare, Send } from 'lucide-react';
import api from "../APIs/axios";

function ArticleById() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();
  const user = useAuth((state) => state.currentUser);
  const [article, setArticle] = useState(location.state || null);
  const [loading, setLoading] = useState(!location.state);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Only fetch if we don't have the full article from state or if we want fresh comments
    const getArticle = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/user-api/article/${id}`);
        setArticle(res.data.payload);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to load article");
      } finally {
        setLoading(false);
      }
    };
    getArticle();
  }, [id]);

  const addComment = async (commentObj) => {
    try {
      commentObj.articleId = article._id;
      const res = await api.put("/user-api/articleComment", commentObj);
      if (res.status === 200) {
        toast.success(res.data.message);
        setArticle(res.data.payload);
        reset(); // Clear the input field
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add comment");
    }
  };

  if (loading) return (
    <div className="flex justify-center py-20">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-600"></div>
    </div>
  );
  
  if (error) return (
    <div className="max-w-3xl mx-auto p-6 mt-10">
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
        <p>{error}</p>
      </div>
    </div>
  );
  
  if (!article) return null;

  return (
    <div className="max-w-4xl mx-auto w-full">
      <div className="bg-white shadow-sm border border-slate-200 rounded-2xl overflow-hidden">
        
        {/* Article Header */}
        <div className="px-6 py-8 md:px-10 md:py-12 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2 mb-6">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-brand-100 text-brand-700">
              <Tag size={14} />
              {article.category}
            </span>
            <span className="inline-flex items-center gap-1 text-sm text-slate-500">
              <Calendar size={14} />
              {new Date(article.createdAt || Date.now()).toLocaleDateString()}
            </span>
          </div>
          
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-8 tracking-tight leading-tight">
            {article.title}
          </h1>
          
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-lg">
              {article.author?.firstName?.charAt(0) || <User size={20} />}
            </div>
            <div>
              <p className="font-semibold text-slate-900">{article.author?.firstName} {article.author?.lastName}</p>
              <p className="text-sm text-slate-500">{article.author?.email}</p>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div className="px-6 py-8 md:px-10 md:py-12 prose prose-slate max-w-none prose-lg">
          <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">
            {article.content}
          </p>
        </div>

        {/* Comments Section */}
        <div className="bg-slate-50 border-t border-slate-200 px-6 py-8 md:px-10">
          <div className="flex items-center gap-2 mb-6">
            <MessageSquare className="text-brand-600" size={24} />
            <h2 className="text-2xl font-bold text-slate-900">Comments ({article.comments?.length || 0})</h2>
          </div>

          {/* Comment Form */}
          {user?.role === "USER" && (
            <form onSubmit={handleSubmit(addComment)} className="mb-8">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  {...register("comment", { required: true })}
                  placeholder="Share your thoughts..."
                  className="flex-grow px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-shadow"
                />
                <button 
                  type="submit" 
                  className="inline-flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-700 text-white px-6 py-3 rounded-xl font-medium transition-colors shadow-sm"
                >
                  <Send size={18} />
                  Post
                </button>
              </div>
            </form>
          )}

          {/* Comments List */}
          <div className="space-y-4">
            {article.comments && article.comments.length > 0 ? (
              article.comments.map((c) => (
                <div key={c._id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                  <p className="text-slate-800 mb-2">{c.comment}</p>
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <User size={14} />
                    <span className="font-medium text-slate-700">{c.user?.firstName}</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-slate-500 italic">No comments yet. Be the first to share your thoughts!</p>
            )}
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default ArticleById;