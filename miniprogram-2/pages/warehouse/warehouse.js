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
    array_frock: ['','夹具零件（定位）','夹具零件（夹紧）','刀具','量具'], // 工装多项选择器选项
    index_frock: 0, // 工装多项选择器指针
    frockList: [], // 工装表
    frockListLength: 0, // 预清空表长
  },
  onLoad(option) {
    
  },
  async onShow() {
    var that = this;
    that.data.frockList = []; // 清空旧表
    var count = await db.collection('WAREHOUSE').where({
      frock: that.data.array_frock[that.data.index_frock]
    }).count();
    var count = count.total;
    for (let s = 0; s < count / 20; s++) {
      db.collection('WAREHOUSE').where({
        frock: that.data.array_frock[that.data.index_frock]
      }).skip(s * 20).get({
        success: function(res) {
          if (res.data.length > 0) {
            let y = s * 20;
            for (let i = 0; i < res.data.length; i++, y++) {
              that.data.frockList[y] = res.data[i];
              if (i + 1 >= res.data.length) {
                that.setData({
                  frockList: that.data.frockList
                })
              }
            }
          }
        }
      }) 
    }
    that.setData({
      frockList: that.data.frockList
    })
  },
  // 工装库页面中工装种类的多项选择器
  pickerChangeFrock: async function(e) {
    var that = this;
    that.setData({
        index_frock: e.detail.value
    })
    that.data.frockList = []; // 清空旧表
    var count = await db.collection('WAREHOUSE').where({
      frock: that.data.array_frock[that.data.index_frock]
    }).count();
    var count = count.total;
    for (let s = 0; s < count / 20; s++) {
      db.collection('WAREHOUSE').where({
        frock: that.data.array_frock[that.data.index_frock]
      }).skip(s * 20).get({
        success: function(res) {
          if (res.data.length > 0) {
            let y = s * 20;
            for (let i = 0; i < res.data.length; i++, y++) {
              that.data.frockList[y] = res.data[i];
              if (i + 1 >= res.data.length) {
                that.setData({
                  frockList: that.data.frockList
                })
              }
            }
          }
        }
      }) 
    }
    that.setData({
      frockList: that.data.frockList
    })
  },
  selectFrock: function() {
    var that = this;
    that.setData({
        frockList: that.data.frockList
    })
    toast("更新成功");
  },
  deleteFrock: function(e) {
    var that = this;
    wx.showModal({
      content: "确认删除该零件型号吗？", // 提示内容
      showCancel: true, // 是否显示取消按钮，默认true
      cancelText: "取消", // 取消按钮的文字，最多4个字符
      cancelColor: "#000000", // 取消按钮的文字颜色
      confirmText: "确认", // 确认按钮的文字，最多4个字符
      confirmColor: "#c42929", // 确认按钮的文字颜色
      success: function (res) {
        if (res.confirm) {
          wx.cloud.callFunction({
            name: 'delFrock', // 删除操作的云函数名称
            data: {
              part: e.currentTarget.dataset.part,
              model: e.currentTarget.dataset.model
            },
            success: async function(res) {
              that.data.frockList = []; // 清空旧表
              var count = await db.collection('WAREHOUSE').where({
                frock: that.data.array_frock[that.data.index_frock]
              }).count();
              var count = count.total;
              for (let s = 0; s < count / 20; s++) {
                db.collection('WAREHOUSE').where({
                  frock: that.data.array_frock[that.data.index_frock]
                }).skip(s * 20).get({
                  success: function(res) {
                    if (res.data.length > 0) {
                      let y = s * 20;
                      for (let i = 0; i < res.data.length; i++, y++) {
                        that.data.frockList[y] = res.data[i];
                        if (i + 1 >= res.data.length) {
                          that.setData({
                            frockList: that.data.frockList
                          })
                        }
                      }
                    }
                  }
                }) 
              }
              that.setData({
                frockList: that.data.frockList
              })
              toast("删除成功");
            },
            fail: function(res) {
              toast("删除失败");
            },
          })
        }
      }
    }) 
  },
  addFrock: function() {
    var that = this;
    if (that.data.index_frock == 0) {
      toast("请先选择零件种类");
    }
    else {
      wx.navigateTo({
        url: '/pages/add/add?index_frock=' + that.data.index_frock
      })
    }
  }
})
