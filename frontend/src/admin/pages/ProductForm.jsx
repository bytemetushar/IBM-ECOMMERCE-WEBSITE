import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Save, ArrowLeft, Package, DollarSign, Layers, Sparkles } from 'lucide-react';
import { useToast } from '../components/Toast';
import { admin } from '../adminApi';

export default function ProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const addToast = useToast();
  const isEditing = !!id;

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: '', slug: '', description: '', shortDescription: '',
    price: '', salePrice: '', category: '', brand: '', stock: 1, sku: '', thumbnail: '', status: 'active'
  });

  useEffect(() => {
    loadCategories();
    if (isEditing) loadProduct();
  }, [id]);

  const loadCategories = async () => {
    try {
      const res = await admin.getAllCategories();
      setCategories(res.categories || []);
    } catch (_) {}
  };

  const loadProduct = async () => {
    try {
      setLoading(true);
      const res = await admin.getProduct(id);
      const p = res.product;
      setForm({
        name: p.name || '',
        slug: p.slug || '',
        description: p.description || '',
        shortDescription: p.shortDescription || '',
        price: p.price || '',
        salePrice: p.salePrice || '',
        category: p.category?._id || '',
        brand: p.brand || '',
        stock: p.stock || 0,
        sku: p.sku || '',
        thumbnail: p.thumbnail || '',
        status: p.status || 'active'
      });
    } catch (err) {
      addToast(err.message, 'error');
      navigate('/admin/products');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    const data = {
      ...form,
      price: Number(form.price),
      salePrice: form.salePrice ? Number(form.salePrice) : undefined,
      stock: Number(form.stock),
    };

    try {
      if (isEditing) {
        await admin.updateProduct(id, data);
        addToast('Product updated successfully', 'success');
      } else {
        await admin.createProduct(data);
        addToast('Product created successfully', 'success');
      }
      navigate('/admin/products');
    } catch (err) {
      addToast(err.message, 'error');
    } finally {
      setSaving(false);
    }
  };

  const inputClass = 'w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500';
  const labelClass = 'block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5';

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-3.5">
        <button onClick={() => navigate('/admin/products')} className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500">
          <ArrowLeft size={18} />
        </button>
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {isEditing ? 'Edit Product' : 'Add New Product'}
          </h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 space-y-4 shadow-xs">
          <h2 className="text-sm font-extrabold text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className={labelClass}>Product Name *</label>
              <input name="name" value={form.name} onChange={handleChange} className={inputClass} required />
            </div>
            <div>
              <label className={labelClass}>SKU</label>
              <input name="sku" value={form.sku} onChange={handleChange} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Brand</label>
              <input name="brand" value={form.brand} onChange={handleChange} className={inputClass} />
            </div>
            <div className="md:col-span-2">
              <label className={labelClass}>Description *</label>
              <textarea name="description" value={form.description} onChange={handleChange} rows={4} className={inputClass} required />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 space-y-4 shadow-xs">
          <h2 className="text-sm font-extrabold text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800">Pricing & Stock</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className={labelClass}>Price (₹) *</label>
              <input name="price" type="number" value={form.price} onChange={handleChange} className={inputClass} required />
            </div>
            <div>
              <label className={labelClass}>Sale Price (₹)</label>
              <input name="salePrice" type="number" value={form.salePrice} onChange={handleChange} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Stock *</label>
              <input name="stock" type="number" value={form.stock} onChange={handleChange} className={inputClass} required />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button type="button" onClick={() => navigate('/admin/products')} className="px-4 py-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-bold">Cancel</button>
          <button type="submit" disabled={saving} className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-md">
            <Save size={16} /> Save Product
          </button>
        </div>
      </form>
    </div>
  );
}
