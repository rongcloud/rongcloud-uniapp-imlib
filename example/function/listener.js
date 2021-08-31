// 添加监听

import {
	addConnectionStatusListener,
	addLogInfoListener,
	addRecallMessageListener,
	addTypingStatusListener,
	// addPushArrivedListener,
	addReceiveMessageListener,
	addReadReceiptReceivedListener,
	addReceiptRequestListener,
	addReceiptResponseListener
} from "@rongcloud/imlib-uni"
import { addSuccessResult, addErrorResult, addWarnResult, addPrimaryResult } from '../util/common.js'
import _global from '../config/global.js'

const initListener = function() {
	console.log('初始化监听')
	addConnectionStatusListener((res) => {
		addPrimaryResult({
			title: 'connection status change',
			data: res,
			code: res.status
		})
	})
	
	addLogInfoListener((res) => {
		addPrimaryResult({
			title: 'loginfo listener',
			data: res,
		})
	})
	
	addRecallMessageListener((res) => {
		addPrimaryResult({
			title: 'recall message listener',
			data: res,
		})
	})
	
	addTypingStatusListener((res) => {
		addPrimaryResult({
			title: 'typing status listener',
			data: res,
		})
	})
	
	// addPushArrivedListener((res) => {
	// 	addPrimaryResult({
	// 		title: 'typing status listener',
	// 		data: res,
	// 	})
	// })
	
	addReceiveMessageListener((res) => {
		_global.lastReceivedMsg = res.data.message
		addPrimaryResult({
			title: 'receive new Message',
			data: res,
		})
	})
	
	addReadReceiptReceivedListener(
		(res) => {
			addPrimaryResult({
				title: '收到私聊阅读回执',
				data: res
			})
		}
	)
	
	addReceiptRequestListener(
		(res) => {
			_global.lastReadReceiptRequestMsg = res.data
			addPrimaryResult({
				title: '收到消息已读回执请求',
				data: res
			})
		}
	)
	
	addReceiptResponseListener(
		(res) => {
			addPrimaryResult({
				title: '收到消息回执响应',
				data: res
			})
		}
	)
}

export default initListener