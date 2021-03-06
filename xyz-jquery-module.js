(function (factory) {
    if (typeof define === 'function') {
        define(function (require, exports, moudles) {
            $ = require("jQuery");
            factory($);
            return $;
        });
    } else {
        factory(jQuery);
    }
}
    (function ($) {
        $.Utils = {
            overlay : function () {
                var $overlay = $('<div />');
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
            loading : function () {
                var $overlay = $.Utils.overlay();
                $overlay.css({
                    'background-image' : 'url("http://yiwugouimg.oss-cn-hangzhou.aliyuncs.com/2016/reb/images/loading-32x32.gif")'
                });
                return $overlay;
            },
            ajax : function (param) {
                var newsrc = $.extend({}, {
                        type : "get",
                        dataType : "json",
                        async : true,
                        data : {},
                        loading : false,
                        contentType : "application/x-www-form-urlencoded; charset=UTF-8",
                        success : function () {},
                        failed : function (back) {
                            alert(back.msg);
                        },
                        finish : function () {},
                        error : function (jqXHR, textStatus, errorThrown) {
                            alert(jqXHR.status + ":" + jqXHR.statusText);
                        }
                    }, param);

                var $loading = "";
                if (newsrc.loading) {
                    if (typeof newsrc.loading == 'function') {
                        newsrc.loading();
                    } else {
                        $loading = $.Utils.loading();
                        $("body").append($loading);
                    }
                }
                if (!newsrc.data.t) {
                    newsrc.data.t = new Date().getTime();
                }
                var finalDo = function () {
                    if (newsrc.loading && typeof newsrc.loading != 'function') {
                        $loading.remove();
                    }
                    newsrc.finish();
                };

                $.ajax({
                    url : newsrc.url,
                    data : newsrc.data,
                    dataType : newsrc.dataType,
                    type : newsrc.type,
                    async : newsrc.async,
                    contentType : newsrc.contentType,
                    success : function (back) {
                        if (back) {
                            if (back.code > 0) {
                                newsrc.success(back);
                            } else if (back.code == -2) {
                                newsrc.failed({
                                    msg : '你需要登入'
                                });
                            } else if (back.code == -3) {
                                location.href = back.obj;
                            } else {
                                newsrc.failed(back);
                            }
                        } else {
                            newsrc.failed({
                                msg : "返回数据格式出错"
                            });
                        }
                        finalDo();
                    },
                    error : function (jqXHR, textStatus, errorThrown) {
                        newsrc.error(jqXHR, textStatus, errorThrown);
                        finalDo();
                    }
                });
            },
            formSubmit : function (param) {
                var newsrc = $.extend({}, {
                        method : "post",
                        data : {},
                        target : "_self",
                        loading : false
                    }, param);
                if (newsrc.loading) {
                    if (typeof newsrc.loading == 'function') {
                        newsrc.loading();
                    } else {
                        $loading = $.Utils.loading();
                        $("body").append($loading);
                    }
                }
                var form = $("<form />");
                $("body").append(form);
                form.attr("action", newsrc.action);
                form.attr("method", newsrc.method);
                form.attr("target", newsrc.target);
                for (var name in newsrc.data) {
                    form.append($("<input />").attr("type", "hidden").attr("name", name).attr("value", newsrc.data[name]));
                }
                form.submit();
            }
        };

    }));
