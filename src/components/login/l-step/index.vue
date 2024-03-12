<template>
    <u-steps :current="trackList.length - 1" direction="column" dot>
        <u-steps-item :title="item.time" :desc="capitalizeFirstLetter(item.order_status_name)"
            v-for="item in trackList">
        </u-steps-item>
    </u-steps>
</template>
<script setup>
import { capitalizeFirstLetter } from '@/utils/common'
const props = defineProps(['trackList'])
</script>
<style lang="scss">
:deep(.u-text__value--content) {
    span {
        font-size: 28rpx;
        font-weight: 600 !important;
    }
}

:deep(.u-text__value) {
    font-size: 28rpx !important;
    text-indent: 1ch;
}
</style>