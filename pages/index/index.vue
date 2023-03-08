<template>
	<view class="home">
		<scroll-view scroll-x class="navscroll" >
			<view 
				class="item" 
				:class="index == navIndex ? 'active' : '' " 
				v-for="(item, index) in data.navArr" 
				@click="clickNav(index, item.id)" 
				:key="item.id"
			>
				{{item.classname}}
			</view>
		</scroll-view>
		<view class="content">
			<view class="row" v-for="item in data.newsArr" :key="item.id">
				<!-- 最初用click.native 但在微信小程序中失效 -->
				<newsbox :item='item' @tap.native="goDetail(item)"></newsbox>
			</view>
		</view>
		<view class="nodata" v-if="!data.newsArr.length">
			<image src="../../static/images/nodata.png" mode="widthFix"></image>
		</view>
		<view class="loading" v-if="data.newsArr.length">
			<view v-if="loading == 1">数据加载中...</view>
			<view v-if="loading == 2">没有更多了~~~</view>
		</view>
	</view>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";

import { onLoad, onReachBottom } from "@dcloudio/uni-app"
	onLoad(()=>{
		getNavData();
		getNewsData(idx.value)
	})

	onReachBottom(()=>{
		// console.log('到底不了');
		if(loading.value == 2){
			return 
		}
		currentPage.value++
		loading.value = 1
		getNewsData(idx.value)
	})

	// 要把navindex变成响应式数据
	const navIndex = ref<number>(0)
	const currentPage = ref<number>(1)
	const loading = ref<number>(0) // 0默认 1加载中 2没有更多
	const idx = ref<number>(50)
	// 把navArr变成响应式数据
	let data = reactive<AnyObject>({navArr:[],newsArr:[]})
	// let navArr = reactive<any>([])
	
	const clickNav = (index: number, id:number) => {
		navIndex.value = index
		// 将页码回归第一页
		currentPage.value = 1
		// 新闻列表初始化
		data.newsArr = []
		loading.value = 0
		idx.value = id
		getNewsData(id)
		// console.log(navIndex);
	}
	interface detailItem {
		classid:string
		id:string
	}
	const goDetail = (item:detailItem) => {
		// console.log(item);
		uni.navigateTo({
			url:`/pages/detail/detail?cid=${item.classid}&id=${item.id}`
		})
	}
	const getNavData = () => {
		uni.request({
			url:'https://ku.qingnian8.com/dataApi/news/navlist.php',
			success:(res: any)=>{
				// console.log(res);
				data.navArr = res.data
				// console.log(data.navArr);
			}
		})
	}
	const getNewsData = (id:number)=>{
		uni.request({
			url:'https://ku.qingnian8.com/dataApi/news/newslist.php',
			data:{
				cid:id,
				page:currentPage.value
			},
			success:(res: any) =>{
				// console.log(res)
				if(!res.data.length){
					loading.value = 2 
				}
				data.newsArr = data.newsArr.concat(res.data)
			}
		})
	}
</script>

<style lang='scss' scoped>
.navscroll{
	height: 100rpx;
	background-color: #f7f8fa;
	white-space: nowrap;
	position: fixed;
	left: 0;
	/* https://uniapp.dcloud.net.cn/tutorial/syntax-css.html */
	top: var(--window-top);
	z-index: 10;
	/* 取消滚动条 */
	::-webkit-scrollbar {
	    display: none;
	    width: 0 !important;
	    height: 0 !important;
	    -webkit-appearance: none;
	    background: transparent;
	    color: transparent;
	  }
	.item{
		display: inline-block;
		font-size: 40rpx;
		line-height: 100rpx;
		padding: 0 30rpx;
		color: #6d7071;
		&.active{
			color: #3a8e40;
		}
		
	}
}
.content{
	padding: 30rpx;
	padding-top: 130rpx;
	.row{
		/* border-bottom缩写属性设置一个声明中所有底部边框属性。 */
		border-bottom: 1px dashed #efefef;
		padding: 20rpx 0;
	}
}
.nodata{
	display: flex;
	justify-content: center;
	image{
		width: 360rpx;
	}
}
.loading{
	text-align: center;
	font-size: 26rpx;
	color: #888;
	line-height: 2em;
}
</style>
