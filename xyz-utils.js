var XyzUtils = {
    sliceList : function(arr, size) {
        var newArr = [];
        if (arr && arr.length) {
            for (var i = 0; i < arr.length; i += size) {
                newArr.push(arr.slice(i, i + size));
            }
        }
        return newArr;
    },
    stringFormat : function(format) {
        var args = arguments;
        return format.replace(/\{(\d+)\}/g, function(m, i) {
            var argsIndex = parseInt(i) + 1;
            return args[argsIndex];
        });
    },
    base64Encode : function(str) {
        var BASE_64_ENCODE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        var c1, c2, c3;
        var len = str.length;
        var i = 0;
        var out = "";
        while (i < len) {
            c1 = str.charCodeAt(i++) & 0xff;
            if (i == len) {
                out += BASE_64_ENCODE_CHARS.charAt(c1 >> 2);
                out += BASE_64_ENCODE_CHARS.charAt((c1 & 0x3) << 4);
                out += "==";
                break;
            }
            c2 = str.charCodeAt(i++);
            if (i == len) {
                out += BASE_64_ENCODE_CHARS.charAt(c1 >> 2);
                out += BASE_64_ENCODE_CHARS.charAt(((c1 & 0x3) << 4) | ((c2 & 0xf0) >> 4));
                out += BASE_64_ENCODE_CHARS.charAt((c2 & 0xf) << 2);
                out += "=";
                break;
            }
            c3 = str.charCodeAt(i++);
            out += BASE_64_ENCODE_CHARS.charAt(c1 >> 2);
            out += BASE_64_ENCODE_CHARS.charAt(((c1 & 0x3) << 4) | ((c2 & 0xf0) >> 4));
            out += BASE_64_ENCODE_CHARS.charAt(((c2 & 0xf) << 2) | ((c3 & 0xc0) >> 6));
            out += BASE_64_ENCODE_CHARS.charAt(c3 & 0x3f);
        }
        return out;
    },
    queryString : function(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return unescape(r[2]);
        }
        return null;
    },
    escapeHtml : function(str) {
        if (str) {
            return str.replace(/</g, "&lt;").replace(/>/g, "&gt;");
        }
        return str;
    },
    nullToDef : function(obj, def) {
        if (obj) {
            return obj;
        }
        return def;
    },
    trim : function(str) {
        if (!str) {
            return "";
        }
        return str.replace(/(^\s*)|(\s*$)/g, "");
    },
    isBlank : function(str) {
        return (!obj || XyzUtils.trim(obj) === "");
    }
};