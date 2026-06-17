import type {
  AdminIngredient,
  AdminIngredientFormPayload,
  AdminMenuFormPayload,
  AdminMenuItem,
  AdminMenuCategory,
  AdminMenuCategoryFormPayload,
  AdminSemiFinishedIngredientFormPayload,
  AdminSemiFinishedIngredient,
  AdminStatusTone,
  AdminStockHistoryItem,
  AdminStockInFormPayload,
  AdminStockInItem,
  AdminStockOpnameFormPayload,
  AdminStockOpnameItem,
  AdminStockOpnameItemType,
  AdminStockOutFormPayload,
  AdminStockOutItem,
  AdminSupplier,
  AdminSupplierFormPayload,
  AdminUnit,
  AdminUnitFormPayload,
  AdminUser,
  AdminUserFormPayload,
} from '../types/admin-management'

const currencyFormatter = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  maximumFractionDigits: 0,
})

const numberFormatter = new Intl.NumberFormat('id-ID')

const initialMenuCategories: AdminMenuCategory[] = [
  {
    id: 'cat-penyetan',
    name: 'Penyetan',
    description: 'Menu ayam, lele, tahu, tempe, dan lauk penyetan.',
    totalMenus: 12,
    activeMenus: 10,
    status: 'active',
    statusLabel: 'Aktif',
    statusTone: 'success',
    updatedAt: 'Hari ini, 10:12',
  },
  {
    id: 'cat-bebakaran',
    name: 'Bebakaran',
    description: 'Menu bakar dengan sambal dan lalapan.',
    totalMenus: 8,
    activeMenus: 8,
    status: 'active',
    statusLabel: 'Aktif',
    statusTone: 'success',
    updatedAt: 'Kemarin, 16:40',
  },
  {
    id: 'cat-minuman',
    name: 'Minuman',
    description: 'Es teh, jeruk, kopi, dan minuman pendamping.',
    totalMenus: 9,
    activeMenus: 7,
    status: 'active',
    statusLabel: 'Aktif',
    statusTone: 'success',
    updatedAt: 'Senin, 09:25',
  },
  {
    id: 'cat-paket-lama',
    name: 'Paket Lama',
    description: 'Kategori paket promosi yang tidak lagi dipakai.',
    totalMenus: 3,
    activeMenus: 0,
    status: 'inactive',
    statusLabel: 'Nonaktif',
    statusTone: 'default',
    updatedAt: '24 Mei 2026',
  },
]

const initialMenus: AdminMenuItem[] = [
  createMenu({
    id: 'menu-ayam-penyet',
    name: 'Ayam Penyet',
    sku: 'MNU-APY-001',
    category: 'Penyetan',
    imageUrl: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=240&q=80',
    recipeItemCount: 6,
    recipeSummary: 'Ayam, sambal, lalapan, nasi',
    totalRecipeCost: 13500,
    sellingPrice: 25000,
    status: 'active',
    updatedAt: 'Hari ini, 11:20',
  }),
  createMenu({
    id: 'menu-lele-bakar',
    name: 'Lele Bakar',
    sku: 'MNU-LBK-002',
    category: 'Bebakaran',
    imageUrl: 'https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=240&q=80',
    recipeItemCount: 5,
    recipeSummary: 'Lele, bumbu bakar, sambal, nasi',
    totalRecipeCost: 11800,
    sellingPrice: 23000,
    status: 'active',
    updatedAt: 'Hari ini, 09:45',
  }),
  createMenu({
    id: 'menu-ayam-bakar-madu',
    name: 'Ayam Bakar Madu',
    sku: 'MNU-ABM-003',
    category: 'Bebakaran',
    imageUrl: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=240&q=80',
    recipeItemCount: 7,
    recipeSummary: 'Ayam, bumbu bakar, madu, lalapan',
    totalRecipeCost: 15200,
    sellingPrice: 28000,
    status: 'active',
    updatedAt: 'Kemarin, 15:18',
  }),
  createMenu({
    id: 'menu-tempe-penyet',
    name: 'Tempe Penyet',
    sku: 'MNU-TPY-004',
    category: 'Penyetan',
    imageUrl: 'https://images.unsplash.com/photo-1604909052743-94e838986d24?auto=format&fit=crop&w=240&q=80',
    recipeItemCount: 4,
    recipeSummary: 'Tempe, sambal, lalapan, nasi',
    totalRecipeCost: 6200,
    sellingPrice: 14000,
    status: 'active',
    updatedAt: 'Kemarin, 13:02',
  }),
  createMenu({
    id: 'menu-es-teh',
    name: 'Es Teh Manis',
    sku: 'MNU-ETM-005',
    category: 'Minuman',
    imageUrl: 'https://images.unsplash.com/photo-1497534446932-c925b458314e?auto=format&fit=crop&w=240&q=80',
    recipeItemCount: 3,
    recipeSummary: 'Teh, gula, es batu',
    totalRecipeCost: 1800,
    sellingPrice: 5000,
    status: 'active',
    updatedAt: '31 Mei 2026',
  }),
  createMenu({
    id: 'menu-paket-lama',
    name: 'Paket Hemat Lama',
    sku: 'MNU-PHL-006',
    category: 'Paket Lama',
    imageUrl: 'https://images.unsplash.com/photo-1543353071-873f17a7a088?auto=format&fit=crop&w=240&q=80',
    recipeItemCount: 8,
    recipeSummary: 'Ayam, tempe, sambal, nasi, minum',
    totalRecipeCost: 17800,
    sellingPrice: 29000,
    status: 'inactive',
    updatedAt: '24 Mei 2026',
  }),
]

