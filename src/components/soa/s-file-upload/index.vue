<script setup lang="ts">
import { getToken } from '@/utils/auth'
const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [],
  },
  label: {
    type: String,
    default: () => '附件',
  },
  edit: {
    type: Boolean,
    default: () => false,
  },
  required: {
    type: Boolean,
    default: () => false,
  },
  prop: {
    type: String,
    default: () => '',
  },
  // 数量限制
  limit: {
    type: Number,
    default: 5,
  },
  // 大小限制(MB)
  fileSize: {
    type: Number,
    default: 2,
  },
  // 文件名长度
  fileNameLength: {
    type: Number,
    default: 800,
  },
  orderDetailId:{
    type:String,
    default:''
  }
})
const emits = defineEmits(['update:modelValue'])
const fileList = ref([] as Array<any>)
const uploadFileUrl = ref(`${import.meta.env.VITE_BASE_URL}api/v1/attachments`)
const headers = ref({ Authorization: `Bearer ${getToken()}` })
const modelValue = computed({
  get: () => props.modelValue,
  set: (val) => emits('update:modelValue', val),
})
const uploadFilePromise = (url: string) => {
  return new Promise((resolve, reject) => {
    uni.uploadFile({
      header: headers.value,
      url: uploadFileUrl.value, // 仅为示例，非真实的接口地址
      filePath: url,
      name: 'file',
      formData:{
        parent_type:'1',
        parent_id:props.orderDetailId,
        attachment_type:'avv_photo',
        sort_index:'1'
      },
      success: (res) => {
        resolve(res)
      },
      fail: (res) => {
        reject(res)
      },
    })
  })
}
// 新增图片
async function afterread(event: any) {
  // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
  // let lists = [].concat(event.file);
  console.log(event);
  
  const file = event.file
  if (props.fileNameLength) {
    const isLt = encodeURI(file.name).length < props.fileNameLength

    if (!isLt) {
      uni.showToast({
        title: '上传文件名称超长，建议控制在50位之内',
        icon: 'error',
      })
      return false
    }
  }

  // 校检文件大小
  if (props.fileSize) {
    const isLt = file.size / 1024 / 1024 < props.fileSize
    if (!isLt) {
      uni.showToast({
        title: `上传文件大小不能超过 ${props.fileSize} MB!`,
        icon: 'error',
      })
      return false
    }
  }

  const result = (await uploadFilePromise(file.url)) as any
  if (result.statusCode === 200) {
    const data = JSON.parse(result.data).attachment
    modelValue.value.push({ name: data.name, url: data.url })
    fileList.value.push({ name: data.name, url: data.url })
    emits('update:modelValue', modelValue.value)
  } else {
    uni.showToast({
      title: result.errMsg,
      icon: 'error',
    })
  }
}
function deleteFile(index) {
  modelValue.value.splice(index, 1)
  console.log(modelValue.value)
  fileList.value.splice(index, 1)
  emits('update:modelValue', modelValue)
}
</script>

<template>
  <u-form-item
    :label="$t('上传文件')"
    :required="props.required"
    :prop="props.prop"
  >
    <u-upload
      :file-list="fileList"
      name="1"
      @delete="deleteFile"
      @afterRead="afterread"
    ></u-upload>
  </u-form-item>
</template>

<style scoped>
.u-form-item {
  height: auto !important;
}
</style>
