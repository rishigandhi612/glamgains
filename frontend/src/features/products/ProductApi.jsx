import { axiosi } from "../../config/axios";

// Add a new product
export const addProduct = async (data) => {
  try {
    const res = await axiosi.post('/products', data);
    return res.data;
  } catch (error) {
    throw error.response?.data || error.message; // Safely access error message
  }
};

// Fetch products with filters (brand, category, pagination, etc.)
export const fetchProducts = async (filters) => {
  try {
    // Use URLSearchParams to build the query string
    const queryParams = new URLSearchParams();

    if (filters.brand) {
      filters.brand.forEach(brand => queryParams.append('brand', brand));
    }

    if (filters.category) {
      filters.category.forEach(category => queryParams.append('category', category));
    }

    if (filters.pagination) {
      queryParams.append('page', filters.pagination.page);
      queryParams.append('limit', filters.pagination.limit);
    }

    if (filters.sort) {
      queryParams.append('sort', filters.sort.sort);
      queryParams.append('order', filters.sort.order);
    }

    if (filters.user) {
      queryParams.append('user', filters.user);
    }

    // Make the API request
    const res = await axiosi.get(`/products?${queryParams.toString()}`);

    // Get the total count from response headers
    const totalResults = res.headers['x-total-count'] || 0; // Default to 0 if header is missing

    return { data: res.data, totalResults };
  } catch (error) {
    throw error.response?.data || error.message; // Safely handle errors
  }
};

// Fetch product by ID
export const fetchProductById = async (id) => {
  try {
    const res = await axiosi.get(`/products/${id}`);
    return res.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Update an existing product by ID
export const updateProductById = async (update) => {
  try {
    const res = await axiosi.patch(`/products/${update._id}`, update);
    return res.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Undelete a product by ID
export const undeleteProductById = async (id) => {
  try {
    const res = await axiosi.patch(`/products/undelete/${id}`);
    return res.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Delete a product by ID
export const deleteProductById = async (id) => {
  try {
    const res = await axiosi.delete(`/products/${id}`);
    return res.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
