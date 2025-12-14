import { Ministry, MinistryId, Translation, NavItem, Employee, AttendanceRecord, Shift } from './types';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  Landmark, 
  MessageSquare,
  Settings,
  PieChart,
  ShoppingCart,
  Package,
  Monitor,
  ClipboardList,
  Clock,
  CreditCard,
  Briefcase,
  Plane,
  GraduationCap,
  UserPlus,
  Clipboard,
  Truck,
  Wrench,
  Tag,
  MapPin,
  BarChart3,
  Box,
  Factory,
  List,
  Calculator,
  Coins,
  Banknote,
  Percent,
  TrendingUp,
  FileSpreadsheet,
  Table,
  ScrollText,
  Files
} from 'lucide-react';

export const MINISTRIES: Ministry[] = [
  {
    id: MinistryId.OIL,
    name: { ar: 'وزارة النفط', en: 'Ministry of Oil' },
    budget: 85000000000,
    employees: 45000,
    activeProjects: 120,
    color: '#0ea5e9'
  },
  {
    id: MinistryId.HEALTH,
    name: { ar: 'وزارة الصحة', en: 'Ministry of Health' },
    budget: 4200000000,
    employees: 120000,
    activeProjects: 340,
    color: '#ef4444'
  },
  {
    id: MinistryId.EDUCATION,
    name: { ar: 'وزارة التربية', en: 'Ministry of Education' },
    budget: 3500000000,
    employees: 350000,
    activeProjects: 85,
    color: '#eab308'
  },
  {
    id: MinistryId.FINANCE,
    name: { ar: 'وزارة المالية', en: 'Ministry of Finance' },
    budget: 1200000000,
    employees: 15000,
    activeProjects: 45,
    color: '#22c55e'
  },
  {
    id: MinistryId.INTERIOR,
    name: { ar: 'وزارة الداخلية', en: 'Ministry of Interior' },
    budget: 9000000000,
    employees: 550000,
    activeProjects: 200,
    color: '#64748b'
  }
];

