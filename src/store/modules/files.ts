import { defineStore } from 'pinia'
import { getToken } from '@/utils/auth'
const uploadFileUrl = `${import.meta.env.VITE_BASE_URL}api/v1/attachments`

export const useFileStore = defineStore({
  id: 'files',
  state: () => ({
    failedUploads: localStorage.getItem('failedUploads')? JSON.parse(localStorage.getItem('failedUploads')):[]
  }),
  getters: {
  },
  actions: {
    addFailedUpload(failedImage){
        console.log('队列新加上传失败的image',this.failedUploads);
        this.failedUploads.push(failedImage)
        localStorage.setItem('failedUploads',JSON.stringify(this.failedUploads))
    },
    retryFailedUploads() {
        console.log('重新加载队列',this.failedUploads);
        if (this.failedUploads.length>0) {
          this.uploadImages(this.failedUploads);
          // 设置轮询间隔，例如5秒后再次尝试
          setTimeout(this.retryFailedUploads, 5000);
        }
      },
      uploadImages(images) {
        images.forEach((image, index) => {
          uni.uploadFile({
            header: `Authorization: Bearer ${getToken()}`,
            url: uploadFileUrl,
            filePath: image.url,
            name: 'file',
            formData: {
              parent_type: '1',
              parent_id: image.parentId,
              attachment_type: 'avv_photo',
              sort_index: image.sortIndex
            },
            success: (uploadFileRes) => {  
              // 如果之前上传失败，从失败列表中移除
              const failedIndex = this.failedUploads.findIndex(f => f.url === image.url);
              if (failedIndex > -1) {
                console.log('移除队列中');
                this.failedUploads.splice(failedIndex, 1);
              }
            },
            fail: (error) => {
              console.error('上传失败：' + error);
            }
          });
        });
      }
  },
})
const FileStore = useFileStore()
FileStore.retryFailedUploads()