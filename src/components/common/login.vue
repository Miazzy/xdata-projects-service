<template>
  <div id="home" style="background-color:#f0f0f0;width:100%;height:auto;">
    <div class="content" style="background-color:#f0f0f0;width:100%;height:100%;">

        <div class="circle" style=" display:inline; ">
            <img class="bgCircle2" src="../../assets/images/bgCircle2.png" :style="status == true ? `transition: all 60s linear; transform: rotate(90deg); ` :  `transition: all 60s linear; transform: scale(0.95);` " />
            <img class="bgCircle3" src="../../assets/images/bgCircle3.png" :style="status == true ? `transition: all 60s linear; transform: rotate(-90deg);` :  `transition: all 60s linear; transform: scale(0.95);` " />
            <img class="bgCircle4" src="../../assets/images/bgCircle4.png" :style="status == true ? `transition: all 60s linear; transform: rotate(90deg);`  :  `transition: all 60s linear; transform: scale(0.95);` " />
        </div>

        <div class="bg1"></div>
		<div class="gyl">
		        法务诉讼系统
		    <div class="gy2" > </div>   
		</div>
		<div class="bg">
			<div class="wel">用户登录</div>			
	        <div class="user">
	       	    <div id="yonghu" style="">用户名</div>
	       	    <input  type="text" name="用户"  value="admin" />
	        </div>
	        <div class="password" >
	        	<div id="yonghu" >密&nbsp;&nbsp;&nbsp;码</div>
	       	    <input class="" type="password" name="密码" value="......" />
	        </div>
	        <div class="rem" >
	       	  <input type="checkbox" name="" id="" value="" />
	        	 <div id="reb">
	        	 	记住密码
	        	 </div>
	        </div>
	        <div class="fg" >
	       	    <div style="font-size: 11px;margin-top: 11px;">
	       	    	<a style="font-size: 11px;" href="#">忘记密码？</a>
	       	    </div>
	        </div>
	        <input class="btn" type="button" name="登录" value="登录" />
		</div>
    </div>
  </div>
</template>
<script>
import header from '@/components/legal/header.vue';
import * as workconfig from '@/request/workconfig';

export default {
  mixins: [window.mixin],
  components: {
      header
  },
  data() {
    const { $router } = this;
    return {
      pageName: "案件管理",
      momentNewMsg: true,
      activeTabKey: 3,
      iswechat:'',
      userinfo: '',
      usertitle:'',
      lawyerlist:[],
      role:'',
      status: true,
      breadcrumb:[{icon:'',text:'所有功能',path:'/legal/workspace'},{icon:'',text:'任务面板',path:'/legal/workspace'},{icon:'',text:'案件管控',path:'/legal/workspace'},{icon:'',text:'律所律师',path:'/legal/workspace'},{icon:'',text:'法院法官',path:'/legal/workspace'}],
    };
  },
  activated() {
    this.queryInfo();
  },
  mounted() {
    this.queryInfo();
  },
  methods: {
    isNull:Betools.tools.isNull,
    deNull:Betools.tools.deNull,
    
    // 查询初始化信息
    async queryInfo() {
      try {
        const { $router } = this;
        vant.Toast.loading({ duration: 3000,  forbidClick: false,  message: '加载中...', });

        vant.Toast.clear();
        setTimeout(()=>{ this.status = false }, 500); //让登录界面背景图旋转，transform需要设置一下 transition才生效
      } catch (error) {
        console.log(error);
      }
    },

    // 企业微信登录处理函数
    async  weworkLogin  (codeType = 'search', systemType = 'search', version = 'v5')  {
        /**
         URL直连模式登陆：http://stock.yunwisdom.club:30080/#/?mode=session&mobile=19999763013&account=bWVuZ3Fm
          1. mobile请替换为登录人的mobile。
          2. account请替换为登录人的account，注意account需要使用window.btoa('args')函数处理一下。
         */
        return await Betools.query.weworkLogin(codeType, systemType, version);
    },

    // 执行页面跳转
    async redirectView(path) {
        Betools.tools.isNull(path) ? null: this.$router.push(path);
    },
    
  },
};
</script>
<style scoped >
    @import "../../assets/css/login.css";
</style>
