import presetWeapp from 'unocss-preset-weapp'
import {
  transformerAttributify,
  transformerClass,
} from 'unocss-preset-weapp/transformer'
import { defineConfig } from 'unocss'

export default defineConfig({
  presets: [
    // https://github.com/MellowCo/unocss-preset-weapp
    presetWeapp(),
  ],
  shortcuts: [
    {
      accountForm:
        'p-4 border-rounded-t-8 bg-white overflow-hidden position-relative -top-96rpx pt-12',
      noneBorderInput:
        'important-focus-within-border-#3c9cff not-focus-within-bg-gray-200 important-border-transparent h-72rpx',
      formNormalInput:
        'important-focus-within-border-#3c9cff not-focus-within-bg-gray-200 important-border-transparent h-72rpx important-rd-36rpx text-13px',
      formInputItem: 'border-b-1 border-gray-200',
      formalnoneBorderInput:
        'important-focus-within-border-#3c9cff  important-border-transparent h-44rpx',
      whiteCard: 'p-block-6 p-inline-4 bg-white rounded-xl shadow-card',
    },
  ],
  transformers: [
    // options https://github.com/MellowCo/unocss-preset-weapp/tree/main/src/transformer/transformerAttributify
    transformerAttributify({
      nonValuedAttribute: true,
    }),

    // options https://github.com/MellowCo/unocss-preset-weapp/tree/main/src/transformer/transformerClass
    transformerClass(),
  ],
})