const initialUnits: AdminUnit[] = [
  {
    id: 'unit-gram',
    name: 'Gram',
    symbol: 'g',
    usage: 'Bahan resep',
    precision: '2 desimal',
    itemCount: 14,
    status: 'active',
    statusLabel: 'Aktif',
    statusTone: 'success',
  },
  {
    id: 'unit-kilogram',
    name: 'Kilogram',
    symbol: 'kg',
    usage: 'Stok bahan',
    precision: '2 desimal',
    itemCount: 18,
    status: 'active',
    statusLabel: 'Aktif',
    statusTone: 'success',
  },
  {
    id: 'unit-liter',
    name: 'Liter',
    symbol: 'liter',
    usage: 'Bahan cair',
    precision: '2 desimal',
    itemCount: 5,
    status: 'active',
    statusLabel: 'Aktif',
    statusTone: 'success',
  },
  {
    id: 'unit-porsi',
    name: 'Porsi',
    symbol: 'porsi',
    usage: 'Hasil produksi',
    precision: 'Bilangan bulat',
    itemCount: 6,
    status: 'active',
    statusLabel: 'Aktif',
    statusTone: 'success',
  },
  {
    id: 'unit-ikat',
    name: 'Ikat',
    symbol: 'ikat',
    usage: 'Sayuran',
    precision: 'Bilangan bulat',
    itemCount: 0,
    status: 'inactive',
    statusLabel: 'Nonaktif',
    statusTone: 'default',
  },
]

const ingredients: AdminIngredient[] = [
  createIngredient('ing-ayam', 'Ayam Potong', 'kg', 18, 12, 38000, 'Pemasok Sari Tani'),
  createIngredient('ing-cabai', 'Cabai Merah', 'kg', 4, 8, 42000, 'Pasar Pagi Sentosa'),
  createIngredient('ing-beras', 'Beras', 'kg', 34, 25, 14500, 'Pemasok Sari Tani'),
  createIngredient('ing-minyak', 'Minyak Goreng', 'liter', 9, 10, 17500, 'CV Dapur Makmur'),
  createIngredient('ing-lele', 'Ikan Lele', 'kg', 7, 14, 26000, 'Mina Jaya'),
]

const initialSemiFinishedIngredients: AdminSemiFinishedIngredient[] = [
  createSemiFinishedIngredient({
    id: 'semi-sambal-bawang',
    name: 'Sambal Bawang',
    unit: 'kg',
    stock: 6,
    recipeItemCount: 5,
    recipeSummary: 'Cabai merah, bawang putih, bawang merah, minyak',
    targetYield: 3,
    totalRecipeCost: 126000,
    status: 'active',
    updatedAt: 'Hari ini, 10:35',
  }),
  createSemiFinishedIngredient({
    id: 'semi-bumbu-bakar',
    name: 'Bumbu Bakar',
    unit: 'kg',
    stock: 3.5,
    recipeItemCount: 6,
    recipeSummary: 'Kecap, bawang, cabai, gula merah, rempah',
    targetYield: 2,
    totalRecipeCost: 98000,
    status: 'active',
    updatedAt: 'Kemarin, 15:10',
  }),
  createSemiFinishedIngredient({
    id: 'semi-paket-lalapan',
    name: 'Paket Lalapan',
    unit: 'porsi',
    stock: 18,
    recipeItemCount: 4,
    recipeSummary: 'Timun, kol, kemangi, tomat',
    targetYield: 40,
    totalRecipeCost: 64000,
    status: 'active',
    updatedAt: 'Kemarin, 11:25',
  }),
  createSemiFinishedIngredient({
    id: 'semi-nasi-matang',
    name: 'Nasi Putih Matang',
    unit: 'porsi',
    stock: 12,
    recipeItemCount: 3,
    recipeSummary: 'Beras, air, daun pandan',
    targetYield: 30,
    totalRecipeCost: 78000,
    status: 'active',
    updatedAt: '31 Mei 2026',
  }),
  createSemiFinishedIngredient({
    id: 'semi-sambal-lama',
    name: 'Sambal Terasi Lama',
    unit: 'kg',
    stock: 0,
    recipeItemCount: 4,
    recipeSummary: 'Cabai, terasi, tomat, bawang',
    targetYield: 2,
    totalRecipeCost: 76000,
    status: 'inactive',
    updatedAt: '25 Mei 2026',
  }),
]

