
const formatNumber = n => {
	n = n.toString()
	return n[1] ? n : '0' + n
}

const getDay = (time) => {
	const date = new Date(time)
	const year = date.getFullYear()
	const month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
	const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
	return year + '/' + month + '/' + day
}

const fileSize = (value) => {
	if (null == value || value == '') {
		return "0 Bytes";
	}
	const unitArr = new Array("Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB");
	const index = 0;
	const srcsize = parseFloat(value);
	index = Math.floor(Math.log(srcsize) / Math.log(1024));
	const size = srcsize / Math.pow(1024, index);
	size = size.toFixed(2);
	return size + unitArr[index];
}

// 使用 let fmtDate = formatDatetime(date, 'yyyy-MM-dd hh:mm:ss')
const formatDatetime = (date, fmt) => {
	date = new Date(date)
	if (/(y+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length))
	}

	let obj = {
		"M+": date.getMonth() + 1,
		"d+": date.getDay(),
		"h+": date.getHours(),
		"m+": date.getMinutes(),
		"s+": date.getSeconds()
	}

	for (let key in obj) {
		if (new RegExp(`(${key})`).test(fmt)) {
			let str = obj[key] + ''
			fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str))
		}
	}
	return fmt
}

const padLeftZero = (str) => {
	return ("00" + str).substr(str.length)
}
//数组排序
const compare = function(property) {
	return function(a, b) {
		const value1 = a[property];
		const value2 = b[property];
		return value1 - value2
	}
}

const getUrlParam = (name)=>{
	const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	const r = window.location.search.substr(1).match(reg);
	if (r != null) {
					return unescape(r[2]);
	}
	return null;
}
const back = (config) => {
	let prevPageData = config.prevPageData
	let delta = config.delta || 1
	if (prevPageData) {
		let pages = getCurrentPages()
		let prevPage = pages[pages.length - (delta + 1)]
		prevPage.setData(config.prevPageData)
	}
	return uni.navigateBack(config)
}

const msg = (title, duration = 1500, mask = false, icon = 'none') => {
	//统一提示方便全局修改
	if (Boolean(title) === false) {
		return;
	}
	return new uni.showToast({
		title,
		duration,
		mask,
		icon,
	});
}

const getRandom = () => {
	var d = new Date().getTime();
	if (window.performance && typeof window.performance.now === "function") {
		d += performance.now(); //use high-precision timer if available
	}
	const uuid = 'xxxxxxxx_x2xx_13xxx_xxx'.replace(/[xy]/g, function(c) {
		var r = (d + Math.random() * 16) % 16 | 0;
		d = Math.floor(d / 16);
		return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
	});
	return uuid;
}

const setupAppUpdateListener = ()=> {
    let updateManager = null
    if (wx.getUpdateManager) {
      updateManager = wx.getUpdateManager()
    } else {
      return
    }

    updateManager.onCheckForUpdate(function (res) {

    });

    updateManager.onUpdateReady(function () {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        confirmText: '重 启',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        }
      });
    });

    updateManager.onUpdateFailed(function () {
      // 新的版本下载失败
      //console.error("新的版本下载失败！");
    });
}

module.exports = {
	msg,
	back,
	getDay,
	fileSize,
	formatDatetime,
	compare,
	getRandom,
	getUrlParam,
	setupAppUpdateListener
}
