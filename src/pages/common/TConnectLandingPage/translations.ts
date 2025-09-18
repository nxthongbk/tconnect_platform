export interface Translation {
  nav: {
    features: string;
    benefits: string;
    testimonials: string;
    pricing: string;
    login: string;
    getStarted: string;
  };
  hero: {
    title: {
      connect: string;
      monitor: string;
      transform: string;
    };
    subtitle: string;
    startTrial: string;
    watchDemo: string;
    stats: {
      devices: string;
      uptime: string;
      countries: string;
      support: string;
    };
  };
  features: {
    title: string;
    subtitle: string;
    items: {
      realtime: {
        title: string;
        description: string;
      };
      security: {
        title: string;
        description: string;
      };
      analytics: {
        title: string;
        description: string;
      };
      connectivity: {
        title: string;
        description: string;
      };
      mobile: {
        title: string;
        description: string;
      };
      cloud: {
        title: string;
        description: string;
      };
    };
  };
  benefits: {
    title: string;
    items: {
      efficiency: {
        title: string;
        description: string;
      };
      security: {
        title: string;
        description: string;
      };
      support: {
        title: string;
        description: string;
      };
    };
    cta: {
      title: string;
      features: string[];
      button: string;
    };
  };
  testimonials: {
    title: string;
    subtitle: string;
    items: {
      name: string;
      role: string;
      content: string;
    }[];
  };
  cta: {
    title: string;
    subtitle: string;
    startTrial: string;
    contactSales: string;
    disclaimer: string;
  };
  footer: {
    description: string;
    product: {
      title: string;
      items: string[];
    };
    company: {
      title: string;
      items: string[];
    };
    support: {
      title: string;
      items: string[];
    };
    copyright: string;
  };
}

