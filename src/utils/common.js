/*
 * @Author: renlina
 * @Date: 2022-03-15 14:25:34
 * @LastEditors: renlina
 * @LastEditTime: 2022-03-15 14:25:34
 * @Description: 
 */
export default {
    getImageUrl(name){
        return new URL(`../assets/headImg/${name}.jpeg`,import.meta.url).href
    }
}