(function () {
  if (!$ || !$.fn || !$.fn.jquery) {
    alert('jQuery is not available on this page');
    return;
  }
  if (!$.ui || !$.ui.version) {
    alert('jQuery UI is not available on this page');
    return;
  }
  if (!$.ui.dialog) {
    alert('jQuery UI dialog is not available on this page');
    return;
  }

  var dialog = null;
  window.exampleDialogFn = function () {
    if (dialog === null) {
      // First time around, create the dialog
      dialog = $('<div/>')
        .dialog({
          title: 'Example Dialog'
        })
        .text('This dialog left intentially blank.');
    } else {
      // Toggle the visible state
      if (dialog.dialog('isOpen')) {
        dialog.dialog('close');
      } else {
        dialog.dialog('open');
      }
    }
  };
}());