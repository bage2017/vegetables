<template>
    <Form :model="formItem" :label-width="80" inline>
        <FormItem label="Input">
            <Input v-model="formItem.input" placeholder="Enter something..."></Input>
        </FormItem>
        <FormItem label="Select">
            <Select v-model="formItem.select">
                <Option value="beijing">New York</Option>
                <Option value="shanghai">London</Option>
                <Option value="shenzhen">Sydney</Option>
            </Select>
        </FormItem>
        <FormItem label="DatePicker">
            <Row>
                <Col span="11">
                    <DatePicker type="date" placeholder="Select date" v-model="formItem.date"></DatePicker>
                </Col>
                <Col span="2" style="text-align: center">-</Col>
                <Col span="11">
                    <TimePicker type="time" placeholder="Select time" v-model="formItem.time"></TimePicker>
                </Col>
            </Row>
        </FormItem>
        <FormItem>
            <Button type="primary">搜索</Button>
        </FormItem>
    </Form>
</template>
<script>
    export default {
      data() {
        return {
          formItem: {
            input: '',
            select: '',
            date: '',
            time: ''
          }
        }
      }
    }
</script>