const initialStockHistory: AdminStockHistoryItem[] = [
  {
    id: 'hist-001',
    date: '01 Jun 2026, 13:42',
    ingredientName: 'Ayam Potong',
    type: 'sale',
    typeLabel: 'Penjualan',
    typeTone: 'info',
    source: 'TRX-20260601-0042',
    quantityLabel: '-2,4 kg',
    balanceLabel: '18 kg',
    note: 'Terpotong dari resep Ayam Penyet.',
  },
  {
    id: 'hist-002',
    date: '01 Jun 2026, 12:18',
    ingredientName: 'Cabai Merah',
    type: 'out',
    typeLabel: 'Stok Keluar',
    typeTone: 'warning',
    source: 'Produksi sambal',
    quantityLabel: '-1,5 kg',
    balanceLabel: '4 kg',
    note: 'Penggunaan operasional dapur.',
  },
  {
    id: 'hist-003',
    date: '01 Jun 2026, 10:05',
    ingredientName: 'Ikan Lele',
    type: 'in',
    typeLabel: 'Stok Masuk',
    typeTone: 'success',
    source: 'Pembelian Mina Jaya',
    quantityLabel: '+10 kg',
    balanceLabel: '17 kg',
    note: 'Pembelian bahan segar.',
  },
  {
    id: 'hist-004',
    date: '01 Jun 2026, 09:20',
    ingredientName: 'Beras',
    type: 'opname',
    typeLabel: 'Opname',
    typeTone: 'default',
    source: 'Stok opname pagi',
    quantityLabel: '-1 kg',
    balanceLabel: '34 kg',
    note: 'Koreksi selisih stok fisik.',
  },
]

const initialStockOpnameItems: AdminStockOpnameItem[] = [
  createStockOpnameItem({
    id: 'OPN-20260601-001-ing-beras',
    date: '01 Jun 2026, 09:20',
    ingredientName: 'Beras',
    unit: 'kg',
    systemStock: 35,
    physicalStock: 34,
    note: 'Koreksi selisih stok fisik saat hitung pagi.',
    handledBy: 'Admin Demo',
  }),
  createStockOpnameItem({
    id: 'OPN-20260531-001-ing-minyak',
    date: '31 Mei 2026, 18:10',
    ingredientName: 'Minyak Goreng',
    unit: 'liter',
    systemStock: 9,
    physicalStock: 9,
    note: 'Stok fisik sesuai dengan sistem.',
    handledBy: 'Supervisor',
  }),
]

const initialStockInItems: AdminStockInItem[] = [
  {
    id: 'SIN-20260601-003',
    date: '01 Jun 2026, 10:05',
    supplierName: 'Mina Jaya',
    itemCount: 2,
    totalQuantityLabel: '16 kg',
    totalCostLabel: formatCurrency(410000),
    status: 'posted',
    statusLabel: 'Tercatat',
    statusTone: 'success',
  },
  {
    id: 'SIN-20260601-002',
    date: '01 Jun 2026, 08:30',
    supplierName: 'Pasar Pagi Sentosa',
    itemCount: 4,
    totalQuantityLabel: '24 kg',
    totalCostLabel: formatCurrency(785000),
    status: 'checked',
    statusLabel: 'Dicek',
    statusTone: 'info',
  },
  {
    id: 'SIN-20260531-006',
    date: '31 Mei 2026, 16:12',
    supplierName: 'CV Dapur Makmur',
    itemCount: 3,
    totalQuantityLabel: '36 liter',
    totalCostLabel: formatCurrency(630000),
    status: 'draft',
    statusLabel: 'Draft',
    statusTone: 'warning',
  },
]

const initialStockOutItems: AdminStockOutItem[] = [
  {
    id: 'SOUT-20260601-004',
    date: '01 Jun 2026, 12:18',
    reason: 'operational',
    reasonLabel: 'Operasional',
    ingredientName: 'Cabai Merah',
    quantityLabel: '1,5 kg',
    handledBy: 'Admin Demo',
    status: 'posted',
    statusLabel: 'Tercatat',
    statusTone: 'success',
  },
  {
    id: 'SOUT-20260601-003',
    date: '01 Jun 2026, 11:45',
    reason: 'damaged',
    reasonLabel: 'Rusak',
    ingredientName: 'Tomat',
    quantityLabel: '2 kg',
    handledBy: 'Admin Demo',
    status: 'posted',
    statusLabel: 'Tercatat',
    statusTone: 'success',
  },
  {
    id: 'SOUT-20260531-002',
    date: '31 Mei 2026, 15:10',
    reason: 'manual',
    reasonLabel: 'Penyesuaian',
    ingredientName: 'Beras',
    quantityLabel: '1 kg',
    handledBy: 'Supervisor',
    status: 'draft',
    statusLabel: 'Draft',
    statusTone: 'warning',
  },
]

const initialSuppliers: AdminSupplier[] = [
  {
    id: 'sup-sari-tani',
    name: 'Pemasok Sari Tani',
    contactName: 'Bu Rini',
    phone: '0812-3456-7788',
    address: 'Pasar Giwangan, Yogyakarta',
    itemCount: 18,
    status: 'active',
    statusLabel: 'Aktif',
    statusTone: 'success',
  },
  {
    id: 'sup-mina-jaya',
    name: 'Mina Jaya',
    contactName: 'Pak Damar',
    phone: '0813-8821-4400',
    address: 'Jl. Imogiri Barat',
    itemCount: 7,
    status: 'active',
    statusLabel: 'Aktif',
    statusTone: 'success',
  },
  {
    id: 'sup-dapur-makmur',
    name: 'CV Dapur Makmur',
    contactName: 'Nadia',
    phone: '0878-1200-9911',
    address: 'Jl. Kaliurang KM 7',
    itemCount: 11,
    status: 'active',
    statusLabel: 'Aktif',
    statusTone: 'success',
  },
  {
    id: 'sup-lama',
    name: 'Supplier Lama',
    contactName: 'Arsip',
    phone: '-',
    address: 'Tidak digunakan',
    itemCount: 0,
    status: 'inactive',
    statusLabel: 'Nonaktif',
    statusTone: 'default',
  },
]

