import React from 'react';
import { Shield } from 'lucide-react';

function AdminDashboard() {
  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto w-full text-center py-20">
      <div className="inline-flex items-center justify-center w-20 h-20 bg-indigo-100 text-indigo-600 rounded-full mb-6">
        <Shield size={40} />
      </div>
      <h1 className="text-3xl font-bold text-slate-900 mb-4">Admin Dashboard</h1>
      <p className="text-slate-500 max-w-lg mx-auto">
        This area is restricted to administrators. Administrative features will be implemented here.
      </p>
    </div>
  );
}

export default AdminDashboard;