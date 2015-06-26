/**
 * Copyright (c) 2015 Meizu bigertech, All rights reserved.
 * http://www.bigertech.com/
 * @author liuxing
 * @date  15/6/25
 * @description
 *
 */

var request = require('request');
var moment = require('moment');
var Sign = require('../Util/sign');



var url_token = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&';
var js_token = 'https://api.weixin.qq.com/cgi-bin/ticket/getticket?type=jsapi&access_token=';
var Promise = require('bluebird');
var signs = {};


var getAccessToken = function (appid) {
  var app = sails.config.weixin[appid];
  var url = url_token + 'appid=' + appid + '&secret='+ app.secret;

  return new Promise(function (resolve, reject) {
    request(url, function (err, res, body) {
      if (err) {
        return reject(err);
      }
      resolve(JSON.parse(body));
    });
  });
};

var getJSToken = function (appid) {
  return new Promise(function (resolve, reject) {
    getAccessToken(appid).then(function(data){
      request(js_token + data.access_token, function (err, res, body) {
        var data = JSON.parse(body);
        console.log(err, data);
        if (err || data['errcode'] !== 0) {
          return reject(err)
        }
        resolve(data);
      });
    });
  });
};

/**
 * 是否大于当前的时间
 * @param expireDate
 * @returns {*}
 */
function expireCheck(expireDate) {
  return expireDate.isBefore(moment());
}

function getSign(url, appid) {
  return new Promise(function (resolve, reject) {
    if (!signs[url] || expireCheck(signs[url]['expire']) ) {
      sails.log('get new sign!');
      getJSToken(appid).then(function(result){
        var signStr = Sign(result['ticket'], url);
        signs[url] = {
          appid: appid,
          sign: signStr,
          expire: moment(new Date()).add(result['expires_in'] - 100, 's')
        };
        return resolve(signStr);
      });
    }else {
      sails.log('get sign from cache!');
      resolve(signs[url]['sign']);
    }
  });
}


module.exports = {
  getAccessToken: getAccessToken,
  getJSToken: getJSToken,
  getSign: getSign
}


