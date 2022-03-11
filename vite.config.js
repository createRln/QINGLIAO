/*
 * @Author: renlina
 * @Date: 2022-03-10 14:08:58
 * @LastEditors: renlina
 * @LastEditTime: 2022-03-11 16:30:04
 * @Description: 
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import postCssPxToRem from "postcss-pxtorem";

const Resolve = (dir)=>{
  return resolve(__dirname,dir)
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve:{
    alias:{
      "@":Resolve("src/"),
      "@styles":Resolve("src/styles"),
      "@assets":Resolve("@/assets"),
      "@utils":Resolve("src/utils"),
    }
  },
  css: {
      postcss: {
        plugins: [
          postCssPxToRem({
            rootValue:37.5,
            propList: ['*'], // 需要转换的属性，这里选择全部都进行转换
            minPixelValue: 1,
          })
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
      }
    }
  },
  build:{
    cssCodeSplit: false,
  }
})
