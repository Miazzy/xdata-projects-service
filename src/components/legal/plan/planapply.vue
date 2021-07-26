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
            <a-menu-item key="setting:2" :to="`/stock/workspace`" @click="redirectView('/stock/workspace')" >
                工作台
            </a-menu-item>
            <a-menu-item key="setting:3" :to="`/stock/ranking`" @click="redirectView('/stock/ranking')" >
                排行榜
            </a-menu-item>
            <a-menu-item key="setting:4" :to="`/stock/setting`"  >
                系统设置
            </a-menu-item>
            </a-menu-item-group>
        </a-sub-menu>
      </a-menu>

      <a-row :gutter="24">
        <keep-alive>
          <a-col :xl="24" :lg="24" :md="24" :sm="24" :xs="24">

            <div id="" class="" style="padding-left:2.75rem;padding-top:0.25rem;padding-bottom:0.25rem;background-color:#fefefe;" >
              <a-breadcrumb>
                <template v-for="(elem,index) in breadcrumb">
                  <a-breadcrumb-item :key="elem.icon" :index="index" >
                    <a-icon :type="elem.icon" />
                    <span @click="redirectView(elem.path)">{{ elem.text }}</span>
                  </a-breadcrumb-item>
                </template>
              </a-breadcrumb>
            </div>

            <!-- 发起诉讼预案 -->
            <div style="background-color:#f0f0f0;">

              <div id="legal-apply-content" class="reward-apply-content" style="height:auto; background-color:#fefefe; margin-top:0px; margin-left: 2.5rem; margin-right: 2.5rem; margin-bottom: 5rem; border: 1px solid #f0f0f0; front-size: 1rem;" >

                <div class="reward-apply-header" style="height:80px; width:100%; text-align:center; margin-top:20px; font-size: 1.5rem; ">
                  发起诉讼预案
                </div>

                <div class="reward-apply-content-item reward-apply-content-title" style="padding-top:5px;">
                   <a-row style="border-top: 1px dash #f0f0f0;" >
                    <a-col class="reward-apply-content-title-text" :span="4" style="font-size:1.1rem;">
                      基础信息
                    </a-col>
                   </a-row>
                </div>

                <div v-if="isNull(id)" class="reward-apply-content-item" style="margin-top:5px;margin-bottom:5px; margin-right:10px;">
                  <a-row>
                    <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                      <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;">*</span>填报日期</span>
                    </a-col>
                    <a-col :span="8">
                      <a-input v-model="element.create_time" readonly placeholder="请填写填报日期！" @blur="validFieldToast('create_time')" style="border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;"  />
                    </a-col>
                    <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                      <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;">*</span>填报人员</span>
                    </a-col>
                    <a-col :span="8">
                      <a-input v-model="element.create_by" readonly placeholder="请输入填报人员！" @blur="validFieldToast('create_by')" style="border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;"  />
                    </a-col>
                  </a-row>
                </div>

                <div class="reward-apply-content-item" style="margin-top:5px;margin-bottom:5px; margin-right:10px;">
                  <a-row>
                    <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                      <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;">*</span>标题</span>
                    </a-col>
                    <a-col :span="8">
                      <a-input v-model="element.title" :readonly="false" placeholder="请输入标题内容！" @blur="validFieldToast('account_type')" style="border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;"  />
                    </a-col>
                  </a-row>
                </div>

                <div class="reward-apply-content-item" style="margin-top:5px;margin-bottom:5px; margin-right:10px;">
                  <a-row>
                    <a-col :span="4" style="height:auto; font-size:1.0rem; margin-top:5px; text-align: center;">
                      <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;"></span>申请内容</span>
                    </a-col>
                    <a-col :span="20">
                      <a-textarea
                        v-model="element.content"
                        placeholder="请输入申请内容！"
                        :auto-size="{ minRows: 3, maxRows: 100 }"
                        style="height:60px; border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;"
                      />
                    </a-col>
                  </a-row>
                </div>

                <div class="reward-apply-content-item" style="margin-top:5px;margin-bottom:5px; margin-right:10px;">
                  <a-row>
                    <a-col :span="4" style="height:auto; font-size:1.0rem; margin-top:5px; text-align: center;">
                      <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;"></span>备注信息</span>
                    </a-col>
                    <a-col :span="20">
                      <a-textarea
                        v-model="element.remark"
                        placeholder="请输入备注信息！"
                        :auto-size="{ minRows: 4, maxRows: 100 }"
                        style="height:60px; border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;"
                      />
                    </a-col>
                  </a-row>
                </div>


                <div v-show="role != 'view' && isNull(id) " class="reward-apply-content-item" style="margin-top:35px;margin-bottom:5px; margin-right:10px;">
                   <a-row style="border-top: 1px dash #f0f0f0;" >
                    <a-col :span="8">
                    </a-col>
                    <a-col class="reward-apply-content-title-text" :span="4" style="">
                      <a-button type="primary" style="width: 120px;color:c0c0c0;" @click="handleSave();"  >
                        保存
                      </a-button>
                    </a-col>
                    <a-col class="reward-apply-content-title-text" :span="4" style="">
                      <a-button type="primary" style="width: 120px;" @click="handleApply();"  >
                        提交
                      </a-button>
                    </a-col>
                    <a-col :span="8">
                    </a-col>
                   </a-row>
                </div>

                <div v-show="role != 'view' && !isNull(id)  " class="reward-apply-content-item" style="margin-top:35px;margin-bottom:5px; margin-right:10px;">
                   <a-row style="border-top: 1px dash #f0f0f0;" >
                    <a-col :span="8">
                    </a-col>
                    <a-col class="reward-apply-content-title-text" :span="4" style="margin-left:100px;">
                      <a-button type="primary" style="width: 120px;color:c0c0c0;" @click="handlePatch();"  >
                        修改
                      </a-button>
                    </a-col>
                    <a-col :span="8">
                    </a-col>
                   </a-row>
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
import * as workconfig from '@/request/workconfig';

