const SESSION_KEY_AUTH = 'keu_pusjar_session';

const AUTH = {
  // Login
  login(username, password) {
    const db = DB.load();
    const user = db.users.find(u => u.username === username && u.password === password && u.active);
    if (!user) return { ok: false, message: 'Username atau password salah' };
    const session = { id: user.id, username: user.username, name: user.name, role: user.role, unit: user.unit, loginAt: Date.now() };
    localStorage.setItem(SESSION_KEY_AUTH, JSON.stringify(session));
    return { ok: true, user: session };
  },

  // Login demo (langsung pilih role)
  loginAs(role) {
    const db = DB.load();
    const user = db.users.find(u => u.role === role && u.active);
    if (!user) return { ok: false, message: 'Role tidak ditemukan' };
    const session = { id: user.id, username: user.username, name: user.name, role: user.role, unit: user.unit, loginAt: Date.now() };
    localStorage.setItem(SESSION_KEY_AUTH, JSON.stringify(session));
    return { ok: true, user: session };
  },

  logout() {
    localStorage.removeItem(SESSION_KEY_AUTH);
  },

  currentUser() {
    const raw = localStorage.getItem(SESSION_KEY_AUTH);
    return raw ? JSON.parse(raw) : null;
  },

  // Wajib login
  require() {
    const u = AUTH.currentUser();
    if (!u) {
      window.location.href = 'index.html';
      return null;
    }
    return u;
  },

  // Wajib role tertentu
  requireRole(roles) {
    const u = AUTH.require();
    if (!u) return null;
    if (!roles.includes(u.role)) {
      Swal.fire({
        icon: 'error',
        title: 'Akses Ditolak',
        text: 'Anda tidak memiliki akses ke halaman ini.',
        confirmButtonText: 'OK'
      }).then(() => {
        window.location.href = u.role === 'admin' ? 'admin.html'
                          : u.role === 'keuangan' ? 'keuangan.html'
                          : 'pimpinan.html';
      });
      return null;
    }
    return u;
  },

  // Permission check
  can(permission) {
    const u = AUTH.currentUser();
    if (!u) return false;
    const map = {
      admin: ['*'],
      keuangan: [
        'target.view', 'target.create', 'target.update',
        'realisasi.view', 'realisasi.create', 'realisasi.update',
        'pengadaan.view', 'pengadaan.create', 'pengadaan.update',
        'kendala.view', 'kendala.create', 'kendala.update',
        'progress.view'
      ],
      pimpinan: [
        'target.view', 'realisasi.view', 'pengadaan.view',
        'kendala.view', 'progress.view', 'report.export', 'audit.view'
      ]
    };
    const perms = map[u.role] || [];
    return perms.includes('*') || perms.includes(permission);
  }
};

