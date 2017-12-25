<template>
    <div class="animated fadeIn">
        <Row>
            <Col :md="24">
            <div style="position:relative;">
                <Button type="info" style="margin-bottom:6px;" @click="addRole">添加</Button>
                <Table :data="datamodel" :columns="tablecolumns" stripe></Table>
                <div style="margin: 10px;overflow: hidden">
                    <div style="float: right;">
                        <Page :total="totalcount" :current="pageindex" :page-size='pagesize' @on-change="changePage"></Page>
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
    </div>
</template>
<script>
export default {
    name: "role",
    data() {
        return {
            progresshow: false,
            progresscount: 0,
            progresstatus: "active",
            progressspeed: 0,
            pageindex: 1,
            pagesize: 12,
            isasc: false,
            totalcount: 0,
            datamodel: [],
            lodding: false,
            list_loadding: false,
            tablecolumns: [
                {
                    title: "角色名称",
                    key: "RoleName",
                    ellipsis: "true"
                },
                {
                    title: "备注",
                    ellipsis: "true",
                    key: "Remark"
                },
                {
                    title: "状态",
                    ellipsis: "true",
                    render: (h, params) => {
                        const status = parseInt(params.row.Status);
                        if (status === 0)
                            return h("div", [
                                h(
                                    "Tag",
                                    {
                                        props: {
                                            type: "dot",
                                            color: "red"
                                        }
                                    },
                                    "删除"
                                )
                            ]);
                        else if (status === 1)
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
                        else {
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
                    render: (h, params) => {
                        return h("div", [
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
                                            this.$Message.info("编辑");
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
                                            this.$Message.info("删除");
                                        }
                                    }
                                },
                                "删除"
                            )
                        ]);
                    } //render
                }
            ]
        };
    },
    methods: {
        mockTableData() {
            const vue = this;
            this.$store
                .dispatch("RolePage", {
                    pageindex: vue.pageindex,
                    pagesize: vue.pagesize,
                    isasc: vue.isasc
                })
                .then(result => {
                    vue.datamodel = result.Data.DataList;
                    vue.totalcount = result.Data.TotalCount;
                    if (result.Code != 200) {
                        this.$Message.error(result.Message);
                    }
                })
                .catch(err => {
                    this.$Message.error(err);
                });
            return vue.datamodel;
        },
        changePage(value) {
            const vue = this;
            vue.pageindex = value;
            vue.list_loadding = true;
            vue.datamodel = this.mockTableData();
            vue.list_loadding = false;
        },
        addRole() {
            this.$Message.info("添加");
        }
    },
    created() {
        this.mockTableData();
    }
};
</script>