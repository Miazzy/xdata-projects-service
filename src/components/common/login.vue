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
	       	    <div id="account" style="">用户名/电话</div>
	       	    <input type="text" v-model="element.account" name="用户" />
	        </div>
	        <div class="password" >
	        	<div id="password" >密码/验证码</div>
	       	    <input type="password" v-model="element.password" name="密码" />
	        </div>
	        <div class="rem" style="display:none;">
	       	  <input type="checkbox" name="" id="" value="" />
	        	 <div id="reb">
	        	 	记住密码
	        	 </div>
	        </div>
	        <div class="fg" >
	       	    <div style="font-size: 11px;margin-top: 11px;" @click="redirectPassCode()">
	       	    	<a style="font-size: 11px;" href="#">忘记密码/发送验证码？</a>
	       	    </div>
	        </div>
	        <input class="btn" type="button" name="登录" value="登录" @click="redirectValidLogin()"/>
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
      element:{
          account:'',
          password:'',
          md5_password:'',
          validcode:'',
      },
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

    // 跳转到登录界面
    async redirectLogin(usertitle = ''){
      const { $router } = this;
      if(usertitle == '登录'){ // 如果页面显示为登录，则跳转到登录界面
        $router.push('/login');
      }
    },

    // 执行页面跳转
    async redirectView(path) {
        Betools.tools.isNull(path) ? null: this.$router.push(path);
    },

    // 发送验证码
    async redirectPassCode(){

        const { element } = this;
        element.validcode = (Math.random() * 100000000 ).toString().slice(0,4);
        
        // 检查是否输入账号或电话
        if(Betools.tools.isNull(element.account)){
          return await vant.Dialog.alert({ title: '温馨提示', message: `请先输入您的用户名或者手机号，才能发送验证码！`,});
        }
        element.account = element.account.trim();
        vant.Toast.loading({ duration: 3000,  forbidClick: false,  message: '发送验证码...', });
        try {
            await superagent.get(`${window.BECONFIG['restAPI']}/api/v1/weappms/${element.account}/您好，您的登录验证码：${element.validcode}。?type=legal&rurl=`).set('accept', 'json');
        } catch (error) {
            await superagent.get(`${window.BECONFIG['restAPI']}/api/v1/weappms/${element.account}/您好，您的登录验证码：${element.validcode}。?type=legal&rurl=`).set('accept', 'json');
        } finally {
            vant.Toast.clear();
        }
    },

    // 验证登录
    async redirectValidLogin(){

        vant.Toast.loading({ duration: 3000,  forbidClick: false,  message: '登录中...', });
        const { element , $router} = this; // 获取账户信息
        debugger;
        // 检查是否输入账号或电话
        if(Betools.tools.isNull(element.account)){
            vant.Toast.clear();
            return await vant.Dialog.alert({ title: '温馨提示', message: `请输入您的用户名或者手机号！`,});
        }
        // 检查是否输入密码或验证码
        if(Betools.tools.isNull(element.password)){
            vant.Toast.clear();
            return await vant.Dialog.alert({ title: '温馨提示', message: `请输入您的密码或验证码！`,});
        }
        // 检查验证码是否正确
        if(!Betools.tools.isNull(element.validcode) && element.validcode != element.password){
            // 如果密码不等于验证码，则校验密码是否为数据库密码
            element.md5_password = md5(element.password);
            const list = await Betools.manage.queryTableData('v_hrmresource', `_where=(mobile,eq,${element.account})~and(password,eq,${element.(mobile,eq,${element.account})})&_sort=id&_p=0&_size=1`);
            vant.Toast.clear();
            if(!(!Betools.tools.isNull(list) && list.length > 0)){
              return await vant.Dialog.alert({ title: '温馨提示', message: `您输入的验证码或密码有误，请重新发送验证码或重新输入密码！`,});
            } else {
              this.redirectWorkspace(element, $router);
            }
        }

        // 验证码正确，进行登录操作
        if(!Betools.tools.isNull(element.validcode) && element.validcode == element.password){
            this.redirectWorkspace(element, $router);
        }
        
    },

    // 验证登录
    async redirectWorkspace(element, $router){
      vant.Toast.loading({ duration: 3000,  forbidClick: false,  message: '验证成功...', });
        element.account = element.account.trim();
        const list = await Betools.manage.queryTableData('v_hrmresource', `_where=(mobile,like,${element.account}~)&_sort=id&_p=0&_size=1`);
        if(!Betools.tools.isNull(list) && list.length > 0){
            const userinfo = (!Betools.tools.isNull(list) && list.length > 0) ? list[0] : '';
            const node = {
                avatar: userinfo.avatar,
                company: { name:userinfo.company },
                department: { name:userinfo.departname},
                parent_company:{ name:userinfo.topname + '>' + userinfo.departname + `(${userinfo.position})`},
                email:userinfo.email,
                gender: userinfo.gender,
                mobile:userinfo.mobile,
                name:userinfo.name,
                openid: '',
                phone:userinfo.mobile,
                orgin_userid:userinfo.userid,
                realname:userinfo.name,
                position:userinfo.position,
                status: 1,
                systemuserinfo:userinfo,
                telephone:userinfo.mobile,
                thumb_avatar:userinfo.avatar,
                userid:userinfo.userid,
                username:userinfo.loginid,
                loginid:userinfo.loginid,
            };
            vant.Toast.loading({ duration: 3000,  forbidClick: false,  message: '登录中...', });
            await Betools.storage.setStore('system_userinfo', node);
            await Betools.tools.sleep(1000);
            vant.Toast.clear();
            $router.push(`/workspace`);
        } else {
            vant.Toast.clear();
            return await vant.Dialog.alert({ title: '温馨提示', message: `您好，未获取到您的用户信息，请稍后重试或联系管理员协助处理！`,});
        }
    }
    
  },
};
</script>
<style scoped >
    @import "../../assets/css/login.css";
</style>
