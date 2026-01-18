import { ChevronLeft, ChevronRight, Home, MapPin, Phone, Users, X } from 'lucide-react';

const RoomDetailsModal = ({ room, onClose, currentImageIndex, setCurrentImageIndex }) => {
    const nextImage = () => {
        if (room.images && currentImageIndex < room.images.length - 1) {
            setCurrentImageIndex(currentImageIndex + 1);
        }
    };

    const prevImage = () => {
        if (currentImageIndex > 0) {
            setCurrentImageIndex(currentImageIndex - 1);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50">
            <div className="bg-[#1f1f1f] rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-[#2f2f2f]">
                <div className="sticky top-0 bg-[#1f1f1f] border-b border-[#2f2f2f] px-6 py-4 flex items-center justify-between z-10">
                    <h2 className="text-xl font-bold text-gray-100">{room.title}</h2>
                    <button onClick={onClose} className="p-2 hover:bg-[#2f2f2f] rounded-lg transition-colors">
                        <X className="w-5 h-5 text-gray-400" />
                    </button>
                </div>

                <div className="p-6">
                    {/* Image Gallery */}
                    {room.images && room.images.length > 0 && (
                        <div className="relative mb-6">
                            <div className="relative h-96 bg-[#2f2f2f] rounded-xl overflow-hidden">
                                <img
                                    src={room.images[currentImageIndex]}
                                    alt={room.title}
                                    className="w-full h-full object-cover"
                                />

                                {room.images.length > 1 && (
                                    <>
                                        <button
                                            onClick={prevImage}
                                            disabled={currentImageIndex === 0}
                                            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-[#1f1f1f] bg-opacity-90 hover:bg-opacity-100 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-all border border-[#3f3f3f]"
                                        >
                                            <ChevronLeft className="w-6 h-6 text-gray-300" />
                                        </button>
                                        <button
                                            onClick={nextImage}
                                            disabled={currentImageIndex === room.images.length - 1}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-[#1f1f1f] bg-opacity-90 hover:bg-opacity-100 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-all border border-[#3f3f3f]"
                                        >
                                            <ChevronRight className="w-6 h-6 text-gray-300" />
                                        </button>
                                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black bg-opacity-80 text-white px-3 py-1 rounded-full text-sm">
                                            {currentImageIndex + 1} / {room.images.length}
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Room Details */}
                    <div className="space-y-6">
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <div className="text-3xl font-bold text-indigo-500">
                                    ₹{room.price.toLocaleString()}<span className="text-lg text-gray-500">/month</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div className="flex items-center gap-3 p-3 bg-[#2f2f2f] rounded-lg border border-[#3f3f3f]">
                                    <Home className="w-5 h-5 text-indigo-400" />
                                    <div>
                                        <p className="text-xs text-gray-500">Property Type</p>
                                        <p className="font-semibold text-gray-100">{room.property_type}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-[#2f2f2f] rounded-lg border border-[#3f3f3f]">
                                    <Users className="w-5 h-5 text-indigo-400" />
                                    <div>
                                        <p className="text-xs text-gray-500">Tenant Preference</p>
                                        <p className="font-semibold text-gray-100">{room.tenant_preference}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-start gap-3">
                                    <MapPin className="w-5 h-5 text-indigo-400 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <p className="text-sm text-gray-500">Location</p>
                                        <p className="font-medium text-gray-200">{room.location}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <Phone className="w-5 h-5 text-indigo-400 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <p className="text-sm text-gray-500">Contact</p>
                                        <p className="font-medium text-gray-200">{room.contact}</p>
                                    </div>
                                </div>
                            </div>

                            {room.description && (
                                <div className="mt-6 pt-6 border-t border-[#2f2f2f]">
                                    <h3 className="font-semibold text-gray-100 mb-2">Description</h3>
                                    <p className="text-gray-400 leading-relaxed">{room.description}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RoomDetailsModal