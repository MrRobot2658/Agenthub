import { MainLayout } from '../components/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { 
  Building2, 
  Users, 
  UserPlus,
  Mail,
  Shield
} from 'lucide-react';

export function OrganizationPage() {
  return (
    <MainLayout>
      <div className="bg-background">
        {/* Header */}
        <header className="border-b bg-background">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl mb-2">组织管理</h1>
                <p className="text-muted-foreground">
                  管理您的组织架构和成员
                </p>
              </div>
              <Button>
                <UserPlus className="mr-2 w-4 h-4" />
                邀请成员
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
                    <p className="text-sm text-muted-foreground mb-1">组织成员</p>
                    <p className="text-3xl font-semibold">24</p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">部门数量</p>
                    <p className="text-3xl font-semibold">5</p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-blue-500" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">待处理邀请</p>
                    <p className="text-3xl font-semibold">3</p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center">
                    <Mail className="w-6 h-6 text-orange-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>组织成员</CardTitle>
              <CardDescription>管理您的团队成员和权限</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: '王晓明', email: 'wangxiaoming@ringdigital.com', role: '管理员', status: 'active' },
                  { name: '李娜', email: 'lina@ringdigital.com', role: '成员', status: 'active' },
                  { name: '张伟', email: 'zhangwei@ringdigital.com', role: '成员', status: 'active' },
                  { name: '刘洋', email: 'liuyang@ringdigital.com', role: '成员', status: 'pending' },
                ].map((member, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Users className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium">{member.name}</div>
                        <div className="text-sm text-muted-foreground">{member.email}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant={member.role === '管理员' ? 'default' : 'secondary'}>
                        {member.role}
                      </Badge>
                      <Badge variant={member.status === 'active' ? 'default' : 'outline'}>
                        {member.status === 'active' ? '已激活' : '待确认'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </MainLayout>
  );
}
