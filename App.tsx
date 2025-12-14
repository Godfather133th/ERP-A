import React, { useState, useContext, createContext, useEffect, ReactNode } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation, useNavigate, Outlet, useParams } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  MessageSquare,
  Landmark,
  Search,
  Plus,
  ChevronLeft,
  ChevronDown,
  ChevronRight,
  Bell,
  Menu,
  X,
  Globe,
  Send,
  Loader2,
  Building2,
  FileText,
  Settings,
  Package,
  Calendar,
  Clipboard,
  UserPlus,
  Briefcase,
  CreditCard,
  Save,
  MoreHorizontal,
  Printer,
  Trash2,
  Edit,
  CheckSquare,
  Square,
  GraduationCap,
  Plane,
  AlertCircle,
  ShoppingCart,
  Truck,
  ClipboardList,
  Wrench,
  Tag,
  MapPin,
  BarChart3,
  Box,
  Factory,
  List,
  FilePlus,
  ArrowRightLeft,
  CheckCircle2,
  PieChart as PieChartIcon,
  Clock,
  FileSpreadsheet,
  Banknote,
  Percent,
  TrendingUp,
  Coins,
  Calculator,
  Share2,
  Table,
  Files,
  ScrollText,
  Check,
  TrendingDown,
  Activity,
  FileCheck
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart as RePieChart, 
  Pie, 
  Cell, 
  LineChart, 
  Line,
  AreaChart,
  Area
} from 'recharts';

import { MINISTRIES, TRANSLATIONS, NAV_ITEMS, MOCK_EMPLOYEES, MOCK_SHIFTS, MOCK_ATTENDANCE, SCM_DUMMY_ITEMS, SCM_WAREHOUSES } from './constants';
import { Ministry, MinistryId, Language, NavItem, Employee } from './types';
import { generateSmartResponse } from './services/geminiService';

// --- Context ---

interface AppContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
  direction: 'rtl' | 'ltr';
  ministry: Ministry;
  setMinistry: (m: Ministry) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

// --- Helper Components ---

const PageHeader = ({ title, icon: Icon, actions, subtitle }: { title: string, icon?: any, actions?: React.ReactNode, subtitle?: string }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
      <div>
        <div className="flex items-center gap-3 mb-1">
            {Icon && <div className="p-2 bg-white border border-gray-200 shadow-sm rounded-lg text-royal-900"><Icon className="w-6 h-6" /></div>}
            <h1 className="text-2xl font-bold text-gray-800 tracking-tight">{title}</h1>
        </div>
        {subtitle && <p className="text-gray-500 text-sm">{subtitle}</p>}
      </div>
      {actions && <div className="flex items-center gap-3">{actions}</div>}
    </div>
  );
};

