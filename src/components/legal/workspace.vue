<template>
  <div id="reward-home" style="background-color:#f0f0f0;width:100%;height:auto;">
      <div style="background-color:#f0f0f0;width:100%;height:1500px;">
      <a-menu mode="horizontal">
        <a-sub-menu>
            <span slot="title" class="submenu-title-wrapper" >
              <a-avatar :src="userinfo.avatar" style="margin-left:0.25rem; margin-right:0.55rem;" />
              <span @click="redirectLogin(usertitle)"> {{ usertitle }} </span>
            </span>
            <a-menu-item-group title="应用中心">
            <a-menu-item key="setting:1" :to="`/legal/message`"  @click="redirectView('/legal/message')" >
                审批
            </a-menu-item>
            <a-menu-item key="setting:2" :to="`/legal/workspace`" @click="redirectView('/legal/workspace')" >
                工作台
            </a-menu-item>
            </a-menu-item-group>
        </a-sub-menu>
      </a-menu>
      <a-row :gutter="24">

        <keep-alive>
          <a-col :xl="24" :lg="24" :md="24" :sm="24" :xs="24" style="position:relative;">

            <div style="position:absolute;left:0px width:80px;" >
              <van-sidebar v-model="activeTabKey">
                <van-sidebar-item style="display:block;" title="审批" :to="`/legal/message`" />
                <van-sidebar-item style="display:none;" title="云文档" :to="`/legal/netdisk`" />
                <van-sidebar-item style="display:none;" title="联系人" :to="`/legal/contact`" />
                <van-sidebar-item style="display:block;" title="工作台" :to="`/legal/workspace`" />
                <van-sidebar-item style="display:none;" title="收藏" :to="`/legal/collect`" />
                <van-sidebar-item style="display:none;" title="设置" :to="`/legal/setup`" />
              </van-sidebar>
            </div>

            <div style="position:absolute; left:80px; width:900px;" >

              <div v-show="role.includes('LEGAL_ADMIN')" id="" class="" style="padding-left:0.75rem;padding-top:0.25rem;padding-bottom:0.25rem;background-color:#fefefe;" >
                <a-breadcrumb>
                  <template v-for="(elem,index) in breadcrumb">
                    <a-breadcrumb-item :key="elem.icon" :index="index" >
                      <a-icon :type="elem.icon" />
                      <span @click="redirectFunc(elem.text)">{{ elem.text }}</span>
                    </a-breadcrumb-item>
                  </template>
                </a-breadcrumb>
              </div>

              <template v-for="(pane,index) in paneflows"  >
                <a-card v-show="pane.display" :key="pane.id"  :title="pane.title"  class="pane-flow-card" >
                  <template v-for="item in pane.taskflows"  >
                    <a-card-grid :key="item.href" style="width:25%;textAlign:'center'">
                      <a-card-meta>
                        <div slot="title" class="card-title pane-flow-card-meta" @click="item.click" >
                          <div class="pane-flow-card-meta-icon">
                            <a-avatar size="large"  :src="item.avatar" />
                          </div>
                          <div class="pane-flow-card-meta-title" >
                            <a class="pane-flow-card-meta-tname" >{{ item.name }}</a>
                            <div class="pane-flow-card-meta-description" > {{ item.description }} </div>
                          </div>
                        </div>
                      </a-card-meta>
                    </a-card-grid>
                  </template>
                </a-card>
                <a-card v-show="pane.display" v-if="index <= 1000" :key="pane.id + pane.title" :title="' '" class="pane-flow-card-middle" >
                </a-card>
              </template>
            </div>

            <div v-show="role.includes('LEGAL_ADMIN') || true " style="position:absolute; left:1000px; width: 350px;">
                
                <a-card title="便捷导航" style="margin-bottom: 10px" :bordered="false" :body-style="{padding: 0}" >
                  <div class="item-group">
                    <div class="pane-right-item-group" >
                      <template v-for=" item in quicktags">
                        <a-tag class="pane-right-item-group-tag" :key="item.name" :color="item.color" @click="item.click" >{{item.name}}</a-tag>
                      </template>
                    </div>
                  </div>
                </a-card>

                <div id="nav-content-law-num-count" style="">
                    <dv-border-box-7 style="height:250px;width:350px;background:#000000;">
                      <div style="background:#000000;">
                        <div style="color:#f0f0f0; height:20px; font-size:15px; margin-top:10px; margin-bottom:25px; margin-left:10px; ">数量统计：</div>
                        <dv-conical-column-chart :config="caseNumConfig" style="width:350px;height:180px;" />
                      </div>
                    </dv-border-box-7>
                </div>

                <div id="nav-content-law-sum-count" style="margin-top:10px;">
                    <dv-border-box-7 style="height:270px;width:350px;background:#000000;">
                      <div style="background:#000000;">
                        <div style="color:#f0f0f0; height:20px; font-size:15px; margin-top:10px; margin-bottom:-20px; margin-left:10px; ">数量比率：</div>
                        <dv-active-ring-chart :config="caseNumRatioConfig" style="width:350px;height:250px;transform:scale(1.2);" />
                      </div>
                    </dv-border-box-7>
                </div>

                <div id="nav-content-law-sum-count" style="margin-top:10px;">
                    <dv-border-box-7 style="height:220px;width:350px;background:#000000;">
                      <div style="background:#000000;">
                        <div style="color:#f0f0f0; height:20px; font-size:15px; margin-top:10px; margin-bottom:-20px; margin-left:10px; ">阶段统计：</div>
                        <dv-capsule-chart :config="caseNumStageConfig" style="width:350px;height:auto;margin-top:30px; " />
                      </div>
                    </dv-border-box-7>
                </div>

                <div id="nav-content-law-sum-count" style="margin-top:10px;">
                    <dv-border-box-7 style="height:270px;width:350px;background:#000000;">
                      <div style="background:#000000;">
                        <div style="color:#f0f0f0; height:20px; font-size:15px; margin-top:10px; margin-bottom:-20px; margin-left:10px; ">阶段比率：</div>
                        <dv-active-ring-chart :config="caseNumStageRatioConfig" style="width:350px;height:250px;transform:scale(1.2);" />
                      </div>
                    </dv-border-box-7>
                </div>

                <div id="nav-content-law" style="margin-top:10px;">
                  <a-card :loading="loading" title="法律网站" :bordered="false" style="margin-top:10px;">
                    <a-tag color="blue" style="margin-bottom:0px;position:absolute;top:18px;right:20px;display:none;" ></a-tag>
                    <div class="members" >
                      <a-row>
                        <a-col :span="item.span" v-for="item in lawsites" :key="item.href" style="padding-bottom:10px;">
                          <a @click="item.click" style="margin-top:0px;margin-bottom:5px;padding-bottom:5px;">
                            <span class="member" style="margin-top:0px;margin-bottom:5px;padding-bottom:5px;" >{{ item.name }}</span>
                          </a>
                        </a-col>
                      </a-row>
                    </div>
                  </a-card>
                </div>

            </div>
            
          </a-col>
        </keep-alive>

      </a-row>
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
      paneflows: workconfig.reward($router),
      wflows: workconfig.getRewardWflow($router),
      lawsites: workconfig.getLawWebsiteflow($router),
      quicktags: workconfig.getRewardQuickTag($router),
      userinfo: '',
      usertitle:'',
      lawyerlist:[],
      role:'',
      status:'loading',
      caseNumConfig:{
        data: [
          {
            name: '所有案件',
            value: 126
          },
          {
            name: '起诉案件',
            value: 55
          },
          {
            name: '应诉案件',
            value: 71
          },
        ],
        img: [
          'http://datav.jiaminghi.com/img/conicalColumnChart/1st.png',
          'http://datav.jiaminghi.com/img/conicalColumnChart/2st.png',
          'http://datav.jiaminghi.com/img/conicalColumnChart/5st.png',
        ],
        showValue: true,
      },
      caseNumRatioConfig: {
        radius: '40%',
        activeRadius: '45%',
        data: [
          {
            name: '起诉案件',
            value: 55
          },
          {
            name: '应诉案件',
            value: 71
          },
        ],
        digitalFlopStyle: {
          fontSize: 12
        },
        lineWidth: 15,
        color: ['#e062ae', '#32c5e9', '#fb7293', '#e690d1', '#96bfff'],
      },
      caseNumStageConfig:{
        data: [
          {
            name: '仲裁阶段',
            value: 167
          },
          {
            name: '一审阶段',
            value: 67
          },
          {
            name: '二审阶段',
            value: 123
          },
          {
            name: '再审阶段',
            value: 55
          },
          {
            name: '执行阶段',
            value: 98
          },
          {
            name: '结案阶段',
            value: 98
          }
        ],
        unit: '单位',
        showValue: true,
      },
      caseNumStageRatioConfig:{
        radius: '40%',
        activeRadius: '45%',
        data: [
          {
            name: '仲裁阶段',
            value: 167
          },
          {
            name: '一审阶段',
            value: 67
          },
          {
            name: '二审阶段',
            value: 123
          },
          {
            name: '再审阶段',
            value: 55
          },
          {
            name: '执行阶段',
            value: 98
          },
          {
            name: '结案阶段',
            value: 98
          }
        ],
        digitalFlopStyle: {
          fontSize: 12
        },
        lineWidth: 15,
        color: ['#e062ae', '#32c5e9', '#fb7293', '#e690d1', '#96bfff'],
      },
      breadcrumb:[{icon:'',text:'所有功能',path:'/legal/workspace'},{icon:'',text:'任务面板',path:'/legal/workspace'},{icon:'',text:'案件管控',path:'/legal/workspace'} ,{icon:'',text:'关联流程',path:'/legal/workspace'} ,{icon:'',text:'费用流程',path:'/legal/workspace'} ,{icon:'',text:'文书流程',path:'/legal/workspace'},{icon:'',text:'律所律师',path:'/legal/workspace'},{icon:'',text:'法院法官',path:'/legal/workspace'}],
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
        this.iswechat = Betools.tools.isWechat(); //查询当前是否微信端
        const weworkinfo = await this.weworkLogin('search','search','v5'); //查询当前登录用户
        this.userinfo = weworkinfo.userinfo;
        this.usertitle = weworkinfo.usertitle;
        const userinfo = await Betools.storage.getStore('system_userinfo');

        if(!Betools.tools.isNull(weworkinfo.usertitle) && weworkinfo.usertitle == '登录'){
          this.$confirm({
            title: "温馨提示",
            content: "您好，未检测到您的登录信息，请先登录！",
            onOk: async(result) => {
              $router.push('/login');
            },
          });
        }

        (async() => {
          try {
            gwm.creation({ txt:userinfo.realname + ' ' + userinfo.username + ' ' + dayjs().format('YY-MM-DD'), width: 128, height: 80, x: 10, y: 70, fontSize: 10, color: '#ff99aa' });
          } catch (error) {
            console.error(`watermark error:`, error);
          }
        })();

        (async() => { //获取操作权限信息,权限管控功能
          try {
            const role = await Betools.query.queryRoleInfo();
            this.role = Betools.tools.deNull(role,'');
            if(!this.role.includes('LEGAL_ADMIN')){
              Betools.storage.clearStore('system_role_rights_v1');
              this.role = await Betools.query.queryRoleInfo();
              this.role = Betools.tools.deNull(this.role,'');
            }
            if(!this.role.includes('LEGAL_ADMIN')){
              const pname = Betools.tools.deNull(this.userinfo.systemuserinfo.textfield1,'');
              pname.includes('法务') ? this.role += 'LEGAL_ADMIN' : '';
              this.role = this.deNull(this.role,'');
            }
            if(!this.role.includes('LEGAL_ADMIN')){
              this.paneflows.map(item=>{ item.title == '任务面板' ? item.display = true : item.display=false; }); // vant.Dialog.alert({  title: '温馨提示',  message: `您没有法务诉讼系统的操作权限！`, });
              console.log(`query permission no rights...`);
            } 
            this.status = 'complete';
            vant.Toast.clear();
          } catch (error) {
            console.error(`query permission error:`,error);
          }
        })();

        (async() => { //打印指纹信息
            try {
                await Betools.query.queryCrontab('18:0');
                const result = await(await FingerprintJS.load()).get();
                if(Betools.tools.isNull(userinfo)){
                  const content = result.visitorId + '__' + (Betools.tools.isNull(userinfo) ? '' : window.btoa(window.encodeURIComponent(JSON.stringify(userinfo||null))));
                  Betools.console.info('finger' , content , 'info' , 'ADM' , Betools.tools.isNull(userinfo) ? '' : userinfo.realname);
                }
            } catch (error) {
                console.error(`finger print error:`,error);
            }
        })();

        (async() => { //根据URL信息跳转到相应详情页面
            try {
              if(window.location.href.includes('/evaluate/')){
                const path = window.location.href.split(window.location.host)[1];
                const arr = path.slice(1).split('/');
                const apply = arr[0];
                if(apply == 'evaluate') {
                  const id = arr[1];
                  const username = arr[2];
                  $router.push(`/legal/case/legalapply?id=${id}&type=1&tname=案件详情&apply=${apply}&role=notify&rem=${username}`);
                }
              }
            } catch (error) {
              console.error(`redirect url error:`,error);
            }
        })();

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

    // 执行页面跳转
    async redirectFunc(text) {
        this.paneflows.map(elem => {
          text != '所有功能' ? (elem.title == text ? elem.display = true : elem.display = false) : elem.display = true;
        });
    },
    
  },
};
</script>
<style scoped >
    @import "../../assets/css/reward.home.css";
</style>
