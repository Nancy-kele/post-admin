import React, { useState } from 'react';
import { 
  Users, Package, FileText, TrendingUp, BarChart2, 
  Menu, Bell, Search, User, ChevronRight, AlertCircle,
  DollarSign, Activity, Calendar
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  BarChart, Bar, PieChart, Pie, Cell 
} from 'recharts';

// --- 模拟数据 (Mock Data) ---

// 1. 会员运营数据
const members = [
  { id: 'M001', name: '张伟', age: 45, condition: '腰间盘突出', level: '金牌会员', tags: ['高消费', '理疗偏好'], balance: 5200, lastVisit: '2023-10-25' },
  { id: 'M002', name: '李秀英', age: 62, condition: '风湿性关节炎', level: '钻石会员', tags: ['长期疗程', '需接送'], balance: 12800, lastVisit: '2023-10-26' },
  { id: 'M003', name: '王强', age: 38, condition: '运动损伤', level: '普通会员', tags: ['单次消费', '价格敏感'], balance: 800, lastVisit: '2023-10-20' },
  { id: 'M004', name: '赵敏', age: 55, condition: '颈椎病', level: '银牌会员', tags: ['周末预约'], balance: 3500, lastVisit: '2023-10-24' },
  { id: 'M005', name: '孙志刚', age: 70, condition: '骨质增生', level: '金牌会员', tags: ['家属陪同'], balance: 6000, lastVisit: '2023-10-26' },
];

// 2. 产品与库存数据
const inventory = [
  { id: 'P001', name: '中药熏蒸包', type: '耗材', stock: 120, status: '正常', price: 158 },
  { id: 'P002', name: '深层肌肉按摩膏', type: '耗材', stock: 15, status: '低库存预警', price: 299 },
  { id: 'S001', name: '腰椎牵引疗程(10次)', type: '服务包', stock: 999, status: '热销中', price: 2980 },
  { id: 'S002', name: '红外线理疗卡', type: '服务包', stock: 50, status: '促销中', price: 980 },
];

// 3. 订单数据
const orders = [
  { id: 'ORD-20231026-01', customer: '李秀英', item: '全身理疗套餐', amount: 3980, channel: '线上预约', status: '已完成', contract: '已归档' },
  { id: 'ORD-20231026-02', customer: '张伟', item: '腰部推拿', amount: 450, channel: '到店', status: '进行中', contract: '待签署' },
  { id: 'ORD-20231026-03', customer: '新客-刘某', item: '初诊评估', amount: 0, channel: '电话预订', status: '待到店', contract: '-' },
];

// 4. 销售绩效数据
const salesPerformance = [
  { name: '顾问A', sales: 120000, conversion: 0.35, commission: 8500 },
  { name: '顾问B', sales: 98000, conversion: 0.28, commission: 6200 },
  { name: '顾问C', sales: 145000, conversion: 0.42, commission: 11000 },
  { name: '顾问D', sales: 88000, conversion: 0.25, commission: 5100 },
];

// 5. BI图表数据
const revenueData = [
  { name: '周一', revenue: 12000, visits: 45 },
  { name: '周二', revenue: 15000, visits: 52 },
  { name: '周三', revenue: 18000, visits: 58 },
  { name: '周四', revenue: 14000, visits: 48 },
  { name: '周五', revenue: 22000, visits: 70 },
  { name: '周六', revenue: 35000, visits: 95 },
  { name: '周日', revenue: 32000, visits: 88 },
];

const satisfactionData = [
  { name: '非常满意', value: 65 },
  { name: '满意', value: 25 },
  { name: '一般', value: 8 },
  { name: '不满意', value: 2 },
];
const COLORS = ['#10B981', '#3B82F6', '#F59E0B', '#EF4444'];

// --- 组件部分 ---

