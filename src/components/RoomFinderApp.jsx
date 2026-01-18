import React, { useState, useEffect } from 'react';
import { Home } from 'lucide-react';
import { supabase } from '../supabase/supabaseClient';
import * as roomService from '../services/roomService';
import Header from './Header';
import FilterSearch from './FilterSearch';
import RoomCard from './RoomCard';
import RoomFormModal from './RoomFormModal';
import RoomDetailsModal from './RoomDetailsModal';

export default function RoomFinderApp() {
  const [currentUser, setCurrentUser] = useState(null);
  const [view, setView] = useState('finder');
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [filters, setFilters] = useState({
    location: '',
    minPrice: '',
    maxPrice: '',
    propertyType: '',
    tenantPreference: ''
  });

  
  useEffect(() => {
    const getCurrentUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setCurrentUser(user);
    };
    getCurrentUser();
  }, []);

  
  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    setLoading(true);
    const data = await roomService.getRooms();
    setRooms(data);
    setLoading(false);
  };

  const handleAddRoom = async (roomData) => {
    try {
      const newRoom = await roomService.addRoom(roomData, currentUser.id);
      setRooms([newRoom, ...rooms]);
      setShowAddModal(false);
      setEditingRoom(null);
    } catch (error) {
      alert('Error adding room: ' + error.message);
    }
  };

  const handleUpdateRoom = async (roomData) => {
    try {
      const updatedRoom = await roomService.updateRoom(editingRoom.id, roomData);
      setRooms(rooms.map(room => room.id === updatedRoom.id ? updatedRoom : room));
      setShowAddModal(false);
      setEditingRoom(null);
    } catch (error) {
      alert('Error updating room: ' + error.message);
    }
  };

  const handleDeleteRoom = async (roomId, images) => {
    if (window.confirm('Are you sure you want to delete this room?')) {
      try {
        await roomService.deleteRoom(roomId, images);
        setRooms(rooms.filter(room => room.id !== roomId));
      } catch (error) {
        alert('Error deleting room: ' + error.message);
      }
    }
  };

  const filteredRooms = rooms.filter(room => {
    if (view === 'owner' && room.owner_id !== currentUser?.id) return false;
    
    if (filters.location && !room.location.toLowerCase().includes(filters.location.toLowerCase())) return false;
    if (filters.minPrice && room.price < parseInt(filters.minPrice)) return false;
    if (filters.maxPrice && room.price > parseInt(filters.maxPrice)) return false;
    if (filters.propertyType && room.property_type !== filters.propertyType) return false;
    if (filters.tenantPreference && room.tenant_preference !== filters.tenantPreference) return false;
    
    return true;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1b1b1b] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading rooms...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#1b1b1b] min-h-screen">
      <Header view={view} setView={setView} />

      <main className="max-w-7xl mx-auto px-4 py-6">
        <FilterSearch 
          filters={filters} 
          setFilters={setFilters}
          view={view}
          setShowAddModal={setShowAddModal}
          setEditingRoom={setEditingRoom}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRooms.map((room, index) => (
            <div
              key={room.id}
              className="animate-scale-in"
              style={{
                animationDelay: `${index * 0.1}s`,
                animationFillMode: 'backwards'
              }}
            >
              <RoomCard
                room={room}
                isOwner={view === 'owner'}
                onEdit={() => {
                  setEditingRoom(room);
                  setShowAddModal(true);
                }}
                onDelete={() => handleDeleteRoom(room.id, room.images)}
                onView={() => setSelectedRoom(room)}
              />
            </div>
          ))}
        </div>

        {filteredRooms.length === 0 && (
          <div className="text-center py-16">
            <Home className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-300 mb-2">No rooms found</h3>
            <p className="text-gray-500">
              {view === 'owner'
                ? 'Start by adding your first room listing'
                : 'Try adjusting your filters or search criteria'}
            </p>
          </div>
        )}
      </main>

      {showAddModal && (
        <RoomFormModal
          room={editingRoom}
          currentUser={currentUser}
          onClose={() => {
            setShowAddModal(false);
            setEditingRoom(null);
          }}
          onSave={(roomData) => {
            if (editingRoom) {
              handleUpdateRoom(roomData);
            } else {
              handleAddRoom(roomData);
            }
          }}
        />
      )}

      {selectedRoom && (
        <RoomDetailsModal
          room={selectedRoom}
          onClose={() => {
            setSelectedRoom(null);
            setCurrentImageIndex(0);
          }}
          currentImageIndex={currentImageIndex}
          setCurrentImageIndex={setCurrentImageIndex}
        />
      )}
    </div>
  );
}