import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Search, 
  Send, 
  Image, 
  Paperclip, 
  MoreVertical,
  Check,
  CheckCheck,
  Smile,
  Filter,
  Star
} from 'lucide-react';
import { Message, Conversation } from '../../types/message';
import FileUpload from '../../components/messages/FileUpload';
import { useWebSocket } from '../../hooks/useWebSocket';

// Mock data for daycare provider
const mockConversations: Conversation[] = [
  {
    id: '1',
    participantId: 'parent1',
    participantName: 'John Doe',
    participantRole: 'parent',
    lastMessage: 'Thank you for the update about Emma...',
    lastMessageTime: '2024-03-15T10:30:00Z',
    unreadCount: 2,
    status: 'active',
    childName: 'Emma Doe'
  },
  {
    id: '2',
    participantId: 'parent2',
    participantName: 'Sarah Smith',
    participantRole: 'parent',
    lastMessage: 'What time is the parent meeting?',
    lastMessageTime: '2024-03-14T15:45:00Z',
    unreadCount: 0,
    status: 'active',
    childName: 'Lucas Smith'
  }
];

const mockMessages: Record<string, Message[]> = {
  '1': [
    {
      id: 'm1',
      senderId: 'parent1',
      senderName: 'John Doe',
      recipientId: 'provider1',
      content: 'How was Emma today?',
      timestamp: '2024-03-15T10:30:00Z',
      read: true
    },
    {
      id: 'm2',
      senderId: 'provider1',
      senderName: 'Me',
      recipientId: 'parent1',
      content: 'Emma had a great day! She participated in all activities and ate well during lunch.',
      timestamp: '2024-03-15T10:35:00Z',
      read: true
    }
  ]
};

const DaycareMessagesPage: React.FC = () => {
  const { user } = useAuth();
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [conversations, setConversations] = useState(mockConversations);
  const [messages, setMessages] = useState(mockMessages);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'unread' | 'starred'>('all');
  const [showFileUpload, setShowFileUpload] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Filter conversations based on search term and status
  const filteredConversations = conversations.filter(conv => {
    const matchesSearch = conv.participantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         conv.childName?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' ||
                         (filterStatus === 'unread' && conv.unreadCount > 0);
    return matchesSearch && matchesFilter;
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, selectedConversation]);

  // WebSocket handlers
  const handleNewMessage = useCallback((message: Message) => {
    if (message.recipientId === user?.id) {
      setMessages(prev => ({
        ...prev,
        [message.senderId]: [...(prev[message.senderId] || []), message]
      }));

      setConversations(prev =>
        prev.map(conv =>
          conv.participantId === message.senderId
            ? {
                ...conv,
                lastMessage: message.content,
                lastMessageTime: message.timestamp,
                unreadCount: conv.unreadCount + 1
              }
            : conv
        )
      );
    }
  }, [user?.id]);

  // Initialize WebSocket
  const { sendMessage } = useWebSocket(
    ['new_message', 'message_read'],
    {
      new_message: handleNewMessage,
    }
  );

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedConversation) return;

    const newMsg: Message = {
      id: `m${Date.now()}`,
      senderId: user?.id || '',
      senderName: 'Me',
      recipientId: selectedConversation,
      content: newMessage,
      timestamp: new Date().toISOString(),
      read: true
    };

    sendMessage('new_message', newMsg);

    setMessages(prev => ({
      ...prev,
      [selectedConversation]: [...(prev[selectedConversation] || []), newMsg]
    }));

    setConversations(prev =>
      prev.map(conv =>
        conv.id === selectedConversation
          ? {
              ...conv,
              lastMessage: newMessage,
              lastMessageTime: new Date().toISOString()
            }
          : conv
      )
    );

    setNewMessage('');
  };

  const handleFileSelect = async (files: File[]) => {
    // Handle file upload logic
    setShowFileUpload(false);
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex bg-gray-50">
      {/* Conversations List */}
      <div className="w-1/3 bg-white border-r flex flex-col">
        <div className="p-4 border-b">
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-3 py-1 rounded-full text-sm ${
                filterStatus === 'all'
                  ? 'bg-indigo-100 text-indigo-800'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilterStatus('unread')}
              className={`px-3 py-1 rounded-full text-sm ${
                filterStatus === 'unread'
                  ? 'bg-indigo-100 text-indigo-800'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              Unread
            </button>
          </div>
        </div>

        {/* Conversations */}
        <div className="flex-1 overflow-y-auto">
          {filteredConversations.map(conversation => (
            <button
              key={conversation.id}
              onClick={() => setSelectedConversation(conversation.id)}
              className={`w-full p-4 border-b hover:bg-gray-50 flex items-start ${
                selectedConversation === conversation.id ? 'bg-indigo-50' : ''
              }`}
            >
              <div className="flex-1">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-sm font-semibold text-gray-900">
                    {conversation.participantName}
                  </h3>
                  <span className="text-xs text-gray-500">
                    {new Date(conversation.lastMessageTime).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-xs text-indigo-600 mt-1">
                  Child: {conversation.childName}
                </p>
                <p className="mt-1 text-sm text-gray-600 truncate">
                  {conversation.lastMessage}
                </p>
                {conversation.unreadCount > 0 && (
                  <span className="mt-1 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                    {conversation.unreadCount} new
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 flex flex-col bg-white">
        {selectedConversation ? (
          <>
            {/* Messages Header */}
            <div className="p-4 border-b bg-white flex items-center justify-between">
              <div>
                <h2 className="font-semibold text-gray-900">
                  {conversations.find(c => c.id === selectedConversation)?.participantName}
                </h2>
                <p className="text-sm text-indigo-600">
                  Child: {conversations.find(c => c.id === selectedConversation)?.childName}
                </p>
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <MoreVertical size={20} />
              </button>
            </div>

            {/* Messages List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages[selectedConversation]?.map(message => (
                <div
                  key={message.id}
                  className={`flex ${message.senderId === user?.id ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[70%] rounded-lg p-3 ${
                      message.senderId === user?.id
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <div className="mt-1 flex items-center justify-end space-x-2">
                      <span className="text-xs opacity-75">
                        {new Date(message.timestamp).toLocaleTimeString()}
                      </span>
                      {message.senderId === user?.id && (
                        <span className="text-xs opacity-75">
                          {message.read ? <CheckCheck size={16} /> : <Check size={16} />}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <form onSubmit={handleSendMessage} className="p-4 bg-white border-t">
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setShowFileUpload(true)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <Image size={20} />
                </button>
                <button
                  type="button"
                  onClick={() => setShowFileUpload(true)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <Paperclip size={20} />
                </button>
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  type="submit"
                  disabled={!newMessage.trim()}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50"
                >
                  <Send size={20} />
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Select a conversation to start messaging
          </div>
        )}
      </div>

      {showFileUpload && (
        <FileUpload
          onFileSelect={handleFileSelect}
          onCancel={() => setShowFileUpload(false)}
        />
      )}
    </div>
  );
};

export default DaycareMessagesPage; 