const SidebarItem = ({ icon: Icon, label, active, onClick }) => (
  <div 
    onClick={onClick}
    className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors ${
      active ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'
    }`}
  >
    <Icon size={20} />
    <span className="font-medium">{label}</span>
  </div>
);

const StatCard = ({ title, value, subtext, icon: Icon, color }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-start justify-between">
    <div>
      <p className="text-gray-500 text-sm font-medium">{title}</p>
      <h3 className="text-2xl font-bold text-gray-800 mt-1">{value}</h3>
      <p className={`text-xs mt-2 ${subtext.includes('+') ? 'text-green-500' : 'text-red-500'}`}>
        {subtext}
      </p>
    </div>
    <div className={`p-3 rounded-lg ${color}`}>
      <Icon size={24} className="text-white" />
    </div>
  </div>
);

// 模块组件：会员管理
const MemberModule = () => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <h2 className="text-xl font-bold text-gray-800">会员运营管理 (360°视图)</h2>
      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700">新建会员档案</button>
    </div>
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <table className="w-full text-left">
        <thead className="bg-gray-50 border-b border-gray-100">
          <tr>
            <th className="p-4 text-xs font-semibold text-gray-500 uppercase">会员信息</th>
            <th className="p-4 text-xs font-semibold text-gray-500 uppercase">病症/需求</th>
            <th className="p-4 text-xs font-semibold text-gray-500 uppercase">智能标签</th>
            <th className="p-4 text-xs font-semibold text-gray-500 uppercase">账户余额</th>
            <th className="p-4 text-xs font-semibold text-gray-500 uppercase">操作</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {members.map((m) => (
            <tr key={m.id} className="hover:bg-gray-50">
              <td className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">
                    {m.name[0]}
                  </div>
                  <div>
                    <div className="font-medium text-gray-800">{m.name} <span className="text-xs text-gray-400">({m.age}岁)</span></div>
                    <div className="text-xs text-gray-500">{m.level}</div>
                  </div>
                </div>
              </td>
              <td className="p-4 text-sm text-gray-600">{m.condition}</td>
              <td className="p-4">
                <div className="flex flex-wrap gap-1">
                  {m.tags.map(tag => (
                    <span key={tag} className="px-2 py-0.5 bg-blue-50 text-blue-600 text-xs rounded-full border border-blue-100">{tag}</span>
                  ))}
                </div>
              </td>
              <td className="p-4 font-medium text-gray-800">¥{m.balance.toLocaleString()}</td>
              <td className="p-4">
                <button className="text-blue-600 text-sm hover:underline">画像分析</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

// 模块组件：产品库存
const ProductModule = () => (
  <div className="space-y-6">
    <h2 className="text-xl font-bold text-gray-800">产品与库存管理</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="font-semibold mb-4 text-gray-700">库存预警列表</h3>
        <div className="space-y-4">
          {inventory.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <div className="font-medium text-gray-800">{item.name}</div>
                <div className="text-xs text-gray-500">{item.type} | 单价: ¥{item.price}</div>
              </div>
              <div className="text-right">
                <div className={`font-bold ${item.stock < 20 ? 'text-red-500' : 'text-green-600'}`}>
                  {item.stock} {item.type === '服务包' ? '次' : '件'}
                </div>
                {item.stock < 20 && (
                  <div className="text-xs text-red-500 flex items-center justify-end mt-1">
                    <AlertCircle size={12} className="mr-1"/> 需补货
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="font-semibold mb-4 text-gray-700">营销策略配置</h3>
        <div className="space-y-3">
          <div className="p-4 border border-dashed border-blue-300 bg-blue-50 rounded-lg cursor-pointer hover:bg-blue-100 transition">
            <div className="font-medium text-blue-800">+ 新建组合推荐 (Bundle)</div>
            <div className="text-xs text-blue-600 mt-1">例如：腰椎理疗 + 熏蒸包套餐</div>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg flex justify-between items-center">
            <div>
              <div className="font-medium">金牌会员专属88折</div>
              <div className="text-xs text-gray-500">有效期至 2023-12-31</div>
            </div>
            <div className="w-10 h-6 bg-green-500 rounded-full relative cursor-pointer">
              <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// 模块组件：BI仪表盘
const DashboardModule = () => (
  <div className="space-y-6">
    <h2 className="text-xl font-bold text-gray-800">经营数据仪表盘 (BI)</h2>
    
    {/* 核心指标卡片 */}
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <StatCard title="今日营收" value="¥32,580" subtext="+12.5% 较昨日" icon={DollarSign} color="bg-blue-500" />
      <StatCard title="活跃会员" value="128" subtext="+5 位新客" icon={Users} color="bg-purple-500" />
      <StatCard title="预约满房率" value="85%" subtext="高峰期需预警" icon={Activity} color="bg-orange-500" />
      <StatCard title="服务满意度" value="4.8/5.0" subtext="本月无投诉" icon={TrendingUp} color="bg-green-500" />
    </div>

    {/* 图表区域 */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* 营收趋势 */}
      <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="font-semibold mb-6 text-gray-700">近7日营收与到店人次</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF'}} />
              <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF'}} />
              <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF'}} />
              <Tooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}} />
              <Line yAxisId="left" type="monotone" dataKey="revenue" stroke="#3B82F6" strokeWidth={3} dot={{r: 4}} activeDot={{r: 6}} name="营收(元)" />
              <Line yAxisId="right" type="monotone" dataKey="visits" stroke="#10B981" strokeWidth={3} dot={{r: 4}} name="到店(人)" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 满意度分布 */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="font-semibold mb-6 text-gray-700">服务质量反馈</h3>
        <div className="h-64 w-full flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={satisfactionData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {satisfactionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-center gap-4 text-xs text-gray-500 mt-2">
          {satisfactionData.map((item, index) => (
            <div key={item.name} className="flex items-center">
              <div className="w-2 h-2 rounded-full mr-1" style={{backgroundColor: COLORS[index]}}></div>
              {item.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// 模块组件：订单与合同
const OrderModule = () => (
  <div className="space-y-6">
    <h2 className="text-xl font-bold text-gray-800">订单与合同管理</h2>
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="p-4 border-b border-gray-100 flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          <input type="text" placeholder="搜索订单号、客户名..." className="w-full pl-10 pr-4 py-2 bg-gray-50 rounded-lg border-none focus:ring-2 focus:ring-blue-100 outline-none text-sm" />
        </div>
        <select className="bg-gray-50 border-none rounded-lg px-4 text-sm text-gray-600 outline-none">
          <option>所有状态</option>
          <option>待付款</option>
          <option>进行中</option>
        </select>
      </div>
      <table className="w-full text-left">
        <thead className="bg-gray-50">
          <tr>
            <th className="p-4 text-xs font-semibold text-gray-500 uppercase">订单号</th>
            <th className="p-4 text-xs font-semibold text-gray-500 uppercase">客户/项目</th>
            <th className="p-4 text-xs font-semibold text-gray-500 uppercase">渠道</th>
            <th className="p-4 text-xs font-semibold text-gray-500 uppercase">金额</th>
            <th className="p-4 text-xs font-semibold text-gray-500 uppercase">合同状态</th>
            <th className="p-4 text-xs font-semibold text-gray-500 uppercase">状态</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {orders.map((order) => (
            <tr key={order.id} className="hover:bg-gray-50">
              <td className="p-4 text-sm font-mono text-gray-500">{order.id}</td>
              <td className="p-4">
                <div className="font-medium text-gray-800">{order.customer}</div>
                <div className="text-xs text-gray-500">{order.item}</div>
              </td>
              <td className="p-4 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  {order.channel === '线上预约' ? <Activity size={14}/> : <User size={14}/>}
                  {order.channel}
                </span>
              </td>
              <td className="p-4 font-medium">¥{order.amount}</td>
              <td className="p-4">
                 <span className={`px-2 py-1 rounded text-xs ${order.contract === '已归档' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                   {order.contract}
                 </span>
              </td>
              <td className="p-4 text-sm">{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

// 模块组件：销售绩效
const SalesModule = () => (
  <div className="space-y-6">
    <h2 className="text-xl font-bold text-gray-800">销售与绩效管理</h2>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="font-semibold mb-4 text-gray-700">顾问业绩排行榜 (本月)</h3>
        <div className="space-y-4">
          {salesPerformance.sort((a,b) => b.sales - a.sales).map((p, idx) => (
            <div key={p.name} className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition">
              <div className={`w-8 h-8 flex items-center justify-center rounded-full font-bold mr-4 ${idx === 0 ? 'bg-yellow-100 text-yellow-600' : idx === 1 ? 'bg-gray-200 text-gray-600' : idx === 2 ? 'bg-orange-100 text-orange-600' : 'bg-gray-50 text-gray-400'}`}>
                {idx + 1}
              </div>
              <div className="flex-1">
                <div className="font-medium text-gray-800">{p.name}</div>
                <div className="text-xs text-gray-500">转化率: {(p.conversion * 100).toFixed(0)}%</div>
              </div>
              <div className="text-right">
                <div className="font-bold text-gray-800">¥{p.sales.toLocaleString()}</div>
                <div className="text-xs text-green-600">提成: ¥{p.commission.toLocaleString()}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="font-semibold mb-4 text-gray-700">团队绩效概览</h3>
        <div className="h-64 w-full">
           <ResponsiveContainer width="100%" height="100%">
            <BarChart data={salesPerformance} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
              <XAxis type="number" hide />
              <YAxis dataKey="name" type="category" width={60} tick={{fontSize: 12}} />
              <Tooltip />
              <Bar dataKey="sales" fill="#3B82F6" radius={[0, 4, 4, 0]} barSize={20} name="销售额" />
              <Bar dataKey="commission" fill="#10B981" radius={[0, 4, 4, 0]} barSize={20} name="佣金" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  </div>
);


// --- 主应用组件 ---

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <DashboardModule />;
      case 'members': return <MemberModule />;
      case 'products': return <ProductModule />;
      case 'orders': return <OrderModule />;
      case 'sales': return <SalesModule />;
      default: return <DashboardModule />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 font-sans text-gray-900">
      {/* 侧边栏 */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col shadow-xl">
        <div className="p-6 flex items-center space-x-3 border-b border-gray-800">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Activity className="text-white" size={20} />
          </div>
          <span className="text-lg font-bold tracking-wide">疼痛管理智库</span>
        </div>
        
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <div className="text-xs font-semibold text-gray-500 uppercase px-3 py-2 mt-2">核心管理</div>
          <SidebarItem icon={BarChart2} label="经营仪表盘" active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} />
          <SidebarItem icon={Users} label="会员运营" active={activeTab === 'members'} onClick={() => setActiveTab('members')} />
          <SidebarItem icon={Package} label="产品与库存" active={activeTab === 'products'} onClick={() => setActiveTab('products')} />
          
          <div className="text-xs font-semibold text-gray-500 uppercase px-3 py-2 mt-4">业务流程</div>
          <SidebarItem icon={FileText} label="订单与合同" active={activeTab === 'orders'} onClick={() => setActiveTab('orders')} />
          <SidebarItem icon={TrendingUp} label="销售与绩效" active={activeTab === 'sales'} onClick={() => setActiveTab('sales')} />
        </nav>

        <div className="p-4 border-t border-gray-800">
          <div className="flex items-center space-x-3 p-2 rounded-lg bg-gray-800">
            <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center">
              <User size={16} />
            </div>
            <div>
              <div className="text-sm font-medium">管理员</div>
              <div className="text-xs text-gray-400">admin@clinic.com</div>
            </div>
          </div>
        </div>
      </aside>

      {/* 主内容区 */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* 顶部导航 */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shadow-sm z-10">
          <div className="flex items-center text-gray-500 text-sm">
            <span>首页</span>
            <ChevronRight size={16} className="mx-2" />
            <span className="text-gray-800 font-medium">
              {activeTab === 'dashboard' ? '经营仪表盘' : 
               activeTab === 'members' ? '会员运营' :
               activeTab === 'products' ? '产品库存' :
               activeTab === 'orders' ? '订单合同' : '销售绩效'}
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Bell className="text-gray-500 cursor-pointer hover:text-blue-600" size={20} />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </div>
            <div className="text-sm text-gray-600">2023年10月27日</div>
          </div>
        </header>

        {/* 内容滚动区 */}
        <div className="flex-1 overflow-auto p-8">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </div>
      </main>
    </div>
  );
}