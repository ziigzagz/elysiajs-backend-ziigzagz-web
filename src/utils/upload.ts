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
    if (!Array.isArray(files)) {
      throw new Error('Files must be an array');
    }
    // check length > 0
    if (files.length === 0) {
      throw new Error('Files array must contain at least one file');
    }
    console.log("files:", files);
    return Promise.all(files.map(file => this.saveFile(file, type)));
  }
}
