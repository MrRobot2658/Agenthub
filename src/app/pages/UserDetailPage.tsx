import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { MainLayout } from '../components/MainLayout';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';
import { Separator } from '../components/ui/separator';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin,
  Calendar,
  TrendingUp,
  Activity,
  Heart,
  Users,
  MessageCircle,
  Target,
  Clock
} from 'lucide-react';
import { 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar, 
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar
} from 'recharts';

// 渠道配置
const channelConfig: { [key: string]: { icon: string; color: string; bgColor: string } } = {
  '微信': { icon: '💬', color: '#07c160', bgColor: '#07c16015' },
  '企业微信': { icon: '🏢', color: '#2e7cf6', bgColor: '#2e7cf615' },
  '小红书': { icon: '📕', color: '#ff2442', bgColor: '#ff244215' },
  '抖音': { icon: '🎵', color: '#000000', bgColor: '#00000010' },
  '官网': { icon: '🌐', color: '#6366f1', bgColor: '#6366f115' },
  'APP': { icon: '📱', color: '#10b981', bgColor: '#10b98115' },
};

// 用户基本信息
const userInfo = {
  id: '1',
  name: '张伟',
  avatar: '',
  email: 'zhangwei@example.com',
  phone: '138****1234',
  location: '北京市朝阳区',
  registerDate: '2024-01-10',
  lastActive: '2024-01-20 15:30',
  status: '活跃',
  tags: ['VIP', '企业用户', '高价值客户'],
  mainChannel: '企业微信'
};

// 六维度数据
const sixDimensionsData = [
  { dimension: '活跃度', value: 85, fullMark: 100 },
  { dimension: '购买力', value: 78, fullMark: 100 },
  { dimension: '忠诚度', value: 92, fullMark: 100 },
  { dimension: '影响力', value: 68, fullMark: 100 },
  { dimension: '互动度', value: 75, fullMark: 100 },
  { dimension: '转化潜力', value: 88, fullMark: 100 },
];

// 多渠道活跃度趋势
const channelActivityData = [
  { date: '01/14', '微信': 12, '企业微信': 35, '小红书': 8, '抖音': 15, '官网': 5, 'APP': 10 },
  { date: '01/15', '微信': 15, '企业微信': 40, '小红书': 12, '抖音': 18, '官网': 7, 'APP': 12 },
  { date: '01/16', '微信': 10, '企业微信': 38, '小红书': 15, '抖音': 20, '官网': 6, 'APP': 15 },
  { date: '01/17', '微信': 18, '企业微信': 45, '小红书': 10, '抖音': 25, '官网': 8, 'APP': 18 },
  { date: '01/18', '微信': 14, '企业微信': 50, '小红书': 18, '抖音': 22, '官网': 10, 'APP': 20 },
  { date: '01/19', '微信': 20, '企业微信': 55, '小红书': 20, '抖音': 28, '官网': 12, 'APP': 25 },
  { date: '01/20', '微信': 16, '企业微信': 60, '小红书': 16, '抖音': 30, '官网': 9, 'APP': 22 },
];

// 渠道分布数据
const channelDistributionData = [
  { channel: '企业微信', interactions: 283, color: '#2e7cf6' },
  { channel: '微信', interactions: 105, color: '#07c160' },
  { channel: '抖音', interactions: 158, color: '#000000' },
  { channel: '小红书', interactions: 99, color: '#ff2442' },
  { channel: 'APP', interactions: 122, color: '#10b981' },
  { channel: '官网', interactions: 57, color: '#6366f1' },
];

