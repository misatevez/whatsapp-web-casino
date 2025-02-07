export interface StorageFile {
  id: string;
  name: string;
  path: string;
  url: string;
  size: number;
  mimeType: string;
  metadata?: Record<string, any>;
  createdAt: Date;
}

export interface UploadProgress {
  bytesTransferred: number;
  totalBytes: number;
  progress: number;
  state: 'running' | 'paused' | 'success' | 'canceled' | 'error';
}