/*
 * @Author: renlina
 * @Date: 2022-03-15 14:25:34
 * @LastEditors: RLN
 * @LastEditTime: 2023-03-03 15:02:37
 * @Description: 
 */
export default {
    getImageUrl(name){
        return new URL(`../assets/headImg/${name}.jpeg`,import.meta.url).href
    },
    async compressImg(file,src,device){
        console.log(file)
        return new Promise((resolve,reject)=>{
            let image = new Image()
            image.src = src
            const canvas = document.createElement('canvas')
            console.log(1111)
            image.onload = () =>{
                canvas.width = image.width
                canvas.height = image.height
                canvas.getContext('2d').drawImage(image,0,0,image.width,image.height)
                let canvasURL,minifile,blob
                let quality = 0.99
                canvasURL = canvas.toDataURL(file.type)

                while(canvasURL.length > 110000 ){
                    if(quality <= 0.5 ){
                        console.log('图片尺寸合格')
                        break;
                    }
                    quality -= 0.1
                    canvasURL = canvas.toDataURL(file.type,quality)
                }
                blob = this.dataURLtoBlob(canvasURL)
                minifile = this.blobToFile(blob,'new' + file.name,file.type)
                resolve({
                    canvasURL,blob,minifile
                })

            }
        })

    },
    dataURLtoBlob(dataurl){
        let 
            arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],bstr = atob(arr[1]), 
            n = bstr.length, 
            u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], { type: mime });
    },
    blobToFile(theBlob, fileName, fileType) {
        let file = new window.File([theBlob], fileName, { type: fileType })
        return file;
    },
    /** deepClone */
    _deepClone(source) {
        let target
        if (typeof source === 'object') {
            target = Array.isArray(source) ? [] : {}
            for (let key in source) {
                if (source.hasOwnProperty(key)) {
                if (typeof source[key] !== 'object') {
                    target[key] = source[key]
                } else {
                    target[key] = this._deepClone(source[key])
                }
                }
            }
        } else {
            target = source
        }
        return target
    }

}