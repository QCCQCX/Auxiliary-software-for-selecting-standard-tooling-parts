wx.cloud.init({
  env: 'nzc-0g8pvq7v7737e6a0',
  traceUser: true,
})
var db=wx.cloud.database();
function toast(message) {
  wx.showToast({
      title: message, // 提示的内容
      icon: "none", // 图标，默认success
      image: "", // 自定义图标的本地路径，image的优先级高于icon
      duration: 3000, // 提示的延迟时间
      mask: false, // 是否显示透明蒙层，防止触摸穿透
  })
}
Page({
  data: {
    process: null,
    plan: null,
    face: null,
    input_err_1: null,
    input_err_2: null,
    input_err_3: null,
    error_location: '未计算',
    error_process: '未计算',
  },
  onLoad: function(option) {
    var that = this;
    that.setData({
      process: option.process,
      plan: option.plan,
      face: option.face
    });
    switch (option.process) { 
      case '工序一':
        switch (option.plan) { 
          case '三二一定位方案':
            that.setData({
              img_path_plan: '../pic/pro1_plan1.png',
              img_path: '../pic/other_1.png'
            });
            break;
          case 'V形块定位方案':
            that.setData({
              img_path_plan: '../pic/pro1_plan2.png',
              img_path: '../pic/other_1.png'
            });
          break;
        }
        break;
      case '工序二':
      switch (option.plan) { 
        case '三二一定位方案':
          that.setData({
            img_path_plan: '../pic/pro2_plan1.png',
            img_path: '../pic/other_2.png'
          });
          break;
        case 'V形块定位方案':
          that.setData({
            img_path_plan: '../pic/pro2_plan2.png',
            img_path: '../pic/other_2.png'
          });
        break;
      }
      break;
    case '工序八':
      switch (option.plan) { 
        case '三二一定位方案':
          that.setData({
            img_path_plan: '../pic/pro8_plan1.png',
            img_path: '../pic/other_8.png'
          });
          break;
        case '一面一销定位方案':
          that.setData({
            img_path_plan: '../pic/pro8_plan2.png',
            img_path: '../pic/other_8.png'
          });
        break;
      }
      break;
    }
  },
  errInput1: function(e) {
    var that = this;
    that.data.input_err_1 = e.detail.value;
  },
  errInput2: function(e) {
    var that = this;
    that.data.input_err_2 = e.detail.value;
  },
  errInput3: function(e) {
    var that = this;
    that.data.input_err_3 = e.detail.value;
  },
  calcLoc: function(e) {
    var that = this;
    var result = (parseFloat(parseFloat(that.data.input_err_1)) + parseFloat(parseFloat(that.data.input_err_2))).toFixed(4);
    if (result == 'NaN') {
      toast('请检查所输入数据');
      result = '未计算';
    }
    else {
      toast('计算完毕');
    }
    that.setData({
      error_location: result
    });
  },
  calcPro: function(e) {
    var that = this;
    var result = (parseFloat(that.data.input_err_3) / 3).toFixed(4);
    if (result == 'NaN') {
      toast('请检查所输入数据');
      result = '未计算';
    }
    else {
      toast('计算完毕');
    }
    that.setData({
      error_process: result
    });
  },
  submitCalc: function(e) {
    var that = this;
    if (that.data.error_location == '未计算' || that.data.error_process == '未计算') {
      toast('未完成所有计算');
    }
    else {
      db.collection('CALC').where({
        keyValue: null,
        process: that.data.process,
        plan: that.data.plan,
        face: that.data.face
      }).update({
        data: {
          loc: that.data.error_location,
          pro: that.data.error_process
        },
        success: function(res) {
          if (!res.stats.updated) {
            db.collection('CALC').add({
              data: {
                keyValue: null,
                process: that.data.process,
                plan: that.data.plan,
                face: that.data.face,
                loc: that.data.error_location,
                pro: that.data.error_process
              }
            })
          }
        }
      })
      toast('上传成功');
    }
  },
})