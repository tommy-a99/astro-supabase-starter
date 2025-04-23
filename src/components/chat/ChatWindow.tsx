// src/components/ChatWindow.jsx
import React, { useState, useEffect, useRef } from 'react';

function ChatWindow() {
  const [messages, setMessages] = useState<{text: string, sender: string}[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { text: newMessage, sender: 'user' }]);
      setNewMessage('');
      // 실제 서비스에서는 이 부분에서 서버로 메시지를 전송하는 로직을 구현해야 합니다.
      console.log('메시지 전송:', newMessage);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(event.target.value);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* 채팅 메시지 영역 */}
      <div className="flex-grow p-4 overflow-y-auto">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-2 p-3 rounded-md ${
              message.sender === 'user' ? 'bg-blue-500 text-white self-end' : 'bg-gray-300 text-gray-800 self-start'
            }`}
          >
            {message.text}
          </div>
        ))}
        <div ref={messagesEndRef} /> {/* 스크롤 위치를 최하단으로 유지하기 위한 빈 div */}
      </div>

      {/* 메시지 입력 영역 */}
      <div className="bg-gray-200 p-4">
        <div className="flex items-center">
          <input
            type="text"
            className="flex-grow rounded-l-md py-2 px-3 focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="메시지를 입력하세요..."
            value={newMessage}
            onChange={e => handleInputChange}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                handleSendMessage();
              }
            }}
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r-md focus:outline-none focus:shadow-outline"
            onClick={handleSendMessage}
          >
            전송
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatWindow;