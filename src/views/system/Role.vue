<template>
    <div class="animated fadeIn">
        <Row>
            <Col :md="24">
            <div style="position:relative;">
                <Table :data="datamodel" :columns="tablecolumns" stripe></Table>
                <div style="margin: 10px;overflow: hidden">
                    <div style="float: right;">
                        <Page :total="100" :current="1" @on-change="changePage"></Page>
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
    data() {
        return {
            progresshow: false,
            progresscount: 0,
            progresstatus: "active",
            progressspeed: 0,
            datamodel: this.mockTableData1(),
            pageindex: 1,
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
                    filters: [
                        {
                            label: "删除",
                            value: 0
                        },
                        {
                            label: "正在处理",
                            value: 1
                        },
                        {
                            label: "处理完成",
                            value: 2
                        }
                    ],
                    filterMultiple: false,
                    filterMethod(value, row) {
                        if (value === 0) {
                            return row.task_status === 1;
                        } else {
                            return row.task_status === 0;
                        }
                    },
                    render: (h, params) => {
                        const task_status = parseInt(params.row.task_status);
                        if (task_status === 0)
                            return h("div", [
                                h(
                                    "Tag",
                                    {
                                        props: {
                                            type: "dot",
                                            color: "blue"
                                        }
                                    },
                                    "正在处理"
                                )
                            ]);
                        else if (task_status === 1)
                            return h("div", [
                                h(
                                    "Tag",
                                    {
                                        props: {
                                            type: "dot",
                                            color: "green"
                                        }
                                    },
                                    "处理完成"
                                )
                            ]);
                    }
                },
                {
                    title: "操作",
                    key: "action",
                    align: "center",
                    ellipsis: "true",
                    render: (h, params) => {
                        const task_status = parseInt(params.row.task_status);
                        if (task_status === 0) {
                            return h("div", [
                                h(
                                    "Tooltip",
                                    {
                                        props: {
                                            content: "还未分析完成，暂时不能查看"
                                        }
                                    },
                                    [
                                        h(
                                            "Button",
                                            {
                                                props: {
                                                    type: "primary",
                                                    size: "small",
                                                    loading: true
                                                },
                                                style: {
                                                    marginRight: "5px"
                                                }
                                            },
                                            "处理中"
                                        )
                                    ]
                                ),
                                h(
                                    "Button",
                                    {
                                        props: {
                                            type: "error",
                                            size: "small",
                                            disabled: true
                                        },
                                        on: {
                                            click: () => {
                                                this.remove(params.index);
                                            }
                                        }
                                    },
                                    "删除"
                                )
                            ]);
                        } else if (task_status === 1) {
                            return h("div", [
                                h(
                                    "Button",
                                    {
                                        props: {
                                            type: "primary",
                                            size: "small"
                                        },
                                        style: {
                                            marginRight: "5px"
                                        },
                                        on: {
                                            click: () => {
                                                this.$router.push({
                                                    path:
                                                        "/tabledetail/" +
                                                        ((this.pageindex - 1) *
                                                            10 +
                                                            params.index)
                                                });
                                            }
                                        }
                                    },
                                    "查看结果"
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
                                                this.remove(params.index);
                                            }
                                        }
                                    },
                                    "删除"
                                )
                            ]);
                        }
                    } //render
                }
            ]
        };
    },
    methods: {
        mockTableData1() {
            let data = [];
            for (let i = 0; i < 10; i++) {
                data.push({
                    RoleName: "Business" + Math.floor(Math.random() * 100 + 1),
                    Remark: Math.floor(Math.random() * 3 + 1),
                    Status: i % 3 == 0 ? 0 : 1,
                    task_status: i % 2 == 0 ? 1 : 0,
                    time: Math.floor(Math.random() * 7 + 1),
                    update: new Date()
                });
            }
            return data;
        },
        formatDate(date) {
            const y = date.getFullYear();
            let m = date.getMonth() + 1;
            m = m < 10 ? "0" + m : m;
            let d = date.getDate();
            d = d < 10 ? "0" + d : d;
            return y + "-" + m + "-" + d;
        },
        changePage() {
            const vue = this;
            vue.list_loadding = true;
            setTimeout(function() {
                vue.list_loadding = false;
            }, 2000);
            vue.datamodel = this.mockTableData1();
        }
    },
    mounted() {
        const vue = this;
        vue.list_loadding = true;
        setTimeout(function() {
            vue.list_loadding = false;
        }, 2000);
        this.setInitPage(1);
    }
};
</script>