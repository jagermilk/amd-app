<template>
    <shmily-drag-image  keyName="url" :parentId="parentId" type="avv_photo"
          v-model="avv_photos">
        </shmily-drag-image>
</template>
<script setup>
import Orders from '@/api/orders'
const parentId=ref('')
const avv_photos = ref([])
onLoad((e)=>{
  parentId.value=e.parentId
})
onShow(e => {
  GetAvvPhoto()
})
function GetAvvPhoto() {
  Orders.GetAvvPhoto(parentId.value).then(res => {
    avv_photos.value = res.photos.map(item => ({'url':item.url,'id':item.id}))
  })
}
</script>