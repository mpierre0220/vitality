module.exports = {
        getrepobyurl: getrepobyurl
}



function getrepobyurl(req, res) {
  console.log('=====================================');
  console.log('GET REPO BY URL ======================');
  console.log('=====================================');

  var callback = req.swagger.params.callback.value;
  if (typeof callback === 'undefined') callback = 'callback' + Date.now();
  var url      = encodeURIComponent(req.swagger.params.url.value);
  var data = {};

  for (i=0; i < allrepos.length; i++) {
    if (allrepos[i].url == url) {
      data = allrepos[i];
      break;
    }
  }

  if (data.hasOwnProperty('url')) {
    var retVal = {};
    retVal.success = true;
    retVal.data = data;
    console.log('---SENDING: ' + JSON.stringify(retVal));
    res.status(200).jsonp(JSON.stringify(retVal));
  }
  else {
    var error = {'success': false, 'message': 'No repository with that URL could be found.', 'code': 130 };
    res.status(200).jsonp(JSON.stringify(error));
  }
}
