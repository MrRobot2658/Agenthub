import { useState } from 'react';
import { MainLayout } from '../components/MainLayout';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';
import { Badge } from '../components/ui/badge';
import { 
  Search, 
  Upload, 
  FileText, 
  Folder, 
  Database,
  BookOpen,
  Building2,
  Stethoscope,
  ShoppingCart,
  GraduationCap,
  Home as HomeIcon,
  Briefcase,
  TrendingUp
} from 'lucide-react';

// 行业类型
const industries = [
  { id: 'finance', name: '金融', icon: TrendingUp, color: '#10b981', count: 1245 },
  { id: 'healthcare', name: '医疗健康', icon: Stethoscope, color: '#ef4444', count: 892 },
  { id: 'ecommerce', name: '电商零售', icon: ShoppingCart, color: '#f59e0b', count: 1567 },
  { id: 'education', name: '教育培训', icon: GraduationCap, color: '#6366f1', count: 734 },
  { id: 'realestate', name: '房地产', icon: HomeIcon, color: '#8b5cf6', count: 456 },
  { id: 'manufacturing', name: '制造业', icon: Building2, color: '#ec4899', count: 623 },
  { id: 'consulting', name: '专业服务', icon: Briefcase, color: '#14b8a6', count: 389 },
];

// 知识库文档示例数据
const knowledgeDocuments = [
  {
    id: '1',
    title: '金融行业客户服务最佳实践',
    industry: 'finance',
    type: '指南',
    size: '2.3 MB',
    lastUpdate: '2024-01-15',
    description: '详细介绍金融行业客户服务的标准流程、常见问题解决方案和合规要求',
  },
  {
    id: '2',
    title: '医疗健康产品知识手册',
    industry: 'healthcare',
    type: '手册',
    size: '5.1 MB',
    lastUpdate: '2024-01-10',
    description: '涵盖医疗器械、药品、健康管理等领域的专业知识',
  },
  {
    id: '3',
    title: '电商平台运营SOP',
    industry: 'ecommerce',
    type: 'SOP',
    size: '1.8 MB',
    lastUpdate: '2024-01-20',
    description: '电商平台日常运营、客户管理、订单处理等标准操作流程',
  },
  {
    id: '4',
    title: '在线教育课程设计指南',
    industry: 'education',
    type: '指南',
    size: '3.2 MB',
    lastUpdate: '2024-01-12',
    description: '在线课程内容设计、互动形式、评估方法等专业指导',
  },
  {
    id: '5',
    title: '房地产销售话术库',
    industry: 'realestate',
    type: '话术',
    size: '1.5 MB',
    lastUpdate: '2024-01-18',
    description: '房地产销售各阶段的标准话术、常见问题应对和成交技巧',
  },
  {
    id: '6',
    title: '制造业质量管理体系',
    industry: 'manufacturing',
    type: '体系',
    size: '4.7 MB',
    lastUpdate: '2024-01-08',
    description: '制造业质量控制标准、检验流程、问题追溯等完整体系',
  },
];

export function KnowledgeBasePage() {
  const [selectedIndustry, setSelectedIndustry] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDocuments = knowledgeDocuments.filter((doc) => {
    const matchesIndustry = selectedIndustry === 'all' || doc.industry === selectedIndustry;
    const matchesSearch = searchQuery === '' || 
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.description.includes(searchQuery);
    
    return matchesIndustry && matchesSearch;
  });

  const getIndustryInfo = (industryId: string) => {
    return industries.find(ind => ind.id === industryId);
  };

  return (
    <MainLayout>
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl mb-2">知识库</h1>
              <p className="text-muted-foreground">
                汇集各行业专业知识，为 AI Agent 提供精准的领域知识支持
              </p>
            </div>
            <Button>
              <Upload className="mr-2 w-4 h-4" />
              上传文档
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="搜索知识库文档..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 text-base"
            />
          </div>
        </div>

        {/* Industry Stats */}
        <div className="mb-8">
          <h2 className="text-lg mb-4">行业分类</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${
                selectedIndustry === 'all' ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => setSelectedIndustry('all')}
            >
              <CardContent className="p-4 text-center">
                <div className="p-3 rounded-lg bg-gray-100 inline-flex mb-2">
                  <Database className="w-6 h-6 text-gray-600" />
                </div>
                <div className="text-sm">全部</div>
                <div className="text-xs text-muted-foreground">
                  {knowledgeDocuments.length} 篇
                </div>
              </CardContent>
            </Card>
            {industries.map((industry) => (
              <Card
                key={industry.id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedIndustry === industry.id ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => setSelectedIndustry(industry.id)}
              >
                <CardContent className="p-4 text-center">
                  <div 
                    className="p-3 rounded-lg inline-flex mb-2"
                    style={{ backgroundColor: industry.color + '20' }}
                  >
                    <industry.icon className="w-6 h-6" style={{ color: industry.color }} />
                  </div>
                  <div className="text-sm">{industry.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {knowledgeDocuments.filter(d => d.industry === industry.id).length} 篇
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Documents List */}
        <Tabs defaultValue="documents" className="space-y-6">
          <TabsList>
            <TabsTrigger value="documents">
              <FileText className="mr-2 w-4 h-4" />
              文档列表
            </TabsTrigger>
            <TabsTrigger value="folders">
              <Folder className="mr-2 w-4 h-4" />
              文件夹
            </TabsTrigger>
            <TabsTrigger value="collections">
              <BookOpen className="mr-2 w-4 h-4" />
              知识集合
            </TabsTrigger>
          </TabsList>

          <TabsContent value="documents" className="space-y-4">
            {filteredDocuments.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <FileText className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">未找到匹配的文档</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredDocuments.map((doc) => {
                  const industryInfo = getIndustryInfo(doc.industry);
                  return (
                    <Card key={doc.id} className="hover:shadow-md transition-shadow cursor-pointer">
                      <CardHeader>
                        <div className="flex items-start justify-between mb-2">
                          {industryInfo && (
                            <div 
                              className="p-2 rounded"
                              style={{ backgroundColor: industryInfo.color + '20' }}
                            >
                              <industryInfo.icon className="w-4 h-4" style={{ color: industryInfo.color }} />
                            </div>
                          )}
                          <Badge variant="secondary">{doc.type}</Badge>
                        </div>
                        <CardTitle className="text-base">{doc.title}</CardTitle>
                        <CardDescription className="text-xs line-clamp-2">
                          {doc.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>{doc.size}</span>
                          <span>更新于 {doc.lastUpdate}</span>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </TabsContent>

          <TabsContent value="folders">
            <Card>
              <CardContent className="p-12 text-center">
                <Folder className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">文件夹视图开发中...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="collections">
            <Card>
              <CardContent className="p-12 text-center">
                <BookOpen className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">知识集合功能开发中...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </MainLayout>
  );
}