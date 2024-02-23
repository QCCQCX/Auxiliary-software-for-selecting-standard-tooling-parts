wx.cloud.init({
  env: 'nzc-0g8pvq7v7737e6a0',
  traceUser: true,
})
var db=wx.cloud.database();
function formatTime(newDateTime) {
  var date = new Date(newDateTime);
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();
  return year + "" + month + "" + day + "" + hour + "" + minute + "" + second
}
function toast(message) {
  wx.showToast({
      title: message, // 提示的内容
      icon: "none", // 图标，默认success
      image: "", // 自定义图标的本地路径，image的优先级高于icon
      duration: 5000, // 提示的延迟时间
      mask: false, // 是否显示透明蒙层，防止触摸穿透
  })
}
var keyValue = null;
Page({
  data: {
    array_process: ['工序一','工序二','工序八','工序十'], // 工序多项选择器选项
    index_process: 0, // 工序多项选择器指针
    array_plan: [],
    array_plan_1: ['三二一定位方案','V形块定位方案'], 
    array_plan_2: ['三二一定位方案','V形块定位方案'], 
    array_plan_3: ['三二一定位方案','一面一销定位方案'], 
    array_plan_4: ['一面一销一钉定位方案'], 
    index_plan: 0,
    array_face: [],
    array_face_1: ['大底面'], 
    array_face_2: ['圆面','方形面'], 
    array_face_3: ['到大底面','圆心'], 
    array_face_4: ['圆心'], 
    index_face: 0,
  },
  onLoad(option) {
    var that = this;
    switch (parseInt(that.data.index_process)) { 
      case 0:
        that.setData({
          array_plan: that.data.array_plan_1,
          array_face: that.data.array_face_1,
        });
        break;
      case 1:
        that.setData({
          array_plan: that.data.array_plan_2,
          array_face: that.data.array_face_2,
        });
        break;
      case 2:
        that.setData({
          array_plan: that.data.array_plan_3,
          array_face: that.data.array_face_3,
        });
        break;
      case 3:
        that.setData({
          array_plan: that.data.array_plan_4,
          array_face: that.data.array_face_4,
        });
        break;
    }
  },
  onShow() {
    
  },
  toProcessCfg: function(e) {
    wx.navigateTo({
      url: '/pages/processCfg/processCfg?index_process=' + e.currentTarget.dataset.index_process
    })
  },
  toProcessView: function(e) {
    wx.navigateTo({
      url: '/pages/processView/processView?index_process=' + e.currentTarget.dataset.index_process
    })
  },
  submitProcess: function(e) {
    wx.showModal({
      content: "提交后将不可修改！", // 提示内容
      showCancel: true, // 是否显示取消按钮，默认true
      cancelText: "取消", // 取消按钮的文字，最多4个字符
      cancelColor: "#000000", // 取消按钮的文字颜色
      confirmText: "确认", // 确认按钮的文字，最多4个字符
      confirmColor: "#c42929", // 确认按钮的文字颜色
      success: function (res) {
        if (res.confirm) {
          keyValue = formatTime(new Date().getTime());
          db.collection('SELECTION').where({
            keyValue: null,
          }).update({
            data: {
              keyValue: keyValue
            },
            success: function(res) {
              if (res.stats.updated) {
                db.collection('CALC').where({
                  keyValue: null,
                }).update({
                  data: {
                    keyValue: keyValue
                  }
                });
                toast('ID:' + keyValue);
              }
              else {
                toast('无配置信息');
              }
            }
          })
        }
      }
    })
  },
  pickerChangeProcess: function(e) {
    var that = this;
    that.setData({
      index_process: e.detail.value,
      index_plan: 0,
      index_face: 0
    });
    switch (parseInt(e.detail.value)) { 
      case 0:
        that.setData({
          array_plan: that.data.array_plan_1,
          array_face: that.data.array_face_1
        });
        break;
      case 1:
        that.setData({
          array_plan: that.data.array_plan_2,
          array_face: that.data.array_face_2
        });
        break;
      case 2:
        that.setData({
          array_plan: that.data.array_plan_3,
          array_face: that.data.array_face_3
        });
        break;
      case 3:
        that.setData({
          array_plan: that.data.array_plan_4,
          array_face: that.data.array_face_4
        });
        break;
    }
  },
  pickerChangePlan: function(e) {
    var that = this;
    that.setData({
      index_plan: e.detail.value,
    });
  },
  pickerChangeFace: function(e) {
    var that = this
    that.setData({
      index_face: e.detail.value
    });
  },
  calcBegin: function(e) {
    var that = this;
    switch (parseInt(that.data.index_process)) { 
      case 0:
        switch (parseInt(that.data.index_plan)) { 
          case 0:
            switch (parseInt(that.data.index_face)) { 
              case 0:
                wx.navigateTo({
                  url: '/pages/calcOne/calcOne?process=' + that.data.array_process[that.data.index_process] + '&plan=' + that.data.array_plan[that.data.index_plan] + '&face=' + that.data.array_face[that.data.index_face]
                })
                break;
            }
            break;
          case 1:
            switch (parseInt(that.data.index_face)) { 
              case 0:
                wx.navigateTo({
                  url: '/pages/calcOne/calcOne?process=' + that.data.array_process[that.data.index_process] + '&plan=' + that.data.array_plan[that.data.index_plan] + '&face=' + that.data.array_face[that.data.index_face]
                })
                break;
            }
            break;
        }
        break;
      case 1:
        switch (parseInt(that.data.index_plan)) { 
          case 0:
            switch (parseInt(that.data.index_face)) { 
              case 0:
                wx.navigateTo({
                  url: '/pages/calcOne/calcOne?process=' + that.data.array_process[that.data.index_process] + '&plan=' + that.data.array_plan[that.data.index_plan] + '&face=' + that.data.array_face[that.data.index_face]
                })
                break;
              case 1:
                wx.navigateTo({
                  url: '/pages/calcOne/calcOne?process=' + that.data.array_process[that.data.index_process] + '&plan=' + that.data.array_plan[that.data.index_plan] + '&face=' + that.data.array_face[that.data.index_face]
                })
                break;
            }
            break;
          case 1:
            switch (parseInt(that.data.index_face)) { 
              case 0:
                wx.navigateTo({
                  url: '/pages/calcOne/calcOne?process=' + that.data.array_process[that.data.index_process] + '&plan=' + that.data.array_plan[that.data.index_plan] + '&face=' + that.data.array_face[that.data.index_face]
                })
                break;
              case 1:
                wx.navigateTo({
                  url: '/pages/calcTwo/calcTwo?process=' + that.data.array_process[that.data.index_process] + '&plan=' + that.data.array_plan[that.data.index_plan] + '&face=' + that.data.array_face[that.data.index_face]
                })
                break;
            }
            break;
        }
        break;
      case 2:
        switch (parseInt(that.data.index_plan)) { 
          case 0:
            switch (parseInt(that.data.index_face)) { 
              case 0:
                wx.navigateTo({
                  url: '/pages/calcOne/calcOne?process=' + that.data.array_process[that.data.index_process] + '&plan=' + that.data.array_plan[that.data.index_plan] + '&face=' + that.data.array_face[that.data.index_face]
                })
                break;
              case 1:
                wx.navigateTo({
                  url: '/pages/calcOne/calcOne?process=' + that.data.array_process[that.data.index_process] + '&plan=' + that.data.array_plan[that.data.index_plan] + '&face=' + that.data.array_face[that.data.index_face]
                })
                break;
            }
            break;
          case 1:
            switch (parseInt(that.data.index_face)) { 
              case 0:
                wx.navigateTo({
                  url: '/pages/calcOne/calcOne?process=' + that.data.array_process[that.data.index_process] + '&plan=' + that.data.array_plan[that.data.index_plan] + '&face=' + that.data.array_face[that.data.index_face]
                })
                break;
              case 1:
                wx.navigateTo({
                  url: '/pages/calcThree/calcThree?process=' + that.data.array_process[that.data.index_process] + '&plan=' + that.data.array_plan[that.data.index_plan] + '&face=' + that.data.array_face[that.data.index_face]
                })
                break;
            }
            break;
        }
        break; 
      case 3:
        switch (parseInt(that.data.index_plan)) { 
          case 0:
            switch (parseInt(that.data.index_face)) { 
              case 0:
                wx.navigateTo({
                  url: '/pages/calcThree/calcThree?process=' + that.data.array_process[that.data.index_process] + '&plan=' + that.data.array_plan[that.data.index_plan] + '&face=' + that.data.array_face[that.data.index_face]
                })
                break;
            }
            break;
        }
        break; 
    }
  },
})