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

(function () {
    'use strict';
  
    var _data = {}
  
    Object.defineProperty(window, '__react_data__', {
      get: function () {
        return _data
      },
      set: function (obj) {
        var couponFloorList = obj.activityData.floorList.filter(function (fl) { return fl.template === 'free_coupon' })
        couponFloorList.forEach(function (fl) {
          fl.couponList.forEach(function (coupon) {
            coupon.status = '0'
          })
        })
        _data = obj
      }
    })
  })();
  