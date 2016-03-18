(function($) {
    $.Utils = {
        overlay : function() {
            var $overlay = $('<div style=""></div>');
            $overlay.css({
                'display' : "block",
                'position' : "fixed",
                '_position' : "absolute",
                'top' : "0px",
                'left' : "0px",
                'width' : "100%",
                'height' : "100%",
                'background-color' : '#fff',
                'background-repeat' : 'no-repeat',
                'background-position' : 'center',
                'opacity' : '0.5',
                'filter' : 'Alpha(opacity=50)',
                '_left' : '-10000px',
                'z-index' : '100001'
            });
            return $overlay;
        },
        waitOverlay : function() {
            var $overlay = $.Utils.overlay();
            $overlay.css({
                'background-image' : 'url("http://che.yiwugou.com/images/loading-32x32.gif")'
            });
            return $overlay;
        },
        ajax : function(param) {
            var newsrc = $.extend({}, {
                type : "get",
                dataType : "json",
                async : true,
                data : {},
                overlay : false,
                error : function() {
                }
            }, param);

            var $overlay = "";
            if (newsrc.overlay) {
                $overlay = $.Utils.waitOverlay();
                $("body").append($overlay);
            }
            if (!newsrc.data.t) {
                newsrc.data.t = new Date().getTime();
            }

            $.ajax({
                url : newsrc.url,
                data : newsrc.data,
                dataType : newsrc.dataType,
                type : newsrc.type,
                async : newsrc.async,
                success : function(data) {
                    if (data) {
                        if (data.code > 0) {
                            newsrc.success(data);
                        } else {
                            newsrc.error();
                            alert(data.msg);
                        }
                    } else {
                        newsrc.error();
                        alert("Error");
                    }
                    if (newsrc.overlay) {
                        $overlay.remove();
                    }
                },
                error : function() {
                    newsrc.error();
                    alert("Server Error, Please Try Again Later!");
                    if (newsrc.overlay) {
                        $overlay.remove();
                    }
                }
            });
        },
        formSubmit : function(param) {
            var newsrc = $.extend({}, {
                method : "post",
                data : {},
                target : "_self"
            }, param);
            var form = $("<form></form>");
            $("body").append(form);
            form.attr("action", newsrc.action);
            form.attr("method", newsrc.method);
            form.attr("target", newsrc.target);
            for ( var name in newsrc.data) {
                form.append("<input type='hidden' name='" + name + "' value='" + newsrc.data[name] + "'>");
            }
            form.submit();
        },
        isBlank : function(obj) {
            return (!obj || $.trim(obj) === "");
        }
    };

    $.fn.popup = function() {
        var self = $(this);
        var msgboxYpos = ($(window).height() - self.height()) / 3 + $(document).scrollTop();
        var msgboxXpos = ($(window).width() - self.width()) / 2;
        msgboxYpos = msgboxYpos < 0 ? 0 : msgboxYpos;
        self.css({
            "position" : "absolute",
            "top" : msgboxYpos,
            "left" : msgboxXpos,
            "display" : "block"
        }).show();
    };

    $.fn.serializeJson = function() {
        var serializeObj = {};
        var array = this.serializeArray();
        $(array).each(function() {
            if (serializeObj[this.name]) {
                serializeObj[this.name] = serializeObj[this.name] + "," + this.value;
            } else {
                serializeObj[this.name] = this.value;
            }
        });
        return serializeObj;
    };

    $.fn.outerHtml = function() {
        if (arguments.length == 0) {
            return this[0].outerHTML;
        } else if (arguments.length == 1) {
            var html = arguments[0];
            this[0].outerHTML = html;
        }
    };

    $.fn.checkBoxValue = function() {
        if (arguments.length == 0) {
            var checkBox = $(this);
            var arr = [];
            checkBox.each(function() {
                arr.push($(this).val());
            });
            var value = arr.join(",");
            return value;
        } else if (arguments.length == 1) {
            var checkBox = $(this);
            var value = arguments[0];
            if (value) {
                var vs = value.split(",");
                checkBox.each(function() {
                    for ( var index in vs) {
                        if ($(this).val() == vs[index]) {
                            $(this).prop("checked", true);
                        }
                    }
                });
            }
        }
    };

})(jQuery);
