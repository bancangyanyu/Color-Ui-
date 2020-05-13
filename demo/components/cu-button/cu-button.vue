<template>
		<view class="flex flex-direction margin-top margin-right margin-left margin-bottom">
			<button class="cu-btn lg"
					:class="'bg-'+color"
					@click="click"  
					:form-type="formType">{{btnTxt}}
					</button> 

		</view>
</template>

<script>
	export default {
		name:'cuBtn',
		props:{
			color:{ 
				type:String,
				default:'blue'
			},
			btnTxt:{
				type:String,
				default:'提交'
			}, 
			formType:{
				type:String,
				default:''
			}
		}, 
		data() {
			return {
				
			};
		},
			
		methods:{
			click(){
				this.$emit('click')
			}
		}
	}
</script>

<style lang="scss">

</style>
