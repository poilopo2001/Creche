export interface MessageReaction {
  emoji: string;
  userId: string;
  userName: string;
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  recipientId: string;
  content: string;
  timestamp: string;
  read: boolean;
  attachments?: {
    id: string;
    type: 'image' | 'document';
    url: string;
    name: string;
  }[];
  reactions?: MessageReaction[];
}

export interface Conversation {
  id: string;
  participantId: string;
  participantName: string;
  participantRole: 'provider' | 'parent';
  participantAvatar?: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  daycareName?: string;
  status: 'active' | 'archived';
} 