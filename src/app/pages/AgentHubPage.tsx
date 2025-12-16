import { useState } from 'react';
import { Link } from 'react-router-dom';
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
import { Search, Plus } from 'lucide-react';

export function AgentHubPage() {
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
      {/* Page Header */}
      <div className="border-b bg-background">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-4xl mb-2">AgentHub</h1>
              <p className="text-muted-foreground">
                从工具到伙伴 全链路营销服智能体平台
              </p>
            </div>
            <Button asChild>
              <Link to="/create-agent">
                <Plus className="w-4 h-4 mr-2" />
                创建 Agent
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
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

          {/* Industry Filter */}
          <Select value={selectedIndustry} onValueChange={(value) => setSelectedIndustry(value as Industry)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="选择行业" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部行业</SelectItem>
              <SelectItem value="finance">{industryLabels.finance}</SelectItem>
              <SelectItem value="ecommerce">{industryLabels.ecommerce}</SelectItem>
              <SelectItem value="education">{industryLabels.education}</SelectItem>
              <SelectItem value="healthcare">{industryLabels.healthcare}</SelectItem>
              <SelectItem value="realestate">{industryLabels.realestate}</SelectItem>
              <SelectItem value="manufacturing">{industryLabels.manufacturing}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Results Count */}
        <div className="mb-4">
          <p className="text-muted-foreground">
            找到 <span className="font-semibold text-foreground">{filteredAgents.length}</span> 个智能体
          </p>
        </div>

        {/* Agent Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAgents.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
        </div>

        {/* Empty State */}
        {filteredAgents.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🤖</div>
            <h3 className="text-xl font-semibold mb-2">未找到匹配的智能体</h3>
            <p className="text-muted-foreground">
              请尝试调整搜索条件或筛选器
            </p>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
