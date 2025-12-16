import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MainLayout } from '../components/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';
import { 
  CheckCircle2, 
  Circle, 
  Clock,
  Calendar as CalendarIcon,
  TrendingUp,
  Users,
  MessageCircle,
  FileText,
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight,
  Play
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  BarChart,
  Bar,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

// 渠道配置
const channelConfig: { [key: string]: { icon: string; color: string } } = {
  '微信': { icon: '💬', color: '#07c160' },
  '企业微信': { icon: '🏢', color: '#2e7cf6' },
  '小红书': { icon: '📕', color: '#ff2442' },
  '抖音': { icon: '🎵', color: '#000000' },
  '官网': { icon: '🌐', color: '#6366f1' },
  'APP': { icon: '📱', color: '#10b981' },
};

// 待办事项数据
const todos = [
  {
    id: '1',
    title: '审核小红书营销文案',
    description: '需要审核3篇AI生成的产品推广文案',
    priority: 'high',
    dueDate: '2024-12-16 18:00',
    status: 'pending',
    channel: '小红书'
  },
  {
    id: '2',
    title: '回复客户咨询',
    description: '5位客户在企业微信询问产品功能',
    priority: 'high',
    dueDate: '2024-12-16 17:00',
    status: 'pending',
    channel: '企业微信'
  },
  {
    id: '3',
    title: '准备周会数据报告',
    description: '整理本周营销数据和转化率分析',
    priority: 'medium',
    dueDate: '2024-12-17 10:00',
    status: 'pending',
    channel: '官网'
  },
  {
    id: '4',
    title: '更新产品知识库',
    description: '添加新产品功能的说明文档',
    priority: 'medium',
    dueDate: '2024-12-17 15:00',
    status: 'pending',
    channel: '官网'
  },
  {
    id: '5',
    title: '优化抖音视频脚本',
    description: 'AI生成的视频脚本需要人工优化',
    priority: 'low',
    dueDate: '2024-12-18 12:00',
    status: 'completed',
    channel: '抖音'
  },
];

// 今日日程
const todaySchedule = [
  { id: '1', time: '09:00', title: '团队晨会', type: 'meeting', duration: '30分钟' },
  { id: '2', time: '10:30', title: '客户A产品演示', type: 'demo', duration: '1小时' },
  { id: '3', time: '14:00', title: '营销策略评审', type: 'review', duration: '1小时' },
  { id: '4', time: '16:00', title: '内容创作培训', type: 'training', duration: '2小时' },
];

// 渠道数据趋势
const channelTrends = [
  { date: '12/10', '微信': 120, '企业微信': 350, '小红书': 89, '抖音': 156, '官网': 67, 'APP': 134 },
  { date: '12/11', '微信': 135, '企业微信': 380, '小红书': 102, '抖音': 178, '官网': 72, 'APP': 145 },
  { date: '12/12', '微信': 118, '企业微信': 365, '小红书': 115, '抖音': 192, '官网': 68, 'APP': 158 },
  { date: '12/13', '微信': 142, '企业微信': 405, '小红书': 98, '抖音': 205, '官网': 81, 'APP': 167 },
  { date: '12/14', '微信': 156, '企业微信': 425, '小红书': 128, '抖音': 218, '官网': 89, 'APP': 178 },
  { date: '12/15', '微信': 168, '企业微信': 450, '小红书': 142, '抖音': 235, '官网': 95, 'APP': 189 },
  { date: '12/16', '微信': 175, '企业微信': 480, '小红书': 156, '抖音': 248, '官网': 102, 'APP': 195 },
];

// 渠道分布
const channelDistribution = [
  { name: '企业微信', value: 480, color: '#2e7cf6' },
  { name: '抖音', value: 248, color: '#000000' },
  { name: 'APP', value: 195, color: '#10b981' },
  { name: '微信', value: 175, color: '#07c160' },
  { name: '小红书', value: 156, color: '#ff2442' },
  { name: '官网', value: 102, color: '#6366f1' },
];

// 最新内容预览
const recentContent = [
  {
    id: '1',
    title: '2024年终大促活动方案',
    type: '营销文案',
    channel: '小红书',
    status: 'published',
    views: 1234,
    engagement: 89,
    createdAt: '2小时前',
    agent: '内容生成Agent'
  },
  {
    id: '2',
    title: '产品功能更新通知',
    type: '客户通知',
    channel: '企业微信',
    status: 'draft',
    views: 0,
    engagement: 0,
    createdAt: '5小时前',
    agent: '客户服务Agent'
  },
  {
    id: '3',
    title: '行业趋势分析报告',
    type: '数据报告',
    channel: '官网',
    status: 'published',
    views: 567,
    engagement: 45,
    createdAt: '1天前',
    agent: '商业智能Agent'
  },
  {
    id: '4',
    title: '新品上市短视频脚本',
    type: '视频脚本',
    channel: '抖音',
    status: 'review',
    views: 0,
    engagement: 0,
    createdAt: '2天前',
    agent: '内容生成Agent'
  },
];

// 优先级颜色
const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high': return 'destructive';
    case 'medium': return 'default';
    case 'low': return 'secondary';
    default: return 'default';
  }
};

