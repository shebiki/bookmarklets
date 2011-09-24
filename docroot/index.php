<?php
error_reporting(E_ERROR);
$BASE_URI = "http://" . $_SERVER["HTTP_HOST"] . dirname($_SERVER["REQUEST_URI"]);
function getBookmarklet($name) {
  $filename = "../compressed/" . $name . ".min.js";
  if (!file_exists($filename)) {
    die("Missing file: " . $filename);
  }
  $content = file_get_contents($filename);
  return "javascript:" . $content;
}
function escapeBookmarklet($content) {
  return str_replace(" ", "%20", htmlspecialchars($content));
}
function bookmarklet($name) {
  return escapeBookmarklet(getBookmarklet($name));
}
?><html>
  <head>
    <title>Bookmarklets</title>
    <link href="css/redmond/jquery-ui-1.8.16.custom.css" rel="stylesheet" type="text/css" />
    <style>
      body {
        font-size: 62.5%;
      }
      .ui-widget div {
        padding: 0.4em 1em;
      }
      #bookmarklets {
        width: 400px;
      }
      #injector {
        width: 700px;
      }
      #injector fieldset.left {
        width: 380px;
        float: left;
      }
      #injector fieldset.right {
        width: 240px;
      }
    </style>
  <body>
    <div id="bookmarklets" class="ui-widget ui-corner-all">
      <div class="ui-widget-header">
        Bookmarklets
      </div>
      <div class="ui-widget-content">
        Drag these bookmarklets to your bookmarks bar to use.
        <dl>
          <dt><a href="<?php print bookmarklet("whichjquery") ?>">wjq</a></dt>
          <dd>Displays an alert with the version of jQuery and jQuery UI on the current page.</dd>
          <dt><a href="<?php 
            print str_replace(
              array("{URL}", "{FN}"),
              array($BASE_URI . "/js/exampleAlertScript.js", "exampleAlertFn"),
              bookmarklet("scriptinjector")) ?>">example alert injection</a></dt>
          <dd>An example injected script that cause an alert when loaded and called.</dd>
          <dt><a href="<?php 
            print str_replace(
              array("{URL}", "{FN}"),
              array($BASE_URI . "/js/exampleConsoleLogScript.js", "exampleConsoleLogFn"),
              bookmarklet("scriptinjector")) ?>">example console log injection</a></dt>
          <dd>An example injected script that logs when lodded and called.</dd>
          <dt><a href="<?php
            print str_replace(
              array("{URL}", "{FN}"),
              array($BASE_URI . "/js/exampleDialog.js", "exampleDialogFn"),
              bookmarklet("scriptinjector")) ?>">exampleDialog</a></dt>
          <dd>An example injected script that toggles a dialog.</dd>
        </dl>
      </div>
    </div>
    <p />
    <div id="injector" class="ui-widget ui-corner-all">
      <div class="ui-widget-header">
        Script Injector
      </div>
      <div class="ui-widget-content">
        <form onsubmit="return false;">
          <fieldset class="left">
            <legend>Create Bookmarklet</legend>
            <div>
              <label>
                Name<br />
                <input name="name" style="width: 100%;"/>
              </label>
            </div>
            <div>
              <label>
                Function<br />
                <input name="fn" style="width: 100%;"/>
              </label>
            </div>
            <div>
              <label>
                URL<br />
                <input name="url" style="width: 100%;"/>
              </label>
            </div>
            <button id="create">Create</button>
          </fieldset>
          <fieldset class="right">
            <legend>Generated Bookmarklets</legend>
            <ul id="generated"></ul>
            <button id="clear">clear</button>
          </fieldset>
          <div class="ui-helper-clearfix"/>
        </form>
      </div>
    </div>
    <script type="text/javascript" src="js/jquery-1.6.4.min.js" charset="utf-8"></script>
    <script type="text/javascript" src="js/jquery-ui-1.8.16.custom.min.js" charset="utf-8"></script>
    <script type="text/javascript">
      $(function () {
        $('button').button();
        var template = <?php print json_encode(getBookmarklet("scriptinjector")) ?>;
        $('#injector form').submit(function () {
          var form = $(this);
          var name = form.find('input[name="name"]').val().trim();
          var fn = form.find('input[name="fn"]').val().trim();
          var url = form.find('input[name="url"]').val().trim();
          if (name !== '' && fn !== '' && url !== '') {
            var a = $('<a/>')
              .attr('href', template.replace('{URL}', url).replace('{FN}', fn))
              .text(name);
            $('#generated').append($('<li/>').append(a));
          }
        });
        $('#clear').click(function () {
          $('#generated').children().remove();
          return false;
        });
      });
    </script>
  </body>
</html>