const initialUsers: AdminUser[] = [
  {
    id: 'user-admin',
    name: 'Admin Demo',
    username: 'admin',
    email: 'admin@sistem.test',
    role: 'admin',
    roleLabel: 'Admin',
    status: 'active',
    statusLabel: 'Aktif',
    statusTone: 'success',
    lastLogin: 'Hari ini, 15:40',
  },
  {
    id: 'user-cashier',
    name: 'Kasir Demo',
    username: 'kasir',
    email: 'kasir@sistem.test',
    role: 'cashier',
    roleLabel: 'Kasir',
    status: 'active',
    statusLabel: 'Aktif',
    statusTone: 'success',
    lastLogin: 'Hari ini, 14:22',
  },
  {
    id: 'user-supervisor',
    name: 'Supervisor Dapur',
    username: 'supervisor',
    email: 'supervisor@sistem.test',
    role: 'admin',
    roleLabel: 'Admin',
    status: 'inactive',
    statusLabel: 'Nonaktif',
    statusTone: 'default',
    lastLogin: '29 Mei 2026',
  },
]

export function useAdminManagementData() {
  const menus = useState<AdminMenuItem[]>('admin:menus', () => initialMenus.map(item => ({ ...item })))
  const menuCategoryItems = useState<AdminMenuCategory[]>('admin:menu-categories', () => initialMenuCategories.map(item => ({ ...item })))
  const unitItems = useState<AdminUnit[]>('admin:units', () => initialUnits.map(item => ({ ...item })))
  const ingredientItems = useState<AdminIngredient[]>('admin:ingredients', () => ingredients.map(item => ({ ...item })))
  const stockHistoryItems = useState<AdminStockHistoryItem[]>('admin:stock-history', () => initialStockHistory.map(item => ({ ...item })))
  const stockInStateItems = useState<AdminStockInItem[]>('admin:stock-in-items', () => initialStockInItems.map(item => ({ ...item })))
  const stockOpnameItems = useState<AdminStockOpnameItem[]>('admin:stock-opname-items', () => initialStockOpnameItems.map(item => ({ ...item })))
  const stockOutStateItems = useState<AdminStockOutItem[]>('admin:stock-out-items', () => initialStockOutItems.map(item => ({ ...item })))
  const supplierItems = useState<AdminSupplier[]>('admin:suppliers', () => initialSuppliers.map(item => ({ ...item })))
  const userItems = useState<AdminUser[]>('admin:users', () => initialUsers.map(item => ({ ...item })))
  const semiFinishedIngredients = useState<AdminSemiFinishedIngredient[]>('admin:semi-finished-ingredients', () => (
    initialSemiFinishedIngredients.map(item => ({
      ...item,
      recipeItems: item.recipeItems?.map(recipeItem => ({ ...recipeItem })),
    }))
  ))

  function addMenuCategory(payload: AdminMenuCategoryFormPayload) {
    const item = createMenuCategory({
      ...payload,
      id: createEntityId('cat', payload.name),
      updatedAt: 'Baru saja',
    })

    menuCategoryItems.value = [item, ...menuCategoryItems.value]

    return item
  }

  function updateMenuCategory(id: string, payload: AdminMenuCategoryFormPayload) {
    let updatedItem: AdminMenuCategory | undefined

    menuCategoryItems.value = menuCategoryItems.value.map((item) => {
      if (item.id !== id) {
        return item
      }

      updatedItem = createMenuCategory({
        ...payload,
        id,
        updatedAt: 'Baru saja',
      })

      return updatedItem
    })

    return updatedItem
  }

  function deleteMenuCategory(id: string) {
    const deletedItem = menuCategoryItems.value.find(item => item.id === id)
    menuCategoryItems.value = menuCategoryItems.value.filter(item => item.id !== id)

    return deletedItem
  }

  function addMenu(payload: AdminMenuFormPayload) {
    const menu = createMenu({
      ...payload,
      id: createMenuId(payload.name),
      imageUrl: payload.imageUrl || undefined,
      updatedAt: 'Baru saja',
    })

    menus.value = [menu, ...menus.value]

    return menu
  }

  function updateMenu(id: string, payload: AdminMenuFormPayload) {
    let updatedItem: AdminMenuItem | undefined

    menus.value = menus.value.map((item) => {
      if (item.id !== id) {
        return item
      }

      updatedItem = createMenu({
        ...payload,
        id,
        imageUrl: payload.imageUrl || undefined,
        updatedAt: 'Baru saja',
      })

      return updatedItem
    })

    return updatedItem
  }

  function deleteMenu(id: string) {
    const deletedItem = menus.value.find(item => item.id === id)
    menus.value = menus.value.filter(item => item.id !== id)

    return deletedItem
  }

  function addUnit(payload: AdminUnitFormPayload) {
    const item = createUnit({
      ...payload,
      id: createEntityId('unit', payload.name),
    })

    unitItems.value = [item, ...unitItems.value]

    return item
  }

  function updateUnit(id: string, payload: AdminUnitFormPayload) {
    let updatedItem: AdminUnit | undefined

    unitItems.value = unitItems.value.map((item) => {
      if (item.id !== id) {
        return item
      }

      updatedItem = createUnit({
        ...payload,
        id,
      })

      return updatedItem
    })

    return updatedItem
  }

  function deleteUnit(id: string) {
    const deletedItem = unitItems.value.find(item => item.id === id)
    unitItems.value = unitItems.value.filter(item => item.id !== id)

    return deletedItem
  }

  function addIngredient(payload: AdminIngredientFormPayload) {
    const item = createIngredient(
      createEntityId('ing', payload.name),
      payload.name,
      payload.unit,
      payload.stock,
      payload.minimumStock,
      payload.costPerUnit,
      payload.supplierName,
    )

    ingredientItems.value = [item, ...ingredientItems.value]

    return item
  }

  function updateIngredient(id: string, payload: AdminIngredientFormPayload) {
    let updatedItem: AdminIngredient | undefined

    ingredientItems.value = ingredientItems.value.map((item) => {
      if (item.id !== id) {
        return item
      }

      updatedItem = createIngredient(
        id,
        payload.name,
        payload.unit,
        payload.stock,
        payload.minimumStock,
        payload.costPerUnit,
        payload.supplierName,
      )

      return updatedItem
    })

    return updatedItem
  }

  function deleteIngredient(id: string) {
    const deletedItem = ingredientItems.value.find(item => item.id === id)
    ingredientItems.value = ingredientItems.value.filter(item => item.id !== id)

    return deletedItem
  }

  function addSemiFinishedIngredient(payload: AdminSemiFinishedIngredientFormPayload) {
    const item = createSemiFinishedIngredient({
      ...payload,
      id: createSemiFinishedIngredientId(payload.name),
      updatedAt: 'Baru saja',
    })

    semiFinishedIngredients.value = [item, ...semiFinishedIngredients.value]

    return item
  }

  function updateSemiFinishedIngredient(id: string, payload: AdminSemiFinishedIngredientFormPayload) {
    let updatedItem: AdminSemiFinishedIngredient | undefined

    semiFinishedIngredients.value = semiFinishedIngredients.value.map((item) => {
      if (item.id !== id) {
        return item
      }

      updatedItem = createSemiFinishedIngredient({
        ...payload,
        id,
        stock: item.stock,
        updatedAt: 'Baru saja',
      })

      return updatedItem
    })

    return updatedItem
  }

  function deleteSemiFinishedIngredient(id: string) {
    const deletedItem = semiFinishedIngredients.value.find(item => item.id === id)
    semiFinishedIngredients.value = semiFinishedIngredients.value.filter(item => item.id !== id)

    return deletedItem
  }

  function addStockIn(payload: AdminStockInFormPayload) {
    const item = createStockInItem({
      ...payload,
      id: payload.id?.trim() || createStockInId(),
      date: payload.date || formatCurrentDateTime(),
    })

    stockInStateItems.value = [item, ...stockInStateItems.value]

    return item
  }

  function updateStockIn(id: string, payload: AdminStockInFormPayload) {
    let updatedItem: AdminStockInItem | undefined

    stockInStateItems.value = stockInStateItems.value.map((item) => {
      if (item.id !== id) {
        return item
      }

      updatedItem = createStockInItem({
        ...payload,
        id: payload.id?.trim() || id,
        date: payload.date || item.date,
      })

      return updatedItem
    })

    return updatedItem
  }

  function deleteStockIn(id: string) {
    const deletedItem = stockInStateItems.value.find(item => item.id === id)
    stockInStateItems.value = stockInStateItems.value.filter(item => item.id !== id)

    return deletedItem
  }

  function addStockOpname(payload: AdminStockOpnameFormPayload) {
    const date = formatCurrentDateTime()
    const batchId = createStockOpnameId()
    const items = payload.lines.map((line, index) => createStockOpnameItem({
      id: `${batchId}-${String(index + 1).padStart(3, '0')}`,
      date,
      itemType: line.itemType,
      ingredientName: line.ingredientName,
      unit: line.unit,
      systemStock: line.systemStock,
      physicalStock: line.physicalStock,
      note: line.note || 'Stok fisik sesuai dengan sistem.',
      handledBy: payload.handledBy || 'Admin',
    }))
    const historyItems = items
      .filter(item => item.difference !== 0)
      .map(item => createStockOpnameHistoryItem(item, batchId))

    stockOpnameItems.value = [...items, ...stockOpnameItems.value]

    if (historyItems.length) {
      stockHistoryItems.value = [...historyItems, ...stockHistoryItems.value]
    }

    const rawLineByIngredientId = new Map(payload.lines
      .filter(line => line.itemType === 'ingredient')
      .map(line => [line.ingredientId, line]))
    const semiFinishedLineById = new Map(payload.lines
      .filter(line => line.itemType === 'semi_finished')
      .map(line => [line.ingredientId, line]))

    ingredientItems.value = ingredientItems.value.map((item) => {
      const line = rawLineByIngredientId.get(item.id)

      if (!line) {
        return item
      }

      return createIngredient(
        item.id,
        item.name,
        item.unit,
        line.physicalStock,
        item.minimumStock,
        item.costPerUnit,
        item.supplierName,
      )
    })

    semiFinishedIngredients.value = semiFinishedIngredients.value.map((item) => {
      const line = semiFinishedLineById.get(item.id)

      if (!line) {
        return item
      }

      return createSemiFinishedIngredient({
        ...item,
        stock: line.physicalStock,
        updatedAt: 'Baru saja',
      })
    })

    return items
  }

  function addStockOut(payload: AdminStockOutFormPayload) {
    const item = createStockOutItem({
      ...payload,
      id: payload.id?.trim() || createStockOutId(),
      date: payload.date || formatCurrentDateTime(),
    })

    stockOutStateItems.value = [item, ...stockOutStateItems.value]

    return item
  }

  function updateStockOut(id: string, payload: AdminStockOutFormPayload) {
    let updatedItem: AdminStockOutItem | undefined

    stockOutStateItems.value = stockOutStateItems.value.map((item) => {
      if (item.id !== id) {
        return item
      }

      updatedItem = createStockOutItem({
        ...payload,
        id: payload.id?.trim() || id,
        date: payload.date || item.date,
      })

      return updatedItem
    })

    return updatedItem
  }

  function deleteStockOut(id: string) {
    const deletedItem = stockOutStateItems.value.find(item => item.id === id)
    stockOutStateItems.value = stockOutStateItems.value.filter(item => item.id !== id)

    return deletedItem
  }

  function addSupplier(payload: AdminSupplierFormPayload) {
    const item = createSupplier({
      ...payload,
      id: createEntityId('sup', payload.name),
    })

    supplierItems.value = [item, ...supplierItems.value]

    return item
  }

  function updateSupplier(id: string, payload: AdminSupplierFormPayload) {
    let updatedItem: AdminSupplier | undefined

    supplierItems.value = supplierItems.value.map((item) => {
      if (item.id !== id) {
        return item
      }

      updatedItem = createSupplier({
        ...payload,
        id,
      })

      return updatedItem
    })

    return updatedItem
  }

  function deleteSupplier(id: string) {
    const deletedItem = supplierItems.value.find(item => item.id === id)
    supplierItems.value = supplierItems.value.filter(item => item.id !== id)

    return deletedItem
  }

  function addUser(payload: AdminUserFormPayload) {
    const item = createUser({
      ...payload,
      id: createEntityId('user', payload.username || payload.name),
    })

    userItems.value = [item, ...userItems.value]

    return item
  }

  function updateUser(id: string, payload: AdminUserFormPayload) {
    let updatedItem: AdminUser | undefined

    userItems.value = userItems.value.map((item) => {
      if (item.id !== id) {
        return item
      }

      updatedItem = createUser({
        ...payload,
        id,
      })

      return updatedItem
    })

    return updatedItem
  }

  function deleteUser(id: string) {
    const deletedItem = userItems.value.find(item => item.id === id)
    userItems.value = userItems.value.filter(item => item.id !== id)

    return deletedItem
  }

  return {
    menus,
    menuCategories: computed(() => menuCategoryItems.value),
    units: computed(() => unitItems.value),
    ingredients: computed(() => ingredientItems.value),
    semiFinishedIngredients,
    stockHistory: computed(() => stockHistoryItems.value),
    stockInItems: computed(() => stockInStateItems.value),
    stockOpnameItems,
    stockOutItems: computed(() => stockOutStateItems.value),
    suppliers: computed(() => supplierItems.value),
    users: computed(() => userItems.value),
    addMenuCategory,
    updateMenuCategory,
    deleteMenuCategory,
    addMenu,
    updateMenu,
    deleteMenu,
    addUnit,
    updateUnit,
    deleteUnit,
    addIngredient,
    updateIngredient,
    deleteIngredient,
    addSemiFinishedIngredient,
    updateSemiFinishedIngredient,
    deleteSemiFinishedIngredient,
    addStockIn,
    updateStockIn,
    deleteStockIn,
    addStockOpname,
    addStockOut,
    updateStockOut,
    deleteStockOut,
    addSupplier,
    updateSupplier,
    deleteSupplier,
    addUser,
    updateUser,
    deleteUser,
  }
}

