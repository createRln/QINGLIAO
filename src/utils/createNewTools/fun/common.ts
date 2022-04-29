/*
 * @Author: renlina
 * @Date: 2022-04-25 14:20:57
 * @LastEditors: renlina
 * @LastEditTime: 2022-04-28 17:47:58
 * @Description: 
 */
import axios from "axios";
const pic_reg = /^(png|jpg|jpeg)$/
const video_reg = /^(mp4|webm|ogg)$/
const gif_reg = /gif/

const selfAxios = axios.create({
  withCredentials: true,
  headers: {
      "Content-Type": "multipart/form-data",
  },
});
export  const uploadFiles = (editor, files) => {
  // console.log('上传===',files)
  const { onSuccess } = editor.getMenuConfig("upLoadFile")
  // console.log(onSuccess,editor,editor.getMenuConfig("upLoadFile"),'onSuccess----')
  let formData = new FormData();
    if (files && files.length > 0) {
        let size = files[0].size

        if(size > 25*1024*1024) {
            alert("文件大小不能超过25M，请重新选择")
            return
        }

        let name = files[0].name
        let extArr = name.split(".")
        let ext = extArr && extArr.length > 1  ? extArr[extArr.length - 1] : ""

        formData.append("content", files[0])
        formData.append("ext", ext)

        selfAxios.post("/dmz/v1/robot/GetKoalaUrl", formData).then((response) => {


            let res = response.data;
            if (res.code == 0) {
                let params = {
                    koala_url: res.data.koala_url,
                    file_name: name,
                    file_size: size,
                    content: name + "," + size
                }
                if (pic_reg.test(ext)) {
                    params["msg_type"] = "image"
                } 
                else if (video_reg.test(ext)) {
                    params["msg_type"] = "video"
                } 
                else if (gif_reg.test(ext)) {
                    params["msg_type"] = "gif"
                } else {
                    params["msg_type"] = "file"
                }
                onSuccess(params)
                // emit("complete", params)
            }
        })
        
    }

}
