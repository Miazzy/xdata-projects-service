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

            <!-- 统计分析 -->
            <div style="background-color:#f0f0f0;">

              <div id="legal-apply-content" class="reward-apply-content" :style="`height:auto; background-color:#fefefe; margin-top:0px; margin-left: 0.0rem; margin-right: 0.0rem; margin-bottom: 5rem; border: 1px solid #f0f0f0; front-size: 1rem; ${iswechat ? `width:180%;` : '' }`" >

                <dv-border-box-5 title="统计分析">
                  
                  <div style="position:absolute; left:10px; width: 350px;">

                    <div id="nav-content-law-num-count" style="margin-top:10px;">
                        <dv-border-box-7 style="height:15px;width:350px;background:#000000;">
                          <div style="background:#000000;">
                            <dv-decoration-3 style="width:115px;height:15px;float:left;" />
                            <dv-decoration-3 style="width:115px;height:15px;float:left;" />
                            <dv-decoration-3 style="width:115px;height:15px;float:left;" />
                          </div>
                        </dv-border-box-7>
                    </div>

                    <div id="nav-content-law-num-count" style="margin-top:10px;">
                        <dv-border-box-7 style="height:250px;width:350px;background:#000000;">
                          <div style="background:#000000;">
                            <div style="color:#f0f0f0; height:20px; font-size:15px; margin-top:10px; margin-bottom:25px; margin-left:10px; ">数量统计：</div>
                            <dv-conical-column-chart :config="caseNumConfig" style="width:350px;height:180px;" />
                          </div>
                        </dv-border-box-7>
                    </div>

                    <div id="nav-content-law-num-count" style="margin-top:10px;">
                        <dv-border-box-7 style="height:15px;width:350px;background:#000000;">
                          <div style="background:#000000;">
                            <dv-decoration-3 style="width:115px;height:15px;float:left;" />
                            <dv-decoration-3 style="width:115px;height:15px;float:left;" />
                            <dv-decoration-3 style="width:115px;height:15px;float:left;" />
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

                  </div>

                  <div style="position:absolute; left:370px; width: 350px;">

                    <div id="nav-content-law-num-count" style="margin-top:10px;">
                        <dv-border-box-7 style="height:15px;width:350px;background:#000000;">
                          <div style="background:#000000;">
                            <dv-decoration-3 style="width:115px;height:15px;float:left;" />
                            <dv-decoration-3 style="width:115px;height:15px;float:left;" />
                            <dv-decoration-3 style="width:115px;height:15px;float:left;" />
                          </div>
                        </dv-border-box-7>
                    </div>

                    <div id="nav-content-law-sum-count" style="margin-top:10px;">
                        <dv-border-box-7 style="height:250px;width:350px;background:#000000;">
                          <div style="background:#000000;">
                            <div style="color:#f0f0f0; height:20px; font-size:15px; margin-top:10px; margin-bottom:-20px; margin-left:10px; ">阶段统计：</div>
                            <dv-capsule-chart :config="caseNumStageConfig" style="width:350px;height:auto;margin-top:30px; " />
                          </div>
                        </dv-border-box-7>
                    </div>

                    <div id="nav-content-law-num-count" style="margin-top:10px;">
                        <dv-border-box-7 style="height:15px;width:350px;background:#000000;">
                          <div style="background:#000000;">
                            <dv-decoration-3 style="width:115px;height:15px;float:left;" />
                            <dv-decoration-3 style="width:115px;height:15px;float:left;" />
                            <dv-decoration-3 style="width:115px;height:15px;float:left;" />
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
                  </div>

                  <div style="position:absolute; left:730px; width: 350px;">

                    <div id="nav-content-law-num-count" style="margin-top:10px;">
                        <dv-border-box-7 style="height:15px;width:350px;background:#000000;">
                          <div style="background:#000000;">
                            <dv-decoration-3 style="width:115px;height:15px;float:left;" />
                            <dv-decoration-3 style="width:115px;height:15px;float:left;" />
                            <dv-decoration-3 style="width:115px;height:15px;float:left;" />
                          </div>
                        </dv-border-box-7>
                    </div>

                    <div id="nav-content-law-num-count" style="margin-top:10px;">
                        <dv-border-box-7 style="height:250px;width:350px;background:#000000;">
                          <div style="background:#000000;">
                            <div style="color:#f0f0f0; height:20px; font-size:15px; margin-top:10px; margin-bottom:25px; margin-left:10px; ">数量统计：</div>
                            <dv-conical-column-chart :config="caseMoneyConfig" style="width:350px;height:180px;" />
                          </div>
                        </dv-border-box-7>
                    </div>

                    <div id="nav-content-law-num-count" style="margin-top:10px;">
                        <dv-border-box-7 style="height:15px;width:350px;background:#000000;">
                          <div style="background:#000000;">
                            <dv-decoration-3 style="width:115px;height:15px;float:left;" />
                            <dv-decoration-3 style="width:115px;height:15px;float:left;" />
                            <dv-decoration-3 style="width:115px;height:15px;float:left;" />
                          </div>
                        </dv-border-box-7>
                    </div>

                    <div id="nav-content-law-sum-count" style="margin-top:10px;">
                        <dv-border-box-7 style="height:270px;width:350px;background:#000000;">
                          <div style="background:#000000;">
                            <div style="color:#f0f0f0; height:20px; font-size:15px; margin-top:10px; margin-bottom:-20px; margin-left:10px; ">数量比率：</div>
                            <dv-active-ring-chart :config="caseMoneyRatioConfig" style="width:350px;height:250px;transform:scale(1.2);" />
                          </div>
                        </dv-border-box-7>
                    </div>

                  </div>
                </dv-border-box-5>

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

    const { $router } = this;
    const numList = Betools.storage.getStore(`system_case_num`);
    const numStageData = Betools.storage.getStore(`system_case_num_stage`);
    const numData = [{ name: '所有案件', value: 0 }, { name: '起诉案件', value: 0 }, { name: '应诉案件', value: 0 },];
    const numRatioData = [{ name: '起诉案件', value: 0 }, { name: '应诉案件', value: 0 },];
    const moneyData = [{ name: '所有案件', value: 0 }, { name: '起诉案件', value: 0 }, { name: '应诉案件', value: 0 },];
    const moneyRatioData = [{ name: '起诉案件', value: 0 }, { name: '应诉案件', value: 0 },];
    if(!Betools.tools.isNull(numList) && numList.length > 0){
      numData.map(numDataElement=>{
        const element = numList.find(item => {  return item.value == numDataElement.name;});
        numDataElement.value = Betools.tools.isNull(element) ? 0 : element.num;
      });
      numData[0].value = numList[0].num + (numList.length >= 2 ? numList[1].num : 0);
      numRatioData.map(numDataElement=>{
        const element = numList.find(item => {  return item.value == numDataElement.name;});
        numDataElement.value = Betools.tools.isNull(element) ? 0 : element.num;
      });
    }

    if(!Betools.tools.isNull(numList) && numList.length > 0){
      moneyData.map(dataElement=>{
        const element = numList.find(item => {  return item.value == dataElement.name;});
        dataElement.value = Betools.tools.isNull(element) ? 0 : element.money;
      });
      moneyData[0].value = numList[0].money + (numList.length >= 2 ? numList[1].money : 0);
      moneyRatioData.map(dataElement=>{
        const element = numList.find(item => {  return item.value == dataElement.name;});
        dataElement.value = Betools.tools.isNull(element) ? 0 : element.money;
      });
    }

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
      caseNumConfig:{ data: numData, img: ['https://wechat.yunwisdom.club:30443/static/img/1st.png', 'https://wechat.yunwisdom.club:30443/static/img/2st.png', 'https://wechat.yunwisdom.club:30443/static/img/5st.png', ], showValue: true, },
      caseNumRatioConfig: { radius: '40%', activeRadius: '45%', data: numRatioData, digitalFlopStyle: { fontSize: 12 }, lineWidth: 15, color: ['#e062ae', '#32c5e9', '#fb7293', '#e690d1', '#96bfff'], },
      caseNumStageConfig:{ data: numStageData, unit: '单位', showValue: true, },
      caseNumStageRatioConfig:{ radius: '40%', activeRadius: '45%', data: numStageData, digitalFlopStyle: { fontSize: 12 }, lineWidth: 15, color: ['#e062ae', '#32c5e9', '#fb7293', '#e690d1', '#96bfff'],},
      caseMoneyConfig:{ data: numData, img: ['https://wechat.yunwisdom.club:30443/static/img/1st.png', 'https://wechat.yunwisdom.club:30443/static/img/2st.png', 'https://wechat.yunwisdom.club:30443/static/img/5st.png', ], showValue: true, },
      caseMoneyRatioConfig: { radius: '40%', activeRadius: '45%', data: numRatioData, digitalFlopStyle: { fontSize: 12 }, lineWidth: 15, color: ['#e062ae', '#32c5e9', '#fb7293', '#e690d1', '#96bfff'], },
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

          let userinfo = await Betools.storage.getStore('system_userinfo');
          userinfo = await Betools.query.queryIsolation(userinfo);
          const isolation = userinfo.isolation;

          try {
            let numList = Betools.storage.getStore(`system_case_num`);
            if(Betools.tools.isNull(numList)){
              numList = await Betools.manage.queryTableData('v_legal_num', `_where=(isolation,eq,${isolation})~and(type,eq,类别)&_sort=type,value&_p=0&_size=10`);
              if(!Betools.tools.isNull(numList) && numList.length > 0){
                numData.map(numDataElement=>{
                  const element = numList.find(item => {  return item.value == numDataElement.name;});
                  numDataElement.value = Betools.tools.isNull(element) ? 0 : element.num;
                });
                numData[0].value = numList[0].num + (numList.length >= 2 ? numList[1].num : 0);
                numRatioData.map(numDataElement=>{
                  const element = numList.find(item => {  return item.value == numDataElement.name;});
                  numDataElement.value = Betools.tools.isNull(element) ? 0 : element.num;
                });
              }
              const caseNumConfig = { data: numData, img: [ 'https://wechat.yunwisdom.club:30443/static/img/1st.png', 'https://wechat.yunwisdom.club:30443/static/img/2st.png', 'https://wechat.yunwisdom.club:30443/static/img/5st.png', ], showValue: true, };
              this.caseNumConfig = { ...caseNumConfig };
              const caseNumRatioConfig = { radius: '40%', activeRadius: '45%', data: numRatioData, digitalFlopStyle: { fontSize: 12 }, lineWidth: 15, color: ['#e062ae', '#32c5e9', '#fb7293', '#e690d1', '#96bfff'], };
              this.caseNumRatioConfig = { ...caseNumRatioConfig };
              Betools.storage.setStore(`system_case_num`, JSON.stringify(numList) , 3600 * 24 * 0.5);
            }
    
            let numStageList = Betools.storage.getStore(`system_case_num_stage`);
            if(Betools.tools.isNull(numStageList)){
              numStageList = await Betools.manage.queryTableData('v_legal_num', `_where=(isolation,eq,${isolation})~and(type,eq,阶段)&_sort=type,value&_p=0&_size=10`);
              stageData.map(stageElement=>{
                const element = numStageList.find(item => {  return item.value == stageMap[stageElement.name];});
                stageElement.value = Betools.tools.isNull(element) ? 0 : element.num;
              });
              const caseNumStageConfig = { data: stageData, unit: '单位', showValue: true, };
              this.caseNumStageConfig = { ...caseNumStageConfig };
              const caseNumStageRatioConfig = { radius: '40%', activeRadius: '45%', data: stageData, digitalFlopStyle: { fontSize: 12 }, lineWidth: 15, color: ['#e062ae', '#32c5e9', '#fb7293', '#e690d1', '#96bfff'], }
              this.caseNumStageRatioConfig = { ...caseNumStageRatioConfig };
              Betools.storage.setStore(`system_case_num_stage`, JSON.stringify(stageData) , 3600 * 24 * 0.5);
            }
          } catch (error) {
            console.error(`isolation statistics error:`, error);
          }
          
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
    @import "../../../assets/css/statistics.css";
</style>
