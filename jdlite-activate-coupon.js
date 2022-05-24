// ==UserScript==
// @name         京东极速版：激活优惠券
// @namespace    https://github.com/liyi
// @version      2.0
// @description  活动页面优惠券允许提前点击，而不必等到开抢时间刷新。
// @author       Liyi
// @match        https://pro.m.jd.com/jdlite/active/*/index.html
// @icon         <$ICON$>
// @grant        none
// @run-at       document-start
// ==/UserScript==

;(function() {
  'use strict';

  let __react_data__ = {}
  let __activity_data__

  function patchActivityData (activityData) {
    let couponFloorList = activityData.floorList.filter(function (fl) { return fl.template === 'free_coupon' })
    couponFloorList.forEach(function (fl) {
      fl.couponList.forEach(function (coupon) {
        coupon.status = '0'
      })
    })
  }

  Object.defineProperty(window, '__react_data__', {
    get () {
      return __react_data__
    },
    set (reactData) {
      Object.defineProperty(reactData, 'activityData', {
        get () {
          return __activity_data__
        },
        set (activityData) {
          patchActivityData(activityData)
          __activity_data__ = activityData
        }
      })
      __react_data__ = reactData
    }
  })

  ;(function (fetch) {
    window.fetch = async function () {
      const res = await fetch.apply(this, arguments)
      try {
        const json = await res.clone().json()
        if (json.floorList) {
          res.json = function () {
            patchActivityData(json)
            return Promise.resolve(json)
          }
        }
      } catch (e) {
        console.info(e)
      }
      return Promise.resolve(res)
    }
  })(window.fetch)
})();
