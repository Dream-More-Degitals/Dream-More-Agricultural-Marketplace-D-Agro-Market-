import { User, Mail, Phone, MapPin, Shield, Save } from 'lucide-react';

export default function FarmerProfile() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Farmer Profile & Settings</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your personal account details and farm location.</p>
        </div>
        <div className="flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1.5 rounded-xl text-xs font-bold border border-green-200">
          <Shield size={14} /> Verified Account
        </div>
      </div>

      <div className="bg-white p-8 rounded-2xl border border-gray-200 space-y-6">
        <div className="flex items-center gap-4 pb-6 border-b border-gray-100">
          <div className="w-16 h-16 rounded-full bg-orange-100 text-orange-600 font-extrabold flex items-center justify-center text-xl">
            AB
          </div>
          <div>
            <h2 className="text-lg font-bold">Abebe Bikila</h2>
            <p className="text-xs text-gray-500">Member since October 2025</p>
          </div>
        </div>

        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Full Name</label>
              <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5">
                <User size={16} className="text-gray-400 mr-2" />
                <input type="text" defaultValue="Abebe Bikila" className="w-full bg-transparent text-sm focus:outline-hidden" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Email Address</label>
              <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5">
                <Mail size={16} className="text-gray-400 mr-2" />
                <input type="email" defaultValue="abebe.bikila@agroai.et" className="w-full bg-transparent text-sm focus:outline-hidden" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Phone Number</label>
              <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5">
                <Phone size={16} className="text-gray-400 mr-2" />
                <input type="text" defaultValue="+251 91 234 5678" className="w-full bg-transparent text-sm focus:outline-hidden" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Farm Location / Region</label>
              <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5">
                <MapPin size={16} className="text-gray-400 mr-2" />
                <input type="text" defaultValue="Oromia Region, Debre Zeyit" className="w-full bg-transparent text-sm focus:outline-hidden" />
              </div>
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button type="submit" className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-sm shadow-orange-200 cursor-pointer">
              <Save size={16} /> Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}