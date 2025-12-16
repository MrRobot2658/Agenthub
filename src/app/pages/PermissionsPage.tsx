import { MainLayout } from '../components/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Switch } from '../components/ui/switch';
import { 
  Shield, 
  Users,
  Plus,
  CheckCircle2
} from 'lucide-react';

export function PermissionsPage() {
  return (
    <MainLayout>
      <div className="bg-background">
        {/* Header */}
        <header className="border-b bg-background">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl mb-2">权限管理</h1>
                <p className="text-muted-foreground">
                  管理角色和访问权限
                </p>
              </div>
              <Button>
                <Plus className="mr-2 w-4 h-4" />
                创建角色
              </Button>
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
                    <p className="text-sm text-muted-foreground mb-1">角色数量</p>
                    <p className="text-3xl font-semibold">4</p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Shield className="w-6 h-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">权限项</p>
                    <p className="text-3xl font-semibold">18</p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-green-500" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">已分配用户</p>
                    <p className="text-3xl font-semibold">24</p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                    <Users className="w-6 h-6 text-blue-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                name: '管理员',
                description: '拥有所有权限的超级管理员',
                users: 2,
                permissions: ['所有权限']
              },
              {
                name: '编辑者',
                description: '可以创建和编辑内容',
                users: 8,
                permissions: ['创建Agent', '编辑内容', '查看数据']
              },
              {
                name: '查看者',
                description: '只读权限，可查看所有内容',
                users: 12,
                permissions: ['查看Agent', '查看数据', '导出报表']
              },
              {
                name: '客服',
                description: '客户服务相关权限',
                users: 2,
                permissions: ['客户管理', '消息回复', '查看数据']
              },
            ].map((role, idx) => (
              <Card key={idx}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>{role.name}</CardTitle>
                      <CardDescription>{role.description}</CardDescription>
                    </div>
                    <Badge variant="secondary">{role.users} 用户</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="text-sm font-medium mb-2">权限列表</div>
                    {role.permissions.map((permission, pidx) => (
                      <div key={pidx} className="flex items-center justify-between p-2 rounded bg-muted/50">
                        <span className="text-sm">{permission}</span>
                        <Switch checked={true} />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </MainLayout>
  );
}
