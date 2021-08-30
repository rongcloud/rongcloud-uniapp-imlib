/**
 * 应用配置
 */
const userList = [
	// {
		// appkey: 'appkey',
		// 	userId: 'user001',
		// 	token: '填入token'
	// }
	// ys 的测试账号
	// {
	// 	appkey: 'pvxdm17jpwibr',
	// 	userId: 'user001',
	// 	token: 'H6CWDkr0gQe1/Ur2Mc9iie4NvAylVHKsAYpTpwSJmEg=@4x5h.cn.rongnav.com;4x5h.cn.rongcfg.com'
	// },
	// {
	// 	appkey: 'pvxdm17jpwibr',
	// 	userId: 'user002',
	// 	token: 'H6CWDkr0gQc3RXvVEzx2ZfuEjTbisEOL3exeRYFFJos=@4x5h.cn.rongnav.com;4x5h.cn.rongcfg.com'
	// },
	// {
	// 	appkey: 'pvxdm17jpwibr',
	// 	userId: 'user003',
	// 	token: 'H6CWDkr0gQdZOps3nQAh5oU5whCjR3Iu+Juthpx/05g=@4x5h.cn.rongnav.com;4x5h.cn.rongcfg.com'
	// },
	{
		appkey: 'c9kqb3rdc67wj',
		userId: 'user001',
		token: '09RkeXqm03n1xARq/dpXS7Dd2scKZ+Ct9CceXSQw7yk=@ya5a.cn.rongnav.com;ya5a.cn.rongcfg.com'
	},
	{
		appkey: 'c9kqb3rdc67wj',
		userId: 'user002',
		token: '09RkeXqm03nX/RATSvQTtbDd2scKZ+CtT4Ci+S8Erlw=@ya5a.cn.rongnav.com;ya5a.cn.rongcfg.com'
	},
	{
		appkey: 'c9kqb3rdc67wj',
		userId: 'user003',
		token: '09RkeXqm03lyYmG+Pu2DxLDd2scKZ+CtbhJtHN973uk=@ya5a.cn.rongnav.com;ya5a.cn.rongcfg.com'
	},
	// 测试的测试账号
	{
		appkey: 'c9kqb3rdkbb8j',
		userId: '1522 3ZtU62dax',
		token: 'azA/ndEg2CbGUta9EI+ywzmYg6A8Uml02WdAmU3zn3w=@mwga.dy01-navqa.cn.ronghub.com;mwga.dy02-navqa.cn.ronghub.com',
		navi: 'http://navqa.cn.ronghub.com'
	},
	{
		appkey: 'c9kqb3rdkbb8j',
		userId: '1527 tpy4CL7jr',
		token: 'to+YmmUnBh783cBPLh79nDmYg6A8Uml0PRrolvRBE9Y=@mwga.dy01-navqa.cn.ronghub.com;mwga.dy02-navqa.cn.ronghub.com',
		navi: 'http://navqa.cn.ronghub.com'
	},
	{
		appkey: 'c9kqb3rdkbb8j',
		userId: '1521 qxnwbt720',
		token: 'oZeL8KOtJbempuCyygX1lzmYg6A8Uml0+e8RWfcqVq8=@mwga.dy01-navqa.cn.ronghub.com;mwga.dy02-navqa.cn.ronghub.com',
		navi: 'http://navqa.cn.ronghub.com'
	},
	{
		appkey: 'c9kqb3rdkbb8j',
		userId: '1525 FDM3YOh6U',
		token: 'vuObKTT0nde8F9xH7hLl0DmYg6A8Uml0xGeBxCrdP8A=@mwga.dy01-navqa.cn.ronghub.com;mwga.dy02-navqa.cn.ronghub.com',
		navi: 'http://navqa.cn.ronghub.com'
	},
	{
		appkey: 'c9kqb3rdkbb8j',
		userId: '1523 yvVI74jic',
		token: 'DRITKBFwnIwC2UrP8itMuDmYg6A8Uml0GVQYV3gD5os=@mwga.dy01-navqa.cn.ronghub.com;mwga.dy02-navqa.cn.ronghub.com',
		navi: 'http://navqa.cn.ronghub.com'
	},
	{
		appkey: 'n19jmcy59f1q9',
		userId: '152 jxESosTqe ',
		token: 'DyZvdybB2or5m+3t8APZO+F+lwb3rejuxOPiTcMA+OE=@h4mx.cn.rongnav.com;h4mx.cn.rongcfg.com '
	},
	{
		appkey: 'n19jmcy59f1q9',
		userId: '182 K2YJR8EwS ',
		token: 'fGNYZ6gFiNW4t2YrDDzeC+F+lwb3rejuY+Qmi8Lyt9s=@h4mx.cn.rongnav.com;h4mx.cn.rongcfg.com'
	},
	{
		appkey: 'n19jmcy59f1q9',
		userId: '185 tigxhSp4W ',
		token: 'KPZUF/g5QR64FJ7A+E9RsuF+lwb3rejukB8tOTLIS/U=@h4mx.cn.rongnav.com;h4mx.cn.rongcfg.com'
	},
	{
		appkey: 'n19jmcy59f1q9',
		userId: '13811992214 nju1MN6E8  ',
		token: '7l/TIfYq7Ro4rMeU6IfRy+F+lwb3rejuEtTSHaf2Esk=@h4mx.cn.rongnav.com;h4mx.cn.rongcfg.com'
	},
	{
		appkey: 'n19jmcy59f1q9',
		userId: '18601253544 FNCWP0Dv1',
		token: '3f7NPLngCnZRIfZljRCOhuF+lwb3rejuPyoPHR4GYM8=@h4mx.cn.rongnav.com;h4mx.cn.rongcfg.com'
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

