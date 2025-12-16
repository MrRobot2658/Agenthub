import { useParams, Link } from 'react-router-dom';
import { agents, categoryLabels } from '../data/agents';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { ArrowLeft, Play } from 'lucide-react';
import { 
  FileText, 
  Megaphone, 
  Search, 
  Users, 
  Headphones, 
  Mail, 
  MessageCircle, 
  GraduationCap, 
  BarChart3,
  ClipboardList,
  MessageSquare,
  Briefcase,
  BookOpen,
  Video
} from 'lucide-react';
import logoImg from '../../assets/c7019ab930c36b5953f155a225e5dc6b8936e3f5.png';

const iconMap = {
  FileText,
  Megaphone,
  Search,
  Users,
  Headphones,
  Mail,
  MessageCircle,
  GraduationCap,
  BarChart3,
  ClipboardList,
  MessageSquare,
  Briefcase,
  BookOpen,
  Video
};

export function AgentDetailPage() {
  const { agentId } = useParams();
  const agent = agents.find((a) => a.id === agentId);

  if (!agent) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl mb-4">Agent 未找到</h1>
          <Button asChild>
            <Link to="/">返回首页</Link>
          </Button>
        </div>
      </div>
    );
  }

  const Icon = iconMap[agent.icon as keyof typeof iconMap];
  const categoryLabel = categoryLabels[agent.category];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4 mb-4">
            <Button variant="ghost" size="icon" asChild>
              <Link to="/">
                <ArrowLeft className="w-4 h-4" />
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl">{agent.nameCN}</h1>
              <p className="text-muted-foreground">{agent.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="outline">{categoryLabel.zh}</Badge>
            <Button asChild>
              <Link to={`/agent/${agent.id}/workspace`}>
                <Play className="mr-2 w-4 h-4" />
                开始使用
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <CardTitle>功能介绍</CardTitle>
                    <CardDescription>{agent.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>

            <Tabs defaultValue="features" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="features">核心功能</TabsTrigger>
                <TabsTrigger value="usecases">使用场景</TabsTrigger>
              </TabsList>
              <TabsContent value="features" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>核心功能</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {agent.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-xs text-primary">{index + 1}</span>
                          </div>
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="usecases" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>使用场景</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {agent.useCases.map((useCase, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-xs text-primary">{index + 1}</span>
                          </div>
                          <span className="text-sm">{useCase}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>标签</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {agent.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">{tag}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>快速开始</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full" asChild>
                  <Link to={`/agent/${agent.id}/workspace`}>
                    <Play className="mr-2 w-4 h-4" />
                    进入工作区
                  </Link>
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  开始与 {agent.nameCN} 交互
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}