// 状态标签
const getStatusBadge = (status: string) => {
  switch (status) {
    case 'published': return { label: '已发布', variant: 'default' as const };
    case 'draft': return { label: '草稿', variant: 'secondary' as const };
    case 'review': return { label: '待审核', variant: 'outline' as const };
    default: return { label: '未知', variant: 'secondary' as const };
  }
};

export function DashboardPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const pendingTodos = todos.filter(t => t.status === 'pending');
  const completedTodos = todos.filter(t => t.status === 'completed');

  return (
    <MainLayout>
      <div className="bg-background">
        {/* Header */}
        <header className="border-b bg-background">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl mb-2">工作台</h1>
                <p className="text-muted-foreground">
                  全面掌控团队 KPI 和个人待办事项
                </p>
              </div>
              <div className="text-right">
                <div className="text-sm text-muted-foreground">今天是</div>
                <div className="text-lg font-semibold">2024年12月16日 星期二</div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          {/* Team KPI Section */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-xl">团队 KPI</CardTitle>
              <CardDescription>团队整体业绩指标</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="flex items-center justify-between p-4 rounded-lg border bg-card">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">团队互动量</p>
                    <p className="text-3xl font-semibold">1,356</p>
                    <div className="flex items-center gap-1 mt-1">
                      <ArrowUpRight className="w-3 h-3 text-green-500" />
                      <p className="text-xs text-green-500">+12.5%</p>
                    </div>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-blue-500" />
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg border bg-card">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">新增客户</p>
                    <p className="text-3xl font-semibold">89</p>
                    <div className="flex items-center gap-1 mt-1">
                      <ArrowUpRight className="w-3 h-3 text-green-500" />
                      <p className="text-xs text-green-500">+8.2%</p>
                    </div>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
                    <Users className="w-6 h-6 text-green-500" />
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg border bg-card">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">内容生成</p>
                    <p className="text-3xl font-semibold">24</p>
                    <div className="flex items-center gap-1 mt-1">
                      <ArrowDownRight className="w-3 h-3 text-red-500" />
                      <p className="text-xs text-red-500">-3.1%</p>
                    </div>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center">
                    <FileText className="w-6 h-6 text-purple-500" />
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg border bg-card">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">转化率</p>
                    <p className="text-3xl font-semibold">23.5%</p>
                    <div className="flex items-center gap-1 mt-1">
                      <ArrowUpRight className="w-3 h-3 text-green-500" />
                      <p className="text-xs text-green-500">+2.3%</p>
                    </div>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-orange-500" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Left Column - Personal Todos */}
            <div className="lg:col-span-2 space-y-6">
              {/* Personal Todos */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>个人待办事项</CardTitle>
                      <CardDescription>您今日需要处理的任务</CardDescription>
                    </div>
                    <Badge variant="secondary">{pendingTodos.length} 项待办</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="pending">
                    <TabsList className="mb-4">
                      <TabsTrigger value="pending">
                        待办 ({pendingTodos.length})
                      </TabsTrigger>
                      <TabsTrigger value="completed">
                        已完成 ({completedTodos.length})
                      </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="pending" className="space-y-3">
                      {pendingTodos.map((todo) => (
                        <div 
                          key={todo.id} 
                          className="flex items-start gap-3 p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                        >
                          <Circle className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2 mb-1">
                              <h4 className="font-medium">{todo.title}</h4>
                              <Badge variant={getPriorityColor(todo.priority)} className="flex-shrink-0">
                                {todo.priority === 'high' ? '高' : todo.priority === 'medium' ? '中' : '低'}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">{todo.description}</p>
                            <div className="flex items-center gap-3 text-xs text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {todo.dueDate}
                              </div>
                              <div className="flex items-center gap-1">
                                <span>{channelConfig[todo.channel]?.icon}</span>
                                {todo.channel}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </TabsContent>

                    <TabsContent value="completed" className="space-y-3">
                      {completedTodos.map((todo) => (
                        <div 
                          key={todo.id} 
                          className="flex items-start gap-3 p-4 rounded-lg border bg-muted/30"
                        >
                          <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium line-through text-muted-foreground">{todo.title}</h4>
                            <p className="text-sm text-muted-foreground mb-2">{todo.description}</p>
                          </div>
                        </div>
                      ))}
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>

              {/* Channel Trends */}
              <Card>
                <CardHeader>
                  <CardTitle>多渠道互动趋势</CardTitle>
                  <CardDescription>过去7天各渠道的互动数据</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={channelTrends}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="企业微信" stroke="#2e7cf6" strokeWidth={2} />
                      <Line type="monotone" dataKey="抖音" stroke="#000000" strokeWidth={2} />
                      <Line type="monotone" dataKey="APP" stroke="#10b981" strokeWidth={2} />
                      <Line type="monotone" dataKey="微信" stroke="#07c160" strokeWidth={2} />
                      <Line type="monotone" dataKey="小红书" stroke="#ff2442" strokeWidth={2} />
                      <Line type="monotone" dataKey="官网" stroke="#6366f1" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Schedule & Stats */}
            <div className="space-y-6">
              {/* Today's Schedule */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>今日日程</CardTitle>
                      <CardDescription>12月16日</CardDescription>
                    </div>
                    <Button variant="ghost" size="sm" asChild>
                      <Link to="#">
                        查看全部
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </Link>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {todaySchedule.map((event) => (
                      <div key={event.id} className="flex gap-3 p-3 rounded-lg border">
                        <div className="text-center flex-shrink-0">
                          <div className="text-xs text-muted-foreground">时间</div>
                          <div className="text-sm font-semibold">{event.time}</div>
                        </div>
                        <Separator orientation="vertical" />
                        <div className="flex-1">
                          <h4 className="font-medium mb-1">{event.title}</h4>
                          <p className="text-xs text-muted-foreground">{event.duration}</p>
                        </div>
                        <Button size="icon" variant="ghost" className="flex-shrink-0">
                          <Play className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Channel Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle>渠道分布</CardTitle>
                  <CardDescription>今日各渠道互动占比</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {channelDistribution.map((channel, idx) => {
                      const total = channelDistribution.reduce((sum, c) => sum + c.value, 0);
                      const percentage = ((channel.value / total) * 100).toFixed(1);
                      
                      return (
                        <div key={idx}>
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <span>{channelConfig[channel.name]?.icon}</span>
                              <span className="text-sm font-medium">{channel.name}</span>
                            </div>
                            <span className="text-sm font-semibold" style={{ color: channel.color }}>
                              {percentage}%
                            </span>
                          </div>
                          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                            <div 
                              className="h-full transition-all"
                              style={{ 
                                width: `${percentage}%`,
                                backgroundColor: channel.color
                              }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Recent Content */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>最新内容</CardTitle>
                  <CardDescription>AI生成的最新营销内容预览</CardDescription>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link to="#">
                    查看全部
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {recentContent.map((content) => {
                  const statusBadge = getStatusBadge(content.status);
                  
                  return (
                    <div 
                      key={content.id} 
                      className="p-4 rounded-lg border hover:border-primary transition-colors cursor-pointer"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <Badge variant={statusBadge.variant}>{statusBadge.label}</Badge>
                        <div 
                          className="px-2 py-1 rounded text-xs"
                          style={{ 
                            backgroundColor: channelConfig[content.channel]?.color + '15',
                            color: channelConfig[content.channel]?.color
                          }}
                        >
                          <span className="mr-1">{channelConfig[content.channel]?.icon}</span>
                          {content.channel}
                        </div>
                      </div>
                      
                      <h4 className="font-medium mb-2 line-clamp-2">{content.title}</h4>
                      
                      <div className="text-xs text-muted-foreground mb-3">
                        {content.type} · {content.createdAt}
                      </div>
                      
                      {content.status === 'published' && (
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <div>👁️ {content.views}</div>
                          <div>❤️ {content.engagement}</div>
                        </div>
                      )}
                      
                      <Separator className="my-3" />
                      
                      <div className="text-xs text-muted-foreground">
                        🤖 {content.agent}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </MainLayout>
  );
}
