<template>
  <view class="accountForm">
    <u-form ref="OrderFormRef" label-width="130" :model="OrderForm" :rules="OrderFormRules">
      <u-form-item class="formInputItem" label="Make" prop="make">
        <u-input v-model="OrderForm.make" class="formalnoneBorderInput" clearable disabled></u-input>
      </u-form-item>
      <u-form-item class="formInputItem" label="Model" prop="model">
        <u-input v-model="OrderForm.model" class="formalnoneBorderInput" clearable disabled></u-input>
      </u-form-item>
      <u-form-item class="formInputItem" label="VIN" prop="vin">
        <u-input v-model="OrderForm.vin" class="formalnoneBorderInput" clearable disabled></u-input>
      </u-form-item>
      <u-form-item class="formInputItem" label="Colour" prop="colour">
        <u-input v-model="OrderForm.colour" class="formalnoneBorderInput" clearable disabled></u-input>
      </u-form-item>
      <u-form-item class="formInputItem" label="Built" prop="built">
        <u-input v-model="OrderForm.built" class="formalnoneBorderInput" clearable disabled></u-input>
      </u-form-item>
      <u-form-item class="formInputItem" label="Engine Number" prop="engine_number">
        <u-input v-model="OrderForm.engine_number" :placeholder="$t('请输入')" class="formalnoneBorderInput"
          clearable></u-input>
      </u-form-item>
      <u-form-item class="formInputItem" label="Number Of Seats" prop="number_of_seats">
        <u-input v-model="OrderForm.number_of_seats" :placeholder="$t('请输入')" class="formalnoneBorderInput"
          clearable></u-input>
      </u-form-item>
      <u-form-item class="formInputItem" label="Odometer" prop="odometer">
        <u-input v-model="OrderForm.odometer" :placeholder="$t('请输入')" class="formalnoneBorderInput"
          clearable></u-input>
      </u-form-item>
      <u-button class="mt-5 mb-5" type="primary" shape="circle" size="large" @click="handleConfirm">
        Check In
      </u-button>
      <!-- <s-file-upload
      :orderDetailId="OrderForm.id"
        prop="FILE"
        :file-size="5"
        :edit="true"
        :required="false"
        @update:modelValue="updateMod elValue"
      ></s-file-upload> -->
      <u-divider></u-divider>
      <u-form-item class="formInputItem" label="Photos">
        <view @click="forward('avv-photos',{'parentId':OrderForm.id})">
          Show Photos
        </view>
      </u-form-item>
    </u-form>
  </view>
</template>

<script setup>
import { getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
import Orders from '@/api/orders'
import { forward } from '@/utils/router'
const OrderForm = ref({
  enterpriseName: '',
  linkMail: '',
  linkName: '',
  linkPhone: '',
  code: '',
  password: '',
  confirmPassword: '',
  OrderFileList: []
})
const OrderFormRules = reactive({
  enterpriseName: [
    {
      required: true,
      message: proxy.$i18n?.t('请输入企业名称'),
      trigger: ['blur', 'change'],
    },
    {
      min: 2,
      max: 100,
      message: proxy.$i18n?.t('企业名称长度必须介于 2 和 100 之间'),
      trigger: ['blur', 'change']
    },
  ]
})
onLoad((e) => {
  OrderForm.value = e
})

function handleConfirm() {
  Orders.UpdateOrder(OrderForm.value.id, OrderForm.value).then(res => {
    console.log(res);
  })
}
</script>

<style>
.main {
  padding-top: 200upx;
}

.content {
  background-color: rebeccapurple;
  font-size: 28upx;
  color: #FFF;
  line-height: 46upx;
  padding: 40upx;
}
</style>