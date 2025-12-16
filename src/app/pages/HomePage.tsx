import { useState } from 'react';
import { agents, categoryLabels, industryLabels, Industry } from '../data/agents';
import { AgentCard } from '../components/AgentCard';
import { MainLayout } from '../components/MainLayout';
import { Tabs, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { Search, Plus, Database, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import logoImg from '../../assets/c7019ab930c36b5953f155a225e5dc6b8936e3f5.png';

export function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedIndustry, setSelectedIndustry] = useState<Industry>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAgents = agents.filter((agent) => {
    const matchesCategory = selectedCategory === 'all' || agent.category === selectedCategory;
    const matchesIndustry = selectedIndustry === 'all' || agent.industry.includes(selectedIndustry);
    const matchesSearch = searchQuery === '' || 
      agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.nameCN.includes(searchQuery) ||
      agent.description.includes(searchQuery) ||
      agent.tags.some(tag => tag.includes(searchQuery));
    
    return matchesCategory && matchesIndustry && matchesSearch;
  });

  return (
    <MainLayout>
      {/* Header */}
      <header className="border-b bg-background">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <img src={logoImg} alt="Agenthub Logo" className="h-12 w-auto" />
            <div>
              <h1 className="text-4xl mb-2">Agenthub</h1>
              <p className="text-muted-foreground">
                从工具到伙伴 全链路营销服智能体平台
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Filters Row */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="搜索 Agent..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Category Tabs */}
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
            <TabsList>
              <TabsTrigger value="all">全部</TabsTrigger>
              <TabsTrigger value="marketing">
                {categoryLabels.marketing.zh}
              </TabsTrigger>
              <TabsTrigger value="sales">
                {categoryLabels.sales.zh}
              </TabsTrigger>
              <TabsTrigger value="service">
                {categoryLabels.service.zh}
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Industry Select */}
          <div className="w-full lg:w-48">
            <Select value={selectedIndustry} onValueChange={(value: Industry) => setSelectedIndustry(value)}>
              <SelectTrigger>
                <SelectValue>{industryLabels[selectedIndustry]}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                {Object.entries(industryLabels).map(([key, label]) => (
                  <SelectItem key={key} value={key}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Agent Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAgents.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
        </div>

        {filteredAgents.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">未找到匹配的 Agent</p>
          </div>
        )}
      </main>
    </MainLayout>
  );
}