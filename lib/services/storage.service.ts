import { BehaviorSubject, Observable } from 'rxjs';
import { StorageFile, UploadProgress } from '../interfaces/storage';

class StorageService {
  async uploadFile(
    file: File,
    path: string,
    onProgress?: (progress: UploadProgress) => void
  ): Promise<StorageFile> {
    const totalBytes = file.size;
    let bytesTransferred = 0;

    // Simulate upload progress
    const progressInterval = setInterval(() => {
      if (bytesTransferred < totalBytes) {
        bytesTransferred += totalBytes / 10;
        if (onProgress) {
          onProgress({
            bytesTransferred,
            totalBytes,
            progress: (bytesTransferred / totalBytes) * 100,
            state: 'running'
          });
        }
      } else {
        clearInterval(progressInterval);
      }
    }, 500);

    // Simulate upload delay
    await new Promise(resolve => setTimeout(resolve, 3000));

    const uploadedFile: StorageFile = {
      id: Date.now().toString(),
      name: file.name,
      path: `${path}/${file.name}`,
      url: URL.createObjectURL(file),
      size: file.size,
      mimeType: file.type,
      createdAt: new Date()
    };

    if (onProgress) {
      onProgress({
        bytesTransferred: totalBytes,
        totalBytes,
        progress: 100,
        state: 'success'
      });
    }

    return uploadedFile;
  }

  async deleteFile(path: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  async getDownloadURL(path: string): Promise<string> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return `https://example.com/files/${path}`;
  }
}

export { StorageService }