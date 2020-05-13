<template>
	<view class="index-main ">
		<view class="index-list " >
			<block v-for="(item ,index ) in list" :key='index' >
				<view class="index-item skeleton-rect"  
				      :class="index==0?'mon':'crd'"
					  @click="toDetail(item.url,index)"
					  :style="`background-image:url(${item.imgUrl})`"
					  v-if="role!==40"> 
					<view class="title">
						<text>{{item.name}}</text>
						<text class="info">{{item.info}}</text>
						<text class="index-border"></text>
					</view>
				</view>
			</block> 
		</view>
	</view>
</template>

<script>

	import empty from '@/components/empty/empty.vue'
	export default {
		name:'indexItem', 
		filters: {
		  numFilter (value) {
		    let realVal = ''
		    if (value) {
		      // 截取当前数据到小数点后两位
		      realVal = parseFloat(value).toFixed(2)
		    } else {
		      realVal = '--'
		    }
		    return realVal
		  }
		},
		props:{ 
			access:{
				type:[Number , String],
				default:''
			},
			list:{
				type:Array,
				default:()=>[]
			},
			nums:{
				type:Number,
			},
			url:{
				type:String,
				default:'detail'
			}
		},
		data() {
			return {
				toUrl:this.url,
				role:this.access
			};
		},
		methods:{
			toDetail(url,index){
					
				if(index==1){
					uni.navigateTo({
						url: `${url}`, 
						success: res => {},
						fail: () => {},
						complete: () => {}
					});
				}else{
					if(this.role==20){ 
						uni.navigateTo({
							url: '/pages/monitor/portrait/portrait', 
							success: res => {},
							fail: () => {},
							complete: () => {}
						});
					}else{
						console.log("aa");
						uni.navigateTo({
							url: `${url}`, 
							success: res => {},
							fail: () => {},
							complete: () => {}
						});
					}
				}


			}
		}
	}
</script> 

<style lang="scss">
 .mon{
	 box-shadow:0 5px 10px rgba($color: #001EDE, $alpha: .16) ;
 }
 .crd{ 
	 box-shadow:0 5px 10px rgba($color: #D67200, $alpha: .16) ;
 } 
 .index-list{
	 display: flex;
	 flex-direction: row;
	 justify-content: space-between;
	 align-items: center;
	 margin: 0 20rpx;  
	 flex-wrap: wrap;
	 .index-item{
		 border-radius: 10rpx;
		 padding: 5rpx;
		 width:49%;
		 height: 164rpx;  
	     // line-height: 140rpx;
		 margin-bottom: 10rpx;
		 position: relative;
		 background-size: cover; 
		 display: flex;
		 align-items: center;
		 // background-color: #ff9502;
		 .title{
			 display: flex;
			 flex-direction: column;
			 justify-content: center;
			font-size: 32rpx;
			font-weight: bold;
			padding-left: 24rpx;
			padding-bottom: 10rpx;
			padding-top: 36rpx;
			color: #FFF;
			overflow:hidden;/*超出部分隐藏*/
			text-overflow:ellipsis;/*超出部分显示省略号*/
			white-space:nowrap;/*规定段落中的文本不进行换行 */
			.info{
				padding-top: 4rpx;
				font-size: 24rpx;
				font-weight: normal;
			}
			.index-border{
				width: 55rpx;
				overflow: hidden;
				border-top: 1rpx solid #FFF;
				margin-top: 14rpx; 
				margin-bottom: 20rpx;
				height: auto; 
				font-weight: normal;
			}
		 }
	 }

 }
 .index-main{
	 width: 100%;
	 height: 100%;
	 min-height: 100%;
	 background-color: #FFF;
	 padding-top: 10rpx;
 }
 </style>