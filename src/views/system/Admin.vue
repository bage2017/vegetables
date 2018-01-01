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
            <div class="demo-upload-list" v-for="item in uploadList">
        <template v-if="item.status === 'finished'">
            <img :src="item.url">
            <div class="demo-upload-list-cover">
                <Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
                <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
            </div>
        </template>
        <template v-else>
            <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
        </template>
    </div>
    <Upload
        ref="upload"
        :show-upload-list="false"
        :default-file-list="defaultList"
        :on-success="handleSuccess"
        :format="['jpg','jpeg','png']"
        :max-size="2048"
        :on-format-error="handleFormatError"
        :on-exceeded-size="handleMaxSize"
        :before-upload="handleBeforeUpload"
        multiple
        type="drag"
        action="//jsonplaceholder.typicode.com/posts/"
        style="display: inline-block;width:58px;">
        <div style="width: 58px;height:58px;line-height: 58px;">
            <Icon type="camera" size="20"></Icon>
        </div>
    </Upload>
    <Modal title="View Image" v-model="visible" style="z-index:1006;">
        <img :src="'https://o5wwk8baw.qnssl.com/' + imgName + '/large'" v-if="visible" style="width: 100%">
    </Modal>
          </Form-item>
          <Form-item label="角色" prop="RoleId">
            <Select v-model="formInfo.RoleId" style="width:200px">
              <Option v-for="item in rolelist" :value="item.Id" :key="item.Id">{{ item.RoleName }}</Option>
            </Select>
          </Form-item>
          <Form-item label="状态" prop="Status">
            <RadioGroup v-model="formInfo.Status">
                <Radio label="2">
                    <span>正常</span>
                </Radio>
                <Radio label="1">
                    <span>屏蔽</span>
                </Radio>
            </RadioGroup>
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
  name: 'admin',
  data() {
    return {
      pageparam: {
        pageindex: 1,
        pagesize: 12,
        loginrealname: '',
        totalcount: 0
      },
      datamodel: [],
      rolelist: [],
      save_loading: false,
      list_loadding: false,
      tablecolumns: [
        {
          title: '登录名',
          key: 'LoginName',
          ellipsis: 'true'
        },
        {
          title: '真实姓名',
          key: 'RealName',
          ellipsis: 'true'
        },
        {
          title: '电话',
          key: 'TelePhone',
          ellipsis: 'true'
        },
        {
          title: '头像',
          key: 'Avatar',
          ellipsis: 'true'
        },
        {
          title: '角色名称',
          key: 'RoleName',
          ellipsis: 'true'
        },
        {
          title: '创建日期',
          key: 'BuildDate',
          ellipsis: 'true'
        },
        {
          title: '备注',
          key: 'Remark',
          ellipsis: 'true'
        },
        {
          title: '状态',
          ellipsis: 'true',
          render: (h, params) => {
            const status = parseInt(params.row.Status);
            if (status === 1) {
              return h('div', [
                h(
                  'Tag',
                  {
                    props: {
                      type: 'dot',
                      color: 'blue'
                    }
                  },
                  '屏蔽'
                )
              ]);
            } else {
              return h('div', [
                h(
                  'Tag',
                  {
                    props: {
                      type: 'dot',
                      color: 'green'
                    }
                  },
                  '正常'
                )
              ]);
            }
          }
        },
        {
          title: '操作',
          key: 'action',
          align: 'center',
          ellipsis: 'true',
          render: (h, params) =>
            h('div', [
              h(
                'Button',
                {
                  props: {
                    type: 'info',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      const admin = params.row;
                      this.formInfo.ID = admin.ID;
                      this.formInfo.LoginName = admin.LoginName;
                      this.formInfo.RealName = admin.RealName;
                      this.formInfo.TelePhone = admin.TelePhone;
                      this.formInfo.Avatar = admin.Avatar;
                      this.formInfo.RoleId = admin.RoleId;
                      this.formInfo.Status = admin.Status;
                      this.formInfo.Remark = admin.Remark;
                      this.modalform = true;
                    }
                  }
                },
                '编辑'
              ),
              h(
                'Button',
                {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      const vue = this;
                      vue.$Modal.confirm({
                        content: '<p>确认删除?</p>',
                        onOk: () => {
                          vue.$store
                            .dispatch('AdminDelete', params.row.Id)
                            .then(result => {
                              if (result.Code == 200) {
                                vue.mockTableData();
                                vue.$Message.success('删除成功');
                              } else {
                                vue.$Message.info('删除失败');
                              }
                            })
                            .catch(err => {
                              vue.$Message.error(err);
                            });
                        }
                      });
                    }
                  }
                },
                '删除'
              )
            ]) // render
        }
      ],
      modalform: false,
      formInfo: {
        ID: 0,
        LoginName: '',
        RealName: '',
        TelePhone: '',
        Avatar: '',
        RoleId: '',
        Status: 2,
        Remark: ''
      },
      ruleValidate: {
        LoginName: [{ required: true, message: '登录名不能为空', trigger: 'blur' }],
        RealName: [
          { required: true, message: '真实姓名不能为空', trigger: 'blur' },
          {
            type: 'string',
            max: 36,
            message: '真实姓名最多36个字',
            trigger: 'blur'
          }
        ],
        TelePhone: [{ required: true, message: '手机不能为空', trigger: 'blur' }],
        Remark: [
          {
            type: 'string',
            max: 50,
            message: '备注最多50个字',
            trigger: 'blur'
          }
        ]
      },
      defaultList: [
        {
          name: 'a42bdcc1178e62b4694c830f028db5c0',
          url:
            'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar'
        },
        {
          name: 'bc7521e033abdd1e92222d733590f104',
          url:
            'https://o5wwk8baw.qnssl.com/bc7521e033abdd1e92222d733590f104/avatar'
        }
      ],
      imgName: '',
      visible: false,
      uploadList: []
    };
  },
  methods: {
    mockTableData() {
      const vue = this;
      vue.$store
        .dispatch('AdminPage', {
          pageindex: vue.pageparam.pageindex,
          pagesize: vue.pageparam.pagesize,
          loginrealname: vue.pageparam.loginrealname
        })
        .then(result => {
          vue.datamodel = result.Data.DataList;
          vue.pageparam.totalcount = result.Data.TotalCount;
          if (result.Code != 200) {
            vue.$Message.error(result.Message);
          }
        })
        .catch(err => {
          vue.$Message.error(err);
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
          let action = 'AdminAdd';
          if (this.formInfo.Id) {
            action = 'AdminModify';
          }
          this.$store
            .dispatch(action, this.formInfo)
            .then(result => {
              if (result.Code == 200) {
                this.$Message.success('保存成功');
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
          this.$Message.error('请输入完整信息!');
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    },
    handleView(name) {
      this.imgName = name;
      this.visible = true;
    },
    handleRemove(file) {
      const fileList = this.$refs.upload.fileList;
      this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
    },
    handleSuccess(res, file) {
      file.url = 'https://o5wwk8baw.qnssl.com/7eb99afb9d5f317c912f08b5212fd69a/avatar';
      file.name = '7eb99afb9d5f317c912f08b5212fd69a';
    },
    handleFormatError(file) {
      this.$Notice.warning({
        title: 'The file format is incorrect',
        desc: 'File format of ' + file.name + ' is incorrect, please select jpg or png.'
      });
    },
    handleMaxSize(file) {
      this.$Notice.warning({
        title: 'Exceeding file size limit',
        desc: 'File  ' + file.name + ' is too large, no more than 2M.'
      });
    },
    handleBeforeUpload() {
      const check = this.uploadList.length < 5;
      if (!check) {
        this.$Notice.warning({
          title: 'Up to five pictures can be uploaded.'
        });
      }
      return check;
    }
  },
  mounted() {
    const vue = this;
    vue.list_loadding = true;
    vue.uploadList = vue.$refs.upload.fileList;
    setTimeout(() => {
      vue.list_loadding = false;
    }, 2000);
  },
  created() {
    this.$store
      .dispatch('RoleList')
      .then(result => {
        this.rolelist = result.Data;
        if (result.Code != 200) {
          this.$Message.error(result.Message);
        }
      })
      .catch(err => {
        this.$Message.error(err);
      });
    this.mockTableData();
  }
};
</script>
<style>
.demo-upload-list {
  display: inline-block;
  width: 60px;
  height: 60px;
  text-align: center;
  line-height: 60px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  margin-right: 4px;
}
.demo-upload-list img {
  width: 100%;
  height: 100%;
}
.demo-upload-list-cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}
.demo-upload-list:hover .demo-upload-list-cover {
  display: block;
}
.demo-upload-list-cover i {
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  margin: 0 2px;
}
</style>