function createMenuId(name: string) {
  const slug = name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    || 'menu'

  return `menu-${slug}-${Date.now()}`
}

function createSemiFinishedIngredientId(name: string) {
  const slug = name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    || 'olahan'

  return `semi-${slug}-${Date.now()}`
}

function createEntityId(prefix: string, name: string) {
  const slug = name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    || prefix

  return `${prefix}-${slug}-${Date.now()}`
}

function createMenu(params: {
  id: string
  name: string
  sku: string
  category: string
  imageUrl?: string
  recipeItemCount: number
  recipeSummary: string
  totalRecipeCost: number
  sellingPrice: number
  recipeItems?: AdminMenuItem['recipeItems']
  status: AdminMenuItem['status']
  updatedAt: string
}): AdminMenuItem {
  const margin = params.sellingPrice - params.totalRecipeCost
  const marginPercent = params.sellingPrice > 0 ? Math.round((margin / params.sellingPrice) * 100) : 0

  return {
    ...params,
    totalRecipeCostLabel: formatCurrency(params.totalRecipeCost),
    sellingPriceLabel: formatCurrency(params.sellingPrice),
    margin,
    marginLabel: formatCurrency(margin),
    marginPercent,
    marginPercentLabel: `${formatNumber(marginPercent)}% dari harga jual`,
    statusLabel: params.status === 'active' ? 'Aktif' : 'Nonaktif',
    statusTone: params.status === 'active' ? 'success' : 'default',
  }
}

