<template>
  <div class="animated fadeIn">
    <Row>
      <Col :md="12">
      <Alert type="error">角色列表(角色列表选择角色后自动加载菜单，添加、修改、删除选择右边的菜单保存即可)</Alert>
      <div style="position:relative;">
        <Table height="600" highlight-row :columns="datacolumn" :data="datarole" ref="table" @on-current-change="handleSelect"></Table>
        <div style="position:absolute;top:0px;width:100%;height:100%;display: flex;
                            align-items: center;
                            justify-content: center;background: rgba(210, 216, 222, 0.5);" v-if="list_loadding">
          <Spin size="large"></Spin>
          <h6 style="color:#2d8cf0;margin-top:10px;">正在获取数据...</h6>
        </div>
      </div>
      </Col>
      <Col :md="12">
      <div style="margin-left:6px;">
        <Button type="primary" style="margin-bottom:6px;" @click="saverolemenu">保存</Button>
        <Tree :data="datamenu" ref="tree" show-checkbox></Tree>
      </div>
      </Col>
    </Row>
  </div>
</template>
<script>
export default {
  data() {
      return {
          datarole: [],
          datamenu: [],
          selectrid: 0,
          list_loadding: false,
          datacolumn: [
              {
                title: '角色名称',
                key: 'RoleName',
                ellipsis: 'true'
              }
            ]
        };
    },
  methods: {
      getTree(tree = []) {
          const arr = [];
          if (tree && tree.length > 0) {
              tree.forEach(item => {
                  const obj = {};
                  obj.title = item.MenuName;
                  obj.ID = item.ID;
                  obj.Pid = item.Pid;
                  obj.MenuHref = item.MenuHref;
                  obj.MenuIcon = item.MenuIcon;
                  obj.MenuOrder = item.MenuOrder;
                  obj.expand = true;
                  obj.checked = false;
                  if (item.Children && item.Children.length > 0) {
                      obj.children = this.getTree(item.Children);
                    }
                  arr.push(obj);
                });
            }
          return arr;
        },
      setCheckedNode(tree = [], selectedids = []) {
          tree.forEach(item => {
              if (selectedids.indexOf(item.ID) > -1) {
                  item.checked = true;
                } else {
                  item.checked = false;
                }
              if (item.children && item.children.length > 0) {
                  this.setCheckedNode(item.children, selectedids);
                }
            });
        },
      mockTableData() {
          const vue = this;
          this.$store
                .dispatch('RoleList')
                .then(result => {
                  vue.datarole = result.Data;
                  if (result.Code != 200) {
                      vue.$Message.error(result.Message);
                    }
                })
                .catch(err => {
                  vue.$Message.error(err);
                });
        },
      mockTreeData() {
          const vue = this;
          vue.$store
                .dispatch('MenusTree', 0)
                .then(result => {
                  if (result.Code == 200) {
                      vue.datamenu = vue.getTree(result.Data);
                    } else {
                      vue.$Message.error(result.Message);
                    }
                })
                .catch(err => {
                  vue.$Message.error(err);
                });
        },
      handleSelect(currentRow) {
          const vue = this;
          vue.selectrid = currentRow.Id;
          vue.$store
                .dispatch('MenusByRid', currentRow.Id)
                .then(result => {
                  if (result.Code == 200) {
                      vue.setCheckedNode(vue.datamenu, result.Data);
                    } else if (result.Code == 410) {
                      vue.setCheckedNode(vue.datamenu, []);
                      vue.$Message.info('没有菜单数据');
                    } else {
                      vue.$Message.info(result.Message);
                    }
                })
                .catch(err => {
                  vue.$Message.error(err);
                });
        },
      saverolemenu() {
          const roleid = this.selectrid;
          const mids = [];
          this.$refs.tree.getCheckedNodes().forEach(item => {
              mids.push(item.ID);
            });
          if (roleid) {
              this.$store
                    .dispatch('RoleMenu', { rid: roleid, mids })
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
            } else {
              this.$Message.error('请选择角色');
            }
        }
    },
  mounted() {
      const vue = this;
      vue.list_loadding = true;
      setTimeout(() => {
          vue.list_loadding = false;
        }, 2000);
    },
  created() {
      this.mockTreeData();
      this.mockTableData();
    }
};
</script>