wx.cloud.init({
  env: 'nzc-0g8pvq7v7737e6a0',
  traceUser: true,
})
var db=wx.cloud.database();
function toast(message) {
  wx.showToast({
    title: message, // 提示的内容
    icon: 'none', // 图标，默认success
    image: "", // 自定义图标的本地路径，image的优先级高于icon
    duration: 3000, // 提示的延迟时间，默认1500ms
    mask: false, // 是否显示透明蒙层，防止触摸穿透
  })
}
Page({
  data: {
    array_part: [],
    array_part_1: ['支承钉','支承板','可调支承','自位支承','辅助支承','定位销','圆锥销','定位心轴','V型块','定位套'], // 夹具零件（定位）多项选择器选项
    array_part_2: ['压板','偏心轮','快速夹紧机构','移动V型块','联动夹紧装置','气缸'], // 夹具零件（夹紧）多项选择器选项
    array_part_3: ['车刀','铣刀','刨刀','钻刀','磨刀','镗刀'], // 刀具多项选择器选项
    array_part_4: ['量具'], // 量具多项选择器选项
    index_part: 0, // 零件多项选择器指针
    frock: '', // 新零件的工装种类
    partModel: '', // 用户填写的新零件型号
    input_content: '' // 用来清空input
  },
  onLoad(option) {
    var that = this;
    switch (parseInt(option.index_frock)) { 
      case 1:
        that.setData({
          array_part: that.data.array_part_1
        });
        that.data.frock = '夹具零件（定位）';
        break;
      case 2:
        that.setData({
          array_part: that.data.array_part_2
        });
        that.data.frock = '夹具零件（夹紧）';
        break;
      case 3:
        that.setData({
          array_part: that.data.array_part_3
        });
        that.data.frock = '刀具';
        break;
      case 4:
        that.setData({
          array_part: that.data.array_part_4
        });
        that.data.frock = '量具';
        break;
    }
  },
  onShow() {
    
  },
  // 新零件添加页面中零件种类的多项选择器
  pickerChangeFrock: function(e) {
    this.setData({
        index_part: e.detail.value
    });
  },
  partModel: function(e) {
    var that = this;
    that.data.partModel = e.detail.value;
  },
  addFrock: function(e) {
    var that = this;
    if (that.data.partModel == '') {
      toast("零件型号不能为空");
    }
    else {
      db.collection('WAREHOUSE').where({
        frock: that.data.frock,
        part: that.data.array_part[that.data.index_part],
        model: that.data.partModel
      }).get({
        success: function(res) {
          if (res.data.length > 0) {
            toast("该型号零件已存在");
          }
          else {
            db.collection('WAREHOUSE').add({
              data: {
                frock: that.data.frock,
                part: that.data.array_part[that.data.index_part],
                model: that.data.partModel
              },
              success: function(res) {
                toast("添加成功");
              }
            })
          }
        }
      })
    }
  },
  goback: function(e) {
    wx.switchTab({
      url: '/pages/warehouse/warehouse'
    })
  }
})