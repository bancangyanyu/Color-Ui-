<template>
	<view>
		<view class="cu-list grid" :class="['col-' + column,border?'':'no-border']">
			<view class="cu-item "  
				  v-for="(item,index) in list" 
				  :key="index" 
				  v-if="index<column*2&&item.access.indexOf(role)!==-1"
				  @click="toUrl(item.url)">
				<view :class="['cuIcon-' + item.cuIcon,'text-' + item.color]">
					<view class="cu-tag badge" v-if="item.badge!=0">
						<block v-if="item.badge!=1">{{item.badge>99?'99+':item.badge}}</block>
					</view>
				</view>
				<text>{{item.name}}</text>
			</view>
		</view>
	</view>
</template>

<script>
 
	export default {

		name:'grid',
		props:{
			column:{
				type:Number,
				default:4
			},
			border:{ 
				type:Boolean,
				default:false
			},
			list:{
				type:Array,
				default:()=>{[]}
			},
			// 权限控制
			access:{
				type:[Number,String],
				default:10
			}
		},
		data() {
			return {
				role:this.access
			};
		},

		methods:{
			toUrl(url){
				console.log('权限',this.access);
				if(!url){this.$msg('正在开发中')}
				uni.navigateTo({
					url: url,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			}
		}
	}
</script>

<style lang="scss">


</style>
