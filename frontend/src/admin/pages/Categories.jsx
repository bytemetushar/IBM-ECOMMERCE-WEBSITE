import { useState, useEffect, useCallback } from 'react';
import { Plus, Edit, Trash2, AlertTriangle, Sparkles } from 'lucide-react';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import { useToast } from '../components/Toast';
import { admin } from '../adminApi';

export default function Categories() {
  const addToast = useToast();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [form, setForm] = useState({ name: '', slug: '', description: '', status: 'active' });

  const loadCategories = useCallback(async (p = page, s = search) => {
    try {
      setLoading(true);
      const res = await admin.getCategories({ page: p, limit: 15, search: s });
      setCategories(res.categories || []);
      setPage(res.pagination?.page || 1);
      setPages(res.pagination?.pages || 1);
    } catch (err) {
      addToast(err.message, 'error');
    } finally {
      setLoading(false);
    }
  }, [page, search]);

  useEffect(() => {
    loadCategories();
  }, [page]);

  const openCreate = () => {
    setEditing(null);
    setForm({ name: '', slug: '', description: '', status: 'active' });
    setShowModal(true);
  };

  const openEdit = (cat) => {
    setEditing(cat._id);
    setForm({ name: cat.name || '', slug: cat.slug || '', description: cat.description || '', status: cat.status || 'active' });
    setShowModal(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await admin.updateCategory(editing, form);
        addToast('Category updated', 'success');
      } else {
        await admin.createCategory(form);
        addToast('Category created', 'success');
      }
      setShowModal(false);
      loadCategories(1, search);
    } catch (err) {
      addToast(err.message, 'error');
    }
  };

  const handleDelete = async () => {
    try {
      await admin.deleteCategory(deleteId);
      addToast('Category deleted', 'success');
      setDeleteId(null);
      loadCategories();
    } catch (err) {
      addToast(err.message, 'error');
    }
  };

  const columns = [
    { key: 'name', label: 'Category Name', render: (row) => <span className="font-bold text-xs">{row.name}</span> },
    { key: 'slug', label: 'Slug', render: (row) => <span className="font-mono text-xs text-slate-400">{row.slug}</span> },
    { key: 'productCount', label: 'Products', render: (row) => <span className="font-bold text-xs">{row.productCount || 0}</span> },
    { key: 'status', label: 'Status', render: (row) => <span className="text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase bg-emerald-50 text-emerald-600 border border-emerald-200">{row.status}</span> },
    { key: 'actions', label: 'Actions', render: (row) => (
      <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
        <button onClick={() => openEdit(row)} className="p-1.5 rounded-lg hover:bg-indigo-50 text-indigo-500"><Edit size={15} /></button>
        <button onClick={() => setDeleteId(row._id)} className="p-1.5 rounded-lg hover:bg-rose-50 text-rose-500"><Trash2 size={15} /></button>
      </div>
    )},
  ];

  const inputClass = 'w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500';

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-bold mb-1">
            <Sparkles size={13} /> CATEGORY TAXONOMY
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Product Categories</h1>
        </div>

        <button onClick={openCreate} className="px-4 py-2.5 bg-gradient-to-r from-indigo-500 via-purple-600 to-rose-500 text-white font-bold rounded-xl shadow-md flex items-center gap-2 text-xs">
          <Plus size={16} /> Add Category
        </button>
      </div>

      <DataTable
        columns={columns}
        data={categories}
        page={page}
        pages={pages}
        onPageChange={setPage}
        loading={loading}
        searchable
        onSearch={(v) => { setSearch(v); setPage(1); loadCategories(1, v); }}
        searchPlaceholder="Search categories..."
        emptyMessage="No categories found"
      />

      <Modal open={showModal} onClose={() => setShowModal(false)} title={editing ? 'Edit Category' : 'Create Category'} size="md">
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-1">Name *</label>
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} required />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-1">Description *</label>
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} className={inputClass} required />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 bg-slate-100 rounded-xl text-xs font-bold">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold shadow-md">{editing ? 'Update' : 'Create'}</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
