import { AuthService } from './auth.service';
import { ChatService } from './chat.service';
import { StorageService } from './storage.service';

// Create singleton instances
export const authService = new AuthService();
export const chatService = new ChatService();
export const storageService = new StorageService();

// Export service classes for testing purposes
export { AuthService, ChatService, StorageService };