import { mkdir, writeFile } from 'fs/promises';
import { join } from 'path';

export class FileUpload {
  static async saveFile(file: File, type: 'banner' | 'image'): Promise<string> {
    const uploadDir = type === 'banner' 
      ? 'uploads/showcase/banners' 
      : 'uploads/showcase/images';
    
    await mkdir(uploadDir, { recursive: true });
    
    const timestamp = Date.now();
    const filename = `${timestamp}_${file.name}`;
    const filepath = join(uploadDir, filename);
    
    const buffer = await file.arrayBuffer();
    await writeFile(filepath, Buffer.from(buffer));
    
    return filepath;
  }

  static async saveMultipleFiles(files: File[], type: 'banner' | 'image'): Promise<string[]> {
    return Promise.all(files.map(file => this.saveFile(file, type)));
  }
}
