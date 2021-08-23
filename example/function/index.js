
import { rcInit, rcConnect, rcDisconnect } from "./base.js"
import { rcGetConversationList } from './conversation.js'
import { setTestConfig, clearTestConfig } from './testConfig.js'

export default [
	{
		title: '配置',
		list: [
			setTestConfig,
			clearTestConfig
		]
	},
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