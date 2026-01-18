import { Edit2, Home, MapPin, Phone, Trash2, Users } from 'lucide-react';

const RoomCard = ({ room, isOwner, onEdit, onDelete, onView }) => {
  return (
    <div className="bg-[#2f2f2f] rounded-xl shadow-xl overflow-hidden hover:shadow-xl transition-all cursor-pointer border border-gray-700 hover:border-[#3f3f3f] hover:scale-105">
      <div className="relative h-48 bg-[#2f2f2f]" onClick={onView}>
        {room.images && room.images[0] ? (
          <img src={room.images[0]} alt={room.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Home className="w-16 h-16 text-gray-600" />
          </div>
        )}
        <div className="absolute top-3 right-3 bg-indigo-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
          ₹{room.price.toLocaleString()}/mo
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-bold text-lg text-gray-100 mb-2 truncate">{room.title}</h3>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-gray-400">
            <MapPin className="w-4 h-4 flex-shrink-0 text-indigo-400" />
            <span className="text-sm truncate">{room.location}</span>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <Home className="w-4 h-4 text-indigo-400" />
              <span className="text-sm text-gray-400">{room.property_type}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Users className="w-4 h-4 text-indigo-400" />
              <span className="text-sm text-gray-400">{room.tenant_preference}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-gray-400">
            <Phone className="w-4 h-4 flex-shrink-0 text-indigo-400" />
            <span className="text-sm">{room.contact}</span>
          </div>
        </div>

        {isOwner && (
          <div className="flex gap-2 pt-3 border-t border-[#2f2f2f]">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit();
              }}
              className="flex-1 px-3 py-2 bg-indigo-600 bg-opacity-20 hover:bg-opacity-30 text-indigo-100 rounded-lg font-medium flex items-center justify-center gap-2 transition-all border border-indigo-600 border-opacity-30"
            >
              <Edit2 className="w-4 h-4" />
              Edit
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
              className="flex-1 px-3 py-2 bg-red-600 bg-opacity-20 hover:bg-opacity-30 text-red-100 rounded-lg font-medium flex items-center justify-center gap-2 transition-all border border-red-600 border-opacity-30"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default RoomCard