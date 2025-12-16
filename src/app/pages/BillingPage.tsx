import { MainLayout } from '../components/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { 
  CreditCard, 
  TrendingUp, 
  Calendar,
  CheckCircle2,
  Zap
} from 'lucide-react';

export function BillingPage() {
  return (
    <MainLayout>
      <div className="bg-background">
        {/* Header */}
        <header className="border-b bg-background">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl mb-2">账户额度</h1>
                <p className="text-muted-foreground">
                  管理您的套餐和用量
                </p>
              </div>
              <Button>
                <CreditCard className="mr-2 w-4 h-4" />
                升级套餐
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          {/* Current Plan */}
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>当前套餐</CardTitle>
                  <CardDescription>Enterprise 企业版</CardDescription>
                </div>
                <Badge variant="default" className="text-lg px-4 py-2">
                  Pro
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Zap className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">AI 调用次数</p>
                    <p className="text-2xl font-semibold">8,450 / 10,000</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-green-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">存储空间</p>
                    <p className="text-2xl font-semibold">45GB / 100GB</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">续费日期</p>
                    <p className="text-2xl font-semibold">2025-01-16</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Usage Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>AI 调用用量</CardTitle>
                <CardDescription>本月已使用 84.5%</CardDescription>
              </CardHeader>
              <CardContent>
                <Progress value={84.5} className="mb-2" />
                <p className="text-sm text-muted-foreground">
                  剩余 1,550 次调用
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>存储空间</CardTitle>
                <CardDescription>已使用 45%</CardDescription>
              </CardHeader>
              <CardContent>
                <Progress value={45} className="mb-2" />
                <p className="text-sm text-muted-foreground">
                  剩余 55GB 可用
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Features */}
          <Card>
            <CardHeader>
              <CardTitle>套餐功能</CardTitle>
              <CardDescription>Enterprise 版本包含的功能</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  '无限制 Agent 创建',
                  '高级 AI 模型访问',
                  '优先技术支持',
                  '数据导出功能',
                  '团队协作功能',
                  'API 访问权限',
                  '自定义品牌',
                  '高级分析报表'
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    <span>{feature}</span>
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
