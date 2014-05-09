angular.module("slidePushMenu", [])
    .factory('slidePush', function () {
        "use strict";

        var spmenuHorizontalHeight, spmenuVerticalWidth;
        spmenuVerticalWidth = 320;
        spmenuHorizontalHeight = 150;
        return {
            slide: function (menu, btn) {
                btn.toggleClass("active");
                if (menu.hasClass("spmenu-left")) {
                    if (menu.hasClass("spmenu-open")) {
                        menu.css("left", parseInt(menu.css("left")) - spmenuVerticalWidth);
                    } else {
                        menu.css("left", parseInt(menu.css("left")) + spmenuVerticalWidth);
                    }
                }
                if (menu.hasClass("spmenu-right")) {
                    if (menu.hasClass("spmenu-open")) {
                        menu.css("right", parseInt(menu.css("right")) - spmenuVerticalWidth);
                    } else {
                        menu.css("right", parseInt(menu.css("right")) + spmenuVerticalWidth);
                    }
                }
                if (menu.hasClass("spmenu-top")) {
                    if (menu.hasClass("spmenu-open")) {
                        menu.css("top", parseInt(menu.css("top")) - spmenuHorizontalHeight);
                    } else {
                        menu.css("top", parseInt(menu.css("top")) + spmenuHorizontalHeight);
                    }
                }
                if (menu.hasClass("spmenu-bottom")) {
                    if (menu.hasClass("spmenu-open")) {
                        menu.css("bottom", parseInt(menu.css("bottom")) - spmenuHorizontalHeight);
                    } else {
                        menu.css("bottom", parseInt(menu.css("bottom")) + spmenuHorizontalHeight);
                    }
                }
                return menu.toggleClass("spmenu-open").is('.spmenu-open');
            },
            slideForceClose: function (menu, btn) {
                if (menu.hasClass("spmenu-open")) {
                    btn.removeClass("active");
                    if (menu.hasClass("spmenu-left")) {
                        menu.css("left", parseInt(menu.css("left")) - spmenuVerticalWidth);
                    }
                    if (menu.hasClass("spmenu-right")) {
                        menu.css("right", parseInt(menu.css("right")) - spmenuVerticalWidth);
                    }
                    if (menu.hasClass("spmenu-top")) {
                        menu.css("top", parseInt(menu.css("top")) - spmenuHorizontalHeight);
                    }
                    if (menu.hasClass("spmenu-bottom")) {
                        menu.css("bottom", parseInt(menu.css("bottom")) - spmenuHorizontalHeight);
                    }
                    return menu.removeClass("spmenu-open");
                }
            },
            push: function (menu, btn) {
                var body, bodyLeft, bodyTop;
                body = angular.element("body");
                btn.toggleClass("active");
                if (menu.hasClass("spmenu-left")) {
                    bodyLeft = parseInt(body.css("left"));
                    bodyLeft = (bodyLeft ? bodyLeft : 0);
                    if (menu.hasClass("spmenu-open")) {
                        body.css("left", bodyLeft - spmenuVerticalWidth);
                    } else {
                        body.css("left", bodyLeft + spmenuVerticalWidth);
                    }
                    if (menu.hasClass("spmenu-open")) {
                        menu.css("left", parseInt(menu.css("left")) - spmenuVerticalWidth);
                    } else {
                        menu.css("left", parseInt(menu.css("left")) + spmenuVerticalWidth);
                    }
                }
                if (menu.hasClass("spmenu-right")) {
                    bodyLeft = parseInt(body.css("left"));
                    bodyLeft = (bodyLeft ? bodyLeft : 0);
                    if (menu.hasClass("spmenu-open")) {
                        body.css("left", bodyLeft + spmenuVerticalWidth);
                    } else {
                        body.css("left", bodyLeft - spmenuVerticalWidth);
                    }
                    if (menu.hasClass("spmenu-open")) {
                        menu.css("right", parseInt(menu.css("right")) - spmenuVerticalWidth);
                    } else {
                        menu.css("right", parseInt(menu.css("right")) + spmenuVerticalWidth);
                    }
                }
                if (menu.hasClass("spmenu-top")) {
                    bodyTop = parseInt(body.css("top"));
                    bodyTop = (bodyTop ? bodyTop : 0);
                    if (menu.hasClass("spmenu-open")) {
                        body.css("top", "auto");
                    } else {
                        body.css("top", bodyTop + spmenuHorizontalHeight);
                    }
                    if (menu.hasClass("spmenu-open")) {
                        menu.css("top", parseInt(menu.css("top")) - spmenuHorizontalHeight);
                    } else {
                        menu.css("top", parseInt(menu.css("top")) + spmenuHorizontalHeight);
                    }
                }
                if (menu.hasClass("spmenu-bottom")) {
                    bodyTop = parseInt(body.css("top"));
                    bodyTop = (bodyTop ? bodyTop : 0);
                    if (menu.hasClass("spmenu-open")) {
                        body.css("top", "auto");
                    } else {
                        body.css("top", bodyTop - spmenuHorizontalHeight);
                    }
                    if (menu.hasClass("spmenu-open")) {
                        menu.css("bottom", parseInt(menu.css("bottom")) - spmenuHorizontalHeight);
                    } else {
                        menu.css("bottom", parseInt(menu.css("bottom")) + spmenuHorizontalHeight);
                    }
                }
                return menu.toggleClass("spmenu-open");
            },
            pushForceClose: function (menu, btn) {
                var body, bodyLeft;
                if (menu.hasClass("spmenu-open")) {
                    btn.removeClass("active");
                    body = angular.element("body");
                    if (menu.hasClass("spmenu-left")) {
                        bodyLeft = parseInt(body.css("left"));
                        bodyLeft = (bodyLeft ? bodyLeft : 0);
                        body.css("left", bodyLeft - spmenuVerticalWidth);
                        menu.css("left", parseInt(menu.css("left")) - spmenuVerticalWidth);
                    }
                    if (menu.hasClass("spmenu-right")) {
                        bodyLeft = parseInt(body.css("left"));
                        bodyLeft = (bodyLeft ? bodyLeft : 0);
                        body.css("left", bodyLeft + spmenuVerticalWidth);
                        menu.css("right", parseInt(menu.css("right")) - spmenuVerticalWidth);
                    }
                    if (menu.hasClass("spmenu-top")) {
                        body.css("top", "auto");
                        menu.css("top", parseInt(menu.css("top")) - spmenuHorizontalHeight);
                    }
                    if (menu.hasClass("spmenu-bottom")) {
                        body.css("top", "auto");
                        menu.css("bottom", parseInt(menu.css("bottom")) - spmenuHorizontalHeight);
                    }
                    return menu.removeClass("spmenu-open");
                }
            }
        };
    })
    .directive("pushMenu", [
        "$document", 'slidePush', function ($document, slidePush) {
            "use strict";

            var link = function (scope, elem, attrs) {
                var body, btn, positionFix;

                scope.position = attrs.position;
                scope.buttonClass = (attrs.buttonClass) ? attrs.buttonClass : '';
                scope.type = (attrs.menuType) ? attrs.menuType : 'slide';
                scope.classes = (attrs.spmClass ? attrs.spmClass : "");
                scope.classes += "  spmenu-" + (attrs.position === "right" || attrs.position === "left" ? "vertical" : "horizontal") + " spmenu-" + attrs.position;
                scope.showButton = !!attrs.button;

                if (scope.isOpen === undefined) {
                    scope.isOpen = false;
                }

                scope.$watch('isOpen', function () {
                    if (scope.type === 'slide') {
                        slidePush.slide(elem, btn);
                    } else if (scope.type === 'push') {
                        slidePush.push(elem, btn);
                    }
                });

                scope.toggleOpen = function () {
                    if (scope.type === "push") {
                        angular.element("body").addClass("spmenu-push");
                    }
                    scope.isOpen = !scope.isOpen;
                };

                body = angular.element("body");
                if (scope.showButton) {
                    btn = elem.find(".spmenu-button");
                    positionFix = (attrs.fixTop ? "top: " + (parseInt(attrs.fixTop) + elem.position().top) + "px; " : "");
                    positionFix += (attrs.fixLeft ? "left: " + (parseInt(attrs.fixLeft) + elem.position().left) + "px; " : "");
                    btn.attr("style", positionFix);
                }

                if (scope.type === "push") {
                    body.addClass("spmenu-push");
                }

                $document.mouseup(function (e) {
                    if (scope.isOpen && !elem.is(e.target) && elem.has(e.target).length === 0 && !body.hasClass('modal-open')) {
                        scope.$apply(function () {
                            scope.isOpen = false;
                        });
                        if (scope.type === "slide") {
                            return slidePush.slideForceClose(elem, btn);
                        } else if (scope.type === "push") {
                            return slidePush.pushForceClose(elem, btn);
                        }
                    }
                });
            };
            return {
                restrict: "E",
                replace: true,
                template: '<div class="spmenu" ng-class="classes"><a class="spmenu-button" ng-if="showButton" ng-click="toggleOpen()"><i class="toggle" ng-class="buttonClass"></i></a><div class="spmenu-content" push-menu-transclude></div></div>',
                transclude: true,
                link: link,
                scope: {
                    isOpen: '=menuOpen'
                }
            };
        }
    ])
    .directive('pushMenuTransclude', function () {
        "use strict";
        return {
            link: function ($scope, $element, $attrs, controller, $transclude) {
                $transclude($scope.$parent, function (clone) {
                    $element.empty();
                    $element.append(clone);
                });
            }
        };
    });