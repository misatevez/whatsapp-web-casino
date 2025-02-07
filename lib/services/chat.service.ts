import { BehaviorSubject, Observable } from 'rxjs';
import { ChatMessage, ChatRoom } from '../interfaces/chat';

class ChatService {
  private rooms: Map<string, BehaviorSubject<ChatRoom>>;
  private messages: Map<string, BehaviorSubject<ChatMessage[]>>;

  constructor() {
    this.rooms = new Map();
    this.messages = new Map();
  }

  getRoomMessages$(roomId: string): Observable<ChatMessage[]> {
    if (!this.messages.has(roomId)) {
      this.messages.set(roomId, new BehaviorSubject<ChatMessage[]>([]));
    }
    return this.messages.get(roomId)!.asObservable();
  }

  getRoom$(roomId: string): Observable<ChatRoom | null> {
    if (!this.rooms.has(roomId)) {
      this.rooms.set(roomId, new BehaviorSubject<ChatRoom | null>(null));
    }
    return this.rooms.get(roomId)!.asObservable();
  }

  async sendMessage(roomId: string, message: Partial<ChatMessage>): Promise<ChatMessage> {
    await new Promise(resolve => setTimeout(resolve, 500));

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      content: message.content || '',
      timestamp: new Date(),
      senderId: message.senderId!,
      receiverId: message.receiverId!,
      status: 'sent',
      attachments: message.attachments
    };

    const currentMessages = this.messages.get(roomId)?.value || [];
    this.messages.get(roomId)?.next([...currentMessages, newMessage]);

    // Update room's last message
    const room = this.rooms.get(roomId)?.value;
    if (room) {
      this.rooms.get(roomId)?.next({
        ...room,
        lastMessage: newMessage,
        updatedAt: new Date()
      });
    }

    return newMessage;
  }

  async createRoom(participants: string[]): Promise<ChatRoom> {
    const room: ChatRoom = {
      id: Date.now().toString(),
      participants,
      createdAt: new Date(),
      updatedAt: new Date(),
      metadata: {
        unreadCount: participants.reduce((acc, id) => ({ ...acc, [id]: 0 }), {})
      }
    };

    this.rooms.set(room.id, new BehaviorSubject(room));
    this.messages.set(room.id, new BehaviorSubject([]));

    return room;
  }

  async markAsRead(roomId: string, userId: string): Promise<void> {
    const room = this.rooms.get(roomId)?.value;
    if (room && room.metadata?.unreadCount) {
      room.metadata.unreadCount[userId] = 0;
      this.rooms.get(roomId)?.next(room);
    }
  }
}

export { ChatService }