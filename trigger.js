// ==UserScript==
// @name         trigger
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  try to take over the world!
// @author       0x8ubb1e
// @match        *://*
// @match        *://*/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function() {
	'use strict';

	// Your code here...
	const urls = [
		"https://18comic.vip/user/kafka97083/daily",
		"https://www.wwlib.cn/index.php/wuwen",
		"https://acgfun.art/plugin.php?id=k_misign:sign"
		// "https://acgfun.moe/plugin.php?id=k_misign:sign"
	];

	// 在浏览器扩展的后台脚本中使用
	function openWebsiteDaily() {
		const now = new Date();
		const targetTime = new Date();
		targetTime.setHours(13, 30, 0, 0); // 每天13:30:00.000

		// 如果今天已经过了目标时间，设置为明天
		if (now > targetTime) {
			targetTime.setDate(targetTime.getDate() + 1);
		}

		const delay = targetTime - now;

		setTimeout(() => {
			urls.forEach(url => {
				window.open(url, '_blank');
			});
			// 设置下一次执行（每天）
			openWebsiteDaily();
		}, delay);
	}

	openWebsiteDaily();
})();