export const translations: Record<'en' | 'vi', Translation> = {
  en: {
    nav: {
      features: "Features",
      benefits: "Benefits",
      testimonials: "Testimonials",
      pricing: "Pricing",
      login: "Login",
      getStarted: "Get Started"
    },
    hero: {
      title: {
        connect: "Connect.",
        monitor: "Monitor.",
        transform: "Transform."
      },
      subtitle: "The world's most advanced IoT platform for businesses that demand reliability, security, and scalability at enterprise level.",
      startTrial: "Start Free Trial",
      watchDemo: "Watch Demo",
      stats: {
        devices: "Connected Devices",
        uptime: "Uptime Guarantee",
        countries: "Countries Served",
        support: "Expert Support"
      }
    },
    features: {
      title: "Powerful Features for Modern IoT",
      subtitle: "Everything you need to build, deploy, and manage IoT solutions at scale",
      items: {
        realtime: {
          title: "Real-time Monitoring",
          description: "Monitor all your IoT devices in real-time with instant alerts and notifications."
        },
        security: {
          title: "Enterprise Security",
          description: "Bank-level security with end-to-end encryption and advanced threat protection."
        },
        analytics: {
          title: "Advanced Analytics",
          description: "Powerful analytics and machine learning insights to optimize your operations."
        },
        connectivity: {
          title: "Global Connectivity",
          description: "Connect devices worldwide with our global network infrastructure."
        },
        mobile: {
          title: "Mobile Management",
          description: "Manage your entire IoT ecosystem from anywhere with our mobile apps."
        },
        cloud: {
          title: "Cloud Integration",
          description: "Seamlessly integrate with major cloud platforms and existing systems."
        }
      }
    },
    benefits: {
      title: "Why Leading Companies Choose IoTPlatform",
      items: {
        efficiency: {
          title: "Increase Efficiency by 40%",
          description: "Optimize operations with real-time insights"
        },
        security: {
          title: "Enterprise-Grade Security",
          description: "Protect your data with military-grade encryption"
        },
        support: {
          title: "24/7 Expert Support",
          description: "Get help whenever you need it from IoT specialists"
        }
      },
      cta: {
        title: "Ready to Transform Your Business?",
        features: [
          "Connect unlimited devices",
          "Real-time monitoring & alerts",
          "Advanced analytics dashboard",
          "99.9% uptime SLA",
          "Global infrastructure"
        ],
        button: "Start Your Free Trial"
      }
    },
    testimonials: {
      title: "Trusted by Industry Leaders",
      subtitle: "See what our customers say about their IoTPlatform experience",
      items: [
        {
          name: "Sarah Chen",
          role: "CTO, TechFlow Industries",
          content: "IoTPlatform transformed our manufacturing operations. We've seen 40% improvement in efficiency."
        },
        {
          name: "Michael Rodriguez",
          role: "Operations Manager, SmartCity Solutions",
          content: "The real-time monitoring capabilities are incredible. We can now prevent issues before they happen."
        },
        {
          name: "Emily Johnson",
          role: "IoT Director, GreenEnergy Corp",
          content: "Best IoT platform we've used. The analytics dashboard provides insights we never had before."
        }
      ]
    },
    cta: {
      title: "Ready to Get Started?",
      subtitle: "Join thousands of companies already using IoTPlatform to transform their operations",
      startTrial: "Start Free Trial",
      contactSales: "Contact Sales",
      disclaimer: "No credit card required • 30-day free trial • Cancel anytime"
    },
    footer: {
      description: "The world's most advanced IoT platform for enterprise solutions.",
      product: {
        title: "Product",
        items: ["Features", "Pricing", "API", "Documentation"]
      },
      company: {
        title: "Company",
        items: ["About", "Careers", "Contact", "Blog"]
      },
      support: {
        title: "Support",
        items: ["Help Center", "Status", "Security", "Privacy"]
      },
      copyright: "© 2025 IoTPlatform. All rights reserved."
    }
  },
  vi: {
    nav: {
      features: "Tính năng",
      benefits: "Lợi ích",
      testimonials: "Đánh giá",
      pricing: "Bảng giá",
      login: "Đăng nhập",
      getStarted: "Bắt đầu"
    },
    hero: {
      title: {
        connect: "Kết nối.",
        monitor: "Giám sát.",
        transform: "Chuyển đổi."
      },
      subtitle: "Nền tảng IoT tiên tiến nhất thế giới dành cho các doanh nghiệp đòi hỏi độ tin cậy, bảo mật và khả năng mở rộng ở cấp độ doanh nghiệp.",
      startTrial: "Dùng thử miễn phí",
      watchDemo: "Xem Demo",
      stats: {
        devices: "Thiết bị kết nối",
        uptime: "Đảm bảo hoạt động",
        countries: "Quốc gia phục vụ",
        support: "Hỗ trợ chuyên gia"
      }
    },
    features: {
      title: "Tính năng mạnh mẽ cho IoT hiện đại",
      subtitle: "Mọi thứ bạn cần để xây dựng, triển khai và quản lý các giải pháp IoT quy mô lớn",
      items: {
        realtime: {
          title: "Giám sát thời gian thực",
          description: "Giám sát tất cả thiết bị IoT của bạn theo thời gian thực với cảnh báo và thông báo tức thì."
        },
        security: {
          title: "Bảo mật doanh nghiệp",
          description: "Bảo mật cấp ngân hàng với mã hóa đầu cuối và bảo vệ chống lại các mối đe dọa tiên tiến."
        },
        analytics: {
          title: "Phân tích nâng cao",
          description: "Phân tích mạnh mẽ và thông tin chi tiết từ machine learning để tối ưu hóa hoạt động của bạn."
        },
        connectivity: {
          title: "Kết nối toàn cầu",
          description: "Kết nối thiết bị trên toàn thế giới với cơ sở hạ tầng mạng toàn cầu của chúng tôi."
        },
        mobile: {
          title: "Quản lý di động",
          description: "Quản lý toàn bộ hệ sinh thái IoT của bạn từ bất kỳ đâu với ứng dụng di động của chúng tôi."
        },
        cloud: {
          title: "Tích hợp đám mây",
          description: "Tích hợp liền mạch với các nền tảng đám mây chính và hệ thống hiện có."
        }
      }
    },
    benefits: {
      title: "Tại sao các công ty hàng đầu chọn IoTPlatform",
      items: {
        efficiency: {
          title: "Tăng hiệu quả 40%",
          description: "Tối ưu hóa hoạt động với thông tin chi tiết thời gian thực"
        },
        security: {
          title: "Bảo mật cấp doanh nghiệp",
          description: "Bảo vệ dữ liệu của bạn với mã hóa cấp quân sự"
        },
        support: {
          title: "Hỗ trợ chuyên gia 24/7",
          description: "Nhận trợ giúp bất cứ khi nào bạn cần từ các chuyên gia IoT"
        }
      },
      cta: {
        title: "Sẵn sàng chuyển đổi doanh nghiệp của bạn?",
        features: [
          "Kết nối thiết bị không giới hạn",
          "Giám sát & cảnh báo thời gian thực",
          "Bảng điều khiển phân tích nâng cao",
          "SLA hoạt động 99.9%",
          "Cơ sở hạ tầng toàn cầu"
        ],
        button: "Bắt đầu dùng thử miễn phí"
      }
    },
    testimonials: {
      title: "Được tin tưởng bởi các nhà lãnh đạo ngành",
      subtitle: "Xem khách hàng của chúng tôi nói gì về trải nghiệm IoTPlatform",
      items: [
        {
          name: "Sarah Chen",
          role: "CTO, TechFlow Industries",
          content: "IoTPlatform đã chuyển đổi hoạt động sản xuất của chúng tôi. Chúng tôi đã thấy cải thiện hiệu quả 40%."
        },
        {
          name: "Michael Rodriguez",
          role: "Quản lý vận hành, SmartCity Solutions",
          content: "Khả năng giám sát thời gian thực thật đáng kinh ngạc. Giờ đây chúng tôi có thể ngăn chặn sự cố trước khi chúng xảy ra."
        },
        {
          name: "Emily Johnson",
          role: "Giám đốc IoT, GreenEnergy Corp",
          content: "Nền tảng IoT tốt nhất mà chúng tôi từng sử dụng. Bảng điều khiển phân tích cung cấp thông tin chi tiết mà chúng tôi chưa từng có."
        }
      ]
    },
    cta: {
      title: "Sẵn sàng bắt đầu?",
      subtitle: "Tham gia cùng hàng nghìn công ty đã sử dụng IoTPlatform để chuyển đổi hoạt động của họ",
      startTrial: "Dùng thử miễn phí",
      contactSales: "Liên hệ bán hàng",
      disclaimer: "Không cần thẻ tín dụng • Dùng thử miễn phí 30 ngày • Hủy bất cứ lúc nào"
    },
    footer: {
      description: "Nền tảng IoT tiên tiến nhất thế giới cho các giải pháp doanh nghiệp.",
      product: {
        title: "Sản phẩm",
        items: ["Tính năng", "Bảng giá", "API", "Tài liệu"]
      },
      company: {
        title: "Công ty",
        items: ["Giới thiệu", "Tuyển dụng", "Liên hệ", "Blog"]
      },
      support: {
        title: "Hỗ trợ",
        items: ["Trung tâm trợ giúp", "Trạng thái", "Bảo mật", "Quyền riêng tư"]
      },
      copyright: "© 2025 IoTPlatform. Tất cả quyền được bảo lưu."
    }
  }
};