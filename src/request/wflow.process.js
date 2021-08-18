import * as manage from '@/request/manage';
import * as workflow from '@/request/workflow';

/**
 * @function 同意审批 wflowAddUsers , wflowNotifyUsers
 * @param curRow 当前被选中记录数据
 * @param fixedWFlow
 * @param data
 */
export async function handleApproveWF(curRow = '', fixedWFlow = '', data = []) {

    let result = ''; // 返回结果 
    let wflowAddUsers = ''; // 加签用户，暂时设置为空 
    let wflowNotifyUsers = ''; // 会签用户，暂时设置为空 
    let bussinessCodeID = Betools.tools.queryUrlString("id"); // 查询业务编号 
    let tableName = window.decodeURIComponent(Betools.tools.queryUrlString('tname')); // 获取表单名称 
    let wflowSpecUser = wflowAddUsers + "," + wflowNotifyUsers; // 会签、加签用户 
    let wfreeNode = await manage.queryCurFreeWorkflow(bussinessCodeID); // 查询自由流程节点 
    let bussinessNode = JSON.parse(JSON.stringify(curRow));  // 流程的创建人员 

    const date = dayjs().format("YYYY-MM-DD HH:mm:ss"); // 获取当前时间 
    const operation = operation || "同意"; // 审批动作 
    const message = message || "同意"; // 审批意见 
    const processID = Betools.tools.queryUrlString("processID"); // 流程日志编号 

    curRow = await Betools.query.queryTableData(tableName, bussinessCodeID); // 查询当前数据 

    const signFlag = Betools.tools.deNull(wflowAddUsers) != "" && Betools.tools.deNull(wflowNotifyUsers) != ""; // 如果加签、会签同时选择，则无法提交
    if ( signFlag ) {
        return vant.Dialog.alert({ message: "无法同时进行加签及会签操作，请单独选择加签用户或会签用户！" });
    }

    wflowSpecUser = wflowSpecUser.startsWith(",") ? wflowSpecUser.substring(1) : wflowSpecUser; // 如果会签、加签用户以逗号开头，则去掉开头的逗号
    wflowSpecUser = wflowSpecUser.endsWith(",") ? wflowSpecUser.substring(0, wflowSpecUser.length - 1) : wflowSpecUser; // 如果会签、加签用户以逗号结尾，则去掉结尾的逗号

    console.info("会签/加签用户 : " + wflowSpecUser);

    let readyUser = Betools.tools.contain( wfreeNode.audit_node + "," + wfreeNode.approve_node, wflowSpecUser); //加签会签选中的用户，不能是流程中已经存在的用户

    //如果用户流程中已经存在，则提示无法选择
    if (!Betools.tools.isNull(readyUser)) {
        readyUser = await manage.patchEnameCname(readyUser); // 将英文名转化为中文名
        return vant.Dialog.alert({ message: `加签/会签用户，不能选择审批流程中已经存在的用户(${readyUser})!` }); // 提示错误信息
    } 

    const userInfo = Betools.storage.getStore("system_userinfo"); //获取当前用户
    await vant.Dialog.confirm({ title: '确认操作', message: '是否确认提交此自由流程?', });
    await manage.handleUserInfo(userInfo); //如果没有获取到用户信息，提示用户登录信息过期，请重新登录

    let rights = null; // 流程权责 
    let approveNode = null; // 审批节点信息 
    let node = []; // 定义当前审批日志信息 // let bussinessCodeID = null; // 业务代码ID
    let processAudit = null; // 获取流程审批信息 
    let prLogHisNode = null; // 转历史日志节点 
    let freeNode = null;  //自由流程节点 

    try {
        curRow = await manage.queryProcessLogByID(tableName, processID); // 获取当前审批节点的所有数据
    } catch (error) {
        console.log(error);
    }

    //未获取当前审批流程
    if (Betools.tools.deNull(curRow) == "") {
        return vant.Dialog.alert({ message: "未找到流程节点信息，请刷新页面，查看是否已经审批完成！" });
    }

    bussinessCodeID = curRow["business_data_id"]; // 业务代码ID
    processAudit = curRow["process_audit"]; // 获取流程审批信息

    const auditFlag = Betools.tools.deNull(curRow["employee"]).includes(userInfo["username"]) || Betools.tools.deNull(curRow["employee"]).includes(userInfo["realname"]);

    //检查审批权限，当前用户必须属于操作职员中，才可以进行审批操作
    if ( !auditFlag ) {
        return vant.Dialog.alert({ message: "您不在此审批流程记录的操作职员列中，无法进行审批操作！" });
    }

    try {
        node = await manage.queryProcessLog(tableName, bussinessCodeID);  // 获取关于此表单的所有当前审批日志信息
    } catch (error) {
        console.log(error);
    }

    //遍历node,设置approve_user，action
    node.map((item) => {
        item["approve_user"] = userInfo["username"]; // 设置审批人员
        item["action"] = operation; // 设置操作类型
        item["operate_time"] = date; // 设置操作时间
        item["action_opinion"] = message; // 设置操作意见
        item["create_time"] = date; // 设置创建时间
        item["content"] = ''; 
    });

    prLogHisNode = JSON.parse(JSON.stringify(node)); // 转历史日志节点
    
    let allAudit = ""; // 所有待审核节点
    let allNotify = ""; // 所有待知会节点
    let curAuditor = processAudit; // 当前审核节点
    let notifyArray = Betools.tools.deNull(allNotify) == "" ? "" : allNotify.split(","); // 知会节点数组

    //如果不是自由流程，则从权责配置中获取待审核人列表，否则，使用自由流程配置的审核人员列表
    if (curRow.business_code != "000000000") {
        // 第一步，获取此表单，关联的流程业务模块；查询SQL , 获取流程权责中关联业务含有tableName的流程权责
        // 选定流程权责
        // 根据权责配置，获取所有待审核人员列表
        // 根据权责配置，获取所有待知会人员列表
        // 设置审批节点
    } else {

        try {
            curAuditor = curRow["employee"]; //获取自由流程配置，当前审核节点

            try {
                freeNode = JSON.parse(curRow.business_data); //自由流程配置消息
            } catch (error) {
                console.log(error);
            }
            
            //检查是否存在自由流程节点audit_node & approve_node & notify_node , 如果不存在，在下级节点中寻找
            if (!("audit_node" in freeNode) && !("approve_node" in freeNode) && !("notify_node" in freeNode)) {
                try {
                    freeNode = JSON.parse(freeNode.business_data);
                } catch (error) {
                    console.log(error);
                }
            }
            
            //如果仍然未获取到自由流程节点，则从自由流程表中找
            let freeNodeBack = await Betools.manage.queryCurFreeWorkflow(bussinessCodeID);

            //如果从数据库中查询出，自由流程数据，则替换数据
            if (Betools.tools.deNull(freeNodeBack) != "") {
                freeNode = freeNodeBack;
            }

            console.log("free node back data : " + freeNodeBack);

            //将加签、会签数据、添加到自由流程数据中
            freeNode.audit_node = `,${freeNode.audit_node},`;
            if (
                freeNode.audit_node.indexOf("," + curAuditor + ",") !=
                freeNode.audit_node.lastIndexOf("," + curAuditor + ",")
            ) {
                //判断是否存在重复人员，如果存在重复人员，则去掉一个重复人员
                freeNode.audit_node = freeNode.audit_node.replace("," + curAuditor + ",",  ",");
            }

            //添加加签用户数据
            if (Betools.tools.deNull(wflowAddUsers) != "") {
                freeNode.audit_node = freeNode.audit_node.replace(`,${curAuditor},`, `,${curAuditor},${wflowAddUsers},`);
            }

            // 添加会签用户数据
            if (Betools.tools.deNull(wflowNotifyUsers) != "") {
                freeNode.audit_node = freeNode.audit_node.replace(`,${curAuditor},`, `,${curAuditor},${wflowNotifyUsers},${curAuditor},`);
            }

            // 去掉开头、结尾的逗号
            if (freeNode.audit_node.startsWith(",")) {
                freeNode.audit_node = freeNode.audit_node.substring(1);
            }

            // 去掉开头、结尾的逗号
            if (freeNode.audit_node.endsWith(",")) {
                freeNode.audit_node = freeNode.audit_node.substring( 0, freeNode.audit_node.length - 1 );
            }

            //根据自由流程配置，获取所有待审核人员列表
            allAudit = "," + Betools.tools.deNull(freeNode.audit_node) + "," + Betools.tools.deNull(freeNode.approve_node) + ",";

            //根据自由流程配置，获取所有待知会人员列表
            notifyArray =
                Betools.tools.deNull(freeNode.notify_node) == "" ? [] : [freeNode.notify_node];

            //设置审批节点
            approveNode = freeNode.approve_node;
        } catch (error) {
            vant.Dialog.alert({  message: "自由流程设置节点失败，无法进行审批操作！" });
            console.log("自由流程设置节点失败 :" + error);
            return false;
        }
    }

    //当前审核分割组，第一组是已经审核通过的，第二组是待审核的
    var auditArray = allAudit.split("," + curAuditor + ",");
    //如果存在审核人
    var firstAuditor = auditArray[1];
    //流程状态
    var bpmStatus = {};

    //如果待审核节点为空，则表示已经审批通过 //流程状态 1：待提交  2：审核中  3：审批中  4：已完成  5：已完成  10：已作废
    if (firstAuditor == "") {
        //设置流程状态 审批节点已经走完，流程状态为4：已完成
        bpmStatus = { bpm_status: "4" };

        //执行知会流程，添加多条知会记录。将知会节点的所有待知会节点，拆分成为数组，遍历数组，数组中每个元素，推送一条知会记录，注意forEach不能使用await
        for (let item of notifyArray) {
            //第二步，根据流程业务模块，获取流程审批节点；操作职员，可能有多个，则每个员工推送消息,需要从流程配置节点中获取
            var employee = null;
            //流程岗位
            var process_station = null;
            //审批相关流程节点
            var pnode = {};

            if (curRow.business_code != "000000000") {

                try {
                    employee = await manage.queryProcessNodeEmployee(item);
                    process_station = await manage.queryProcessNodeProcName(item);
                } catch (error) {
                    console.error(error);
                }

                //提交审批相关处理信息
                pnode = {
                    id: manage.queryRandomStr(32), //获取随机数
                    table_name: tableName, //业务表名
                    main_value: curRow["main_value"], //表主键值
                    business_data_id: curRow["business_data_id"], //业务具体数据主键值
                    business_code: fixedWFlow["id"], //业务编号
                    process_name: fixedWFlow["items"], //流程名称
                    employee: employee[0]["employee"],
                    process_station: process_station[0]["item_text"],
                    process_audit: item,
                    operate_time: date,
                    create_time: date,
                    proponents: curRow["proponents"],
                    content: curRow["content"],
                    business_data: JSON.stringify(curRow)
                };
            } else {

                //提交审批相关处理信息
                pnode = {
                    id: manage.queryRandomStr(32), //获取随机数
                    table_name: tableName, //业务表名
                    main_value: curRow["business_data_id"], //表主键值
                    business_data_id: curRow["business_data_id"], //业务具体数据主键值
                    business_code: "000000001", //业务编号
                    process_name: "自由流程知会", //流程名称
                    employee: item,
                    process_station: "自由流程知会",
                    process_audit: "000000001",
                    proponents: curRow["proponents"],
                    content: curRow["content"],
                    operate_time: date,
                    create_time: date,
                    business_data: curRow.business_data
                };
            }

            //向流程审批日志表PR_LOG和审批处理表BS_APPROVE添加数据 , 并获取审批处理返回信息
            result = await manage.postProcessLogInformed(pnode);
        }

        //执行事务处理
        var operationData = {
            id: manage.queryRandomStr(32),
            type: "approve",
            create_by: userInfo["username"],
            create_time: date,
            table_name: tableName,
            table_id: curRow["business_data_id"],
            table_data: JSON.stringify(curRow),
            status: "wait",
            current_data: JSON.stringify({
                opeartion: "add",
                tableName: "PR_LOG",
                data: ""
            }),
            history_data: JSON.stringify({
                operation: "add",
                tableName: "PR_LOG_HISTORY",
                data: prLogHisNode
            }),
            inform_data: JSON.stringify({
                operation: "add",
                tableName: "PR_LOG_INFORMED",
                data: pnode
            }),
            delete_data: JSON.stringify({
                operation: "delete",
                tableName: "PR_LOG",
                data: prLogHisNode
            }),
            origin_data: JSON.stringify({
                operation: "patch",
                tableName: tableName,
                id: curRow["business_data_id"],
                data: bpmStatus
            }),
        };

        //执行审批业务
        await workflow.postWorkflowApprove(
            tableName,
            curRow,
            operationData,
            null,
            prLogHisNode,
            bpmStatus,
            freeNode,
            wflowAddUsers,
            wflowNotifyUsers,
            curAuditor
        );

        vant.Dialog.alert({ message: "同意审批成功，审批流程处理完毕！" });  //当前已经是最后一个审批节点，流程已经处理完毕

        let receiveURL = null;

        //发送企业微信通知，知会流程发起人，此案件发起申请已经完成！
        try {
            receiveURL = encodeURIComponent(`${window.requestAPIConfig.vuechatdomain}/#/legal/case/legalview?id=${bussinessCodeID}&pid=&tname=bs_reward_apply&panename=mytodolist&typename=wflow_done&bpm_status=4&proponents=${bussinessNode.create_by}`);
            await superagent.get(`${window.BECONFIG['restAPI']}/api/v1/weappms/${bussinessNode.create_by}/亲爱的同事，您提交的案件发起申请已处理完毕：${bussinessNode["title"]}，内容：${bussinessNode['content']}！?type=legal&rurl=${receiveURL}`)
                .set('accept', 'json');
        } catch (error) {
            console.log(error);
        }

        //再次检查此奖惩申请的流程状态，是否为已完成，如果不是已完成，则设置为已完成
        try {
            //修改审批状态为审批中
            result = await manage.patchTableData(tableName, bussinessCodeID, { id: bussinessCodeID, status: '已完成', bpm_status: bpmStatus.bpm_status });
        } catch (error) {
            console.log(error);
        }

        //将此审批流程中所涉及的所有奖惩明细数据的状态设置为已完成
        try {
            //查询奖惩明细数据
            const list = await Betools.query.queryTableDataByPid('bs_reward_items', bussinessCodeID); //查询诉讼案件明细数据

            //遍历奖惩明细数据，并设置状态为已完成
            for (const elem of list) {
                manage.patchTableData(tableName.replace('apply', 'items'), elem.id, { pid: bussinessCodeID, status: '已完成', bpm_status: bpmStatus.bpm_status });
            }

        } catch (error) {
            console.log(error);
        }

    } else {
        firstAuditor = firstAuditor.indexOf(",") == 0 ? firstAuditor.substring(1) : firstAuditor;  // 如果firstAuditor是逗号开头，则去掉开头的逗号
        firstAuditor = firstAuditor.split(",")[0]; // 获取下一审核节点
        approveNode == firstAuditor ? (bpmStatus = { bpm_status: "3" }) : (bpmStatus = { bpm_status: "2" }); // 设置流程 检查当前审核节点是否为审批节点，如果是，则bpm_status_code设置为3：审批中，否则，状态为 状态为2：审核中
        pnode = {}; // 审批相关处理信息

        //提交审批相关处理信息
        pnode = {
            id: manage.queryRandomStr(32), //获取随机数
            table_name: tableName, //业务表名
            main_value: curRow["business_data_id"], //表主键值
            business_data_id: curRow["business_data_id"], //业务具体数据主键值
            business_code: "000000000", //业务编号
            process_name: "自由流程审批", //流程名称
            employee: firstAuditor,
            process_station: "自由流程审批",
            process_audit: "000000000",
            proponents: curRow["proponents"],
            content: curRow["content"],
            operate_time: date,
            create_time: date,
            business_data: curRow.business_data
        };

        let vflag = await manage.queryApprovalLength(tableName, curRow["business_data_id"]); // 提交审批前，先检测同一业务表名下，是否有同一业务数据主键值，如果存在，则提示用户，此记录，已经提交审批

        if (vflag == 0) {
            vant.Dialog.alert({ message: `处理异常，请稍后重试；如果多次处理异常，可能需要撤销当前审批，重新发起审批流程！异常流程数据[status:${vflag}]`, }); // 数据库中已经存在此记录，提示用户无法提交审批
        } else {
            //执行事务处理
            let operationData = {
                id: manage.queryRandomStr(32),
                type: "next",
                create_by: userInfo["username"],
                create_time: date,
                table_name: tableName,
                table_id: curRow["business_data_id"],
                table_data: JSON.stringify(curRow),
                status: "wait",
                current_data: JSON.stringify({
                    opeartion: "add",
                    tableName: "PR_LOG",
                    data: pnode
                }),
                history_data: JSON.stringify({
                    operation: "add",
                    tableName: "PR_LOG_HISTORY",
                    data: prLogHisNode
                }),
                inform_data: JSON.stringify({
                    operation: "add",
                    tableName: "PR_LOG_INFORMED",
                    data: ""
                }),
                delete_data: JSON.stringify({
                    operation: "delete",
                    tableName: "PR_LOG",
                    data: prLogHisNode
                }),
                origin_data: JSON.stringify({
                    operation: "patch",
                    tableName: tableName,
                    id: curRow["business_data_id"],
                    data: bpmStatus
                }),
                trends_data: JSON.stringify({
                    opeartion: "add",
                    tableName: "",
                    data: ""
                }),
                task_data: JSON.stringify({
                    opeartion: "add",
                    tableName: "",
                    data: ""
                }),
                other_data: ""
            };

            //执行审批业务
            await workflow.postWorkflowApprove(
                tableName,
                curRow,
                operationData,
                pnode,
                prLogHisNode,
                bpmStatus,
                freeNode,
                wflowAddUsers,
                wflowNotifyUsers,
                curAuditor
            );

            //此处获取到待审核人员firstAuditor,可以向此用户推送审批消息，打开消息即可审批。
            await handleNotifyHR(firstAuditor, curRow["proponents"], '', encodeURIComponent(`${window.requestAPIConfig.vuechatdomain}/#/legal/case/legalview?id=${curRow.business_data_id}&pid=${pnode.id}&tname=bs_reward_apply&panename=mytodolist&typename=wflow_todo&bpm_status=${bpmStatus.bpm_status}&proponents=${curRow["proponents"]}`));

            //提示信息 //console.log(" 修改当前记录审批状态为处理中返回结果:" + JSON.stringify(result) );
            vant.Dialog.alert({
                message: "同意审批成功，审批流程已推向后续处理人！",
            })

            console.log("operationData : " + operationData);

            //发送审批流程通知，通知流程下一位审批人，点击审批详情，处理用户提交的诉讼案件流程审批通知。
            try {
                const receiveURL = encodeURIComponent(`${window.requestAPIConfig.vuechatdomain}/#/legal/case/legalview?id=${bussinessCodeID}&pid=&tname=bs_reward_apply&panename=mytodolist&typename=wflow_todo&bpm_status=2&proponents=${firstAuditor}`);
                await superagent.get(`${window.BECONFIG['restAPI']}/api/v1/weappms/${firstAuditor}/亲爱的同事，您收到案件发起申请审批处理请求：${curRow["title"]}，内容：${curRow['content']}，请您及时进行审批处理！?type=legal&rurl=${receiveURL}`)
                    .set('accept', 'json');
            } catch (error) {
                console.log(error);
            }
        }
    }
    
    //同意审批成功
    return 'success';

}

