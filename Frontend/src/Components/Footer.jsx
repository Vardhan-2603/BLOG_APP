import React from 'react';
import { BookOpen, Github, Twitter } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <BookOpen size={20} className="text-brand-500" />
          <span className="font-bold text-slate-800 tracking-tight">ArticleHub</span>
        </div>
        
        <p className="text-sm text-slate-500">
          © {new Date().getFullYear()} ArticleHub. All rights reserved.
        </p>

        <div className="flex items-center gap-4 text-slate-400">
          <a href="#" className="hover:text-brand-500 transition-colors">
            <Twitter size={18} />
          </a>
          <a href="#" className="hover:text-brand-500 transition-colors">
            <Github size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;