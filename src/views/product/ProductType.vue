<template>
  <div class="animated fadeIn">
    <Row>
      <Col :md="24">
      <div style="position:relative;">
        <i-button type="primary" style="margin-bottom:6px;" @click="modalform=true">添加</i-button>
        <Tree :data="datamodel" :load-data="mockTreeData" show-checkbox></Tree>
      </div>
      </Col>
    </Row>
    <Row>
      <Col :md="24">
      <Modal title="产品分类信息" v-model="modalform" class-name="vertical-center-modal">
        <Form ref="formInfo" :model="formInfo" :rules="ruleValidate" :label-width="80">
          <Form-item prop="ID" style="display:none;">
            <Input v-model="formInfo.ID"></Input>
          </Form-item>
          <Form-item prop="PID" style="display:none;">
            <Input v-model="formInfo.PID"></Input>
          </Form-item>
          <Form-item label="分类名称" prop="CatName">
            <Input v-model="formInfo.CatName" placeholder="请输入名称"></Input>
          </Form-item>
          <Form-item label="分类排序" prop="CatSort">
            <InputNumber :max="10000000" :min="1" v-model="formInfo.CatSort"></InputNumber>
          </Form-item>
          <Form-item label="状态" prop="Status">
            <iSwitch v-model="formInfo.Status" size="large">
              <span slot="open">正常</span>
              <span slot="close">屏蔽</span>
            </iSwitch>
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
  name: 'producttype',
  data() {
    return {
      progresshow: false,
      progresscount: 0,
      progresstatus: 'active',
      progressspeed: 0,
      datamodel: [],
      save_loading: false,
      modalform: false,
      formInfo: {
        ID: 0,
        PID: 0,
        CatName: '',
        CatSort: 1,
        Status: true
      },
      ruleValidate: {
        CatName: [
          { required: true, message: '分类名称不能为空', trigger: 'blur' },
          {
            type: 'string',
            max: 20,
            message: '分类名称最多20个字',
            trigger: 'blur'
          }
        ]
      }
    };
  },
  methods: {
    getTree(tree = []) {
      const arr = [];
      if (!!tree && tree.length !== 0) {
        tree.forEach(item => {
          const obj = {};
          obj.title = item.CatName;
          obj.attr = item.ID; // 其他你想要添加的属性
          obj.expand = false;
          obj.children = this.getTree(item.Children); // 递归调用
          arr.push(obj);
        });
      }
      return arr;
    },
    mockTreeData() {
      const vue = this;
      vue.$store
        .dispatch('ProductTypeTree', vue.formInfo.PID)
        .then(result => {
          if (result.Code == 200) {
            vue.datamodel = vue.getTree(result.Data);
          } else {
            vue.$Message.error(result.Message);
          }
        })
        .catch(err => {
          vue.$Message.error(err);
        });
    },
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.save_loading = true;
          let action = 'ProductTypeAdd';
          if (this.formInfo.ID) {
            action = 'ProductTypeModify';
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
            this.mockTreeData();
          }, 2000);
        } else {
          this.$Message.error('请输入完整信息!');
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    }
  },
  created() {
    this.mockTreeData();
  }
};
</script>