/**
 * 通知（相关专职人员查看数据）
 * @param {*} user_group_ids 
 * @param {*} userinfo 
 * @param {*} value 
 * @param {*} receiveURL 
 */
export async function handleNotifyHR(user_group_ids, userinfo, value, receiveURL) {
    try {
        await superagent.get(`${window.BECONFIG['restAPI']}/api/v1/weappms/${user_group_ids}/亲爱的同事，员工‘${userinfo}’提交了的案件发起申请，请进行流程审批操作！?type=legal&rurl=${receiveURL}`).set('accept', 'json');
    } catch (error) {
        console.log(error);
    }
};

/**
 * @function 同意审批
 */
export async function handleAgreeWF(tableName, bussinessCodeID, curRow, message, processID , username = '', domainURL = 'https://legal.yunwisdom.club:30443') {

    let result = '';
    await vant.Dialog.confirm({ title: '确认操作', message: '是否进行同意审批操作?', }).then(async() => {

            try {
                tableName = !Betools.tools.isNull(tableName) ? tableName : window.decodeURIComponent(Betools.tools.queryUrlString('tname')); //获取表单名称
                bussinessCodeID = !Betools.tools.isNull(bussinessCodeID) ? bussinessCodeID : Betools.tools.queryUrlString("id"); //查询业务编号
                curRow = !Betools.tools.isNull(curRow) ? curRow : (await Betools.query.queryTableData(tableName, bussinessCodeID)); //查询当前数据
                message = message || "同意";//审批意见
                processID = !Betools.tools.isNull(processID) ? processID : Betools.tools.queryUrlString("processID"); //流程日志编号
                username = !Betools.tools.isNull(username) ? username : Betools.tools.queryUrlString("proponents");
            } catch (error) {
                console.error(error);
            }
            
            const origin_username = Betools.tools.queryUrlString("origin_username");
            const bussinessNode = JSON.parse(JSON.stringify(curRow)); // 克隆当前业务数据
            const userInfo = Betools.storage.getStore("system_userinfo"); // 获取当前用户
            const operation = "同意"; // 审批动作
            const date = dayjs().format('YYYY-MM-DD HH:mm:ss'); // 获取当前时间

            // 获取当前审批节点的所有数据
            try {
                curRow = await Betools.manage.queryProcessLogByID(tableName, processID);
            } catch (error) {
                console.error(error);
            }

            // 获取后续节点
            const data = JSON.parse(curRow.relate_data); // 所有审批流程节点
            const curUserNode = data.find(item => { return item.loginid == username }); // 当前审批流程节点
            const nextUserNodes = data.filter(item => item.index > curUserNode.index); 
            const accounts = data.map(item=>item.loginid).toString();

            // 判断是否还有后续节点，如果存在后续节点，则bpm_status状态为4
            const bpmStatus = (Betools.tools.isNull(nextUserNodes) || nextUserNodes.length == 0) ? { bpm_status: "4" } : { bpm_status: "2" }; //流程状态

            //获取关于此表单的所有当前审批日志信息
            let node = await Betools.manage.queryProcessLog( tableName, curRow["business_data_id"] );

            //遍历node,设置approve_user，action
            try {
                node.map((item) => {
                    item["approve_user"] = userInfo["username"]; // 设置审批人员
                    item["employeeName"] = userInfo["realname"] || userInfo["name"]; // 设置审批人员
                    item["action"] = operation; // 设置操作动作
                    item["operate_time"] = item["create_time"] = date; // 设置操作时间
                    item["action_opinion"] = item['content'] = message; // 设置操作意见
                });
            } catch (error) {
                console.error(error);
            }

            let nextProcessNode = null;
            if(!(Betools.tools.isNull(nextUserNodes) || nextUserNodes.length == 0)){
                try {
                    nextProcessNode = {
                        id: Betools.tools.queryUniqueID(), //获取随机数
                        table_name: tableName, //业务表名
                        main_value: bussinessNode.id, //表主键值
                        business_data_id: bussinessNode.id, //业务具体数据主键值
                        business_code: "000000000", //业务编号
                        process_name: "流程审批" + (nextUserNodes.length > 1 ? '' : '[终审节点]'), //流程名称
                        employee: nextUserNodes[0].loginid,
                        employeeName: nextUserNodes[0].name,
                        process_station: "流程审批" + (nextUserNodes.length > 1 ? '' : '[终审节点]'),
                        process_audit: "000000000",
                        proponents: nextUserNodes[0].loginid,
                        approve_user: nextUserNodes[0].loginid,
                        content: '',
                        action: "审批",
                        operate_time: date,
                        create_time: date,
                        business_data: JSON.stringify(bussinessNode),
                        relate_data: JSON.stringify(data),
                        origin_data: accounts,
                    };
                } catch (error) {
                    console.error(error);
                }
            }

            //执行审批业务
            try {
                await workflow.postWorkflowApprove( tableName, curRow, null, nextProcessNode , node, bpmStatus );
            } catch (error) {
                console.error(error);
            }
                                                
            //发送企业微信通知，知会流程发起人，此案件发起申请已经完成！
            try {
                const curHost = window.location.protocol + '//' + window.location.host;
                if(!(Betools.tools.isNull(nextUserNodes) || nextUserNodes.length == 0)){
                    const receiveURL = encodeURIComponent(`${window.location.host.includes('localhost') ? domainURL : curHost }/#/legal/case/legalview?id=${bussinessNode.id}&processID=${nextProcessNode.id}&tname=bs_legal&role=workflow&origin_username=${origin_username}&bpm_status=${bpmStatus.bpm_status}&proponents=${nextUserNodes[0].loginid}&proponentName=${nextUserNodes[0].name}`);
                    await superagent.get(`${window.BECONFIG['restAPI']}/api/v1/weappms/${nextUserNodes[0].loginid}/您好，您有一个案件发起申请待审批：${bussinessNode["title"]}，请及时处理?type=legal&rurl=${receiveURL}`).set('accept', 'json');
                } else { //流程已经完毕，向发起人推送通知消息
                    const receiveURL = encodeURIComponent(`${window.location.host.includes('localhost') ? domainURL : curHost }/#/legal/case/legalview?id=${bussinessNode.id}&processID=&tname=bs_legal&role=view&origin_username=${origin_username}&bpm_status=4&proponents=${origin_username}`);
                    await superagent.get(`${window.BECONFIG['restAPI']}/api/v1/weappms/${username}/您好，您发起的案件申请已审批通过：${bussinessNode["title"]}。?type=legal&rurl=${receiveURL}`).set('accept', 'json');
                }
            } catch (error) {
                console.error(error);
            }

            vant.Dialog.alert({ title: '温馨提示', message: "同意审批成功！" }); //提示用户撤销审批操作成功
            return 'success';
    });
    return result; //返回操作结果
}

