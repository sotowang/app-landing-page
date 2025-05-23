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
    download: "下载",
    login: "登录",
    account: "我的账户",
    profile: "个人资料",
    settings: "设置",
    logout: "退出登录"
  },

  // 英文语言切换按钮
  switchLang: "English",
  switchLangUrl: "/en",

  // 主页横幅区域
  hero: {
    title: "MeetingGPT：让 AI 实时响应您的会议音频",
    subtitle: "实时监听会议或视频音频内容，根据预设提示词进行智能响应，助您提升沟通效率",
    cta: "立即开始"
  },

  // 产品描述区域
  productDesc: {
    title: "智能会议助手",
    subtitle: "MeetingGPT 是一款创新的桌面应用，能够实时处理音频内容，为您提供定制化的智能响应。",
    useCases: {
      title: "使用场景",
      items: [
        {
          title: "国际会议",
          desc: "实时翻译会议内容，促进跨语言交流，消除语言障碍。"
        },
        {
          title: "面试准备",
          desc: "模拟面试问答，提升应对能力，增强自信心。"
        },
        {
          title: "内容创作",
          desc: "根据音频内容生成摘要或提炼要点，辅助内容创作和整理。"
        },
        {
          title: "语言学习",
          desc: "通过实时翻译和转录，辅助语言学习和练习，提高语言技能。"
        }
      ]
    },
    benefits: {
      title: "主要功能",
      subtitle: "MeetingGPT 提供多种强大功能，满足您的各种需求：",
      items: [
        "自定义 Prompt 响应",
        "指定声道监听",
        "实时音频处理",
        "多语言支持"
      ],
      demo: "了解更多示例：",
      demoLink: "meetinggpt.demo.com"
    }
  },

  // 功能区域
  features: {
    title: "核心功能",
    subtitle: "为提升会议效率和跨语言沟通设计",
    items: [
      {
        title: "自定义 Prompt 响应",
        desc: "根据您的设定，将音频内容翻译成指定语言、生成会议摘要，或模拟特定角色进行对话"
      },
      {
        title: "指定声道监听",
        desc: "支持选择性监听特定音频声道，例如仅监听会议中其他参与者的声音，避免自身声音干扰"
      },
      {
        title: "数据隐私与安全",
        desc: "所有音频处理均在本地完成，确保您的数据不会被上传或泄露"
      }
    ]
  },

  // 价格区域
  pricing: {
    title: "选择适合您的套餐",
    subtitle: "我们提供灵活的价格选项，以满足您的需求和预算",
    monthly: "月付",
    yearly: "年付",
    plans: {
      free: {
        name: "免费版",
        desc: "适合尝试使用",
        price: "$0",
        period: "/月",
        features: [
          "免费30分钟使用",
          "支持prompt设置",
          "声道选择"
        ],
        notIncluded: [
          "无文件导出功能"
        ],
        cta: "免费下载"
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
    title: "下载 MeetingGPT 应用",
    subtitle: "立即体验智能会议助手，适用于 Windows 和 macOS 系统",
    windows: "下载 Windows 版本",
    macos: "下载 macOS 版本",
    linux: "下载 Linux 版本",
    payment: "开启智能会议助手的新体验，提升您的沟通效率"
  },

  // 页脚
  footer: {
    copyright: "© 2025 MeetingGPT. 保留所有权利.",
    paymentBy: "安全支付由",
    paddle: "Paddle",
    providedBy: "提供",
    links: "链接",
    legal: "法律",
    contact: "联系我们",
    email: "电子邮件: support@meetinggpt.com",
    phone: "电话: +1 (555) 123-4567"
  },

  // 认证相关
  auth: {
    login: {
      title: "登录",
      email: "邮箱",
      password: "密码",
      submit: "登录",
      forgotPassword: "忘记密码？",
      noAccount: "还没有账号？",
      register: "立即注册",
      success: "登录成功",
      error: "登录失败",
      emailRequired: "请输入邮箱",
      emailInvalid: "请输入有效的邮箱",
      passwordRequired: "请输入密码"
    },
    register: {
      title: "注册",
      email: "邮箱",
      password: "密码",
      confirmPassword: "确认密码",
      verificationCode: "验证码",
      getCode: "获取验证码",
      submit: "注册",
      hasAccount: "已有账号？",
      login: "立即登录",
      success: "注册成功",
      error: "注册失败",
      emailRequired: "请输入邮箱",
      emailInvalid: "请输入有效的邮箱",
      passwordRequired: "请输入密码",
      passwordMismatch: "两次输入的密码不一致",
      codeRequired: "请输入验证码",
      codeSent: "验证码已发送",
      codeSendError: "验证码发送失败"
    },
    resetPassword: {
      title: "重置密码",
      email: "邮箱",
      newPassword: "新密码",
      confirmPassword: "确认密码",
      verificationCode: "验证码",
      getCode: "获取验证码",
      submit: "重置密码",
      backToLogin: "返回登录",
      success: "密码重置成功",
      error: "密码重置失败",
      emailRequired: "请输入邮箱",
      emailInvalid: "请输入有效的邮箱",
      passwordRequired: "请输入新密码",
      passwordMismatch: "两次输入的密码不一致",
      codeRequired: "请输入验证码",
      codeSent: "验证码已发送",
      codeSendError: "验证码发送失败"
    }
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
    download: "Download",
    login: "Login",
    account: "My Account",
    profile: "Profile",
    settings: "Settings",
    logout: "Logout"
  },

  // 中文语言切换按钮
  switchLang: "中文",
  switchLangUrl: "/zh",

  // 主页横幅区域
  hero: {
    title: "MeetingGPT: Real-time AI Responses to Your Meeting Audio",
    subtitle: "Listen to your meetings or video audio in real-time and get intelligent responses based on your custom prompts",
    cta: "Get Started"
  },

  // 产品描述区域
  productDesc: {
    title: "Intelligent Meeting Assistant",
    subtitle: "MeetingGPT is an innovative desktop application that processes audio content in real-time, providing customized intelligent responses.",
    useCases: {
      title: "Use Cases",
      items: [
        {
          title: "International Meetings",
          desc: "Real-time translation of meeting content, facilitating cross-language communication and eliminating language barriers."
        },
        {
          title: "Interview Preparation",
          desc: "Simulate interview Q&A, improve response capabilities, and boost confidence."
        },
        {
          title: "Content Creation",
          desc: "Generate summaries or extract key points from audio content to assist with content creation and organization."
        },
        {
          title: "Language Learning",
          desc: "Facilitate language learning and practice through real-time translation and transcription, improving language skills."
        }
      ]
    },
    benefits: {
      title: "Key Features",
      subtitle: "MeetingGPT offers powerful features to meet your various needs:",
      items: [
        "Custom Prompt Responses",
        "Selective Audio Channel Monitoring",
        "Real-time Audio Processing",
        "Multi-language Support"
      ],
      demo: "Learn more examples:",
      demoLink: "meetinggpt.demo.com"
    }
  },

  // 功能区域
  features: {
    title: "Core Features",
    subtitle: "Designed to enhance meeting efficiency and cross-language communication",
    items: [
      {
        title: "Custom Prompt Responses",
        desc: "Based on your settings, translate audio content into specified languages, generate meeting summaries, or simulate specific roles for dialogue"
      },
      {
        title: "Selective Audio Channel Monitoring",
        desc: "Support for selectively monitoring specific audio channels, such as only listening to other participants in meetings, avoiding interference from your own voice"
      },
      {
        title: "Data Privacy & Security",
        desc: "All audio processing is completed locally, ensuring your data is not uploaded or leaked"
      }
    ]
  },

  // 价格区域
  pricing: {
    title: "Choose Your Plan",
    subtitle: "We offer flexible pricing options to fit your needs and budget",
    monthly: "Monthly",
    yearly: "Yearly",
    plans: {
      free: {
        name: "Free",
        desc: "For trying it out",
        price: "$0",
        period: "/month",
        features: [
          "Free 30 minutes usage",
          "Custom prompt settings",
          "Audio channel selection"
        ],
        notIncluded: [
          "No file exports"
        ],
        cta: "Download Free"
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
    title: "Download MeetingGPT App",
    subtitle: "Experience the intelligent meeting assistant now, available for Windows and macOS",
    windows: "Download for Windows",
    macos: "Download for macOS",
    linux: "Download for Linux",
    payment: "Start a new experience with our intelligent meeting assistant and enhance your communication efficiency"
  },

  // 页脚
  footer: {
    copyright: "© 2025 MeetingGPT. All rights reserved.",
    paymentBy: "Secure payments by",
    paddle: "Paddle",
    providedBy: "",
    links: "Links",
    legal: "Legal",
    contact: "Contact Us",
    email: "Email: support@meetinggpt.com",
    phone: "Phone: +1 (555) 123-4567"
  },

  // 认证相关
  auth: {
    login: {
      title: "Login",
      email: "Email",
      password: "Password",
      submit: "Login",
      forgotPassword: "Forgot password?",
      noAccount: "Don't have an account?",
      register: "Register now",
      success: "Login successful",
      error: "Login failed",
      emailRequired: "Email is required",
      emailInvalid: "Please enter a valid email",
      passwordRequired: "Password is required"
    },
    register: {
      title: "Register",
      email: "Email",
      password: "Password",
      confirmPassword: "Confirm Password",
      verificationCode: "Verification Code",
      getCode: "Get Code",
      submit: "Register",
      hasAccount: "Already have an account?",
      login: "Login now",
      success: "Registration successful",
      error: "Registration failed",
      emailRequired: "Email is required",
      emailInvalid: "Please enter a valid email",
      passwordRequired: "Password is required",
      passwordMismatch: "Passwords do not match",
      codeRequired: "Verification code is required",
      codeSent: "Verification code sent",
      codeSendError: "Failed to send verification code"
    },
    resetPassword: {
      title: "Reset Password",
      email: "Email",
      newPassword: "New Password",
      confirmPassword: "Confirm Password",
      verificationCode: "Verification Code",
      getCode: "Get Code",
      submit: "Reset Password",
      backToLogin: "Back to login",
      success: "Password reset successful",
      error: "Password reset failed",
      emailRequired: "Email is required",
      emailInvalid: "Please enter a valid email",
      passwordRequired: "New password is required",
      passwordMismatch: "Passwords do not match",
      codeRequired: "Verification code is required",
      codeSent: "Verification code sent",
      codeSendError: "Failed to send verification code"
    }
  }
};