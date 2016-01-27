(function(global) {
    function DateUtils() {
        /**
         * default server time zone : GMT+0800 (China Standard Time)
         */
        var SERVER_TIME_ZONE = +8;

        this.setServerTimeZone = function(serverTimeZone) {
            SERVER_TIME_ZONE = serverTimeZone;
        };
        this.getServerTimeZone = function() {
            return SERVER_TIME_ZONE;
        };
    }

    DateUtils.trim = function(text) {
        return text == null ? "" : text.toString().replace(/^\s+/, "").replace(/\s+$/, "");
    };

    /**
     * fmt example "yyyy-MM-dd HH:mm:ss"
     */
    DateUtils.prototype.format = function(date, fmt) {
        fmt = DateUtils.trim(fmt);
        var o = {
            "M+" : date.getMonth() + 1,
            "d+" : date.getDate(),
            "H+" : date.getHours(),
            "m+" : date.getMinutes(),
            "s+" : date.getSeconds()
        };
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        for ( var k in o) {
            if (new RegExp("(" + k + ")").test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            }
        }
        return fmt;
    };

    DateUtils.prototype.parseFormat = function(timeStr, fmt) {
        timeStr = DateUtils.trim(timeStr);
        fmt = DateUtils.trim(fmt);
        var regStr = function(r) {
            var reg = new RegExp(r, 'g');
            if (reg.test(fmt)) {
                var end = reg.lastIndex;
                var len = RegExp.$1.length;
                var str = timeStr.substr(end - len, len);
                return str;
            }
        };

        var o = {
            year : "y+",
            month : "M+",
            day : "d+",
            hour : "H+",
            min : "m+",
            sec : "s+"
        };

        for ( var k in o) {
            var r = "(" + o[k] + ")";
            o[k] = regStr(r) || 0;
        }

        return o;
    };

    /**
     * fmt example "yyyy-MM-dd HH:mm:ss"
     */
    DateUtils.prototype.parseToDate = function(timeStr, fmt) {
        timeStr = DateUtils.trim(timeStr);
        fmt = DateUtils.trim(fmt);
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

    DateUtils.prototype.serverDateToUTCDate = function(serverDate) {
        return new Date(serverDate.getTime() - this.getServerTimeZone() * 60 * 60 * 1000);
    };

    /**
     * fmt example "yyyy-MM-dd HH:mm:ss"
     */
    DateUtils.prototype.parseServerToUTCDate = function(timeStr, fmt) {
        timeStr = DateUtils.trim(timeStr);
        fmt = DateUtils.trim(fmt);
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

    global.$dateUtils = new DateUtils();
})(this);