// 用户行为时间线
const userActivityTimeline = [
  { 
    id: '1', 
    time: '2024-01-20 15:30', 
    channel: '企业微信', 
    action: '咨询产品功能', 
    description: '询问企业版套餐的AI Agent数量限制',
    type: 'inquiry'
  },
  { 
    id: '2', 
    time: '2024-01-20 14:15', 
    channel: '小红书', 
    action: '点赞笔记', 
    description: '点赞了"AI营销自动化最佳实践"笔记',
    type: 'engagement'
  },
  { 
    id: '3', 
    time: '2024-01-20 10:20', 
    channel: '官网', 
    action: '浏览页面', 
    description: '访问了产品定价页面，停留3分钟',
    type: 'browse'
  },
  { 
    id: '4', 
    time: '2024-01-19 16:45', 
    channel: '企业微信', 
    action: '下载资料', 
    description: '下载了"行业解决方案白皮书"',
    type: 'download'
  },
  { 
    id: '5', 
    time: '2024-01-19 11:30', 
    channel: '抖音', 
    action: '观看视频', 
    description: '完整观看了产品演示视频（5分钟）',
    type: 'video'
  },
  { 
    id: '6', 
    time: '2024-01-18 14:00', 
    channel: 'APP', 
    action: '使用功能', 
    description: '使用了内容生成Agent，生成3篇文章',
    type: 'usage'
  },
  { 
    id: '7', 
    time: '2024-01-17 09:20', 
    channel: '微信', 
    action: '参与活动', 
    description: '参与了新年促销活动抽奖',
    type: 'event'
  },
  { 
    id: '8', 
    time: '2024-01-16 16:30', 
    channel: '企业微信', 
    action: '提交反馈', 
    description: '提交了产品改进建议',
    type: 'feedback'
  },
];

// 行为类型配置
const activityTypeConfig: { [key: string]: { icon: any; color: string; label: string } } = {
  'inquiry': { icon: MessageCircle, color: '#6366f1', label: '咨询' },
  'engagement': { icon: Heart, color: '#ec4899', label: '互动' },
  'browse': { icon: Activity, color: '#8b5cf6', label: '浏览' },
  'download': { icon: TrendingUp, color: '#10b981', label: '下载' },
  'video': { icon: Activity, color: '#f59e0b', label: '视频' },
  'usage': { icon: Target, color: '#06b6d4', label: '使用' },
  'event': { icon: Users, color: '#f97316', label: '活动' },
  'feedback': { icon: MessageCircle, color: '#84cc16', label: '反馈' },
};

