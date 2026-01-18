import { Filter, Plus, Search } from 'lucide-react';
import { useState } from 'react'

const FilterSearch = ({filters, setFilters, view, setShowAddModal, setEditingRoom}) => {
    const [showFilters, setShowFilters] = useState(false);
    
  return (
    <div className="bg-[#1f1f1f] rounded-xl shadow-lg p-4 mb-6 border border-gray-600">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex-1 min-w-[250px] relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="Search by location..."
                value={filters.location}
                onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                className="w-full pl-10 pr-4 py-2.5 bg-[#2f2f2f] border border-[#3f3f3f] text-gray-100 placeholder-gray-500 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
              />
            </div>
            
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-2.5 bg-[#2f2f2f] hover:bg-[#3f3f3f] text-gray-300 rounded-lg font-medium flex items-center gap-2 transition-colors border border-[#3f3f3f]"
            >
              <Filter className="w-5 h-5" />
              Filters
            </button>

            {view === 'owner' && (
              <button
                onClick={() => {
                  setEditingRoom(null);
                  setShowAddModal(true);
                }}
                className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium flex items-center gap-2 transition-colors"
              >
                <Plus className="w-5 h-5" />
                Add Room
              </button>
            )}
          </div>

          {/* Extended Filters */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-[#2f2f2f] grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Min Price</label>
                <input
                  type="number"
                  placeholder="₹5,000"
                  value={filters.minPrice}
                  onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                  className="w-full px-3 py-2 bg-[#2f2f2f] border border-[#3f3f3f] text-gray-100 placeholder-gray-500 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Max Price</label>
                <input
                  type="number"
                  placeholder="₹50,000"
                  value={filters.maxPrice}
                  onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                  className="w-full px-3 py-2 bg-[#2f2f2f] border border-[#3f3f3f] text-gray-100 placeholder-gray-500 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Property Type</label>
                <select
                  value={filters.propertyType}
                  onChange={(e) => setFilters({ ...filters, propertyType: e.target.value })}
                  className="w-full px-3 py-2 bg-[#2f2f2f] border border-[#3f3f3f] text-gray-100 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                >
                  <option value="">All Types</option>
                  <option value="1BHK">1 BHK</option>
                  <option value="2BHK">2 BHK</option>
                  <option value="3BHK">3 BHK</option>
                  <option value="1Bed">1 Bed</option>
                  <option value="2Bed">2 Bed</option>
                  <option value="3Bed">3 Bed</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Tenant Preference</label>
                <select
                  value={filters.tenantPreference}
                  onChange={(e) => setFilters({ ...filters, tenantPreference: e.target.value })}
                  className="w-full px-3 py-2 bg-[#2f2f2f] border border-[#3f3f3f] text-gray-100 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                >
                  <option value="">All Preferences</option>
                  <option value="Bachelor">Bachelor</option>
                  <option value="Family">Family</option>
                  <option value="Girls">Girls</option>
                  <option value="Working">Working</option>
                </select>
              </div>
            </div>
          )}
        </div>
  )
}

export default FilterSearch