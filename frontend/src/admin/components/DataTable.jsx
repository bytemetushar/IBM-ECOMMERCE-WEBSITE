import { useState } from 'react';
import { ChevronLeft, ChevronRight, Search, Inbox } from 'lucide-react';

export default function DataTable({
  columns, data, page, pages, onPageChange, loading, onRowClick,
  selectable, selectedIds = [], onSelectAll, onSelectOne,
  searchable, onSearch, searchPlaceholder = 'Search...', emptyMessage = 'No items found'
}) {
  const [searchValue, setSearchValue] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(searchValue);
  };

  const allSelected = data.length > 0 && selectedIds.length === data.length;

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl overflow-hidden shadow-xs space-y-4">
      {/* Search Header */}
      {searchable && (
        <form onSubmit={handleSearchSubmit} className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder={searchPlaceholder}
              className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700 transition-colors">
            Search
          </button>
        </form>
      )}

      {/* Table Container */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 font-bold uppercase tracking-wider text-slate-400">
              {selectable && (
                <th className="p-4 w-10">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={onSelectAll}
                    className="w-4 h-4 rounded border-slate-300 dark:border-slate-700 text-indigo-600"
                  />
                </th>
              )}
              {columns.map((col) => (
                <th key={col.key} className="p-4">{col.label}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium">
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i}>
                  {selectable && <td className="p-4"><div className="w-4 h-4 skeleton" /></td>}
                  {columns.map((col) => (
                    <td key={col.key} className="p-4"><div className="h-4 skeleton rounded-md" /></td>
                  ))}
                </tr>
              ))
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={columns.length + (selectable ? 1 : 0)} className="p-12 text-center text-slate-400 space-y-2">
                  <Inbox size={32} className="mx-auto" />
                  <p className="text-xs font-bold">{emptyMessage}</p>
                </td>
              </tr>
            ) : (
              data.map((row) => {
                const isSelected = selectedIds.includes(row._id);
                return (
                  <tr
                    key={row._id}
                    onClick={() => onRowClick && onRowClick(row)}
                    className={`hover:bg-slate-50/60 dark:hover:bg-slate-800/30 transition-colors ${onRowClick ? 'cursor-pointer' : ''} ${isSelected ? 'bg-indigo-50/30 dark:bg-indigo-500/10' : ''}`}
                  >
                    {selectable && (
                      <td className="p-4" onClick={(e) => e.stopPropagation()}>
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => onSelectOne(row._id)}
                          className="w-4 h-4 rounded border-slate-300 dark:border-slate-700 text-indigo-600"
                        />
                      </td>
                    )}
                    {columns.map((col) => (
                      <td key={col.key} className="p-4 text-slate-800 dark:text-slate-200">
                        {col.render ? col.render(row) : row[col.key]}
                      </td>
                    ))}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      {pages > 1 && (
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold">
          <span className="text-slate-400">Page {page} of {pages}</span>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => onPageChange(page - 1)}
              disabled={page <= 1}
              className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-500 disabled:opacity-40"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => onPageChange(page + 1)}
              disabled={page >= pages}
              className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-500 disabled:opacity-40"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
