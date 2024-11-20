import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  Search, 
  Send, 
  Image, 
  Paperclip, 
  MoreVertical,
  Check,
  CheckCheck,
  Smile,
  FileIcon
} from 'lucide-react';
import { Message, Conversation, MessageReaction } from '../types/message';
import FileUpload from '../components/messages/FileUpload';
import { useWebSocket } from '../hooks/useWebSocket';

// Mock data
const mockConversations: Conversation[] = [
  {
    id: '1',
    participantId: 'provider1',
    participantName: 'Sunshine Daycare',
    participantRole: 'provider',
    lastMessage: 'Thank you for your inquiry about our program...',
    lastMessageTime: '2024-03-15T10:30:00Z',
    unreadCount: 2,
    daycareName: 'Sunshine Daycare',
    status: 'active'
  },
  {
    id: '2',
    participantId: 'provider2',
    participantName: 'Rainbow Kids Center',
    participantRole: 'provider',
    lastMessage: 'Yes, we have availability for that age group...',
    lastMessageTime: '2024-03-14T15:45:00Z',
    unreadCount: 0,
    daycareName: 'Rainbow Kids Center',
    status: 'active'
  }
];

const mockMessages: Record<string, Message[]> = {
  '1': [
    {
      id: 'm1',
      senderId: 'provider1',
      senderName: 'Sunshine Daycare',
      recipientId: 'user1',
      content: 'Thank you for your inquiry about our program. We would be happy to schedule a tour for you.',
      timestamp: '2024-03-15T10:30:00Z',
      read: true
    },
    {
      id: 'm2',
      senderId: 'user1',
      senderName: 'Me',
      recipientId: 'provider1',
      content: 'That would be great! What times are available next week?',
      timestamp: '2024-03-15T10:35:00Z',
      read: true
    }
  ]
};

