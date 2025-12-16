import { useState, useRef, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { agents } from '../data/agents';
import { Button } from '../components/ui/button';
import { Textarea } from '../components/ui/textarea';
import { ScrollArea } from '../components/ui/scroll-area';
import { Card } from '../components/ui/card';
import { Separator } from '../components/ui/separator';
import { 
  ArrowLeft, 
  Send, 
  Settings, 
  FileText, 
  History,
  Download,
  Trash2
} from 'lucide-react';
import logoImg from '../../assets/c7019ab930c36b5953f155a225e5dc6b8936e3f5.png';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export function AgentWorkspacePage() {
  const { agentId } = useParams();
  const agent = agents.find((a) => a.id === agentId);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Welcome message
    if (agent && messages.length === 0) {
      setMessages([
        {
          id: 'welcome',
          role: 'assistant',
          content: `你好！我是 ${agent.nameCN}。${agent.description}\n\n我可以帮助你：\n${agent.features.slice(0, 3).map((f, i) => `${i + 1}. ${f}`).join('\n')}\n\n请告诉我你需要什么帮助？`,
          timestamp: new Date()
        }
      ]);
    }
  }, [agent, messages.length]);

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

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `我理解你的需求："${input}"。\n\n作为 ${agent.nameCN}，我会帮助你处理这个请求。基于我的能力，我建议：\n\n1. 分析你的具体需求\n2. 调用相关的知识库和工具\n3. 生成个性化的解决方案\n\n你可以提供更多细节，我会给出更精准的建议。`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const clearChat = () => {
    setMessages([]);
  };

  return (
    <div className="h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" asChild>
            <Link to={`/agent/${agent.id}`}>
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-lg">{agent.nameCN}</h1>
            <p className="text-xs text-muted-foreground">{agent.name}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 border-r bg-muted/30 p-4 space-y-2">
          <h2 className="text-sm mb-4 text-muted-foreground">管理</h2>
          <Button variant="ghost" className="w-full justify-start" size="sm">
            <History className="mr-2 w-4 h-4" />
            历史会话
          </Button>
          <Button variant="ghost" className="w-full justify-start" size="sm">
            <FileText className="mr-2 w-4 h-4" />
            模板库
          </Button>
          <Button variant="ghost" className="w-full justify-start" size="sm">
            <Download className="mr-2 w-4 h-4" />
            导出对话
          </Button>
          <Separator className="my-4" />
          <Button 
            variant="ghost" 
            className="w-full justify-start text-destructive hover:text-destructive" 
            size="sm"
            onClick={clearChat}
          >
            <Trash2 className="mr-2 w-4 h-4" />
            清空对话
          </Button>
        </aside>

        {/* Main Chat Area */}
        <main className="flex-1 flex flex-col">
          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="max-w-3xl mx-auto space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <Card className={`max-w-[80%] p-4 ${message.role === 'user' ? 'bg-primary text-primary-foreground' : ''}`}>
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    <p className={`text-xs mt-2 ${message.role === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                      {message.timestamp.toLocaleTimeString('zh-CN', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                  </Card>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <Card className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                      <div className="w-2 h-2 rounded-full bg-primary animate-pulse delay-100" />
                      <div className="w-2 h-2 rounded-full bg-primary animate-pulse delay-200" />
                    </div>
                  </Card>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Input Area */}
          <div className="border-t p-4">
            <div className="max-w-3xl mx-auto flex gap-2">
              <Textarea
                placeholder={`向 ${agent.nameCN} 提问...`}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                className="min-h-[60px] max-h-[200px]"
                disabled={isLoading}
              />
              <Button 
                onClick={handleSend} 
                disabled={!input.trim() || isLoading}
                size="icon"
                className="h-[60px] w-[60px]"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground text-center mt-2 max-w-3xl mx-auto">
              按 Enter 发送，Shift + Enter 换行
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}