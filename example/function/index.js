import test from './test.js'
import init from "./init.js"
import connect from "./connect.js"
import getConversationList from "./getConversationList.js"

export default [
	{
		title: '基础接口',
		list: [
			test,
			init,
			connect
		]
	},
	{
		title: '会话接口',
		list: [
			getConversationList
		]
	}
]