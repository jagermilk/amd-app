<template>
  <view class="con">
    <template v-if="viewWidth">
      <u-line-progress v-if="processData>0" :percentage="processData" ></u-line-progress>
      <movable-area class="area" :style="{ height: areaHeight }" @mouseenter="mouseenter" @mouseleave="mouseleave">
        <movable-view v-for="(item, index) in   imageList  "  :key="item.id" class="view" direction="all" :y="item.y"
          :x="item.x" :damping="40" :disabled="item.disable" @change="onChange($event, item)"
          @touchstart="touchstart(item)" @mousedown="touchstart(item)" @touchend="touchend(item)"
          @mouseup="touchend(item)" :style="{
      width: viewWidth + 'px',
      height: viewWidth + 'px',
      'z-index': item.zIndex,
      opacity: item.opacity
    }">
          <view class="area-con" :style="{
        width: childWidth,
        height: childWidth,
        borderRadius: borderRadius + 'rpx',
        transform: 'scale(' + item.scale + ')'
      }
      ">
            <image class="pre-image" :src="item.src" mode="aspectFill"></image>
            <view class="del-con" @click="delImages(item, index)" @touchstart.stop="delImageMp(item, index)"
              @touchend.stop="nothing()" @mousedown.stop="nothing()" @mouseup.stop="nothing()">
              <view class="del-wrap">
                <image class="del-image"
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAhCAYAAABX5MJvAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAhdEVYdENyZWF0aW9uIFRpbWUAMjAyMDowNzoyNSAyMTo1NDoyOU4TkJAAAADcSURBVFhH7ZfRCoMwDEXLvkjwwVf/bH/emmAyN6glTW9WBjsgwm28OeCLpj81Sil7zvlJ90UiONS/yY5VogsO6XrBg3IEQ5a/s8vRSWUAKmLqp2w5jz5BiNQEGMo3GbloDLtFXJ1IkaEuhAiiY6gEIqB4yqACSk9piIBiKQ8VUFpLviKg3C2rESKgWERCBZSWiEfgIfffYvrrsAgoISJ3Apy3zuTxcSxLQkV6ykNEPKVQkZEyiAiiZKgDIaC4upACSlcn5fM/+WuDCAHF1E/Z/N9AhkMZnPNDPI+UDjPIXgAQIGjNAAAAAElFTkSuQmCC">
                </image>
              </view>
            </view>
          </view>
        </movable-view>
        <view class="add" v-if="imageList.length < number"
          :style="{ top: add.y, left: add.x, width: viewWidth + 'px', height: viewWidth + 'px' }"
          @click="addImages">
          <view class="add-wrap"
            :style="{ width: childWidth, height: childWidth, borderRadius: borderRadius + 'rpx' }">
            <image style="width: 54rpx;height: 54rpx;"
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAAA2CAYAAACMRWrdAAABIUlEQVRoQ+2a2w2DMAxFeQzWrsMUbadAsEw3S1CqVgppKwLX8BEOP4iHTXx8uUgWdVXoVhdaV0VhSmf7vr/H8V3XzY6V3P9iD+nYOI5P7/01LMI596AwoZV0TIBXIUWFXhKLFBWYSFGhhxQN6SFFQ5i4ogITKSr0cEVDekjRECauqMBEigq9U7piOk2yAti27SUe5ljlTfPEQ6KZecTvwl4P3ytvOv06R2HDMNzes7+6aRrvnHvtf50L13Lp50rx88zcvNlS3JpwKQ67XyK04nq2nFbk/LqVjin0TvmBNgQ2S4UUDcliHgpMpKjQwxUN6SFFQ5i4ogITKSr0cEVDekjRECauqMAsVoph+hVPtYr5+03p9tbYQ96xrYtT4ootbAJGVxxVTapVswAAAABJRU5ErkJggg==">
            </image>
          </view>
        </view>
      </movable-area>
    </template>
  </view>
