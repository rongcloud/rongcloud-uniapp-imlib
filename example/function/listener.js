// 添加监听

import {
	addConnectionStatusListener
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
}

export default initListener