<template>
	<view>
		<view class="header">
			<view class="header-title">调用列表</view>
			<view class="">
				<button type="default" size="mini" @click="clear">清空</button>
			</view>
		</view>
		<view class=""> 
			<uni-collapse accordion v-model="curCollapse">
				<uni-collapse-item 
					v-for="(item, index) in resultList" 
					:key="item.index"
					:name="item.index">
					<template v-slot:title>
						<view class="list-title" :style="{color: statusColor[item.status]}">
							{{item.index + '. ' + item.title}}
							{{item.code !== undefined ? '(' : ''}} {{item.code}} {{item.code !== undefined ? ')' : ''}}
						</view>
					</template>
					<view class="content" v-if="curCollapse === item.index">
						<wg-json-view v-if="getShowDetailState(item.data)" ref="jsonView" class="uni-border" :collapsable="true"
						            style="padding: 16upx;" :obj="item.data"></wg-json-view>
						<!-- <view class="" v-if="getShowDetailState(item.data)">
							{{item.data}}
						</view> -->
						<view v-else style="padding-left: 10px;">{{item.data}}</view>
					</view>
				</uni-collapse-item>
			</uni-collapse>
		</view>
	</view>
</template>

<script>
	import { resultList, add, clear } from '../../util/common.js'
	import { statusColor, isObject, isArray } from '../../util/utils.js'
	
	import wgJsonView from '@/components/wg-json-view/wg-json-view.vue';
	
	export default {
		data() {
			return {
				resultList: resultList,
				statusColor: statusColor,
				curCollapse: ''
			}
		},
		methods: {
			addItem: () => {
				add(1)
			},
			clear: () => {
				clear()
			},
			getShowDetailState(val) {
				return isArray(val) || isObject(val) ? true : false
			}
		}
	}
</script>

<style>
	.header {
		display: flex;
		justify-content: space-between;
		padding: 10px;
	}
	.list-title {
		padding: 10px;
	}
</style>