// ============ SIDEBAR BUILDER ============
function buildSidebar(activePage) {
  const u = AUTH.currentUser();
  if (!u) return '';

  const roleMenus = {
    admin: [
      { section: 'Dashboard', items: [{ href: 'admin.html', icon: 'layout-dashboard', label: 'Dashboard' }] },
      { section: 'Master Data', items: [
        { href: 'master.html?tab=jenisPengadaan', icon: 'tags', label: 'Jenis Pengadaan' },
        { href: 'master.html?tab=tahapan', icon: 'list-ordered', label: 'Tahapan' },
        { href: 'master.html?tab=status', icon: 'badge-check', label: 'Status' },
        { href: 'master.html?tab=unit', icon: 'building-2', label: 'Unit' },
        { href: 'master.html?tab=kategoriKendala', icon: 'folder-tree', label: 'Kategori Kendala' }
      ]},
      { section: 'Manajemen User', items: [
        { href: 'user.html', icon: 'users', label: 'Kelola User' },
        { href: 'audit.html', icon: 'scroll-text', label: 'Audit Trail' }
      ]}
    ],
    keuangan: [
      { section: 'Menu', items: [
        { href: 'keuangan.html', icon: 'layout-dashboard', label: 'Dashboard' },
        { href: 'target.html', icon: 'target', label: 'Target' },
        { href: 'realisasi.html', icon: 'trending-up', label: 'Realisasi' },
        { href: 'pengadaan.html', icon: 'package', label: 'Pengadaan' },
        { href: 'kendala.html', icon: 'alert-triangle', label: 'Kendala' },
        { href: 'laporan.html', icon: 'file-text', label: 'Laporan' }
      ]}
    ],
    pimpinan: [
      { section: 'Menu', items: [
        { href: 'pimpinan.html', icon: 'layout-dashboard', label: 'Dashboard' },
        { href: 'laporan.html', icon: 'file-text', label: 'Laporan' },
        { href: 'audit.html', icon: 'scroll-text', label: 'Audit Trail' }
      ]}
    ]
  };

  const menus = roleMenus[u.role] || [];
  let html = `
    <div class="p-5 border-b border-gray-100 flex items-center gap-3">
      <img src="assets/logo-lanri.png" alt="SIKAP" class="w-10 h-10 object-contain rounded-xl" />
      <div>
        <h3 class="text-base font-bold text-blue-900 leading-tight tracking-wide">SIKAP</h3>
        <p class="text-[10px] text-black-500 tracking-wider">Sistem Target &amp; Realisasi</p>
      </div>
    </div>
    <nav class="flex-1 overflow-y-auto py-3">`;

  menus.forEach(group => {
    html += `<p class="px-5 py-2 text-[10px] font-bold text-gray-400 tracking-widest uppercase">${group.section}</p>`;
    group.items.forEach(it => {
      const isActive = activePage === it.href || activePage === it.href.split('?')[0];
      const cls = isActive
        ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-700 font-semibold'
        : 'text-gray-700 border-l-4 border-transparent hover:bg-blue-50 hover:text-blue-700';
      html += `<a href="${it.href}" class="flex items-center gap-3 px-5 py-2.5 text-sm ${cls} transition">
        <i data-lucide="${it.icon}" class="w-4 h-4"></i> ${it.label}
      </a>`;
    });
  });

  html += `</nav>`;

  // User card di bawah
  html += `
    <div class="p-4 border-t border-gray-100">
      <div class="flex items-center gap-3">
        <div class="w-9 h-9 rounded-full bg-gradient-to-br from-blue-700 to-blue-500 flex items-center justify-center text-white text-sm font-bold">
          ${u.name.charAt(0)}
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-sm font-semibold text-gray-800 truncate">${u.name}</p>
          <p class="text-[10px] text-gray-400 uppercase tracking-wider">${u.role}</p>
        </div>
      </div>
    </div>`;

  return html;
}

// ============ TOPBAR BUILDER ============
function buildTopbar() {
  const u = AUTH.currentUser();
  if (!u) return '';
  return `
    <div class="flex items-center gap-3">
      <button class="md:hidden text-gray-700 hover:text-blue-700 transition" onclick="document.querySelector('aside').classList.toggle('hidden')">
        <i data-lucide="menu" class="w-5 h-5"></i>
      </button>
      <img src="assets/logo-lanri.png" alt="SIKAP" class="w-7 h-7 object-contain rounded-md" />
      <span class="font-bold tracking-wider text-sm text-blue-900">SIKAP</span>
      <span class="hidden sm:inline text-xs text-gray-400 border-l border-gray-200 pl-3 ml-1">Sistem Target &amp; Realisasi</span>
    </div>
    <div class="flex items-center gap-4 text-sm">
      <div class="hidden sm:flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full border border-blue-100">
        <i data-lucide="user-circle" class="w-4 h-4"></i>
        <span class="font-medium">${u.name}</span>
        <i data-lucide="chevron-down" class="w-3 h-3"></i>
      </div>
      <button onclick="logoutConfirm()" class="flex items-center gap-1.5 text-gray-500 hover:text-red-600 transition font-medium">
        <i data-lucide="log-out" class="w-4 h-4"></i> Logout
      </button>
    </div>`;
}

// ============ LAYOUT WRAPPER ============
function renderLayout(activePage, mainContent) {
  const u = AUTH.require();
  if (!u) return;
  document.body.innerHTML = `
    <div class="flex min-h-screen bg-gray-50">
      <aside class="w-64 bg-white border-r border-gray-200 flex-shrink-0 hidden md:flex flex-col">
        ${buildSidebar(activePage)}
      </aside>
      <main class="flex-1 flex flex-col min-w-0">
        <header class="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-20">
          ${buildTopbar()}
        </header>
        <div class="p-6 flex-1">${mainContent}</div>
      </main>
    </div>`;
  if (window.lucide) lucide.createIcons();
}