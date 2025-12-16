import { useCallback, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ReactFlow, {
  Node,
  Edge,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  MiniMap,
  BackgroundVariant,
  Panel,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Checkbox } from '../components/ui/checkbox';
import { Separator } from '../components/ui/separator';
import { ArrowLeft, Save, Play, Settings, Database, MessageSquare, Zap, FileText, Brain, BookOpen, Wand2 } from 'lucide-react';
import logoImg from '../../assets/c7019ab930c36b5953f155a225e5dc6b8936e3f5.png';

// Available AI models
const availableModels = [
  { id: 'gpt-4', name: 'GPT-4', provider: 'OpenAI', description: '最强大的语言模型' },
  { id: 'gpt-3.5', name: 'GPT-3.5 Turbo', provider: 'OpenAI', description: '快速且经济' },
  { id: 'claude-3', name: 'Claude 3', provider: 'Anthropic', description: '优秀的对话能力' },
  { id: 'wenxin', name: '文心一言', provider: '百度', description: '中文优化模型' },
  { id: 'tongyi', name: '通义千问', provider: '阿里', description: '阿里云大模型' },
  { id: 'doubao', name: '豆包', provider: '字节', description: '字节跳动模型' },
];

// Available knowledge bases
const availableKnowledgeBases = [
  { id: 'kb-1', name: '产品知识库', description: '产品文档和FAQ', items: 1250 },
  { id: 'kb-2', name: '行业知识库', description: '行业资讯和趋势', items: 3680 },
  { id: 'kb-3', name: '客户案例库', description: '成功案例集合', items: 890 },
  { id: 'kb-4', name: '营销素材库', description: '营销内容和模板', items: 2100 },
  { id: 'kb-5', name: '技术文档库', description: '技术文档和API', items: 1540 },
];

// Available channels (matching CustomerDataPlatform)
const availableChannels = [
  { id: 'wechat', name: '微信', icon: '💬', color: '#07c160', description: '微信公众号和服务号' },
  { id: 'work-wechat', name: '企业微信', icon: '🏢', color: '#2e7cf6', description: '企业微信客户联系' },
  { id: 'xiaohongshu', name: '小红书', icon: '📕', color: '#ff2442', description: '小红书种草营销' },
  { id: 'douyin', name: '抖音', icon: '🎵', color: '#000000', description: '抖音短视频营销' },
  { id: 'website', name: '官网', icon: '🌐', color: '#6366f1', description: '企业官方网站' },
  { id: 'app', name: 'APP', icon: '📱', color: '#10b981', description: '移动应用程序' },
];

// Define node types for the Agent workflow
const nodeTypes = {
  trigger: 'Trigger',
  action: 'Action',
  condition: 'Condition',
  output: 'Output',
};

// Initial nodes for the canvas
const initialNodes: Node[] = [
  {
    id: '1',
    type: 'input',
    data: { label: '🚀 Start Trigger' },
    position: { x: 250, y: 50 },
    style: { background: '#6366f1', color: 'white', padding: '10px 20px', borderRadius: '8px' },
  },
];

const initialEdges: Edge[] = [];

// Component library for the left sidebar
const componentLibrary = [
  { id: 'trigger', label: 'Trigger', icon: Zap, description: '触发器节点', color: '#6366f1' },
  { id: 'data-source', label: 'Data Source', icon: Database, description: '数据源节点', color: '#10b981' },
  { id: 'llm', label: 'LLM', icon: MessageSquare, description: '大语言模型', color: '#f59e0b' },
  { id: 'tool', label: 'Tool', icon: Settings, description: '工具节点', color: '#8b5cf6' },
  { id: 'output', label: 'Output', icon: FileText, description: '输出节点', color: '#ec4899' },
];

let nodeId = 2;

export function CreateAgentPage() {
  const navigate = useNavigate();
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  
  // Agent configuration state
  const [agentName, setAgentName] = useState('');
  const [selectedModels, setSelectedModels] = useState<string[]>(['gpt-4']);
  const [selectedKnowledgeBases, setSelectedKnowledgeBases] = useState<string[]>([]);
  const [selectedChannels, setSelectedChannels] = useState<string[]>([]);

  // Toggle functions for multi-select
  const toggleModel = (modelId: string) => {
    setSelectedModels(prev => 
      prev.includes(modelId) 
        ? prev.filter(id => id !== modelId)
        : [...prev, modelId]
    );
  };

  const toggleKnowledgeBase = (kbId: string) => {
    setSelectedKnowledgeBases(prev => 
      prev.includes(kbId) 
        ? prev.filter(id => id !== kbId)
        : [...prev, kbId]
    );
  };

  const toggleChannel = (channelId: string) => {
    setSelectedChannels(prev => 
      prev.includes(channelId) 
        ? prev.filter(id => id !== channelId)
        : [...prev, channelId]
    );
  };

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');
      const label = event.dataTransfer.getData('application/label');
      const color = event.dataTransfer.getData('application/color');

      if (!type) {
        return;
      }

      const reactFlowBounds = event.currentTarget.getBoundingClientRect();
      const position = {
        x: event.clientX - reactFlowBounds.left - 75,
        y: event.clientY - reactFlowBounds.top - 25,
      };

      const newNode: Node = {
        id: `node-${nodeId++}`,
        type: 'default',
        position,
        data: { label: label },
        style: { background: color, color: 'white', padding: '10px 20px', borderRadius: '8px' },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [setNodes]
  );

  const onDragStart = (event: React.DragEvent, nodeType: string, label: string, color: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.setData('application/label', label);
    event.dataTransfer.setData('application/color', color);
    event.dataTransfer.effectAllowed = 'move';
  };

  const onNodeClick = useCallback((_event: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
  }, []);

  const handleSave = () => {
    const agentConfig = {
      name: agentName,
      models: selectedModels,
      knowledgeBases: selectedKnowledgeBases,
      channels: selectedChannels,
      workflow: { nodes, edges }
    };
    console.log('Saving agent configuration:', agentConfig);
    // TODO: Save agent configuration to backend
    navigate('/');
  };

  const handleRun = () => {
    const agentConfig = {
      name: agentName,
      models: selectedModels,
      knowledgeBases: selectedKnowledgeBases,
      channels: selectedChannels,
      workflow: { nodes, edges }
    };
    console.log('Running agent with configuration:', agentConfig);
    // TODO: Execute workflow with selected models, knowledge bases and channels
  };

  return (
    <div className="h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b px-4 py-3 flex items-center justify-between bg-background z-10">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/">
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-lg">创建 Agent 工作流</h1>
            <p className="text-xs text-muted-foreground">通过拖拽组件构建您的 AI Agent</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleRun}>
            <Play className="mr-2 w-4 h-4" />
            测试运行
          </Button>
          <Button onClick={handleSave}>
            <Save className="mr-2 w-4 h-4" />
            保存
          </Button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Component Library */}
        <aside className="w-64 border-r bg-muted/30 p-4 overflow-y-auto">
          <h2 className="text-sm mb-4">组件库</h2>
          <div className="space-y-2">
            {componentLibrary.map((component) => (
              <Card
                key={component.id}
                className="p-3 cursor-move hover:shadow-md transition-shadow"
                draggable
                onDragStart={(e) => onDragStart(e, component.id, component.label, component.color)}
              >
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded" style={{ backgroundColor: component.color + '20' }}>
                    <component.icon className="w-4 h-4" style={{ color: component.color }} />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm">{component.label}</div>
                    <div className="text-xs text-muted-foreground">{component.description}</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </aside>

        {/* Main Canvas */}
        <div className="flex-1 relative">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onNodeClick={onNodeClick}
            fitView
            attributionPosition="bottom-left"
          >
            <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
            <Controls />
            <MiniMap />
            <Panel position="top-right" className="bg-background/80 backdrop-blur-sm p-2 rounded-md border">
              <div className="text-xs text-muted-foreground">
                节点数: {nodes.length} | 连接数: {edges.length}
              </div>
            </Panel>
          </ReactFlow>
        </div>

        {/* Right Sidebar - Agent Configuration */}
        <aside className="w-96 border-l bg-background p-4 overflow-y-auto">
          <div className="space-y-6">
            {/* Configuration Summary */}
            <Card className="bg-primary/5 border-primary/20">
              <div className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Wand2 className="w-5 h-5 text-primary" />
                  <h2 className="font-medium">配置概览</h2>
                </div>
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="bg-background rounded-lg p-2">
                    <div className="text-xl font-semibold text-primary">{selectedModels.length}</div>
                    <div className="text-xs text-muted-foreground">模型</div>
                  </div>
                  <div className="bg-background rounded-lg p-2">
                    <div className="text-xl font-semibold text-primary">{selectedKnowledgeBases.length}</div>
                    <div className="text-xs text-muted-foreground">知识库</div>
                  </div>
                  <div className="bg-background rounded-lg p-2">
                    <div className="text-xl font-semibold text-primary">{selectedChannels.length}</div>
                    <div className="text-xs text-muted-foreground">渠道</div>
                  </div>
                </div>
              </div>
            </Card>

            <Separator />

            {/* Agent Name */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <h2 className="text-sm font-medium">基础信息</h2>
              </div>
              <div>
                <Label htmlFor="agent-name" className="text-xs">Agent 名称</Label>
                <Input 
                  id="agent-name"
                  placeholder="输入 Agent 名称" 
                  value={agentName}
                  onChange={(e) => setAgentName(e.target.value)}
                  className="mt-1.5"
                />
              </div>
            </div>

            <Separator />

            {/* AI Models Selection */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Brain className="w-4 h-4 text-primary" />
                <h3 className="text-sm">AI 模型</h3>
                <span className="text-xs text-muted-foreground">({selectedModels.length} 已选)</span>
              </div>
              <div className="space-y-2">
                {availableModels.map((model) => (
                  <Card key={model.id} className="p-3">
                    <div className="flex items-start gap-3">
                      <Checkbox 
                        id={`model-${model.id}`}
                        checked={selectedModels.includes(model.id)}
                        onCheckedChange={() => toggleModel(model.id)}
                        className="mt-0.5"
                      />
                      <div className="flex-1">
                        <label 
                          htmlFor={`model-${model.id}`}
                          className="text-sm cursor-pointer"
                        >
                          {model.name}
                        </label>
                        <div className="text-xs text-muted-foreground mt-0.5">
                          {model.provider} · {model.description}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            <Separator />

            {/* Knowledge Bases Selection */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <BookOpen className="w-4 h-4 text-primary" />
                <h3 className="text-sm">知识库</h3>
                <span className="text-xs text-muted-foreground">({selectedKnowledgeBases.length} 已选)</span>
              </div>
              <div className="space-y-2">
                {availableKnowledgeBases.map((kb) => (
                  <Card key={kb.id} className="p-3">
                    <div className="flex items-start gap-3">
                      <Checkbox 
                        id={`kb-${kb.id}`}
                        checked={selectedKnowledgeBases.includes(kb.id)}
                        onCheckedChange={() => toggleKnowledgeBase(kb.id)}
                        className="mt-0.5"
                      />
                      <div className="flex-1">
                        <label 
                          htmlFor={`kb-${kb.id}`}
                          className="text-sm cursor-pointer"
                        >
                          {kb.name}
                        </label>
                        <div className="text-xs text-muted-foreground mt-0.5">
                          {kb.description} · {kb.items.toLocaleString()} 条目
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            <Separator />

            {/* Channels Selection */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <MessageSquare className="w-4 h-4 text-primary" />
                <h3 className="text-sm">接入渠道</h3>
                <span className="text-xs text-muted-foreground">({selectedChannels.length} 已选)</span>
              </div>
              <div className="space-y-2">
                {availableChannels.map((channel) => (
                  <Card key={channel.id} className="p-3">
                    <div className="flex items-start gap-3">
                      <Checkbox 
                        id={`channel-${channel.id}`}
                        checked={selectedChannels.includes(channel.id)}
                        onCheckedChange={() => toggleChannel(channel.id)}
                        className="mt-0.5"
                      />
                      <div className="flex-1">
                        <label 
                          htmlFor={`channel-${channel.id}`}
                          className="text-sm cursor-pointer flex items-center gap-2"
                        >
                          <span>{channel.icon}</span>
                          <span>{channel.name}</span>
                        </label>
                        <div className="text-xs text-muted-foreground mt-0.5">
                          {channel.description}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {selectedNode && (
              <>
                <Separator />
                {/* Node Properties */}
                <div>
                  <h3 className="text-sm mb-3">选中节点</h3>
                  <Card className="p-3">
                    <div className="space-y-3 text-sm">
                      <div>
                        <label className="text-xs text-muted-foreground">节点 ID</label>
                        <div className="mt-1">{selectedNode.id}</div>
                      </div>
                      <div>
                        <label className="text-xs text-muted-foreground">节点类型</label>
                        <div className="mt-1">{selectedNode.type || 'default'}</div>
                      </div>
                      <div>
                        <label className="text-xs text-muted-foreground">标签</label>
                        <div className="mt-1">{selectedNode.data.label}</div>
                      </div>
                      <div>
                        <label className="text-xs text-muted-foreground">位置</label>
                        <div className="mt-1">
                          X: {Math.round(selectedNode.position.x)}, Y: {Math.round(selectedNode.position.y)}
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              </>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}