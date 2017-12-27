<template>
    <div class="animated fadeIn">
        <Row>
            <Col :md="12">
            <Alert type="error">默认父级为总分类,总分类不能删除,也不能编辑。添加、编辑、删除时注意选择左边的菜单树。</Alert>
            <div style="position:relative;margin-bottom:6px;">
                <Button type="info" @click="adddata">添加</Button>
                <Button type="primary" @click="modifydata">编辑</Button>
                <Button type="error" @click="deletedata">删除</Button>
                <Tree :data="datamodel" :load-data="mockTreeData" ref="tree" @on-select-change="handleSelect"></Tree>
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
                <Form-item label="分类名称:" prop="CatName">
                    <Input v-model="formInfo.CatName" placeholder="请输入名称"></Input>
                </Form-item>
                <Form-item label="分类排序:" prop="CatSort">
                    <InputNumber :max="10000000" :min="1" v-model="formInfo.CatSort"></InputNumber>
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
    name: "producttype",
    data() {
        return {
            progresshow: false,
            progresscount: 0,
            progresstatus: "active",
            progressspeed: 0,
            datamodel: [],
            save_loading: false,
            actiontype: "ProductTypeAdd",
            formInfo: {
                ID: 0,
                PID: 0,
                ParentName: "总分类",
                CatName: "",
                CatSort: 1
            },
            selectNode: {
                ID: 0,
                PID: 1,
                ParentName: "总分类",
                CatName: "",
                CatSort: 1
            },
            ruleValidate: {
                CatName: [
                    { required: true, message: "分类名称不能为空", trigger: "blur" },
                    {
                        type: "string",
                        max: 20,
                        message: "分类名称最多20个字",
                        trigger: "blur"
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
                    obj.title = item.CatName;
                    obj.ID = item.ID; // 其他你想要添加的属性
                    obj.PID = item.PID;
                    obj.CatSort = item.CatSort;
                    obj.expand = true;
                    if (item.Children.length > 0) {
                        obj.children = this.getTree(item.Children); // 递归调用
                    }
                    arr.push(obj);
                });
            }
            return arr;
        },
        findParent(tree = [], id) {
            tree.forEach(item => {
                if (item.ID == id) {
                    this.selectNode.ParentName = item.title;
                    return;
                }
                if (item.children) {
                    this.findParent(item.children, id);
                }
            });
        },
        mockTreeData() {
            const vue = this;
            vue.$store
                .dispatch("ProductTypeTree", 0)
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
        adddata() {
            this.actiontype = "ProductTypeAdd";
            if (this.selectNode) {
                this.formInfo.PID = this.selectNode.ID;
                this.formInfo.ParentName = this.selectNode.CatName;
            }
            this.formInfo.ID = 0;
            this.formInfo.CatName = "";
            this.formInfo.CatSort = 1;
        },
        modifydata() {
            if (this.selectNode) {
                if (this.selectNode.ID > 1) {
                    this.actiontype = "ProductTypeModify";
                    this.formInfo.ID = this.selectNode.ID;
                    this.formInfo.PID = this.selectNode.PID;
                    this.formInfo.ParentName = this.selectNode.ParentName;
                    this.formInfo.CatName = this.selectNode.CatName;
                    this.formInfo.CatSort = this.selectNode.CatSort;
                } else {
                    this.$Message.error("顶级节点不能编辑");
                }
            } else {
                this.$Message.error("请选择节点");
            }
        },
        deletedata() {
            const vue = this;
            if (vue.selectNode) {
                if (vue.selectNode.ID > 1) {
                    vue.$Modal.confirm({
                        content: "<p>删除节点会删除所有子类.</p><p>确认删除?</p>",
                        onOk: () => {
                            vue.$store
                                .dispatch("ProductTypeDelete", snid)
                                .then(result => {
                                    if (result.Code == 200) {
                                        vue.$Message.success("删除成功");
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
                } else {
                    this.$Message.error("顶级节点不能删除");
                }
            } else {
                this.$Message.error("请选择节点");
            }
        },
        handleSubmit(name) {
            this.$refs[name].validate(valid => {
                if (valid) {
                    this.save_loading = true;
                    if (this.formInfo.ID) {
                        this.actiontype = "ProductTypeModify";
                    }
                    if (this.formInfo.ID != 1) {
                        this.$store
                            .dispatch(this.actiontype, this.formInfo)
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
                            this.$refs.formInfo.resetFields();
                            this.mockTreeData();
                        }, 2000);
                    } else {
                        this.$Message.error("总分类不能进行编辑!");
                    }
                } else {
                    this.$Message.error("请输入完整信息!");
                }
                this.save_loading = false;
            });
        },
        handleSelect(value) {
            var sn = value[0];
            if (!sn) {
                this.formInfo.PID = 1;
                this.formInfo.ParentName = "总分类";
                this.selectNode = null;
            } else {
                this.formInfo.PID = sn.ID;
                this.formInfo.ParentName = sn.title;
                this.selectNode = {
                    ID: sn.ID,
                    PID: sn.PID,
                    CatName: sn.title,
                    CatSort: sn.CatSort
                };
                this.findParent(this.datamodel, sn.PID);
            }
            this.actiontype = "ProductTypeAdd";
            this.$Notice.open({
                title: "选择节点提醒",
                desc: sn ? "选择了节点:" + sn.title : "总分类"
            });
        }
    },
    created() {
        this.mockTreeData();
    }
};
</script>