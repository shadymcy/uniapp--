"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_newsbox2 = common_vendor.resolveComponent("newsbox");
  _easycom_newsbox2();
}
const _easycom_newsbox = () => "../../components/newsbox/newsbox.js";
if (!Math) {
  _easycom_newsbox();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    common_vendor.onLoad(() => {
      getNavData();
      getNewsData(idx.value);
    });
    common_vendor.onReachBottom(() => {
      if (loading.value == 2) {
        return;
      }
      currentPage.value++;
      loading.value = 1;
      getNewsData(idx.value);
    });
    const navIndex = common_vendor.ref(0);
    const currentPage = common_vendor.ref(1);
    const loading = common_vendor.ref(0);
    const idx = common_vendor.ref(50);
    let data = common_vendor.reactive({ navArr: [], newsArr: [] });
    const clickNav = (index, id) => {
      navIndex.value = index;
      currentPage.value = 1;
      data.newsArr = [];
      loading.value = 0;
      idx.value = id;
      getNewsData(id);
    };
    const goDetail = (item) => {
      common_vendor.index.navigateTo({
        url: `/pages/detail/detail?cid=${item.classid}&id=${item.id}`
      });
    };
    const getNavData = () => {
      common_vendor.index.request({
        url: "https://ku.qingnian8.com/dataApi/news/navlist.php",
        success: (res) => {
          data.navArr = res.data;
        }
      });
    };
    const getNewsData = (id) => {
      common_vendor.index.request({
        url: "https://ku.qingnian8.com/dataApi/news/newslist.php",
        data: {
          cid: id,
          page: currentPage.value
        },
        success: (res) => {
          if (!res.data.length) {
            loading.value = 2;
          }
          data.newsArr = data.newsArr.concat(res.data);
        }
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(common_vendor.unref(data).navArr, (item, index, i0) => {
          return {
            a: common_vendor.t(item.classname),
            b: common_vendor.n(index == navIndex.value ? "active" : ""),
            c: common_vendor.o(($event) => clickNav(index, item.id), item.id),
            d: item.id
          };
        }),
        b: common_vendor.f(common_vendor.unref(data).newsArr, (item, k0, i0) => {
          return {
            a: common_vendor.o(($event) => goDetail(item), item.id),
            b: "1cf27b2a-0-" + i0,
            c: common_vendor.p({
              item
            }),
            d: item.id
          };
        }),
        c: !common_vendor.unref(data).newsArr.length
      }, !common_vendor.unref(data).newsArr.length ? {} : {}, {
        d: common_vendor.unref(data).newsArr.length
      }, common_vendor.unref(data).newsArr.length ? common_vendor.e({
        e: loading.value == 1
      }, loading.value == 1 ? {} : {}, {
        f: loading.value == 2
      }, loading.value == 2 ? {} : {}) : {});
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1cf27b2a"], ["__file", "C:/Users/90392/Documents/HBuilderProjects/\u4F60\u597D\u65B0\u95FB\u7F51/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
