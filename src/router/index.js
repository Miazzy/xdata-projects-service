// import Vue from 'vue'
import Router from 'vue-router';

Vue.use(Router);

// app整体由店面页和店内页组成 暂时并没有用到嵌套路由
const routes = [{
    path: '/legal',
    name: "案件管理",
    component: resolve => require(["../components/legal/home.vue"], resolve)
}, {
    path: '/',
    name: "工作台",
    components: {
        "default": resolve => require(["../components/legal/home.vue"], resolve),
        "subPage": resolve => require(["../components/legal/workspace.vue"], resolve)
    }
},{
    path: '/login',
    name: "登录",
    components: {
        "default": resolve => require(["../components/legal/home.vue"], resolve),
        "subPage": resolve => require(["../components/common/login.vue"], resolve)
    }
},{
    path: '/workspace',
    name: "工作台",
    components: {
        "default": resolve => require(["../components/legal/home.vue"], resolve),
        "subPage": resolve => require(["../components/legal/workspace.vue"], resolve)
    }
}, {
    path: '/legal/workspace',
    name: "工作台",
    components: {
        "default": resolve => require(["../components/legal/home.vue"], resolve),
        "subPage": resolve => require(["../components/legal/workspace.vue"], resolve)
    }
}, {
    path: '/legal/case/legalapply',
    name: "案件申请",
    components: {
        "default": resolve => require(["../components/legal/home.vue"], resolve),
        "subPage": resolve => require(["../components/legal/case/legalapply.vue"], resolve)
    }
}, {
    path: '/legal/legalapply',
    name: "案件详情",
    components: {
        "default": resolve => require(["../components/legal/home.vue"], resolve),
        "subPage": resolve => require(["../components/legal/case/legalapply.vue"], resolve)
    }
}, {
    path: '/legal/case/legalview',
    name: "案件详情",
    components: {
        "default": resolve => require(["../components/legal/home.vue"], resolve),
        "subPage": resolve => require(["../components/legal/case/legalapply.vue"], resolve)
    }
}, {
    path: '/legal/legalview',
    name: "案件详情",
    components: {
        "default": resolve => require(["../components/legal/home.vue"], resolve),
        "subPage": resolve => require(["../components/legal/case/legalapply.vue"], resolve)
    }
}, {
    path: '/legal/firm/firmapply',
    name: "律所申请",
    components: {
        "default": resolve => require(["../components/legal/home.vue"], resolve),
        "subPage": resolve => require(["../components/legal/firm/firmapply.vue"], resolve)
    }
}, {
    path: '/legal/firmapply',
    name: "律所申请",
    components: {
        "default": resolve => require(["../components/legal/home.vue"], resolve),
        "subPage": resolve => require(["../components/legal/firm/firmapply.vue"], resolve)
    }
}, {
    path: '/legal/lawyer/lawyerapply',
    name: "律师申请",
    components: {
        "default": resolve => require(["../components/legal/home.vue"], resolve),
        "subPage": resolve => require(["../components/legal/lawyer/lawyerapply.vue"], resolve)
    }
}, {
    path: '/legal/lawyerapply',
    name: "律师申请",
    components: {
        "default": resolve => require(["../components/legal/home.vue"], resolve),
        "subPage": resolve => require(["../components/legal/lawyer/lawyerapply.vue"], resolve)
    }
}, {
    path: '/legal/firm/firmlist',
    name: "律所管理",
    components: {
        "default": resolve => require(["../components/legal/home.vue"], resolve),
        "subPage": resolve => require(["../components/legal/firm/firmlist.vue"], resolve)
    }
}, {
    path: '/legal/lawyer/lawyerlist',
    name: "律师管理",
    components: {
        "default": resolve => require(["../components/legal/home.vue"], resolve),
        "subPage": resolve => require(["../components/legal/lawyer/lawyerlist.vue"], resolve)
    }
}, {
    path: '/legal/firm/firmview', //lawyerview
    name: "律所详情",
    components: {
        "default": resolve => require(["../components/legal/home.vue"], resolve),
        "subPage": resolve => require(["../components/legal/firm/firmapply.vue"], resolve)
    }
}, {
    path: '/legal/firmview', //lawyerview
    name: "律所详情",
    components: {
        "default": resolve => require(["../components/legal/home.vue"], resolve),
        "subPage": resolve => require(["../components/legal/firm/firmapply.vue"], resolve)
    }
}, {
    path: '/legal/lawyer/lawyerview', //lawyerview
    name: "律师详情",
    components: {
        "default": resolve => require(["../components/legal/home.vue"], resolve),
        "subPage": resolve => require(["../components/legal/lawyer/lawyerapply.vue"], resolve)
    }
}, {
    path: '/legal/lawyerview', //lawyerview
    name: "律师详情",
    components: {
        "default": resolve => require(["../components/legal/home.vue"], resolve),
        "subPage": resolve => require(["../components/legal/lawyer/lawyerapply.vue"], resolve)
    }
}, {
    path: '/legal/case/legallist',
    name: "案件管理",
    components: {
        "default": resolve => require(["../components/legal/home.vue"], resolve),
        "subPage": resolve => require(["../components/legal/case/legallist.vue"], resolve)
    }
}, {
    path: '/legal/course/lawsuitlist',
    name: "归档闭单",
    components: {
        "default": resolve => require(["../components/legal/home.vue"], resolve),
        "subPage": resolve => require(["../components/legal/case/legallist.vue"], resolve)
    }
}, {
    path: '/legal/case/firstlist',
    name: "一审管理",
    components: {
        "default": resolve => require(["../components/legal/home.vue"], resolve),
        "subPage": resolve => require(["../components/legal/case/legallist.vue"], resolve)
    }
}, {
    path: '/legal/case/secondlist',
    name: "二审管理",
    components: {
        "default": resolve => require(["../components/legal/home.vue"], resolve),
        "subPage": resolve => require(["../components/legal/case/legallist.vue"], resolve)
    }
}, {
    path: '/legal/case/executelist',
    name: "执行管理",
    components: {
        "default": resolve => require(["../components/legal/home.vue"], resolve),
        "subPage": resolve => require(["../components/legal/case/legallist.vue"], resolve)
    }
}, {
    path: '/legal/case/thirdlist',
    name: "再审管理",
    components: {
        "default": resolve => require(["../components/legal/home.vue"], resolve),
        "subPage": resolve => require(["../components/legal/case/legallist.vue"], resolve)
    }
}, {
    path: '/legal/court/courtapply',
    name: "法院录入",
    components: {
        "default": resolve => require(["../components/legal/home.vue"], resolve),
        "subPage": resolve => require(["../components/legal/court/courtapply.vue"], resolve)
    }
}, {
    path: '/legal/courtapply',
    name: "法院录入",
    components: {
        "default": resolve => require(["../components/legal/home.vue"], resolve),
        "subPage": resolve => require(["../components/legal/court/courtapply.vue"], resolve)
    }
}, {
    path: '/legal/court/courtlist',
    name: "法院管理",
    components: {
        "default": resolve => require(["../components/legal/home.vue"], resolve),
        "subPage": resolve => require(["../components/legal/court/courtlist.vue"], resolve)
    }
}, {
    path: '/legal/court/courtview',
    name: "法院查看",
    components: {
        "default": resolve => require(["../components/legal/home.vue"], resolve),
        "subPage": resolve => require(["../components/legal/court/courtapply.vue"], resolve)
    }
}, {
    path: '/legal/courtview',
    name: "法院查看",
    components: {
        "default": resolve => require(["../components/legal/home.vue"], resolve),
        "subPage": resolve => require(["../components/legal/court/courtapply.vue"], resolve)
    }
}, {
    path: '/legal/court/judgeapply',
    name: "法官录入",
    components: {
        "default": resolve => require(["../components/legal/home.vue"], resolve),
        "subPage": resolve => require(["../components/legal/court/judgeapply.vue"], resolve)
    }
}, {
    path: '/legal/judgeapply',
    name: "法官录入",
    components: {
        "default": resolve => require(["../components/legal/home.vue"], resolve),
        "subPage": resolve => require(["../components/legal/court/judgeapply.vue"], resolve)
    }
}, {
    path: '/legal/court/judgelist',
    name: "法官管理",
    components: {
        "default": resolve => require(["../components/legal/home.vue"], resolve),
        "subPage": resolve => require(["../components/legal/court/judgelist.vue"], resolve)
    }
}, {
    path: '/legal/court/judgeview',
    name: "法官查看",
    components: {
        "default": resolve => require(["../components/legal/home.vue"], resolve),
        "subPage": resolve => require(["../components/legal/court/judgeapply.vue"], resolve)
    }
}, {
    path: '/legal/judgeview',
    name: "法官查看",
    components: {
        "default": resolve => require(["../components/legal/home.vue"], resolve),
        "subPage": resolve => require(["../components/legal/court/judgeapply.vue"], resolve)
    }
}, {
    path: '/legal/netdisk',
    name: "云文件",
    components: {
        "default": resolve => require(["../components/legal/home.vue"], resolve),
        "subPage": resolve => require(["../components/legal/netdisk.vue"], resolve)
    }
}, {
    path: '/legal/collect',
    name: "案件收藏",
    components: {
        "default": resolve => require(["../components/legal/home.vue"], resolve),
        "subPage": resolve => require(["../components/legal/collect.vue"], resolve)
    }
}, {
    path: '/legal/contact',
    name: "联系人",
    components: {
        "default": resolve => require(["../components/legal/home.vue"], resolve),
        "subPage": resolve => require(["../components/legal/contact.vue"], resolve)
    }
}, {
    path: '/legal/message',
    name: "消息",
    components: {
        "default": resolve => require(["../components/legal/home.vue"], resolve),
        "subPage": resolve => require(["../components/legal/message.vue"], resolve)
    }
}, {
    path: '/legal/stampedapply',
    name: "发起文书盖章申请",
    components: {
        "default": resolve => require(["../components/legal/home.vue"], resolve),
        "subPage": resolve => require(["../components/legal/stamped/stampedapply.vue"], resolve)
    }
}, {
    path: '/legal/representationapply',
    name: "发起情况说明",
    components: {
        "default": resolve => require(["../components/legal/home.vue"], resolve),
        "subPage": resolve => require(["../components/legal/representation/representationapply.vue"], resolve)
    }
}, {
    path: '/legal/planapply',
    name: "发起诉讼预案申请",
    components: {
        "default": resolve => require(["../components/legal/home.vue"], resolve),
        "subPage": resolve => require(["../components/legal/plan/planapply.vue"], resolve)
    }
}, {
    path: '/legal/outsourceapply',
    name: "发起委外申请",
    components: {
        "default": resolve => require(["../components/legal/home.vue"], resolve),
        "subPage": resolve => require(["../components/legal/outsource/outsourceapply.vue"], resolve)
    }
}, {
    path: '/legal/evidenceapply',
    name: "发起证据收集申请",
    components: {
        "default": resolve => require(["../components/legal/home.vue"], resolve),
        "subPage": resolve => require(["../components/legal/evidence/evidenceapply.vue"], resolve)
    }
}, {
    path: '/legal/preserveapply',
    name: "发起保全申请",
    components: {
        "default": resolve => require(["../components/legal/home.vue"], resolve),
        "subPage": resolve => require(["../components/legal/preserve/preserveapply.vue"], resolve)
    }
}, {
    path: '/legal/settleapply',
    name: "发起结案申请",
    components: {
        "default": resolve => require(["../components/legal/home.vue"], resolve),
        "subPage": resolve => require(["../components/legal/settle/settleapply.vue"], resolve)
    }
}, {
    path: '/legal/attorneyfeeapply',
    name: "律师费付费情况",
    components: {
        "default": resolve => require(["../components/legal/home.vue"], resolve),
        "subPage": resolve => require(["../components/legal/attorneyfee/attorneyfeeapply.vue"], resolve)
    }
}, {
    path: '/legal/costsapply',
    name: "诉讼费支付情况",
    components: {
        "default": resolve => require(["../components/legal/home.vue"], resolve),
        "subPage": resolve => require(["../components/legal/costs/costsapply.vue"], resolve)
    }
}, {
    path: '/legal/retmoneyapply',
    name: "录入回款情况",
    components: {
        "default": resolve => require(["../components/legal/home.vue"], resolve),
        "subPage": resolve => require(["../components/legal/retmoney/retmoneyapply.vue"], resolve)
    }
}, {
    path: '/legal/paidfeeapply',
    name: "录入已付款项",
    components: {
        "default": resolve => require(["../components/legal/home.vue"], resolve),
        "subPage": resolve => require(["../components/legal/paidfee/paidfeeapply.vue"], resolve)
    }
}, {
    path: '/legal/instrumentapply',
    name: "法律文书收取情况",
    components: {
        "default": resolve => require(["../components/legal/home.vue"], resolve),
        "subPage": resolve => require(["../components/legal/instrument/instrumentapply.vue"], resolve)
    }
}, {
    path: '/legal/judgementapply',
    name: "判决书收取情况",
    components: {
        "default": resolve => require(["../components/legal/home.vue"], resolve),
        "subPage": resolve => require(["../components/legal/judgement/judgementapply.vue"], resolve)
    }
}, {
    path: '/legal/rulingapply',
    name: "裁判书收取情况",
    components: {
        "default": resolve => require(["../components/legal/home.vue"], resolve),
        "subPage": resolve => require(["../components/legal/ruling/rulingapply.vue"], resolve)
    }
}, {
    path: '/legal/statistics',
    name: "统计分析",
    components: {
        "default": resolve => require(["../components/legal/home.vue"], resolve),
        "subPage": resolve => require(["../components/legal/statistics/statistics.vue"], resolve)
    }
}];

// 设置路由信息
const router = new Router({ base: "/", routes, });

// history模式跳转到新页面，返回顶部
router.afterEach((to, from, next) => {
    window.scrollTo(0, 0);
});

export default router;