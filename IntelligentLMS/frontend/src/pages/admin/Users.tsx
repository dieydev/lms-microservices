import { useEffect, useMemo, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, MenuItem } from '@mui/material';
import { adminAuthApi, AdminUserRow } from '../../services/api';

const Users = () => {
  const [rows, setRows] = useState<AdminUserRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<AdminUserRow | null>(null);
  const [form, setForm] = useState({
    email: '',
    fullName: '',
    role: 'Student',
    password: 'Password123!',
    isLocked: false,
  });

  const load = async () => {
    setLoading(true);
    try {
      const role = roleFilter === 'All' ? undefined : roleFilter;
      const res = await adminAuthApi.listUsers(role);
      setRows(res.data || []);
    } catch (e: any) {
      alert(e?.response?.data?.message || 'Không tải được danh sách người dùng.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [roleFilter]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((r) => (r.fullName || '').toLowerCase().includes(q) || (r.email || '').toLowerCase().includes(q));
  }, [rows, search]);

  const columns: GridColDef[] = [
    { field: 'fullName', headerName: 'Họ tên', flex: 1, minWidth: 170 },
    { field: 'email', headerName: 'Email', flex: 1, minWidth: 220 },
    { field: 'role', headerName: 'Role', width: 120 },
    { field: 'isLocked', headerName: 'Khóa', width: 100, valueGetter: (v: boolean) => (v ? 'Yes' : 'No') },
    {
      field: 'actions',
      headerName: 'Hành động',
      width: 220,
      sortable: false,
      filterable: false,
      renderCell: (params) => {
        const r = params.row as AdminUserRow;
        return (
          <div style={{ display: 'flex', gap: 8 }}>
            <Button
              size="small"
              variant="outlined"
              onClick={() => {
                setEditing(r);
                setForm({
                  email: r.email,
                  fullName: r.fullName,
                  role: r.role,
                  password: 'Password123!',
                  isLocked: r.isLocked,
                });
                setOpen(true);
              }}
            >
              Sửa
            </Button>
            <Button
              size="small"
              color="error"
              variant="outlined"
              onClick={async () => {
                if (!confirm(`Xóa người dùng ${r.email}?`)) return;
                try {
                  await adminAuthApi.deleteUser(r.id);
                  setRows((prev) => prev.filter((x) => x.id !== r.id));
                } catch (e: any) {
                  alert(e?.response?.data?.message || 'Không thể xóa.');
                }
              }}
            >
              Xóa
            </Button>
          </div>
        );
      },
    },
  ];

  const onSave = async () => {
    try {
      if (editing) {
        const res = await adminAuthApi.updateUser(editing.id, {
          fullName: form.fullName,
          role: form.role,
          isLocked: form.isLocked,
        });
        setRows((prev) => prev.map((x) => (x.id === editing.id ? res.data : x)));
      } else {
        const res = await adminAuthApi.createUser({
          email: form.email,
          fullName: form.fullName,
          role: form.role,
          password: form.password,
        });
        setRows((prev) => [res.data, ...prev]);
      }
      setOpen(false);
      setEditing(null);
    } catch (e: any) {
      alert(e?.response?.data?.message || 'Không thể lưu.');
    }
  };

  return (
    <div className="p-8 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-black text-gray-900">Quản lý người dùng</h2>
          <p className="text-sm text-gray-500">Quản lý toàn bộ tài khoản thật từ Auth service</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outlined" onClick={load}>Tải lại</Button>
          <Button
            variant="contained"
            onClick={() => {
              setEditing(null);
              setForm({ email: '', fullName: '', role: 'Student', password: 'Password123!', isLocked: false });
              setOpen(true);
            }}
          >
            Thêm user
          </Button>
        </div>
      </div>

      <div className="flex gap-3">
        <TextField value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Tìm theo tên/email" size="small" fullWidth />
        <TextField
          select
          size="small"
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          style={{ minWidth: 150 }}
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Admin">Admin</MenuItem>
          <MenuItem value="Teacher">Teacher</MenuItem>
          <MenuItem value="Student">Student</MenuItem>
        </TextField>
      </div>

      <div style={{ height: 580, width: '100%' }}>
        <DataGrid
          rows={filtered}
          columns={columns}
          loading={loading}
          getRowId={(r) => (r as AdminUserRow).id}
          pageSizeOptions={[10, 25, 50]}
          initialState={{ pagination: { paginationModel: { pageSize: 10, page: 0 } } }}
        />
      </div>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>{editing ? 'Sửa user' : 'Thêm user'}</DialogTitle>
        <DialogContent style={{ paddingTop: 12 }}>
          <div className="flex flex-col gap-4">
            <TextField label="Email" value={form.email} disabled={!!editing} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} fullWidth />
            <TextField label="Họ tên" value={form.fullName} onChange={(e) => setForm((p) => ({ ...p, fullName: e.target.value }))} fullWidth />
            <TextField label="Role" value={form.role} onChange={(e) => setForm((p) => ({ ...p, role: e.target.value }))} select fullWidth>
              <MenuItem value="Student">Student</MenuItem>
              <MenuItem value="Teacher">Teacher</MenuItem>
              <MenuItem value="Admin">Admin</MenuItem>
            </TextField>
            {!editing && (
              <TextField label="Mật khẩu tạm" value={form.password} onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))} fullWidth />
            )}
            {editing && (
              <TextField label="Khóa tài khoản" value={form.isLocked ? 'Yes' : 'No'} onChange={(e) => setForm((p) => ({ ...p, isLocked: e.target.value === 'Yes' }))} select fullWidth>
                <MenuItem value="No">No</MenuItem>
                <MenuItem value="Yes">Yes</MenuItem>
              </TextField>
            )}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Hủy</Button>
          <Button variant="contained" onClick={onSave}>Lưu</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Users;
