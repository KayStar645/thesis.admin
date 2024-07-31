import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { getStorage, ref, deleteObject } from 'firebase/storage';

@Injectable({
  providedIn: 'root',
})
export class ImageUploadService {
  constructor(private fireStorage: AngularFireStorage) {
    this.uRLimage = [];
  }

  title = 'imageupload';
  uRLimage: string[] = [];

  async onFileChange(event: any, folder: string): Promise<string[] | null> {
    console.log('vào hàm này rồi');
    try {
      const files = event.target?.files;
      if (!files) {
        return null;
      }

      const promises: Promise<string>[] = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        console.log(file);

        console.log('vào hàm này rồi 1');
        const path = `${folder}/${file.name}`;
        const uploadTask = await this.fireStorage.upload(path, file);
        const url = await uploadTask.ref.getDownloadURL();
        console.log(url);
        promises.push(Promise.resolve(url));
        this.uRLimage.push(url);
        console.log(this.uRLimage);
      }

      return this.uRLimage;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
  async deleteImage(file: string): Promise<boolean> {
    if (file) {
      try {
        this.fireStorage.storage
          .refFromURL(file)
          .delete()
          .then(() => {
            console.log('Ảnh đã được xóa thành công');
            return true;
          })
          .catch((error) => {
            console.error('Lỗi khi xóa ảnh:', error);
            return false;
          });
      } catch (error) {
        console.error('Lỗi khi xóa ảnh:', error);
        return false;
      }
    }
    return false;
  }
}
// const desertRef = ref(getStorage(), file);
// // Delete the file
// deleteObject(desertRef)
