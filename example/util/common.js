// 调用列表数据维护
let num = 0
/*
* 数据结构
* {
		title: '获取会话列表', 接口名称
		// status: 1, 状态，0：成功，1：失败，2：基本，3：警告
		code: 0, 返回状态码
		// index: 0, 序号
		data: { 返回数据
			a:1,
			b:2
		}
	}
*/
export let resultList = []

function _add(obj) {
	resultList.unshift({...obj, index: num.toString()})
	num++
}

export function clear() {
	resultList.splice(0, resultList.length)
	num = 0
}

export function addSuccessResult(obj) {
	_add({...obj, status: 0})
}

export function addErrorResult(obj) {
	_add({...obj, status: 1})
}

export function addPrimaryResult(obj) {
	_add({...obj, status: 2})
}

export function addWarnResult(obj) {
	_add({...obj, status: 3})
}