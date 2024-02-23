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
      process: '',
      processList: [],
      array_plan: [],
      array_plan_1: ['三二一定位方案','V形块定位方案'], 
      array_plan_2: ['三二一定位方案','V形块定位方案'], 
      array_plan_3: ['三二一定位方案','一面一销定位方案'], 
      array_plan_4: ['一面一销一钉定位方案'], 
      index_plan: 0,
      array_face: [],
      array_face_1: ['A','B','C','D','E','F','G','加工面'], 
      array_face_2: ['A','B','C','D','E','F','加工面'], 
      array_face_3: ['A','B','C','D','E','F','G','H','I','加工面'], 
      array_face_4: ['A','B','C','D','E','F','G','H','I','加工面'], 
      index_face: 0,
      array_faceE: [],
      array_faceE_1: ['大底面'], 
      array_faceE_2: ['圆面','方形面'], 
      array_faceE_3: ['到大底面','圆心'], 
      array_faceE_4: ['圆心'], 
      index_faceE: 0,
      error_location: '未计算',
      error_process: '未计算'
  },
  onLoad(option) {
      var that = this;
      switch (parseInt(option.index_process)) { 
        case 1:
            that.setData({
              array_plan: that.data.array_plan_1,
              array_face: that.data.array_face_1,
              array_faceE: that.data.array_faceE_1,
              img_path_plan: '../pic/pro1_plan1.png',
              img_path_process: '../pic/process_1.png'
            });
            that.data.process = '工序一';
            break;
          case 2:
            that.setData({
              array_plan: that.data.array_plan_2,
              array_face: that.data.array_face_2,
              array_faceE: that.data.array_faceE_2,
              img_path_plan: '../pic/pro2_plan1.png',
              img_path_process: '../pic/process_2.png'
            });
            that.data.process = '工序二';
            break;
          case 3:
            that.setData({
              array_plan: that.data.array_plan_3,
              array_face: that.data.array_face_3,
              array_faceE: that.data.array_faceE_3,
              img_path_plan: '../pic/pro8_plan1.png',
              img_path_process: '../pic/process_8.png'
            });
            that.data.process = '工序八';
            break;
          case 4:
            that.setData({
              array_plan: that.data.array_plan_4,
              array_face: that.data.array_face_4,
              array_faceE: that.data.array_faceE_4,
              img_path_plan: '../pic/pro10_plan1.png',
              img_path_process: '../pic/process_10.png'
            });
            that.data.process = '工序十';
            break;
      }
      that.setData({
          process: that.data.process
      });
  },
  onShow() {
      
  },
  pickerChangePlan: function(e) {
    var that = this;
    that.setData({
      index_plan: e.detail.value
    });
    switch (that.data.process) { 
      case '工序一':
        switch (parseInt(e.detail.value)) {
          case 0:
            that.setData({
              img_path_plan: '../pic/pro1_plan1.png'
            });
            break;
          case 1:
            that.setData({
              img_path_plan: '../pic/pro1_plan2.png'
            });
            break;
        }
        break;
      case '工序二':
        switch (parseInt(e.detail.value)) {
          case 0:
            that.setData({
              img_path_plan: '../pic/pro2_plan1.png'
            });
            break;
          case 1:
            that.setData({
              img_path_plan: '../pic/pro2_plan2.png'
            });
            break;
        }
        break;
      case '工序八':
        switch (parseInt(e.detail.value)) {
          case 0:
            that.setData({
              img_path_plan: '../pic/pro8_plan1.png'
            });
            break;
          case 1:
            that.setData({
              img_path_plan: '../pic/pro8_plan2.png'
            });
            break;
        }
        break;
      case '工序十':
        switch (parseInt(e.detail.value)) {
          case 0:
            that.setData({
              img_path_plan: '../pic/pro10_plan1.png'
            });
            break;
        }
        break;
    }
  },
  pickerChangeFace: function(e) {
    var that = this;
    that.setData({
      index_face: e.detail.value
    });
  },
  selectProcess: async function(e) {
    var that = this;
    that.data.processList = []; // 清空旧表
    var count = await db.collection('SELECTION').where({
      keyValue: null,
      process: that.data.process,
      plan: that.data.array_plan[that.data.index_plan],
      face: that.data.array_face[that.data.index_face]
    }).count();
    var count = count.total;
    for (let s = 0; s < count / 20; s++) {
      db.collection('SELECTION').where({
        keyValue: null,
        process: that.data.process,
        plan: that.data.array_plan[that.data.index_plan],
        face: that.data.array_face[that.data.index_face]
      }).skip(s * 20).get({
        success: function(res) {
          if (res.data.length > 0) {
            let y = s * 20;
            for (let i = 0; i < res.data.length; i++, y++) {
              that.data.processList[y] = res.data[i];
              if (i + 1 >= res.data.length) {
                that.setData({
                  processList: that.data.processList
                })
              }
            }
          }
        }
      }) 
    }
    that.setData({
      processList: that.data.processList
    })
    toast("查询成功");
  },
  pickerChangeFaceE: function(e) {
    var that = this;
    that.setData({
      index_faceE: e.detail.value
    });
  },
  selectCalc: function(e) {
    var that = this;
    db.collection('CALC').where({
      keyValue: null,
      process: that.data.process,
      plan: that.data.array_plan[that.data.index_plan],
      face: that.data.array_faceE[that.data.index_faceE]
    }).get({
      success: function(res) {
        if (res.data.length) {
          that.setData({
            error_location: res.data[0].loc,
            error_process: res.data[0].pro
          })
          toast('查询成功');
        }
        else {
          toast('未查询到误差值');
        }
      }
    }) 
  }
})