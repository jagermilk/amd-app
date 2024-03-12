<template>
    <view class="flex-0">
        <view class="page-account-top">
            <view class="page-account-top-logo">
                <image mode="aspectFit" style="height: 160px;" src="https://demo.mycar.direct/img/logo.69765971.png" />
            </view>
            <view class="page-account-top-desc text-#808695 text-28rpx">Auto Compliance Portal</view>
        </view>
        <view class="backIcon">
            <u-icon name="map" size="21px"></u-icon>
        </view>
    </view>
</template>
<script></script>
<style lang="scss">
.page-account-top {

    .page-account-top-logo {
        margin: 0 auto;
        max-width: 80%;
        margin: 0 auto;
        display: flex;
        justify-content: center;
        position: relative;
    }

    .page-account-top-desc {
        position: relative;
        z-index: 999;
        bottom: 30px;
        text-align: center;
    }
}

.backIcon {
    position: absolute;
    top: 15px;
    right: 15px;
}
</style>