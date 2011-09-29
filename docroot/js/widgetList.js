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

  var getWidgets = function (elem) {
    var result = [];
    $.each($(elem).data(), function (key, value) {
      if (value && value.__proto__) {
        var proto = value.__proto__;
        var namespace = proto.namespace;
        var name = proto.widgetName;
        if (namespace && name) {
          result.push(namespace + '.'+ name);
        }
      }
    });
    return result;
  };

  var getPath = function (elem) {
    var result = [];
    while (elem !== null) {
      var name = elem.nodeName;
      if (name === '#document') {
        break;
      }
      var label = name.toLowerCase();
      if (elem.id !== '') {
        label += '#' + elem.id;
      }
      result.push(label);
      elem = elem.parentNode;
    }
    result.reverse();
    return result;
  };


  var dialog = null;
  window.widgetListFn = function () {
    if (dialog === null) {
      // First time around, create the dialog
      dialog = $('<div/>').dialog({
        title: 'Example Dialog'
      });
      var list = $('<ul/>').appendTo(dialog);
      $(':data').each(function (idx, elem) {
        var widgets = getWidgets(elem);
        if (widgets.length > 0) {
          var path = getPath(elem);
          $('<li/>')
            .text(path[path.length - 1] + ' -- ' + widgets)
            .appendTo(list);
        }
      });
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