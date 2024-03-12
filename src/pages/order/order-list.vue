<template>
  <view class="flex items-center order-box">
    <u-loading-page :loading="showloading" loading-text="loading..."></u-loading-page>
    <view class="order-navbar">
      <view class="w-10rpx">
        <u-icon name="list" @click="show = true" size="28px" color="#7096c7"></u-icon>
      </view>
      <view class="flex-1 flex justify-center text-30rpx">Orders</view>
    </view>
    <view class="flex flex-col w-100%">
      <view class="order-search">
        <u-search placeholder="Press enter" v-model="SearchKeyword" :showAction="false" shape="square"
          @search="changeKeyWords" margin="5px" color="#333" placeholderColor="#c0c0c0"></u-search>
        <zxz-uni-data-select v-model="Search" filterable :multiple="fasle" dataKey="label" dataValue="value"
          placeholder="Order status" clear :localdata="localdata" @change="changeStatus"></zxz-uni-data-select>
      </view>
      <OrderList :OrderList="OrderList"></OrderList>
    </view>
  </view>
  <u-popup :show="show" mode="left" @close="close" :customStyle="{ 'width': '115%' }" :closeOnClickOverlay="true">
    <view class="popup-box">
      <view class="ml-2">
        <view class="h-72rpx flex items-center">
          <u-icon name="list" @click="show = false" size="28px" color="#7096c7"></u-icon>
        </view>
        <view class="mt-2 flex items-center">
          <u-avatar src="https://cdn.uviewui.com/uview/album/1.jpg" size="28"></u-avatar>
          <view class="ml-2">Jason Wang</view>
        </view>
      </view>
    </view>
    <view class="logout-btn flex justify-center" @click="logout">
      <u-line class="logout-line" color="#e3e3e3"></u-line>
      <u-icon name="close-circle" size="20px" color="#e3e3e3"></u-icon>
      <view class="text-30rpx ml-18rpx">退出登陆</view>
    </view>
  </u-popup>
</template>

<script>
import OrderList from '@/components/order-list/index'
import { useUserStore } from '@/store'
import uniStatSelect from '@/uni_modules/zxz-uni-data-select/components/zxz-uni-data-select/zxz-uni-data-select.vue'
import Orders from '@/api/orders'
import { useFileStore } from '@/store'
const FileStore = useFileStore()
export default {
  components: { OrderList, uniStatSelect },
  data() {
    return {
      show: false,
      SearchKeyword: '',
      OrderList: [],
      localdata: [],
      OrderParams: {
        page: 1,
        pageSize: 999,
        display: 'kanban',
        orderStatus: null,
        shipmentStatus: '',
        keywords: [],
        sort: '',
        direction: '',
        filters: [],
        sortData: []
      },
      OrderList: [],
      showloading: false
    }
  },
  mounted() {
    this.getAllOrderList()
    this.getOrderTypes()
  },
  methods: {
    getAllOrderList() {
      this.showloading = true
      Orders.GetOrderStatusType().then(res => {
        this.OrderList = []
        let result = res.statuses.map((item) => {
          this.OrderParams.orderStatus = item.id
          Orders.GetOrders(this.OrderParams).then(res => {
            this.OrderList.push(...res.orders[item.id].orders)
          })
          return null
        })
      }).then(res => {
        this.showloading = false
      })
    },
    searchOrderList(orderStatus){
      if(orderStatus){
        this.OrderParams.orderStatus = orderStatus
      }
      this.OrderList=[]
      Orders.GetOrders(this.OrderParams).then(res => {
            this.OrderList.push(...res.orders[this.OrderParams.orderStatus].orders)
      })
    },
    getOrderTypes() {
      Orders.GetOrderStatusType().then(res => {
        this.localdata = res.statuses.map((item) => {
          return {
            value: item.id,
            label: item.name
          }
        })
      })
    },
    changeStatus(e) {
      this.searchOrderList(e.value)
    },
    changeKeyWords(e) {
      this.OrderParams.keywords = []
      this.OrderParams.keywords.push(`keyword:${this.SearchKeyword}`)
      this.searchOrderList()
    },
    close() {
      this.show = false
    },
    logout() {
      const userStore = useUserStore()
      userStore.logout()
    }
  }
}
</script>

<style lang="scss">
.order-box {
  margin-top: 72rpx;

  .order-navbar {
    position: fixed;
    top: 0;
    display: flex;
    width: $normal-width;
    height: 72rpx;
    padding: 0 $normal-padding;
    align-items: center;
    font-size: 36rpx;
    background-color: #f5f5f5;
  }

  .order-search {
    width: $normal-width;
    display: flex;
    align-items: center;
    padding: 10rpx $normal-padding;
    border-bottom: 3px solid #e0e0e0;

  }

}

.popup-box {
  position: relative;
}

.logout-btn {
  position: absolute;
  bottom: 0px;
  width: 100%;
  height: 58rpx;
  align-items: center;
}

.logout-line {
  position: absolute;
  bottom: 58rpx
}


</style>