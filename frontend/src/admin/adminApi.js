export const admin = {
  getDashboard: async () => {
    const res = await fetch('/api/admin/dashboard');
    return res.json();
  },
  getProducts: async (params) => {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`/api/admin/products?${query}`);
    return res.json();
  },
  getProduct: async (id) => {
    const res = await fetch(`/api/admin/products/${id}`);
    return res.json();
  },
  createProduct: async (data) => {
    const res = await fetch('/api/admin/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },
  updateProduct: async (id, data) => {
    const res = await fetch(`/api/admin/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },
  deleteProduct: async (id) => {
    const res = await fetch(`/api/admin/products/${id}`, { method: 'DELETE' });
    return res.json();
  },
  bulkDeleteProducts: async (ids) => {
    const res = await fetch('/api/admin/products/bulk-delete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ids }),
    });
    return res.json();
  },
  updateProductStatus: async (ids, status) => {
    const res = await fetch('/api/admin/products/bulk-status', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ids, status }),
    });
    return res.json();
  },
  duplicateProduct: async (id) => {
    const res = await fetch(`/api/admin/products/${id}/duplicate`, { method: 'POST' });
    return res.json();
  },
  getCategories: async (params) => {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`/api/admin/categories?${query}`);
    return res.json();
  },
  getAllCategories: async () => {
    const res = await fetch('/api/admin/categories/all');
    return res.json();
  },
  createCategory: async (data) => {
    const res = await fetch('/api/admin/categories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },
  updateCategory: async (id, data) => {
    const res = await fetch(`/api/admin/categories/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },
  deleteCategory: async (id) => {
    const res = await fetch(`/api/admin/categories/${id}`, { method: 'DELETE' });
    return res.json();
  },
  getOrders: async (params) => {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`/api/admin/orders?${query}`);
    return res.json();
  },
  getOrder: async (id) => {
    const res = await fetch(`/api/admin/orders/${id}`);
    return res.json();
  },
  updateOrderStatus: async (id, data) => {
    const res = await fetch(`/api/admin/orders/${id}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },
  getUsers: async (params) => {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`/api/admin/users?${query}`);
    return res.json();
  },
  updateUserRole: async (id, role) => {
    const res = await fetch(`/api/admin/users/${id}/role`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role }),
    });
    return res.json();
  },
};
