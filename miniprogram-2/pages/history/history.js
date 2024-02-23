wx.cloud.init({
  env: 'nzc-0g8pvq7v7737e6a0',
  traceUser: true,
})
var db=wx.cloud.database();
function formatArray(array) {
  var temp = [];
  var index = 0;
  for (var i = 0; i < array.length; i++){
    for (var j = i + 1; j < array.length; j++){
      if (array[i] == array[j] || array[i] == null) {
        break;
      }
      if (j >= array.length - 1) {
        temp[index] = array[i];
        index ++ ;
      }
    }
    if (array[array.length - 1] != null) {
      temp[index] = array[array.length - 1];
    }
  }
  return temp;
}
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
    array_keyValue: ['无'],
    index_keyValue: 0,
    array_process: ['工序一','工序二','工序八','工序十'],
    index_process: 0,
    configList: [],
    errorList: []
  },
  onLoad: async function() {
    var that = this;
  },
  onShow: async function() {
    var that = this;
    that.data.array_keyValue = []; // 清空旧表
    var count = await db.collection('SELECTION').where({
    }).count();
    var count = count.total;
    for (let s = 0; s < count / 20; s++) {
      db.collection('SELECTION').where({
      }).orderBy('keyValue', 'desc').skip(s * 20).get({
        success: function(res) {
          if (res.data.length > 0) {
            let y = s * 20;
            for (let i = 0; i < res.data.length; i++, y++) {
              that.data.array_keyValue[y] = res.data[i].keyValue;
              if (i + 1 >= res.data.length) {
                that.setData({
                  array_keyValue: formatArray(that.data.array_keyValue)
                });
                if (s + 1 >= count / 20) {
                  that.setData({
                    array_keyValue: formatArray(that.data.array_keyValue)
                  });
                }
              }
            }
          }
        },
      }) 
    }
    if (count == 0) {
      that.setData({
        array_keyValue: ['无']
      });
    }
  },
  pickerChangeID: function(e) {
    var that = this;
    that.setData({
      index_keyValue: e.detail.value,
      array_keyValue: formatArray(that.data.array_keyValue)
    });
  },
  pickerChangeProcess: function(e) {
    var that = this;
    that.setData({
      index_process: e.detail.value
    });
  },
  selectHistory: async function(e) {
    var that = this;
    that.data.configList = []; // 清空旧表
    var count1 = await db.collection('SELECTION').where({
      keyValue: that.data.array_keyValue[that.data.index_keyValue],
      process: that.data.array_process[that.data.index_process],
    }).count();
    var count1 = count1.total;
    for (let s = 0; s < count1 / 20; s++) {
      db.collection('SELECTION').where({
        keyValue: that.data.array_keyValue[that.data.index_keyValue],
        process: that.data.array_process[that.data.index_process],
      }).skip(s * 20).get({
        success: function(res) {
          if (res.data.length > 0) {
            let y = s * 20;
            for (let i = 0; i < res.data.length; i++, y++) {
              that.data.configList[y] = res.data[i];
              if (i + 1 >= res.data.length) {
                that.setData({
                  configList: that.data.configList
                })
              }
            }
          }
        }
      }) 
    }
    if (count1 == 0) {
      that.setData({
        configList: []
      });
    }
    that.data.errorList = []; // 清空旧表
    var count2 = await db.collection('CALC').where({
      keyValue: that.data.array_keyValue[that.data.index_keyValue],
      process: that.data.array_process[that.data.index_process]
    }).count();
    var count2 = count2.total;
    for (let s = 0; s < count2 / 20; s++) {
      db.collection('CALC').where({
        keyValue: that.data.array_keyValue[that.data.index_keyValue],
        process: that.data.array_process[that.data.index_process]
      }).skip(s * 20).get({
        success: function(res) {
          if (res.data.length > 0) {
            let y = s * 20;
            for (let i = 0; i < res.data.length; i++, y++) {
              that.data.errorList[y] = res.data[i];
              if (i + 1 >= res.data.length) {
                that.setData({
                  errorList: that.data.errorList
                })
              }
            }
          }
        }
      }) 
    }
    if (count2 == 0) {
      that.setData({
        errorList: []
      });
    }
    toast('查询成功');
  }
})