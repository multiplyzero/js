$(function() {
    if (window.XyzPager) {
        return;
    }
    window.XyzPager = {
        simplePage : function(that, pager, click_fun) {
            if (!pager) {
                return;
            }

            var cpage = pager.currPage;
            var totalPage = pager.totalPage;

            var html = '<div class="xyz-pager" data-cpage="#cpage#" data-totalpage="#totalPage#">'
                    + '<a class="page_last_yes" pageNum="#lastNum#" href="javascript:void(0)">Prev</a>'
                    + '<a class="page_next_yes" pageNum="#nextNum#" href="javascript:void(0)">Next</a>' + '</div>';

            var str = html.replace(/#cpage#/g, cpage).replace(/#totalPage#/g, totalPage).replace(/#total#/g, total).replace(/#lastNum#/g, cpage - 1).replace(/#nextNum#/g,
                    cpage + 1);

            that.html(str);

            $(".xyz-pager a", that).off('click').on('click', function() {
                if (click_fun) {
                    var clickPage = $(this).attr("pageNum");
                    if (clickPage > 0 && clickPage <= totalPage) {
                        click_fun(clickPage);
                        window.scrollTo(0, 0);
                    }
                }
                return false;
            });
        },
        page : function(that, pager, click_fun) {
            if (!pager) {
                return;
            }

            var currPage = parseInt(pager.currPage);
            var totalPage = parseInt(pager.totalPage);

            var PREV = "Prev";
            var NEXT = "Next";

            var PAGE_BEGIN = '<div class="xyz-pager" data-cpage="{0}" data-totalpage="{1}">';
            var PAGE_END = '</div>';
            var PAGE_LAST_YES = '<a class="page_last_yes" href="javascript:void(0)" data-page="{0}">{1}</a>';
            var PAGE_LAST_NO = '<span class="page_last_no">{0}</span>';
            var PAGE_NEXT_YES = '<a class="page_next_yes" href="javascript:void(0)" data-page="{0}">{1}</a>';
            var PAGE_NEXT_NO = '<span class="page_next_no">{0}</span>';
            var PAGE_YES = '<span class="page_yes">{0}</span>';
            var PAGE_NO = '<a class="page_no" href="javascript:void(0)" data-page="{0}">{1}</a>';
            var PAGE_MORE = '<span class="page_more">…</span>';

            var sb = "";

            sb += messageFormat(PAGE_BEGIN, currPage, totalPage);

            if (currPage <= 1) { // 第一页
                sb += messageFormat(PAGE_LAST_NO, PREV);
            } else {
                sb += messageFormat(PAGE_LAST_YES, currPage - 1, PREV);
            }
            if (totalPage < 8) {
                for (var j = 1; j < totalPage + 1; j++) {
                    if (j == currPage) {
                        sb += messageFormat(PAGE_YES, j);
                    } else {
                        sb += messageFormat(PAGE_NO, j, j);
                    }
                }
            } else {
                if (currPage < 6) {// 第一种条件，当前条小于6
                    for (var j = 1; j < 7; j++) {
                        if (j == currPage) {
                            sb += messageFormat(PAGE_YES, j);
                        } else {
                            sb += messageFormat(PAGE_NO, j, j);
                        }
                    }
                    sb += PAGE_MORE;
                    sb += messageFormat(PAGE_NO, totalPage, totalPage);
                } else if (currPage >= 5 && (totalPage - currPage) <= 5) {// 显示前面...
                    sb += messageFormat(PAGE_NO, 1, 1);
                    sb += PAGE_MORE;
                    for (var j = (totalPage - 5); j < (totalPage + 1); j++) {
                        if (j == currPage) {
                            sb += messageFormat(PAGE_YES, j);
                        } else {
                            sb += messageFormat(PAGE_NO, j, j);
                        }
                    }

                } else {// 二头都加...
                    sb += messageFormat(PAGE_NO, 1, 1);
                    sb += (PAGE_MORE);
                    for (var j = (currPage - 2); j < (currPage + 3); j++) {
                        if (j == currPage) {
                            sb += messageFormat(PAGE_YES, j);
                        } else {
                            sb += messageFormat(PAGE_NO, j, j);
                        }
                    }
                    sb += PAGE_MORE;
                    sb += messageFormat(PAGE_NO, totalPage, totalPage);
                }

            }

            if (currPage == totalPage || totalPage == 0) {// 末页去掉连接
                sb += messageFormat(PAGE_NEXT_NO, NEXT);
            } else {
                sb += messageFormat(PAGE_NEXT_YES, currPage + 1, NEXT);
            }

            sb += (PAGE_END);

            that.html(sb);

            $(".xyz-pager a", that).off('click').on('click', function() {
                if (click_fun) {
                    var clickPage = $(this).attr("data-page");
                    if (clickPage > 0 && clickPage <= totalPage) {
                        click_fun(clickPage);
                        window.scrollTo(0, 0);
                    }
                }
                return false;
            });
        }
    };

    $(".xyz-pager .page_skip .page_skip_btn").click(function() {
        var $btn = $(this);
        var $pager = $btn.closest(".xyz-pager");
        var $sup = $btn.closest(".page_skip").find(".page_sup");

        var formatUrl = $sup.attr("data-url");
        var cpage = parseInt($pager.attr("data-cpage"));
        var totalpage = parseInt($pager.attr("data-totalpage"));
        var pageinput = $sup.find("input").val();

        if (isNaN(pageinput)) {
            pageinput = cpage;
        } else if (pageinput > totalpage) {
            pageinput = totalpage;
        } else if (pageinput <= 0) {
            pageinput = 1;
        }

        window.location.href = messageFormat(formatUrl, pageinput);
    });

    function messageFormat(format) {
        var args = arguments;
        return format.replace(/\{(\d+)\}/g, function(m, i) {
            return args[parseInt(i) + 1];
        });
    }
});