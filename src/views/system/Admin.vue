<template>
  <div class="animated fadeIn">
    <Row>
      <Col :md="24">
      <div style="position:relative;">
        <Button type="primary" style="margin-bottom:6px;" @click="modalform=true">添加</Button>
        <Table :data="datamodel" :columns="tablecolumns" stripe></Table>
        <div style="margin: 10px;overflow: hidden">
          <div style="float: right;">
            <Page :total="pageparam.totalcount" :current="pageparam.pageindex" :page-size='pageparam.pagesize' @on-change="changePage"></Page>
          </div>
        </div>
        <div style="position:absolute;top:0px;width:100%;height:100%;display: flex;
                            align-items: center;
                            justify-content: center;background: rgba(210, 216, 222, 0.5);" v-if="list_loadding">
          <Spin size="large"></Spin>
          <h6 style="color:#2d8cf0;margin-top:10px;">正在获取数据...</h6>
        </div>
      </div>
      </Col>
    </Row>
    <Row>
      <Col :md="24">
      <Modal title="用户信息" v-model="modalform" class-name="vertical-center-modal">
        <Form ref="formInfo" :model="formInfo" :rules="ruleValidate" :label-width="80">
          <Form-item prop="ID" style="display:none;">
            <Input v-model="formInfo.ID"></Input>
          </Form-item>
          <Form-item label="登录名" prop="LoginName">
            <Input v-model="formInfo.LoginName" placeholder="请输入登录名"></Input>
          </Form-item>
          <Form-item label="真实姓名" prop="RealName">
            <Input v-model="formInfo.RealName" placeholder="请输入真实姓名"></Input>
          </Form-item>
          <Form-item label="电话" prop="TelePhone">
            <Input v-model="formInfo.TelePhone" placeholder="请输入电话"></Input>
          </Form-item>
          <Form-item label="头像" prop="Avatar">
            <Input v-model="formInfo.Avatar" placeholder="请上传头像"></Input>
          </Form-item>
          <Form-item label="角色" prop="RoleId">
            <Select v-model="formInfo.RoleId" style="width:200px">
              <Option v-for="item in rolelist" :value="item.RoleId" :key="item.RoleId">{{ item.RoleName }}</Option>
            </Select>
          </Form-item>
          <Form-item label="状态" prop="Status">
            <iSwitch v-model="formInfo.Status" size="large">
              <span slot="open">正常</span>
              <span slot="close">屏蔽</span>
            </iSwitch>
          </Form-item>
          <Form-item label="备注" prop="Remark">
            <Input v-model="formInfo.Remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."></Input>
          </Form-item>
        </Form>
        <div slot="footer">
          <Button type="ghost" @click="handleReset('formInfo')" style="margin-left: 8px">清空</Button>
          <Button type="primary" :loading="save_loading" @click="handleSubmit('formInfo')">保存</Button>
        </div>
      </Modal>
      </Col>
    </Row>
  </div>
