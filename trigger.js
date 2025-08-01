// ==UserScript==
// @name         trigger
// @namespace    http://tampermonkey.net/
// @version      2.0
// @description  try to take over the world!
// @author       0x8ubb1e
// @match        *://*
// @match        *://*/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function () {
	'use strict';

	// 定义需要打开的 URL 列表
	const urls = [
		"http://example.com/page1",
		"http://example.com/page2",
		"http://example.com/page3"
	];

	// 定义触发时间点（24小时制，小时:分钟）
	const triggerTimes = [
		"00:01",
		"10:00",
		"14:30"
	];

	// 用于存储已经打开的 URL
	const openedUrls = new Set();

	// 检查是否已经打开了某个 URL
	function isOpened (url) {
		return openedUrls.has(url);
	}

	// 标记某个 URL 为已打开
	function markAsOpened (url) {
		openedUrls.add(url);
	}

	// 清空已打开的 URL 记录（每天凌晨清空）
	function clearOpenedUrls () {
		openedUrls.clear();
	}

	// 打开 URL 列表中的所有 URL
	function openUrls () {
		urls.forEach(url => {
			if (!isOpened(url)) {
				window.open(url, '_blank');
				markAsOpened(url);
			}
		});
	}

	// 设置定时任务
	function scheduleTasks () {
		const now = new Date();
		const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

		triggerTimes.forEach(timeStr => {
			const [hours, minutes] = timeStr.split(':').map(Number);
			const targetTime = new Date(today);
			targetTime.setHours(hours, minutes, 0, 0);

			// 如果目标时间已经过去，设置为明天
			if (now > targetTime) {
				targetTime.setDate(targetTime.getDate() + 1);
			}

			const delay = targetTime - now;

			setTimeout(() => {
				openUrls();
				// 设置下一次执行（每天）
				scheduleTasks();
			}, delay);
		});
	}

	// 清空已打开的 URL 记录（每天凌晨清空）
	function setupDailyReset () {
		const now = new Date();
		const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
		const delay = tomorrow - now;

		setTimeout(() => {
			clearOpenedUrls();
			setupDailyReset();
		}, delay);
	}

	// 初始化
	setupDailyReset();
	scheduleTasks();
})();
