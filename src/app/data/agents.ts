export type AgentCategory = 'marketing' | 'sales' | 'service';

export type Industry = 
  | 'all' 
  | 'ecommerce' 
  | 'education' 
  | 'finance' 
  | 'saas' 
  | 'realestate' 
  | 'healthcare' 
  | 'manufacturing' 
  | 'general';

export interface Agent {
  id: string;
  name: string;
  nameCN: string;
  category: AgentCategory;
  description: string;
  features: string[];
  useCases: string[];
  tags: string[];
  icon: string;
  industry: Industry[];
}

export const agents: Agent[] = [
  // Marketing Agents
  {
    id: 'content-agent',
    name: 'Content Agent',
    nameCN: '内容 Agent',
    category: 'marketing',
    description: '自动生成公众号文章、小红书种草文、EDM文案',
    features: [
      '结合RAG技术，调用企业产品手册，确保内容准确',
      '结合CDP，针对不同人群生成个性化内容',
      '支持多平台内容格式适配',
      '自动SEO优化'
    ],
    useCases: [
      '公众号文章批量生成',
      '社交媒体内容创作',
      '邮件营销文案撰写',
      '产品说明文档生成'
    ],
    tags: ['内容生成', 'RAG', 'CDP', '个性化', 'SEO'],
    icon: 'FileText',
    industry: ['ecommerce', 'education', 'saas', 'general']
  },
  {
    id: 'campaign-agent',
    name: 'Campaign Agent',
    nameCN: '活动运营 Agent',
    category: 'marketing',
    description: '自动策划裂变活动流程，生成海报文案，监控活动数据',
    features: [
      '自动化活动策划和执行',
      '裂变机制设计与优化',
      '实时数据监控和分析',
      '海报和文案自动生成'
    ],
    useCases: [
      '社交裂变活动策划',
      '用户增长营销',
      '活动效果追踪',
      'A/B测试优化'
    ],
    tags: ['活动运营', '裂变', '数据监控', '营销自动化'],
    icon: 'Megaphone',
    industry: ['ecommerce', 'education', 'finance', 'general']
  },
  {
    id: 'geo-agent',
    name: 'GEO Agent',
    nameCN: 'GEO Agent',
    category: 'marketing',
    description: '针对大模型做搜索优化',
    features: [
      'AI搜索引擎优化',
      '大模型内容适配',
      '语义搜索优化',
      '智能关键词策略'
    ],
    useCases: [
      'AI搜索可见性提升',
      '大模型平台内容优化',
      '智能问答系统优化',
      '语义搜索排名提升'
    ],
    tags: ['GEO', 'AI搜索', '大模型', 'SEO优化'],
    icon: 'Search',
    industry: ['saas', 'general']
  },
  {
    id: 'wechat-agent',
    name: 'WeChat Agent',
    nameCN: '微信 Agent',
    category: 'marketing',
    description: 'AI智能操作微信公众号，自动发文、回复消息、管理粉丝互动',
    features: [
      '智能文章创作与发布',
      '自动回复粉丝消息',
      '菜单自动配置优化',
      '用户标签智能管理',
      '数据分析与报告'
    ],
    useCases: [
      '公众号内容自动发布',
      '粉丝互动自动化',
      '消息智能客服',
      '用户画像分析',
      '营销活动执行'
    ],
    tags: ['微信公众号', '自动发文', '粉丝管理', '智能客服'],
    icon: 'MessageSquare',
    industry: ['ecommerce', 'education', 'finance', 'saas', 'realestate', 'general']
  },
  {
    id: 'wecom-agent',
    name: 'WeCom Agent',
    nameCN: '企业微信 Agent',
    category: 'sales',
    description: '智能管理企业微信客户，自动化客户沟通、标签管理、数据分析',
    features: [
      '客户自动化跟进',
      '智能话术推送',
      '客户标签自动分类',
      '朋友圈内容自动发布',
      '客户数据分析洞察'
    ],
    useCases: [
      '私域客户运营',
      '销售自动化跟进',
      '客户关系管理',
      '营销内容分发',
      '客户生命周期管理'
    ],
    tags: ['企业微信', '私域运营', '客户管理', 'SCRM'],
    icon: 'Briefcase',
    industry: ['ecommerce', 'education', 'finance', 'saas', 'realestate', 'general']
  },
  {
    id: 'xiaohongshu-agent',
    name: 'Xiaohongshu Agent',
    nameCN: '小红书运营 Agent',
    category: 'marketing',
    description: 'AI驱动小红书内容创作，自动生成种草文案、图文排版、数据分析',
    features: [
      'AI生成爆款标题和文案',
      '种草内容智能创作',
      '热点话题自动追踪',
      '数据分析与优化建议',
      '发布时间智能推荐'
    ],
    useCases: [
      '产品种草内容创作',
      '品牌营销推广',
      '达人合作管理',
      '用户互动运营',
      '流量增长优化'
    ],
    tags: ['小红书', '种草', '内容营销', '社交电商'],
    icon: 'BookOpen',
    industry: ['ecommerce', 'education', 'healthcare', 'general']
  },
  {
    id: 'douyin-agent',
    name: 'Douyin Agent',
    nameCN: '抖音运营 Agent',
    category: 'marketing',
    description: 'AI赋能抖音运营，短视频脚本创作、直播策划、流量优化',
    features: [
      '短视频脚本AI生成',
      '直播话术智能策划',
      '热门内容趋势分析',
      '投流策略优化',
      '达人数据监控'
    ],
    useCases: [
      '短视频内容创作',
      '直播带货策划',
      '流量投放优化',
      '用户增长运营',
      '电商转化提升'
    ],
    tags: ['抖音', '短视频', '直播', '流量运营'],
    icon: 'Video',
    industry: ['ecommerce', 'education', 'finance', 'general']
  },

  // Sales Agents
  {
    id: 'sdr-agent',
    name: 'SDR Agent',
    nameCN: 'SDR Agent',
    category: 'sales',
    description: '7x24小时处理入站线索，进行首轮清洗和意向打分，自动预约会议',
    features: [
      '全天候自动化线索处理',
      '智能线索清洗和评分',
      '自动会议预约',
      '多渠道线索整合'
    ],
    useCases: [
      '入站线索自动跟进',
      '线索质量评估',
      '销售日程自动安排',
      '线索分配优化'
    ],
    tags: ['SDR', '线索管理', '自动化', '会议预约'],
    icon: 'Users',
    industry: ['saas', 'finance', 'realestate', 'general']
  },
  {
    id: 'sales-copilot',
    name: 'Sales Copilot',
    nameCN: 'Sales Agent',
    category: 'sales',
    description: '实时辅助人工销售，在通话/聊天中实时推荐话术、产品资料',
    features: [
      '实时对话辅助',
      '智能话术推荐',
      '产品知识库集成',
      '销售流程指导'
    ],
    useCases: [
      '销售通话实时辅助',
      '客户沟通优化',
      '产品介绍标准化',
      '成交率提升'
    ],
    tags: ['Copilot', '实时辅助', '话术推荐', '销售赋能'],
    icon: 'Headphones',
    industry: ['ecommerce', 'saas', 'finance', 'realestate', 'general']
  },
  {
    id: 'email-agent',
    name: 'Email Agent',
    nameCN: '邮件 Agent',
    category: 'sales',
    description: '自动化冷启动邮件序列，根据回复自动跟进',
    features: [
      '邮件序列自动化',
      '智能回复分析',
      '个性化邮件生成',
      '跟进时机优化'
    ],
    useCases: [
      '冷邮件营销',
      '客户开发自动化',
      '邮件触达率优化',
      '潜客培育'
    ],
    tags: ['邮件营销', '自动化', '冷启动', '跟进'],
    icon: 'Mail',
    industry: ['saas', 'finance', 'general']
  },

  // Service & Enablement Agents
  {
    id: 'customer-service',
    name: 'Customer Service Agent',
    nameCN: '售后服务 Agent',
    category: 'service',
    description: '处理常见工单，解答技术问题，自动化退换货流程',
    features: [
      '智能工单处理',
      '技术问题自动解答',
      '退换货流程自动化',
      '多渠道客户支持'
    ],
    useCases: [
      '客户咨询自动应答',
      '工单自动分类和处理',
      '售后流程优化',
      '客户满意度提升'
    ],
    tags: ['客户服务', '工单', '自动化', '售后'],
    icon: 'MessageCircle',
    industry: ['ecommerce', 'saas', 'healthcare', 'manufacturing', 'general']
  },
  {
    id: 'training-agent',
    name: 'Training Agent',
    nameCN: '销售培训 Agent',
    category: 'service',
    description: '扮演陪练角色，模拟刁钻客户，考核销售人员的话术掌握度',
    features: [
      '角色扮演模拟',
      '情景化培训',
      '话术考核评估',
      '个性化培训建议'
    ],
    useCases: [
      '新人销售培训',
      '话术演练',
      '销售技能评估',
      '持续培训赋能'
    ],
    tags: ['培训', '角色扮演', '考核', '销售赋能'],
    icon: 'GraduationCap',
    industry: ['ecommerce', 'education', 'saas', 'finance', 'realestate', 'general']
  },
  {
    id: 'bi-agent',
    name: 'BI Agent',
    nameCN: '智能 BI Agent',
    category: 'service',
    description: '通过自然语言交互，让管理层直接询问数据问题，自动生成报表',
    features: [
      'Text-to-SQL自然语言查询',
      '自动化报表生成',
      '数据可视化',
      '智能数据分析'
    ],
    useCases: [
      '业务数据查询',
      '管理决策支持',
      '自动化报表',
      '数据洞察分析'
    ],
    tags: ['BI', 'Text-to-SQL', '数据分析', '报表'],
    icon: 'BarChart3',
    industry: ['ecommerce', 'finance', 'saas', 'manufacturing', 'general']
  },
  {
    id: 'form-agent',
    name: 'Form Agent',
    nameCN: '表单 Agent',
    category: 'service',
    description: '通过自然语言描述自动创建各类表单，支持逻辑跳转和数据收集',
    features: [
      'AI自动生成表单结构',
      '支持复杂逻辑跳转',
      '多种题型自动识别',
      '数据自动整理分析',
      '表单模板智能推荐'
    ],
    useCases: [
      '问卷调查快速创建',
      '活动报名表单',
      '客户信息收集',
      '满意度调研',
      '数据采集自动化'
    ],
    tags: ['表单生成', 'AI创建', '数据收集', '逻辑跳转'],
    icon: 'ClipboardList',
    industry: ['ecommerce', 'education', 'finance', 'saas', 'healthcare', 'general']
  }
];

export const categoryLabels: Record<AgentCategory, { zh: string; en: string }> = {
  marketing: { zh: '营销获客类', en: 'Marketing Agents' },
  sales: { zh: '销售转化类', en: 'Sales Agents' },
  service: { zh: '服务与赋能类', en: 'Service & Enablement Agents' }
};

export const industryLabels: Record<Industry, string> = {
  all: '全部行业',
  ecommerce: '电商零售',
  education: '教育培训',
  finance: '金融服务',
  saas: '科技/SaaS',
  realestate: '房地产',
  healthcare: '医疗健康',
  manufacturing: '制造业',
  general: '通用'
};