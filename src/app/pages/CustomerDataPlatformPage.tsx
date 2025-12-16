import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MainLayout } from '../components/MainLayout';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';
import { Badge } from '../components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';
import { 
  Search, 
  Download,
  Users,
  UserPlus,
  Target,
  Briefcase,
  ShoppingCart,
  TrendingUp,
  Filter,
  Calendar,
  Mail,
  Phone,
  MapPin,
  MessageCircle
} from 'lucide-react';

// 渠道图标和颜色配置
const channelConfig: { [key: string]: { icon: string; color: string; bgColor: string } } = {
  '微信': { icon: '💬', color: '#07c160', bgColor: '#07c16015' },
  '企业微信': { icon: '🏢', color: '#2e7cf6', bgColor: '#2e7cf615' },
  '小红书': { icon: '📕', color: '#ff2442', bgColor: '#ff244215' },
  '抖音': { icon: '🎵', color: '#000000', bgColor: '#00000010' },
  '官网': { icon: '🌐', color: '#6366f1', bgColor: '#6366f115' },
  '线下活动': { icon: '🎪', color: '#8b5cf6', bgColor: '#8b5cf615' },
};

// 数据统计
const dataStats = [
  { id: 'users', label: '用户', icon: Users, count: 12458, trend: '+12%', color: '#6366f1' },
  { id: 'leads', label: '线索', icon: UserPlus, count: 3284, trend: '+8%', color: '#10b981' },
  { id: 'prospects', label: '潜客', icon: Target, count: 1876, trend: '+15%', color: '#f59e0b' },
  { id: 'opportunities', label: '商机', icon: Briefcase, count: 542, trend: '+23%', color: '#8b5cf6' },
  { id: 'orders', label: '订单', icon: ShoppingCart, count: 8964, trend: '+18%', color: '#ec4899' },
];

// 用户数据
const usersData = [
  { id: '1', name: '张伟', email: 'zhangwei@example.com', phone: '138****1234', channel: '企业微信', status: '活跃', registerDate: '2024-01-10', tags: ['VIP', '企业用户'] },
  { id: '2', name: '李娜', email: 'lina@example.com', phone: '139****5678', channel: '微信', status: '活跃', registerDate: '2024-01-15', tags: ['个人用户'] },
  { id: '3', name: '王强', email: 'wangqiang@example.com', phone: '136****9012', channel: '抖音', status: '沉睡', registerDate: '2023-12-20', tags: ['企业用户'] },
  { id: '4', name: '赵丽', email: 'zhaoli@example.com', phone: '137****3456', channel: '小红书', status: '活跃', registerDate: '2024-01-12', tags: ['个人用户', 'KOL'] },
  { id: '5', name: '孙明', email: 'sunming@example.com', phone: '135****7890', channel: '官网', status: '活跃', registerDate: '2024-01-18', tags: ['企业用户'] },
  { id: '6', name: '周芳', email: 'zhoufang@example.com', phone: '133****2468', channel: '线下活动', status: '活跃', registerDate: '2024-01-08', tags: ['VIP'] },
];

// 线索数据
const leadsData = [
  { id: '1', name: '刘洋', company: '科技有限公司', channel: '微信', source: '朋友圈广告', status: '待跟进', createDate: '2024-01-20', score: 85 },
  { id: '2', name: '陈静', company: '贸易公司', channel: '企业微信', source: '企业客户转介绍', status: '跟进中', createDate: '2024-01-18', score: 72 },
  { id: '3', name: '赵敏', company: '咨询公司', channel: '抖音', source: '短视频引流', status: '已转化', createDate: '2024-01-15', score: 95 },
  { id: '4', name: '吴涛', company: '教育机构', channel: '小红书', source: '种草笔记', status: '待跟进', createDate: '2024-01-21', score: 68 },
  { id: '5', name: '郑华', company: '医疗集团', channel: '官网', source: 'SEO搜索', status: '跟进中', createDate: '2024-01-19', score: 78 },
];

// 潜客数据
const prospectsData = [
  { id: '1', name: '周杰', company: '制造企业', industry: '制造业', intent: '高', lastContact: '2024-01-19', budget: '50-100万' },
  { id: '2', name: '吴梅', company: '教育机构', industry: '教育', intent: '中', lastContact: '2024-01-17', budget: '20-50万' },
  { id: '3', name: '郑涛', company: '医疗集团', industry: '医疗', intent: '高', lastContact: '2024-01-20', budget: '100万+' },
];

