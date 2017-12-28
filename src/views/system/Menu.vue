<template>
  <div class="animated fadeIn">
    <Row>
      <Col :md="12">
      <div style="position:relative;">
        <Alert type="info">默认选中菜单编辑,编辑、删除时注意选择左边的菜单树。菜单最多只有两级，默认顶级,其他菜单级项:请看父级菜单选项<br />(菜单图标可到
          <a target="_blank" href="https://www.iviewui.com/components/icon">https://www.iviewui.com/components/icon</a>查找你想要的图标)</Alert>
        <Col :md="12">
        <div style="margin-bottom:6px;">
          <Button type="info" @click="adddata">添加</Button>
          <Button type="error" @click="deletedata">删除</Button>
          <Tree :data="menus" :load-data="mockTreeData" ref="tree" @on-select-change="handleSelect"></Tree>
        </div>
        </Col>
        <Col :md="12">
        <Alert type="success">预览:</Alert>
        <Menu theme="dark" width="auto" style="opacity: 0.9;position: relative;">
          <Submenu :name="menu.ID" v-for="menu in previewmenus" :key="menu.ID">
            <template slot="title">
              <Icon :type="menu.MenuIcon"></Icon>{{menu.MenuName}}
            </template>
            <Menu-item :name="item.ID" v-for="item in menu.Children" :key="item.ID">
              <Icon :type="item.MenuIcon"></Icon>{{item.MenuName}}</Menu-item>
          </Submenu>
        </Menu>
        </Col>
      </div>
      </Col>
      <Col :md="12">
      <Form ref="formInfo" :model="formInfo" :rules="ruleValidate" :label-width="80">
        <Form-item prop="ID" style="display:none;">
          <Input v-model="formInfo.ID"></Input>
        </Form-item>
        <Form-item label="父级分类:" prop="Pid">
          <Select v-model="formInfo.Pid" style="width:200px">
            <Option v-for="item in parents" :value="item.Pid" :key="item.Pid">{{ item.MenuName }}</Option>
          </Select>
        </Form-item>
        <Form-item label="菜单名称:" prop="MenuName">
          <Input v-model="formInfo.MenuName" placeholder="请输入菜单名称" style="width:200px"></Input>
        </Form-item>
        <Form-item label="菜单链接:" prop="MenuHref">
          <Input v-model="formInfo.MenuHref" placeholder="请输入菜单链接" style="width:200px"></Input>
        </Form-item>
        <Form-item label="菜单图标:" prop="MenuIcon">
          <Input v-model="formInfo.MenuIcon" placeholder="请输入菜单图标" style="width:200px"></Input>
        </Form-item>
        <Form-item label="菜单排序:" prop="MenuOrder">
          <InputNumber :min="1" v-model="formInfo.MenuOrder"></InputNumber>
        </Form-item>
        <Form-item>
          <Button type="primary" :loading="save_loading" @click="handleSubmit('formInfo')">保存</Button>
        </Form-item>
      </Form>
      </Col>
    </Row>
  </div>
</template>
<script>
export default {
  name: 'menu',
  data() {
    return {
      menus: [],
      previewmenus: [],
      parents: [],
      save_loading: false,
      actiontype: 'MenuAdd',
      formInfo: {
        ID: 0,
        Pid: 0,
        MenuName: '',
        MenuHref: '',
        MenuIcon: '',
        MenuOrder: 1
      },
      selectNode: {
        ID: 0,
        Pid: 0,
        MenuName: '',
        MenuHref: '',
        MenuIcon: '',
        MenuOrder: 1
      },
      ruleValidate: {
        Pid: [
          {
            type: 'number',
            required: true,
            message: '请选择父级菜单',
            trigger: 'change'
          }
        ],
        MenuName: [
          { required: true, message: '菜单名称不能为空', trigger: 'blur' },
          {
            type: 'string',
            max: 20,
            message: '菜单名称最多20个字',
            trigger: 'blur'
          }
        ],
        MenuHref: [
          { required: true, message: '菜单链接不能为空', trigger: 'blur' },
          {
            type: 'string',
            max: 200,
            message: '菜单链接最多200个字',
            trigger: 'blur'
          }
        ],
        MenuIcon: [
          {
            type: 'string',
            max: 50,
            message: '菜单图标最多50个字',
            trigger: 'blur'
          }
        ]
      }
    };
  },
  methods: {
    getTree(tree = []) {
      const arr = [];
      if (tree && tree.length > 0) {
        tree.forEach(item => {
          const obj = {};
          obj.title = item.MenuName;
          obj.ID = item.ID; // 其他你想要添加的属性
          obj.Pid = item.Pid;
          obj.MenuHref = item.MenuHref;
          obj.MenuIcon = item.MenuIcon;
          obj.MenuOrder = item.MenuOrder;
          obj.expand = false;
          if (item.Children && item.Children.length > 0) {
            obj.children = this.getTree(item.Children);
          }
          arr.push(obj);
        });
      }
      return arr;
    },
    mockTreeData() {
      const vue = this;
      vue.$store.dispatch('MenusTree', 0).then(result => {
        if (result.Code == 200) {
          vue.menus = vue.getTree(result.Data);
          vue.previewmenus = result.Data[0].Children;
          vue.parents = [];
          vue.parents.push({
            Pid: result.Data[0].ID,
            MenuName: result.Data[0].MenuName
          });
          if (result.Data[0].Children && result.Data[0].Children.length > 0) {
            result.Data[0].Children.forEach(item => {
              vue.parents.push({
                Pid: item.ID,
                MenuName: item.MenuName
              });
            });
          }
        } else {
          vue.$Message.error(result.Message);
        }
      });
    },
    adddata() {
      this.actiontype = 'MenuAdd';
      this.$refs.formInfo.resetFields();
    },
    deletedata() {
      const vue = this;
      if (!vue.selectNode || vue.selectNode.ID < 1) {
        vue.$Message.error('请选择节点');
      } else if (vue.selectNode.ID == 1) {
        vue.$Message.error('顶级菜单不能删除');
      } else {
        vue.$Modal.confirm({
          content: '<p>删除节点会删除所有子类.</p><p>确认删除?</p>',
          onOk: () => {
            vue.$store
              .dispatch('MenuDelete', vue.selectNode.ID)
              .then(result => {
                if (result.Code == 200) {
                  vue.$Message.success('删除成功');
                  vue.mockTreeData();
                } else {
                  vue.$Message.error(result.Message);
                }
              })
              .catch(err => {
                vue.$Message.error(err);
              });
          }
        });
      }
    },
    handleSubmit(name) {
      if (this.formInfo.ID == 1) {
        this.$Message.error('顶级菜单不能编辑');
      } else {
        this.$refs[name].validate(valid => {
          if (valid) {
            this.save_loading = true;
            if (this.formInfo.ID) {
              this.actiontype = 'MenuModify';
            }
            this.$store
              .dispatch(this.actiontype, this.formInfo)
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
              this.$refs.formInfo.resetFields();
              this.mockTreeData();
            }, 2000);
          } else {
            this.$Message.error('请输入完整信息!');
          }
          this.save_loading = false;
        });
      }
    },
    handleSelect(value) {
      const obj = {
        ID: 0,
        Pid: 0,
        MenuName: '',
        MenuHref: '',
        MenuIcon: '',
        MenuOrder: 1
      };
      if (value && value[0]) {
        if (value[0].ID > 1) {
          const sn = value[0];
          this.selectNode = {
            ID: sn.ID,
            Pid: sn.Pid,
            MenuName: sn.title,
            MenuHref: sn.MenuHref,
            MenuIcon: sn.MenuIcon,
            MenuOrder: sn.MenuOrder
          };
          this.formInfo = this.selectNode;
          this.$Notice.open({
            title: '选择节点提醒',
            desc: '选择了节点:' + sn.title
          });
        } else if (value[0].ID == 1) {
          this.selectNode = obj;
          this.$Message.error('顶级菜单不能编辑!');
        }
      } else {
        this.selectNode = obj;
      }
    }
  },
  created() {
    this.mockTreeData();
  }
};
</script>