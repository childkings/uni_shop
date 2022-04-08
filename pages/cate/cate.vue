<template>
  <view>
    <my-search @click="gotoSearch"></my-search>
    <view class="scroll_view_container">
      <scroll-view scroll-y="true" class="left_scroll_view"  :style="{height:wh+'px'}">
        <block v-for="(item,index) in cateList" :key="index">
          <view :class="['left_scroll_view_item',index === active ? 'active': '']" @click="activeChange(index)">{{item.cat_name}}</view>
        </block>
      </scroll-view>
      <scroll-view scroll-y="true" class="right_scroll_view"  :style="{height:wh+'px'}" :scroll-top="scrollTop">
        <view class="cate-lv2" v-for="(item2,index2) in cateLevel2" :key="index2">
          <view class="cate_lv2_title">/ {{item2.cat_name}} /</view>
          <view class="cate_lv3_list">
            <view class="cate_lv3_item" v-for="(item3,index3) in item2.children" :key="index3" @click="gotoGoodsList(item3)">
              <image :src="item3.cat_icon"  alt="/static/err.webp.jpg"></image>
              <text>{{item3.cat_name}}</text>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        wh: 0,
        cateList: [],
        active: 0,
        cateLevel2: [],
        scrollTop: 0
      };
    },
    methods: {
      async getCateList() {
        const { data:res} = await uni.$http.get('/categories')
        if(res.meta.status !== 200) {
          return
        }
        this.cateList = res.message
        this.cateLevel2 = res.message[0].children
      },
      activeChange(index) {
        this.active = index
        this.cateLevel2 = this.cateList[index].children
        this.scrollTop = this.scrollTop === 0 ? 1 : 0
      },
      gotoGoodsList(item3) {
        uni.navigateTo({
          url: '/subpkg/goods_list/goods_list?cid=' + item3.cat_id
        })
      },
      gotoSearch() {
        uni.navigateTo({
          url: '/subpkg/search/search'
        })
      }
    },
    onLoad() {
      const sysInfo = uni.getSystemInfoSync()
      // 可用高度 = 屏幕高度 - navigationBar高度 - tabBar高度 - 自定义的search组件高度
      this.wh = sysInfo.windowHeight - 50
      this.getCateList()
    }
  }
</script>

<style lang="scss">
.scroll_view_container {
  display: flex;
  flex-direction: row;
  .left_scroll_view {
    width: 120px;
    .left_scroll_view_item {
      background-color: #f7f7f7;
      font-size: 12px;
      line-height: 70px;
      text-align: center;
      &.active {
        position: relative;
        background-color: #ffffff;
        &::before {
          content: '';
          display: block;
          position: absolute;
          top: 50%;
          left: 0;
          transform: translateY(-50%);
          width: 3px;
          height: 30px;
          background-color: #c00000;
        }
      }
    }
  }
  .right_scroll_view {
    flex: 1;
    .cate_lv2_title {
      padding: 15px;
      font-size: 12px;
      font-weight: bold;
      text-align: center;
    }

    .cate_lv3_list {
      display: flex;
      flex-wrap: wrap;
      .cate_lv3_item {
        width: 33.33%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        image {
          width: 60px;
          height: 60px;
          background: url(../../static/logo.png);
          -webkit-background-size: cover;
          background-size: cover;
        }
        text {
          margin: 5px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
