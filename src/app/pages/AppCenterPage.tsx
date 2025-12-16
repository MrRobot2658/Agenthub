import { useState } from 'react';
import { MainLayout } from '../components/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';
import { 
  Search, 
  Check,
  Plus,
  Settings,
  TrendingUp,
  Users,
  MessageCircle,
  ShoppingCart,
  Building2,
  Zap
} from 'lucide-react';

// 应用分类
type AppCategory = 'all' | 'social' | 'crm' | 'ecommerce' | 'marketing' | 'communication';

// 应用状态
type AppStatus = 'connected' | 'available' | 'coming-soon';

interface Application {
  id: string;
  name: string;
  nameEN: string;
  icon: string;
  category: AppCategory;
  description: string;
  status: AppStatus;
  features: string[];
  pricing?: string;
  popularity: number;
}

// 应用数据
const applications: Application[] = [
  {
    id: '1',
    name: '微信',
    nameEN: 'WeChat',
    icon: '💬',
    category: 'social',
    description: '连接微信公众号，实现智能客服、自动回复、粉丝管理等功能',
    status: 'connected',
    features: ['自动回复', '粉丝管理', '消息推送', '数据分析'],
    popularity: 98
  },
  {
    id: '2',
    name: '企业微信',
    nameEN: 'WeCom',
    icon: '🏢',
    category: 'communication',
    description: '整合企业微信，实现客户管理、群发消息、自动化营销等功能',
    status: 'connected',
    features: ['客户管理', '群发消息', '自动化营销', '数据同步'],
    popularity: 95
  },
  {
    id: '3',
    name: '小红书',
    nameEN: 'Xiaohongshu',
    icon: '📕',
    category: 'social',
    description: '同步小红书内容，AI辅助生成种草笔记，数据分析优化',
    status: 'connected',
    features: ['内容发布', '笔记生成', '数据分析', '评论管理'],
    popularity: 89
  },
  {
    id: '4',
    name: '抖音',
    nameEN: 'Douyin',
    icon: '🎵',
    category: 'social',
    description: '对接抖音平台，AI生成短视频脚本、自动发布、数据追踪',
    status: 'available',
    features: ['脚本生成', '自动发布', '数据追踪', '粉丝互动'],
    popularity: 92
  },
  {
    id: '5',
    name: 'Salesforce',
    nameEN: 'Salesforce',
    icon: '☁️',
    category: 'crm',
    description: '全球领先的CRM平台，实现客户全生命周期管理',
    status: 'available',
    features: ['客户管理', '销售自动化', '数据分析', '预测模型'],
    pricing: '¥150/用户/月起',
    popularity: 94
  },
  {
    id: '6',
    name: '销售易',
    nameEN: 'Xiaoshouyi',
    icon: '📊',
    category: 'crm',
    description: '中国领先的CRM系统，智能销售管理和客户关系维护',
    status: 'available',
    features: ['销售管理', '客户跟进', '商机管理', 'BI报表'],
    pricing: '¥99/用户/月起',
    popularity: 87
  },
  {
    id: '7',
    name: '纷享销客',
    nameEN: 'Fxiaoke',
    icon: '🎯',
    category: 'crm',
    description: '连接型CRM，打通营销、销售、服务全链路',
    status: 'available',
    features: ['连接型CRM', '销售自动化', '客户洞察', '移动办公'],
    pricing: '¥120/用户/月起',
    popularity: 85
  },
  {
    id: '8',
    name: '钉钉',
    nameEN: 'DingTalk',
    icon: '📱',
    category: 'communication',
    description: '企业协同办公平台，实现团队协作和业务流程自动化',
    status: 'available',
    features: ['即时通讯', '审批流程', '考勤管理', '视频会议'],
    popularity: 91
  },
  {
    id: '9',
    name: '飞书',
    nameEN: 'Lark',
    icon: '🚀',
    category: 'communication',
    description: '字节跳动旗下协作平台，智能文档、高效沟通',
    status: 'available',
    features: ['协作文档', '即时通讯', '视频会议', 'OKR管理'],
    popularity: 88
  },
  {
    id: '10',
    name: '有赞',
    nameEN: 'Youzan',
    icon: '🛍️',
    category: 'ecommerce',
    description: '电商SaaS平台，打通线上线下全渠道销售',
    status: 'available',
    features: ['商城搭建', '订单管理', '会员营销', '数据分析'],
    pricing: '¥4800/年起',
    popularity: 86
  },
  {
    id: '11',
    name: '微盟',
    nameEN: 'Weimob',
    icon: '🏪',
    category: 'ecommerce',
    description: '智慧商业服务提供商，助力企业数字化转型',
    status: 'available',
    features: ['智慧零售', '小程序', '社交电商', '营销工具'],
    pricing: '¥3600/年起',
    popularity: 84
  },
  {
    id: '12',
    name: 'HubSpot',
    nameEN: 'HubSpot',
    icon: '🧲',
    category: 'marketing',
    description: '集营销、销售、服务于一体的增长平台',
    status: 'available',
    features: ['营销自动化', '邮件营销', '落地页', 'SEO工具'],
    pricing: '$50/月起',
    popularity: 90
  },
  {
    id: '13',
    name: '友盟+',
    nameEN: 'Umeng',
    icon: '📈',
    category: 'marketing',
    description: '移动应用统计分析平台，精准数据洞察',
    status: 'available',
    features: ['数据统计', '用户分析', '渠道追踪', '推送服务'],
    popularity: 82
  },
  {
    id: '14',
    name: 'Slack',
    nameEN: 'Slack',
    icon: '💼',
    category: 'communication',
    description: '团队协作工具，提高沟通效率',
    status: 'coming-soon',
    features: ['频道沟通', '文件共享', '应用集成', '搜索功能'],
    popularity: 93
  },
  {
    id: '15',
    name: 'Shopify',
    nameEN: 'Shopify',
    icon: '🛒',
    category: 'ecommerce',
    description: '全球领先的电商平台，快速搭建在线商店',
    status: 'coming-soon',
    features: ['店铺搭建', '支付集成', '物流管理', '营销工具'],
    pricing: '$29/月起',
    popularity: 89
  },
];

