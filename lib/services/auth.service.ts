import { BehaviorSubject, Observable } from 'rxjs';
import { AuthCredential, AuthResponse, User, AuthError } from '../interfaces/auth';

class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>;
  
  constructor() {
    this.currentUserSubject = new BehaviorSubject<User | null>(null);
  }

  get currentUser(): User | null {
    return this.currentUserSubject.value;
  }

  get currentUser$(): Observable<User | null> {
    return this.currentUserSubject.asObservable();
  }

  async signIn(credentials: AuthCredential): Promise<AuthResponse> {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (credentials.email === 'admin@example.com' && credentials.password === 'password') {
        const user: User = {
          uid: 'admin-123',
          email: credentials.email,
          displayName: 'Admin User',
          photoURL: 'https://example.com/avatar.jpg',
          createdAt: new Date(),
          lastLoginAt: new Date()
        };

        this.currentUserSubject.next(user);

        return {
          user,
          token: 'mock-jwt-token'
        };
      }

      throw new Error('Invalid credentials');
    } catch (error) {
      throw {
        code: 'auth/invalid-credentials',
        message: 'Invalid email or password'
      } as AuthError;
    }
  }

  async signOut(): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 500));
    this.currentUserSubject.next(null);
  }

  async updateProfile(data: Partial<User>): Promise<User> {
    const currentUser = this.currentUser;
    if (!currentUser) {
      throw new Error('No authenticated user');
    }

    const updatedUser = {
      ...currentUser,
      ...data,
    };

    this.currentUserSubject.next(updatedUser);
    return updatedUser;
  }
}

export { AuthService }