export default {
  mixins: [window.mixin],
  data() {
    return {
      iswechat:false,
      iswework:false,
      pageName: "工商管理",
      momentNewMsg: true,
      activeTabKey: 3,
      acceptType:'*/*',
      uploadURL:'',
      tablename:'bs_company_flow_account',
      size: 0,
      options:{
        create_time:moment(dayjs().format('YYYY-MM-DD'),'YYYY-MM-DD'),
        in_time:moment(dayjs().format('YYYY-MM-DD'),'YYYY-MM-DD'),
        establish_time:moment(dayjs().format('YYYY-MM-DD'),'YYYY-MM-DD'),
        start_time:moment(dayjs().format('YYYY-MM-DD'),'YYYY-MM-DD'),
        coop_time:moment(dayjs().format('YYYY-MM-DD'),'YYYY-MM-DD'),
        out_time:moment(dayjs().format('YYYY-MM-DD'),'YYYY-MM-DD'),
        datetime:moment(dayjs().format('YYYY-MM-DD'),'YYYY-MM-DD'),
        zoneOptions:JSON.parse(`[{"label":"融量集团","value":"融量集团","children":[{"label":"融量集团总部","value":"融量集团总部"},{"label":"地产板块","value":"地产板块","children":[{"label":"领地集团总部","value":"领地集团总部"},{"label":"成渝区域","value":"成渝区域"},{"label":"两湖区域","value":"两湖区域"},{"label":"川北区域","value":"川北区域"},{"label":"成渝区域","value":"成渝区域"},{"label":"川南区域","value":"川南区域"},{"label":"中原区域","value":"中原区域"},{"label":"攀西区域","value":"攀西区域"},{"label":"新疆区域","value":"新疆区域"},{"label":"大湾区域","value":"大湾区域"},{"label":"北京区域","value":"北京区域"},{"label":"园林公司","value":"园林公司"}]},{"label":"金融板块","value":"金融板块","children":[{"label":"量石投资","value":"量石投资"}]},{"label":"物业板块","value":"物业板块","children":[{"label":"领悦集团总部","value":"领悦集团总部"},{"label":"川南区域","value":"川南区域"},{"label":"商写事业部","value":"商写事业部"},{"label":"川北区域","value":"川北区域"},{"label":"新疆区域","value":"新疆区域"},{"label":"攀西区域","value":"攀西区域"},{"label":"长春区域","value":"长春区域"},{"label":"大湾区域","value":"大湾区域"},{"label":"郑州荆州区域","value":"郑州荆州区域"},{"label":"贵阳区域","value":"贵阳区域"},{"label":"佳美物业公司","value":"佳美物业公司"}]},{"label":"医疗健康板块","value":"医疗健康板块","children":[{"label":"健康事业部","value":"健康事业部"},{"label":"至诚和爱健管中心","value":"至诚和爱健管中心"},{"label":"高康国际医院","value":"高康国际医院"}]},{"label":"商业板块","value":"商业板块","children":[{"label":"宝瑞商管","value":"宝瑞商管"}]},{"label":"合作方财务公司","value":"合作方财务公司","children":[{"label":"共享财务中心","value":"共享财务中心"}]}]}]`),
      },
      id:'',
      element: {
          id:'',
          create_time: dayjs().format('YYYY-MM-DD'),
          create_by:'',
          create_username:'',
          account_type:'',
          system:'',
          account:'',
          password:'',
          remark: '暂无备注', //备注信息
          xid:'',
      },
      data: [],
      readonly: false,
      userList:[],
      firmlist:[],
      firmNamelist:[],
      release_userlist:[],
      approve_userlist:[],
      approve_executelist:[],
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
      breadcrumb:[{icon:'home',text:'首页',path:'/stock/workspace'},{icon:'user',text:'记录管理',path:'/stock/workspace'},{icon:'form',text:'录入账户记录',path:''}],
      statusType:{'valid':'有效','invalid':'删除'},
      zoneType:{'领地集团总部':'领地集团总部','成渝区域':'成渝区域','两湖区域':'两湖区域','川北区域':'川北区域','川南区域':'川南区域','中原区域':'中原区域','攀西区域':'攀西区域','新疆区域':'新疆区域','大湾区域':'大湾区域','北京区域':'北京区域'},
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

      // 名称过滤
      filterOption(input, option) {
          return (
            option.componentOptions.children[0].text.toUpperCase().indexOf(input.toUpperCase()) >= 0
          );
      },

      // 企业微信登录处理函数
      async  weworkLogin  (codeType = 'search', systemType = 'search')  {
          const userinfo_work = await Betools.query.queryWeworkUser(codeType, systemType,'v4');
          const userinfo = await Betools.storage.getStore('system_userinfo');
          this.usertitle = (userinfo && userinfo.parent_company && userinfo.parent_company.name ? userinfo.parent_company.name + ' > ' :'')  + (userinfo ? userinfo.realname || userinfo.name || userinfo.lastname : '');
          if(Betools.tools.isNull(this.usertitle) || userinfo == '\"\"' || Betools.tools.isNull(userinfo)){
            const finger = await(await FingerprintJS.load()).get();
            const condition = `_where=(info,in,finger)~and(type,in,info)~and(content,like,~${finger.visitorId}__~)&_sort=-id&_p=0&_size=1`;
            let list = await Betools.manage.queryTableData('bs_async_log' , condition);
            let content = '';
            if(list && list.length > 0){
              content = window.atob(list[0].content.split('__')[1]);
              content = window.decodeURIComponent(content);
              await Betools.storage.setStore('system_userinfo', content, 3600);
              const userinfo = await Betools.storage.getStore('system_userinfo');
              this.usertitle = (userinfo && userinfo.parent_company && userinfo.parent_company.name ? userinfo.parent_company.name + ' > ' :'')  + (userinfo ? userinfo.realname || userinfo.name || userinfo.lastname : '');
              return userinfo;
            }
          }
          return userinfo;
      },
      
      // 执行页面跳转
      async redirectView(path) {
          Betools.tools.isNull(path) ? null: this.$router.push(path);
      },
     
      // 获取基础信息
      async queryInfo() {
        try {
          this.iswechat = Betools.tools.isWechat(); //查询当前是否微信端
          this.iswework = Betools.tools.isWework(); //查询是否为企业微信
          this.userinfo = await this.weworkLogin(); //查询当前登录用户
          this.back = Betools.tools.getUrlParam('back') || '/stock/workspace'; //查询上一页

          const userinfo = await Betools.storage.getStore('system_userinfo');  //获取用户基础信息  
          try {
            this.element.create_time = dayjs().format('YYYY-MM-DD');
            this.element.create_by = (userinfo ? userinfo.realname || userinfo.name || userinfo.lastname : '');
            this.element.create_username =  (userinfo ? userinfo.username || userinfo.loginid : '');
          } catch (error) {
            console.error(error);
          }
         
          const id = this.id = Betools.tools.getUrlParam('id');
          if(!Betools.tools.isNull(id)){
            this.element = await this.handleList(this.tablename , id);
          } else {
           
          }
        } catch (error) {
          console.log(error);
        }
      },

      // 查询不同状态的律所数据
      async handleList(tableName , id){
        let element = await Betools.query.queryTableData(tableName , id);
        return Betools.tools.isNull(element) ? element : {};
      },

      // 验证字段
      validField(fieldName){
        return Betools.tools.isNull(this.message[fieldName]);
      },

      // 验证字段信息
      validFieldToast(fieldName){
        const flag = !this.validField(fieldName);
        if(flag){
          this.$toast.fail(`${this.message[fieldName]}！` );
          return false;
        }
      },
      
      // 用户提交入职登记表函数
      async handleApply() {
        await this.handleSave(); //先执行保存操作，保存完毕后执行流程跳转功能
      },

      // 保存用户数据但是不提交
      async handleSave(){
        
        this.loading = true; // 显示加载状态
        const userinfo = await Betools.storage.getStore('system_userinfo'); // 获取用户基础信息
        const id = Betools.tools.queryUniqueID(); // 表单ID

        try {
          this.element.create_time = dayjs().format('YYYY-MM-DD');
          this.element.create_by = (userinfo ? userinfo.realname || userinfo.name || userinfo.lastname : '');
        } catch (error) {
          console.error(error);
        }

        // 是否确认提交此自由流程?
        this.$confirm({
            title: "确认操作",
            content: "是否确认提交此账户信息?",
            onOk: async() => {
                  const element  = JSON.parse(JSON.stringify(this.element));
                  const result = await Betools.manage.postTableData(this.tablename , element); // 向表单提交form对象数据
                  if(result && result.error && result.error.errno){ //提交数据如果出现错误，请提示错误信息
                      return await vant.Dialog.alert({  title: '温馨提示',  message: `系统错误，请联系管理人员，错误编码：[${result.error.code}]. `, });
                  }
                  this.loading = false; //设置状态
                  this.readonly = true;
                  this.role = 'view';
                  this.handleList(this.tablename , id);
                  return vant.Dialog.alert({  title: '温馨提示',  message: `提交成功！`, }); //this.$toast.success('律师录入申请成功！');
               }
          });
      },

      // 修改用户数据但是不提交
      async handlePatch(){
        
        this.loading = true; // 显示加载状态
        const userinfo = await Betools.storage.getStore('system_userinfo'); // 获取用户基础信息
        const id = Betools.tools.getUrlParam('id'); // 表单ID

        //是否确认提交此自由流程?
        this.$confirm({
            title: "确认操作",
            content: "是否确认修改此账户信息?",
            onOk: async() => {
                  const element  = JSON.parse(JSON.stringify(this.element));
                  const result = await Betools.manage.patchTableData(this.tablename, id, element); // 向表单提交form对象数据
                  if(result && result.error && result.error.errno){ //提交数据如果出现错误，请提示错误信息
                      return await vant.Dialog.alert({  title: '温馨提示',  message: `系统错误，请联系管理人员，错误编码：[${result.error.code}]. `, });
                  }
                  this.loading = false;
                  this.readonly = true;
                  this.role = 'view';
                  this.handleList(this.tablename , id);
                  return vant.Dialog.alert({  title: '温馨提示',  message: `修改操作成功！`, }); //this.$toast.success('律师修改操作成功！');
               }
          });
      },

  },
};
</script>
<style scoped >
    @import "../../../assets/css/reward.home.css";
    @import "../../../assets/css/reward.apply.css";
</style>
