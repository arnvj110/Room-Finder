import { supabase } from "../supabase/supabaseClient";


// Upload image to Supabase Storage
export const uploadImage = async (file, userId) => {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}/${Date.now()}.${fileExt}`;
    
    const { data, error } = await supabase.storage
      .from('room-images')
      .upload(fileName, file);

    if (error) throw error;

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('room-images')
      .getPublicUrl(fileName);

    return publicUrl;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};

// Upload multiple images
export const uploadImages = async (files, userId) => {
  try {
    const uploadPromises = files.map(file => uploadImage(file, userId));
    const urls = await Promise.all(uploadPromises);
    return urls;
  } catch (error) {
    console.error('Error uploading images:', error);
    throw error;
  }
};

// Get all rooms
export const getRooms = async () => {
  try {
    const { data, error } = await supabase
      .from('rooms')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching rooms:', error);
    return [];
  }
};

// Get rooms by owner
export const getRoomsByOwner = async (ownerId) => {
  try {
    const { data, error } = await supabase
      .from('rooms')
      .select('*')
      .eq('owner_id', ownerId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching owner rooms:', error);
    return [];
  }
};

// Add new room
export const addRoom = async (roomData, userId) => {
  try {
    const { data, error } = await supabase
      .from('rooms')
      .insert([
        {
          owner_id: userId,
          title: roomData.title,
          location: roomData.location,
          price: roomData.price,
          property_type: roomData.propertyType,
          tenant_preference: roomData.tenantPreference,
          contact: roomData.contact,
          description: roomData.description,
          images: roomData.images || []
        }
      ])
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error adding room:', error);
    throw error;
  }
};

// Update room
export const updateRoom = async (roomId, roomData) => {
  try {
    const { data, error } = await supabase
      .from('rooms')
      .update({
        title: roomData.title,
        location: roomData.location,
        price: roomData.price,
        property_type: roomData.propertyType,
        tenant_preference: roomData.tenantPreference,
        contact: roomData.contact,
        description: roomData.description,
        images: roomData.images || [],
        updated_at: new Date().toISOString()
      })
      .eq('id', roomId)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error updating room:', error);
    throw error;
  }
};

// Delete room (and its images)
export const deleteRoom = async (roomId, images) => {
  try {
    // Delete images from storage
    if (images && images.length > 0) {
      const filePaths = images.map(url => {
        const urlParts = url.split('/room-images/');
        return urlParts[1];
      });

      await supabase.storage
        .from('room-images')
        .remove(filePaths);
    }

    // Delete room from database
    const { error } = await supabase
      .from('rooms')
      .delete()
      .eq('id', roomId);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error deleting room:', error);
    throw error;
  }
};