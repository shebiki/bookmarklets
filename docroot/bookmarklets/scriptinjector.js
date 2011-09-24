(function (window, document) {
  var fn = '{FN}';
  var url = '{URL}';
  if (window[fn]) {
    window[fn].call();
  } else {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    var done = false;
    var head = document.getElementsByTagName('head')[0];
    script.onload = script.onreadystatechange = function () {
      if (!done) {
        var state = this.readyState;
        if (!state || state === 'loaded' || state === 'complete') {
          done = true;
          if (window[fn]) {
            window[fn].call();
          } else {
            alert('failed to load script ' + url);
          }
          script.onload = script.onreadystatechange = null;
          head.removeChild(script);
        }
      }
    };
    head.appendChild(script);
  }
}(window, document));