export const TRANSLATIONS: Translation = {
  dashboard: { ar: 'لوحة القيادة', en: 'Dashboard' },
  hr_management: { ar: 'الموارد البشرية', en: 'HR Management' },
  employees: { ar: 'إدارة الموظفين', en: 'Employee Mgmt' },
  payroll: { ar: 'الرواتب', en: 'Payroll' },
  time_sheet: { ar: 'سجل الدوام', en: 'Time Sheet' },
  ess: { ar: 'الخدمة الذاتية', en: 'Self Service' },
  
  finance_management: { ar: 'الإدارة المالية', en: 'Financial Mgmt' },
  accounting: { ar: 'المحاسبة', en: 'Accounting' },
  budgeting: { ar: 'الموازنة والتخصيصات', en: 'Budgeting' },
  payments: { ar: 'المدفوعات', en: 'Payments' },
  reconciliation: { ar: 'المطابقة المصرفية', en: 'Reconciliation' },

  // Finance Submodules
  accounts_receivable: { ar: 'المقبوضات والحسابات المدينة', en: 'Accounts Receivable' },
  accounts_payable: { ar: 'الحسابات الدائنة', en: 'Accounts Payable' },
  general_ledger: { ar: 'دفتر الاستاذ', en: 'General Ledger' },
  cost_center_budget: { ar: 'مركز التكلفة والميزانية', en: 'Cost Center & Budget' },
  banking_payments: { ar: 'المدفوعات والأعمال المصرفية', en: 'Payments & Banking' },
  currencies: { ar: 'متعدد العملات', en: 'Multi-Currency' },
  profits: { ar: 'الربحية', en: 'Profitability' },
  taxes: { ar: 'الضرائب', en: 'Taxes' },
  finance_reports: { ar: 'التقارير', en: 'Reports' },
  finance_settings: { ar: 'إعدادات', en: 'Settings' },
  financial_statements: { ar: 'البيانات المالية', en: 'Financial Statements' },
  main_accounts: { ar: 'الحسابات الرئيسية', en: 'Main Accounts' },
  opening_closing: { ar: 'افتتاح واختتام', en: 'Opening & Closing' },

  // Dashboard Shortcuts
  chart_of_accounts: { ar: 'الشجرة المحاسبية', en: 'Chart of Accounts' },
  journal_entry: { ar: 'القيود اليومية', en: 'Journal Entry' },
  purchase_invoice: { ar: 'فاتورة مشتريات', en: 'Purchase Invoice' },
  sales_invoice: { ar: 'فاتورة مبيعات', en: 'Sales Invoice' },
  info_panel: { ar: 'لوحة المعلومات', en: 'Dashboard' },
  ledger_book: { ar: 'دفتر الاستاذ', en: 'Ledger' },

  // Main Accounts Items
  company: { ar: 'شركة', en: 'Company' },
  account_settings: { ar: 'إعدادات الحسابات', en: 'Account Settings' },
  fiscal_year: { ar: 'السنة المالية', en: 'Fiscal Year' },
  accounting_dimension: { ar: 'البعد المحاسبي', en: 'Accounting Dimension' },
  finance_book: { ar: 'كتاب المالية', en: 'Finance Book' },
  accounting_period: { ar: 'فترة المحاسبة', en: 'Accounting Period' },
  payment_terms: { ar: 'مصطلح الدفع', en: 'Payment Terms' },

  // GL Items
  journal_entry_template: { ar: 'قالب إدخال دفتر اليومية', en: 'Journal Entry Template' },
  ledger_summary: { ar: 'ملخص دفتر الأستاذ', en: 'Ledger Summary' },
  
  // AR Items
  customer: { ar: 'العميل', en: 'Customer' },
  payment_request: { ar: 'طلب الدفع من قبل المورد', en: 'Payment Request' },
  sales_register: { ar: 'سجل مبيعات', en: 'Sales Register' },
  sales_analysis: { ar: 'تحليل أوامر المبيعات', en: 'Sales Analysis' },
  ar_summary: { ar: 'ملخص الحسابات المدينة', en: 'AR Summary' },
  items_delivered_not_billed: { ar: 'مواد سلمت و لم يتم اصدار فواتيرها', en: 'Items Delivered Not Billed' },

  // AP Items
  supplier: { ar: 'المورد', en: 'Supplier' },
  purchase_register: { ar: 'سجل حركة المشتريات وفقاً للصنف', en: 'Purchase Register' },
  purchase_analysis: { ar: 'تحليل أوامر الشراء', en: 'Purchase Analysis' },
  ap_summary: { ar: 'ملخص الحسابات المستحقة للدفع', en: 'AP Summary' },
  items_received_not_billed: { ar: 'العناصر الواردة إلى أن توصف', en: 'Items Received Not Billed' },
  payment_entries: { ar: 'قيود المدفوعات', en: 'Payment Entries' },

  // Financial Statements
  trial_balance: { ar: 'ميزان المراجعة', en: 'Trial Balance' },
  pl_statement: { ar: 'الأرباح والخسائر', en: 'Profit & Loss' },
  balance_sheet: { ar: 'المركز المالي', en: 'Balance Sheet' },
  cash_flow: { ar: 'التدفق النقدي', en: 'Cash Flow' },
  consolidated_statements: { ar: 'القوائم المالية الموحدة', en: 'Consolidated Statements' },

  // Chart of Accounts Nodes
  assets: { ar: 'الموجودات', en: 'Assets' },
  fixed_assets: { ar: 'موجودات ثابتة', en: 'Fixed Assets' },
  current_assets: { ar: 'موجودات المتغيرة', en: 'Current Assets' },
  liabilities: { ar: 'المطلوبات', en: 'Liabilities' },
  fixed_liabilities: { ar: 'المطلوبات الثابتة', en: 'Long Term Liabilities' },
  equity: { ar: 'صافي الربح التجاري', en: 'Equity' }, // Using term from image
  expenses: { ar: 'المصاريف', en: 'Expenses' },
  income: { ar: 'الحسومات', en: 'Income' }, // Using term from image roughly

  // Trial Balance Columns
  opening_debit: { ar: 'افتتاح مدين', en: 'Opening Debit' },
  opening_credit: { ar: 'افتتاح دائن', en: 'Opening Credit' },
  debit: { ar: 'مدين', en: 'Debit' },
  credit: { ar: 'دائن', en: 'Credit' },
  closing_debit: { ar: 'ختامي مدين', en: 'Closing Debit' },
  closing_credit: { ar: 'ختامي دائن', en: 'Closing Credit' },
  show_zero_values: { ar: 'إظهار القيم الصفرية', en: 'Show Zero Values' },
  period_closing: { ar: 'قيد إغلاق الفترة', en: 'Period Closing' },

  // Journal Entry Form
  entry_type: { ar: 'نوع القيد', en: 'Entry Type' },
  reference_number: { ar: 'رقم القيد', en: 'Reference Number' },
  posting_date: { ar: 'تاريخ النشر', en: 'Posting Date' },
  accounting_entries: { ar: 'القيود المحاسبية', en: 'Accounting Entries' },
  account: { ar: 'الحساب', en: 'Account' },
  party_type: { ar: 'نوع الطرف', en: 'Party Type' },
  party: { ar: 'الطرف المعني', en: 'Party' },
  add_row: { ar: 'إضافة سطر', en: 'Add Row' },
  add_multiple: { ar: 'إضافة متعددة', en: 'Add Multiple' },
  print_settings: { ar: 'إعدادات الطباعة', en: 'Print Settings' },
  
  // Sales Invoice Form
  pos_profile: { ar: 'تشمل الدفع (POS)', en: 'Include POS Payment' },
  item_code: { ar: 'عنصر', en: 'Item' },
  quantity: { ar: 'كمية', en: 'Quantity' },
  rate: { ar: 'السعر الافرادي', en: 'Rate' },
  amount: { ar: 'السعر الإجمالي', en: 'Amount' },
  
  // Other
  currency: { ar: 'العملة', en: 'Currency' },
  exchange_rate: { ar: 'تصريف العملات', en: 'Exchange Rate' },
  revaluation: { ar: 'إعادة تقييم سعر الصرف', en: 'Exchange Rate Revaluation' },
  share_management: { ar: 'إدارة المشاركة', en: 'Share Management' },
  subscription_management: { ar: 'إدارة الاشتراك', en: 'Subscription Management' },
  bank_account: { ar: 'حساب مصرفي', en: 'Bank Account' },
  bank_reconciliation: { ar: 'تخليص المصرف', en: 'Bank Reconciliation' },
  match_payments: { ar: 'دفع المصالحة', en: 'Payment Reconciliation' },
  
  supply_chain: { ar: 'المخازن', en: 'Stock' }, 
  
  // SCM Submodules & Reports
  goods_pricing: { ar: 'السلع والتسعيرات', en: 'Goods & Pricing' },
  stock_entries: { ar: 'قيود المخزون', en: 'Stock Entries' },
  warehouse_ops: { ar: 'العمليات المخزنية', en: 'Warehouse Ops' },
  assets_management: { ar: 'شؤون الاصول', en: 'Assets Management' },
  stock_reports: { ar: 'تقارير الأسهم', en: 'Stock Reports' },
  settings_scm: { ar: 'إعدادات', en: 'Settings' },

  // SCM Shortcuts
  scm_dashboard: { ar: 'لوحة المعلومات', en: 'Dashboard' },
  stock_ledger: { ar: 'سجل المخزن', en: 'Stock Ledger' },
  purchase_receipt: { ar: 'إستلام مشتريات', en: 'Purchase Receipt' },
  stock_entry: { ar: 'قيد مخزون', en: 'Stock Entry' },
  material_request: { ar: 'طلب مواد', en: 'Material Request' },
  items: { ar: 'العناصر', en: 'Items' },

  // Goods & Pricing
  item_management: { ar: 'ادارة السلع والمواد', en: 'Item Management' },
  item_groups: { ar: 'مجموعة الصنف', en: 'Item Group' },
  product_bundle: { ar: 'باقة المنتجات', en: 'Product Bundle' },
  price_lists: { ar: 'قوائم الاسعار', en: 'Price Lists' },
  shipping_rules: { ar: 'قواعد الشحن', en: 'Shipping Rules' },
  pricing_rules: { ar: 'قواعد التسعير', en: 'Pricing Rules' },
  customs_tariff: { ar: 'رقم التعريفة الكمركية', en: 'Customs Tariff' },
  item_price: { ar: 'سعر الصنف', en: 'Item Price' },
  brand: { ar: 'العلامة التجارية', en: 'Brand' },

  // Stock Entries
  delivery_note: { ar: 'إشعار التسليم', en: 'Delivery Note' },
  delivery_trip: { ar: 'مسار التسليم', en: 'Delivery Trip' },
  pick_list: { ar: 'قائمة الاختيار', en: 'Pick List' },

  // Operations & Reports
  stock_reconciliation: { ar: 'جرد المخزون', en: 'Stock Reconciliation' },
  quality_inspection: { ar: 'فحص جودة المخزون', en: 'Quality Inspection' },
  inspection_form: { ar: 'استمارة فحص الجودة', en: 'Inspection Form' },
  stock_balance: { ar: 'رصيد المخزون', en: 'Stock Balance' },
  stock_analytics: { ar: 'تحليلات المخازن', en: 'Stock Analytics' },
  purchase_analytics: { ar: 'تحليلات المشتريات', en: 'Purchase Analytics' },
  serial_no: { ar: 'الرقم التسلسلي', en: 'Serial No' },
  batches: { ar: 'الدفعات', en: 'Batches' },
  
  // Settings
  warehouses: { ar: 'المستودعات', en: 'Warehouses' },
  uom: { ar: 'وحدة القياس', en: 'UOM' },

  // Assets
  asset_list: { ar: 'ادارة الاصول', en: 'Asset List' },
  asset_location: { ar: 'موقع الاصول', en: 'Asset Location' },
  asset_category: { ar: 'فئة الاصول', en: 'Asset Category' },
  asset_movement: { ar: 'حركة الاصول', en: 'Asset Movement' },
  
  // Maintenance
  maintenance: { ar: 'الصيانة', en: 'Maintenance' },
  maintenance_team: { ar: 'فرق الصيانة', en: 'Maintenance Team' },
  maintenance_schedule: { ar: 'جدول الصيانة', en: 'Maintenance Schedule' },
  maintenance_log: { ar: 'سجل صيانة الاصول', en: 'Maintenance Log' },
  asset_repair: { ar: 'اصلاح الاصول', en: 'Asset Repair' },

  documents: { ar: 'الأرشيف والكتب', en: 'Documents' },
  reports: { ar: 'التقارير', en: 'Reports' },
  ai_assistant: { ar: 'المساعد الذكي', en: 'Smart Assistant' },
  settings: { ar: 'الإعدادات', en: 'Settings' },

  ministry: { ar: 'الوزارة', en: 'Ministry' },
  select_ministry: { ar: 'اختر الوزارة', en: 'Select Ministry' },
  total_budget: { ar: 'إجمالي الميزانية (د.ع)', en: 'Total Budget (IQD)' },
  active_projects: { ar: 'المشاريع النشطة', en: 'Active Projects' },
  welcome: { ar: 'مرحباً بك في نظام إدارة موارد الدولة', en: 'Welcome to National ERP System' },
  indc: { ar: 'مركز البيانات الوطني', en: 'National Data Center' },
  notifications: { ar: 'الإشعارات', en: 'Notifications' },
  budget_distribution: { ar: 'توزيع الميزانية', en: 'Budget Distribution' },
  employee_growth: { ar: 'نمو الكوادر', en: 'Staff Growth' },
  generate_report: { ar: 'إنشاء تقرير ذكي', en: 'Generate Smart Report' },
  ai_prompt: { ar: 'اطلب من المساعد الذكي صياغة كتاب رسمي أو تحليل بيانات...', en: 'Ask the smart assistant to draft an official letter or analyze data...' },
  send: { ar: 'إرسال', en: 'Send' },
  thinking: { ar: 'جاري التفكير...', en: 'Thinking...' },
  draft_letter: { ar: 'صياغة كتاب رسمي', en: 'Draft Official Letter' },
  analyze_budget: { ar: 'تحليل الميزانية', en: 'Analyze Budget' },
  logout: { ar: 'تسجيل الخروج', en: 'Logout' },
  copyright: { ar: '© 2024 مركز البيانات الوطني - الحكومة العراقية', en: '© 2024 National Data Center - Iraqi Government' },
  
  // Widget specific
  low_stock: { ar: 'تنبيهات المخزون', en: 'Stock Alerts' },
  pending_requests: { ar: 'طلبات معلقة', en: 'Pending Requests' },
  items_low: { ar: 'مواد قاربت على النفاد', en: 'Items Low Stock' },

  // HR Specific
  shortcuts: { ar: 'اختصاراتك', en: 'Your Shortcuts' },
  main_reports: { ar: 'التقارير الرئيسية', en: 'Main Reports' },
  employee: { ar: 'الموظف', en: 'Employee' },
  leave_request: { ar: 'طلب إجازة', en: 'Leave Request' },
  attendance: { ar: 'الحضور', en: 'Attendance' },
  monthly_attendance: { ar: 'قائمة الحضور الشهرية', en: 'Monthly Attendance' },
  job_applicant: { ar: 'طالب الوظيفة', en: 'Job Applicant' },
  recruitment: { ar: 'التوظيف', en: 'Recruitment' },
  loans: { ar: 'القروض', en: 'Loans' },
  training: { ar: 'التدريب', en: 'Training' },
  performance: { ar: 'الأداء', en: 'Performance' },
  new_employee: { ar: 'موظف جديد', en: 'New Employee' },
  save: { ar: 'حفظ', en: 'Save' },
  cancel: { ar: 'إلغاء', en: 'Cancel' },
  missions: { ar: 'الإيفادات والوفود', en: 'Missions & Delegations' },
  vacations: { ar: 'الإجازات', en: 'Vacations' },
  transfers: { ar: 'النقل والتنسيب', en: 'Transfers' },
  complaints: { ar: 'الشكاوى', en: 'Complaints' },
  search: { ar: 'بحث', en: 'Search' },
  add_new: { ar: 'عنصر جديد', en: 'New Item' },
  add: { ar: 'إضافة', en: 'Add' },
  date: { ar: 'التاريخ', en: 'Date' },
  user: { ar: 'المستخدم', en: 'User' },
  details: { ar: 'التفاصيل', en: 'Details' },
  
  // Form Fields
  emp_code: { ar: 'رمز الموظف', en: 'Employee Code' },
  company_name: { ar: 'إسم الشركة', en: 'Company Name' },
  status: { ar: 'الحالة', en: 'Status' },
  first_name: { ar: 'الاسم الأول', en: 'First Name' },
  middle_name: { ar: 'الاسم الأوسط', en: 'Middle Name' },
  last_name: { ar: 'اسم العائلة', en: 'Last Name' },
  job_title: { ar: 'اللقب', en: 'Job Title' },
  job_type: { ar: 'نوع الوظيفة', en: 'Job Type' },
  gender: { ar: 'الجنس', en: 'Gender' },
  
  // Payroll & Attendance
  salary_structure: { ar: 'هيكل الراتب', en: 'Salary Structure' },
  payslip: { ar: 'كشف راتب', en: 'Payslip' },
  tax_allocation: { ar: 'تخصيص ضريبة الدخل', en: 'Tax Allocation' },
  shift_type: { ar: 'نوع المناوبة', en: 'Shift Type' },
  start_time: { ar: 'وقت البداية', en: 'Start Time' },
  end_time: { ar: 'وقت الانتهاء', en: 'End Time' },
  check_in: { ar: 'وقت الحضور', en: 'Check In' },
  check_out: { ar: 'وقت الانصراف', en: 'Check Out' },
  
  // Promotion & Insurance
  promotion: { ar: 'الترقيات', en: 'Promotions' },
  insurance: { ar: 'التأمين الصحي', en: 'Health Insurance' },
  promotion_date: { ar: 'تاريخ الترقية', en: 'Promotion Date' },
  department: { ar: 'القسم', en: 'Department' },
  hr_documents: { ar: 'مستمسكات', en: 'Documents' },
  
  company_name_val: { ar: 'شركة تقدم العراق', en: 'Taqadum Iraq Co.' },
  
  account_statement: { ar: 'كشف حساب', en: 'Account Statement' },
  edit_account: { ar: 'تعديل حساب', en: 'Edit Account' },
  add_account: { ar: 'إضافة حساب', en: 'Add Account' },
  cost_center: { ar: 'مركز التكلفة', en: 'Cost Center' },
  project: { ar: 'المشروع', en: 'Project' },
  account_name: { ar: 'اسم الحساب', en: 'Account Name' },
  
  
};

