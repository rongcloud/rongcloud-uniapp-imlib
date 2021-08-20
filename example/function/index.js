
import { rcInit, rcConnect, rcDisconnect } from "./base.js"
import { rcGetConversationList } from './conversation.js'

export default [
	{
		title: '基础接口',
		list: [
			rcInit,
			rcConnect,
			rcDisconnect
		]
	},
	{
		title: '会话接口',
		list: [
			rcGetConversationList
		]
	}
]