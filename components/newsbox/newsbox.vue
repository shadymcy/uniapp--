<template>
	<view class="newsbox">
		<view class="pic">
			<image :src="item.picurl" mode="aspectFill"></image>
		</view>
		<view class="text">
			<view class="title">
				{{item.title}}
			</view>
			<view class="info" v-if="!item.looktime">
				<text>{{item.author}}</text>
				<text>{{item.hits}}浏览</text>
			</view>
			<view class="info" v-else>
				<text>浏览时间: {{item.looktime}}</text>
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">

import { defineProps, toRefs } from "vue"
// defineProps:在 单文件组件中，向组件传递数据，
// 接收父组件传递的数据
const props = defineProps({
  item: {
    type: Object,
    default: {
		title:'默认标题',
		author:'张三',
		hits:668,
		picurl:'../../static/images/nopic.jpg'
	},
  },
})
const {item} = toRefs(props);
// console.log('!!!!',item);	
// ObjectRefImpl {_object: Proxy, _key: 'item', _defaultValue: undefined, __v_isRef: true}
// const item2 = toRefs(props);
// console.log('????',item2);
// {item: ObjectRefImpl}
</script>

<style lang="scss" scoped>
.newsbox{
	display: flex;
	.pic{
		width: 230rpx;
		height: 160rpx;
		image{
			width: 100%;
			height: 100%;
		}
	}
	.text{
		// 测试文字框 border: 1px solid red;
		flex: 1;
		padding-left: 20rpx ;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		.title{
			font-size: 38rpx;
			color: #333;
			overflow: hidden;		
			text-overflow: ellipsis;			
			display: -webkit-box;		
			-webkit-line-clamp: 2;		
			overflow:hidden;		
			/*! autoprefixer: off */		
			-webkit-box-orient: vertical;
		}
		.info{
			font-size: 26rpx;
			color: #999;
			text{
				padding-right: 30rpx;
			}
		}
	}
}
</style>