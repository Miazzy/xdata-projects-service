<template>
  <div id="reward-message" style="background-color:#f0f0f0; height:auto;" >
    <div style="background-color:#f0f0f0; height:auto;">
      <a-menu mode="horizontal">
        <a-sub-menu>
            <span slot="title" class="submenu-title-wrapper" >
              <a-avatar :src="userinfo.avatar" style="margin-left:0.25rem; margin-right:0.55rem;" />
              {{ usertitle }} 
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

            <div style="position:absolute; left:80px; width:240px;">
              <a-card class="pane-flow-card" :style="paneflowcard">
                <div style="margin:10px 15px 10px 25px;">
                  <a-input-search
                    :value="searchwords"
                    placeholder="搜索"
                    loading
                    @change="searchWordChange"
                  />
                </div>

                <template v-for="item in paneflows" :style="paneflowcard">
                  <a-card-grid
                    class="pane-flow-card-grid"
                    :key="item.href"
                    v-show="item.show"
                    @click="menuCardClick(item.id , item.ename);"
                    :style="item.css"
                    style="border-bottom: 1px solid #f9f9f9; border-radius: 4px;"
                  >
                    <a-card-meta>
                      <div slot="title" class="card-title pane-flow-card-meta"  @click="item.click">
                        <div class="pane-flow-card-meta-icon">
                          <a-avatar size="middle" :src="item.avatar" style="margin-top: 5px;" />
                        </div>
                        <div class="pane-flow-card-meta-title">
                          <a class="pane-flow-card-meta-tname">{{ item.name }}</a>
                          <div class="pane-flow-card-meta-description">{{ item.description }}</div>
                        </div>
                      </div>
                    </a-card-meta>
                    <div ></div>
                  </a-card-grid>
                </template>
              </a-card>
            </div>

            <div id="van-reward-content" style="position:absolute; left:325px; width:1100px;">
              <a-col style="padding: 0 12px 0 0" >
                <template v-for=" paneflow in paneflows ">

                  <a-card
                    :key="paneflow.ename"
                    v-show=" panename == paneflow.ename "
                    style="margin-top: 0px; height: 800px; overflow-y:scroll;"
                    :bordered="false"
                    :title="paneflow.name">

                    <div slot="extra">

                      <a-radio-group v-show="paneflow.periodTabsFlag" v-model="year" style="margin-right:20px;display:none;">
                        <a-radio-button value="all">所有</a-radio-button>
                        <a-radio-button value="half">半年</a-radio-button>
                        <a-radio-button value="year">全年</a-radio-button>
                      </a-radio-group>

                      <a-radio-group v-model="status">
                        <a-radio-button v-show="paneflow.tabs[0]" @click="queryDataByType(0 , typename , panename);" value="all">{{ paneflow.tabs[0]}}</a-radio-button>
                        <a-radio-button v-show="paneflow.tabs[1]" @click="queryDataByType(1 , typename , panename);" value="init">{{ paneflow.tabs[1] }}</a-radio-button>
                        <a-radio-button v-show="paneflow.tabs[2]" @click="queryDataByType(2 , typename , panename);" value="processing">{{ paneflow.tabs[2] }}</a-radio-button>
                        <a-radio-button v-show="paneflow.tabs[3]" @click="queryDataByType(3 , typename , panename);" value="complete">{{ paneflow.tabs[3] }}</a-radio-button>
                        <a-radio-button v-show="paneflow.tabs[3]" @click="queryDataByType(4 , typename , panename);" value="reject">{{ paneflow.tabs[4] }}</a-radio-button>
                      </a-radio-group>
                      <a-input-search style="margin-left: 16px; width: 272px;" />
                    </div>

                    <div id="reward-list-item" style="background:#fefefe;margin:10px 2px; pading:10px 2px; height: 650px; overflow-y:scroll;">
                      <a-list-item :key="index" v-for="(item, index) in paneflow.dataSource" style="background:#fefefe;margin:10px 10px;pading:10px 10px;border-bottom:1px solid #f0f0f0;">
                        <a-list-item-meta :description="item.description" style="display:block;">
                          <a-avatar style="display:none;" slot="avatar" size="large" shape="square" :src="item.avatar"/>
                          <a slot="title">
                            <span style="display:block;"> {{ item.title ? (item.title) : ''}} </span>
                            <span style="display:block;margin-top:5px;">{{ item.content ? (item.content.slice(0,30) + '...') : '' }} </span>
                          </a>
                        </a-list-item-meta>
                        <div slot="actions">
                          <a @click="querylegalview(item.id , panename , item , item.bpm_status , item.proponents , item.pid , item)">查看</a>
                        </div>
                        <div class="list-content">
                          <div v-show="item.reward_period" class="list-content-item">
                            <span>申请奖金</span>
                            <p>{{ item.amount }}</p>
                          </div>
                          <div v-show="item.reward_period" class="list-content-item">
                            <span>所属周期</span>
                            <p>{{ item.reward_period }}</p>
                          </div>
                          <div class="list-content-item">
                            <span>开始时间</span>
                            <p>{{ item.startAt }}</p>
                          </div>
                          <div v-show="item.apply_realname || item.proponents" class="list-content-item">
                            <span>流程发起</span>
                            <p>{{ item.apply_realname || item.proponents }}</p>
                          </div>
                          <div v-show="item.action" class="list-content-item">
                            <span>审批操作</span>
                            <p>{{ item.action }}</p>
                          </div>
                          <div v-show="bpm_status[item.bpm_status]" class="list-content-item">
                            <span>流程发起</span>
                            <p>{{ bpm_status[item.bpm_status] }}</p>
                          </div>
                          <div class="list-content-item" style="display:none;">
                            <a-progress :percent="item.progress.value" :status="!item.progress.status ? null : item.progress.status" style="width: 180px" />
                          </div>
                        </div>
                      </a-list-item>
                    </div>
                  </a-card>
                </template>
              </a-col>
            </div>

          </a-col>
        </keep-alive>
        <keep-alive>


        </keep-alive>
      </a-row>
    </div>
  </div>
