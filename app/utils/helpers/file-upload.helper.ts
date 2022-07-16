import { deleteObject, getDownloadURL, ref, StorageError, uploadBytesResumable } from "firebase/storage";
import { reject } from "lodash";
import { resolve } from "path";
import { storage } from "../../firebase/firebase";
import { IMAGE_EXT } from "../constants/firebase.constant";
import Helper from "./helper.helper";

export interface IUploadOptions {
    onProgress?: (percent: number) => void
    onComplete?: (downloadUrl: string) => void
    onError?: (error: StorageError) => void
}
export default class FileUploadHelper {
    constructor() { }

    uploadFile(file: File, dirPath: string, options?: IUploadOptions): Promise<void> {
        return new Promise(() => {
            const [_, ext] = Helper.extractFileName(file.name);
            const storageRef = ref(storage, this.genRandomFileName(dirPath, ext));
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes);
                    options?.onProgress && options.onProgress(progress);
                },
                (error) => {
                    options?.onError && options.onError(error);
                    reject(error);
                },
                () => {
                    // Handle successful uploads on complete
                    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        options?.onComplete && options.onComplete(downloadURL);
                        resolve();
                    });
                }
            );
        })
    }

    uploadBase64(base64: string, dirPath: string, options?: IUploadOptions): Promise<void> {
        return new Promise(() => {
            const blobFile = this.b64toBlob(base64);
            const storageRef = ref(storage, this.genRandomFileName(dirPath, IMAGE_EXT));
            const uploadTask = uploadBytesResumable(storageRef, blobFile);
            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes);
                    options?.onProgress && options.onProgress(progress);
                },
                (error) => {
                    options?.onError && options.onError(error);
                    reject(error);
                },
                () => {
                    // Handle successful uploads on complete
                    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        options?.onComplete && options.onComplete(downloadURL);
                        resolve();
                    });
                }
            );
        })

    }

    private genRandomFileName(dirPath: string, ext: string): string {
        const randomName = Helper.lodash.padStart(Math.floor(Math.random() * Math.pow(10, 10)) + '', 10, '0');
        return `${dirPath}/${randomName}.${ext}`;
    }

    private b64toBlob(dataURI: string): Blob {
        var byteString = atob(dataURI.split(',')[1]);
        var ab = new ArrayBuffer(byteString.length);
        var ia = new Uint8Array(ab);

        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ab], { type: 'image/jpeg' });
    }

    static async deleteByDownloadUrl(url: string) {
        try {
            const fileRef = ref(storage, url);
            await deleteObject(fileRef)
            console.info('file deleted', url)
        } catch (e) {
            console.info('failed to delete', url)
        }
    }

    static needUpload(src?: string, oldSrc?: string | null) {
        return !!src && src != oldSrc;
    }

    static getImageFieldValue(src?: string, oldSrc?: string | null) {
        const imgDeleted = !!(oldSrc && !src);
        const image = src ? src : imgDeleted ? null : undefined;
        return image;
    }

    static getName(customName: string, file: File) {
        let name = customName;
        const { name: fileName} = file;
        if (customName) {
            const [_, ext] = Helper.extractFileName(fileName);
            name = `${customName}.${ext}`;
        } else {
            name = fileName;
        }
        return name;
    }
}