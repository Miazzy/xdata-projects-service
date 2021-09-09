<template>
  
  <div id="reward-home">

      <div style="background-color:#f0f0f0;">

      <a-menu mode="horizontal">
        <a-sub-menu>
            <span slot="title" class="submenu-title-wrapper" >
              <a-avatar :src="userinfo.avatar" style="margin-left:0.25rem; margin-right:0.55rem;" />
              {{ usertitle }} 
            </span>
            <a-menu-item-group title="应用中心">
            <a-menu-item key="setting:1" :to="`/stock/message`"  @click="redirectView('/stock/message')" >
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

          <a-col :xl="24" :lg="24" :md="24" :sm="24" :xs="24">

            <div id="" class="" :style="`padding-left:2.75rem;padding-top:0.25rem;padding-bottom:0.25rem;background-color:#fefefe; ${iswechat ? `width:180%;` : '' }`" >
              <a-breadcrumb>
                <template v-for="(elem,index) in breadcrumb">
                  <a-breadcrumb-item :key="elem.icon" :index="index" >
                    <a-icon :type="elem.icon" />
                    <span @click="redirectView(elem.path)">{{ elem.text }}</span>
                  </a-breadcrumb-item>
                </template>
              </a-breadcrumb>
            </div>

            <!-- 统计分析 -->
            <div style="background-color:#f0f0f0;">

              <div id="legal-apply-content" class="reward-apply-content" :style="`height:auto; background-color:#fefefe; margin-top:0px; margin-left: 0.0rem; margin-right: 0.0rem; margin-bottom: 5rem; border: 1px solid #f0f0f0; front-size: 1rem; ${iswechat ? `width:180%;` : '' }`" >

                <div class="reward-apply-header" style="height:80px; width:100%; text-align:center; margin-top:20px; font-size: 1.5rem; ">
                  统计分析
                </div>

                <div style="height:100px;">
                </div>

              </div>

            </div>
          </a-col>
        </keep-alive>
      </a-row>
    </div>
  </div>
</template>
<script>
import * as workflow from '@/request/workflow';
import * as workconfig from '@/request/workconfig';
import * as workprocess from '@/request/wflow.process';

export default {
  mixins: [window.mixin],
  data() {
    return {
      iswechat:false,
      iswework:false,
      pageName: "统计分析",
      momentNewMsg: true,
      activeTabKey: 3,
      acceptType:'*/*',
      uploadURL: workconfig.system.uploadURL,
      tablename:'v_legal_num',
      size: 0,
      options:{
        create_time:workconfig.system.options.datetime,
        in_time:workconfig.system.options.datetime,
        establish_time:workconfig.system.options.datetime,
        start_time:workconfig.system.options.datetime,
        coop_time:workconfig.system.options.datetime,
        out_time:workconfig.system.options.datetime,
        datetime:workconfig.system.options.datetime,
        zoneOptions: workconfig.system.options.zoneOptions, 
      },
      id:'',
      pid:'',
      workflow:{
        content:'',
      },
      legal: {
          title:'',
      },
      element: {
          id:'',
      },
      data: [],
      subData:[],
      subColumns: workconfig.subColumns.subColumns,
      readonly: false,
      userList:[],
      role:'',
      file:'',
      selectedSheet: null,
      sheetName: null,
      collection: [{ }],
      userinfo: '',
      usertitle:'',
      columns: workconfig.columns.reward.items,
      wfcolumns: workconfig.columns.reward.wfcolumns,
      message: workconfig.compValidation.legalapply.message,
      valid: workconfig.compValidation.legalapply.valid,
      goodsborrowtype: workconfig.goodsborrowtype,
      diplomaType: workconfig.compcolumns.diplomaTypeColumns,
      acceptType: workconfig.compcolumns.acceptType,
      commonTypeColumns: workconfig.compcolumns.commonTypeColumns,
      sealTypeColumns: workconfig.compcolumns.sealTypeColumns,
      statusList:['存续','注销','经营异常'],
      natureList:['关联公司','非关联公司'],
      industryList:[ '房地产行业', '物业行业', '商管行业', '金融行业', '商贸行业', '建筑行业', '高新技术行业', '监理行业', '医疗行业', '商务咨询行业', '环保行业', '教育行业'],
      breadcrumb:[{icon:'home',text:'首页',path:'/legal/workspace'},{icon:'user',text:'统计分析',path:'/legal/workspace'},{icon:'form',text:'可视化数据',path:''}],
      statusType:{'valid':'有效','invalid':'删除'},
      zoneType: workconfig.system.options.zoneType,
    };
  },
  activated() {

  },
  mounted() {
    this.queryInfo();
  },
  methods: {
      moment,
      isNull:Betools.tools.isNull,
      deNull:Betools.tools.deNull,

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
     
      // 获取基础信息
      async queryInfo() {
        try {

          try {
              this.iswechat = Betools.tools.isWechat(); //查询当前是否微信端
              this.iswework = Betools.tools.isWework(); //查询是否为企业微信
          } catch (error) {
              console.error(error);
          }

          try {
              const weworkinfo = await this.weworkLogin('search','search','v5'); //查询当前登录用户
              this.userinfo = weworkinfo.userinfo;
              this.usertitle = weworkinfo.usertitle;
          } catch (error) {
              console.error(error);
          }

          try {
              this.role = Betools.tools.getUrlParam('role');
              this.stage = Betools.tools.getUrlParam('stage');
              this.apply = Betools.tools.getUrlParam('apply') || 'view';
              this.back = Betools.tools.getUrlParam('back') || '/legal/workspace'; //查询上一页
          } catch (error) {
              console.error(error);
          }

          const userinfo = await Betools.storage.getStore('system_userinfo');  //获取用户基础信息  
          try {
            this.element.create_time = dayjs().format('YYYY-MM-DD');
            this.element.create_by = (userinfo ? userinfo.realname || userinfo.name || userinfo.lastname : '');
            this.element.create_username =  (userinfo ? userinfo.username || userinfo.loginid : '');
          } catch (error) {
            console.error(error);
          }

        } catch (error) {
          console.error(error);
        }
      },

  },
};
</script>
<style scoped >
    @import "../../../assets/css/reward.home.css";
    @import "../../../assets/css/reward.apply.css";
    @import "../../../assets/css/progress.apply.css";
</style>