export const NAV_ITEMS: NavItem[] = [
  { 
    id: 'dashboard', 
    icon: LayoutDashboard, 
    label: TRANSLATIONS.dashboard, 
    path: '/' 
  },
  {
    id: 'hr',
    icon: Users,
    label: TRANSLATIONS.hr_management,
    children: [
      { id: 'hr_dash', icon: LayoutDashboard, label: TRANSLATIONS.dashboard, path: '/hr' },
      { id: 'employees', icon: Users, label: TRANSLATIONS.employees, path: '/hr/employees' },
      { id: 'vacations', icon: FileText, label: TRANSLATIONS.vacations, path: '/hr/vacations' },
      { id: 'recruitment', icon: UserPlus, label: TRANSLATIONS.recruitment, path: '/hr/recruitment' },
      { id: 'training', icon: GraduationCap, label: TRANSLATIONS.training, path: '/hr/training' },
      { id: 'missions', icon: Plane, label: TRANSLATIONS.missions, path: '/hr/missions' },
      { id: 'time_sheet', icon: Clock, label: TRANSLATIONS.time_sheet, path: '/hr/timesheet' },
      { id: 'payroll', icon: CreditCard, label: TRANSLATIONS.payroll, path: '/hr/payroll' },
    ]
  },
  {
    id: 'finance',
    icon: Landmark,
    label: TRANSLATIONS.finance_management,
    children: [
      { id: 'fin_dash', icon: LayoutDashboard, label: TRANSLATIONS.dashboard, path: '/finance' },
      { id: 'coa', icon: Files, label: TRANSLATIONS.chart_of_accounts, path: '/finance/coa' },
      { id: 'journal', icon: ScrollText, label: TRANSLATIONS.journal_entry, path: '/finance/journal' },
      { id: 'trial_balance', icon: Table, label: TRANSLATIONS.trial_balance, path: '/finance/trial-balance' },
      { id: 'sales_inv', icon: FileSpreadsheet, label: TRANSLATIONS.sales_invoice, path: '/finance/sales-invoice' },
      { id: 'ar', icon: FileSpreadsheet, label: TRANSLATIONS.accounts_receivable, path: '/finance/ar' },
      { id: 'ap', icon: ShoppingCart, label: TRANSLATIONS.accounts_payable, path: '/finance/ap' },
      { id: 'gl', icon: FileText, label: TRANSLATIONS.general_ledger, path: '/finance/gl' },
      { id: 'banking', icon: Banknote, label: TRANSLATIONS.banking_payments, path: '/finance/banking' },
      { id: 'fin_reports', icon: BarChart3, label: TRANSLATIONS.finance_reports, path: '/finance/reports' },
    ]
  },
  {
    id: 'supply_chain',
    icon: Package,
    label: TRANSLATIONS.supply_chain,
    children: [
      { id: 'scm_dash', icon: LayoutDashboard, label: TRANSLATIONS.dashboard, path: '/scm' },
      { id: 'goods', icon: ShoppingCart, label: TRANSLATIONS.items, path: '/scm/items' },
      { id: 'material_request', icon: FileText, label: TRANSLATIONS.material_request, path: '/scm/material-request' },
      { id: 'stock_entry', icon: ClipboardList, label: TRANSLATIONS.stock_entry, path: '/scm/stock-entry' },
      { id: 'warehouses', icon: Factory, label: TRANSLATIONS.warehouses, path: '/scm/warehouses' },
      { id: 'reports', icon: BarChart3, label: TRANSLATIONS.reports, path: '/scm/reports' },
      { id: 'analytics', icon: PieChart, label: TRANSLATIONS.purchase_analytics, path: '/scm/analytics' },
    ]
  },
  { 
    id: 'documents', 
    icon: FileText, 
    label: TRANSLATIONS.documents, 
    path: '/documents' 
  },
  { 
    id: 'reports', 
    icon: BarChart3, 
    label: TRANSLATIONS.reports, 
    path: '/reports' 
  },
  { 
    id: 'ai', 
    icon: MessageSquare, 
    label: TRANSLATIONS.ai_assistant, 
    path: '/ai' 
  },
  { 
    id: 'settings', 
    icon: Settings, 
    label: TRANSLATIONS.settings, 
    path: '/settings' 
  },
];

