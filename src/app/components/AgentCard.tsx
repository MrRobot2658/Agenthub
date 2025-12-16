import { Agent } from '../data/agents';
import { Badge } from './ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
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
  Video,
  ArrowRight
} from 'lucide-react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';

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

interface AgentCardProps {
  agent: Agent;
}

export function AgentCard({ agent }: AgentCardProps) {
  const Icon = iconMap[agent.icon as keyof typeof iconMap];

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Icon className="w-6 h-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">{agent.nameCN}</CardTitle>
              <CardDescription className="text-sm mt-1">{agent.name}</CardDescription>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">{agent.description}</p>
        
        <div className="flex flex-wrap gap-2">
          {agent.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary">{tag}</Badge>
          ))}
          {agent.tags.length > 3 && (
            <Badge variant="outline">+{agent.tags.length - 3}</Badge>
          )}
        </div>

        <div className="flex gap-2 pt-2">
          <Button asChild className="flex-1" variant="outline">
            <Link to={`/agent/${agent.id}`}>
              查看详情
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
          <Button asChild className="flex-1">
            <Link to={`/agent/${agent.id}/workspace`}>
              开始使用
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}