export function UserDetailPage() {
  const { userId } = useParams();
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <MainLayout>
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl mb-2">用户详情</h1>
              <p className="text-muted-foreground">
                全方位了解用户画像和行为轨迹
              </p>
            </div>
            <Button>
              <MessageCircle className="mr-2 w-4 h-4" />
              发起对话
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* User Profile Card */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-start gap-6">
              {/* Avatar */}
              <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="w-12 h-12 text-primary" />
              </div>
              
              {/* Basic Info */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <h2 className="text-2xl">{userInfo.name}</h2>
                  <Badge variant="default">{userInfo.status}</Badge>
                  <div 
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-sm"
                    style={{ 
                      backgroundColor: channelConfig[userInfo.mainChannel]?.bgColor,
                      color: channelConfig[userInfo.mainChannel]?.color 
                    }}
                  >
                    <span>{channelConfig[userInfo.mainChannel]?.icon}</span>
                    <span className="font-medium">主要渠道: {userInfo.mainChannel}</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span>{userInfo.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span>{userInfo.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span>{userInfo.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span>注册: {userInfo.registerDate}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">最后活跃: {userInfo.lastActive}</span>
                </div>

                <div className="flex gap-2 mt-4">
                  {userInfo.tags.map((tag, idx) => (
                    <Badge key={idx} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="overview">六维画像</TabsTrigger>
            <TabsTrigger value="channels">多渠道分析</TabsTrigger>
            <TabsTrigger value="timeline">行为时间线</TabsTrigger>
          </TabsList>

          {/* 六维画像 */}
          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* 雷达图 */}
              <Card>
                <CardHeader>
                  <CardTitle>用户六维画像</CardTitle>
                  <CardDescription>综合评估用户在六个关键维度的表现</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <RadarChart data={sixDimensionsData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="dimension" />
                      <PolarRadiusAxis angle={90} domain={[0, 100]} />
                      <Radar 
                        name="用户画像" 
                        dataKey="value" 
                        stroke="#5B21B6" 
                        fill="#5B21B6" 
                        fillOpacity={0.6} 
                      />
                      <Tooltip />
                    </RadarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* 维度详情 */}
              <Card>
                <CardHeader>
                  <CardTitle>维度详细分析</CardTitle>
                  <CardDescription>各维度得分及详细说明</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {sixDimensionsData.map((item, idx) => (
                      <div key={idx}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">{item.dimension}</span>
                          <span className="text-sm font-semibold text-primary">{item.value}/100</span>
                        </div>
                        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary transition-all"
                            style={{ width: `${item.value}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <Separator className="my-6" />

                  <div className="space-y-3 text-sm">
                    <p className="text-muted-foreground">
                      <strong className="text-foreground">活跃度 (85分):</strong> 用户近30天登录15次，平均每日使用时长45分钟
                    </p>
                    <p className="text-muted-foreground">
                      <strong className="text-foreground">购买力 (78分):</strong> 历史消费总额¥9,800，客单价较高
                    </p>
                    <p className="text-muted-foreground">
                      <strong className="text-foreground">忠诚度 (92分):</strong> 使用时长10个月，续费率100%
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* 多渠道分析 */}
          <TabsContent value="channels">
            <div className="space-y-6">
              {/* 渠道活跃度趋势 */}
              <Card>
                <CardHeader>
                  <CardTitle>多渠道活跃度趋势</CardTitle>
                  <CardDescription>过去7天用户在各渠道的互动次数</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={350}>
                    <LineChart data={channelActivityData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="企业微信" stroke="#2e7cf6" strokeWidth={2} />
                      <Line type="monotone" dataKey="微信" stroke="#07c160" strokeWidth={2} />
                      <Line type="monotone" dataKey="抖音" stroke="#000000" strokeWidth={2} />
                      <Line type="monotone" dataKey="小红书" stroke="#ff2442" strokeWidth={2} />
                      <Line type="monotone" dataKey="APP" stroke="#10b981" strokeWidth={2} />
                      <Line type="monotone" dataKey="官网" stroke="#6366f1" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* 渠道分布 */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>渠道互动分布</CardTitle>
                    <CardDescription>累计互动次数对比</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={channelDistributionData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="channel" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="interactions" fill="#5B21B6" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>渠道详细统计</CardTitle>
                    <CardDescription>各渠道的互动数据明细</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {channelDistributionData.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 rounded-lg border">
                          <div className="flex items-center gap-3">
                            <div 
                              className="w-10 h-10 rounded-lg flex items-center justify-center text-lg"
                              style={{ 
                                backgroundColor: channelConfig[item.channel]?.bgColor 
                              }}
                            >
                              {channelConfig[item.channel]?.icon}
                            </div>
                            <div>
                              <div className="font-medium">{item.channel}</div>
                              <div className="text-xs text-muted-foreground">
                                {((item.interactions / channelDistributionData.reduce((sum, c) => sum + c.interactions, 0)) * 100).toFixed(1)}% 占比
                              </div>
                            </div>
                          </div>
                          <div className="text-lg font-semibold" style={{ color: item.color }}>
                            {item.interactions}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* 行为时间线 */}
          <TabsContent value="timeline">
            <Card>
              <CardHeader>
                <CardTitle>用户行为时间线</CardTitle>
                <CardDescription>用户在各渠道的详细行为记录</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  {/* Timeline line */}
                  <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border" />
                  
                  {/* Timeline items */}
                  <div className="space-y-6">
                    {userActivityTimeline.map((activity) => {
                      const typeConfig = activityTypeConfig[activity.type];
                      const IconComponent = typeConfig.icon;
                      
                      return (
                        <div key={activity.id} className="relative pl-16">
                          {/* Icon */}
                          <div 
                            className="absolute left-3 w-6 h-6 rounded-full flex items-center justify-center border-2 border-background"
                            style={{ backgroundColor: typeConfig.color }}
                          >
                            <IconComponent className="w-3 h-3 text-white" />
                          </div>

                          {/* Content */}
                          <div className="bg-muted/50 rounded-lg p-4 hover:bg-muted transition-colors">
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <Badge 
                                  variant="outline" 
                                  style={{ 
                                    borderColor: typeConfig.color, 
                                    color: typeConfig.color 
                                  }}
                                >
                                  {typeConfig.label}
                                </Badge>
                                <div 
                                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs"
                                  style={{ 
                                    backgroundColor: channelConfig[activity.channel]?.bgColor,
                                    color: channelConfig[activity.channel]?.color 
                                  }}
                                >
                                  <span>{channelConfig[activity.channel]?.icon}</span>
                                  <span>{activity.channel}</span>
                                </div>
                              </div>
                              <span className="text-xs text-muted-foreground flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {activity.time}
                              </span>
                            </div>
                            <h4 className="font-medium mb-1">{activity.action}</h4>
                            <p className="text-sm text-muted-foreground">{activity.description}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </MainLayout>
  );
}