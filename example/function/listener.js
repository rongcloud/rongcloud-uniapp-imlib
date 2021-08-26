// 添加监听

import {
	addConnectionStatusListener,
	addLogInfoListener,
	addRecallMessageListener,
	addTypingStatusListener,
	// addPushArrivedListener,
	addReceiveMessageListener
} from "../../dist"
import { addSuccessResult, addErrorResult, addWarnResult, addPrimaryResult } from '../util/common.js'

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
		addPrimaryResult({
			title: 'receive new Message',
			data: res,
		})
	})
}

export default initListener