const StatCard = ({ title, value, icon: Icon, trend, trendValue, color = "blue" }: any) => (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
        <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity`}>
            <Icon className="w-24 h-24 transform rotate-12 -mr-4 -mt-4" />
        </div>
        <div className="flex justify-between items-start mb-4 relative z-10">
            <div>
                <p className="text-gray-500 text-sm font-medium mb-1">{title}</p>
                <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
            </div>
            <div className={`p-2 rounded-lg bg-${color}-50 text-${color}-600`}>
                <Icon className="w-5 h-5" />
            </div>
        </div>
        {trend && (
            <div className="flex items-center gap-1 text-xs font-medium relative z-10">
                <span className={`${trend === 'up' ? 'text-emerald-600' : 'text-red-600'} flex items-center`}>
                    {trend === 'up' ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                    {trendValue}
                </span>
                <span className="text-gray-400">vs last month</span>
            </div>
        )}
    </div>
);

const ShortcutCard = ({ icon: Icon, title, onClick, colorClass = "bg-white", textClass = "text-gray-700" }: { icon: any, title: string, onClick?: () => void, colorClass?: string, textClass?: string }) => (
  <button 
    onClick={onClick}
    className={`${colorClass} ${textClass} border border-gray-200 rounded-xl p-5 flex flex-col items-center justify-center gap-3 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 w-full group`}
  >
    <div className="p-3 rounded-full bg-gray-50 group-hover:bg-gray-100 transition-colors">
        <Icon className="w-8 h-8 opacity-80 group-hover:opacity-100" />
    </div>
    <span className="text-sm font-bold text-center leading-tight">{title}</span>
  </button>
);

// SCM & Finance specific styles reused but refined
const SCM_THEME_COLOR = 'bg-orange-600';
const SCM_BUTTON_COLOR = 'bg-orange-600 hover:bg-orange-700';
const FIN_THEME_COLOR = 'bg-emerald-700';
const FIN_BUTTON_COLOR = 'bg-emerald-700 hover:bg-emerald-800';

const ReportGroup = ({ title, items, themeColor }: { title: string, items: {label: string, onClick?: () => void}[], themeColor: string }) => (
   <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden h-full flex flex-col">
      <div className={`${themeColor} text-white p-3 font-bold text-center text-lg shadow-sm`}>
         {title}
      </div>
      <div className="p-4 space-y-2 flex-1">
         {items.map((item, idx) => (
            <div key={idx} onClick={item.onClick} className={`flex items-center gap-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 p-2 rounded-lg cursor-pointer text-sm font-medium transition-colors`}>
               <div className={`w-1.5 h-1.5 rounded-full ${themeColor} opacity-60`}></div>
               <span>{item.label}</span>
            </div>
         ))}
      </div>
   </div>
);

// --- HR Views ---

const EmployeeListView = () => {
   const { t, lang } = useAppContext();
   const navigate = useNavigate();
   const [searchQuery, setSearchQuery] = useState('');
   const [departmentFilter, setDepartmentFilter] = useState('all');

   const departments = Array.from(new Set(MOCK_EMPLOYEES.map(e => e.department)));

   const filteredEmployees = MOCK_EMPLOYEES.filter(emp => {
      const term = searchQuery.toLowerCase();
      const matchesSearch = (
         `${emp.firstName} ${emp.middleName} ${emp.lastName}`.toLowerCase().includes(term) ||
         emp.code.toLowerCase().includes(term) ||
         emp.jobTitle.toLowerCase().includes(term)
      );
      const matchesDept = departmentFilter === 'all' || emp.department === departmentFilter;
      return matchesSearch && matchesDept;
   });

   return (
      <div className="animate-fade-in space-y-6">
         <PageHeader 
            title={t('employees')} 
            icon={Users}
            subtitle={t('manage_staff_subtitle')}
            actions={
               <button onClick={() => navigate('/hr/employees/new')} className="bg-royal-900 text-white px-5 py-2.5 rounded-lg flex items-center gap-2 hover:bg-royal-800 shadow-md transition-all">
                  <Plus className="w-4 h-4" />
                  {t('new_employee')}
               </button>
            }
         />

         {/* Search & Filter Bar */}
         <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto flex-1">
                <div className="relative flex-1 max-w-md">
                    <input 
                        type="text" 
                        placeholder={t('search_placeholder')} 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className={`w-full py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-royal-900/20 focus:border-royal-900 transition-all ${lang === 'ar' ? 'pr-10 pl-4' : 'pl-10 pr-4'}`}
                    />
                    <Search className={`absolute top-3 w-5 h-5 text-gray-400 ${lang === 'ar' ? 'right-3' : 'left-3'}`} />
                </div>
                
                <select 
                    value={departmentFilter}
                    onChange={(e) => setDepartmentFilter(e.target.value)}
                    className="py-2.5 px-4 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-royal-900/20 focus:border-royal-900 text-gray-700"
                >
                    <option value="all">{t('all_departments')}</option>
                    {departments.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
            </div>
            
            <div className="text-sm text-gray-500 font-medium">
                {filteredEmployees.length} {t('records_found')}
            </div>
         </div>

         <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                <thead className="bg-gray-50 text-gray-600 font-bold border-b border-gray-200 uppercase tracking-wider text-xs">
                    <tr>
                        <th className="p-4 text-start">#</th>
                        <th className="p-4 text-start">{t('employee')}</th>
                        <th className="p-4 text-start">{t('job_title')}</th>
                        <th className="p-4 text-start">{t('department')}</th>
                        <th className="p-4 text-start">{t('join_date')}</th>
                        <th className="p-4 text-start">{t('status')}</th>
                        <th className="p-4 text-start"></th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {filteredEmployees.map(emp => (
                        <tr key={emp.id} onClick={() => navigate(`/hr/employees/${emp.id}`)} className="hover:bg-blue-50/50 cursor-pointer transition-colors group">
                            <td className="p-4 font-mono text-gray-500">{emp.code}</td>
                            <td className="p-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gray-100 p-0.5 border border-gray-200">
                                        <img src={emp.image} alt="" className="w-full h-full rounded-full object-cover"/>
                                    </div>
                                    <span className="font-bold text-gray-800">{emp.firstName} {emp.lastName}</span>
                                </div>
                            </td>
                            <td className="p-4 text-gray-600">{emp.jobTitle}</td>
                            <td className="p-4 text-gray-600">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                    {emp.department}
                                </span>
                            </td>
                            <td className="p-4 text-gray-500">{emp.joinDate}</td>
                            <td className="p-4">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${emp.status === 'active' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}`}>
                                {emp.status}
                            </span>
                            </td>
                            <td className="p-4 text-end">
                                <ChevronLeft className={`w-5 h-5 text-gray-300 group-hover:text-royal-900 transition-colors ${lang==='en'?'rotate-180':''}`} />
                            </td>
                        </tr>
                    ))}
                    {filteredEmployees.length === 0 && (
                        <tr>
                            <td colSpan={7} className="p-12 text-center text-gray-500">
                                <div className="flex flex-col items-center justify-center">
                                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-3">
                                        <Search className="w-8 h-8 text-gray-300" />
                                    </div>
                                    <p className="font-medium">{lang === 'ar' ? 'لا توجد نتائج مطابقة' : 'No matching results found'}</p>
                                    <p className="text-xs text-gray-400 mt-1">{t('try_different_search')}</p>
                                </div>
                            </td>
                        </tr>
                    )}
                </tbody>
                </table>
            </div>
         </div>
      </div>
   )
}

