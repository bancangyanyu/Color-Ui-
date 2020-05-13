<template>
	<view class="dev-search">
		<view class="cu-bar search bg-white">
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input 	v-model="inputValue"
						:adjust-position="false" 
						type="text" 
						:placeholder="inputpl" 
						confirm-type="search"
						class="top-input"
						@input="handleInput"></input>
						<text class='cuIcon-close text-orange' 
							  @click="close" 
							  v-if="inputValue"></text>
			</view>
			<view class="action" v-if="inputValue">
				<button class="cu-btn round bg-blue shadow" 
						@click="search">查询</button>
			</view> 
		</view>			
	</view>
</template>

<script>
	export default {
		name:'search',
		props:{
			inputpl:{
				type:String
			},
			inputValue:{
				type:String
			},

		},
		data() {
			return {
				
			}
		},
		methods: {
			close(){
				this.inputValue = ''
				this.$emit('close')
			},
			search(){
				this.$emit('on-search')
			},
			handleInput(e){
				this.$emit('input',e.target.value)

			}
			
		}
	}
</script>

<style>
.cu-bar .search-form{margin:0 20rpx;}
</style>