const MessagesPage: React.FC = () => {
  const { user } = useAuth();
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [conversations, setConversations] = useState(mockConversations);
  const [messages, setMessages] = useState(mockMessages);
  const [searchTerm, setSearchTerm] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showFileUpload, setShowFileUpload] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, selectedConversation]);

  const handleNewMessage = useCallback((message: Message) => {
    if (message.recipientId === user?.id) {
      // Update messages
      setMessages(prev => ({
        ...prev,
        [message.senderId]: [...(prev[message.senderId] || []), message]
      }));

      // Update conversation last message
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

  const handleMessageRead = useCallback((data: { messageId: string, conversationId: string }) => {
    setMessages(prev => {
      const conversation = prev[data.conversationId];
      if (!conversation) return prev;

      return {
        ...prev,
        [data.conversationId]: conversation.map(msg =>
          msg.id === data.messageId ? { ...msg, read: true } : msg
        )
      };
    });
  }, []);

  const handleReaction = useCallback((data: { 
    messageId: string, 
    conversationId: string,
    reaction: MessageReaction 
  }) => {
    setMessages(prev => {
      const conversation = prev[data.conversationId];
      if (!conversation) return prev;

      return {
        ...prev,
        [data.conversationId]: conversation.map(msg =>
          msg.id === data.messageId
            ? {
                ...msg,
                reactions: [...(msg.reactions || []), data.reaction]
              }
            : msg
        )
      };
    });
  }, []);

  // Initialize WebSocket
  const { sendMessage } = useWebSocket(
    ['new_message', 'message_read', 'message_reaction'],
    {
      new_message: handleNewMessage,
      message_read: handleMessageRead,
      message_reaction: handleReaction
    }
  );

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedConversation) return;

    const newMsg: Message = {
      id: `m${Date.now()}`,
      senderId: 'user1',
      senderName: 'Me',
      recipientId: selectedConversation,
      content: newMessage,
      timestamp: new Date().toISOString(),
      read: true
    };

    // Send message through WebSocket
    sendMessage('new_message', newMsg);

    // Update local state
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

  const filteredConversations = conversations.filter(conv =>
    conv.participantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.daycareName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleFileSelect = async (files: File[]) => {
    if (!selectedConversation) return;

    // In a real app, you would upload these files to your server
    // For now, we'll create mock attachments
    const mockAttachments = files.map(file => ({
      id: `att-${Date.now()}`,
      type: file.type.startsWith('image/') ? 'image' : 'document' as 'image' | 'document',
      url: URL.createObjectURL(file),
      name: file.name
    }));

    const newMsg: Message = {
      id: `m${Date.now()}`,
      senderId: 'user1',
      senderName: 'Me',
      recipientId: selectedConversation,
      content: '',
      timestamp: new Date().toISOString(),
      read: true,
      attachments: mockAttachments
    };

    setMessages(prev => ({
      ...prev,
      [selectedConversation]: [...(prev[selectedConversation] || []), newMsg]
    }));

    setShowFileUpload(false);
  };

  const handleAddReaction = (messageId: string, emoji: string) => {
    if (!selectedConversation) return;

    const reaction: MessageReaction = {
      emoji,
      userId: 'user1',
      userName: 'Me'
    };

    // Send reaction through WebSocket
    sendMessage('message_reaction', {
      messageId,
      conversationId: selectedConversation,
      reaction
    });

    // Update local state
    setMessages(prev => {
      const updatedMessages = { ...prev };
      const conversation = selectedConversation;
      
      updatedMessages[conversation] = updatedMessages[conversation].map(msg => {
        if (msg.id === messageId) {
          const reactions = msg.reactions || [];
          const existingReaction = reactions.find(r => r.userId === 'user1' && r.emoji === emoji);
          
          if (existingReaction) {
            return {
              ...msg,
              reactions: reactions.filter(r => !(r.userId === 'user1' && r.emoji === emoji))
            };
          } else {
            return {
              ...msg,
              reactions: [...reactions, reaction]
            };
          }
        }
        return msg;
      });

      return updatedMessages;
    });

    setShowEmojiPicker(false);
    setSelectedMessage(null);
  };

  const renderMessage = (message: Message) => (
    <div
      key={message.id}
      className={`flex ${message.senderId === 'user1' ? 'justify-end' : 'justify-start'}`}
    >
      <div className="group relative">
        <div
          className={`max-w-[70%] rounded-lg p-3 ${
            message.senderId === 'user1'
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-100 text-gray-900'
          }`}
        >
          {message.content && <p className="text-sm">{message.content}</p>}
          
          {message.attachments?.map(attachment => (
            <div key={attachment.id} className="mt-2">
              {attachment.type === 'image' ? (
                <img
                  src={attachment.url}
                  alt={attachment.name}
                  className="max-w-full rounded"
                />
              ) : (
                <a
                  href={attachment.url}
                  download={attachment.name}
                  className="flex items-center space-x-2 text-sm underline"
                >
                  <FileIcon size={16} />
                  <span>{attachment.name}</span>
                </a>
              )}
            </div>
          ))}

          <div className="mt-1 flex items-center justify-end space-x-2">
            <span className="text-xs opacity-75">
              {formatTime(message.timestamp)}
            </span>
            {message.senderId === 'user1' && (
              <span className="text-xs opacity-75">
                {message.read ? <CheckCheck size={16} /> : <Check size={16} />}
              </span>
            )}
          </div>

          {message.reactions && message.reactions.length > 0 && (
            <div className="mt-1 flex flex-wrap gap-1">
              {message.reactions.map((reaction, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2 py-1 rounded-full bg-black bg-opacity-10 text-xs"
                >
                  {reaction.emoji}
                </span>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={() => {
            setSelectedMessage(message.id);
            setShowEmojiPicker(true);
          }}
          className="absolute -right-10 top-2 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Smile className="h-5 w-5 text-gray-400 hover:text-gray-600" />
        </button>
      </div>
    </div>
  );

  return (
    <div className="h-[calc(100vh-4rem)] flex bg-gray-50">
      {/* Conversations List */}
      <div className="w-1/3 bg-white border-r">
        <div className="p-4 border-b">
          <div className="relative">
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>
        </div>
        <div className="overflow-y-auto h-[calc(100%-4rem)]">
          {filteredConversations.map(conversation => (
            <button
              key={conversation.id}
              onClick={() => setSelectedConversation(conversation.id)}
              className={`w-full p-4 border-b hover:bg-gray-50 flex items-start ${
                selectedConversation === conversation.id ? 'bg-indigo-50' : ''
              }`}
            >
              <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-semibold flex-shrink-0">
                {conversation.participantName.charAt(0)}
              </div>
              <div className="ml-3 flex-1 min-w-0">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-sm font-semibold text-gray-900 truncate">
                    {conversation.participantName}
                  </h3>
                  <span className="text-xs text-gray-500">
                    {new Date(conversation.lastMessageTime).toLocaleDateString()}
                  </span>
                </div>
                <p className="mt-1 text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
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
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-semibold">
                  {conversations.find(c => c.id === selectedConversation)?.participantName.charAt(0)}
                </div>
                <div className="ml-3">
                  <h2 className="font-semibold text-gray-900">
                    {conversations.find(c => c.id === selectedConversation)?.participantName}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {conversations.find(c => c.id === selectedConversation)?.daycareName}
                  </p>
                </div>
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <MoreVertical size={20} />
              </button>
            </div>

            {/* Messages List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages[selectedConversation]?.map(renderMessage)}
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

      {showEmojiPicker && selectedMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-4">
            <div className="grid grid-cols-8 gap-2">
              {['👍', '❤️', '😊', '😂', '😮', '😢', '😡', '🎉'].map(emoji => (
                <button
                  key={emoji}
                  onClick={() => handleAddReaction(selectedMessage, emoji)}
                  className="text-2xl hover:bg-gray-100 p-2 rounded"
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessagesPage; 