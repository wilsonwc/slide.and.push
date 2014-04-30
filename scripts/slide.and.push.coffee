angular.module("slidePushMenu", []).factory("slidePush", ->
  "use strict"
  spmenuHorizontalHeight = undefined
  spmenuVerticalWidth = undefined
  spmenuVerticalWidth = 320
  spmenuHorizontalHeight = 150
  slide: (menu, btn) ->
    btn.toggleClass "active"
    if menu.hasClass("spmenu-left")
      if menu.hasClass("spmenu-open")
        menu.css "left", parseInt(menu.css("left")) - spmenuVerticalWidth
      else
        menu.css "left", parseInt(menu.css("left")) + spmenuVerticalWidth
    if menu.hasClass("spmenu-right")
      if menu.hasClass("spmenu-open")
        menu.css "right", parseInt(menu.css("right")) - spmenuVerticalWidth
      else
        menu.css "right", parseInt(menu.css("right")) + spmenuVerticalWidth
    if menu.hasClass("spmenu-top")
      if menu.hasClass("spmenu-open")
        menu.css "top", parseInt(menu.css("top")) - spmenuHorizontalHeight
      else
        menu.css "top", parseInt(menu.css("top")) + spmenuHorizontalHeight
    if menu.hasClass("spmenu-bottom")
      if menu.hasClass("spmenu-open")
        menu.css "bottom", parseInt(menu.css("bottom")) - spmenuHorizontalHeight
      else
        menu.css "bottom", parseInt(menu.css("bottom")) + spmenuHorizontalHeight
    menu.toggleClass "spmenu-open"

  slideForceClose: (menu, btn) ->
    if menu.hasClass("spmenu-open")
      btn.removeClass "active"
      menu.css "left", parseInt(menu.css("left")) - spmenuVerticalWidth  if menu.hasClass("spmenu-left")
      menu.css "right", parseInt(menu.css("right")) - spmenuVerticalWidth  if menu.hasClass("spmenu-right")
      menu.css "top", parseInt(menu.css("top")) - spmenuHorizontalHeight  if menu.hasClass("spmenu-top")
      menu.css "bottom", parseInt(menu.css("bottom")) - spmenuHorizontalHeight  if menu.hasClass("spmenu-bottom")
      menu.removeClass "spmenu-open"

  push: (menu, btn) ->
    body = undefined
    bodyLeft = undefined
    bodyTop = undefined
    body = angular.element("body")
    btn.toggleClass "active"
    if menu.hasClass("spmenu-left")
      bodyLeft = parseInt(body.css("left"))
      bodyLeft = ((if bodyLeft then bodyLeft else 0))
      if menu.hasClass("spmenu-open")
        body.css "left", bodyLeft - spmenuVerticalWidth
      else
        body.css "left", bodyLeft + spmenuVerticalWidth
      if menu.hasClass("spmenu-open")
        menu.css "left", parseInt(menu.css("left")) - spmenuVerticalWidth
      else
        menu.css "left", parseInt(menu.css("left")) + spmenuVerticalWidth
    if menu.hasClass("spmenu-right")
      bodyLeft = parseInt(body.css("left"))
      bodyLeft = ((if bodyLeft then bodyLeft else 0))
      if menu.hasClass("spmenu-open")
        body.css "left", bodyLeft + spmenuVerticalWidth
      else
        body.css "left", bodyLeft - spmenuVerticalWidth
      if menu.hasClass("spmenu-open")
        menu.css "right", parseInt(menu.css("right")) - spmenuVerticalWidth
      else
        menu.css "right", parseInt(menu.css("right")) + spmenuVerticalWidth
    if menu.hasClass("spmenu-top")
      bodyTop = parseInt(body.css("top"))
      bodyTop = ((if bodyTop then bodyTop else 0))
      if menu.hasClass("spmenu-open")
        body.css "top", "auto"
      else
        body.css "top", bodyTop + spmenuHorizontalHeight
      if menu.hasClass("spmenu-open")
        menu.css "top", parseInt(menu.css("top")) - spmenuHorizontalHeight
      else
        menu.css "top", parseInt(menu.css("top")) + spmenuHorizontalHeight
    if menu.hasClass("spmenu-bottom")
      bodyTop = parseInt(body.css("top"))
      bodyTop = ((if bodyTop then bodyTop else 0))
      if menu.hasClass("spmenu-open")
        body.css "top", "auto"
      else
        body.css "top", bodyTop - spmenuHorizontalHeight
      if menu.hasClass("spmenu-open")
        menu.css "bottom", parseInt(menu.css("bottom")) - spmenuHorizontalHeight
      else
        menu.css "bottom", parseInt(menu.css("bottom")) + spmenuHorizontalHeight
    menu.toggleClass "spmenu-open"

  pushForceClose: (menu, btn) ->
    body = undefined
    bodyLeft = undefined
    if menu.hasClass("spmenu-open")
      btn.removeClass "active"
      body = angular.element("body")
      if menu.hasClass("spmenu-left")
        bodyLeft = parseInt(body.css("left"))
        bodyLeft = ((if bodyLeft then bodyLeft else 0))
        body.css "left", bodyLeft - spmenuVerticalWidth
        menu.css "left", parseInt(menu.css("left")) - spmenuVerticalWidth
      if menu.hasClass("spmenu-right")
        bodyLeft = parseInt(body.css("left"))
        bodyLeft = ((if bodyLeft then bodyLeft else 0))
        body.css "left", bodyLeft + spmenuVerticalWidth
        menu.css "right", parseInt(menu.css("right")) - spmenuVerticalWidth
      if menu.hasClass("spmenu-top")
        body.css "top", "auto"
        menu.css "top", parseInt(menu.css("top")) - spmenuHorizontalHeight
      if menu.hasClass("spmenu-bottom")
        body.css "top", "auto"
        menu.css "bottom", parseInt(menu.css("bottom")) - spmenuHorizontalHeight
      menu.removeClass "spmenu-open"
).directive("ngSlideMenu", [
  "slidePush"
  (slidePush) ->
    "use strict"
    return (
      restrict: "A"
      link: (scope, elem, attrs) ->
        elem.click ->
          menu = undefined
          menu = angular.element("#" + attrs.ngSlideMenu)
          slidePush.slide menu, elem

    )
]).directive("ngPushMenu", [
  "slidePush"
  (slidePush) ->
    "use strict"
    return (
      restrict: "A"
      link: (scope, elem, attrs) ->
        body = undefined
        menu = undefined
        menu = angular.element("#" + attrs.ngPushMenu)
        body = angular.element("body")
        body.addClass "spmenu-push"
        elem.click ->
          slidePush.push menu, elem

    )
]).directive "pushMenu", [
  "$document"
  "slidePush"
  ($document, slidePush) ->
    "use strict"
    compile = undefined
    link = undefined
    compile = (elem, attrs, transclude) ->
      link.transclude = transclude
      link

    link = (scope, elem, attrs) ->
      link.transclude scope, (clone) ->
        body = undefined
        btn = undefined
        buttonClass = undefined
        classes = undefined
        positionFix = undefined
        classes = ((if attrs.spmClass then attrs.spmClass else ""))
        classes += " spmenu spmenu-" + ((if attrs.position is "right" or attrs.position is "left" then "vertical" else "horizontal")) + " spmenu-" + attrs.position
        elem.addClass classes
        body = angular.element("body")
        if attrs.button
          btn = elem.find(".spmenu-button").addClass("show")
          buttonClass = (if attrs.buttonClass then attrs.buttonClass else "")
          elem.find(".toggle").addClass buttonClass
          positionFix = ((if attrs.fixTop then "top: " + (parseInt(attrs.fixTop) + elem.position().top) + "px; " else ""))
          positionFix += ((if attrs.fixLeft then "left: " + (parseInt(attrs.fixLeft) + elem.position().left) + "px; " else ""))
          btn.attr "style", positionFix
          if attrs.button is "slide"
            $document.mouseup (e) ->
              slidePush.slideForceClose elem, btn  if not elem.is(e.target) and elem.has(e.target).length is 0 and not body.hasClass("modal-open")

            btn.click ->
              slidePush.slide elem, btn

          if attrs.button is "push"
            body.addClass "spmenu-push"
            $document.mouseup (e) ->
              slidePush.pushForceClose elem, btn  if not elem.is(e.target) and elem.has(e.target).length is 0 and not body.hasClass("modal-open")

            btn.click ->
              slidePush.push elem, btn

        elem.append clone
        btn.click()  if attrs.open


    return (
      compile: compile
      restrict: "E"
      replace: true
      template: "<nav><a class=\"spmenu-button\"><i class=\"toggle\"></i></a></nav>"
      transclude: true
    )
]