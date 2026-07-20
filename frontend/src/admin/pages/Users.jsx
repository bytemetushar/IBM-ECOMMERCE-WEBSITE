import { useState, useEffect, useCallback } from 'react';
import { Shield, ShieldOff, Sparkles } from 'lucide-react';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import { useToast } from '../components/Toast';
import { admin } from '../adminApi';

export default function Users() {
  const addToast = useToast();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [search, setSearch] = useState('');
  const [roleModal, setRoleModal] = useState(null);

  const loadUsers = useCallback(async (p = page, s = search) => {
    try {
      setLoading(true);
      const res = await admin.getUsers({ page: p, limit: 15, search: s });
      setUsers(res.users || []);
      setPage(res.pagination?.page || 1);
      setPages(res.pagination?.pages || 1);
    } catch (err) {
      addToast(err.message, 'error');
    } finally {
      setLoading(false);
    }
  }, [page, search]);

  useEffect(() => {
    loadUsers();
  }, [page]);

  const handleRoleToggle = async () => {
    if (!roleModal) return;
    try {
      const newRole = roleModal.role === 'ADMIN' ? 'USER' : 'ADMIN';
      await admin.updateUserRole(roleModal._id, newRole);
      addToast(`User role updated to ${newRole}`, 'success');
      setRoleModal(null);
      loadUsers();
    } catch (err) {
      addToast(err.message, 'error');
    }
  };

  const columns = [
    {
      key: 'name', label: 'User Account',
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-900 dark:text-white font-bold text-xs">
            {row.FullName?.charAt(0)?.toUpperCase()}
          </div>
          <div>
            <p className="font-bold text-slate-900 dark:text-white text-xs">{row.FullName}</p>
            <p className="text-[11px] font-mono text-slate-400">{row.email}</p>
          </div>
        </div>
      ),
    },
    { key: 'contact', label: 'Phone', render: (row) => <span className="text-xs text-slate-500 font-mono">{row.contact || '-'}</span> },
    {
      key: 'role', label: 'Access Level',
      render: (row) => (
        <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider ${
          row.role === 'ADMIN' ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-200' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
        }`}>
          {row.role}
        </span>
      ),
    },
    { key: 'orderCount', label: 'Orders', render: (row) => <span className="text-xs font-bold">{row.orderCount || 0}</span> },
    {
      key: 'createdAt', label: 'Joined',
      render: (row) => <span className="text-xs text-slate-400">{new Date(row.createdAt).toLocaleDateString()}</span>,
    },
    { key: 'actions', label: 'Actions', render: (row) => (
      <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
        <button onClick={() => setRoleModal(row)}
          className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-colors" title="Toggle Access Level">
          {row.role === 'ADMIN' ? <ShieldOff size={15} /> : <Shield size={15} />}
        </button>
      </div>
    )},
  ];

  return (
    <div className="space-y-6">
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-bold mb-1">
          <Sparkles size={13} /> USER MANAGEMENT
        </div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Registered Customers</h1>
      </div>

      <DataTable
        columns={columns}
        data={users}
        page={page}
        pages={pages}
        onPageChange={setPage}
        loading={loading}
        searchable
        onSearch={(v) => { setSearch(v); setPage(1); loadUsers(1, v); }}
        searchPlaceholder="Search by user name or email..."
        emptyMessage="No customer accounts found"
      />

      <Modal open={!!roleModal} onClose={() => setRoleModal(null)} title="Update Account Role" size="sm">
        <div className="text-center p-2 space-y-3">
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Change access role for <strong>{roleModal?.FullName}</strong>:
          </p>
          <p className="text-xs font-mono text-slate-400">
            {roleModal?.role} &rarr; {roleModal?.role === 'ADMIN' ? 'USER' : 'ADMIN'}
          </p>
          <div className="flex gap-3 justify-center pt-2">
            <button onClick={() => setRoleModal(null)} className="px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300">
              Cancel
            </button>
            <button onClick={handleRoleToggle} className="px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl text-xs font-bold hover:bg-indigo-600">
              Confirm Role Change
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