function createMenuCategory(params: AdminMenuCategoryFormPayload & {
  id: string
  updatedAt: string
}): AdminMenuCategory {
  const totalMenus = normalizeCount(params.totalMenus)
  const activeMenus = Math.min(totalMenus, normalizeCount(params.activeMenus))

  return {
    ...params,
    totalMenus,
    activeMenus,
    statusLabel: getActiveStatusLabel(params.status),
    statusTone: getActiveStatusTone(params.status),
  }
}

function createUnit(params: AdminUnitFormPayload & {
  id: string
}): AdminUnit {
  return {
    ...params,
    itemCount: normalizeCount(params.itemCount),
    statusLabel: getActiveStatusLabel(params.status),
    statusTone: getActiveStatusTone(params.status),
  }
}

function createIngredient(
  id: string,
  name: string,
  unit: string,
  stock: number,
  minimumStock: number,
  costPerUnit: number,
  supplierName: string,
): AdminIngredient {
  const stockStatus = getStockStatus(stock, minimumStock)

  return {
    id,
    name,
    unit,
    stock,
    minimumStock,
    costPerUnit,
    stockLabel: `${formatNumber(stock)} ${unit}`,
    minimumStockLabel: `${formatNumber(minimumStock)} ${unit}`,
    costPerUnitLabel: `${formatCurrency(costPerUnit)}/${unit}`,
    supplierName,
    stockStatus,
    stockStatusLabel: getStockStatusLabel(stockStatus),
    stockStatusTone: getStockStatusTone(stockStatus),
  }
}

