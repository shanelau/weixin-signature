/**
 * Copyright (c) 2015 Meizu bigertech, All rights reserved.
 * http://www.bigertech.com/
 * @author liuxing
 * @date  15/6/25
 * @description
 *
 */

function getSign(req, res) {
  var url = req.query.url;
  var appId = req.query.appId;

  if (!url || !appId) {
    return res.badRequest();
  }
  TokenService.getSign(url, appId).then(function(sign){
    res.jsonp({
      code: 200,
      sign: sign
    });
  }).catch(function(err){
    res.json({
      code: 500,
      err: err
    })
  });
}

module.exports = {
    getSign: getSign
}
