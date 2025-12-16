import { MainLayout } from '../components/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';
import { 
  Bell, 
  Check,
  Trash2,
  MessageCircle,
  TrendingUp,
  Users,
  Clock
} from 'lucide-react';

export function NotificationsPage() {
  const notifications = [
    {
      id: '1',
      type: 'message',
      title: '新客户咨询',
      description: '来自企业微信的5条新消息待回复',
      time: '5分钟前',
      read: false,
      icon: MessageCircle,
      color: 'text-blue-500'
    },
    {
      id: '2',
      type: 'alert',
      title: 'AI 调用量预警',
      description: '本月AI调用量已达85%，建议升级套餐',
      time: '1小时前',
      read: false,
      icon: TrendingUp,
      color: 'text-orange-500'
    },
    {
      id: '3',
      type: 'system',
      title: '新成员加入',
      description: '刘洋已接受邀请加入您的组织',
      time: '3小时前',
      read: false,
      icon: Users,
      color: 'text-green-500'
    },
    {
      id: '4',
      type: 'message',
      title: '内容审核完成',
      description: '您的小红书营销文案已通过审核',
      time: '5小时前',
      read: true,
      icon: MessageCircle,
      color: 'text-blue-500'
    },
    {
      id: '5',
      type: 'system',
      title: '系统更新',
      description: 'AgentHub 已更新至 v2.5.0',
      time: '1天前',
      read: true,
      icon: Bell,
      color: 'text-purple-500'
    },
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <MainLayout>
      <div className="bg-background">
        {/* Header */}
        <header className="border-b bg-background">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl mb-2">消息中心</h1>
                <p className="text-muted-foreground">
                  查看系统通知和重要消息
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline">
                  <Check className="mr-2 w-4 h-4" />
                  全部已读
                </Button>
                <Button variant="outline">
                  <Trash2 className="mr-2 w-4 h-4" />
                  清空
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">未读消息</p>
                    <p className="text-3xl font-semibold">{unreadCount}</p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Bell className="w-6 h-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">今日消息</p>
                    <p className="text-3xl font-semibold">8</p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-blue-500" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">全部消息</p>
                    <p className="text-3xl font-semibold">{notifications.length}</p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
                    <Clock className="w-6 h-6 text-green-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="all">
            <TabsList className="mb-6">
              <TabsTrigger value="all">
                全部 ({notifications.length})
              </TabsTrigger>
              <TabsTrigger value="unread">
                未读 ({unreadCount})
              </TabsTrigger>
              <TabsTrigger value="read">
                已读 ({notifications.length - unreadCount})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {notifications.map((notification) => {
                      const Icon = notification.icon;
                      
                      return (
                        <div 
                          key={notification.id} 
                          className={`flex items-start gap-4 p-4 rounded-lg border transition-colors ${
                            notification.read ? 'bg-background' : 'bg-muted/50'
                          } hover:border-primary cursor-pointer`}
                        >
                          <div className={`w-10 h-10 rounded-full bg-muted flex items-center justify-center flex-shrink-0 ${notification.color}`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2 mb-1">
                              <h4 className="font-medium">{notification.title}</h4>
                              {!notification.read && (
                                <Badge variant="default" className="flex-shrink-0">新</Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">
                              {notification.description}
                            </p>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <Clock className="w-3 h-3" />
                              {notification.time}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="unread">
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {notifications.filter(n => !n.read).map((notification) => {
                      const Icon = notification.icon;
                      
                      return (
                        <div 
                          key={notification.id} 
                          className="flex items-start gap-4 p-4 rounded-lg border bg-muted/50 hover:border-primary cursor-pointer transition-colors"
                        >
                          <div className={`w-10 h-10 rounded-full bg-muted flex items-center justify-center flex-shrink-0 ${notification.color}`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2 mb-1">
                              <h4 className="font-medium">{notification.title}</h4>
                              <Badge variant="default" className="flex-shrink-0">新</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">
                              {notification.description}
                            </p>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <Clock className="w-3 h-3" />
                              {notification.time}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="read">
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {notifications.filter(n => n.read).map((notification) => {
                      const Icon = notification.icon;
                      
                      return (
                        <div 
                          key={notification.id} 
                          className="flex items-start gap-4 p-4 rounded-lg border hover:border-primary cursor-pointer transition-colors"
                        >
                          <div className={`w-10 h-10 rounded-full bg-muted flex items-center justify-center flex-shrink-0 ${notification.color}`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium">{notification.title}</h4>
                            <p className="text-sm text-muted-foreground mb-2">
                              {notification.description}
                            </p>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <Clock className="w-3 h-3" />
                              {notification.time}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </MainLayout>
  );
}
