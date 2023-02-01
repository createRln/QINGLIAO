/*
 * @Author: renlina
 * @Date: 2022-03-10 14:08:58
 * @LastEditors: renlina
 * @LastEditTime: 2022-11-14 13:23:21
 * @Description: 
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import postCssPxToRem from "postcss-pxtorem";
import styleImport, { VantResolve } from 'vite-plugin-style-import';
import Unocss from 'unocss/vite'
const Resolve = (dir)=>{
  return resolve(__dirname,dir)
}

// https://vitejs.dev/config/
export default defineConfig({
  resolve:{
    alias:{
      "@":Resolve("src/"),
      "@styles":Resolve("src/styles"),
      "@assets":Resolve("@/assets"),
      "@utils":Resolve("src/utils"),
      "@components":Resolve("src/components"),
    }
  },
  css: {
      postcss: {
        plugins: [
          // postCssPxToRem({
          //   // rootValue:37.5,
          //   rootValue:({file})=>{
          //     return file.indexOf('vant') !== -1 ? 18.75:37.5
          //   },
          //   propList: ['*'], // 需要转换的属性，这里选择全部都进行转换
          //   minPixelValue: 1,
          //   selectorBalckList: ["van"],
          // })
        ]
      }
  },
  server:{
    host:'0.0.0.0',
    proxy:{
      '/wechat':{
        target:'aaa',
        changeOrigin:true,
        secure: true,
      },
    }
  },
  build:{
    cssCodeSplit: false,
  },
  plugins: [
    vue(),
    styleImport({
      resolves: [VantResolve()],
    }),
    Unocss({ /* options */ }),
  ],
})