/**
 * @function 驳回审批
 */
export async function handleRejectWF(tableName, bussinessCodeID, curRow, message, processID, username = '', domainURL = 'https://legal.yunwisdom.club:30443') {

    let result = '';
    await vant.Dialog.confirm({ title: '确认操作', message: '是否进行驳回审批操作?', }).then(async() => {

            tableName = !Betools.tools.isNull(tableName) ? tableName : window.decodeURIComponent(Betools.tools.queryUrlString('tname')); //获取表单名称
            bussinessCodeID = !Betools.tools.isNull(bussinessCodeID) ? bussinessCodeID : Betools.tools.queryUrlString("id"); //查询业务编号
            curRow = !Betools.tools.isNull(curRow) ? curRow : (await Betools.query.queryTableData(tableName, bussinessCodeID)); //查询当前数据
            message = message || "驳回";//审批意见
            processID = !Betools.tools.isNull(processID) ? processID : Betools.tools.queryUrlString("processID"); //流程日志编号
            username = !Betools.tools.isNull(username) ? username : Betools.tools.queryUrlString("origin_username");
            
            const origin_username = Betools.tools.queryUrlString("origin_username");
            const bussinessNode = JSON.parse(JSON.stringify(curRow)); //克隆当前业务数据
            const userInfo = Betools.storage.getStore("system_userinfo"); //获取当前用户
            const operation = "驳回"; //审批动作
            const date = dayjs().format('YYYY-MM-DD'); //获取当前时间
            const bpmStatus = { bpm_status: "1" }; //流程状态

            curRow = await Betools.manage.queryProcessLogByID(tableName, processID); // 获取当前审批节点的所有数据

            /** 
             const flag = Betools.tools.deNull(curRow["employee"]).includes(userInfo["username"]) || Betools.tools.deNull(curRow["employee"]).includes(userInfo["realname"])
             if (!flag) {
                 return vant.Dialog.alert({ message: "您不在此审批流程记录的操作职员列中，无法进行驳回操作！" });  //检查审批权限，当前用户必须属于操作职员中，才可以进行审批操作
             }
             */

            //获取关于此表单的所有当前审批日志信息
            let node = await Betools.manage.queryProcessLog( tableName, curRow["business_data_id"]);

            //遍历node,设置approve_user，action
            node.map((item) => {
                item["approve_user"] = userInfo["username"]; // 设置审批人员
                item["employeeName"] = userInfo["realname"] || userInfo["name"]; // 设置审批人员
                item["action"] = operation; // 设置操作动作
                item["operate_time"] = date; // 设置操作时间
                item["action_opinion"] = item['content'] = message; // 设置操作意见
                item["create_time"] = dayjs().format('YYYY-MM-DD HH:mm:ss'); // 设置创建时间
            });

            //执行审批驳回业务
            try {
                await workflow.postWorkflowApprove( tableName, curRow, null, null, node, bpmStatus );
            } catch (error) {
                console.error(error);
            }

            const curHost = window.location.protocol + '//' + window.location.host;
            
            //发送企业微信通知，知会流程发起人，此案件发起申请已经完成！
            try {
                const receiveURL = encodeURIComponent(`${window.location.host.includes('localhost') ? domainURL : curHost }/#/legal/case/legalview?id=${bussinessCodeID}&pid=&origin_username=${origin_username}&tname=bs_legal&role=view&typename=wflow_done&bpm_status=4&proponents=${bussinessNode.create_by}`);
                await superagent.get(`${window.BECONFIG['restAPI']}/api/v1/weappms/${bussinessNode.apply_username}/您好，您提交的案件发起申请已被驳回：${bussinessNode["title"]}，驳回意见：${message}，请修改申请内容后重新提交流程?type=legal&rurl=${receiveURL}`).set('accept', 'json');
                await superagent.get(`${window.BECONFIG['restAPI']}/api/v1/weappms/${username}/您好，您提交的案件发起申请已被驳回：${bussinessNode["title"]}，驳回意见：${message}，请修改申请内容后重新提交流程?type=legal&rurl=${receiveURL}`).set('accept', 'json');
            } catch (error) {
                console.error(error);
            }

            vant.Dialog.alert({ title: '温馨提示', message: "驳回审批成功！" }); //提示用户撤销审批操作成功

            return 'success';
    });

    return result; //返回操作结果
}

