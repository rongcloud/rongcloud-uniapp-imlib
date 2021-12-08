/**
 * 应用配置
 */
const userList = [
	{
		appkey: '请替换为您申请的appkey',
		userId: '请替换为该token的id',
		token: '请替换为您使用此 id 申请的 token',
	},
]

const config = {
	appkey: userList[0].appkey,
	token: userList[0].token,
	userId: '',
	targetId: 'user001',
	navi: '',
	conversationType: 1,
	// 可选择的登录账号
	userList: userList,
	// 发消息时可选择的 targetId, 获取会话列表后会覆盖
	targetIdList: [
		{
			label: 'user001',
			value: 'user001'
		},{
			label: 'user002',
			value: 'user002'
		},{
			label: 'user003',
			value: 'user003'
		},{
			label: 'group001',
			value: 'group001'
		}
	]
}
export default config


export const conversationTypeList = [
	{
		label: '单聊',
		value: 1
	},
	{
		label: '群组',
		value: 3
	},
	{
		label: '聊天室',
		value: 4
	}
]

