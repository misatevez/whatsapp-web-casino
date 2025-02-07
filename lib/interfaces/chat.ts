import { User } from './auth';

export interface ChatMessage {
  id: string;
  content: string;
  timestamp: Date;
  senderId: string;
  receiverId: string;
  status: 'sent' | 'delivered' | 'read';
  attachments?: MessageAttachment[];
}

export interface MessageAttachment {
  id: string;
  type: 'image' | 'document';
  name: string;
  url: string;
  size?: number;
  mimeType?: string;
}

export interface ChatRoom {
  id: string;
  participants: string[];
  lastMessage?: ChatMessage;
  createdAt: Date;
  updatedAt: Date;
  metadata?: {
    unreadCount: { [userId: string]: number };
  };
}