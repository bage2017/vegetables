<template>
    <div class="animated fadeIn">
        <Row>
            <Col :md="24">
            <Form :model="searchFrom" :label-width="80" inline>
                <FormItem label="名称描述">
                    <Input v-model="searchFrom.productname" placeholder="产品名称或描述..."></Input>
                </FormItem>
                <FormItem label="产品类型">
                    <Select v-model="searchFrom.productcid" style="width:160px;">
                        <Option value="0">全部</Option>
                        <Option value="1">纽约</Option>
                        <Option value="2">伦敦</Option>
                        <Option value="3">悉尼</Option>
                    </Select>
                </FormItem>
                <FormItem>
                    <Button type="primary">搜索</Button>
                </FormItem>
            </Form>
            </Col>
        </Row>
        <Row>
            <Col :md="24">
            <div style="position:relative;">
                <Button type="primary" style="margin-bottom:6px;" @click="handleAdd">添加</Button>
                <Table :data="datamodel" :columns="tablecolumns" stripe></Table>
            </div>
            </Col>
        </Row>
    </div>
</template>
<script>
export default {
    data() {
        return {
            searchFrom: {
                productname: "",
                productcid: 0
            },
            datamodel: [],
            tablecolumns: []
        };
    },
    methods: {
        handleAdd() {
            this.$Message.info("添加");
        }
    }
};
</script>