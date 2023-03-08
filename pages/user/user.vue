<template>
	<view class="user">
		<view class="top">
			<image src="../../static/images/history.png" mode=""></image>
			<view class="text">
				浏览历史
			</view>
		</view>
		<view class="content">
			<view class="row" v-for="item in listArr" :key="item.id">
				<!-- 最初用click.native 但在微信小程序中失效 -->
				<newsbox :item="item" @tap.native='goDetail(item)'></newsbox>
			</view>
		</view>
		<view class="nohistory" v-if="!listArr.length">
			<image src="../../static/images/nohis.png" mode="widthFix"></image>
			<view class="text">
				暂无浏览记录
			</view>
		</view>
	</view>
	
</template>

<script setup lang="ts">
	import { onShow } from "@dcloudio/uni-app"
	import { ref } from "vue";
	interface history {
		id:string,
		classid:string,
		picurl:string,
		title:string
		looktime:string
	}
	const listArr = ref<history[]>([]) 

	onShow(()=>{
		getData()
	})
	interface detailItem {
		classid:string
		id:string
	}
	// 跳转详情页
	const goDetail = (item:detailItem) => {
		// console.log(item);
		uni.navigateTo({
			url:`/pages/detail/detail?cid=${item.classid}&id=${item.id}`
		})
	}
	// 获取缓存浏览记录
	const getData = () => {
		let hisArr: history[] = uni.getStorageSync('historyArr') || []
		listArr.value = hisArr
		// console.log(listArr);
	}
		
	
	
	
</script>

<style lang="scss" scoped>
.user{
	.top{
		padding: 50rpx 0;
		background-color: #f8f8f8;
		// 指定文本的颜色
		color: #555;
		// 居中
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		image{
			width: 150rpx;
			height: 150rpx;
		}
		.text{
			font-size: 38rpx;
			padding-top: 20rpx;
		}
		}
	.content{
		padding:30rpx;
		.row{
			border-bottom:1px dotted #efefef;
			padding:20rpx 0;
			}
		}
	.nohistory{
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		image{
			width: 400rpx;
		}
		.text{
			font-size: 26rpx;
			color: #999;
		}
	}
	
}

</style>
