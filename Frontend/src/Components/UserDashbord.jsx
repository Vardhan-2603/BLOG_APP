import React, { useEffect, useState } from 'react'
import { useAuth } from '../Store/AuthStore'
import { useNavigate } from 'react-router'
import { toast } from 'react-hot-toast'
import { BookOpen, UserCircle, Tag, ArrowRight, Compass } from 'lucide-react'
import api from "../APIs/axios";

function UserDashbord() {
  const logout = useAuth(state => state.logout)
  const currentUser = useAuth(state => state.currentUser)
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const getArticals = async () => {
      setLoading(true)
      try {
        const res = await api.get("/user-api/articles");
        setArticles(res.data.payload);
      } catch (err) {
        setError(err.response?.data?.error || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }
    getArticals();
  }, [])

  const navigateToArticleByID = (articleObj) => {
    navigate(`/article/${articleObj._id}`, {
      state: articleObj,
    });
  };

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto w-full">

      {/* Top Banner */}
      <div className="bg-gradient-to-r from-brand-600 to-indigo-600 rounded-2xl p-6 md:p-10 mb-10 text-white shadow-lg shadow-brand-500/20 flex flex-col md:flex-row justify-between items-center gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl"></div>
        
        <div className="z-10 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Welcome back, {currentUser.firstName}!</h1>
          <p className="text-brand-100 max-w-xl">Discover the latest articles, insights, and stories curated just for you.</p>
        </div>
        
        <div className="z-10 shrink-0">
          {currentUser?.profileImageUrl ? (
            <img
              src={currentUser.profileImageUrl}
              alt="profile"
              className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover border-4 border-white/30 shadow-xl"
            />
          ) : (
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/20 border-4 border-white/30 flex items-center justify-center shadow-xl">
              <UserCircle size={40} className="text-white" />
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 mb-8">
        <Compass className="text-brand-600" size={24} />
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">Explore Articles</h2>
      </div>

      {loading && (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-brand-600"></div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md mb-8">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {!loading && !error && articles.length === 0 && (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 border-dashed">
          <BookOpen size={48} className="mx-auto text-slate-300 mb-4" />
          <h3 className="text-lg font-medium text-slate-900 mb-1">No articles found</h3>
          <p className="text-slate-500">Check back later for new content.</p>
        </div>
      )}

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article) => (
          <div
            key={article._id}
            className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 hover:border-brand-200 transition-all duration-300 flex flex-col h-full group"
          >
            <div className="p-6 flex flex-col flex-grow">
              <div className="flex items-center gap-2 mb-4">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-brand-50 text-brand-700">
                  <Tag size={12} />
                  {article.category}
                </span>
              </div>
              
              <h3 className="text-xl font-bold mb-3 text-slate-900 line-clamp-2 group-hover:text-brand-600 transition-colors">
                {article.title}
              </h3>
              
              <p className="text-slate-600 mb-6 flex-grow line-clamp-3 leading-relaxed">
                {article.content}
              </p>
              
              <button 
                onClick={() => navigateToArticleByID(article)}
                className="mt-auto w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-slate-50 hover:bg-brand-50 text-slate-700 hover:text-brand-700 font-medium rounded-xl border border-slate-200 hover:border-brand-200 transition-colors"
              >
                Read Article
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}

export default UserDashbord