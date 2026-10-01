// ============================================================
// SIKAP - Authentication & Layout Builder
// Sistem Informasi Keuangan & Anggaran Pusjar SKMP
// ============================================================

const SESSION_KEY_AUTH = 'keu_pusjar_session';

// ============================================================
// AUTH OBJECT
// ============================================================
const AUTH = {
  // ============ LOGIN MANUAL ============
  login(username, password) {
    const db = DB.load();
    const user = db.users.find(u =>
      u.username === username &&
      u.password === password &&
      u.active
    );
    if (!user) return { ok: false, message: 'Username atau password salah' };

    const session = {
      id: user.id,
      username: user.username,
      name: user.name,
      role: user.role,
      unit: user.unit,
      loginAt: Date.now()
    };
    localStorage.setItem(SESSION_KEY_AUTH, JSON.stringify(session));
    return { ok: true, user: session };
  },

  // ============ LOGIN CEPAT ============
  loginAs(role) {
    const db = DB.load();
    const user = db.users.find(u => u.role === role && u.active);
    if (!user) return { ok: false, message: 'Role tidak ditemukan' };

    const session = {
      id: user.id,
      username: user.username,
      name: user.name,
      role: user.role,
      unit: user.unit,
      loginAt: Date.now()
    };
    localStorage.setItem(SESSION_KEY_AUTH, JSON.stringify(session));
    return { ok: true, user: session };
  },

  // ============ LOGOUT ============
  logout() {
    localStorage.removeItem(SESSION_KEY_AUTH);
  },

  // ============ CURRENT USER ============
  currentUser() {
    const raw = localStorage.getItem(SESSION_KEY_AUTH);
    return raw ? JSON.parse(raw) : null;
  },

  // ============ WAJIB LOGIN ============
  require() {
    const u = AUTH.currentUser();
    if (!u) {
      window.location.href = 'index.html';
      return null;
    }
    return u;
  },

  // ============ WAJIB ROLE ============
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

  // ============ PERMISSION ============
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

// ============================================================
// MENU CONFIG - Berkomponen (Section + Items + SubItems)
// ============================================================
/**
 * Struktur menu:
 * {
 *   section: 'Judul Grup',
 *   icon: 'lucide-icon-name',  // opsional, ikon untuk section
 *   items: [
 *     {
 *       href: 'page.html',
 *       icon: 'lucide-icon',
 *       label: 'Label Menu',
 *       badge: '5',            // opsional - badge angka/teks
 *       badgeColor: 'red',     // opsional - warna badge
 *       subItems: [            // opsional - submenu
 *         { href: 'page.html?tab=x', label: 'Sub Menu', icon: 'circle' }
 *       ]
 *     }
 *   ]
 * }
 */

const MENU_CONFIG = {
  // ============ ADMIN ============
  admin: [
    {
      section: 'Dashboard',
      items: [
        {
          href: 'admin.html',
          icon: 'layout-dashboard',
          label: 'Dashboard',
          permission: null
        }
      ]
    },
    {
      section: 'Master Data',
      icon: 'database',
      items: [
        { href: 'master.html?tab=jenisPengadaan', icon: 'tags', label: 'Jenis Pengadaan' },
        { href: 'master.html?tab=tahapan', icon: 'list-ordered', label: 'Tahapan' },
        { href: 'master.html?tab=status', icon: 'badge-check', label: 'Status' },
        { href: 'master.html?tab=unit', icon: 'building-2', label: 'Unit' },
        { href: 'master.html?tab=kategoriKendala', icon: 'folder-tree', label: 'Kategori Kendala' },
        { href: 'master.html?tab=kategoriTarget', icon: 'layers', label: 'Kategori Target' }
      ]
    },
    {
      section: 'Manajemen User',
      icon: 'users',
      items: [
        { href: 'user.html', icon: 'user-cog', label: 'Kelola User' },
        { href: 'audit.html', icon: 'scroll-text', label: 'Audit Trail' }
      ]
    }
  ],

  // ============ USER KEUANGAN ============
  keuangan: [
    {
      section: 'Menu Utama',
      items: [
        { href: 'keuangan.html', icon: 'layout-dashboard', label: 'Dashboard' }
      ]
    },
    {
      section: 'Perencanaan',
      icon: 'clipboard-list',
      items: [
        { href: 'target.html', icon: 'target', label: 'Target' },
        { href: 'realisasi.html', icon: 'trending-up', label: 'Realisasi' }
      ]
    },
    {
      section: 'Pelaksanaan',
      icon: 'briefcase',
      items: [
        { href: 'pengadaan.html', icon: 'package', label: 'Pengadaan' },
        { href: 'kendala.html', icon: 'alert-triangle', label: 'Kendala' }
      ]
    },
    {
      section: 'Pelaporan',
      icon: 'file-spreadsheet',
      items: [
        { href: 'laporan.html', icon: 'file-text', label: 'Laporan' }
      ]
    }
  ],

  // ============ PIMPINAN ============
  pimpinan: [
    {
      section: 'Menu Utama',
      items: [
        { href: 'pimpinan.html', icon: 'layout-dashboard', label: 'Dashboard' }
      ]
    },
    {
      section: 'Informasi',
      icon: 'info',
      items: [
        { href: 'laporan.html', icon: 'file-text', label: 'Laporan' },
        { href: 'audit.html', icon: 'scroll-text', label: 'Audit Trail' }
      ]
    }
  ]
};

// ============================================================
// SIDEBAR COMPONENT - BRAND HEADER
// ============================================================
function SidebarBrand() {
  return `
    <div class="p-5 border-b border-gray-100 flex items-center gap-3">
      <img src="assets/logo-lanri.png" alt="SIKAP"
        class="w-10 h-10 object-contain rounded-xl flex-shrink-0" />
      <div class="min-w-0">
        <h3 class="text-base font-bold text-blue-900 leading-tight tracking-wide">SIKAP</h3>
        <p class="text-[9px] text-gray-500 tracking-wide leading-tight mt-0.5">
          Sistem Informasi Keuangan &amp; Anggaran<br/>Pusjar SKMP
        </p>
      </div>
    </div>`;
}

// ============================================================
// SIDEBAR COMPONENT - SECTION HEADER
// ============================================================
function SidebarSectionHeader({ section, icon }) {
  return `
    <p class="px-5 py-2 mt-2 text-[10px] font-bold text-gray-400 tracking-widest uppercase flex items-center gap-1.5">
      ${icon ? `<i data-lucide="${icon}" class="w-3 h-3"></i>` : ''}
      ${section}
    </p>`;
}

// ============================================================
// SIDEBAR COMPONENT - MENU ITEM
// ============================================================
function SidebarItem({ item, isActive }) {
  const baseCls = 'flex items-center gap-3 px-5 py-2.5 text-sm border-l-4 transition group';
  const activeCls = 'bg-blue-50 text-blue-700 border-blue-700 font-semibold';
  const inactiveCls = 'text-gray-700 border-transparent hover:bg-blue-50 hover:text-blue-700';

  // Badge
  let badgeHtml = '';
  if (item.badge) {
    const badgeColors = {
      red: 'bg-red-100 text-red-700',
      blue: 'bg-blue-100 text-blue-700',
      green: 'bg-green-100 text-green-700',
      amber: 'bg-amber-100 text-amber-700',
      purple: 'bg-purple-100 text-purple-700'
    };
    const badgeCls = badgeColors[item.badgeColor] || badgeColors.blue;
    badgeHtml = `<span class="ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full ${badgeCls}">${item.badge}</span>`;
  }

  return `
    <a href="${item.href}" class="${baseCls} ${isActive ? activeCls : inactiveCls}">
      <i data-lucide="${item.icon}" class="w-4 h-4 flex-shrink-0"></i>
      <span class="truncate">${item.label}</span>
      ${badgeHtml}
    </a>`;
}

// ============================================================
// SIDEBAR COMPONENT - MENU ITEM DENGAN SUBMENU
// ============================================================
function SidebarItemWithSub({ item, isActive, isOpen }) {
  const baseCls = 'flex items-center gap-3 px-5 py-2.5 text-sm border-l-4 transition cursor-pointer';
  const activeCls = 'bg-blue-50 text-blue-700 border-blue-700 font-semibold';
  const inactiveCls = 'text-gray-700 border-transparent hover:bg-blue-50 hover:text-blue-700';

  const subItemsHtml = (item.subItems || []).map(sub => {
    const subActive = isActivePath(sub.href);
    return `
      <a href="${sub.href}"
        class="flex items-center gap-2 pl-12 pr-5 py-2 text-xs transition
          ${subActive
            ? 'text-blue-700 font-semibold bg-blue-50/50'
            : 'text-gray-500 hover:text-blue-700 hover:bg-blue-50/30'}">
        <i data-lucide="${sub.icon || 'circle'}" class="w-3 h-3 flex-shrink-0"></i>
        <span class="truncate">${sub.label}</span>
      </a>`;
  }).join('');

  return `
    <div data-menu-group="${item.label}">
      <div class="${baseCls} ${isActive || isOpen ? activeCls : inactiveCls}"
        onclick="toggleSubmenu(this)">
        <i data-lucide="${item.icon}" class="w-4 h-4 flex-shrink-0"></i>
        <span class="truncate flex-1">${item.label}</span>
        <i data-lucide="chevron-down"
          class="w-3.5 h-3.5 flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}"></i>
      </div>
      <div class="submenu-container overflow-hidden transition-all duration-200"
        style="max-height:${isOpen ? '500px' : '0'};">
        ${subItemsHtml}
      </div>
    </div>`;
}

// ============================================================
// SIDEBAR COMPONENT - USER CARD
// ============================================================
function SidebarUserCard(u) {
  const roleLabel = u.role === 'admin' ? 'Administrator'
                  : u.role === 'keuangan' ? 'User Keuangan'
                  : u.role === 'pimpinan' ? 'Pimpinan'
                  : u.role;

  return `
    <div class="p-4 border-t border-gray-100">
      <div class="flex items-center gap-3">
        <div class="w-9 h-9 rounded-full bg-gradient-to-br from-blue-700 to-blue-500 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
          ${u.name.charAt(0).toUpperCase()}
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-sm font-semibold text-gray-800 truncate">${u.name}</p>
          <p class="text-[10px] text-gray-400 uppercase tracking-wider truncate">${roleLabel}</p>
        </div>
      </div>
    </div>`;
}

// ============================================================
// UTIL - CEK PATH AKTIF
// ============================================================
function isActivePath(href) {
  if (!href) return false;

  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const currentQuery = window.location.search;

  // Kalau href punya query string (mis. master.html?tab=xxx)
  if (href.includes('?')) {
    const [path, query] = href.split('?');
    if (currentPath !== path) return false;

    // Cocokkan query params
    const hrefParams = new URLSearchParams(query);
    const currentParams = new URLSearchParams(currentQuery);
    for (const [k, v] of hrefParams.entries()) {
      if (currentParams.get(k) !== v) return false;
    }
    return true;
  }

  // Href tanpa query
  return currentPath === href;
}

// ============================================================
// TOGGLE SUBMENU (untuk item dengan subItems)
// ============================================================
function toggleSubmenu(el) {
  const group = el.closest('[data-menu-group]');
  if (!group) return;
  const container = group.querySelector('.submenu-container');
  const chevron = el.querySelector('[data-lucide="chevron-down"]');
  if (!container) return;

  const isOpen = container.style.maxHeight !== '0px' && container.style.maxHeight !== '';

  if (isOpen) {
    container.style.maxHeight = '0';
    if (chevron) chevron.style.transform = 'rotate(0deg)';
  } else {
    container.style.maxHeight = '500px';
    if (chevron) chevron.style.transform = 'rotate(180deg)';
  }
}

// ============================================================
// SIDEBAR BUILDER (menggunakan komponen di atas)
// ============================================================
function buildSidebar(activePage) {
  const u = AUTH.currentUser();
  if (!u) return '';

  const sections = MENU_CONFIG[u.role] || [];

  let html = SidebarBrand();
  html += `<nav class="flex-1 overflow-y-auto py-3">`;

  sections.forEach(section => {
    // Section header
    html += SidebarSectionHeader(section);

    // Items
    (section.items || []).forEach(item => {
      const isActive = isActivePath(item.href);

      // Kalau punya subItems, render dengan submenu
      if (item.subItems && item.subItems.length > 0) {
        // Cek apakah ada subitem yang aktif atau parent aktif
        const anySubActive = item.subItems.some(s => isActivePath(s.href));
        const isOpen = anySubActive || isActive;

        html += SidebarItemWithSub({ item, isActive, isOpen });
      } else {
        html += SidebarItem({ item, isActive });
      }
    });
  });

  html += `</nav>`;
  html += SidebarUserCard(u);

  return html;
}

// ============================================================
// TOPBAR COMPONENT - BRAND
// ============================================================
function TopbarBrand() {
  return `
    <div class="flex items-center gap-3 min-w-0">
      <button class="md:hidden text-gray-700 hover:text-blue-700 transition flex-shrink-0"
        onclick="document.querySelector('aside').classList.toggle('hidden')">
        <i data-lucide="menu" class="w-5 h-5"></i>
      </button>
      <img src="assets/logo-lanri.png" alt="SIKAP"
        class="w-7 h-7 object-contain rounded-md flex-shrink-0" />
      <span class="font-bold tracking-wider text-sm text-blue-900">SIKAP</span>
      <span class="hidden lg:inline text-xs text-gray-400 border-l border-gray-200 pl-3 ml-1 truncate">
        Sistem Informasi Keuangan &amp; Anggaran Pusjar SKMP
      </span>
    </div>`;
}

// ============================================================
// TOPBAR COMPONENT - USER ACTIONS
// ============================================================
function TopbarUserActions(u) {
  return `
    <div class="flex items-center gap-3 sm:gap-4 text-sm flex-shrink-0">
      <div class="hidden sm:flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full border border-blue-100">
        <i data-lucide="user-circle" class="w-4 h-4"></i>
        <span class="font-medium max-w-[120px] truncate">${u.name}</span>
        <i data-lucide="chevron-down" class="w-3 h-3"></i>
      </div>
      <button onclick="logoutConfirm()"
        class="flex items-center gap-1.5 text-gray-500 hover:text-red-600 transition font-medium">
        <i data-lucide="log-out" class="w-4 h-4"></i>
        <span class="hidden sm:inline">Logout</span>
      </button>
    </div>`;
}

// ============================================================
// TOPBAR BUILDER
// ============================================================
function buildTopbar() {
  const u = AUTH.currentUser();
  if (!u) return '';
  return TopbarBrand() + TopbarUserActions(u);
}

// ============================================================
// LAYOUT WRAPPER
// ============================================================
function renderLayout(activePage, mainContent) {
  const u = AUTH.require();
  if (!u) return;

  document.body.innerHTML = `
    <div class="flex min-h-screen bg-gray-50">
      <aside class="w-64 bg-white border-r border-gray-200 flex-shrink-0 hidden md:flex flex-col">
        ${buildSidebar(activePage)}
      </aside>
      <main class="flex-1 flex flex-col min-w-0">
        <header class="bg-white border-b border-gray-200 px-4 sm:px-6 py-4 flex items-center justify-between sticky top-0 z-20">
          ${buildTopbar()}
        </header>
        <div class="p-4 sm:p-6 flex-1">${mainContent}</div>
      </main>
    </div>`;

  if (window.lucide) lucide.createIcons();
}