/**
 * @function 发起审批自由流程
 */
export async function handleStartWF(userinfo, wfUsers, nfUsers, approver, curTableName, curItemID, data, ctime, domainURL = `https://legal.yunwisdom.club:30443`) {

    let accounts = '';
    let employeeName = '';
    const approve_userlist = data.approve_userlist; //获取审批人员列表

    try {
      accounts = approve_userlist.map(item=>item.loginid).toString();
      employeeName = approve_userlist[0].name;
    } catch (error) {
      console.error(error);
    }

    try {
       // 自由流程节点
       let node = {
           id: Betools.tools.queryUniqueID(),
           create_by: userinfo["username"],
           create_time: ctime,
           table_name: curTableName,
           main_key: data.id,
           audit_node: Betools.tools.deNull(wfUsers),
           approve_node: Betools.tools.deNull(approver),
           notify_node: Betools.tools.deNull(nfUsers),
           data: data,
           accounts: accounts,
           all_node: approve_userlist,
       };

       const freeWFNode = JSON.parse(JSON.stringify(node));

       // 提交发起人审批相关处理信息
       try {
            node = {
                id: Betools.tools.queryUniqueID(), //获取随机数
                table_name: curTableName, //业务表名
                main_value: data.id, //表主键值
                business_data_id: data.id, //业务具体数据主键值
                business_code: "000000000", //业务编号
                process_name: "流程审批", //流程名称
                employee: userinfo['name'] || userinfo["realname"] || userinfo["username"],
                employeeName: userinfo['name'] || userinfo["realname"] || userinfo["username"],
                process_station: "流程审批",
                process_audit: "000000000",
                proponents: userinfo["username"],
                approve_user: userinfo["username"],
                action: "发起",
                action_opinion: "发起流程",
                content: data['content'] || data['title'],
                operate_time: ctime,
                create_time: ctime,
                business_data: JSON.stringify(freeWFNode),
                relate_data: JSON.stringify(approve_userlist),
                origin_data: accounts,
            };
       } catch (error) {
            console.error(error);
       }

        try {
            const applyNode = JSON.parse(JSON.stringify(node)); // 发起节点，审批信息，写入我的申请审批表中
            applyNode.action = '申请';
            applyNode.action_opinion = '我的申请';
            await Betools.manage.postProcessLogHistory(applyNode, 'pr_log_apply'); //向流程审批日志表PR_LOG和审批处理表BS_APPROVE添加数据 , 并获取审批处理返回信息
        } catch (error) {
            console.log(error);
        }
       
       // 发起节点，审批信息，写入审批历史表中
       const startFreeNode = JSON.parse(JSON.stringify(node));

       // 获取审核节点中，第一个待审批用户，如果没有选择审核用户，则直接选择审批用户
       let firstWflowUser = Betools.tools.deNull(wfUsers) == "" ?  Betools.tools.deNull(approver) : Betools.tools.deNull(wfUsers).split(",")[0];

       // 提交审批相关处理信息
       node = {
           id: Betools.tools.queryUniqueID(), //获取随机数
           table_name: curTableName, //业务表名
           main_value: data.id, //表主键值
           business_data_id: data.id, //业务具体数据主键值
           business_code: "000000000", //业务编号
           process_name: "流程审批", //流程名称
           employee: firstWflowUser,
           employeeName: employeeName,
           process_station: "流程审批",
           process_audit: "000000000",
           proponents: userinfo["username"],
           approve_user: userinfo["username"],
           content: data["content"],
           action: "审批",
           operate_time: ctime,
           create_time: ctime,
           business_data: JSON.stringify(freeWFNode),
           relate_data: JSON.stringify(approve_userlist),
           origin_data: accounts,
       };

       // 保存审批相关处理信息
       const nextWflowNode = JSON.parse(JSON.stringify(node));

       // 提交审批前，先检测同一业务表名下，是否有同一业务数据主键值，如果存在，则提示用户，此记录，已经提交审批
       if (await Betools.manage.queryApprovalExist(curTableName,  curItemID)) {
         return vant.Toast.fail("已提交过申请，无法再次提交审批！");
       }

       await workflow.postWorkflowFree(userinfo, curTableName, data, freeWFNode, startFreeNode, nextWflowNode, "2");  // 处理自由流程发起提交审批操作
       vant.Toast.success("提交流程审批成功！");  // 弹出审批完成提示框
       Betools.storage.setStore(`start_free_process_@table_name#${curTableName}@id#${curItemID}`,  "true", 60 );  // 记录当前流程已经提交，短时间内无法再次提交

       const curHost = window.location.protocol + '//' + window.location.host;

       // 此处推送消息至第一个审批处 
       try {
          const receiveURL = encodeURIComponent(`${window.location.host.includes('localhost') ? domainURL : curHost }/#/legal/case/legalview?id=${data.id}&processID=${nextWflowNode.id}&tname=${curTableName}&origin_username=${userinfo["username"]}&role=workflow&type=approve&bpm_status=2&proponents=${firstWflowUser}`);
          await superagent.get(`${window.BECONFIG['restAPI']}/api/v1/weappms/${firstWflowUser}/您好，${userinfo['name']||userinfo['realname']}(${userinfo["username"]})提交了案件发起申请：${data["title"]}，请您及时进行审批处理！?type=legal&rurl=${receiveURL}`).set('accept', 'json');
       } catch (error) {
         console.log(error);
       }

       // 操作完毕，返回结果
       return true;
    } catch (error) {
        console.error(error);
    }

}

