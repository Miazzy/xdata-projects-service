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

            <!-- 案件申请 -->
            <div style="background-color:#f0f0f0;">

              <div id="legal-apply-content" class="reward-apply-content" style="height:auto; background-color:#fefefe; margin-top:0px; margin-left: 2.5rem; margin-right: 2.5rem; margin-bottom: 5rem; border: 1px solid #f0f0f0; front-size: 1rem;" >

                <div class="reward-apply-header" style="height:80px; width:100%; text-align:center; margin-top:20px; font-size: 1.5rem; ">
                  律师录入申请
                </div>

                <div class="reward-apply-content-item reward-apply-content-title" style="padding-top:5px;">
                   <a-row style="border-top: 1px dash #f0f0f0;" >
                    <a-col class="reward-apply-content-title-text" :span="4" style="font-size:1.1rem;">
                      基础信息
                    </a-col>
                   </a-row>
                </div>

                <div class="reward-apply-content-item" style="margin-top:5px;margin-bottom:5px; margin-right:10px;">
                  <a-row>
                    <a-col v-if="isNull(id)" :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                      <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;">*</span>流程标题</span>
                    </a-col>
                    <a-col v-if="isNull(id)" :span="8">
                      <a-input v-model="element.title" :readonly='false' placeholder="请填写申请流程标题！" @blur="validFieldToast('title')" style="border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;"  />
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
                      <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;">*</span>律师姓名</span>
                    </a-col>
                    <a-col :span="8">
                      <a-input v-model="element.lawyer_name" :readonly="false" placeholder="请输入律师姓名！" @blur="validFieldToast('lawyer_name')" style="border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;"  />
                    </a-col>
                    <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                      <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;">*</span>擅长领域</span>
                    </a-col>
                    <a-col :span="8">
                      <a-select mode="multiple" v-model="element.territory"  @blur="validFieldToast('territory')"  placeholder="请填写律师擅长领域！" style="width:100%; border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;">
                        <template v-for="(elem,index) in territoryList ">
                          <a-select-option :key="elem" :index="index" :value="elem">
                            {{elem}}
                          </a-select-option>
                        </template>
                      </a-select>
                    </a-col>
                  </a-row>
                </div>

                <div class="reward-apply-content-item" style="margin-top:5px;margin-bottom:5px; margin-right:10px;">
                  <a-row>
                    <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                      <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;">*</span>所属律所</span>
                    </a-col>
                    <a-col :span="8">
                      <a-auto-complete :data-source="firmNamelist" v-model="element.firmID" style="border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0; width:100%; border-width: 0px 0px 1px; border-style: solid; border-color: rgb(254, 254, 254) rgb(254, 254, 254) rgb(240, 240, 240); border-image: initial;"  placeholder="请输入律所名称！" :filter-option="filterOption" />
                    </a-col>
                    <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                      <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;">*</span>执业年限</span>
                    </a-col>
                    <a-col :span="8">
                      <a-input v-model="element.years" :readonly="false" placeholder="请填写此律师的执业年限！" @blur="validFieldToast('years')" style="border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;"  />
                    </a-col>
                  </a-row>
                </div>

                <div class="reward-apply-content-item" style="margin-top:5px;margin-bottom:5px; margin-right:10px;">
                  <a-row>
                    <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                      <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;">*</span>大学名称</span>
                    </a-col>
                    <a-col :span="8">
                      <a-input v-model="element.college" :default-value="options.college" placeholder="请输入此律师大学名称！" @blur="validFieldToast('college')" style="width:100%; border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;" />
                    </a-col>
                    <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                      <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;">*</span>学位学历</span>
                    </a-col>
                    <a-col :span="8">
                      <a-radio-group  v-model="element.degree" placeholder="请输入此律师学位学历！" @blur="validFieldToast('degree')" style="width:100%; border: 0px solid #fefefe;  border-bottom: 0px solid #f0f0f0;">
                        <a-radio-button value="专科">
                          专科
                        </a-radio-button>
                        <a-radio-button value="本科">
                          本科
                        </a-radio-button>
                        <a-radio-button value="硕士">
                          硕士
                        </a-radio-button>
                        <a-radio-button value="博士">
                          博士
                        </a-radio-button>
                      </a-radio-group>
                    </a-col>
                  </a-row>
                </div>

                <div class="reward-apply-content-item" style="margin-top:5px;margin-bottom:5px; margin-right:10px;">
                  <a-row>
                    <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                      <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;">*</span>开始执业时间</span>
                    </a-col>
                    <a-col :span="8">
                      <a-date-picker v-model="element.start_time" :default-value="options.start_time" placeholder="请输入此律师开始执业时间！" @blur="validFieldToast('start_time')" style="width:100%; border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;" />
                    </a-col>
                    <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                      <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;">*</span>联系电话</span>
                    </a-col>
                    <a-col :span="8">
                      <a-input v-model="element.mobile" placeholder="请输入此律师联系电话！" @blur="validFieldToast('mobile')" style="width:100%; border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;" />
                    </a-col>
                  </a-row>
                </div>

                <div class="reward-apply-content-item" style="margin-top:5px;margin-bottom:5px; margin-right:10px;">
                  <a-row>
                    <a-col :span="4" style="height:auto; font-size:1.0rem; margin-top:5px; text-align: center;">
                      <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;">*</span>律师简介</span>
                    </a-col>
                    <a-col :span="20">
                      <a-textarea
                        v-model="element.brief"
                        placeholder="请输入此律师简介(工作、经验、能力、学历等)！"
                        :auto-size="{ minRows: 5, maxRows: 100 }"
                        style="height:80px; border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;"
                      />
                    </a-col>
                  </a-row>
                </div>

                <div class="reward-apply-content-item reward-apply-content-title" style="padding-top:5px;">
                   <a-row style="border-top: 1px dash #f0f0f0;" >
                    <a-col class="reward-apply-content-title-text" :span="4" style="font-size:1.1rem;">
                      出库情况
                    </a-col>
                   </a-row>
                </div>

                <div class="reward-apply-content-item" style="margin-top:5px;margin-bottom:5px; margin-right:10px;">
                  <a-row>
                    <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                      <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;">*</span>是否出库</span>
                    </a-col>
                    <a-col :span="8">
                      <a-radio-group  v-model="element.out_flag" placeholder="请选择此律所是否出库！" @blur="validFieldToast('out_flag')" style="width:100%; border: 0px solid #fefefe;  border-bottom: 0px solid #f0f0f0;">
                        <a-radio-button value="已入库">
                          已入库
                        </a-radio-button>
                        <a-radio-button value="未出库">
                          未出库
                        </a-radio-button>
                        <a-radio-button value="已出库">
                          已出库
                        </a-radio-button>
                      </a-radio-group>
                    </a-col>
                    <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                      <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;">*</span>出库时间</span>
                    </a-col>
                    <a-col :span="8">
                      <a-date-picker v-model="element.out_time" :default-value="options.out_time" placeholder="请输入此律师出库时间！" @blur="validFieldToast('out_time')" style="width:100%; border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;" />
                    </a-col>
                  </a-row>
                </div>

                <div class="reward-apply-content-item" style="margin-top:5px;margin-bottom:5px; margin-right:10px;">
                  <a-row>
                    <a-col :span="4" style="height:auto; font-size:1.0rem; margin-top:5px; text-align: center;">
                      <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;">*</span>出库原因</span>
                    </a-col>
                    <a-col :span="20">
                      <a-textarea
                        v-model="element.out_reason"
                        placeholder="请输入此律师出库原因！"
                        :auto-size="{ minRows: 5, maxRows: 100 }"
                        style="height:80px; border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;"
                      />
                    </a-col>
                  </a-row>
                </div>

                <div v-show=" role == 'add' || role == 'edit' " class="reward-apply-content-item reward-apply-content-title" style="padding-top:0px;">
                  <a-divider></a-divider>
                </div>

                <div v-show=" role == 'view' || role == 'add' || role == 'edit' || role == 'workflow' " class="reward-apply-content-item reward-apply-content-title" style="padding-top:5px;">
                   <a-row style="border-top: 1px dash #f0f0f0;" >
                    <a-col class="reward-apply-content-title-text" :span="4" style="font-size:1.1rem;">
                      审批流程
                    </a-col>
                   </a-row>
                </div>

                <div v-show=" role == 'add' || role == 'edit' || (element.bpm_status == '1' && role == 'workflow')" class="reward-apply-content-item" style="margin-top:5px;margin-bottom:5px; margin-right:10px;">
                  <a-row style="position: relative;">
                    <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                      <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;">*</span>审批人员</span>
                    </a-col>
                    <a-col :span="8">
                      <a-auto-complete :data-source="lawyerInNamelist" v-model="approve_userid" style="width:200px; border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0; border-width: 0px 0px 1px; border-style: solid; border-color: rgb(254, 254, 254) rgb(254, 254, 254) rgb(240, 240, 240); border-image: initial;"  placeholder="请添加并选择审批人员！" :filter-option="filterOption" />
                      <a-button type="primary" style="width: 80px; color:c0c0c0; margin-left:30px; " @click="execValidApprove()"  >
                        添加
                      </a-button>
                    </a-col>
                    <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                      <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;"></span>抄送人员</span>
                    </a-col>
                    <a-col :span="8">
                      <a-auto-complete :data-source="lawyerInNamelist" v-model="release_userid" style="width:200px; border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0; border-width: 0px 0px 1px; border-style: solid; border-color: rgb(254, 254, 254) rgb(254, 254, 254) rgb(240, 240, 240); border-image: initial;"  placeholder="请添加并选择抄送人员！" :filter-option="filterOption" />
                      <a-button type="primary" style="width: 80px; color:c0c0c0; margin-left:30px; " @click="execValidNotify()"  >
                        添加
                      </a-button>
                    </a-col>
                    <a-col :span="24" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                      <span style="position:absolute; left:5.5rem; top:0.25rem; text-algin:left; color:red; font-size:12px; ">注：请添加区域/总部负责人，点击下列审批人员头像或名字可以进行删除审批人员！</span>
                    </a-col>
                  </a-row>
                </div>  

                <div id="system-approve-userlist-content" v-show=" (role == 'view' || role == 'add' || role == 'edit' || role == 'workflow') && approve_userlist && approve_userlist.length > 0 " class="reward-apply-content-item system-approve-userlist-content" style="margin-top:15px; margin-bottom:15px; margin-right:10px;">
                  <a-row class="system-approve-userlist-content">
                    <a-col :span="24" :style="`width:100%; ${(50 + approve_userlist.length * 7.5) > 100 ? `overflow-x:scroll;` : '' } `">
                      <div :style="`margin-left:50px;margin-top:15px; width:${50 + approve_userlist.length * 7.5}%; height:100px;`">
                        <span style="margin-left:32.5px;">审批：</span>
                        <template v-for="(item , index) in approve_userlist ">
                          <span :key="index" style="position: relative; width:75px; height:180px;">
                            <a-avatar size="large" :index="index" :key="item.avatar" :src="item.avatar" @click="execRemoveApprove(item, index)" style="margin:2px 10px 2px 30px; width:auto;" />
                            <span style="position: absolute; top:37.5px; width: 70px; left:15px; text-align:center; " @click="execRemoveApprove(item, index)" >{{ item.name }}</span>
                            <span style="position: absolute; top:57.5px; width: 70px; left:15px; text-align:center; " @click="execRemoveApprove(item, index)" >{{ item.loginid }}</span>
                            <a-icon v-show=" ( index + 1 )< approve_userlist.length " :key="index" type="arrow-right" style="position:absolute; margin-top:5px; top: 3px; " />
                          </span>
                        </template>
                      </div>
                    </a-col>
                  </a-row> 
                  <a-row v-show=" release_userlist && release_userlist.length > 0 "> 
                    <a-col :span="24" :style="`width:100%; ${(50 + release_userlist.length * 7.5) > 100 ? `overflow-x:scroll;` : '' } `">
                      <div :style="`margin-left:50px;margin-top:15px; width:${50 + release_userlist.length * 7.5}%; height:100px;`">
                        <span style="margin-left:32.5px;">抄送：</span>
                        <template v-for="(item , index) in release_userlist ">
                          <span :key="index" style="position: relative; width:75px; height:180px;">
                            <a-avatar size="large" :index="index" :key="item.avatar" :src="item.avatar" @click="execRemoveNotify(item, index)" style="margin:2px 10px 2px 30px; width:auto;" />
                            <span style="position: absolute; top:37.5px; width: 70px; left:15px; text-align:center; " @click="execRemoveNotify(item, index)" >{{ item.name }}</span>
                            <span style="position: absolute; top:57.5px; width: 70px; left:15px; text-align:center; " @click="execRemoveNotify(item, index)" >{{ item.loginid }}</span>
                            <a-icon v-show=" ( index + 1 )< release_userlist.length " :key="index" type="arrow-right" style="position:absolute; margin-top:5px; top: 3px; " />
                          </span>
                        </template>
                      </div>
                    </a-col>
                  </a-row> 
                </div> 

                <div v-show="role == 'workflow' && !isNull(id) && (element.bpm_status == '1' && role == 'workflow')" class="reward-apply-content-item" style="margin-top:35px;margin-bottom:5px; margin-right:10px;">
                   <a-row style="border-top: 1px dash #f0f0f0;" >
                    <a-col :span="8">
                    </a-col>
                    <a-col class="reward-apply-content-title-text" :span="4" style="margin-left:100px;">
                      <a-button type="primary" style="width: 120px;color:c0c0c0;" @click="handleReApply();"  >
                        重新提交
                      </a-button>
                    </a-col>
                    <a-col :span="8">
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

                <div v-show="role != 'view' && role != 'workflow' && !isNull(id)  " class="reward-apply-content-item" style="margin-top:35px;margin-bottom:5px; margin-right:10px;">
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

                <div v-show="(role == 'view' || role == 'notify' || role == 'workflow' ) && processLogList.length > 0 " class="reward-apply-content-item reward-apply-content-title" style="padding-top:5px;">
                   <a-row style="border-top: 1px dash #f0f0f0;" >
                    <a-col class="reward-apply-content-title-text" :span="4" style="font-size:1.1rem;">
                      处理记录
                    </a-col>
                   </a-row>
                </div>

                <div v-show="(role == 'view' || role == 'notify' || role == 'workflow' ) && processLogList.length > 0 " class="reward-apply-content-item reward-apply-content-title" style="padding-top:5px;margin-left:75px;">
                  <van-cell-group style="margin-top:0px;" v-show="processLogList.length > 0">
                    <div>
                      <van-steps direction="vertical" :active="processLogList.length - 1">
                        <template v-for="value in processLogList">
                          <van-step :key="value.id">
                            <h3>{{ (isNull(value.employeeName) ? deNull(value.employee,'') : `${deNull(value.employeeName,'')}(${deNull(value.employee,'')})`) + ' ' + deNull(value.action,'') + ' ' + deNull(value.action_opinion,'') + ' ' + deNull(value.content,'').replace(/null/g,'') }}</h3>
                            <p>{{ value.create_time }}</p>
                          </van-step>
                        </template>
                      </van-steps>
                    </div>
                  </van-cell-group>
                </div>

                <div v-show="role == 'workflow' && !isNull(id) && (element.bpm_status == '2' || element.bpm_status == '3' ) && !(element.bpm_status == '1' && role == 'workflow') " class="reward-apply-content-item" style="margin-top:15px;margin-bottom:5px; margin-right:10px;">
                  <a-row>
                    <a-col :span="4" style="font-size:1.0rem; margin-top:5px; text-align: center;">
                      <span style="position:relative;" ><span style="color:red;margin-right:0px;position:absolute;left:-10px;top:0px;">*</span>审批意见</span>
                    </a-col>
                    <a-col :span="20">
                      <a-textarea
                        v-model="workflow.content"
                        placeholder="请输入审批意见！"
                        :auto-size="{ minRows: 5, maxRows: 50 }"
                        style="height:80px; border: 0px solid #fefefe;  border-bottom: 1px solid #f0f0f0;"
                      />
                    </a-col>
                  </a-row>
                </div>

                <div v-show="role == 'workflow' && !isNull(id) && (element.bpm_status == '2' || element.bpm_status == '3' ) && !(element.bpm_status == '1' && role == 'workflow') " class="reward-apply-content-item" style="margin-top:35px;margin-bottom:5px; margin-right:10px;">
                   <a-row style="border-top: 1px dash #f0f0f0;" >
                    <a-col :span="8">
                    </a-col>
                    <a-col class="reward-apply-content-title-text" :span="4" style="">
                      <a-button type="primary" style="width: 120px;color:c0c0c0;" @click="handleAgree();"  >
                        同意
                      </a-button>
                    </a-col>
                    <a-col class="reward-apply-content-title-text" :span="4" style="">
                      <a-button type="primary" style="width: 120px;" @click="handleDisagree();"  >
                        驳回
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
import * as workflow from '@/request/workflow';
import * as workconfig from '@/request/workconfig';
import * as workprocess from '@/request/wflow.process';

