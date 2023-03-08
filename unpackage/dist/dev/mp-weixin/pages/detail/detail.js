"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_tooljs = require("../../utils/tooljs.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "detail",
  setup(__props) {
    let data = common_vendor.reactive({ detail: {} });
    common_vendor.onLoad((e) => {
      options.value = e;
      getDetail();
    });
    const options = common_vendor.ref(null);
    const getDetail = () => {
      common_vendor.index.request({
        url: "https://ku.qingnian8.com/dataApi/news/detail.php",
        data: options.value,
        success: (res) => {
          res.data.posttime = utils_tooljs.parseTime(res.data.posttime);
          res.data.content = res.data.content.replace(/<img/gi, '<img style="max-width:100%"');
          data.detail = res.data;
          saveHistory();
          common_vendor.index.setNavigationBarTitle({
            title: data.detail.title
          });
        }
      });
    };
    const saveHistory = () => {
      let arr = common_vendor.index.getStorageSync("historyArr") || [];
      let item = {
        id: data.detail.id,
        classid: data.detail.classid,
        picurl: data.detail.picurl,
        title: data.detail.title,
        looktime: utils_tooljs.parseTime(Date.now())
      };
      let index = arr.findIndex((i) => {
        return i.id == data.detail.id;
      });
      if (index >= 0) {
        arr.splice(index, 1);
      }
      arr.unshift(item);
      arr = arr.slice(0, 10);
      common_vendor.index.setStorageSync("historyArr", arr);
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(common_vendor.unref(data).detail.title),
        b: common_vendor.t(common_vendor.unref(data).detail.author),
        c: common_vendor.t(common_vendor.unref(data).detail.posttime),
        d: common_vendor.unref(data).detail.content
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-eca06f3c"], ["__file", "C:/Users/90392/Documents/HBuilderProjects/\u4F60\u597D\u65B0\u95FB\u7F51/pages/detail/detail.vue"]]);
wx.createPage(MiniProgramPage);
