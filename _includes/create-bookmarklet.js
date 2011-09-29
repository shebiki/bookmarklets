(function () {
  var js = prompt('Enter compressed JavaScript');
  if (js) {
    js = js.replace(/[\t\r\n]/g, '');
    alert('javascript:' + escape(js));
  }
}());