/**
 * @function 知会确认
 */
export async function handleConfirmWF(tableName, bussinessCodeID, curRow, message, processID, username = '', domainURL = 'https://legal.yunwisdom.club:30443') {

    let result = '';

    await vant.Dialog.confirm({ title: '确认操作', message: '是否进行确认知会操作?', })
        .then(async() => {

            const userInfo = Betools.storage.getStore("system_userinfo"); //获取当前用户

            try {
                tableName = !Betools.tools.isNull(tableName) ? tableName : window.decodeURIComponent(Betools.tools.queryUrlString('tname')); //获取表单名称
                bussinessCodeID = !Betools.tools.isNull(bussinessCodeID) ? bussinessCodeID : Betools.tools.queryUrlString("id"); //查询业务编号
                curRow = !Betools.tools.isNull(curRow) ? curRow : (await Betools.query.queryTableData(tableName, bussinessCodeID)); //查询当前数据
                message = message || "同意";//审批意见
                processID = !Betools.tools.isNull(processID) ? processID : Betools.tools.queryUrlString("processID"); //流程日志编号
                username = !Betools.tools.isNull(username) ? username : Betools.tools.queryUrlString("proponents");
            } catch (error) {
                console.error(error);
            }

            const date = dayjs().format('YYYY-MM-DD HH:mm:ss'); //获取当前时间
            const operation = "知会"; //审批动作
            const bpmStatus = { bpm_status: "5" }; //定义流程状态

            //获取当前审批节点的所有数据
            curRow = await manage.queryProcessLogInfByID(tableName, processID );

            //设置本次知会确认创建时间
            curRow["create_time"] = date;

            //如果当前节点的确认信息，已被此节点的所有人员操作完毕，则删除当前知会节点，并修改审批历史日志提交信息
            if (
                Betools.tools.deNull(curRow["approve_user"]).length >=
                Betools.tools.deNull(curRow["employee"]).length
            ) {
                //（1：待提交	2：审核中	3：审批中 4：已完成 5：已完成	10：已作废）
                try {
                    //将当前审批日志转为历史日志，并删除当前审批日志中相关信息
                    result = await manage.postProcessLogHistory(curRow);
                    //删除当前审批节点中的所有记录
                    result = await manage.deleteProcessLogInf(tableName, [curRow]);
                    //如果当前已经进入流程，则需要将流程状态设置为5：已完成
                    result = await manage.patchTableData(tableName, curRow["business_data_id"], bpmStatus);
                } catch (error) {
                    console.log(error);
                }

                //提示用户撤销审批操作成功
                vant.Dialog.alert({
                    message: "知会确认成功！"
                });

                result = 'success';
                return result;
            }

            var employeeList = "," + Betools.tools.deNull(curRow["employee"]) + ",";
            var appoveUserList = "," + Betools.tools.deNull(curRow["approve_user"]) + ",";

            //检查审批权限，当前用户必须属于操作职员中，才可以进行审批操作
            if (!(
                    tools
                    .deNull(employeeList)
                    .includes("," + userInfo["username"] + ",") ||
                    tools
                    .deNull(employeeList)
                    .includes("," + userInfo["realname"] + ",")
                )) {
                vant.Dialog.alert({
                    message: "您不在此知会记录的操作职员列中，无法进行确认操作！"
                });
                result = 'success';
                return result;
            }

            //已经知会确认过的用户，无法再次知会
            if (
                tools
                .deNull(appoveUserList)
                .includes("," + userInfo["username"] + ",") ||
                tools
                .deNull(appoveUserList)
                .includes("," + userInfo["realname"] + ",")
            ) {
                vant.Dialog.alert({ message: "您已经在此知会记录中，执行过确认操作了！" });
                result = 'success';
                return result;
            }

            //设置知会确认人员
            curRow["approve_user"] =
                Betools.tools.deNull(curRow["approve_user"]) +
                (Betools.tools.deNull(curRow["approve_user"]) == "" ? "" : ",") +
                userInfo["username"];

            //设置操作内容
            curRow["action"] = operation;

            //设置操作时间
            curRow["operate_time"] = date;

            //设置操作意见
            curRow["action_opinion"] =
                Betools.tools.deNull(curRow["action_opinion"]) +
                (Betools.tools.deNull(curRow["action_opinion"]) == "" ? "" : "\n\r") +
                `${userInfo["username"]}:${message}`;

            //保存当前数据到数据库中
            await manage.patchTableData(
                "PR_LOG_INFORMED",
                curRow["id"],
                curRow
            );

            //如果当前节点的确认信息，已被此节点的所有人员操作完毕，则删除当前知会节点，并修改审批历史日志提交信息
            if (curRow["approve_user"].length >= curRow["employee"].length) {
                try {
                    //将当前审批日志转为历史日志，并删除当前审批日志中相关信息
                    result = await manage.postProcessLogHistory(curRow);
                    //删除当前审批节点中的所有记录
                    result = await manage.deleteProcessLogInf(tableName, [curRow]);
                    //如果当前已经进入流程，则需要将流程状态设置为5：已完成  （1：待提交	2：审核中	3：审批中 4：已完成 5：已完成	10：已作废）
                    result = await manage.patchTableData(
                        tableName,
                        curRow["business_data_id"],
                        bpmStatus
                    );
                } catch (error) {
                    console.log(error);
                }
            }

            //提示用户撤销审批操作成功
            vant.Dialog.alert({
                message: "知会确认成功！"
            });

            result = 'success';

            return result;
        });

    return result;

}