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
  __name: "user",
  setup(__props) {
    const listArr = common_vendor.ref([]);
    common_vendor.onShow(() => {
      getData();
    });
    const goDetail = (item) => {
      common_vendor.index.navigateTo({
        url: `/pages/detail/detail?cid=${item.classid}&id=${item.id}`
      });
    };
    const getData = () => {
      let hisArr = common_vendor.index.getStorageSync("historyArr") || [];
      listArr.value = hisArr;
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(listArr.value, (item, k0, i0) => {
          return {
            a: common_vendor.o(($event) => goDetail(item), item.id),
            b: "0f7520f0-0-" + i0,
            c: common_vendor.p({
              item
            }),
            d: item.id
          };
        }),
        b: !listArr.value.length
      }, !listArr.value.length ? {} : {});
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0f7520f0"], ["__file", "C:/Users/90392/Documents/HBuilderProjects/\u4F60\u597D\u65B0\u95FB\u7F51/pages/user/user.vue"]]);
wx.createPage(MiniProgramPage);