// 分类标签
const categoryLabels: Record<AppCategory, string> = {
  all: '全部应用',
  social: '社交媒体',
  crm: 'CRM系统',
  ecommerce: '电商平台',
  marketing: '营销工具',
  communication: '协同办公'
};

// 分类图标
const categoryIcons: Record<AppCategory, any> = {
  all: Zap,
  social: MessageCircle,
  crm: Users,
  ecommerce: ShoppingCart,
  marketing: TrendingUp,
  communication: Building2
};

// 状态标签
const getStatusBadge = (status: AppStatus) => {
  switch (status) {
    case 'connected':
      return { label: '已连接', variant: 'default' as const, color: 'bg-green-500' };
    case 'available':
      return { label: '可连接', variant: 'secondary' as const, color: 'bg-blue-500' };
    case 'coming-soon':
      return { label: '即将推出', variant: 'outline' as const, color: 'bg-gray-500' };
  }
};

export function AppCenterPage() {
  const [selectedCategory, setSelectedCategory] = useState<AppCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredApps = applications.filter((app) => {
    const matchesCategory = selectedCategory === 'all' || app.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.nameEN.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.description.includes(searchQuery);
    
    return matchesCategory && matchesSearch;
  });

  const connectedApps = applications.filter(app => app.status === 'connected');
  const availableApps = applications.filter(app => app.status === 'available');

  return (
    <MainLayout>
      {/* Header */}
      <header className="border-b bg-background">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl mb-2">应用中心</h1>
              <p className="text-muted-foreground">
                连接第三方应用，打通全链路营销服务生态
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-sm text-muted-foreground">已连接应用</div>
                <div className="text-2xl font-semibold text-primary">{connectedApps.length}</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">已连接</p>
                  <p className="text-3xl font-semibold">{connectedApps.length}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
                  <Check className="w-6 h-6 text-green-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">可用应用</p>
                  <p className="text-3xl font-semibold">{availableApps.length}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                  <Plus className="w-6 h-6 text-blue-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">应用分类</p>
                  <p className="text-3xl font-semibold">5</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-purple-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">数据同步</p>
                  <p className="text-3xl font-semibold">实时</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-orange-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="搜索应用..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Category Tabs */}
        <Tabs value={selectedCategory} onValueChange={(v) => setSelectedCategory(v as AppCategory)} className="mb-8">
          <TabsList>
            {(Object.keys(categoryLabels) as AppCategory[]).map((category) => {
              const Icon = categoryIcons[category];
              const count = category === 'all' 
                ? applications.length 
                : applications.filter(app => app.category === category).length;
              
              return (
                <TabsTrigger key={category} value={category} className="gap-2">
                  <Icon className="w-4 h-4" />
                  {categoryLabels[category]}
                  <Badge variant="secondary" className="ml-1">{count}</Badge>
                </TabsTrigger>
              );
            })}
          </TabsList>
        </Tabs>

        {/* Results Count */}
        <div className="mb-4">
          <p className="text-muted-foreground">
            找到 <span className="font-semibold text-foreground">{filteredApps.length}</span> 个应用
          </p>
        </div>

        {/* App Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredApps.map((app) => {
            const statusBadge = getStatusBadge(app.status);
            
            return (
              <Card key={app.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center text-2xl">
                      {app.icon}
                    </div>
                    <Badge variant={statusBadge.variant}>
                      {statusBadge.label}
                    </Badge>
                  </div>
                  <CardTitle className="flex items-center gap-2">
                    {app.name}
                    <span className="text-sm font-normal text-muted-foreground">{app.nameEN}</span>
                  </CardTitle>
                  <CardDescription>{app.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Features */}
                  <div className="mb-4">
                    <div className="text-xs font-medium text-muted-foreground mb-2">功能特性</div>
                    <div className="flex flex-wrap gap-1">
                      {app.features.slice(0, 4).map((feature, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Pricing */}
                  {app.pricing && (
                    <div className="mb-4 text-sm">
                      <span className="text-muted-foreground">价格：</span>
                      <span className="font-semibold">{app.pricing}</span>
                    </div>
                  )}

                  {/* Popularity */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-muted-foreground">受欢迎度</span>
                      <span className="font-semibold">{app.popularity}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary transition-all"
                        style={{ width: `${app.popularity}%` }}
                      />
                    </div>
                  </div>

                  {/* Action Button */}
                  {app.status === 'connected' ? (
                    <Button variant="outline" className="w-full" disabled={false}>
                      <Settings className="w-4 h-4 mr-2" />
                      管理设置
                    </Button>
                  ) : app.status === 'available' ? (
                    <Button className="w-full">
                      <Plus className="w-4 h-4 mr-2" />
                      立即连接
                    </Button>
                  ) : (
                    <Button variant="secondary" className="w-full" disabled>
                      即将推出
                    </Button>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredApps.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔌</div>
            <h3 className="text-xl font-semibold mb-2">未找到匹配的应用</h3>
            <p className="text-muted-foreground">
              请尝试调整搜索条件或筛选器
            </p>
          </div>
        )}
      </main>
    </MainLayout>
  );
}
