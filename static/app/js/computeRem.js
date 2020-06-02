;(function (win) {
  var docEl = win.document.documentElement,
    tid;

  function refreshRem() {
    var deviceWidth = docEl.getBoundingClientRect().width;
    if (deviceWidth > 750) {
        deviceWidth = 750;
    }
    if (deviceWidth < 320) {
        deviceWidth = 320;
    }
    var rem = deviceWidth / 7.5; //以750px为原稿，除以100可得各元素的rem
    docEl.style.fontSize = rem + "px";
    var actualSize = parseFloat(window.getComputedStyle(docEl)["font-size"]);
    if (actualSize !== rem) {
      // 解决部分 Android 手机(例如华为) 通过 rem 计算的宽度和手机上实际显示的宽度不一致
      var remScaled = rem / (actualSize / rem);
      docEl.style.fontSize = remScaled + "px"
    }
  }

  function dbcRefresh() {
    clearTimeout(tid);
    tid = setTimeout(refreshRem, 100)
  }

  win.addEventListener("resize", function () { dbcRefresh() }, false);
  win.addEventListener("pageshow", function (e) {
    if (e.persisted) { dbcRefresh() }
  }, false);
  refreshRem();
})(window);