function createStockInItem(params: AdminStockInFormPayload & {
  id: string
}): AdminStockInItem {
  return {
    id: params.id,
    date: params.date,
    supplierName: params.supplierName,
    itemCount: normalizeCount(params.itemCount),
    totalQuantityLabel: params.totalQuantityLabel,
    totalCostLabel: formatCurrency(params.totalCost),
    status: params.status,
    statusLabel: getStockInStatusLabel(params.status),
    statusTone: getStockInStatusTone(params.status),
  }
}

function createStockOutItem(params: AdminStockOutFormPayload & {
  id: string
}): AdminStockOutItem {
  return {
    id: params.id,
    date: params.date,
    reason: params.reason,
    reasonLabel: getStockOutReasonLabel(params.reason),
    ingredientName: params.ingredientName,
    quantityLabel: params.quantityLabel,
    handledBy: params.handledBy,
    status: params.status,
    statusLabel: getPostedStatusLabel(params.status),
    statusTone: getPostedStatusTone(params.status),
  }
}

function createSupplier(params: AdminSupplierFormPayload & {
  id: string
}): AdminSupplier {
  return {
    ...params,
    itemCount: normalizeCount(params.itemCount),
    statusLabel: getActiveStatusLabel(params.status),
    statusTone: getActiveStatusTone(params.status),
  }
}

function createUser(params: AdminUserFormPayload & {
  id: string
}): AdminUser {
  return {
    ...params,
    roleLabel: params.role === 'admin' ? 'Admin' : 'Kasir',
    statusLabel: getActiveStatusLabel(params.status),
    statusTone: getActiveStatusTone(params.status),
  }
}

function createSemiFinishedIngredient(params: {
  id: string
  name: string
  unit: string
  stock?: number
  recipeItemCount: number
  recipeSummary: string
  recipeItems?: AdminSemiFinishedIngredient['recipeItems']
  targetYield: number
  totalRecipeCost: number
  status: AdminSemiFinishedIngredient['status']
  updatedAt: string
}): AdminSemiFinishedIngredient {
  const costPerUnit = params.targetYield > 0 ? Math.round(params.totalRecipeCost / params.targetYield) : 0
  const stock = roundStock(params.stock ?? 0)

  return {
    ...params,
    stock,
    stockLabel: formatQuantity(stock, params.unit),
    targetYieldLabel: `${formatNumber(params.targetYield)} ${params.unit}`,
    totalRecipeCostLabel: formatCurrency(params.totalRecipeCost),
    costPerUnit,
    costPerUnitLabel: `${formatCurrency(costPerUnit)}/${params.unit}`,
    statusLabel: params.status === 'active' ? 'Aktif' : 'Nonaktif',
    statusTone: params.status === 'active' ? 'success' : 'default',
  }
}