const EmployeeDetailView = () => {
  const { t, lang } = useAppContext();
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('profile');
  
  const emp = MOCK_EMPLOYEES.find(e => e.id === id) || MOCK_EMPLOYEES[0];

  const tabs = [
    { id: 'profile', label: lang === 'ar' ? 'الملف الشخصي' : 'Profile', icon: UserPlus },
    { id: 'promotions', label: t('promotion'), icon: TrendingUp },
    { id: 'documents', label: t('documents'), icon: FileText },
    { id: 'performance', label: t('performance'), icon: BarChart3 },
  ];

  return (
    <div className="animate-fade-in max-w-6xl mx-auto space-y-6">
      {/* Official ID Card Style Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden relative">
         <div className="h-32 bg-gradient-to-r from-royal-900 to-royal-800 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 pattern-grid-lg"></div>
         </div>
         <div className="px-8 pb-8 flex flex-col md:flex-row items-end md:items-end -mt-12 gap-6">
             <div className="w-24 h-24 rounded-2xl bg-white p-1 shadow-lg border border-gray-100 shrink-0">
                <img src={emp.image} alt="" className="w-full h-full rounded-xl object-cover"/>
             </div>
             <div className="flex-1 mb-2">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900">{emp.firstName} {emp.middleName} {emp.lastName}</h2>
                        <div className="flex items-center gap-3 text-gray-500 mt-1">
                            <span className="flex items-center gap-1"><Briefcase className="w-4 h-4" /> {emp.jobTitle}</span>
                            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                            <span className="flex items-center gap-1"><Building2 className="w-4 h-4" /> {emp.department}</span>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-50 font-medium shadow-sm">
                            <Printer className="w-4 h-4" /> {lang === 'ar' ? 'طباعة' : 'Print'}
                        </button>
                        <button className="bg-royal-900 text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-royal-800 shadow-md font-bold">
                            <Save className="w-4 h-4" />
                            {t('save')}
                        </button>
                    </div>
                </div>
             </div>
         </div>
         
         {/* Tabs */}
         <div className="px-8 flex border-t border-gray-100 overflow-x-auto">
            {tabs.map(tab => {
               const Icon = tab.icon;
               return (
               <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 text-sm font-bold whitespace-nowrap transition-all border-b-2 ${
                     activeTab === tab.id 
                     ? 'border-royal-900 text-royal-900 bg-blue-50/50' 
                     : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`}
               >
                  <Icon className="w-4 h-4" />
                  {tab.label}
               </button>
            )})}
         </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 min-h-[400px]">
            {activeTab === 'profile' && (
               <div className="space-y-8 animate-fade-in">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div className="space-y-4">
                        <h3 className="text-lg font-bold text-gray-900 border-b pb-2">{lang==='ar'?'المعلومات الأساسية':'Basic Info'}</h3>
                        <div className="grid grid-cols-1 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">{t('emp_code')}</label>
                                <input type="text" defaultValue={emp.code} className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 font-medium focus:ring-2 focus:ring-royal-900/20 outline-none" />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">{t('company_name')}</label>
                                <input type="text" defaultValue={t('company_name_val')} disabled className="w-full bg-gray-100 border border-gray-200 rounded-lg p-3 text-gray-500" />
                            </div>
                        </div>
                     </div>
                     <div className="space-y-4">
                        <h3 className="text-lg font-bold text-gray-900 border-b pb-2">{lang==='ar'?'معلومات الاتصال':'Contact Info'}</h3>
                        <div className="grid grid-cols-1 gap-4">
                             <div className="space-y-1.5">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Email</label>
                                <input type="email" defaultValue={`${emp.code}@indc.gov.iq`} className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 font-medium focus:ring-2 focus:ring-royal-900/20 outline-none text-left" dir="ltr" />
                            </div>
                             <div className="space-y-1.5">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">{lang==='ar'?'الهاتف':'Phone'}</label>
                                <input type="text" defaultValue="+964 770 000 0000" className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 font-medium focus:ring-2 focus:ring-royal-900/20 outline-none text-left" dir="ltr" />
                            </div>
                        </div>
                     </div>
                  </div>
               </div>
            )}

            {activeTab === 'documents' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
                    {['National ID', 'Passport', 'Contract', 'Degree'].map((doc, i) => (
                        <div key={i} className="border border-gray-200 rounded-xl p-4 hover:border-royal-900 hover:shadow-md transition-all cursor-pointer group bg-gray-50">
                            <div className="flex items-start justify-between mb-3">
                                <div className="p-2 bg-white rounded-lg shadow-sm">
                                    <FileText className="w-6 h-6 text-royal-900" />
                                </div>
                                <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded font-medium">Verified</span>
                            </div>
                            <h4 className="font-bold text-gray-800 mb-1">{doc}</h4>
                            <p className="text-xs text-gray-500">Updated: 12 Jan 2024</p>
                        </div>
                    ))}
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 flex flex-col items-center justify-center text-gray-400 hover:border-royal-900 hover:text-royal-900 cursor-pointer transition-colors min-h-[120px]">
                        <Plus className="w-8 h-8 mb-2" />
                        <span className="text-sm font-medium">{t('add_new')}</span>
                    </div>
                </div>
            )}

            {(activeTab === 'promotions' || activeTab === 'performance') && (
               <div className="border border-dashed border-gray-300 rounded-xl p-12 flex flex-col items-center justify-center text-gray-400 animate-fade-in">
                   <AlertCircle className="w-16 h-16 mb-4 opacity-30" />
                   <p className="font-medium text-lg">{lang === 'ar' ? 'لا توجد بيانات متاحة للعرض' : 'No data available to display'}</p>
                   <p className="text-sm mt-2">{t('try_different_search')}</p>
               </div>
            )}
      </div>
    </div>
  );
};

// --- Missing Components Definitions ---

const PlaceholderPage = ({ title }: { title: string }) => {
  const { t } = useAppContext();
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-gray-400 animate-fade-in">
      <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4 shadow-sm">
        <Briefcase className="w-10 h-10 opacity-30 text-royal-900" />
      </div>
      <h2 className="text-xl font-bold text-gray-600">{title}</h2>
      <p className="mt-2 text-sm text-gray-500">{t('welcome')}</p>
    </div>
  );
};

// HR Components
const HRDashboard = () => {
    const { t } = useAppContext();
    return (
        <div className="space-y-6 animate-fade-in">
             <PageHeader title={t('dashboard')} icon={LayoutDashboard} subtitle="HR Management Overview" />
             <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <StatCard title="Total Employees" value="1,250" icon={Users} trend="up" trendValue="5%" color="blue" />
                <StatCard title="Present Today" value="1,180" icon={CheckCircle2} color="emerald" />
                <StatCard title="On Leave" value="45" icon={Plane} color="amber" />
                <StatCard title="New Requests" value="12" icon={AlertCircle} color="red" />
             </div>
             <PlaceholderPage title="HR Analytics" />
        </div>
    );
};

const LeavesView = () => <PlaceholderPage title="Vacations & Leaves" />;
const RecruitmentView = () => <PlaceholderPage title="Recruitment Pipeline" />;
const TrainingView = () => <PlaceholderPage title="Training Programs" />;
const MissionsView = () => <PlaceholderPage title="Missions & Delegations" />;
const PayrollDashboard = () => <PlaceholderPage title="Payroll Management" />;
const AttendanceView = () => <PlaceholderPage title="Attendance & Timesheets" />;

// Finance Components
const FinanceDashboard = () => {
    const { t } = useAppContext();
    return (
        <div className="space-y-6 animate-fade-in">
             <PageHeader title={t('dashboard')} icon={LayoutDashboard} subtitle="Financial Overview" />
             <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <StatCard title="Total Revenue" value="$4.2M" icon={Coins} trend="up" trendValue="12%" color="emerald" />
                <StatCard title="Total Expenses" value="$2.1M" icon={TrendingDown} color="red" />
                <StatCard title="Net Profit" value="$2.1M" icon={TrendingUp} color="blue" />
                <StatCard title="Pending Invoices" value="8" icon={FileText} color="amber" />
             </div>
             <PlaceholderPage title="Financial Statements" />
        </div>
    );
};

const ChartOfAccountsView = () => <PlaceholderPage title="Chart of Accounts" />;
const TrialBalanceView = () => <PlaceholderPage title="Trial Balance" />;
const JournalEntryForm = () => <PlaceholderPage title="Journal Entry Form" />;
const SalesInvoiceForm = () => <PlaceholderPage title="Sales Invoice Form" />;

const GenericFinanceView = ({ title, items, columns }: { title: string, items: any[], columns: { key: string, label: string }[] }) => {
    return (
        <div className="space-y-6 animate-fade-in">
            <PageHeader title={title} icon={Table} />
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50 text-gray-600 font-bold border-b border-gray-200 uppercase tracking-wider text-xs">
                            <tr>
                                {columns.map((col, i) => (
                                    <th key={i} className="p-4">{col.label}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {items.map((item, idx) => (
                                <tr key={idx} className="hover:bg-gray-50 transition-colors">
                                    {columns.map((col, i) => (
                                        <td key={i} className="p-4 text-gray-700">{item[col.key]}</td>
                                    ))}
                                </tr>
                            ))}
                            {items.length === 0 && (
                                <tr>
                                    <td colSpan={columns.length} className="p-8 text-center text-gray-500">
                                        No data available
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

// SCM Components
const SCMDashboard = () => {
    const { t } = useAppContext();
    return (
        <div className="space-y-6 animate-fade-in">
             <PageHeader title={t('dashboard')} icon={LayoutDashboard} subtitle="Supply Chain Overview" />
             <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <StatCard title="Total Stock Value" value="$1.2M" icon={Package} trend="up" trendValue="2%" color="orange" />
                <StatCard title="Low Stock Items" value="15" icon={AlertCircle} color="red" />
                <StatCard title="Pending Requests" value="23" icon={ClipboardList} color="blue" />
                <StatCard title="Deliveries Today" value="8" icon={Truck} color="emerald" />
             </div>
             <PlaceholderPage title="SCM Operations" />
        </div>
    );
};
const ItemsView = () => <PlaceholderPage title="Items Master" />;
const MaterialRequestForm = () => <PlaceholderPage title="Material Request" />;
const StockEntryForm = () => <PlaceholderPage title="Stock Entry" />;
const WarehousesView = () => <PlaceholderPage title="Warehouse Management" />;
const SCMReportsView = () => <PlaceholderPage title="Supply Chain Reports" />;
const PurchaseAnalyticsView = () => <PlaceholderPage title="Purchase Analytics" />;


// --- Dashboard ---

const Dashboard = () => {
    const { t, lang, ministry } = useAppContext();
    
    return (
        <div className="space-y-8 animate-fade-in">
            {/* Welcome Hero */}
            <div className="islamic-pattern rounded-2xl p-8 md:p-10 text-white shadow-xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-royal-900/90 to-royal-800/80 z-0"></div>
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <div className="flex items-center gap-3 mb-2 opacity-80">
                            <Building2 className="w-5 h-5" />
                            <span className="uppercase tracking-wider text-xs font-bold">{t('indc')}</span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold mb-2 leading-tight">{t('welcome')}</h1>
                        <p className="text-blue-100 text-lg">{ministry.name[lang]}</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors border border-white/20">
                            {t('reports')}
                        </button>
                        <button className="bg-white text-royal-900 px-6 py-2 rounded-lg text-sm font-bold shadow-lg hover:bg-gray-50 transition-colors">
                            {t('ai_assistant')}
                        </button>
                    </div>
                </div>
            </div>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard 
                    title={t('total_budget')} 
                    value="85B IQD" 
                    icon={Coins} 
                    trend="down" 
                    trendValue="12%"
                    color="emerald"
                />
                <StatCard 
                    title={t('employees')} 
                    value={ministry.employees.toLocaleString()} 
                    icon={Users} 
                    trend="up" 
                    trendValue="4%"
                    color="blue"
                />
                <StatCard 
                    title={t('active_projects')} 
                    value={ministry.activeProjects} 
                    icon={Briefcase} 
                    trend="up" 
                    trendValue="2"
                    color="amber"
                />
                <StatCard 
                    title={t('pending_requests')} 
                    value="14" 
                    icon={AlertCircle} 
                    color="red"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Chart */}
                <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-gray-800 text-lg flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-royal-900" />
                            {t('budget_distribution')}
                        </h3>
                        <select className="bg-gray-50 border border-gray-200 text-xs rounded-lg px-2 py-1 outline-none">
                            <option>This Year</option>
                            <option>Last Year</option>
                        </select>
                    </div>
                    <div className="h-72 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={[
                                {name: 'Jan', income: 4000, expense: 2400},
                                {name: 'Feb', income: 3000, expense: 1398},
                                {name: 'Mar', income: 2000, expense: 9800},
                                {name: 'Apr', income: 2780, expense: 3908},
                                {name: 'May', income: 1890, expense: 4800},
                                {name: 'Jun', income: 2390, expense: 3800},
                            ]}>
                                <defs>
                                    <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#1e3a8a" stopOpacity={0.1}/>
                                        <stop offset="95%" stopColor="#1e3a8a" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                                <Tooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                                <Area type="monotone" dataKey="income" stroke="#1e3a8a" strokeWidth={3} fillOpacity={1} fill="url(#colorIncome)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Notifications / Activity Feed */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                    <h3 className="font-bold text-gray-800 text-lg mb-6 flex items-center gap-2">
                        <Bell className="w-5 h-5 text-royal-900" />
                        {t('notifications')}
                    </h3>
                    <div className="space-y-6">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="flex gap-4 items-start">
                                <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${i === 1 ? 'bg-red-500' : 'bg-gray-300'}`}></div>
                                <div>
                                    <p className="text-sm font-medium text-gray-800 leading-tight">
                                        {lang === 'ar' ? 'تم استلام طلب موازنة جديد من قسم المالية' : 'New budget request received from Finance Dept.'}
                                    </p>
                                    <span className="text-xs text-gray-400 mt-1 block">2 hours ago</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="w-full mt-6 py-2 text-sm text-royal-900 font-bold hover:bg-gray-50 rounded-lg transition-colors">
                        {t('view_all')}
                    </button>
                </div>
            </div>
        </div>
    );
};

const AIAssistant = () => {
    const { t, lang } = useAppContext();
    const [prompt, setPrompt] = useState('');
    const [messages, setMessages] = useState<{role: 'user' | 'assistant', text: string}[]>([]);
    const [loading, setLoading] = useState(false);

    const suggestions = [
        t('draft_letter'),
        t('analyze_budget'),
        lang === 'ar' ? 'تلخيص تقرير' : 'Summarize Report',
        lang === 'ar' ? 'إنشاء خطة مشروع' : 'Create Project Plan'
    ];

    const handleSend = async (text = prompt) => {
        if (!text.trim()) return;
        setMessages(prev => [...prev, {role: 'user', text}]);
        setPrompt('');
        setLoading(true);
        
        // Simulating context awareness
        const context = "User is in the AI Assistant module. Ministry: Finance. Role: Admin.";
        const res = await generateSmartResponse(text, context, lang);
        
        setMessages(prev => [...prev, {role: 'assistant', text: res}]);
        setLoading(false);
    };

    return (
        <div className="h-[calc(100vh-140px)] flex flex-col animate-fade-in gap-4">
            <PageHeader title={t('ai_assistant')} icon={MessageSquare} subtitle="Powered by Gemini 2.5 Flash" />
            
            <div className="flex-1 bg-white rounded-2xl border border-gray-200 shadow-sm flex flex-col overflow-hidden relative">
                {/* Chat Area */}
                <div className="flex-1 p-6 overflow-y-auto space-y-6 bg-slate-50 custom-scrollbar">
                    {messages.length === 0 && (
                         <div className="h-full flex flex-col items-center justify-center text-gray-400 opacity-60">
                            <div className="w-20 h-20 bg-white rounded-full shadow-sm flex items-center justify-center mb-4">
                                <MessageSquare className="w-10 h-10 text-royal-900" />
                            </div>
                            <p className="font-medium text-lg">{t('ai_prompt')}</p>
                         </div>
                    )}
                    
                    {messages.map((msg, idx) => (
                        <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[80%] md:max-w-[70%] p-4 rounded-2xl shadow-sm ${
                                msg.role === 'user' 
                                ? 'bg-royal-900 text-white rounded-br-none' 
                                : 'bg-white text-gray-800 border border-gray-100 rounded-bl-none'
                            }`}>
                                <p className="whitespace-pre-wrap leading-relaxed text-sm md:text-base">{msg.text}</p>
                            </div>
                        </div>
                    ))}
                    
                    {loading && (
                        <div className="flex justify-start">
                            <div className="bg-white border border-gray-100 p-4 rounded-2xl rounded-bl-none shadow-sm flex items-center gap-3 text-gray-500">
                                <Loader2 className="w-5 h-5 animate-spin text-royal-900" />
                                <span className="text-sm font-medium">{t('thinking')}</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Input Area */}
                <div className="p-4 bg-white border-t border-gray-200">
                    {messages.length === 0 && (
                        <div className="flex gap-2 overflow-x-auto pb-4 custom-scrollbar">
                            {suggestions.map((s, i) => (
                                <button 
                                    key={i} 
                                    onClick={() => handleSend(s)}
                                    className="whitespace-nowrap px-4 py-2 bg-gray-50 hover:bg-royal-50 text-gray-600 hover:text-royal-900 border border-gray-200 hover:border-royal-200 rounded-full text-xs font-medium transition-all"
                                >
                                    {s}
                                </button>
                            ))}
                        </div>
                    )}
                    <div className="flex gap-3 relative">
                        <input
                            type="text"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            placeholder={t('ai_prompt')}
                            className="flex-1 p-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-royal-900/20 focus:border-royal-900 transition-all pl-4 pr-12"
                            disabled={loading}
                        />
                        <button 
                            onClick={() => handleSend()}
                            disabled={loading || !prompt.trim()}
                            className="absolute right-2 top-2 bottom-2 bg-royal-900 text-white px-4 rounded-lg hover:bg-royal-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
                        >
                            <Send className={`w-5 h-5 ${lang === 'ar' ? 'rotate-180' : ''}`} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- Layout ---

const SidebarItem = ({ item, depth = 0 }: { item: NavItem, depth?: number }) => {
    const { t, lang } = useAppContext();
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const hasChildren = item.children && item.children.length > 0;
    const isActive = item.path ? location.pathname === item.path : false;
    const isChildActive = item.children?.some(c => location.pathname === c.path);

    useEffect(() => {
        if (isChildActive) setIsOpen(true);
    }, [isChildActive]);

    const Icon = item.icon;

    if (hasChildren) {
        return (
            <div className="mb-1">
                <button 
                    onClick={() => setIsOpen(!isOpen)}
                    className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200 ${
                        isChildActive 
                        ? 'bg-white/10 text-white shadow-sm' 
                        : 'text-slate-300 hover:bg-white/5 hover:text-white'
                    }`}
                    style={{ paddingInlineStart: `${(depth * 1) + 0.75}rem` }}
                >
                    <div className="flex items-center gap-3">
                        <Icon className={`w-5 h-5 ${isChildActive ? 'text-amber-400' : 'opacity-70'}`} />
                        <span className="font-medium text-sm tracking-wide">{item.label[lang]}</span>
                    </div>
                    {isOpen ? <ChevronDown className="w-4 h-4 opacity-50" /> : (lang === 'ar' ? <ChevronLeft className="w-4 h-4 opacity-50" /> : <ChevronRight className="w-4 h-4 opacity-50" />)}
                </button>
                {isOpen && (
                    <div className="mt-1 space-y-1 relative before:absolute before:left-6 before:top-0 before:bottom-0 before:w-px before:bg-white/10">
                        {item.children!.map(child => (
                            <SidebarItem key={child.id} item={child} depth={depth + 1} />
                        ))}
                    </div>
                )}
            </div>
        );
    }

    return (
        <Link 
            to={item.path || '#'} 
            className={`flex items-center gap-3 p-3 rounded-xl mb-1 transition-all duration-200 ${
                isActive 
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-md font-bold' 
                : 'text-slate-300 hover:bg-white/5 hover:text-white'
            }`}
            style={{ paddingInlineStart: `${(depth * 1) + 0.75}rem` }}
        >
            <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'opacity-70'}`} />
            <span className="text-sm">{item.label[lang]}</span>
        </Link>
    );
};

const Layout = () => {
    const { lang, setLang, t, direction, ministry, setMinistry } = useAppContext();
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const location = useLocation();
    
    // Close sidebar on mobile on route change
    useEffect(() => {
        if (window.innerWidth < 768) setSidebarOpen(false);
    }, [location]);

    return (
        <div className="min-h-screen bg-slate-50 flex font-sans text-gray-900" dir={direction}>
            {/* Mobile Overlay */}
            {sidebarOpen && (
                <div 
                    className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-30 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside 
                className={`fixed md:sticky top-0 h-screen w-72 bg-slate-900 text-white z-40 transition-transform duration-300 ease-out flex flex-col shadow-2xl ${
                    sidebarOpen ? 'translate-x-0' : (direction === 'rtl' ? 'translate-x-full' : '-translate-x-full')
                } md:translate-x-0`}
            >
                {/* Logo Area */}
                <div className="h-20 flex items-center gap-3 px-6 border-b border-white/10 bg-slate-950/30">
                    <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center text-white shadow-lg shadow-amber-500/20">
                        <Landmark className="w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="font-bold text-lg tracking-tight leading-none mb-1">INDC ERP</h1>
                        <span className="text-[10px] text-slate-400 uppercase tracking-widest">National Data Center</span>
                    </div>
                    <button onClick={() => setSidebarOpen(false)} className="md:hidden text-slate-400 ml-auto">
                        <X className="w-6 h-6" />
                    </button>
                </div>
                
                {/* Navigation */}
                <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                    {NAV_ITEMS.map(item => (
                        <SidebarItem key={item.id} item={item} />
                    ))}
                </div>

                {/* Footer User Profile */}
                <div className="p-4 border-t border-white/10 bg-slate-950/20">
                    <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 transition-colors cursor-pointer">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 p-0.5">
                            <img src="https://i.pravatar.cc/150?u=admin" alt="Admin" className="w-full h-full rounded-full border-2 border-slate-900 object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-white truncate">Admin User</p>
                            <p className="text-xs text-slate-400 truncate">System Administrator</p>
                        </div>
                        <Settings className="w-4 h-4 text-slate-500" />
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 min-w-0 flex flex-col h-screen overflow-hidden bg-slate-50/50">
                {/* Header */}
                <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-6 shrink-0 z-20 sticky top-0">
                    <div className="flex items-center gap-4">
                        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 md:hidden transition-colors">
                            <Menu className="w-6 h-6" />
                        </button>
                        
                        {/* Ministry Selector */}
                        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-full border border-gray-200">
                            <Building2 className="w-4 h-4 text-gray-400" />
                            <select 
                                value={ministry.id}
                                onChange={(e) => {
                                    const m = MINISTRIES.find(min => min.id === e.target.value);
                                    if(m) setMinistry(m);
                                }}
                                className="bg-transparent text-sm font-bold text-gray-700 outline-none cursor-pointer"
                            >
                                {MINISTRIES.map(m => (
                                    <option key={m.id} value={m.id}>{m.name[lang]}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="relative p-2.5 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
                            <Search className="w-5 h-5" />
                        </button>
                        
                        <button className="relative p-2.5 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white animate-pulse"></span>
                        </button>

                        <div className="h-8 w-px bg-gray-200 hidden sm:block"></div>

                        <button 
                            onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all text-sm font-bold text-gray-700 group"
                        >
                            <Globe className="w-4 h-4 text-gray-400 group-hover:text-royal-900 transition-colors" />
                            {lang === 'ar' ? 'English' : 'العربية'}
                        </button>
                    </div>
                </header>

                {/* Page Content */}
                <div className="flex-1 overflow-auto p-4 md:p-8 custom-scrollbar">
                    <div className="max-w-7xl mx-auto">
                        <Outlet />
                    </div>
                </div>
            </main>
        </div>
    );
};

// --- App Root ---

const App = () => {
  const [lang, setLang] = useState<Language>('ar');
  const [ministry, setMinistry] = useState<Ministry>(MINISTRIES[0]);

  const t = (key: string) => {
    return TRANSLATIONS[key]?.[lang] || key;
  };

  const direction = lang === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = direction;
  }, [lang, direction]);

  return (
    <AppContext.Provider value={{ lang, setLang, t, direction, ministry, setMinistry }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="hr">
                <Route index element={<HRDashboard />} /> 
                <Route path="employees" element={<EmployeeListView />} />
                <Route path="employees/:id" element={<EmployeeDetailView />} />
                <Route path="employees/new" element={<EmployeeDetailView />} />
                <Route path="vacations" element={<LeavesView />} />
                <Route path="recruitment" element={<RecruitmentView />} />
                <Route path="training" element={<TrainingView />} />
                <Route path="missions" element={<MissionsView />} />
                <Route path="payroll" element={<PayrollDashboard />} />
                <Route path="timesheet" element={<AttendanceView />} />
                <Route path="*" element={<div className="p-12 text-center text-gray-400">Work in Progress</div>} />
            </Route>
            
            {/* Finance Routes */}
            <Route path="finance">
                <Route index element={<FinanceDashboard />} />
                <Route path="coa" element={<ChartOfAccountsView />} />
                <Route path="trial-balance" element={<TrialBalanceView />} />
                <Route path="journal" element={<JournalEntryForm />} />
                <Route path="sales-invoice" element={<SalesInvoiceForm />} />
                <Route path="ar" element={<GenericFinanceView title={t('accounts_receivable')} items={[{id: 101, date: '2024-01-01', customer: 'ABC Corp', amount: 5000}]} columns={[{key: 'id', label: '#'}, {key: 'date', label: t('date')}, {key: 'customer', label: 'Customer'}, {key: 'amount', label: 'Amount'}]} />} />
                <Route path="ap" element={<GenericFinanceView title={t('accounts_payable')} items={[{id: 202, date: '2024-02-01', supplier: 'XYZ Ltd', amount: 3000}]} columns={[{key: 'id', label: '#'}, {key: 'date', label: t('date')}, {key: 'supplier', label: 'Supplier'}, {key: 'amount', label: 'Amount'}]} />} />
                <Route path="gl" element={<GenericFinanceView title={t('general_ledger')} items={[{id: 1, date: '2024-03-01', desc: 'Opening Balance', debit: 10000, credit: 0}]} columns={[{key: 'id', label: '#'}, {key: 'date', label: t('date')}, {key: 'desc', label: 'Description'}, {key: 'debit', label: 'Debit'}, {key: 'credit', label: 'Credit'}]} />} />
                <Route path="budget" element={<GenericFinanceView title={t('budgeting')} items={[{code: 'CC-01', name: 'IT Dept', allocated: 50000, used: 12000}]} columns={[{key: 'code', label: 'Code'}, {key: 'name', label: 'Name'}, {key: 'allocated', label: 'Allocated'}, {key: 'used', label: 'Used'}]} />} />
                <Route path="banking" element={<GenericFinanceView title={t('banking_payments')} items={[{bank: 'Trade Bank of Iraq', account: 'XXXX-1234', balance: 150000}]} columns={[{key: 'bank', label: 'Bank Name'}, {key: 'account', label: 'Account No'}, {key: 'balance', label: 'Balance'}]} />} />
                <Route path="*" element={<PlaceholderPage title={t('reports')} />} />
            </Route>

            {/* SCM Routes */}
            <Route path="scm">
                <Route index element={<SCMDashboard />} />
                <Route path="items" element={<ItemsView />} />
                <Route path="material-request" element={<MaterialRequestForm />} />
                <Route path="stock-entry" element={<StockEntryForm />} />
                <Route path="warehouses" element={<WarehousesView />} />
                <Route path="reports" element={<SCMReportsView />} />
                <Route path="analytics" element={<PurchaseAnalyticsView />} />
                <Route path="*" element={<PlaceholderPage title="Module" />} />
            </Route>

            <Route path="ai" element={<AIAssistant />} />
            <Route path="*" element={<PlaceholderPage title="404 Not Found" />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
};

export default App;