import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X, Bot, User, Minimize2, Maximize2, RotateCcw } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

interface AIChatProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function AIChat({ isOpen, onToggle }: AIChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content:
        'Xin chào! Tôi là AI Assistant của hệ thống quản lý nhà máy. Tôi có thể giúp bạn:\n\n• Kiểm tra trạng thái thiết bị\n• Lên lịch bảo trì\n• Quản lý kho hàng\n• Tạo báo cáo\n• Hướng dẫn sử dụng hệ thống\n\nBạn cần hỗ trợ gì?',
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      inputRef.current?.focus();
    }
  }, [isOpen, isMinimized]);

  const getAIResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();

    // Kiểm tra trạng thái thiết bị
    if (message.includes('thiết bị') || message.includes('máy') || message.includes('trạng thái')) {
      return `📊 **Trạng thái thiết bị hiện tại:**

🟢 **Hoạt động bình thường (3/4):**
• Hydraulic Press A1 - Đang hoạt động
• CNC Machine M4 - Đang hoạt động  
• Conveyor Belt B2 - Đang bảo trì

🔴 **Cần chú ý (1/4):**
• Welding Robot R3 - Hỏng hóc

💡 **Khuyến nghị:** Nên kiểm tra Robot hàn R3 và lên lịch sửa chữa ngay.`;
    }

    // Bảo trì
    if (
      message.includes('bảo trì') ||
      message.includes('maintenance') ||
      message.includes('sửa chữa')
    ) {
      return `🔧 **Lịch bảo trì sắp tới:**

📅 **Tuần này:**
• 15/01 - Hydraulic Press A1 (Bảo trì định kỳ)
• 17/01 - Conveyor Belt B2 (Sửa chữa motor)

⚠️ **Cần ưu tiên:**
• Welding Robot R3 - Cần sửa chữa khẩn cấp
• Air Filter - Sắp hết hạn thay thế

📋 **Để lên lịch bảo trì mới, vào mục "Maintenance" và nhấn "Schedule Maintenance".**`;
    }

    // Kho hàng
    if (message.includes('kho') || message.includes('inventory') || message.includes('tồn kho')) {
      return `📦 **Tình trạng kho hàng:**

⚠️ **Cần đặt hàng (2 mặt hàng):**
• Gasket Seal - Còn 8/10 (Tối thiểu)
• Air Filter - Còn 3/8 (Dưới mức tối thiểu)

✅ **Đủ hàng:**
• Hydraulic Oil - 45 lít
• Ball Bearing Set - 15 bộ
• 3HP Electric Motor - 2 chiếc

💰 **Tổng giá trị kho:** $12.5K

🛒 **Khuyến nghị:** Đặt hàng ngay Air Filter để tránh thiếu hụt.`;
    }

    // Báo cáo
    if (message.includes('báo cáo') || message.includes('report') || message.includes('thống kê')) {
      return `📈 **Báo cáo tổng quan:**

**Hiệu suất thiết bị:**
• Tỷ lệ hoạt động: 75% (3/4 máy)
• Thời gian ngừng máy: 8.2 giờ (tháng này)
• Chi phí bảo trì: $2,310

**Top vấn đề:**
1. Robot hàn R3 - Hỏng hóc
2. Thiếu Air Filter
3. Motor băng tải cần thay

📊 **Để xem báo cáo chi tiết, vào mục "Reports & Analytics".**`;
    }

    // Hướng dẫn sử dụng
    if (
      message.includes('hướng dẫn') ||
      message.includes('help') ||
      message.includes('cách sử dụng')
    ) {
      return `📚 **Hướng dẫn sử dụng hệ thống:**

**🏠 Dashboard:** Xem tổng quan trạng thái nhà máy
**🔧 Equipment:** Quản lý danh sách thiết bị
**📅 Maintenance:** Lên lịch và theo dõi bảo trì
**📦 Inventory:** Quản lý kho phụ tùng
**🏭 3D Factory:** Xem mô hình 3D nhà máy
**📊 Reports:** Tạo và xuất báo cáo
**👥 Users:** Quản lý người dùng
**⚙️ Settings:** Cài đặt hệ thống

💡 **Mẹo:** Sử dụng thanh tìm kiếm và bộ lọc để tìm thông tin nhanh hơn!`;
    }

    // 3D Factory
    if (message.includes('3d') || message.includes('mô hình') || message.includes('factory')) {
      return `🏭 **Hướng dẫn sử dụng 3D Factory:**

**🎮 Điều khiển:**
• Kéo chuột để xoay góc nhìn
• Cuộn chuột để zoom in/out
• Click thiết bị để xem chi tiết

**📹 Camera:**
• Click biểu tượng camera để xem live stream
• 5 camera giám sát toàn nhà máy
• Điều khiển PTZ từ xa

**🎨 Màu sắc thiết bị:**
• 🟢 Xanh lá: Hoạt động bình thường
• 🟠 Cam: Đang bảo trì
• 🔴 Đỏ: Hỏng hóc
• ⚫ Xám: Tắt máy

**✨ Tính năng:** Play/Pause animation, chế độ xem Top/Side`;
    }

    // Câu hỏi về an toàn
    if (
      message.includes('an toàn') ||
      message.includes('safety') ||
      message.includes('nguy hiểm')
    ) {
      return `⚠️ **Hướng dẫn an toàn nhà máy:**

**🚨 Quy tắc cơ bản:**
• Luôn đeo đồ bảo hộ khi vào khu vực sản xuất
• Tắt máy trước khi bảo trì
• Báo cáo ngay khi phát hiện sự cố

**📹 Giám sát:**
• 5 camera hoạt động 24/7
• Cảm biến tự động phát hiện sự cố
• Hệ thống cảnh báo tức thời

**🔧 Bảo trì an toàn:**
• Làm theo checklist bảo trì
• Sử dụng đúng công cụ
• Có người giám sát khi cần

**📞 Khẩn cấp:** Liên hệ supervisor hoặc admin ngay lập tức!`;
    }

    // Câu hỏi về hiệu suất
    if (
      message.includes('hiệu suất') ||
      message.includes('performance') ||
      message.includes('năng suất')
    ) {
      return `📊 **Phân tích hiệu suất nhà máy:**

**⚡ Hiệu suất tổng thể: 92.3%**
• Hydraulic Press A1: 98.5%
• CNC Machine M4: 95.0%
• Conveyor Belt B2: 85.2% (đang bảo trì)
• Welding Robot R3: 0% (hỏng hóc)

**📈 Xu hướng:**
• Tăng 5% so với tháng trước
• Giảm thời gian ngừng máy 15%
• Tiết kiệm chi phí bảo trì 8%

**🎯 Mục tiêu:**
• Đạt 95% hiệu suất tổng thể
• Giảm thời gian sửa chữa xuống 4 giờ/tháng

**💡 Khuyến nghị:** Sửa Robot R3 để tăng hiệu suất lên 98%+`;
    }

    // Câu hỏi chung
    if (message.includes('xin chào') || message.includes('hello') || message.includes('hi')) {
      return `👋 Xin chào! Tôi là AI Assistant của hệ thống quản lý nhà máy.

Tôi có thể giúp bạn:
• 📊 Kiểm tra trạng thái thiết bị
• 🔧 Quản lý bảo trì
• 📦 Theo dõi kho hàng  
• 📈 Tạo báo cáo
• 🏭 Hướng dẫn sử dụng 3D Factory
• ⚙️ Cài đặt hệ thống

Bạn muốn hỏi về vấn đề gì?`;
    }

    // Câu trả lời mặc định
    return `🤖 Tôi hiểu bạn đang hỏi về "${userMessage}".

Tôi có thể hỗ trợ bạn về:
• **"thiết bị"** - Kiểm tra trạng thái máy móc
• **"bảo trì"** - Lịch bảo trì và sửa chữa  
• **"kho hàng"** - Tình trạng tồn kho
• **"báo cáo"** - Thống kê và phân tích
• **"3D"** - Hướng dẫn sử dụng mô hình 3D
• **"an toàn"** - Quy tắc an toàn nhà máy
• **"hiệu suất"** - Phân tích năng suất

Hoặc bạn có thể hỏi cụ thể hơn về vấn đề cần hỗ trợ! 😊`;
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(
      () => {
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          type: 'ai',
          content: getAIResponse(inputMessage.trim()),
          timestamp: new Date(),
        };

        setMessages(prev => [...prev, aiResponse]);
        setIsTyping(false);
      },
      1000 + Math.random() * 2000
    );
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: '1',
        type: 'ai',
        content:
          'Xin chào! Tôi là AI Assistant của hệ thống quản lý nhà máy. Tôi có thể giúp bạn:\n\n• Kiểm tra trạng thái thiết bị\n• Lên lịch bảo trì\n• Quản lý kho hàng\n• Tạo báo cáo\n• Hướng dẫn sử dụng hệ thống\n\nBạn cần hỗ trợ gì?',
        timestamp: new Date(),
      },
    ]);
  };

  if (!isOpen) {
    return (
      <button
        onClick={onToggle}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 z-50 group"
      >
        <MessageCircle size={24} />
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
          <Bot size={12} className="text-white" />
        </div>
        <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-black/80 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
          AI Assistant
        </div>
      </button>
    );
  }

  return (
    <div
      className={`fixed bottom-6 right-6 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 transition-all duration-300 ${
        isMinimized ? 'w-80 h-16' : 'w-96 h-[600px]'
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-2xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <Bot size={20} />
          </div>
          <div>
            <h3 className="font-semibold">AI Assistant</h3>
            <p className="text-xs text-blue-100">Factory Management System</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={clearChat}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            title="Clear Chat"
          >
            <RotateCcw size={16} />
          </button>
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            title={isMinimized ? 'Maximize' : 'Minimize'}
          >
            {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
          </button>
          <button
            onClick={onToggle}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            title="Close Chat"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages */}
          <div className="flex-1 p-4 h-[480px] overflow-y-auto space-y-4">
            {messages.map(message => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`flex items-start gap-3 max-w-[85%] ${
                    message.type === 'user' ? 'flex-row-reverse' : 'flex-row'
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.type === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                    }`}
                  >
                    {message.type === 'user' ? <User size={16} /> : <Bot size={16} />}
                  </div>
                  <div
                    className={`rounded-2xl px-4 py-3 ${
                      message.type === 'user'
                        ? 'bg-blue-600 text-white rounded-br-md'
                        : 'bg-gray-100 text-gray-900 rounded-bl-md'
                    }`}
                  >
                    <div className="text-sm whitespace-pre-wrap">{message.content}</div>
                    <div
                      className={`text-xs mt-2 ${
                        message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                      }`}
                    >
                      {message.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white flex items-center justify-center">
                    <Bot size={16} />
                  </div>
                  <div className="bg-gray-100 rounded-2xl rounded-bl-md px-4 py-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: '0.1s' }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: '0.2s' }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center gap-3">
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={e => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Nhập câu hỏi của bạn..."
                className="flex-1 border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
                disabled={isTyping}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isTyping}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 text-white p-3 rounded-xl transition-all duration-200 transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed"
              >
                <Send size={16} />
              </button>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-2 mt-3">
              <button
                onClick={() => setInputMessage('Kiểm tra trạng thái thiết bị')}
                className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full transition-colors"
              >
                📊 Trạng thái thiết bị
              </button>
              <button
                onClick={() => setInputMessage('Lịch bảo trì')}
                className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full transition-colors"
              >
                🔧 Bảo trì
              </button>
              <button
                onClick={() => setInputMessage('Tình trạng kho hàng')}
                className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full transition-colors"
              >
                📦 Kho hàng
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