// --- Dummy Data ---

export const MOCK_EMPLOYEES: Employee[] = [
  { id: '1', code: '23574210', firstName: 'أحمد', middleName: 'محمد', lastName: 'العلي', jobTitle: 'مدير مشروع', department: 'تكنولوجيا المعلومات', status: 'active', joinDate: '2023-01-15', image: 'https://i.pravatar.cc/150?u=1' },
  { id: '2', code: '23574211', firstName: 'سارة', middleName: 'كريم', lastName: 'الساعدي', jobTitle: 'محاسب أقدم', department: 'المالية', status: 'active', joinDate: '2023-02-01', image: 'https://i.pravatar.cc/150?u=2' },
  { id: '3', code: '23574212', firstName: 'علي', middleName: 'حسن', lastName: 'الجاسم', jobTitle: 'مهندس برمجيات', department: 'تكنولوجيا المعلومات', status: 'active', joinDate: '2023-03-10', image: 'https://i.pravatar.cc/150?u=3' },
  { id: '4', code: '23574213', firstName: 'نور', middleName: 'أحمد', lastName: 'البياتي', jobTitle: 'مسؤول موارد بشرية', department: 'الموارد البشرية', status: 'active', joinDate: '2023-04-05', image: 'https://i.pravatar.cc/150?u=4' },
];