export default {
  mixins: [window.mixin],
  data() {
    return {
      iswechat:false,
      iswework:false,
      pageName: "案件管理",
      momentNewMsg: true,
      activeTabKey: 3,
      acceptType:'*/*',
      uploadURL:'',
      tablename:'bs_legal_lawyer',
      size: 0,
      options:{
        create_time:workconfig.system.options.datetime,
        in_time:workconfig.system.options.datetime,
        establish_time:workconfig.system.options.datetime,
        start_time:workconfig.system.options.datetime,
        coop_time:workconfig.system.options.datetime,
        out_time:workconfig.system.options.datetime,
      },
      id:'',
      pid:'',
      workflow:{
        content:'',
      },
      element:{
        id: '', // varchar(36)  default ''  not null
        title: 'XX律师入库申请流程',
        create_time: dayjs().format('YYYY-MM-DD'),
        create_by :'', 
        create_username:'',
        firmID: '', // varchar(36)  default ''  not null comment '所属律所ID',
        lawyer_name:'', // 律师姓名
        college: 'XX大学', // varchar(32)  default ''  not null comment '大学名称',
        degree: '本科', // varchar(32)  default ''  not null comment '学位',
        brief: '无', // varchar(256) default ''  not null,
        years: 'N年', // varchar(16)  default ''  not null comment '执业年限',
        start_time: dayjs().format('YYYY-MM-DD'), // varchar(32)  default ''  not null comment '开始执业时间',
        mobile: '18XXXXXXXXX', // varchar(16)  default ''  not null,
        xid: '', // varchar(36)  default ''  not null,
        out_time: dayjs().format('YYYY-MM-DD'), // varchar(32)  default ''  not null,
        out_flag: '未出库', // varchar(1)   default 'N' not null,
        out_reason: '无', // varchar(256) default ''  not null,
        territory:[], // 擅长领域
        bpm_status:'',
      },
      columns: workconfig.columns.reward.items,
      wfcolumns: workconfig.columns.reward.wfcolumns,
      data: [],
      readonly: false,
      userList:[],
      firmlist:[],
      firmNamelist:[],
      processLogList:[],
      release_userid:'',
      release_userlist:[],
      approve_userid:'',
      approve_userlist:[],
      notify_userid:'',
      notify_userlist:[],
      approve_executelist:[],
      territoryList:[ '家庭纠纷', '借款借贷', '交通事故', '房产纠纷', '刑事辩护', '合同纠纷', '经济纠纷', '土地纠纷', '劳动工伤', '消费权益', '医疗纠纷', '行政诉讼', '公司事务', '知识产权', '保险理赔', '征地拆迁', '涉外海关', '工程建设', '综合咨询', ],
      role:'',
      file:'',
      uploadURL:'https://upload.yunwisdom.club:30443/sys/common/upload',
      message: workconfig.compValidation.legalapply.message,
      valid: workconfig.compValidation.legalapply.valid,
      goodsborrowtype: workconfig.goodsborrowtype,
      diplomaType: workconfig.compcolumns.diplomaTypeColumns,
      acceptType: workconfig.compcolumns.acceptType,
      commonTypeColumns: workconfig.compcolumns.commonTypeColumns,
      sealTypeColumns: workconfig.compcolumns.sealTypeColumns,
      selectedSheet: null,
      sheetName: null,
      collection: [{ }],
      userinfo: '',
      usertitle:'',
      breadcrumb:[{icon:'home',text:'首页',path:'/legal/workspace'},{icon:'user',text:'律所管理',path:'/legal/workspace'},{icon:'form',text:'律师录入',path:''}],
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

      // 律所名称过滤
      filterOption(input, option) {
        return (
          option.componentOptions.children[0].text.toUpperCase().indexOf(input.toUpperCase()) >= 0
        );
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
     
      // 获取基础信息
      async queryInfo() {
        try {
          this.iswechat = Betools.tools.isWechat(); //查询当前是否微信端
          this.iswework = Betools.tools.isWework(); //查询是否为企业微信
          const weworkinfo = await this.weworkLogin('search','search','v5'); //查询当前登录用户
          this.userinfo = weworkinfo.userinfo;
          this.usertitle = weworkinfo.usertitle;

          this.role = Betools.tools.getUrlParam('role');
          this.stage = Betools.tools.getUrlParam('stage');
          this.apply = Betools.tools.getUrlParam('apply') || 'view';
          this.back = Betools.tools.getUrlParam('back') || '/legal/workspace'; //查询上一页

          const userinfo = await Betools.storage.getStore('system_userinfo');  //获取用户基础信息
          try {
            this.element.create_time = dayjs().format('YYYY-MM-DD');
            this.element.create_by = (userinfo ? userinfo.realname || userinfo.name || userinfo.lastname : '');
            this.element.create_username =  (userinfo ? userinfo.username || userinfo.loginid : '');
          } catch (error) {
            console.error(error);
          }

          this.firmlist = await Betools.manage.queryTableData('bs_legal_firm' , `_where=(status,ne,0)&_fields=id,firm_name&_sort=-id&_p=0&_size=10000`);
          this.firmNamelist = this.firmlist.map(item => { return item.firm_name });
          const element = Betools.storage.getStore(`system_${this.tablename}_item#${this.element.type}#@${userinfo.realname}`); //获取缓存信息
          const id = this.id = Betools.tools.getUrlParam('id');

          if(!Betools.tools.isNull(id)){

            this.element = await this.handleList(this.tablename , id);
            this.element.firmID = this.element.firmName;

            (async()=>{
              this.processLogList = await Betools.query.queryProcessLog();
              if(this.role == 'workflow' || this.role == 'view'){
                const process = this.processLogList.find(item => {return item.action_opinion == '发起流程' && item.process_name == '流程审批' && !Betools.tools.isNull(item.relate_data)});
                this.approve_userlist = JSON.parse(process.relate_data);
                this.release_userlist = JSON.parse(process.notify_data);
              }
            })(); 

          } else {

            try {
              if(element){ //自动回显刚才填写的用户基础信息
                this.element.create_by = element.create_by || this.element.create_by;
                this.element.remark = element.remark || this.element.remark;
                this.element.status = element.status || this.element.status;
              }
              if(userinfo.department && userinfo.department.name){
                this.element.department = userinfo.department.name;
                this.element.company = userinfo.parent_company.name;
              } else if(userinfo.systemuserinfo && userinfo.systemuserinfo.textfield1){
                let temp = userinfo.systemuserinfo.textfield1.split('||')[0];
                this.element.company = temp.split('>')[temp.split('>').length - 1];
                temp = userinfo.systemuserinfo.textfield1.split('||')[1];
                this.element.department = temp.split('>')[temp.split('>').length - 1];
              }
            } catch (error) {
              console.log(error);
            }

          }

        } catch (error) {
          console.log(error);
        }
      },

      // 查询不同状态的律所数据
      async handleList(tableName , id){
        let list = await Betools.manage.queryTableData(tableName , `_where=(id,eq,${id})&_sort=-id&_p=0&_size=1`);
        list.map((item)=>{ 
          try {
            item.serialID = Betools.tools.isNull(item.serialID) ? index : item.serialID;
            item.brief = item.brief.length > 30 ? item.brief.slice(0,30) + '...' : item.brief;
            item.out_reason =  item.out_reason.length > 30 ? item.out_reason.slice(0,30) + '...' :  item.out_reason;
            item.create_time = dayjs(item.create_time).format('YYYY-MM-DD') == 'Invalid Date' ? '/' : dayjs(item.create_time).format('YYYY-MM-DD'); 
            item.out_time = dayjs(item.out_time).format('YYYY-MM-DD') == 'Invalid Date' ? '/' : dayjs(item.out_time).format('YYYY-MM-DD'); 
            item.out_flag = 'YN'.includes(item.out_flag) ? {'Y':'已出库','N':'未出库'}[item.out_flag] : item.out_flag;
            item.start_time = dayjs(item.start_time).format('YYYY-MM-DD') == 'Invalid Date' ? '/' : dayjs(item.start_time).format('YYYY-MM-DD'); 
            item.territory = JSON.parse(item.territory);
          } catch (error) {
            console.log(`error:`, error);
          }
        });
        return list && list.length > 0 ? list[0] : {};
      },

      // 验证字段
      validField(fieldName){
        const userinfo = Betools.storage.getStore('system_userinfo'); // 获取用户基础信息
        const regMail = workconfig.system.config.regexp.mail; // 邮箱验证正则表达式
        this.message[fieldName] = Betools.tools.isNull(this.element[fieldName]) ? this.valid[fieldName] : '';
        if(fieldName.toLocaleLowerCase().includes('mail')) {
          this.message[fieldName] = regMail.test(this.element[fieldName]) ? '' : '请输入正确的邮箱地址！';
        }
        Betools.storage.setStore(`system_${this.tablename}_item#${this.element.type}#@${userinfo.realname}` , JSON.stringify(this.element) , 3600 * 2 );
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

      // 检测知会人员，并加入知会列表
      async execValidNotify(){
        const username = this.release_userid;
        let userlist = await Betools.manage.queryUserByNameVHRM(username, 1000);
        userlist = userlist.filter( (item , index) => { const findex = userlist.findIndex( elem => { return item.cert == elem.cert });  return findex == index;});
        userlist = this.release_userlist.concat(userlist);
        userlist = userlist.filter( (item , index) => { const findex = userlist.findIndex( elem => { return item.cert == elem.cert });  return findex == index;});
        this.release_userlist = userlist; 
        this.release_userlist.map((item,index) => { item.index = index;});
      },

      // 检测审批人员，并加入审批列表
      async execValidApprove(){
        const username = this.approve_userid;
        let userlist = await Betools.manage.queryUserByNameVHRM(username, 1000);
        userlist = userlist.filter( (item , index) => { const findex = userlist.findIndex( elem => { return item.cert == elem.cert });  return findex == index;});
        userlist = this.approve_userlist.concat(userlist);
        userlist = userlist.filter( (item , index) => { const findex = userlist.findIndex( elem => { return item.cert == elem.cert });  return findex == index;});
        this.approve_userlist = userlist; 
        this.approve_userlist.map((item,index)=>{ item.index = index;});
      },

      // 移除第Index个审批人员
      async execRemoveApprove(item,index){
        this.$confirm({
              title: "确认操作",
              content: `您好，您确认删除审批人员${item.name}(${item.loginid})吗?`,
              onOk: async(result) => {
                this.approve_userlist.splice(index, 1);
                this.approve_userlist.map((item,index) => { item.index = index;});
              }
        });
      },

      // 移除第Index个抄送人员
      async execRemoveNotify(item,index){
        this.$confirm({
              title: "确认操作",
              content: `您好，您确认删除抄送人员${item.name}(${item.loginid})吗?`,
              onOk: async(result) => {
                this.release_userlist.splice(index, 1);
                this.release_userlist.map((item,index) => { item.index = index;});
              }
        });
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
        this.element.create_time = dayjs().format('YYYY-MM-DD');
        this.element.create_by = (userinfo ? userinfo.realname || userinfo.name || userinfo.lastname : '');

        // 验证数据是否已经填写
        const keys = Object.keys({ title: '' })

        const invalidKey =  keys.find(key => {
          const flag = this.validField(key);
          return !flag;
        });

        if(invalidKey != '' && invalidKey != null){
          return await vant.Dialog.alert({
            title: '温馨提示',
            message: `请确认内容是否填写完整，错误：请输入[${invalidKey}]信息！`,
          });
        }

        const firmName = this.element.firmID;
        const firm = this.firmlist.find(item => { return item.firm_name == firmName});
        if(Betools.tools.isNull(firm)){
          return await vant.Dialog.alert({
            title: '温馨提示',
            message: `您好，系统中不存在此律师事务所[${firmName}]，请在律所录入功能处录入律所信息后，再选择此律师事务所！`,
          });
        } 

        // 是否确认提交此自由流程?
        this.$confirm({
            title: "确认操作",
            content: "是否确认保存此律师录入申请单?",
            onOk: async() => {

                  const element = JSON.parse(JSON.stringify(this.element));
                  
                  (!Betools.tools.isNull(firm)) ? (element.firmID = firm.id,element.firmName = firm.firm_name):null;
                  element.territory = JSON.stringify(element.territory);
                  
                  const result = await Betools.manage.postTableData(this.tablename , element); // 向表单提交form对象数据
                  
                  if(result && result.error && result.error.errno){ //提交数据如果出现错误，请提示错误信息
                      return await vant.Dialog.alert({  title: '温馨提示',  message: `系统错误，请联系管理人员，错误编码：[${result.error.code}]. `, });
                  }

                  // 提交审批记录, 记录审批日志, 向第一个审批人发送一条审批待办
                  try {
                    const users = this.approve_userlist.map(item=>item.loginid);
                    const wfUsers = users.slice(0,-1).toString(); // 审批人员
                    const nfUsers = ''; // 知会人员
                    const approver = users.slice(-1).toString(); // 最后一个终审人员
                    const data = element;
                    const ctime = dayjs().subtract(2,'minute').format('YYYY-MM-DD HH:mm:ss');
                    data.approve_userlist = JSON.parse(JSON.stringify(this.approve_userlist));
                    data.release_userlist = JSON.parse(JSON.stringify(this.release_userlist));
                    
                    try {
                      await this.handleSubmitWF(userinfo, wfUsers, nfUsers, approver, this.tablename, data.id, data, ctime, workconfig.system.website);
                    } catch (error) {
                      console.error(error);
                    }
                  } catch (error) {
                    console.error(error);
                  }

                  this.loading = false; //设置状态
                  this.readonly = true;
                  this.role = 'view';
                  vant.Dialog.alert({  title: '温馨提示',  message: `律师录入申请成功！`, }); //this.$toast.success('律师录入申请成功！');
                  await this.handleList(this.tablename , id);
               }
          });
      },

      // 修改用户数据但是不提交
      async handlePatch(){
        
        this.loading = true; // 显示加载状态
        const userinfo = await Betools.storage.getStore('system_userinfo'); // 获取用户基础信息
        const id = Betools.tools.getUrlParam('id'); // 表单ID

        // 验证数据是否已经填写
        const keys = Object.keys({ title: '' })

        const invalidKey =  keys.find(key => {
          const flag = this.validField(key);
          return !flag;
        });

        if(invalidKey != '' && invalidKey != null){
          await vant.Dialog.alert({
            title: '温馨提示',
            message: `请确认内容是否填写完整，错误：请输入[${invalidKey}]信息！`,
          });
          return false;
        }

        const firmName = this.element.firmID;
        const firm = this.firmlist.find(item => { return item.firm_name == firmName});
        if(Betools.tools.isNull(firm)){
          return await vant.Dialog.alert({
            title: '温馨提示',
            message: `您好，系统中不存在此律师事务所[${firmName}]，请在律所录入功能处录入律所信息后，再选择此律师事务所！`,
          });
        } 

        //是否确认提交此自由流程?
        this.$confirm({
            title: "确认操作",
            content: "是否确认保存此律师录入申请单?",
            onOk: async() => {
                  const element = JSON.parse(JSON.stringify(this.element));

                  (!Betools.tools.isNull(firm)) ? (element.firmID = firm.id,element.firmName = firm.firm_name):null;
                  element.territory = JSON.stringify(element.territory);
                  const result = await Betools.manage.patchTableData(this.tablename, id, element); // 向表单提交form对象数据
                  
                  if(result && result.error && result.error.errno){ //提交数据如果出现错误，请提示错误信息
                      return await vant.Dialog.alert({  title: '温馨提示',  message: `系统错误，请联系管理人员，错误编码：[${result.error.code}]. `, });
                  }

                  this.loading = false; //设置状态
                  this.readonly = true;
                  this.role = 'view';
                  vant.Dialog.alert({  title: '温馨提示',  message: `律师修改操作成功！`, }); //this.$toast.success('律师修改操作成功！');
                  await this.handleList(this.tablename , id);
               }
          });
      },

      // 用户重新提交审批流程
      async handleReApply(){
          let process_loglist = [];
          this.loading = true; // 显示加载状态
          const userinfo = await Betools.storage.getStore('system_userinfo'); // 获取用户基础信息

          // 检查审批人员列表
          if(Betools.tools.isNull(this.approve_userlist) || this.approve_userlist.length == 0 ){
            return await vant.Dialog.alert({ title: '温馨提示', message: `请选择审批人员！`,});
          }
          
          // 获取流程日志记录
          if(!Betools.tools.isNull(this.processLogList) && this.processLogList.length > 0){
            process_loglist = this.processLogList.filter(item => {return item.action_opinion == '发起流程' && item.process_name == '流程审批' });
          }

          // 是否确认提交此自由流程?
          this.$confirm({
              title: "确认操作",
              content: "是否重新提交此流程申请?",
              onOk: async(result) => {
                    vant.Toast.loading({ duration: 3000,  forbidClick: false,  message: '提交中...', });
                    const element = JSON.parse(JSON.stringify(this.element));

                    // 提交审批前，先检测同一业务表名下，是否有同一业务数据主键值，如果存在，则提示用户，此记录，已经提交审批
                    if (await Betools.manage.queryApprovalExist(this.tablename,  element.id)) {
                      return vant.Toast.fail("您好，当前申请还在审批过程中，无法再次提交流程！");
                    }

                    // 提交审批记录, 记录审批日志, 向第一个审批人发送一条审批待办
                    const users = this.approve_userlist.map(item=>item.loginid);
                    const wfUsers = users.slice(0,-1).toString(); // 审批人员
                    const nfUsers = ''; // 知会人员
                    const approver = users.slice(-1).toString(); // 最后一个终审人员
                    const data = element;
                    const ctime = dayjs().subtract(2,'minute').format('YYYY-MM-DD HH:mm:ss');
                    data.approve_userlist = JSON.parse(JSON.stringify(this.approve_userlist));
                    data.release_userlist = JSON.parse(JSON.stringify(this.release_userlist));
                    data.process_loglist = JSON.parse(JSON.stringify(process_loglist));

                    try {
                      await this.handleReSubmitWF(userinfo, wfUsers, nfUsers, approver, this.tablename, data.id, data, ctime, workconfig.system.website);
                    } catch (error) {
                      console.error(error);
                    }
                    
                    (async()=>{
                      Betools.manage.handleLog(this.tablename , element , '发起', '重新发起流程审批' , `${userinfo.realname} 发起流程申请`);
                    })();

                    vant.Toast.clear();
                    this.loading = false; //设置状态
                    this.readonly = true;
                    this.role = 'view';
                    vant.Dialog.alert({  title: '温馨提示',  message: `重新发起流程申请成功！`, }); //this.$toast.success('案件发起申请成功！');
                }
            });
      },

      // 提交自由流程
      async handleSubmitWF(userinfo, wfUsers, nfUsers , approver , curTableName , curItemID , data , ctime, domainURL = workconfig.system.website) {
        try {
          const checkFlag = workflow.checkSubmitInfo( wfUsers,  nfUsers, approver, ); //校验提交信息是否准确
          let vflag = await Betools.manage.queryApprovalExist(curTableName, curItemID); //提交审批前，先检测同一业务表名下，是否有同一业务数据主键值，如果存在，则提示用户，此记录，已经提交审批
          let vflag_ = Betools.storage.getStore(`start_free_process_@table_name#${curTableName}@id#${curItemID}`);
          if ( Betools.tools.isNull(approver) || !checkFlag || vflag || vflag_ == "true") { //如果校验标识有误，则直接返回
              return !checkFlag ? null : vant.Toast.fail("已提交过申请，无法再次提交审批！"); //数据库中已经存在此记录，提示用户无法提交审批
          }
          return await workprocess.handleStartWF(userinfo, wfUsers, nfUsers, approver, curTableName, curItemID, data, ctime, domainURL);
        } catch (error) {
          console.log(error);
        }
      },

      // 重新提交自由流程
      async handleReSubmitWF(userinfo, wfUsers, nfUsers , approver , curTableName , curItemID , data , ctime, domainURL = workconfig.system.website) {
        try {
          const checkFlag = workflow.checkSubmitInfo( wfUsers,  nfUsers, approver, ); //校验提交信息是否准确
          let vflag = await Betools.manage.queryApprovalExist(curTableName, curItemID); //提交审批前，先检测同一业务表名下，是否有同一业务数据主键值，如果存在，则提示用户，此记录，已经提交审批
          let vflag_ = Betools.storage.getStore(`start_free_process_@table_name#${curTableName}@id#${curItemID}`);
          if ( Betools.tools.isNull(approver) || !checkFlag || vflag || vflag_ == "true") { //如果校验标识有误，则直接返回
              return !checkFlag ? null : vant.Toast.fail("已提交过申请，无法再次提交审批！"); //数据库中已经存在此记录，提示用户无法提交审批
          }
          return await workprocess.handleReStartWF(userinfo, wfUsers, nfUsers, approver, curTableName, curItemID, data, ctime, domainURL);
        } catch (error) {
          console.log(error);
        }
      },

      // 工作流程审批同意
      async handleAgree(){ // 生成下一条流程记录 // 转移当前审批流程记录到历史记录中 // 通知下一位审批人员
          let response = null;
          if(Betools.tools.isNull(this.workflow.content)){
            return await vant.Dialog.alert({ title: '温馨提示', message: `请输入审批意见！`,});
          }
          try {
            const processID = Betools.tools.getUrlParam('processID');
            const domainURL = workconfig.system.website;
            response = await workprocess.handleAgreeWF(this.tablename, this.element.id, this.element, this.workflow.content, processID , '', domainURL);
            this.$router.push(`/legal/${this.tablename.replace('bs_legal_','') + 'apply'}?id=${this.element.id}&type=1&tname=流程详情&apply=view&role=view`);
            this.processLogList = await Betools.query.queryProcessLog();
            this.role = this.apply = 'view';
            vant.Toast.clear();
          } catch (error) {
            console.error(error);
          }
          return response;
      },

      // 工作流程审批驳回
      async handleDisagree(){ // 流程审批状态改为驳回 // 转移当前审批流程记录到历史记录中 // 通知审批发起人员流程驳回
          let response = null;
          if(Betools.tools.isNull(this.workflow.content)){
            return await vant.Dialog.alert({ title: '温馨提示', message: `请输入审批意见！`,});
          }
          try {
            const processID = Betools.tools.getUrlParam('processID');
            const domainURL = workconfig.system.website;
            response = await workprocess.handleRejectWF(this.tablename, this.element.id, this.element, this.workflow.content, processID, '', domainURL);
            this.$router.push(`/legal/${this.tablename.replace('bs_legal_','') + 'apply'}?id=${this.element.id}&type=1&tname=流程详情&apply=view&role=view`);
            this.processLogList = await Betools.query.queryProcessLog();
            this.role = this.apply = 'view';
            vant.Toast.clear();
          } catch (error) {
            console.error(error);
          }
          return response;
      },

  },
};
</script>
<style scoped >
    @import "../../../assets/css/reward.home.css";
    @import "../../../assets/css/reward.apply.css";
    @import "../../../assets/css/progress.apply.css";
</style>