function createStockOpnameItem(params: {
  id: string
  date: string
  itemType?: AdminStockOpnameItemType
  ingredientName: string
  unit: string
  systemStock: number
  physicalStock: number
  note: string
  handledBy: string
}): AdminStockOpnameItem {
  const difference = roundStock(params.physicalStock - params.systemStock)
  const isBalanced = difference === 0

  return {
    ...params,
    itemType: params.itemType ?? 'ingredient',
    itemTypeLabel: getStockOpnameItemTypeLabel(params.itemType ?? 'ingredient'),
    difference,
    systemStockLabel: formatQuantity(params.systemStock, params.unit),
    physicalStockLabel: formatQuantity(params.physicalStock, params.unit),
    differenceLabel: formatSignedQuantity(difference, params.unit),
    differenceTone: getStockOpnameDifferenceTone(difference),
    status: isBalanced ? 'balanced' : 'adjusted',
    statusLabel: isBalanced ? 'Sesuai' : 'Selisih',
    statusTone: isBalanced ? 'success' : 'warning',
  }
}

function createStockOpnameHistoryItem(item: AdminStockOpnameItem, batchId: string): AdminStockHistoryItem {
  return {
    id: `hist-${item.id}`,
    date: item.date,
    ingredientName: item.ingredientName,
    type: 'opname',
    typeLabel: 'Opname',
    typeTone: item.differenceTone,
    source: batchId,
    quantityLabel: item.differenceLabel,
    balanceLabel: item.physicalStockLabel,
    note: item.note,
  }
}

function getStockStatus(stock: number, minimumStock: number): AdminIngredient['stockStatus'] {
  if (stock <= minimumStock * 0.6) {
    return 'critical'
  }

  if (stock <= minimumStock) {
    return 'low'
  }

  return 'safe'
}

function getStockStatusLabel(status: AdminIngredient['stockStatus']) {
  if (status === 'critical') {
    return 'Kritis'
  }

  if (status === 'low') {
    return 'Menipis'
  }

  return 'Aman'
}

function getStockStatusTone(status: AdminIngredient['stockStatus']): AdminStatusTone {
  if (status === 'critical') {
    return 'destructive'
  }

  if (status === 'low') {
    return 'warning'
  }

  return 'success'
}

function getActiveStatusLabel(status: 'active' | 'inactive') {
  return status === 'active' ? 'Aktif' : 'Nonaktif'
}

function getActiveStatusTone(status: 'active' | 'inactive'): AdminStatusTone {
  return status === 'active' ? 'success' : 'default'
}

function getStockInStatusLabel(status: AdminStockInItem['status']) {
  if (status === 'posted') {
    return 'Tercatat'
  }

  if (status === 'checked') {
    return 'Dicek'
  }

  return 'Draft'
}

function getStockInStatusTone(status: AdminStockInItem['status']): AdminStatusTone {
  if (status === 'posted') {
    return 'success'
  }

  if (status === 'checked') {
    return 'info'
  }

  return 'warning'
}

function getPostedStatusLabel(status: 'draft' | 'posted') {
  return status === 'posted' ? 'Tercatat' : 'Draft'
}

function getPostedStatusTone(status: 'draft' | 'posted'): AdminStatusTone {
  return status === 'posted' ? 'success' : 'warning'
}

function getStockOutReasonLabel(reason: AdminStockOutItem['reason']) {
  if (reason === 'damaged') {
    return 'Rusak'
  }

  if (reason === 'lost') {
    return 'Hilang'
  }

  if (reason === 'operational') {
    return 'Operasional'
  }

  return 'Penyesuaian'
}

function formatCurrency(value: number) {
  return currencyFormatter.format(value).replace(/\s/g, '')
}

function formatNumber(value: number) {
  return numberFormatter.format(value)
}

function formatQuantity(value: number, unit: string) {
  return `${formatNumber(roundStock(value))} ${unit}`
}

function formatSignedQuantity(value: number, unit: string) {
  if (value > 0) {
    return `+${formatQuantity(value, unit)}`
  }

  return formatQuantity(value, unit)
}

function getStockOpnameItemTypeLabel(type: AdminStockOpnameItemType) {
  return type === 'semi_finished' ? 'Bahan setengah jadi' : 'Bahan baku'
}

function getStockOpnameDifferenceTone(value: number): AdminStatusTone {
  if (value === 0) {
    return 'success'
  }

  if (value < 0) {
    return 'destructive'
  }

  return 'warning'
}

function roundStock(value: number) {
  return Math.round(value * 100) / 100
}

function normalizeCount(value: number) {
  return Math.max(0, Math.round(Number.isFinite(value) ? value : 0))
}

function createStockInId() {
  return createDocumentId('SIN')
}

function createStockOutId() {
  return createDocumentId('SOUT')
}

function createStockOpnameId() {
  return createDocumentId('OPN')
}

function createDocumentId(prefix: string) {
  const now = new Date()
  const dateId = [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, '0'),
    String(now.getDate()).padStart(2, '0'),
  ].join('')

  return `${prefix}-${dateId}-${String(now.getTime()).slice(-5)}`
}

function formatCurrentDateTime() {
  return new Intl.DateTimeFormat('id-ID', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date())
}
