const Tools = {
  /**************************  正则表达式  **************************/
    isPhone:function(val){
      if(!(/^1[34578]\d{9}$/.test(val))){
        return false
      }
      return true
    },
    isIdCard:function(val){
      if(!(/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{4}$/.test(val))&&!(/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/.test(val))){
        return false
      }
      return true
    },
  /**************************  正则表达式  **************************/
  /**************************  日期时间类型工具函数  **************************/
    /*@param date 时间戳*/
    /*@param format 时间格式  'yyyy-MM-dd hh:mm:ss' */
    /*@return 格式化日期时间描述 */
    dateFormat:function(date,format){
      if(!format || typeof format !== 'string'){
          console.error('format is undefiend or type is Error');
          return '';
        }
        date = date instanceof Date? date : (typeof date === 'number'|| typeof date === 'string')? new Date(date): new Date();
        //解析
        let formatReg = {
          'y+': date.getFullYear(),
          'M+': date.getMonth()+1,
          'd+': date.getDate(),
          'h+': date.getHours(),
          'm+': date.getMinutes(),
          's+': date.getSeconds()
        }
        for(let reg in formatReg){
          if(new RegExp(reg).test(format)){
                let match = RegExp.lastMatch;
                format = format.replace(match, formatReg[reg]< 10 ? '0'+formatReg[reg]: formatReg[reg].toString() );
          }
        }
        return format;
    },

    /*@param date 时间戳*/
    /*@return 语义化的时间描述：'n月前'/'n周前'/'n天前'/'n小时前'/'n分钟前'/'刚刚' */
    formatMsgTime:function(date){  //格式化时间戳
        let result;
        let timePublish = new Date(date);
        let timeNow = Math.round(new Date().getTime()/1000);
        let minute = 1 * 60;
        let hour = minute * 60;
        let day = hour * 24;
        let month = day * 30;
        let diffValue = timeNow - data;
        let diffMonth = diffValue / month;
        let diffWeek = diffValue / (7 * day);
        let diffDay = diffValue / day;
        let diffHour = diffValue / hour;
        let diffMinute = diffValue / minute;
        if (diffMonth > 3) {
            result = timePublish.getFullYear() + "-";
            result += timePublish.getMonth() + "-";
            result += timePublish.getDate();
        }
        else if (diffMonth > 1) {
            result = parseInt(diffMonth) + "月前";
        }
        else if (diffWeek > 1) {
            result = parseInt(diffWeek) + "周前";
        }
        else if (diffDay > 1) {
            result = parseInt(diffDay) + "天前";
        }
        else if (diffHour > 1) {
            result = parseInt(diffHour) + "小时前";
        }
        else if (diffMinute > 1) {
            result = parseInt(diffMinute) + "分钟前";
        }
        else {
            result = "刚刚";
        }
        return result;
    },
  /**************************  日期时间类型工具函数  **************************/

  /**************************  变量类型检测  **************************/
    isNumber: function(value) {
        return Object.prototype.toString.call(value) == '[object Number]'
    },
    isString: function(value) {
        return Object.prototype.toString.call(value) == '[object String]'
    },
    isArray: function(value) {
        return Object.prototype.toString.call(value) == '[object Array]'
    },
    isBoolean: function(value) {
        return Object.prototype.toString.call(value) == '[object Boolean]'
    },
    isUndefined:function (value) {
        return value === undefined
    },
    isNull: function (value) {
        return value === null
    },
    isSymbol: function (value) {
        return Object.prototype.toString.call(value) == '[object Symbol]'
    },
    isObject: function (value) {
        return ( Object.prototype.toString.call(value) == '[object Object]'
         ||
            // if it isn't a primitive value, then it is a common object
            (
              !isNumber(value) &&
              !isString(value) &&
              !isBoolean(value) &&
              !isArray(value) &&
              !isNull(value) &&
              !isFunction(value) &&
              !isUndefined(value) &&
              !isSymbol(value)
            )
        )
    },
    //是否是一个空对象
    isEmptyObject: function(obj) {
        if(!this.isObject(obj)) {
          return false
        }
        for (let key in obj) {
          return false
        }
        return true
    },
    //是否是一个空数组
    isEmptyArray: function (array) {
        if(!isArray(array)) {
            return false
        }
        return array.length > 0 ? false : true
    },
    isFunction: function (value) {
      return Object.prototype.toString.call(value) == '[object Function]';
    },
  /**************************  变量类型检测  *************************/

  /**************************  银行卡工具函数  *************************/
    /*@param bank 银行卡所属银行简称，例如CCB/ICBC/....*/
    /*@return bankname 银行卡所属银行中文名称 */
    bankName: function (bank){
      let bankname;
      switch (bank) {
         case "SRCB":bankname="深圳农村商业银行";break;
         case "BGB":bankname="广西北部湾银行";break;
         case "SHRCB":bankname="上海农村商业银行";break;
         case "BJBANK":bankname="北京银行";break;
         case "WHCCB":bankname="威海市商业银行";break;
         case "BOZK":bankname="周口银行";break;
         case "KORLABANK":bankname="库尔勒市商业银行";break;
         case "SPABANK":bankname="平安银行";break;
         case "SDEB":bankname="顺德农商银行";break;
         case "HURCB":bankname="湖北省农村信用社";break;
         case "WRCB":bankname="无锡农村商业银行";break;
         case "BOCY":bankname="朝阳银行";break;
         case "CZBANK":bankname="浙商银行";break;
         case "HDBANK":bankname="邯郸银行";break;
         case "BOC":bankname="中国银行";break;
         case "BOD":bankname="东莞银行";break;
         case "CCB":bankname="中国建设银行";break;
         case "ZYCBANK":bankname="遵义市商业银行";break;
         case "SXCB":bankname="绍兴银行";break;
         case "GZRCU":bankname="贵州省农村信用社";break;
         case "ZJKCCB":bankname="张家口市商业银行";break;
         case "BOJZ":bankname="锦州银行";break;
         case "BOP":bankname="平顶山银行";break;
         case "HKB":bankname="汉口银行";break;
         case "SPDB":bankname="上海浦东发展银行";break;
         case "NXRCU":bankname="宁夏黄河农村商业银行";break;
         case "NYNB":bankname="广东南粤银行";break;
         case "GRCB":bankname="广州农商银行";break;
         case "BOSZ":bankname="苏州银行";break;
         case "HZCB":bankname="杭州银行";break;
         case "HSBK":bankname="衡水银行";break;
         case "HBC":bankname="湖北银行";break;
         case "JXBANK":bankname="嘉兴银行";break;
         case "HRXJB":bankname="华融湘江银行";break;
         case "BODD":bankname="丹东银行";break;
         case "AYCB":bankname="安阳银行";break;
         case "EGBANK":bankname="恒丰银行";break;
         case "CDB":bankname="国家开发银行";break;
         case "TCRCB":bankname="江苏太仓农村商业银行";break;
         case "NJCB":bankname="南京银行";break;
         case "ZZBANK":bankname="郑州银行";break;
         case "DYCB":bankname="德阳商业银行";break;
         case "YBCCB":bankname="宜宾市商业银行";break;
         case "SCRCU":bankname="四川省农村信用";break;
         case "KLB":bankname="昆仑银行";break;
         case "LSBANK":bankname="莱商银行";break;
         case "YDRCB":bankname="尧都农商行";break;
         case "CCQTGB":bankname="重庆三峡银行";break;
         case "FDB":bankname="富滇银行";break;
         case "JSRCU":bankname="江苏省农村信用联合社";break;
         case "JNBANK":bankname="济宁银行";break;
         case "CMB":bankname="招商银行";break;
         case "JINCHB":bankname="晋城银行JCBANK";break;
         case "FXCB":bankname="阜新银行";break;
         case "WHRCB":bankname="武汉农村商业银行";break;
         case "HBYCBANK":bankname="湖北银行宜昌分行";break;
         case "TZCB":bankname="台州银行";break;
         case "TACCB":bankname="泰安市商业银行";break;
         case "XCYH":bankname="许昌银行";break;
         case "CEB":bankname="中国光大银行";break;
         case "NXBANK":bankname="宁夏银行";break;
         case "HSBANK":bankname="徽商银行";break;
         case "JJBANK":bankname="九江银行";break;
         case "NHQS":bankname="农信银清算中心";break;
         case "MTBANK":bankname="浙江民泰商业银行";break;
         case "LANGFB":bankname="廊坊银行";break;
         case "ASCB":bankname="鞍山银行";break;
         case "KSRB":bankname="昆山农村商业银行";break;
         case "YXCCB":bankname="玉溪市商业银行";break;
         case "DLB":bankname="大连银行";break;
         case "DRCBCL":bankname="东莞农村商业银行";break;
         case "GCB":bankname="广州银行";break;
         case "NBBANK":bankname="宁波银行";break;
         case "BOYK":bankname="营口银行";break;
         case "SXRCCU":bankname="陕西信合";break;
         case "GLBANK":bankname="桂林银行";break;
         case "BOQH":bankname="青海银行";break;
         case "CDRCB":bankname="成都农商银行";break;
         case "QDCCB":bankname="青岛银行";break;
         case "HKBEA":bankname="东亚银行";break;
         case "HBHSBANK":bankname="湖北银行黄石分行";break;
         case "WZCB":bankname="温州银行";break;
         case "TRCB":bankname="天津农商银行";break;
         case "QLBANK":bankname="齐鲁银行";break;
         case "GDRCC":bankname="广东省农村信用社联合社";break;
         case "ZJTLCB":bankname="浙江泰隆商业银行";break;
         case "GZB":bankname="赣州银行";break;
         case "GYCB":bankname="贵阳市商业银行";break;
         case "CQBANK":bankname="重庆银行";break;
         case "DAQINGB":bankname="龙江银行";break;
         case "CGNB":bankname="南充市商业银行";break;
         case "SCCB":bankname="三门峡银行";break;
         case "CSRCB":bankname="常熟农村商业银行";break;
         case "SHBANK":bankname="上海银行";break;
         case "JLBANK":bankname="吉林银行";break;
         case "CZRCB":bankname="常州农村信用联社";break;
         case "BANKWF":bankname="潍坊银行";break;
         case "ZRCBANK":bankname="张家港农村商业银行";break;
         case "FJHXBC":bankname="福建海峡银行";break;
         case "ZJNX":bankname="浙江省农村信用社联合社";break;
         case "LZYH":bankname="兰州银行";break;
         case "JSB":bankname="晋商银行";break;
         case "BOHAIB":bankname="渤海银行";break;
         case "CZCB":bankname="浙江稠州商业银行";break;
         case "YQCCB":bankname="阳泉银行";break;
         case "SJBANK":bankname="盛京银行";break;
         case "XABANK":bankname="西安银行";break;
         case "BSB":bankname="包商银行";break;
         case "JSBANK":bankname="江苏银行";break;
         case "FSCB":bankname="抚顺银行";break;
         case "HNRCU":bankname="河南省农村信用";break;
         case "COMM":bankname="交通银行";break;
         case "XTB":bankname="邢台银行";break;
         case "CITIC":bankname="中信银行";break;
         case "HXBANK":bankname="华夏银行";break;
         case "HNRCC":bankname="湖南省农村信用社";break;
         case "DYCCB":bankname="东营市商业银行";break;
         case "ORBANK":bankname="鄂尔多斯银行";break;
         case "BJRCB":bankname="北京农村商业银行";break;
         case "XYBANK":bankname="信阳银行";break;
         case "ZGCCB":bankname="自贡市商业银行";break;
         case "CDCB":bankname="成都银行";break;
         case "HANABANK":bankname="韩亚银行";break;
         case "CMBC":bankname="中国民生银行";break;
         case "LYBANK":bankname="洛阳银行";break;
         case "GDB":bankname="广东发展银行";break;
         case "ZBCB":bankname="齐商银行";break;
         case "CBKF":bankname="开封市商业银行";break;
         case "H3CB":bankname="内蒙古银行";break;
         case "CIB":bankname="兴业银行";break;
         case "CRCBANK":bankname="重庆农村商业银行";break;
         case "SZSBK":bankname="石嘴山银行";break;
         case "DZBANK":bankname="德州银行";break;
         case "SRBANK":bankname="上饶银行";break;
         case "LSCCB":bankname="乐山市商业银行";break;
         case "JXRCU":bankname="江西省农村信用";break;
         case "ICBC":bankname="中国工商银行";break;
         case "JZBANK":bankname="晋中市商业银行";break;
         case "HZCCB":bankname="湖州市商业银行";break;
         case "NHB":bankname="南海农村信用联社";break;
         case "XXBANK":bankname="新乡银行";break;
         case "JRCB":bankname="江苏江阴农村商业银行";break;
         case "YNRCC":bankname="云南省农村信用社";break;
         case "ABC":bankname="中国农业银行";break;
         case "GXRCU":bankname="广西省农村信用";break;
         case "PSBC":bankname="中国邮政储蓄银行";break;
         case "BZMD":bankname="驻马店银行";break;
         case "ARCU":bankname="安徽省农村信用社";break;
         case "GSRCU":bankname="甘肃省农村信用";break;
         case "LYCB":bankname="辽阳市商业银行";break;
         case "JLRCU":bankname="吉林农信";break;
         case "URMQCCB":bankname="乌鲁木齐市商业银行";break;
         case "XLBANK":bankname="中山小榄村镇银行";break;
         case "CSCB":bankname="长沙银行";break;
         case "JHBANK":bankname="金华银行";break;
         case "BHB":bankname="河北银行";break;
         case "NBYZ":bankname="鄞州银行";break;
         case "LSBC":bankname="临商银行";break;
         case "BOCD":bankname="承德银行";break;
         case "SDRCU":bankname="山东农信";break;
         case "NCB":bankname="南昌银行";break;
         case "TCCB":bankname="天津银行";break;
         case "WJRCB":bankname="吴江农商银行";break;
         case "CBBQS":bankname="城市商业银行资金清算中心";break;
         case "HBRCU":bankname="河北省农村信用社";break;
         default:break;
      }
      return bankname;
    },
    /*@param bank 银行卡类型简称，例如CC/DC/....*/
    /*@return cardType 银行卡类型中文描述 */
    cardType: function(bank){
      let cardtype;
      switch (bank) {
        case "DC":cardtype="储蓄卡";break;
        case "CC":cardtype="信用卡";break;
        default:cardtype="银行卡";break;
      }
      return cardtype;
    }
  /**************************  银行卡工具函数  *************************/
}
module.exports = Tools;
