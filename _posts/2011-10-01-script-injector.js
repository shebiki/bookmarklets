---
layout: bookmarklet
title: Script Injector
blurb: |
  Injects an external JavaScript file into the current page
  optionally calling a globally defined function after the script has
  loaded.
scriptInjectorTemplate: (function(g,a){var f="FUNCTION";var d="URL";if(f!==""&&g[f]){g[f].call()}else{var c=a.createElement("script");c.type="text/javascript";c.src=d;var b=false;var e=a.getElementsByTagName("head")[0];c.onload=c.onreadystatechange=function(){if(!b){var h=this.readyState;if(!h||h==="loaded"||h==="complete"){b=true;if(f!==""){if(g[f]){g[f].call()}else{alert("failed to load script "+d)}}c.onload=c.onreadystatechange=null;e.removeChild(c)}}};e.appendChild(c)}}(window,document));
---
<div class="creator">
  <div class="ui-widget">
    <div class="ui-widget-header">
      Creator Tool
    </div>
    <div class="ui-widget-content ui-helper-clearfix">
      <div style="float: left; margin-right: 1em; padding-right: 1em; border-right: 1px solid gray;">
        <form onsubmit="return false;">
          <div>
            <label>
              Name *<br />
              <input name="name" value="Bookmarklet" style="width: 20em;"/>
            </label>
          </div>
          <div>
            <label>
              URL *<br />
              <input name="url" style="width: 20em;"/>
            </label>
          </div>
          <div>
            <label>
              Function<br />
              <input name="fn" style="width: 20em;"/>
            </label>
          </div>
          <button id="create">Create</button>
        </form>
      </div>
      <div style="margin-left: 1em;">
        Generated bookmarklets:
        <div class="generated"></div>        
      </div>
    </div>
  </div>
</div>
</div>
<div class="source">
  <div class="ui-widget">
    <div class="ui-widget-header">
      <span class="title">Example Alert Script</span>
    </div>
    <div class="ui-widget-content">
      <div class="inject-bookmarklet" data-url="{{ site.baseurl}}/js/exampleAlert.js" data-function="exampleAlert"></div>
      {% highlight javascript linenos %}{% include exampleAlert.js %}{% endhighlight %}
    </div>
  </div>
</div>
<div class="source">
  <div class="ui-widget">
    <div class="ui-widget-header">
      <span class="title">Example Console Log Script</span>
    </div>
    <div class="ui-widget-content">
      <div class="inject-bookmarklet" data-url="{{ site.baseurl}}/js/exampleConsoleLog.js" data-function="exampleConsoleLog"></div>
      {% highlight javascript linenos %}{% include exampleConsoleLog.js %}{% endhighlight %}
    </div>
  </div>
</div>
<div class="source">
  <div class="ui-widget">
    <div class="ui-widget-header">
      <span class="title">Source</span>
    </div>
    <div class="ui-widget-content">
      {% highlight javascript linenos %}{% include script-injector.js %}{% endhighlight %}
    </div>
  </div>
</div>
<script type="text/javascript">
$(function () {
  var template = 'javascript:{{ page.scriptInjectorTemplate }}';
  var bookmarklet = function (name, url, fn) {
    return $('<a/>')
      .attr('href', template.replace('URL', url).replace('FUNCTION', fn))
      .text(name)
      .button();
  }
  $('.creator form').submit(function (evt) {
    var form = $(evt.target);
    var name = form.find('input[name="name"]').val().trim();
    var url = form.find('input[name="url"]').val().trim();
    var fn = form.find('input[name="fn"]').val().trim();
    if (name !== '' && url !== '') {
      bookmarklet(name, url, fn).appendTo('.creator .generated');
    }
  });
  $('.inject-bookmarklet').each(function (idx, elem) {
    var url = $(elem).data('url');
    var fn = $(elem).data('function');
    var container = $('<dl><dt>URL</dt><dd class="url"></dd><dt>Function</dt><dd class="function"></dd><dt>Bookmarklet</dt><dd class="bookmarklet"></dd></dl>');
    container.find('.url').text(url);
    container.find('.function').text(fn);
    container.find('.bookmarklet').append(bookmarklet('Run', url, fn));
    $(elem).append(container);
  });
});
</script>