// 商机数据
const opportunitiesData = [
  { id: '1', name: '企业SaaS采购', client: '科技公司', stage: '方案阶段', amount: 850000, probability: 70, closeDate: '2024-03-15' },
  { id: '2', name: '定制开发项目', client: '制造企业', stage: '谈判阶段', amount: 1200000, probability: 85, closeDate: '2024-02-28' },
  { id: '3', name: '年度服务合同', client: '贸易公司', stage: '评估阶段', amount: 380000, probability: 50, closeDate: '2024-04-10' },
];

// 订单数据
const ordersData = [
  { id: 'ORD-20240120-001', customer: '张伟', product: '企业版套餐', amount: 9800, status: '已支付', orderDate: '2024-01-20' },
  { id: 'ORD-20240119-002', customer: '李娜', product: '专业版套餐', amount: 4980, status: '已发货', orderDate: '2024-01-19' },
  { id: 'ORD-20240118-003', customer: '王强', product: '基础版套餐', amount: 2980, status: '已完成', orderDate: '2024-01-18' },
];

export function CustomerDataPlatformPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('users');

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      '活跃': 'default',
      '沉睡': 'secondary',
      '待跟进': 'secondary',
      '跟进中': 'default',
      '已转化': 'default',
      '已支付': 'default',
      '已发货': 'default',
      '已完成': 'secondary',
    };
    return colors[status] || 'default';
  };

  const getIntentBadge = (intent: string) => {
    const variants: { [key: string]: 'default' | 'secondary' | 'destructive' } = {
      '高': 'default',
      '中': 'secondary',
      '低': 'secondary',
    };
    return variants[intent] || 'secondary';
  };

  return (
    <MainLayout>
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl mb-2">客户数据平台</h1>
              <p className="text-muted-foreground">
                统一管理客户全生命周期数据，驱动精准营销和销售决策
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline">
                <Filter className="mr-2 w-4 h-4" />
                筛选
              </Button>
              <Button>
                <Download className="mr-2 w-4 h-4" />
                导出数据
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="mb-8">
          <h2 className="text-lg mb-4">数据概览</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {dataStats.map((stat) => (
              <Card key={stat.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <div 
                      className="p-2 rounded-lg"
                      style={{ backgroundColor: stat.color + '20' }}
                    >
                      <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {stat.trend}
                    </Badge>
                  </div>
                  <div className="text-2xl mb-1">{stat.count.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="搜索客户数据..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Data Tables */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="users">
              <Users className="mr-2 w-4 h-4" />
              用户
            </TabsTrigger>
            <TabsTrigger value="leads">
              <UserPlus className="mr-2 w-4 h-4" />
              线索
            </TabsTrigger>
            <TabsTrigger value="prospects">
              <Target className="mr-2 w-4 h-4" />
              潜客
            </TabsTrigger>
            <TabsTrigger value="opportunities">
              <Briefcase className="mr-2 w-4 h-4" />
              商机
            </TabsTrigger>
            <TabsTrigger value="orders">
              <ShoppingCart className="mr-2 w-4 h-4" />
              订单
            </TabsTrigger>
          </TabsList>

          {/* 用户列表 */}
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>用户列表</CardTitle>
                <CardDescription>所有注册用户的详细信息 - 多渠道触达</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>姓名</TableHead>
                      <TableHead>联系方式</TableHead>
                      <TableHead>来源渠道</TableHead>
                      <TableHead>状态</TableHead>
                      <TableHead>注册时间</TableHead>
                      <TableHead>标签</TableHead>
                      <TableHead>操作</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {usersData.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>
                          <div className="flex flex-col gap-1 text-sm">
                            <div className="flex items-center gap-1">
                              <Mail className="w-3 h-3 text-muted-foreground" />
                              <span>{user.email}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Phone className="w-3 h-3 text-muted-foreground" />
                              <span>{user.phone}</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div 
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-sm"
                            style={{ 
                              backgroundColor: channelConfig[user.channel]?.bgColor,
                              color: channelConfig[user.channel]?.color 
                            }}
                          >
                            <span>{channelConfig[user.channel]?.icon}</span>
                            <span className="font-medium">{user.channel}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={getStatusColor(user.status) as any}>
                            {user.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{user.registerDate}</TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            {user.tags.map((tag, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm" asChild>
                            <Link to={`/customer-data/user/${user.id}`}>查看</Link>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 线索列表 */}
          <TabsContent value="leads">
            <Card>
              <CardHeader>
                <CardTitle>线索列表</CardTitle>
                <CardDescription>潜在客户线索跟踪 - 多渠道获客</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>姓名</TableHead>
                      <TableHead>公司</TableHead>
                      <TableHead>来源渠道</TableHead>
                      <TableHead>来源详情</TableHead>
                      <TableHead>线索评分</TableHead>
                      <TableHead>状态</TableHead>
                      <TableHead>创建时间</TableHead>
                      <TableHead>操作</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {leadsData.map((lead) => (
                      <TableRow key={lead.id}>
                        <TableCell className="font-medium">{lead.name}</TableCell>
                        <TableCell>{lead.company}</TableCell>
                        <TableCell>
                          <div 
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-sm"
                            style={{ 
                              backgroundColor: channelConfig[lead.channel]?.bgColor,
                              color: channelConfig[lead.channel]?.color 
                            }}
                          >
                            <span>{channelConfig[lead.channel]?.icon}</span>
                            <span className="font-medium">{lead.channel}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm text-muted-foreground">{lead.source}</span>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-primary"
                                style={{ width: `${lead.score}%` }}
                              />
                            </div>
                            <span className="text-sm">{lead.score}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={getStatusColor(lead.status) as any}>
                            {lead.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{lead.createDate}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">跟进</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 潜客列表 */}
          <TabsContent value="prospects">
            <Card>
              <CardHeader>
                <CardTitle>潜客列表</CardTitle>
                <CardDescription>高意向潜在客户管理</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>姓名</TableHead>
                      <TableHead>公司</TableHead>
                      <TableHead>行业</TableHead>
                      <TableHead>购买意向</TableHead>
                      <TableHead>预算范围</TableHead>
                      <TableHead>最后联系</TableHead>
                      <TableHead>操作</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {prospectsData.map((prospect) => (
                      <TableRow key={prospect.id}>
                        <TableCell className="font-medium">{prospect.name}</TableCell>
                        <TableCell>{prospect.company}</TableCell>
                        <TableCell>{prospect.industry}</TableCell>
                        <TableCell>
                          <Badge variant={getIntentBadge(prospect.intent)}>
                            {prospect.intent}
                          </Badge>
                        </TableCell>
                        <TableCell>{prospect.budget}</TableCell>
                        <TableCell>{prospect.lastContact}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">联系</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 商机列表 */}
          <TabsContent value="opportunities">
            <Card>
              <CardHeader>
                <CardTitle>商机列表</CardTitle>
                <CardDescription>销售商机追踪管理</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>商机名称</TableHead>
                      <TableHead>客户</TableHead>
                      <TableHead>阶段</TableHead>
                      <TableHead>金额</TableHead>
                      <TableHead>赢单概率</TableHead>
                      <TableHead>预计</TableHead>
                      <TableHead>操作</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {opportunitiesData.map((opp) => (
                      <TableRow key={opp.id}>
                        <TableCell className="font-medium">{opp.name}</TableCell>
                        <TableCell>{opp.client}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{opp.stage}</Badge>
                        </TableCell>
                        <TableCell className="font-medium">
                          ¥{opp.amount.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-green-500"
                                style={{ width: `${opp.probability}%` }}
                              />
                            </div>
                            <span className="text-sm">{opp.probability}%</span>
                          </div>
                        </TableCell>
                        <TableCell>{opp.closeDate}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">推进</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 订单列表 */}
          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>订单列表</CardTitle>
                <CardDescription>客户订单记录</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>订单号</TableHead>
                      <TableHead>客户</TableHead>
                      <TableHead>产品</TableHead>
                      <TableHead>金额</TableHead>
                      <TableHead>状态</TableHead>
                      <TableHead>下单时间</TableHead>
                      <TableHead>操作</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {ordersData.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-mono text-sm">{order.id}</TableCell>
                        <TableCell className="font-medium">{order.customer}</TableCell>
                        <TableCell>{order.product}</TableCell>
                        <TableCell className="font-medium">
                          ¥{order.amount.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <Badge variant={getStatusColor(order.status) as any}>
                            {order.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{order.orderDate}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">详情</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </MainLayout>
  );
}