# yx-weixin

[微信自定义分享的签名版实现](http://www.jianshu.com/p/83c30322e8e2)

[demo 请在微信中打开](http://test.weixin.bigertech.com/)

[demo2 请在微信中打开](http://test.weixin.bigertech.com/api/sign?appId=wxd98888751036c960&url=http://test.weixin.bigertech.com/)

## 微信签名获取 、weixin、sign、signature

1. 本地缓存
2. 时事更新


###example

### 配置
1. 在 `config/weixin.js` 中配置自己的应用
2. npm install
3. node app.js

###url

* appid  应用的 id
* url   页面所在的url


```
http://localhost:1337/api/index/getSign?appid=wxd98888751036c960&url=http://www.baidu.com
```
前端调用

```

var sign;
  function jsonpCallback(data) {
      sign = data.sign;
      wx.config({
          debug: false,
          appId: 'appId',
          timestamp: sign.timestamp,
          nonceStr: sign.nonceStr,
          signature: sign.signature,
          jsApiList: [
              // 所有要调用的 API 都要加到这个列表中
              'onMenuShareTimeline',
              'onMenuShareAppMessage',
              'onMenuShareQQ'
          ]
      });
  }

  var str = "http://test.weixin.bigertech.com/api/sign?appId=wxb0def0bc73c04b72&callback=jsonpCallback&url=";
  var href = encodeURIComponent(window.location.href);
  var script_elem = document.createElement("script");
  script_elem.src = str + href;
  document.body.appendChild(script_elem);

  wx.ready(function(){
      // 分享到朋友圈
      wx.onMenuShareTimeline({
          title: '2016 ⾼考综合试卷原题', // 分享标题
          link: 'http://event.bigertech.com/gaokao2016', // 分享链接
          imgUrl: 'http://event.bigertech.com/gaokao2016/img/share.jpg', // 分享图标
          success: function () {
              // 用户确认分享后执行的回调函数
          },
          cancel: function () {
              // 用户取消分享后执行的回调函数
          }
      });
      //分享给朋友
      wx.onMenuShareAppMessage({
          title: '惊！2016 ⾼考综合试题', // 分享标题
          desc: '2016 ⾼考题独家揭秘，快来试试你能得⼏分。', // 分享描述
          link: 'http://event.bigertech.com/gaokao2016', // 分享链接
          imgUrl: 'http://event.bigertech.com/gaokao2016/img/share.jpg', // 分享图标
          success: function () {
              // 用户确认分享后执行的回调函数
          },
          cancel: function () {
              // 用户取消分享后执行的回调函数
          }
      });
  });

```

### result

```
{
  "code": 200,
  "sign": {
    "jsapi_ticket": "sM4AOVdWfPE4DxkXGEs8VPz8RdcSyJ55qUhx_jOFlsSmIYUmF-Vp6hXyVxk9Nkpshn3txTMWGXfvNXRZ3GLvzg",
    "nonceStr": "d2o7804lrj3piud",
    "timestamp": "1435377516",
    "url": "http://test.weixin.bigertech.com/",
    "signature": "62cab8eb26bcdc2f18834e8983f102defa7205ba"
  }
}

```
