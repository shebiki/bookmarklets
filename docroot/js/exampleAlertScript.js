(function () {
  alert("loading exampleAlertScript");
  window.exampleAlertFn = function () {
    alert("calling my exampleAlertFn");
  };
}(window));