export const MOCK_SHIFTS: Shift[] = [
  { id: '1', name: 'مناوبة موظف', startTime: '08:00 ص', endTime: '04:00 م', active: true },
  { id: '2', name: 'مناوبة محاسب', startTime: '09:00 ص', endTime: '05:00 م', active: true },
];

export const MOCK_ATTENDANCE: AttendanceRecord[] = [
  { id: '1', employeeId: '1', employeeName: 'أحمد محمد', date: '2024-05-20', checkIn: '08:05', checkOut: '16:00', status: 'present' },
  { id: '2', employeeId: '2', employeeName: 'سارة كريم', date: '2024-05-20', checkIn: '08:00', checkOut: '16:10', status: 'present' },
  { id: '3', employeeId: '3', employeeName: 'علي حسن', date: '2024-05-20', checkIn: '09:30', checkOut: '17:00', status: 'late' },
];

export const SCM_DUMMY_ITEMS = [
  { id: 1, name: 'لابتوب ديل XPS', category: 'الكترونيات', price: '1,200,000', status: 'متوفر' },
  { id: 2, name: 'طابعة ليزر HP', category: 'معدات مكتبية', price: '350,000', status: 'متوفر' },
  { id: 3, name: 'ورق A4 (كرتون)', category: 'قرطاسية', price: '45,000', status: 'منخفض' },
  { id: 4, name: 'قلم حبر أزرق (علبة)', category: 'قرطاسية', price: '12,000', status: 'متوفر' },
];

export const SCM_WAREHOUSES = [
  { id: 1, name: 'المخزن الرئيسي', company: 'شركة تقدم العراق', isGroup: true },
  { id: 2, name: 'مخزن الإلكترونيات', company: 'شركة تقدم العراق', isGroup: false },
  { id: 3, name: 'مخزن القرطاسية', company: 'شركة تقدم العراق', isGroup: false },
];