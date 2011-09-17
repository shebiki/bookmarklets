(function (w) {
  var jq = w.jQuery;
  var state;
  if (jq && jq.fn && jq.fn.jquery) {
    state = 'jQuery: ' + jq.fn.jquery;
    if (jq.ui && jq.ui.version) {
      state += '\njQuery UI: ' + jq.ui.version;
    }
  } else {
    state = 'jQuery is not available';
  }
  alert(state);
}(window));