</template>
<script>
import * as workconfig from "@/request/workconfig";
import * as task from '@/request/task';
import * as manageAPI from '@/request/manage';
//import * as query from '@/request/query';
import * as contact from '@/vuex/contacts';

export default {
  mixins: [window.mixin],
  data() {
    return {
      activeTabKey: 0,
      pageName: "诉讼案件消息",
      momentNewMsg: true,
      paneflowcard: "",
      paneflowcardGrid: "",
      searchwords: "",
      tabname: 1,
      tablename:'bs_legal',
      panename:'mynotifylist',
      constpaneflows: workconfig.getPaneflows(this),
      paneflows: workconfig.getPaneflows(this),
      allList:[],
      initList:[],
      confirmList:[],
      doneList:[],
      rejectList:[],
      status: 'all',
      statusMap: {0:'all',1:'init',2:'processing',3:'complete',4:'reject'},
      year:'all',
      bpm_status:{1:'待提交',2:'审核中',3:'审批中',4:'已完成',5:'已完成',6:'已确认',10:'已作废' , 100:'已驳回',}, //流程状态 1：待提交  2：审核中  3：审批中  4：已完成  5：已完成  10：已作废
      business_code: '000000000',
      typename:'',
      userinfo:'',
      usertitle:'',
    };
  },
  activated() {
    this.init();
  },
  mounted() {
    this.init();
  },
  methods: {
    isNull:Betools.tools.isNull,
    deNull:Betools.tools.deNull,

    async init() {
      this.panename = Betools.tools.getUrlParam('panename') || Betools.storage.getStore(`system_message_panename`) || 'mynotifylist';
      const weworkinfo = await this.weworkLogin('search','search','v5'); //查询当前登录用户
      this.userinfo = weworkinfo.userinfo;
      this.usertitle = weworkinfo.usertitle;
      this.tabname = Betools.storage.getStore(`system_message_tabname`) || 0 ;
      this.status = this.statusMap[this.tabname];
      this.constpaneflows = JSON.parse(JSON.stringify(this.paneflows));
      if(this.panename == 'mynotifylist' ){
        this.typename = 'notify';
        this.querySystemListByType(this.tabname , this.typename , this.panename);
      } else if(this.panename == 'mytodolist'){ //我的待办
        this.typename = 'wflow_todo';
        this.querySystemTodoListByType(this.tabname, this.typename , this.panename);
      } else if(this.panename == 'mydonelist'){ //我的已办
        this.typename = 'wflow_done';
        this.querySystemDoneListByType(this.tabname , this.typename , this.panename);
      } else if(this.panename == 'myapplylist'){ //我的申请
        this.typename = 'apply';
        this.querySystemListByType(this.tabname , this.typename , this.panename);
      }
      this.paneflows.map((item) => {item.css = item.ename == this.panename ? "background:#f9f9f9;" : '';});
      Betools.storage.setStore(`system_message_typename` , this.typename , 3600 );
      Betools.storage.setStore(`system_message_panename` , this.panename , 3600 );
      const userinfo = this.userinfo = await Betools.storage.getStore('system_userinfo');
      this.usertitle = (userinfo && userinfo.parent_company && userinfo.parent_company.name ? userinfo.parent_company.name + ' > ' :'')  + (userinfo ? userinfo.realname || userinfo.name || userinfo.lastname : '');
    },

    // 执行页面跳转
    async redirectView(path) {
        Betools.tools.isNull(path) ? null: this.$router.push(path);
    },

    async queryDataByType(tabname = '', typename = '' , panename){
      this.tabname = tabname;
      if(this.panename == 'mynotifylist' ){
        this.typename = 'notify';
        this.querySystemListByType(this.tabname , typename , panename);
      } else if(this.panename == 'mytodolist'){ //我的待办
        this.typename = 'wflow_todo';
        this.querySystemTodoListByType(this.tabname, typename , panename);
      } else if(this.panename == 'mydonelist'){ //我的已办
        this.typename = 'wflow_done';
        this.querySystemDoneListByType(this.tabname , typename , panename);
      } else if(this.panename == 'myapplylist'){ //我的申请
        this.typename = 'apply';
        this.querySystemListByType(this.tabname , typename , panename);
      }
    },

    async searchWordChange() {
      this.paneflows.map((item, index) => {
        if (
          item.name.includes(this.searchwords) ||
          item.description.includes(this.searchwords)
        ) {
          item.show = true;
        } else {
          item.show = false;
        }
      });
      this.paneflows.sort();
    },

    async menuCardClick(id , panename) {
      this.panename = panename; // 设置panename属性
      this.status = 'all';
      this.tabname = 0;
      // 遍历paneflows
      this.paneflows.map((item) => {
        item.css =  item.id === id || item.ename == panename ? "background:#f9f9f9;" : '';
        item.dataSource = item.id === id || item.ename == panename ? item.dataSource : [];
        debugger;
        if(panename == 'mynotifylist'){ //我的知会
          this.typename = 'notify';
          this.querySystemListByType(0 , 'notify' , panename);
        } else if(panename == 'mytodolist'){ //我的待办
          this.typename = 'wflow_todo';
          this.querySystemTodoListByType(0 , 'wflow_todo' , panename);
        } else if(panename == 'mydonelist'){ //我的已办
          this.typename = 'wflow_done';
          this.querySystemDoneListByType(0 , 'wflow_done' , panename);
        } else if(panename == 'myapplylist'){ //我的申请
          this.typename = 'apply';
          this.querySystemListByType(0 , 'apply' , panename);
        }
      });
      Betools.storage.setStore(`system_message_typename` , this.typename , 3600 );
      Betools.storage.setStore(`system_message_panename` , this.panename , 3600 );
      Betools.storage.setStore(`system_message_tabname` , this.tabname , 3600 );
    },

    async querySystemList(tabname = '', typename = ''){

        const userinfo = await Betools.storage.getStore('system_userinfo');  //获取当前用户信息
        const month = dayjs().subtract(6, 'months').format('YYYY-MM-DD'); //获取最近6个月对应的日期
        let searchSql = ''; //设置查询语句
        const titlePrefix = typename == 'notify' ? '知会人力' : '申请历史';
        const queryNotifyLog = typename == 'notify' ? Betools.query.queryProcessLogNotifyByUserName : Betools.query.queryProcessLogApplyByUserName;
        let logList = await queryNotifyLog(this.tablename , this.userinfo.username);

        logList.map((item , index) => {
          let elem = typename == 'notify' ?  JSON.parse(item.business_data) : JSON.parse(item.business_data).data;
          if(Betools.tools.isNull(elem)){
            elem = JSON.parse(item.business_data);
          }
          item.pid = item.id;
          item.id = item.business_data_id;
          item.name = typename == 'notify' ? `抄送：${item.content} ` : `发起：${item.content} `;
          item.title = item.table_name !== 'bs_legal' ? `标题：${elem.title} ` : `标题：${elem.title} 案号：${elem.caseID} 程序：${elem.stage} ，案由：${ elem.caseType } ，原告：${elem.accuser}，被告：${elem.defendant.slice(0,15) + (elem.defendant.length > 15 ? '...' : '' ) }`;
          item.owner = item.create_by;
          item.tel = item.all = item.description = item.avatar = '';
          item.typename = typename;
          item.progress = { value: 90 };
          item.startAt = dayjs(item.create_time).format('YYYY-MM-DD');
        });

        if(tabname == 1){
          logList = logList.filter(item => {  return item.bpm_status == '1';  });
        } else if(tabname == 2){
          logList = logList.filter(item => {  return item.bpm_status == '2' || item.bpm_status == '3';  });
        } else if(tabname == 3){
          logList = logList.filter(item => {  return item.bpm_status == '4' || item.bpm_status == '5' || item.bpm_status == '6';  });
        } else if(tabname == 4){
          logList = logList.filter(item => {  return item.bpm_status == '99' || item.bpm_status == '100' || item.bpm_status == '10';  });
        }

        return logList;
    },

    async querySystemTodoList(tabname = '', typename = ''){

      try {
        let logList = await Betools.query.queryProcessLogByUserName(this.tablename , this.userinfo.username);
        debugger;
        logList.map((item , index) => {
          let elem = JSON.parse(item.business_data).data;
          if(Betools.tools.isNull(elem)){
            elem = JSON.parse(item.business_data);
          }
          item.pid = item.id;
          item.id = item.business_data_id;
          item.name = `发起：${item.content} `;
          item.title = item.table_name !== 'bs_legal' ? `标题：${elem.title} ` : `标题：${elem.title} 案号：${elem.caseID} 程序：${elem.stage} ，案由：${ elem.caseType } ，原告：${elem.accuser}，被告：${elem.defendant.slice(0,15) + (elem.defendant.length > 15 ? '...' : '' ) }`;
          item.owner = item.create_by;
          item.tel = item.all = item.description = item.avatar = '';
          item.typename = typename;
          item.progress = { value: 90 };
          item.startAt = dayjs(item.create_time).format('YYYY-MM-DD');
        });

        //如果tabname == 0 ，则展示所有数据 ，如果为 1 展示审批数据 ， 如果为 2 展示知会数据
        if(tabname == 1){
          logList = logList.filter(item => {  return item.action == '审批';  });
        } else if(tabname == 2){
          logList = logList.filter(item => {  return item.action == '知会';  });
        }

        return logList;
      } catch (error) {
        console.log(error);
      }

    },

    async querySystemDoneList(tabname = '', typename = ''){

      try {
        let logList = await Betools.query.queryProcessLogHistoryByUserName(this.tablename , this.userinfo.username);

        logList.map((item , index) => {
          let elem = JSON.parse(item.business_data).data;
          if(Betools.tools.isNull(elem)){
            elem = JSON.parse(item.business_data);
          }
          item.pid = item.id;
          item.id = item.business_data_id;
          item.name = `发起：${item.content} `;
          item.title = item.table_name !== 'bs_legal' ? `标题：${elem.title} ` : `标题：${elem.title} 案号：${elem.caseID} 程序：${elem.stage} ，案由：${ elem.caseType } ，原告：${elem.accuser}，被告：${elem.defendant.slice(0,15) + (elem.defendant.length > 15 ? '...' : '' ) }`;
          item.owner = item.create_by;
          item.all = item.tel = item.description = item.avatar = '';
          item.typename = typename;
          item.progress = { value: 90 };
          item.startAt = dayjs(item.create_time).format('YYYY-MM-DD');
        })

        //如果tabname == 0 ，则展示所有数据 ，如果为 1 展示发起数据 ， 如果为 2 展示审批数据 ， 如果为 3 展示驳回数据 ，如果为 4 展示知会数据
        if(tabname == 1){
          logList = logList.filter(item => {  return item.action == '发起';  });
        } else if(tabname == 2){
          logList = logList.filter(item => {  return item.action == '同意';  });
        } else if(tabname == 3){
          logList = logList.filter(item => {  return item.action == '驳回';  });
        } else if(tabname == 4){
          logList = logList.filter(item => {  return item.action == '知会';  });
        }

        return logList;
      } catch (error) {
        console.log(error);
      }

    },

    async querySystemTodoListByType(tabname = '', typename = '' , panename){
      try {
        this.tabname = tabname;
        const tlist =  await this.querySystemTodoList(tabname , typename , panename);
        this.paneflows.map( item => { //遍历paneflows
          if( panename == item.ename){
            item.dataSource = tlist;
            item.ename = panename;
          }
        })
      } catch (error) {
        console.error(error);
      }
      this.$router.push(`/legal/message?panename=mytodolist&type=7&back=/legal/workspace`, '_blank');
      Betools.storage.setStore(`system_message_tabname` , this.tabname , 3600 );
    },

    async querySystemDoneListByType(tabname = '', typename = '' , panename){
      try {
        this.tabname = tabname;
        const tlist =  await this.querySystemDoneList(tabname , typename , panename);
        this.paneflows.map( item => { //遍历paneflows
          if( panename == item.ename){
            item.dataSource = tlist;
            item.ename = panename;
          }
        });
      } catch (error) {
        console.error(error);
      }
      this.$router.push(`/legal/message?panename=mydonelist&type=7&back=/legal/workspace`, '_blank');
      Betools.storage.setStore(`system_message_tabname` , this.tabname , 3600 );
    },

    async querySystemListByType(tabname = 1 , typename = '' , panename){
      try {
        this.tabname = tabname;
        const tlist =  await this.querySystemList(tabname , typename , panename);
        this.paneflows.map( item => { //遍历paneflows
          if( panename == item.ename){
            item.dataSource = tlist;
            item.ename = panename;
          }
        });
      } catch (error) {
        console.error(error);
      }
      const redirectURL = typename == 'notify' ?  `/legal/message?panename=mynotifylist&type=7&back=/legal/workspace` : `/legal/message?panename=myapplylist&type=7&back=/legal/workspace`;
      this.$router.push(redirectURL, '_blank');
      Betools.storage.setStore(`system_message_tabname` , this.tabname , 3600 );
    },

    // 跳转到详情页面
    async querylegalview(id = '', panename = '', element = '', bpm_status = 1 , proponents = '' , pid){
      try {
        panename = Betools.tools.isNull(panename) ? this.panename : panename;
        const pviewName = element.table_name == 'bs_legal' ? 'legalapply' : element.table_name.replace('bs_legal_','') + 'apply';
        const redirectURL = `${window.location.protocol}//${window.location.host}/#/legal/${pviewName}?id=${id}&processID=${pid}&tname=${this.tablename}&origin_username=&role=workflow&type=approve&bpm_status=${bpm_status}&proponents=${proponents}`;
        window.open(redirectURL,'_blank'); 
      } catch (error) {
        console.log(error);
      }
    },

    // 企业微信登录处理函数
    async weworkLogin(codeType = 'search', systemType = 'search', version = 'v5'){
        /**
         URL直连模式登陆：http://stock.yunwisdom.club:30080/#/?mode=session&mobile=19999763013&account=bWVuZ3Fm
          1. mobile请替换为登录人的mobile。
          2. account请替换为登录人的account，注意account需要使用window.btoa('args')函数处理一下。
         */
        return await Betools.query.weworkLogin(codeType, systemType, version);
    },
  },
};
</script>
<style scoped >
@import "../../assets/css/reward.home.css";
@import "../../assets/css/reward.message.css";
</style>
