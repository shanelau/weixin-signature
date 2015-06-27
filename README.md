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
