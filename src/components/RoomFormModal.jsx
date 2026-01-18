import { Upload, X } from "lucide-react";
import { useState } from "react";
import { uploadImages } from "../services/roomService";

const RoomFormModal = ({ room, currentUser, onClose, onSave }) => {
  const [formData, setFormData] = useState(room || {
    title: '',
    location: '',
    price: '',
    propertyType: '1BHK',
    tenantPreference: 'Bachelor',
    contact: '',
    images: [],
    description: ''
  });
  const [uploading, setUploading] = useState(false);
  const [newImageFiles, setNewImageFiles] = useState([]); 
  const [previewImages, setPreviewImages] = useState(room?.images || []); 

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    
    
    setNewImageFiles([...newImageFiles, ...files]);
    
    
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImages(prev => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index) => {
    setPreviewImages(previewImages.filter((_, i) => i !== index));
    
    
    const existingImagesCount = room?.images?.length || 0;
    if (index >= existingImagesCount) {
      
      const newFileIndex = index - existingImagesCount;
      setNewImageFiles(newImageFiles.filter((_, i) => i !== newFileIndex));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    try {
      let imageUrls = [];

      
      if (room?.images) {
        imageUrls = previewImages.filter(url => 
          typeof url === 'string' && url.startsWith('http')
        );
      }

      
      if (newImageFiles.length > 0) {
        const uploadedUrls = await uploadImages(newImageFiles, currentUser.id);
        imageUrls = [...imageUrls, ...uploadedUrls];
      }

      onSave({
        title: formData.title,
        location: formData.location,
        price: parseInt(formData.price),
        propertyType: formData.propertyType,
        tenantPreference: formData.tenantPreference,
        contact: formData.contact,
        description: formData.description,
        images: imageUrls
      });
    } catch (error) {
      console.error('Error:', error);
      alert('Error uploading images: ' + error.message);
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50">
      <div className="bg-[#1f1f1f] rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-[#2f2f2f]">
        <div className="sticky top-0 bg-[#1f1f1f] border-b border-[#2f2f2f] px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-100">
            {room ? 'Edit Room' : 'Add New Room'}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-[#2f2f2f] rounded-lg transition-colors" disabled={uploading}>
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Title *</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 bg-[#2f2f2f] border border-[#3f3f3f] text-gray-100 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none placeholder-gray-500"
              placeholder="e.g., Spacious 2BHK in Downtown"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Location *</label>
            <input
              type="text"
              required
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full px-3 py-2 bg-[#2f2f2f] border border-[#3f3f3f] text-gray-100 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none placeholder-gray-500"
              placeholder="e.g., Koramangala, Bangalore"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Rent (₹/month) *</label>
              <input
                type="number"
                required
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full px-3 py-2 bg-[#2f2f2f] border border-[#3f3f3f] text-gray-100 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none placeholder-gray-500"
                placeholder="15000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Contact Number *</label>
              <input
                type="tel"
                required
                value={formData.contact}
                onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                className="w-full px-3 py-2 bg-[#2f2f2f] border border-[#3f3f3f] text-gray-100 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none placeholder-gray-500"
                placeholder="9876543210"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Property Type *</label>
              <select
                required
                value={formData.propertyType}
                onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                className="w-full px-3 py-2 bg-[#2f2f2f] border border-[#3f3f3f] text-gray-100 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
              >
                <option value="1BHK">1 BHK</option>
                <option value="2BHK">2 BHK</option>
                <option value="3BHK">3 BHK</option>
                <option value="1Bed">1 Bed</option>
                <option value="2Bed">2 Bed</option>
                <option value="3Bed">3 Bed</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Tenant Preference *</label>
              <select
                required
                value={formData.tenantPreference}
                onChange={(e) => setFormData({ ...formData, tenantPreference: e.target.value })}
                className="w-full px-3 py-2 bg-[#2f2f2f] border border-[#3f3f3f] text-gray-100 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
              >
                <option value="Bachelor">Bachelor</option>
                <option value="Family">Family</option>
                <option value="Girls">Girls</option>
                <option value="Working">Working</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 bg-[#2f2f2f] border border-[#3f3f3f] text-gray-100 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none placeholder-gray-500"
              placeholder="Describe your property..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Images</label>
            <div className="border-2 border-dashed border-[#3f3f3f] rounded-lg p-4 text-center hover:border-indigo-500 transition-colors bg-[#2f2f2f]">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
                disabled={uploading}
              />
              <label htmlFor="image-upload" className={uploading ? 'cursor-not-allowed' : 'cursor-pointer'}>
                <Upload className="w-8 h-8 text-gray-500 mx-auto mb-2" />
                <p className="text-sm text-gray-400">Click to upload images</p>
                <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 10MB</p>
              </label>
            </div>

            {previewImages.length > 0 && (
              <div className="grid grid-cols-4 gap-2 mt-3">
                {previewImages.map((img, index) => (
                  <div key={index} className="relative group">
                    <img 
                      src={img} 
                      alt={`Preview ${index + 1}`} 
                      className="w-full h-20 object-cover rounded-lg border border-[#3f3f3f]" 
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      disabled={uploading}
                      className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity disabled:cursor-not-allowed"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={uploading}
              className="flex-1 px-4 py-2.5 bg-[#2f2f2f] hover:bg-[#3f3f3f] text-gray-300 rounded-lg font-medium transition-colors border border-[#3f3f3f] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={uploading}
              className="flex-1 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {uploading && (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              )}
              {uploading ? 'Uploading...' : (room ? 'Update Room' : 'Add Room')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RoomFormModal;