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
    input_err_4: null,
    input_err_5: null,
    input_err_6: null,
    error_displace: '未计算',
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
    case '工序八':
      switch (option.plan) { 
        case '一面一销定位方案':
          that.setData({
            img_path_plan: '../pic/pro8_plan2.png',
            img_path: '../pic/other_8.png'
          });
        break;
      }
      break;
    case '工序十':
      switch (option.plan) { 
        case '一面一销一钉定位方案':
          that.setData({
            img_path_plan: '../pic/pro10_plan1.png',
            img_path: '../pic/other_10.png'
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
  errInput4: function(e) {
    var that = this;
    that.data.input_err_4 = e.detail.value;
  },
  errInput5: function(e) {
    var that = this;
    that.data.input_err_5 = e.detail.value;
  },
  errInput6: function(e) {
    var that = this;
    that.data.input_err_6 = e.detail.value;
  },
  calcDisp: function(e) {
    var that = this;
    var result = (parseFloat(that.data.input_err_1) + parseFloat(that.data.input_err_2) + parseFloat(that.data.input_err_3) - parseFloat(that.data.input_err_4)).toFixed(4);
    if (result == 'NaN') {
      toast('请检查所输入数据');
      result = '未计算';
    }
    else {
      toast('计算完毕');
    }
    that.setData({
      error_displace: result
    });
  },
  calcLoc: function(e) {
    var that = this;
    var result = (parseFloat(that.data.input_err_1) + parseFloat(that.data.input_err_2) + parseFloat(that.data.input_err_3) - parseFloat(that.data.input_err_4) + parseFloat(that.data.input_err_5)).toFixed(4);
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
    var result = (parseFloat(that.data.input_err_6) / 3).toFixed(4);
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