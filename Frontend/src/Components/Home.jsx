import React from 'react';
import { Link } from 'react-router';
import { PenTool, BookOpen, Zap, ArrowRight } from 'lucide-react';

function Home() {
  return (
    <div className="flex flex-col gap-16 md:gap-24 pb-10">

      {/* Hero Section */}
      <section className="relative pt-12 md:pt-20 pb-16 px-4 md:px-6 bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden isolate">
        {/* Decorative background blob */}
        <div className="absolute top-[-10%] right-[-5%] w-[50%] h-[120%] bg-gradient-to-b from-brand-50 to-indigo-50/50 rounded-full blur-3xl -z-10 mix-blend-multiply opacity-70"></div>
        
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 text-brand-600 text-sm font-medium mb-8 border border-brand-100">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
            </span>
            Join the community of writers
          </div>
          
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight leading-tight">
            Discover, Read, and <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-indigo-500">
              Share Amazing Ideas
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            A premium platform for technology, programming, and lifestyle articles. 
            Whether you're a passionate reader or a creative author, ArticleHub is built for you.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/register"
              className="group inline-flex items-center justify-center gap-2 bg-brand-600 text-white px-8 py-3.5 rounded-full font-semibold hover:bg-brand-700 hover:shadow-lg hover:shadow-brand-500/25 transition-all duration-200"
            >
              Get Started for Free
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-full font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all duration-200 shadow-sm"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 md:px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight">
            Why Choose ArticleHub?
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg">
            Everything you need to write and consume high-quality content in one place.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          
          {/* Feature 1 */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md hover:border-brand-100 transition-all duration-300 group">
            <div className="w-12 h-12 bg-brand-50 text-brand-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <BookOpen size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Rich Content</h3>
            <p className="text-slate-600 leading-relaxed">
              Access high-quality articles across multiple categories like Web Development, AI, Python, and more. Curated just for you.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md hover:border-brand-100 transition-all duration-300 group">
            <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <PenTool size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Write & Share</h3>
            <p className="text-slate-600 leading-relaxed">
              Our intuitive author dashboard makes it incredibly easy to format, publish, and share your knowledge with the world.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md hover:border-brand-100 transition-all duration-300 group">
            <div className="w-12 h-12 bg-sky-50 text-sky-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <Zap size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Lightning Fast</h3>
            <p className="text-slate-600 leading-relaxed">
              Built on modern tech stack for a snappy, responsive experience. Say goodbye to slow-loading pages.
            </p>
          </div>

        </div>
      </section>

    </div>
  );
}

export default Home;