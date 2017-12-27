<template>
    <div class="animated fadeIn">
        <Row>
            <Col :md="12">
            <Alert type="error">默认父级为顶级菜单,顶级菜单不能删除,也不能编辑。添加、编辑、删除时注意选择左边的菜单树。</Alert>
            <div style="position:relative;margin-bottom:6px;">
                <Button type="info" @click="adddata">添加</Button>
                <Button type="primary" @click="modifydata">编辑</Button>
                <Button type="error" @click="deletedata">删除</Button>
                <Menu active-name="0-0" theme="dark" width="auto" @on-select="handleSelect">
                    <Menu-group v-for="(menu,index) in menus" :title="menu.name" :key="index">
                        <Menu-item v-for="(item,ins) in menu.item" :key="ins" :name="index+'-'+ins">
                            <Icon :type="item.icon"></Icon>
                            {{item.name}}
                        </Menu-item>
                    </Menu-group>
                </Menu>
            </div>
            </Col>
            <Col :md="12">
            <Form ref="formInfo" :model="formInfo" :rules="ruleValidate" :label-width="80">
                <Form-item prop="ID" style="display:none;">
                    <Input v-model="formInfo.ID"></Input>
                </Form-item>
                <Form-item prop="PID" style="display:none;">
                    <Input v-model="formInfo.PID"></Input>
                </Form-item>
                <Form-item label="父级分类:" prop="ParentName">
                    <Tag :name="formInfo.ParentName">{{ formInfo.ParentName }}</Tag>
                </Form-item>
                <Form-item label="分类名称:" prop="MenuName">
                    <Input v-model="formInfo.MenuName" placeholder="请输入名称"></Input>
                </Form-item>
                <Form-item label="分类排序:" prop="MenuSort">
                    <InputNumber :max="10000000" :min="1" v-model="formInfo.MenuSort"></InputNumber>
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
  name: 'producttype',
  data() {
    return {
      progresshow: false,
      progresscount: 0,
      progresstatus: 'active',
      progressspeed: 0,
      menus: [],
      save_loading: false,
      actiontype: 'ProductTypeAdd',
      formInfo: {
        ID: 0,
        PID: 0,
        ParentName: '总菜单',
        MenuName: '',
        MenuSort: 1
      },
      ruleValidate: {
        MenuName: [
          { required: true, message: '菜单名称不能为空', trigger: 'blur' },
          {
            type: 'string',
            max: 20,
            message: '菜单名称最多20个字',
            trigger: 'blur'
          }
        ]
      }
    };
  },
  methods: {
    mockTreeData() {

    },
    adddata() {
      this.$Message.success('添加');
    },
    modifydata() {
      this.$Message.info('修改');
    },
    deletedata() {
      this.$Message.error('删除');
    },
    handleSubmit(name) {
      this.$Message.success('保存');
    },
    handleSelect(value) {
      this.$Notice.open({
        title: '选择节点提醒',
        desc: '选择了节点:'
      });
    }
  }
};
</script>