</template>

<script>
import { getToken } from '@/utils/auth'
import Orders from '@/api/orders'
import { toast } from '@/utils/common'
const headers = ref({ Authorization: `Bearer ${getToken()}` })
const uploadFileUrl = ref(`${import.meta.env.VITE_BASE_URL}api/v1/attachments`)
import { useFileStore } from '@/store'
const FileStore = useFileStore()
export default {
  emits: ['input', 'update:modelValue'],
  props: {
    // 排序图片
    value: {
      type: Array,
      default: function () {
        return []
      }
    },
    // 排序图片
    modelValue: {
      type: Array,
      default: function () {
        return []
      }
    },
    // 从 list 元素对象中读取的键名
    keyName: {
      type: String,
      default: null
    },
    // 选择图片数量限制
    number: {
      type: Number,
      default: 99
    },
    // 图片父容器宽度（实际显示的图片宽度为 imageWidth / 1.1 ），单位 rpx
    // imageWidth > 0 则 cols 无效
    imageWidth: {
      type: Number,
      default: 0
    },
    // 图片列数
    cols: {
      type: Number,
      default: 3
    },
    // 图片圆角，单位 rpx
    borderRadius: {
      type: Number,
      default: 0
    },
    // 图片周围空白填充，单位 rpx
    padding: {
      type: Number,
      default: 10
    },
    // 拖动图片时放大倍数 [0, ∞)
    scale: {
      type: Number,
      default: 1.1
    },
    // 拖动图片时不透明度
    opacity: {
      type: Number,
      default: 0.7
    },
    // 自定义添加
    addImage: {
      type: Function,
      default: null
    },
    // 删除确认
    delImage: {
      type: Function,
      default: null
    },
    type: {
      type: String,
      default: ''
    },
    parentId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      processData:0,
      imageList: [],
      width: 0,
      add: {
        x: 0,
        y: 0
      },
      colsValue: 0,
      viewWidth: 0,
      tempItem: null,
      timer: null,
      changeStatus: true,
      preStatus: true,
      first: true,
      onMoveItem: {}
    }
  },
  computed: {
    areaHeight() {
      let height = ''
      // return '355px'
      if (this.imageList.length < this.number) {
        height = (Math.ceil((this.imageList.length + 1) / this.colsValue) * this.viewWidth).toFixed() + 'px'
      } else {
        height = (Math.ceil(this.imageList.length / this.colsValue) * this.viewWidth).toFixed() + 'px'
      }
      console.log('areaHeight', height)
      return height
    },
    childWidth() {
      return this.viewWidth - this.rpx2px(this.padding) * 2 + 'px'
    },
  },
  watch: {
    value: {
      handler(n) {
        if (!this.first && this.changeStatus) {
          console.log('watch', n)
          let flag = false
          for (let i = 0; i < n.length; i++) {
            if (flag) {
              this.addProperties(n[i])
              continue
            }
            if (this.imageList.length === i || this.imageList[i].src !== this.getSrc(n[i])) {
              flag = true
              this.imageList.splice(i)
              this.addProperties(n[i])
            }
          }
        }
      },
      deep: true
    },
    modelValue: {
      handler(n) {
        if (!this.first && this.changeStatus) {
          console.log('watch', n)
          let flag = false
          for (let i = 0; i < n.length; i++) {
            if (flag) {
              this.addProperties(n[i])
              continue
            }
            if (this.imageList.length === i || this.imageList[i].src !== this.getSrc(n[i])) {
              flag = true
              this.imageList.splice(i)
              this.addProperties(n[i])
            }
          }
        }
      },
      deep: true
    },
  },
  created() {
    this.width = uni.getSystemInfoSync().windowWidth
  },
  mounted() {
    const query = uni.createSelectorQuery().in(this)
    query.select('.con').boundingClientRect(data => {
      this.colsValue = this.cols
      this.viewWidth = data.width / this.cols
      if (this.imageWidth > 0) {
        this.viewWidth = this.rpx2px(this.imageWidth)
        this.colsValue = Math.floor(data.width / this.viewWidth)
      }
      let list = this.value
      // #ifdef VUE3
      list = this.modelValue
      // #endif
      for (let item of list) {
        this.addProperties(this.getSrc(item))
      }
      this.first = false
    })
    query.exec()
  },
  methods: {
    //获取图片的url
    getSrc(item) {
      if (this.keyName !== null) {
        return item[this.keyName]
      }
      return item
    },
    onChange(e, item) {
      if (!item) return
      item.oldX = e.detail.x
      item.oldY = e.detail.y
      if (e.detail.source === 'touch') {
        if (item.moveEnd) {
          item.offset = Math.sqrt(Math.pow(item.oldX - item.absX * this.viewWidth, 2) + Math.pow(item.oldY - item
            .absY * this.viewWidth, 2))
        }
        let x = Math.floor((e.detail.x + this.viewWidth / 2) / this.viewWidth)
        if (x >= this.colsValue) return
        let y = Math.floor((e.detail.y + this.viewWidth / 2) / this.viewWidth)
        let index = this.colsValue * y + x
        if (item.index != index && index < this.imageList.length) {
          this.changeStatus = false
          for (let obj of this.imageList) {
            if (item.index > index && obj.index >= index && obj.index < item.index) {
              this.change(obj, 1)
            } else if (item.index < index && obj.index <= index && obj.index > item.index) {
              this.change(obj, -1)
            } else if (obj.id != item.id) {
              obj.offset = 0
              obj.x = obj.oldX
              obj.y = obj.oldY
              setTimeout(() => {
                this.$nextTick(() => {
                  obj.x = obj.absX * this.viewWidth
                  obj.y = obj.absY * this.viewWidth
                })
              }, 0)
            }
          }
          item.index = index
          item.absX = x
          item.absY = y
          if (!item.moveEnd) {
            setTimeout(() => {
              this.$nextTick(() => {
                item.x = item.absX * this.viewWidth
                item.y = item.absY * this.viewWidth
              })
            }, 0)
          }
          // console.log('bbb', JSON.parse(JSON.stringify(item)));
          this.sortList()
        }
      }
    },
    change(obj, i) {
      obj.index += i
      obj.offset = 0
      obj.x = obj.oldX
      obj.y = obj.oldY
      obj.absX = obj.index % this.colsValue
      obj.absY = Math.floor(obj.index / this.colsValue)
      setTimeout(() => {
        this.$nextTick(() => {
          obj.x = obj.absX * this.viewWidth
          obj.y = obj.absY * this.viewWidth
        })
      }, 0)
    },
    touchstart(item) {
      this.onMoveItem={"old_index":item.index,attachment_id:item.ImgId.toString(),new_index:null,parent_type:1,type:"avv_photo",url:item.src}
      this.startItemIndex = item.index
      this.imageList.forEach(v => {
        v.zIndex = v.index + 9
      })
      item.zIndex = 99
      item.moveEnd = true
      this.tempItem = item
      this.timer = setTimeout(() => {
        item.scale = this.scale
        item.opacity = this.opacity
        clearTimeout(this.timer)
        this.timer = null
      }, 200)
    },
    touchend(item) {
      this.previewImage(item)
      item.scale = 1
      item.opacity = 1
      item.x = item.oldX
      item.y = item.oldY
      item.offset = 0
      item.moveEnd = false
      setTimeout(() => {
        this.$nextTick(() => {
          item.x = item.absX * this.viewWidth
          item.y = item.absY * this.viewWidth
          this.tempItem = null
          this.changeStatus = true
        })
      }, 0)
    },
    previewImage(item) {
      if (this.timer && this.preStatus && this.changeStatus && item.offset < 28.28) {
        clearTimeout(this.timer)
        this.timer = null
        const list = this.value || this.modelValue
        let srcList = this.modelValue.map(v => v.url)
        uni.previewImage({
          urls: srcList,
          current: item.src,
          success: () => {
            this.preStatus = false
            setTimeout(() => {
              this.preStatus = true
            }, 600)
          },
          fail: (e) => {
            console.log(e);
          }
        })
      } else if (this.timer) {
        clearTimeout(this.timer)
        this.timer = null
      }
    },
    mouseenter() {
      //#ifdef H5
      this.imageList.forEach(v => {
        v.disable = false
      })
      //#endif

    },
    mouseleave(item) {
      //#ifdef H5
      if (this.tempItem) {
        this.imageList.forEach(v => {
          v.disable = true
          v.zIndex = v.index + 9
          v.offset = 0
          v.moveEnd = false
          if (v.id == this.tempItem.id) {
            if (this.timer) {
              clearTimeout(this.timer)
              this.timer = null
            }
            v.scale = 1
            v.opacity = 1
            v.x = v.oldX
            v.y = v.oldY
            this.$nextTick(() => {
              v.x = v.absX * this.viewWidth
              v.y = v.absY * this.viewWidth
              this.tempItem = null
            })
          }
        })
        this.changeStatus = true
      }
      //#endif
    },
    addImages() {
      if (typeof this.addImage === 'function') {
        this.addImage.bind(this.$parent)()
      } else {
        let checkNumber = this.number - this.imageList.length
        uni.chooseImage({
          count: checkNumber,
          sourceType: ['album', 'camera'],
          success: res => {
            //检查当前上传个数
            let count = checkNumber <= res.tempFilePaths.length ? checkNumber : res.tempFilePaths.length
            for (let i = 0; i < count; i++) {
              //一张一张添加本地照片
              this.addProperties({ url: res.tempFilePaths[i], id: null })
              let sortIndex=this.imageList.findIndex(item=>item.src==res.tempFilePaths[i])
              //本地上传成功之后，上传到服务器
              this.uploadFilePromise({ src: res.tempFilePaths[i], sortIndex}).then(res => {
            })
            }
            toast('上传成功')
            
            this.sortList()
          }
        })
      }
    },
    delImages(item, index) {
      Orders.DeleteAvvAttachment(item.ImgId).then(res => {
        if (res.status == 'success') {
          if (typeof this.delImage === 'function') {
            this.delImage.bind(this.$parent)(() => {
              this.delImageHandle(item, index)
            })
          } else {
            this.delImageHandle(item, index)
          }
        }
        else {
          toast(res.error)
        }
      }).catch(err => {
        toast(error)
      })

    },
    delImageHandle(item, index) {
      //删除本地照片
      this.imageList.splice(index, 1)
      for (let obj of this.imageList) {
        if (obj.index > item.index) {
          obj.index -= 1
          obj.x = obj.oldX
          obj.y = obj.oldY
          obj.absX = obj.index % this.colsValue
          obj.absY = Math.floor(obj.index / this.colsValue)
          this.$nextTick(() => {
            obj.x = obj.absX * this.viewWidth
            obj.y = obj.absY * this.viewWidth
          })
        }
      }
      this.add.x = (this.imageList.length % this.colsValue) * this.viewWidth + 'px'
      this.add.y = Math.floor(this.imageList.length / this.colsValue) * this.viewWidth + 'px'
    },
    delImageMp(item, index) {
      //#ifdef MP
      this.delImages(item, index)
      //#endif
    },
    sortList() {
      //依据每个元素的index属性值排序
      const result = []
      let source = this.value
      // #ifdef VUE3
      source = this.modelValue
      // #endif

      let list = this.imageList.slice()
      list.sort((a, b) => {
        console.log(a.index,b.index);
        return a.index - b.index
      })
      for (let s of list) {
        let item = source.find(d => this.getSrc(d) == s.src)
        if (item) {
          result.push({ ...item, index: list.indexOf(s) })
        } else {
          if (this.keyName !== null) {
            result.push({
              [this.keyName]: s.src, index: list.indexOf(s) 
            })
          } else {
            result.push({ src: s.src, index: list.indexOf(s) })
          }
        }
      }
      let isChange=result.find(item=>item.url===this.onMoveItem.url)?.index!==this.onMoveItem?.old_index
      if(this.onMoveItem&&isChange){
        console.log(this.onMoveItem.old_index,this.onMoveItem.url,result.find(item=>item.url===this.onMoveItem.url))
        this.onMoveItem.new_index=result.find(item=>item.url===this.onMoveItem.url).index
        delete this.onMoveItem.url
        Orders.UpdateAvvPhoto(this.parentId,this.onMoveItem).then(res=>{
        console.log(res);
      })
      }
      
      //拿到排序后到最新结果
      //更新当前组件
      this.$forceUpdate()
    },
    addProperties(item) {
      //储存某一张本地照片的属性
      let absX = this.imageList.length % this.colsValue
      let absY = Math.floor(this.imageList.length / this.colsValue)
      let x = absX * this.viewWidth
      let y = absY * this.viewWidth
      //本地图片更新
      this.imageList.push({
        src: item.url,
        x,
        y,
        oldX: x,
        oldY: y,
        absX,
        absY,
        scale: 1,
        zIndex: 9,
        opacity: 1,
        index: this.imageList.length,
        id: this.guid(16),
        disable: false,
        offset: 0,
        moveEnd: false,
        ImgId: item.id
      })
      this.add.x = (this.imageList.length % this.colsValue) * this.viewWidth + 'px'
      this.add.y = Math.floor(this.imageList.length / this.colsValue) * this.viewWidth + 'px'
    },
    uploadFilePromise(fileUrl) {
      return new Promise((resolve, reject) => {
        const uploadTask =uni.uploadFile({
          header: headers.value,
          url: uploadFileUrl.value, // 仅为示例，非真实的接口地址
          filePath: fileUrl.src,
          name: 'file',
          formData: {
            parent_type: '1',
            parent_id: this.parentId,
            attachment_type: this.type,
            sort_index: fileUrl.sortIndex
          },
          success: (res) => {
            resolve(res)
          },
          fail: (res) => {
            let failedImage = {
              url: fileUrl.src,
              status: 'failed',
              parentId:this.parentId,
              sortIndex:fileUrl.sortIndex
            }
            FileStore.addFailedUpload(failedImage)
            reject(res)
          }
        })
        uploadTask.onProgressUpdate(res=> {
          this.processData= res.progress
          if(this.processData==100){
            this.processData=0
          }
				})
      })
    },
    nothing() { },
    rpx2px(v) {
      return this.width * v / 750
    },
    guid(len = 32) {
      const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')
      const uuid = []
      const radix = chars.length
      for (let i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix]
      uuid.shift()
      return `u${uuid.join('')}`
    }
  }
}
</script>

<style lang="scss" scoped>
.con {
  // padding: 30rpx;

  .area {
    width: 100%;

    .view {
      display: flex;
      justify-content: center;
      align-items: center;

      .area-con {
        position: relative;
        overflow: hidden;

        .pre-image {
          width: 100%;
          height: 100%;
        }

        .del-con {
          position: absolute;
          top: 0rpx;
          right: 0rpx;
          padding: 0 0 20rpx 20rpx;

          .del-wrap {
            width: 36rpx;
            height: 36rpx;
            background-color: rgba(0, 0, 0, 0.4);
            border-radius: 0 0 0 10rpx;
            display: flex;
            justify-content: center;
            align-items: center;

            .del-image {
              width: 20rpx;
              height: 20rpx;
            }
          }
        }
      }
    }

    .add {
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;

      .add-wrap {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #eeeeee;
      }
    }
  }
}
</style>
