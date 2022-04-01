// ==UserScript==
// @name         京东极速版：激活优惠券
// @namespace    https://github.com/liyi
// @version      1.0
// @description  活动页面优惠券允许提前点击，而不必等到开抢时间刷新。
// @author       Liyi
// @match        https://pro.m.jd.com/jdlite/active/*/index.html
// @icon         <$ICON$>
// @grant        none
// @run-at       document-start
// ==/UserScript==

// 修改页面初始数据
(async function () {
  'use strict';

  let _data = {}

  Object.defineProperty(window, '__react_data__', {
    get: function () {
      return _data
    },
    set: function (obj) {
      if (obj.activityData) {
        let couponFloorList = obj.activityData.floorList.filter(function (fl) { return fl.template === 'free_coupon' })
        couponFloorList.forEach(function (fl) {
          fl.couponList.forEach(function (coupon) {
            coupon.status = '0'
          })
        })
      }
      _data = obj
    }
  });
})();

// 修改网络动态数据
(function (fetch) {
  window.fetch = async function () {
    const res = await fetch.apply(this, arguments)
    console.log('fetch', arguments)
    const json = await res.clone().json()
    if (json.floorList) {
      res.json = function () {
        let couponFloorList = json.floorList.filter(function (fl) { return fl.template === 'free_coupon' })
        couponFloorList.forEach(function (fl) {
          fl.couponList.forEach(function (coupon) {
            coupon.status = '0'
          })
        })
        return Promise.resolve(json)
      }
    }
    return Promise.resolve(res)
  }
})(window.fetch);
