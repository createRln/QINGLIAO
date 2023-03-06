/*
 * @Author: RLN
 * @Date: 2023-03-03 11:47:00
 * @LastEditors: RLN
 * @LastEditTime: 2023-03-03 11:47:01
 * @Description: 
 */
// t:20, b:0, c: 100, d: 100ms
const easeInOutQuad = (t: number, b: number, c: number, d: number) => {
    t /= d / 2
    if (t < 1) {
      return c / 2 * t * t + b
    }
    t--
    return -c / 2 * (t * (t - 2) - 1) + b
  }
  
  // requestAnimationFrame for Smart Animating http://goo.gl/sx5sts
  const requestAnimFrame = (function() {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || (window as any).mozRequestAnimationFrame || function(callback) { window.setTimeout(callback, 1000 / 60) }
  })()
  
  // Because it's so fucking difficult to detect the scrolling element, just move them all
  const move = (amount: number) => {
    document.documentElement.scrollTop = amount;
    (document.body.parentNode as HTMLElement).scrollTop = amount
    document.body.scrollTop = amount
  }
  
  const position = () => {
    return document.documentElement.scrollTop || (document.body.parentNode as HTMLElement).scrollTop || document.body.scrollTop
  }
  
  export const scrollTo = (to: number, duration: number, callback?: Function) => {
    const start = position()
    const change = to - start
    const increment = 20
    let currentTime = 0
    duration = (typeof (duration) === 'undefined') ? 500 : duration
    const animateScroll = function() {
      // increment the time
      currentTime += increment
      // find the value with the quadratic in-out easing function
      const val = easeInOutQuad(currentTime, start, change, duration)
      // move the document.body
      move(val)
      // do the animation unless its over
      if (currentTime < duration) {
        requestAnimFrame(animateScroll)
      } else {
        if (callback && typeof (callback) === 'function') {
          // the animation is done so lets callback
          callback()
        }
      }
    }
    animateScroll()
  }