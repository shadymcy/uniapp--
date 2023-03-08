<template>
	<view class="detail">
		<view class="title">
			{{data.detail.title}}
		</view>
		<view class="info">
			<view class="author">
				编辑: {{data.detail.author}}
			</view>
			<view class="time">
				发布日期:{{data.detail.posttime}}
			</view>
		</view>
		<view class="content">
			<rich-text :nodes="data.detail.content"></rich-text>
		</view>
		<view class="description">
			声明：本站的内容均采集与腾讯新闻，如果侵权请联系管理进行整改删除，本站进行了内容采集不代表本站及作者观点，若有侵犯请及时联系管理员，谢谢您的支持。
		</view>
		
	</view>
</template>

<script setup lang="ts">
	import { onLoad } from "@dcloudio/uni-app"
	import { reactive, ref } from "vue";
	// TODO：时间戳转换ts版本
	// import time from '../../utils/tool';
	import { parseTime } from '../../utils/tooljs.js'
	// console.log(time.formatDate(1861111234567,'yyyy-MM-dd HH:MM:ss'))
	// console.log(parseTime('1861111234567'));
	let data = reactive<AnyObject>({detail:{}})
	interface param {
		cid: string
		id: string
	}
	// 接收参数
	onLoad((e:param)=>{
		// console.log(e);
		options.value = e
		getDetail()
	})
	const options = ref<param | null>(null)
	
	const getDetail = () =>{
		uni.request({
			url:'https://ku.qingnian8.com/dataApi/news/detail.php',
			data:options.value,
			success: (res:any)=>{
				// console.log(res);
				// 用正则的方式添加样式 /gi(全文查找、忽略大小写)
				// res.data.posttime = time.formatDate(Number(res.data.posttime),'yyyy-MM-dd HH:MM:ss')
				res.data.posttime = parseTime(res.data.posttime)
				res.data.content = res.data.content.replace(/<img/gi,'<img style="max-width:100%"')
				data.detail = res.data
				// console.log(data.detail);
				saveHistory()
				uni.setNavigationBarTitle({
					title:data.detail.title
				})
			}
		})
	}
	interface history {
		id:string,
		classid:string,
		picurl:string,
		title:string
		looktime:string
	}

	const saveHistory = () => {
		// 有historyArr 就获取 historyArr， 否则初始化
		let arr:history[] = uni.getStorageSync("historyArr") || []
		let item : history = {
			id:data.detail.id,
			classid:data.detail.classid,
			picurl:data.detail.picurl,
			title:data.detail.title,
			looktime:parseTime(Date.now())
		}
		// arr去重
		let index: number = arr.findIndex(i => {
			return i.id == data.detail.id
		})
		if (index >= 0){
			arr.splice(index,1)
		}
		arr.unshift(item)
		// 只取前10条记录
		arr = arr.slice(0,10)
		uni.setStorageSync('historyArr',arr)
	}
</script>

<style lang="scss" scoped>
.detail{
	padding:30rpx;
	.title{
		font-size: 46rpx;
		color: #333;
	}
	.info{
		background-color: #f6f6f6;
		padding: 20rpx;
		font-size: 25rpx;
		color: #666;
		display: flex;
		justify-content: space-between;
		margin: 40rpx 0;
	}
	.content{
		padding-bottom: 50rpx
		// 小程序不支持;
		// :deep(img){
		// 	max-width: 100%;
		// }
	}
	.description{
		background-color: #fef0f0;
		font-size: 26rpx;
		padding: 20rpx;
		color: #f89898;
		line-height: 1.8em;
	}
}
</style>
