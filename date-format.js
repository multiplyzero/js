(function (global) {
    var dateUtils = function () {
		return new dateUtils();
    };

    /**
     * fmt example "yyyy-MM-dd HH:mm:ss"
     */
    dateUtils.format = function (date, fmt) {
        var o = {
            "M+" : date.getMonth() + 1,
            "d+" : date.getDate(),
            "H+" : date.getHours(),
            "m+" : date.getMinutes(),
            "s+" : date.getSeconds(),
            "q+" : Math.floor((date.getMonth() + 3) / 3),
            "S" : date.getMilliseconds()
        };
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            }
        }
        return fmt;
    };

    dateUtils.parseFormat = function (timeStr, fmt) {
        var regStr = function (r) {
            var reg = new RegExp(r, 'g');
            if (reg.test(fmt)) {
                var end = reg.lastIndex;
                var len = RegExp.$1.length;
                var str = timeStr.substr(end - len, len);
                return str;
            }
        };

        var year = regStr("(y+)");
        var month = regStr("(M+)");
        var day = regStr("(d+)");
        var hour = regStr("(H+)");
        var min = regStr("(m+)");
        var sec = regStr("(s+)");

        return {
            year : year,
            month : month,
            day : day,
            hour : hour,
            min : min,
            sec : sec
        };
    };

    /**
     * fmt example "yyyy-MM-dd HH:mm:ss"
     */
    dateUtils.parseToDate = function (timeStr, fmt) {
        var format = this.parseFormat(timeStr, fmt);
        var date = new Date();
        date.setFullYear(format.year);
        date.setMonth(format.month - 1);
        date.setDate(format.day);
        date.setHours(format.hour);
        date.setMinutes(format.min);
        date.setSeconds(format.sec);
        return date;
    };
	
	/**
	 * default server time zone : GMT+0800 (China Standard Time)
	 */
	dateUtils.SERVER_TIME_ZONE = +8;

    dateUtils.setServerTimeZone = function (serverTimeZone) {
        this.SERVER_TIME_ZONE = serverTimeZone;
    };
    dateUtils.getServerTimeZone = function () {
        return this.SERVER_TIME_ZONE;
    };

    dateUtils.serverDateToUTCDate = function (serverDate) {
        return new Date(serverDate.getTime() - this.SERVER_TIME_ZONE * 60 * 60 * 1000);
    };

    /**
     * fmt example "yyyy-MM-dd HH:mm:ss"
     */
    dateUtils.parseServerToUTCDate = function (timeStr, fmt) {
        var format = this.parseFormat(timeStr, fmt);
        var date = new Date();
        date.setUTCFullYear(format.year);
        date.setUTCMonth(format.month - 1);
        date.setUTCDate(format.day);
        date.setUTCHours(format.hour);
        date.setUTCMinutes(format.min);
        date.setUTCSeconds(format.sec);
        return this.serverDateToUTCDate(date);
    };

    global.$dateUtils = dateUtils;
})(this);
