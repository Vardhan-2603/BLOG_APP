import {useEffect,useState} from 'react'
import { useNavigate } from 'react-router'
import { useAuth } from '../Store/AuthStore'
import { Edit3, Trash2, Calendar, Tag, FileText } from 'lucide-react';
import api from "../APIs/axios";

function Articles() {
  const navigate = useNavigate();
  const user = useAuth((state) => state.currentUser);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) return;
    const getAuthorArticles = async () => {
      setLoading(true);
      try {
        const res = await api.get("/author-api/articles");
        setArticles(res.data.payload);
      } catch (err) {
        console.log(err);
        setError(err.response?.data?.error || "Failed to fetch articles");
      } finally {
        setLoading(false);
      }
    };
    getAuthorArticles();
  }, [user]);

  const handleDelete = async (id) => {
    try {
      await api.patch(`/author-api/articles/${id}/status`, {
        isArticalActive: false
      });
      setArticles(prev => prev.filter(a => a._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = (article) => {
    navigate('/addartical', { state: article });
  };

  return(
    <div className="w-full">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-brand-100 text-brand-600 rounded-lg">
          <FileText size={24} />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">My Articles</h2>
      </div>

      {loading && (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-brand-600"></div>
        </div>
      )}
      
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md mb-6">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {articles.length === 0 && !loading && !error && (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 border-dashed">
          <FileText size={48} className="mx-auto text-slate-300 mb-4" />
          <h3 className="text-lg font-medium text-slate-900 mb-1">No articles yet</h3>
          <p className="text-slate-500">Start writing to see your articles here.</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <div key={article._id} className="bg-white p-6 shadow-sm rounded-2xl border border-slate-200 flex flex-col group hover:shadow-md hover:border-brand-200 transition-all duration-300">
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-indigo-50 text-indigo-700">
                <Tag size={12} />
                {article.category}
              </span>
              <span className="inline-flex items-center gap-1 text-xs text-slate-500 ml-auto">
                <Calendar size={12} />
                {new Date(article.createdAt).toLocaleDateString()}
              </span>
            </div>
            
            <h3 className="text-xl font-bold mb-2 text-slate-900 line-clamp-2 group-hover:text-brand-600 transition-colors">
              {article.title}
            </h3>
            
            <p className="text-slate-600 mb-6 flex-grow line-clamp-3 text-sm leading-relaxed">
              {article.content}
            </p>

            <div className="flex gap-3 mt-auto pt-4 border-t border-slate-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button 
                onClick={() => handleEdit(article)}
                className="flex-1 flex items-center justify-center gap-2 bg-amber-50 hover:bg-amber-100 text-amber-700 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                <Edit3 size={16} />
                Edit
              </button>

              <button 
                onClick={() => handleDelete(article._id)}
                className="flex-1 flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-700 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                <Trash2 size={16} />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Articles;