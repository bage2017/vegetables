<template>
    <div class="animated fadeIn">
        <Row>
            <Col :md="12" >
                    <div style="position:relative;">
                        <Table highlight-row :columns="datacolumn" :data="datamodal" ref="table"></Table>
                        <div style="position:absolute;top:0px;width:100%;height:100%;display: flex;
                            align-items: center;
                            justify-content: center;background: rgba(210, 216, 222, 0.5);" v-if="list_loadding">
                            <Spin size="large"></Spin>
                            <h6 style="color:#2d8cf0;margin-top:10px;">正在获取数据...</h6>
                        </div>
                    </div>
            </Col>
            <Col :md="12">
            <Tree :data="data2" show-checkbox></Tree>
            </Col>
        </Row>
    </div>
</template>
<script>
export default {
  data() {
    return {
      datacolumn: [
        {
          title: '视频名称',
          key: 'video_name',
          ellipsis: 'true'
        },
        {
          title: '上传时间',
          ellipsis: 'true',
          key: 'timestamp'
        },
        {
          title: '大小',
          ellipsis: 'true',
          key: 'video_size',
          filters: [
            {
              label: '大于10M',
              value: 1
            },
            {
              label: '小于10M',
              value: 2
            }
          ],
          filterMultiple: false,
          filterMethod(value, row) {
            if (value === 1) {
              return row.video_size > 1024 * 1024 * 1024 * 10;
            } else if (value === 2) {
              return row.video_size < 1024 * 1024 * 10;
            }
          }
        }
      ],
      data2: [
        {
          title: 'parent 1',
          expand: true,
          children: [
            {
              title: 'parent 1-1',
              expand: true,
              children: [
                {
                  title: 'leaf 1-1-1'
                },
                {
                  title: 'leaf 1-1-2'
                }
              ]
            },
            {
              title: 'parent 1-2',
              expand: true,
              children: [
                {
                  title: 'leaf 1-2-1'
                },
                {
                  title: 'leaf 1-2-1'
                }
              ]
            }
          ]
        }
      ],
      datamodal: [
        {
          timestamp: '2017-08-10 17:03:54',
          video_size: 1732410,
          video_name: 'p.mp4'
        },
        {
          timestamp: '2017-08-10 17:03:54',
          video_size: 1732410,
          video_name: 'p.mp4'
        },
        {
          timestamp: '2017-08-10 17:03:54',
          video_size: 1732410,
          video_name: 'p.mp4'
        },
        {
          timestamp: '2017-08-10 17:03:54',
          video_size: 1732410,
          video_name: 'p.mp4'
        },
        {
          timestamp: '2017-08-10 17:03:54',
          video_size: 1732410,
          video_name: 'p.mp4'
        },
        {
          timestamp: '2017-08-10 17:03:54',
          video_size: 1732410,
          video_name: 'p.mp4'
        }
      ]
    };
  }
};
</script>