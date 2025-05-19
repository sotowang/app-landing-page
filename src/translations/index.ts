// 多语言翻译系统

// 中文翻译
export const zhTranslations = {
  // 导航菜单
  nav: {
    home: "首页",
    features: "功能特点",
    pricing: "价格方案",
    terms: "服务条款",
    privacy: "隐私政策",
    download: "下载"
  },
  
  // 英文语言切换按钮
  switchLang: "English",
  switchLangUrl: "/en",
  
  // 主页横幅区域
  hero: {
    title: "将您的声音转化为文字",
    subtitle: "以说话的速度写作 — 我们的AI驱动语音识别技术可在任何应用程序中无缝工作",
    cta: "立即开始"
  },
  
  // 产品描述区域
  productDesc: {
    title: "简单易用的语音识别",
    subtitle: "我们先进的语音转文本解决方案帮助您更快工作、更好沟通、更轻松创作内容。",
    useCases: {
      title: "使用场景",
      items: [
        {
          title: "撰写专业电子邮件",
          desc: "口述格式完善的电子邮件。我们的工具自动将您的口述内容结构化为专业通信。"
        },
        {
          title: "即时消息交流",
          desc: "口述您的想法用于聊天对话。无需打字即可发送有深度的回复。"
        },
        {
          title: "记录会议笔记",
          desc: "实时记录想法，保持专注。在会议中将口述思想转化为有条理的笔记。"
        },
        {
          title: "快速创建内容",
          desc: "通过自然说话起草社交帖子、文章或博客。通过将口述想法转换为格式化内容来克服写作障碍。"
        }
      ]
    },
    benefits: {
      title: "主要优势",
      subtitle: "我们的语音转文本解决方案相比传统打字具有诸多优势：",
      items: [
        "速度比打字快3-5倍",
        "适用于任何应用程序",
        "基于上下文的智能格式化",
        "支持多种语言"
      ],
      demo: "体验我们的演示：",
      demoLink: "demo.voicetotext.com"
    }
  },
  
  // 功能区域
  features: {
    title: "核心功能",
    subtitle: "为注重效率和准确性的专业人士设计",
    items: [
      {
        title: "多种转录模式",
        desc: "简洁模式、邮件模式、笔记模式和消息模式适用于不同场景"
      },
      {
        title: "自定义词汇",
        desc: "添加专业术语、名称和行业用语以提高准确性"
      },
      {
        title: "隐私与安全",
        desc: "使用您自己的API密钥实现完全的数据隐私和控制"
      }
    ]
  },
  
  // 价格区域
  pricing: {
    title: "选择适合您的套餐",
    subtitle: "我们提供灵活的价格选项，以满足您的需求和预算",
    plans: {
      free: {
        name: "免费版",
        desc: "适合尝试使用",
        price: "$0",
        period: "/月",
        features: [
          "每月10分钟转录时间",
          "标准转录质量",
          "支持2种语言"
        ],
        notIncluded: [
          "无文件导出功能"
        ],
        cta: "免费开始"
      },
      standard: {
        name: "标准版",
        desc: "适合个人用户",
        price: "$9",
        period: "/月",
        popular: "最受欢迎",
        features: [
          "每月5小时转录时间",
          "高质量转录",
          "支持10种语言",
          "多种格式导出"
        ],
        cta: "立即购买"
      },
      pro: {
        name: "专业版",
        desc: "适合专业团队",
        price: "$29",
        period: "/月",
        features: [
          "无限转录时间",
          "超高质量转录",
          "支持30+种语言",
          "专属API访问权限"
        ],
        cta: "立即购买"
      },
      enterprise: {
        name: "企业版",
        desc: "定制解决方案",
        price: "定制",
        period: " 价格",
        features: [
          "专属API访问与更高调用限制",
          "定制化语音识别模型训练",
          "企业专属词汇库管理",
          "多用户管理与团队协作"
        ],
        cta: "联系我们",
        ctaEmail: "support@superspeech.com?subject=企业版计划咨询"
      }
    },
    guarantee: "所有套餐均提供7天无条件退款保证。如有任何疑问，请",
    contact: "联系我们"
  },
  
  // 下载区域
  download: {
    title: "下载SuperSpeech应用",
    subtitle: "将您的语音转为文本，适用于所有主流操作系统，提高工作效率",
    windows: "下载 Windows 版本",
    macos: "下载 macOS 版本",
    linux: "下载 Linux 版本",
    payment: "支付由 Paddle 安全处理"
  },
  
  // 页脚
  footer: {
    copyright: "© 2023 SuperSpeech科技. 保留所有权利.",
    paymentBy: "安全支付由",
    paddle: "Paddle",
    providedBy: "提供",
    links: "链接",
    legal: "法律",
    contact: "联系我们",
    email: "电子邮件: support@superspeech.com",
    phone: "电话: +1 (555) 123-4567"
  }
};

