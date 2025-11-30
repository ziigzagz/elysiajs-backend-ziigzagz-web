import { Elysia, t } from 'elysia';
import { FileUpload } from '../utils/upload';

export const uploadRoutes = new Elysia({ prefix: '/upload' })
  .post('/banner', async ({ body }: any) => {
    const filepath = await FileUpload.saveFile(body.file, 'banner');
    return { success: true, filepath };
  }, {
    body: t.Object({
      file: t.File()
    })
  })
  .post('/images', async ({ body }: any) => {
    const files = Array.isArray(body.files) ? body.files : [body.files];
    const filepaths = await FileUpload.saveMultipleFiles(files, 'image');
    return { success: true, filepaths };
  }, {
    body: t.Object({
      files: t.Union([t.File(), t.Array(t.File())])
    })
  });
