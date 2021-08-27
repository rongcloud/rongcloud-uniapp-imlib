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
} from "../../dist"
import { addSuccessResult, addErrorResult, addWarnResult, addPrimaryResult } from '../util/common.js'
import _global from '../config/global.js'

const initListener = function() {
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