// 英文翻译
export const enTranslations = {
  // 导航菜单
  nav: {
    home: "Home",
    features: "Features",
    pricing: "Pricing",
    terms: "Terms",
    privacy: "Privacy",
    download: "Download"
  },
  
  // 中文语言切换按钮
  switchLang: "中文",
  switchLangUrl: "/zh",
  
  // 主页横幅区域
  hero: {
    title: "Transform Your Voice Into Text",
    subtitle: "Write at the speed of speech with our AI-powered voice recognition technology that works across any application",
    cta: "Get Started"
  },
  
  // 产品描述区域
  productDesc: {
    title: "Voice Recognition Made Simple",
    subtitle: "Our advanced voice-to-text solution helps you work faster, communicate better, and create content with ease.",
    useCases: {
      title: "Use Cases",
      items: [
        {
          title: "Craft Professional Emails",
          desc: "Dictate polished emails with proper formatting. Our tool automatically structures your spoken words into professional communication."
        },
        {
          title: "Message Colleagues Instantly",
          desc: "Speak your thoughts for chat conversations. Perfect for thoughtful responses without typing lengthy messages."
        },
        {
          title: "Capture Meeting Notes",
          desc: "Record ideas as they happen without breaking your focus. Turn spoken thoughts into organized notes during meetings."
        },
        {
          title: "Create Content Quickly",
          desc: "Draft social posts, articles, or blogs by speaking naturally. Overcome writer's block by converting spoken ideas into formatted content."
        }
      ]
    },
    benefits: {
      title: "Key Benefits",
      subtitle: "Our voice-to-text solution offers numerous advantages over traditional typing:",
      items: [
        "3-5x faster than typing",
        "Works with any application",
        "Smart formatting based on context",
        "Supports multiple languages"
      ],
      demo: "Try our demo:",
      demoLink: "demo.voicetotext.com"
    }
  },
  
  // 功能区域
  features: {
    title: "Key Features",
    subtitle: "Designed for professionals who value efficiency and accuracy",
    items: [
      {
        title: "Multiple Transcription Modes",
        desc: "Simple format, Email mode, Note mode, and Message mode for different contexts"
      },
      {
        title: "Custom Vocabulary",
        desc: "Add specialized terms, names, and jargon for better accuracy"
      },
      {
        title: "Private & Secure",
        desc: "Use your own API key for complete data privacy and control"
      }
    ]
  },
  
  // 价格区域
  pricing: {
    title: "Choose Your Plan",
    subtitle: "We offer flexible pricing options to fit your needs and budget",
    plans: {
      free: {
        name: "Free",
        desc: "For trying it out",
        price: "$0",
        period: "/month",
        features: [
          "10 minutes of transcription per month",
          "Standard quality",
          "2 languages supported"
        ],
        notIncluded: [
          "No file exports"
        ],
        cta: "Start Free"
      },
      standard: {
        name: "Standard",
        desc: "For individual users",
        price: "$9",
        period: "/month",
        popular: "MOST POPULAR",
        features: [
          "5 hours of transcription per month",
          "High quality",
          "10 languages supported",
          "Multiple export formats"
        ],
        cta: "Buy Now"
      },
      pro: {
        name: "Professional",
        desc: "For professional teams",
        price: "$29",
        period: "/month",
        features: [
          "Unlimited transcription time",
          "Premium quality",
          "30+ languages supported",
          "Dedicated API access"
        ],
        cta: "Buy Now"
      },
      enterprise: {
        name: "Enterprise",
        desc: "Custom solutions",
        price: "Custom",
        period: " pricing",
        features: [
          "Dedicated API access with higher limits",
          "Custom speech recognition model training",
          "Enterprise vocabulary management",
          "Multi-user management & team collaboration"
        ],
        cta: "Contact Us",
        ctaEmail: "support@superspeech.com?subject=Enterprise Plan Inquiry"
      }
    },
    guarantee: "All plans come with a 7-day money-back guarantee. If you have any questions, please",
    contact: "contact us"
  },
  
  // 下载区域
  download: {
    title: "Download SuperSpeech App",
    subtitle: "Convert your voice to text across all major operating systems to boost productivity",
    windows: "Download for Windows",
    macos: "Download for macOS",
    linux: "Download for Linux",
    payment: "Payments securely processed by Paddle"
  },
  
  // 页脚
  footer: {
    copyright: "© 2023 SuperSpeech Technologies. All rights reserved.",
    paymentBy: "Secure payments by",
    paddle: "Paddle",
    providedBy: "",
    links: "Links",
    legal: "Legal",
    contact: "Contact Us",
    email: "Email: support@superspeech.com",
    phone: "Phone: +1 (555) 123-4567"
  }
}; 