</template>
<script>
export default {
    name: "admin",
    data() {
        return {
            pageparam: {
                pageindex: 1,
                pagesize: 12,
                loginrealname: "",
                totalcount: 0
            },
            datamodel: [],
            rolelist: [],
            save_loading: false,
            list_loadding: false,
            tablecolumns: [
                {
                    title: "登录名",
                    key: "LoginName",
                    ellipsis: "true"
                },
                {
                    title: "真实姓名",
                    key: "RealName",
                    ellipsis: "true"
                },
                {
                    title: "电话",
                    key: "TelePhone",
                    ellipsis: "true"
                },
                {
                    title: "头像",
                    key: "Avatar",
                    ellipsis: "true"
                },
                {
                    title: "角色名称",
                    key: "RoleName",
                    ellipsis: "true"
                },
                {
                    title: "创建日期",
                    key: "BuildDate",
                    ellipsis: "true"
                },
                {
                    title: "备注",
                    key: "Remark",
                    ellipsis: "true"
                },
                {
                    title: "状态",
                    ellipsis: "true",
                    render: (h, params) => {
                        const status = parseInt(params.row.Status);
                        if (status === 1) {
                            return h("div", [
                                h(
                                    "Tag",
                                    {
                                        props: {
                                            type: "dot",
                                            color: "blue"
                                        }
                                    },
                                    "屏蔽"
                                )
                            ]);
                        } else {
                            return h("div", [
                                h(
                                    "Tag",
                                    {
                                        props: {
                                            type: "dot",
                                            color: "green"
                                        }
                                    },
                                    "正常"
                                )
                            ]);
                        }
                    }
                },
                {
                    title: "操作",
                    key: "action",
                    align: "center",
                    ellipsis: "true",
                    render: (h, params) =>
                        h("div", [
                            h(
                                "Button",
                                {
                                    props: {
                                        type: "info",
                                        size: "small"
                                    },
                                    style: {
                                        marginRight: "5px"
                                    },
                                    on: {
                                        click: () => {
                                            const admin = params.row;
                                            this.formInfo.ID = admin.ID;
                                            this.formInfo.LoginName =
                                                admin.LoginName;
                                            this.formInfo.RealName =
                                                admin.RealName;
                                            this.formInfo.TelePhone =
                                                admin.TelePhone;
                                            this.formInfo.Avatar = admin.Avatar;
                                            this.formInfo.RoleId = admin.RoleId;
                                            this.formInfo.Status =
                                                admin.Status == 2;
                                            this.formInfo.Remark = admin.Remark;
                                            this.modalform = true;
                                        }
                                    }
                                },
                                "编辑"
                            ),
                            h(
                                "Button",
                                {
                                    props: {
                                        type: "error",
                                        size: "small"
                                    },
                                    on: {
                                        click: () => {
                                            const vue = this;
                                            vue.$Modal.confirm({
                                                content: "<p>确认删除?</p>",
                                                onOk: () => {
                                                    vue.$store
                                                        .dispatch(
                                                            "AdminDelete",
                                                            params.row.Id
                                                        )
                                                        .then(result => {
                                                            if (
                                                                result.Code ==
                                                                200
                                                            ) {
                                                                vue.mockTableData();
                                                                vue.$Message.success(
                                                                    "删除成功"
                                                                );
                                                            } else {
                                                                vue.$Message.info(
                                                                    "删除失败"
                                                                );
                                                            }
                                                        })
                                                        .catch(err => {
                                                            vue.$Message.error(
                                                                err
                                                            );
                                                        });
                                                }
                                            });
                                        }
                                    }
                                },
                                "删除"
                            )
                        ]) // render
                }
            ],
            modalform: false,
            formInfo: {
                ID: 0,
                LoginName: "",
                RealName: "",
                TelePhone: "",
                Avatar: "",
                RoleId: "",
                Status: "",
                Remark: ""
            },
            ruleValidate: {
                RealName: [
                    { required: true, message: "真实姓名不能为空", trigger: "blur" },
                    {
                        type: "string",
                        max: 36,
                        message: "真实姓名最多36个字",
                        trigger: "blur"
                    }
                ],
                Remark: [
                    {
                        type: "string",
                        max: 50,
                        message: "备注最多50个字",
                        trigger: "blur"
                    }
                ]
            }
        };
    },
    methods: {
        mockTableData() {
            const vue = this;
            this.$store
                .dispatch("AdminPage", {
                    pageindex: vue.pageparam.pageindex,
                    pagesize: vue.pageparam.pagesize,
                    loginrealname: vue.pageparam.loginrealname
                })
                .then(result => {
                    vue.datamodel = result.Data.DataList;
                    vue.pageparam.totalcount = result.Data.TotalCount;
                    if (result.Code != 200) {
                        this.$Message.error(result.Message);
                    }
                })
                .catch(err => {
                    this.$Message.error(err);
                });
        },
        changePage(value) {
            const vue = this;
            vue.pageparam.pageindex = value;
            vue.list_loadding = true;
            vue.datamodel = this.mockTableData();
            setTimeout(() => {
                vue.list_loadding = false;
            }, 2000);
        },
        handleSubmit(name) {
            this.$refs[name].validate(valid => {
                if (valid) {
                    this.save_loading = true;
                    let action = "AdminAdd";
                    if (this.formInfo.Id) {
                        action = "AdminModify";
                    }
                    this.$store
                        .dispatch(action, this.formInfo)
                        .then(result => {
                            if (result.Code == 200) {
                                this.$Message.success("保存成功");
                            } else {
                                this.$Message.error(result.Message);
                            }
                        })
                        .catch(err => {
                            this.$Message.error(err);
                        });
                    setTimeout(() => {
                        this.save_loading = false;
                        this.modalform = false;
                        this.$refs.formInfo.resetFields();
                        this.mockTableData();
                    }, 2000);
                } else {
                    this.$Message.error("请输入完整信息!");
                }
            });
        },
        handleReset(name) {
            this.$refs[name].resetFields();
        }
    },
    mounted() {
        const vue = this;
        this.list_loadding = true;
        setTimeout(function() {
            vue.list_loadding = false;
        }, 2000);
    },
    created() {
        this.mockTableData();
    }
};
</script>