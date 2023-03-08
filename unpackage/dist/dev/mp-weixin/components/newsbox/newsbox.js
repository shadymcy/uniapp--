"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "newsbox",
  props: {
    item: {
      type: Object,
      default: {
        title: "\u9ED8\u8BA4\u6807\u9898",
        author: "\u5F20\u4E09",
        hits: 668,
        picurl: "../../static/images/nopic.jpg"
      }
    }
  },
  setup(__props) {
    const props = __props;
    const { item } = common_vendor.toRefs(props);
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(item).picurl,
        b: common_vendor.t(common_vendor.unref(item).title),
        c: !common_vendor.unref(item).looktime
      }, !common_vendor.unref(item).looktime ? {
        d: common_vendor.t(common_vendor.unref(item).author),
        e: common_vendor.t(common_vendor.unref(item).hits)
      } : {
        f: common_vendor.t(common_vendor.unref(item).looktime)
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-86189589"], ["__file", "C:/Users/90392/Documents/HBuilderProjects/\u4F60\u597D\u65B0\u95FB\u7F51/components/newsbox/newsbox.vue"]]);
wx.createComponent(Component);
