/*
 * @Author: renlina
 * @Date: 2022-03-11 16:22:07
 * @LastEditors: renlina
 * @LastEditTime: 2022-03-11 16:44:52
 * @Description: 
 */
export default {
    dateTime(time){
        let old = new Date(time)
        let now = new Date()
        // 获取old具体时间
        let os = old.getTime()
        let oh = old.getHours()
        let om = old.getMinutes()
        let oY = old.getFullYear()
        let oM = old.getMonth()
        let oD = old.getDate()
        // 获取now具体时间
        let ns = now.getTime()
        let nh = now.getHours()
        let nm = now.getMinutes()
        let nY = now.getFullYear()
        let nM = now.getMonth()
        let nD = now.getDate()
        let showDate = ''
        if(oh < 10){
            oh = '0' + oh
        }
        if(om < 10){
            om = '0' + om
        }
        // 今天
        if(nY == oY && nM == oM && nD == oD){
            showDate = oh + ':' + om
        }else
        // 昨天
        if(oY == nY && oM == nM && oD + 1 == nD ){
            showDate ='昨天' + oh + ':' + om
        }else{
            showDate = oY + '/' + oM + '/' + oD
        }
        return showDate

    }
}