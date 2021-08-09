<template>
	<view class="container">
		<block v-for="(strObj, index) in dataAry" :key="index">
			<view v-if="strObj.show" class="line"
				:style="`padding-left: ${strObj.indent}px; font-size: ${fontSize}upx;`">
				<text v-if="collapsable && strObj.hasChild" :data-index="index" @longtap="expandAll" @tap="doExpand"
					:class="clsgrp[clstype][strObj.expand]"></text>
				<view style="display: flex; flex-flow: row;">
					<text class="key" :class="`${strObj.ktype} ` + (kidx == index?'active':'')"
						@tap="selectk(index)">{{ strObj.key }}</text>
					<text v-if="strObj.comma">{{ `${strObj.comma}` }}</text>
					<text v-if="strObj.value" class="val" :class="`${strObj.type} ` + (vidx == index?'active':'')"
						@tap="selectv(index)">{{ strObj.value }}</text>
					<text v-if="strObj.tail" class="val">{{ strObj.tail }}</text>
					<block v-if="!!strObj.suffix">
						<text class="val">{{ '...' }}</text>
						<text class="val">{{ strObj.suffix }}</text>
					</block>
				</view>
			</view>
		</block>
	</view>
</template>

<script>
	export default {
		name: 'wgJsonView',
		props: {
			obj: {
				type: Object,
				default () {
					return {};
				}
			},
			collapsable: {
				type: Boolean,
				default: true
			},
			fontSize: {
				type: Number,
				default: 24
			},
			icon: {
				type: String,
				default: 'plusminus'
			}
		},
		data() {
			return {
				kidx: -1,
				vidx: -1,
				kt: 0,
				vt: 0,
				showCopy: false,
				basecode: '0123456789abcdefghijklmnopqrstuvwxyz',
				dataAry: [],
				clstype: ['arrow','plusminus'].includes(this.icon)?this.icon:'plusminus',
				clsgrp: {
					'arrow': {
						true: 'arrow-down',
						false: 'arrow-right'
					},
					'plusminus': {
						true: 'minus',
						false: 'plus'
					},
				}
			};
		},
		created() {
			let str = JSON.stringify(this.obj, null, ' ');
			let pl = 0;
			let idn = 0;
			let reg = /"(.+)"\s*:\s*("?.+"?),?/;
			let dataAry = str
				.split(/\n/g)
				.reverse()
				.map(t => {
					let res = {
						text: t
					};
					let regRes = reg.exec(t);
					if (regRes) {
						res.key = regRes[1].trim();
						res.value = regRes[2].replace(/,$/, '');
						res.tail = regRes[2] == res.value ? '' : ',';
						res.comma = ':';
						if ('{' === res.value) {
							res.type = 'Object'
						} else if ('[' === res.value) {
							res.type = 'Array'
						} else {
							try {
								let t = new Function('', 'return Object.prototype.toString.call(' + res.value + ')')()
								res.type = /\[object (.*)\]$/.exec(t)[1]
							} catch (e) {
								console.warn(e)
							}
						}
					} else {
						res.key = t;
						res.type
						res.value = '';
						res.comma = '';
						if (!['{', '}', '[', ']'].includes(t.trim().replace(/,$/, '').replace(/\"/g, ''))) {
							try {
								let kt = new Function('', 'return Object.prototype.toString.call(' + t + ')')()
								res.ktype = /\[object (.*)\]$/.exec(kt)[1]
							} catch (e) {
								console.warn(e)
							}
						}
					}
					res.indent = t.search(/[^\s]/) * this.fontSize;
					res.hasChild = res.indent < pl;
					res.expand = true;
					res.show = true;
					res.suffix = '';
					pl = res.indent;
					return res;
				});
			pl = -1;
			let pcode = '';
			this.dataAry = dataAry.reverse().map(item => {
				const cl = item.indent / this.fontSize;
				if (cl > pl) {
					item.treeCode = pcode + this.basecode.charAt(0);
				} else if (cl == pl) {
					var lastIdx = this.basecode.indexOf(pcode.charAt(pcode.length - 1)) + 1;
					item.treeCode = pcode.substr(0, pcode.length - 1) + this.basecode.charAt(lastIdx);
				} else {
					item.treeCode = pcode.substr(0, pcode.length - 1);
				}
				pl = cl;
				pcode = item.treeCode;
				return item;
			});
		},
		watch: {
			collapsable(val) {
				if (!val) {
					this.expandAll()
				}
			},
			icon(val){
				if (!!val){
					this.clstype = ['arrow','plusminus'].includes(val)?val:'plusminus'
				}
			}
		},
		methods: {
			getExpandStatus(code) {
				return this.dataAry.find(item => item.treeCode == code).expand;
			},
			isTail(idx) {
				let code = this.dataAry[idx].treeCode;
				let index = this.dataAry.findIndex(item => item.treeCode == code);
				return index < idx;
			},
			getParentsExpandStatus(code) {
				if (code == '0') return true;
				let parents = this.dataAry.filter(item => code.startsWith(item.treeCode) && item.treeCode != code);
				let res = true;
				parents.forEach(item => {
					if (!item.expand) {
						res = false;
					}
				});
				return res;
			},
			expandAll(e) {
				let index = 0;
				if (e) {
					const {
						index: k
					} = e.currentTarget.dataset;
					index = parseInt(k);
				}
				const code = this.dataAry[index].treeCode;
				this.dataAry = this.dataAry.map(item => {
					if (item.treeCode.startsWith(code)) {
						item.suffix = '';
						item.show = true;
						item.expand = true;
					}
					return item;
				});
			},
			print() {
				console.log(this.obj);
				console.log(JSON.stringify(this.obj));
			},
			doExpand(e) {
				let index = 0;
				if (e) {
					const {
						index: k
					} = e.currentTarget.dataset;
					index = parseInt(k);
				}
				let suffixText = '';
				const code = this.dataAry[index].treeCode;
				const expand = !this.dataAry[index].expand; //点击之后的展开状态
				this.dataAry[index].expand = expand; //更新展开状态
				const dataAry = this.dataAry.map((item, idx) => {
					if (item.treeCode.startsWith(code) && idx != index) {
						//排除本身
						if (!expand) {
							//如果折叠，子项全部隐藏
							item.show = false;
						} else {
							//如果展开，子项的尾巴是否显示看他的父级展开状态
							item.show = this.getParentsExpandStatus(item.treeCode);
						}
						if (item.treeCode == code) {
							// last one
							suffixText = expand ? '' : `${item.text.trim()}`;
						}
						// 隐藏结尾的 ] } 等
						if (this.isTail(idx) && !this.getExpandStatus(item.treeCode)) {
							item.show = false;
						}
					}
					// 处理后缀
					if (item.expand) {
						item.suffix = '';
					}
					return item;
				});
				dataAry[index].suffix = suffixText;
				this.dataAry = dataAry;
			},
			selectk(idx) {
				this.vidx = idx;
				clearTimeout(this.vt);
				this.vt = setTimeout(() => {
					this.vidx = -1;
				}, 600);
				if (this.collapsable)
				this.doExpand({
					currentTarget: {
						dataset: {
							index: idx
						}
					}
				})
			},
			selectv(idx) {
				this.kidx = idx;
				clearTimeout(this.kt);
				this.kt = setTimeout(() => {
					this.kidx = -1;
				}, 600);
			}
		}
	};
</script>

<style scoped>
	.container {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		align-content: center;
		justify-content: flex-start;
		box-sizing: border-box;
	}

	.container .line {
		display: flex;
		position: relative;
		align-items: center;
		justify-content: flex-start;
		width: inherit;
		box-sizing: border-box;
	}

	text {
		margin: 0 4upx;
	}

	.key,
	.val {
		height: min-content;
		display: inline-block;
		transition-duration: 0.3s;
		border-bottom: solid 4upx transparent;
		font-weight: bold;
	}

	.key.active,
	.val.active {
		transition-duration: 0.3s;
		border-bottom: solid 4upx rgba(255, 90, 20, 0.8);
	}

	.key {
		color: #666;
	}

	.val {
		color: #444;
	}

	.String {
		color: rgba(198, 24, 22, 1);
	}

	.Number {
		color: blue;
	}

	.Object {
		color: green;
	}

	.expand {
		display: inline-flex;
		width: 32upx;
		height: 32upx;
		padding: 0;
		align-items: center;
		transform: scale(0.8);
		justify-items: center;
		justify-content: center;
		border: solid 1upx lightgray;
		box-sizing: border-box;
		color: gray;
		font-size: 24upx;
	}

	.arrow-right,
	.arrow-down {
		display: inline-block;
		width: 24upx;
		height: 24upx;
		background-image: url("data:image/svg+xml,%3Csvg width='24' height='24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='%23fff' d='M-1-1h8.575v8.575H-1z'/%3E%3Cg%3E%3Cpath stroke='%2300f' d='M11.482 11.865L2.132.896l16.812 10.969L2.132 22.833l9.35-10.968z' fill-opacity='null' stroke-opacity='null' stroke-width='null' fill='%2300f'/%3E%3C/g%3E%3C/svg%3E");
		background-size: cover;
	}

	.arrow-down {
		transform: rotate(90deg);
		-ms-transform: rotate(90deg);
		-moz-transform: rotate(90deg);
		-webkit-transform: rotate(90deg);
		-o-transform: rotate(90deg);
	}

	/* .minus,
	.plus {
		display: inline-block;
		width: 24upx;
		height: 24upx;
		background-size: cover;
	} */

	/* .plus {
		background-image: url("data:image/svg+xml,%3Csvg width='24' height='24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='none' d='M-1-1h9.619v9.619H-1z'/%3E%3Cg%3E%3Cpath fill='%2300bf00' d='M0 0h24v24H0z'/%3E%3Cpath stroke-linecap='null' stroke-linejoin='null' fill-opacity='null' stroke-opacity='null' stroke-width='3' stroke='%23fff' fill='%23fff' d='M3 12h18M12 3v18'/%3E%3Cellipse stroke='%23fff' ry='1' rx='1' cy='12.028' cx='11.938' fill-opacity='null' stroke-opacity='null' stroke-width='3' fill='%23fff'/%3E%3Cellipse cy='8.966' cx='11.719' fill-opacity='null' stroke-opacity='null' stroke-width='3' stroke='%23fff' fill='%23fff'/%3E%3Cellipse cy='9.153' cx='14.844' fill-opacity='null' stroke-opacity='null' stroke-width='3' stroke='%23fff' fill='%23fff'/%3E%3Cellipse cy='14.403' cx='43.843' fill-opacity='null' stroke-opacity='null' stroke-width='3' stroke='%23fff' fill='%23fff'/%3E%3Cellipse cy='6.591' cx='38.156' fill-opacity='null' stroke-opacity='null' stroke-width='3' stroke='%23fff' fill='%23fff'/%3E%3C/g%3E%3C/svg%3E");
	}

	.minus {
		background-image: url("data:image/svg+xml,%3Csvg width='24' height='24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='none' d='M-1-1h9.619v9.619H-1z'/%3E%3Cg%3E%3Cpath fill='%2300bf00' d='M0 0h24v24H0z'/%3E%3Cpath stroke-linecap='null' stroke-linejoin='null' fill-opacity='null' stroke-opacity='null' stroke-width='3' stroke='%23fff' fill='%23fff' d='M3 12h18'/%3E%3Cellipse stroke='%23fff' ry='1' rx='1' cy='12.028' cx='11.938' fill-opacity='null' stroke-opacity='null' stroke-width='3' fill='%23fff'/%3E%3Cellipse cy='8.966' cx='11.719' fill-opacity='null' stroke-opacity='null' stroke-width='3' stroke='%23fff' fill='%23fff'/%3E%3Cellipse cy='9.153' cx='14.844' fill-opacity='null' stroke-opacity='null' stroke-width='3' stroke='%23fff' fill='%23fff'/%3E%3Cellipse cy='14.403' cx='43.843' fill-opacity='null' stroke-opacity='null' stroke-width='3' stroke='%23fff' fill='%23fff'/%3E%3Cellipse cy='6.591' cx='38.156' fill-opacity='null' stroke-opacity='null' stroke-width='3' stroke='%23fff' fill='%23fff'/%3E%3C/g%3E%3C/svg%3E");
	} */
</style>
