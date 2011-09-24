(function () {
  console.log("loading exampleConsoleLogScript");
  window.exampleConsoleLogFn = function () {
    console.log("calling exampleConsoleLogFn");
  };
}(window));