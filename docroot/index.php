<?php
error_reporting(E_ERROR);
function bookmarklet($name) {
  $filename = "../compressed/" . $name . ".min.js";
  if (!file_exists($filename)) {
    die("Missing file: " . $filename);
  }
  $content = file_get_contents($filename);
  print "javascript:";
  print str_replace(" ", "%20", htmlspecialchars($content));
} 
?><html>
  <head>
    <title>Bookmarklets</title>
  </head>
  <body>
    <h1>Bookmarklets</h1>
    <div>
      Drag these bookmarklets to your bookmarks bar to use.
    </div>
    <dl>
      <dt><a href="<?php bookmarklet("whichjquery") ?>">Which jQuery</a></dt>
      <dd>Displays an alert with the version of jQuery and jQuery UI on the current page.</dd>
    </dl>
  </body>
</html>
