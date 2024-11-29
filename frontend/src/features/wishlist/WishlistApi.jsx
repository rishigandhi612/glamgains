import { axiosi } from '../../config/axios';

// Create a new wishlist item
export const createWishlistItem = async (data) => {
  try {
    const res = await axiosi.post("/wishlist", data);
    return res.data; // Return the created item
  } catch (error) {
    // Throw a specific error message if the request fails
    throw error.response?.data || error.message;
  }
};

// Fetch wishlist items by user ID
export const fetchWishlistByUserId = async (id) => {
  try {
    const res = await axiosi.get(`/wishlist/user/${id}`);
    
    // Get the total results from the response headers
    const totalResults = res.headers['x-total-count'] || 0; // Default to 0 if header is not present

    // Return the wishlist items and the total results
    return {
      data: res.data,       // Items in the wishlist
      totalResults: totalResults // Total results count
    };
  } catch (error) {
    // Throw a specific error message if the request fails
    throw error.response?.data || error.message;
  }
};

// Update an existing wishlist item by its ID
export const updateWishlistItemById = async (update) => {
  try {
    // Make a patch request to update the item
    const res = await axiosi.patch(`/wishlist/${update._id}`, update);
    return res.data; // Return the updated item
  } catch (error) {
    // Throw a specific error message if the request fails
    throw error.response?.data || error.message;
  }
};

// Delete a wishlist item by its ID
export const deleteWishlistItemById = async (id) => {
  try {
    // Make a delete request to remove the item
    const res = await axiosi.delete(`/wishlist/${id}`);
    return res.data; // Return the deleted item info (if any)
  } catch (error) {
    // Throw a specific error message if the request fails
    throw error.response?.data || error.message;
  }
};
