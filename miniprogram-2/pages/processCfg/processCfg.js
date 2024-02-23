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
    process: '',
    frock: '',
    array_part_1: ['请选择','支承钉','支承板','可调支承','自位支承','辅助支承','定位销','圆锥销','定位心轴','V型块','定位套'],
    array_part_2: ['请选择','压板','偏心轮','快速夹紧机构','移动V型块','联动夹紧装置','气缸'],
    array_part_3: ['请选择','车刀','铣刀','刨刀','钻刀','磨刀','镗刀'],
    array_part_4: ['请选择','量具'],
    array_pic_1: ['','../pic/part_1_1.png','../pic/part_1_2.png','../pic/part_1_3.png','../pic/part_1_4.png','../pic/part_1_5.png','../pic/part_1_6.png','../pic/part_1_7.png','../pic/part_1_8.png','../pic/part_1_9.png','../pic/part_1_10.png'],
    array_pic_2: ['','../pic/part_2_1.png','../pic/part_2_2.png','','../pic/part_2_4.png','','../pic/part_2_6.png'],
    array_pic_3: ['','../pic/part_3_1.png','../pic/part_3_2.png','../pic/part_3_3.png','../pic/part_3_4.png','../pic/part_3_5.png','../pic/part_3_6.png'],
    index_part_1: 0,
    index_part_2: 0,
    index_part_3: 0,
    index_part_4: 0,
    array_model_1: ['无'], // 零件多项选择器待选表
    array_model_2: ['无'], // 零件多项选择器待选表
    array_model_3: ['无'], // 零件多项选择器待选表
    array_model_4: ['无'], // 零件多项选择器待选表
    index_model_1: 0, // 零件多项选择器待选表指针
    index_model_2: 0, // 零件多项选择器待选表指针
    index_model_3: 0, // 零件多项选择器待选表指针
    index_model_4: 0, // 零件多项选择器待选表指针
  },
  async onLoad(option) {
    var that = this;
    switch (parseInt(option.index_process)) { 
      case 1:
        that.setData({
          array_plan: that.data.array_plan_1,
          array_face: that.data.array_face_1,
          img_path_process: '../pic/process_1.png'
        });
        switch (that.data.index_plan) {
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
        that.data.process = '工序一';
        break;
      case 2:
        that.setData({
          array_plan: that.data.array_plan_2,
          array_face: that.data.array_face_2,
          img_path_process: '../pic/process_2.png'
        });
        switch (that.data.index_plan) {
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
        that.data.process = '工序二';
        break;
      case 3:
        that.setData({
          array_plan: that.data.array_plan_3,
          array_face: that.data.array_face_3,
          img_path_process: '../pic/process_8.png'
        });
        switch (that.data.index_plan) {
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
        that.data.process = '工序八';
        break;
      case 4:
        that.setData({
          array_plan: that.data.array_plan_4,
          array_face: that.data.array_face_4,
          img_path_process: '../pic/process_10.png'
        });
        switch (that.data.index_plan) {
          case 0:
            that.setData({
              img_path_plan: '../pic/pro10_plan1.png'
            });
            break;
        }
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
  pickerChangePart_1: async function(e) {
    var that = this;
    that.setData({
      index_part_1: e.detail.value
    });
    that.data.array_model_1 = []; // 清空旧表
    var count = await db.collection('WAREHOUSE').where({
      frock: '夹具零件（定位）',
      part: that.data.array_part_1[that.data.index_part_1]
    }).count();
    var count = count.total;
    for (let s = 0; s < count / 20; s++) {
      db.collection('WAREHOUSE').where({
        frock: '夹具零件（定位）',
        part: that.data.array_part_1[that.data.index_part_1]
      }).skip(s * 20).get({
        success: function(res) {
          if (res.data.length > 0) {
            let y = s * 20;
            for (let i = 0; i < res.data.length; i++, y++) {
              that.data.array_model_1[y] = res.data[i].model;
              if (i + 1 >= res.data.length) {
                that.setData({
                  array_model_1: that.data.array_model_1
                });
                switch (that.data.array_model_1[0]) { 
                  case '支撑钉1':
                    that.setData({
                      img_path_model_1: '../pic/zhichengding1.png'
                    });
                    break;
                  case '支撑钉2':
                    that.setData({
                      img_path_model_1: '../pic/zhichengding2.png'
                    });
                    break;
                  default :
                    that.setData({
                      img_path_model_1: ''
                    });
                    break;
                }
              }
            }
          }
        }
      }) 
    }
    if (count == 0) {
      that.setData({
        array_model_1: ['无']
      });
    }
    that.setData({
      img_path_part_1: that.data.array_pic_1[e.detail.value]
    });
  },
  pickerChangeModel_1: async function(e) {
    var that = this;
    that.setData({
        index_model_1: e.detail.value
    });
    switch (that.data.array_model_1[e.detail.value]) { 
      case '支撑钉1':
        that.setData({
          img_path_model_1: '../pic/zhichengding1.png'
        });
        break;
      case '支撑钉2':
        that.setData({
          img_path_model_1: '../pic/zhichengding2.png'
        });
        break;
      default :
        that.setData({
          img_path_model_1: ''
        });
        break;
    }
  },
  pickerChangePart_2: async function(e) {
    var that = this;
    that.setData({
        index_part_2: e.detail.value
    });
    that.data.array_model_2 = []; // 清空旧表
    var count = await db.collection('WAREHOUSE').where({
      frock: '夹具零件（夹紧）',
      part: that.data.array_part_2[that.data.index_part_2]
    }).count();
    var count = count.total;
    for (let s = 0; s < count / 20; s++) {
      db.collection('WAREHOUSE').where({
        frock: '夹具零件（夹紧）',
        part: that.data.array_part_2[that.data.index_part_2]
      }).skip(s * 20).get({
        success: function(res) {
          if (res.data.length > 0) {
            let y = s * 20;
            for (let i = 0; i < res.data.length; i++, y++) {
              that.data.array_model_2[y] = res.data[i].model;
              if (i + 1 >= res.data.length) {
                that.setData({
                  array_model_2: that.data.array_model_2
                });
                switch (that.data.array_model_2[0]) { 
                  case '压板一':
                    that.setData({
                      img_path_model_2: '../pic/yaban1.png'
                    });
                    break;
                  default :
                    that.setData({
                      img_path_model_2: ''
                    });
                    break;
                }
              }
            }
          }
        },
      }) 
    }
    if (count == 0) {
      that.setData({
        array_model_2: ['无']
      });
    }
    that.setData({
      img_path_part_2: that.data.array_pic_2[e.detail.value]
    });
  },
  pickerChangeModel_2: async function(e) {
    var that = this;
    that.setData({
      index_model_2: e.detail.value
    });
    switch (that.data.array_model_2[e.detail.value]) { 
      case '压板一':
        that.setData({
          img_path_model_2: '../pic/yaban1.png'
        });
        break;
      default :
        that.setData({
          img_path_model_2: ''
        });
        break;
    }
  },
  pickerChangePart_3: async function(e) {
    var that = this;
    that.setData({
        index_part_3: e.detail.value
    });
    that.data.array_model_3 = []; // 清空旧表
    var count = await db.collection('WAREHOUSE').where({
      frock: '刀具',
      part: that.data.array_part_3[that.data.index_part_3]
    }).count();
    var count = count.total;
    for (let s = 0; s < count / 20; s++) {
      db.collection('WAREHOUSE').where({
        frock: '刀具',
        part: that.data.array_part_3[that.data.index_part_3]
      }).skip(s * 20).get({
        success: function(res) {
          if (res.data.length > 0) {
            let y = s * 20;
            for (let i = 0; i < res.data.length; i++, y++) {
              that.data.array_model_3[y] = res.data[i].model;
              if (i + 1 >= res.data.length) {
                that.setData({
                  array_model_3: that.data.array_model_3
                });
                switch (that.data.array_model_3[0]) { 
                  case '铣刀1':
                    that.setData({
                      img_path_model_3: '../pic/xidao1.png'
                    });
                    break;
                  case '铣刀2':
                    that.setData({
                      img_path_model_3: '../pic/xidao2.png'
                    });
                    break;
                  case '铣刀3':
                    that.setData({
                      img_path_model_3: '../pic/xidao3.png'
                    });
                    break;
                  case '钻刀1':
                    that.setData({
                      img_path_model_3: '../pic/zuandao1.png'
                    });
                    break;
                  case '扩孔钻':
                    that.setData({
                      img_path_model_3: '../pic/kuokongzuan.png'
                    });
                    break;
                  case '铰刀1':
                    that.setData({
                      img_path_model_3: '../pic/jiaodao1.png'
                    });
                    break;
                  case '铰刀2':
                    that.setData({
                      img_path_model_3: '../pic/jiaodao2.png'
                    });
                    break;
                  case '镗刀1':
                    that.setData({
                      img_path_model_3: '../pic/tangdao1.png'
                    });
                    break;
                  default :
                    that.setData({
                      img_path_model_3: ''
                    });
                    break;
                }
              }
            }
          }
        },
      }) 
    }
    if (count == 0) {
      that.setData({
        array_model_3: ['无']
      });
    }
    that.setData({
      img_path_part_3: that.data.array_pic_3[e.detail.value]
    });
  },
  pickerChangeModel_3: async function(e) {
    var that = this;
    that.setData({
      index_model_3: e.detail.value
    });
    switch (that.data.array_model_3[e.detail.value]) { 
      case '铣刀1':
        that.setData({
          img_path_model_3: '../pic/xidao1.png'
        });
        break;
      case '铣刀2':
        that.setData({
          img_path_model_3: '../pic/xidao2.png'
        });
        break;
      case '铣刀3':
        that.setData({
          img_path_model_3: '../pic/xidao3.png'
        });
        break;
      case '钻刀1':
        that.setData({
          img_path_model_3: '../pic/zuandao1.png'
        });
        break;
      case '扩孔钻':
        that.setData({
          img_path_model_3: '../pic/kuokongzuan.png'
        });
        break;
      case '铰刀1':
        that.setData({
          img_path_model_3: '../pic/jiaodao1.png'
        });
        break;
      case '铰刀2':
        that.setData({
          img_path_model_3: '../pic/jiaodao2.png'
        });
        break;
      case '镗刀1':
        that.setData({
          img_path_model_3: '../pic/tangdao1.png'
        });
        break;
      default :
        that.setData({
          img_path_model_3: ''
        });
        break;
    }
  },
  pickerChangePart_4: async function(e) {
    var that = this;
    that.setData({
        index_part_4: e.detail.value
    });
    that.data.array_model_4 = []; // 清空旧表
    var count = await db.collection('WAREHOUSE').where({
      frock: '量具',
      part: that.data.array_part_4[that.data.index_part_4]
    }).count();
    var count = count.total;
    for (let s = 0; s < count / 20; s++) {
      db.collection('WAREHOUSE').where({
        frock: '量具',
        part: that.data.array_part_4[that.data.index_part_4]
      }).skip(s * 20).get({
        success: function(res) {
          if (res.data.length > 0) {
            let y = s * 20;
            for (let i = 0; i < res.data.length; i++, y++) {
              that.data.array_model_4[y] = res.data[i].model;
              if (i + 1 >= res.data.length) {
                that.setData({
                  array_model_4: that.data.array_model_4
                });
                switch (that.data.array_model_4[0]) { 
                  case '游标卡尺':
                    that.setData({
                      img_path_model_4: '../pic/youbiaokachi.png'
                    });
                    break;
                  case '量规':
                    that.setData({
                      img_path_model_4: '../pic/lianggui.png'
                    });
                    break;
                  case '塞尺':
                    that.setData({
                      img_path_model_4: '../pic/saichi.png'
                    });
                    break;
                  default :
                    that.setData({
                      img_path_model_4: ''
                    });
                    break;
                }
              }
            }
          }
        },
      }) 
    }
    if (count == 0) {
      that.setData({
        array_model_4: ['无']
      });
    }
  },
  pickerChangeModel_4: async function(e) {
    var that = this;
    that.setData({
      index_model_4: e.detail.value
    });
    switch (that.data.array_model_4[e.detail.value]) { 
      case '游标卡尺':
        that.setData({
          img_path_model_4: '../pic/youbiaokachi.png'
        });
        break;
      case '量规':
        that.setData({
          img_path_model_4: '../pic/lianggui.png'
        });
        break;
      case '塞尺':
        that.setData({
          img_path_model_4: '../pic/saichi.png'
        });
        break;
      default :
        that.setData({
          img_path_model_4: ''
        });
        break;
    }
  },
  addFrock: function(e) {
    var that = this;
    that.data.partModel = e.detail.value;
  },
  addFrock: async function(e) {
    var that = this;
    var flag = false; // 新零件信息是否完整
    switch (parseInt(e.currentTarget.dataset.frock)) { 
      case 1:
        that.data.frock = '夹具零件（定位）';
        if (that.data.array_part_1[that.data.index_part_1] != '请选择') {
          if (that.data.array_model_1[that.data.index_model_1] != '无' && that.data.array_model_1[that.data.index_model_1] != null) {
            flag = true;
          }
          else {
            toast("无当前零件型号");
          }
        }
        else {
          toast("未选择零件");
        }
        if (flag == true) {
          var count = await db.collection('SELECTION').where({
            keyValue: null,
            process: that.data.process,
            plan: that.data.array_plan[that.data.index_plan],
            face: that.data.array_face[that.data.index_face],
            frock: that.data.frock,
            part: that.data.array_part_1[that.data.index_part_1],
            model: that.data.array_model_1[that.data.index_model_1]
          }).count();
          var count = count.total;
          if (count > 0) {
            toast("请勿重复添加");
          }
          else {
            db.collection('SELECTION').add({
              data: {
                keyValue: null,
                process: that.data.process,
                plan: that.data.array_plan[that.data.index_plan],
                face: that.data.array_face[that.data.index_face],
                frock: that.data.frock,
                part: that.data.array_part_1[that.data.index_part_1],
                model: that.data.array_model_1[that.data.index_model_1]
              },
              success: function(res) {
                toast("添加成功");
              }
            })
          }
        }
        break;
      case 2:
        that.data.frock = '夹具零件（夹紧）';
        if (that.data.array_part_2[that.data.index_part_2] != '请选择') {
          if (that.data.array_model_2[that.data.index_model_2] != '无' && that.data.array_model_2[that.data.index_model_2] != null) {
            flag = true;
          }
          else {
            toast("无当前零件型号");
          }
        }
        else {
          toast("未选择零件");
        }
        if (flag == true) {
          var count = await db.collection('SELECTION').where({
            keyValue: null,
            process: that.data.process,
            plan: that.data.array_plan[that.data.index_plan],
            face: that.data.array_face[that.data.index_face],
            frock: that.data.frock,
            part: that.data.array_part_2[that.data.index_part_2],
            model: that.data.array_model_2[that.data.index_model_2]
          }).count();
          var count = count.total;
          if (count > 0) {
            toast("请勿重复添加");
          }
          else {
            db.collection('SELECTION').add({
              data: {
                keyValue: null,
                process: that.data.process,
                plan: that.data.array_plan[that.data.index_plan],
                face: that.data.array_face[that.data.index_face],
                frock: that.data.frock,
                part: that.data.array_part_2[that.data.index_part_2],
                model: that.data.array_model_2[that.data.index_model_2]
              },
              success: function(res) {
                toast("添加成功");
              }
            })
          }
        }
        break;
      case 3:
        that.data.frock = '刀具';
        if (that.data.array_part_3[that.data.index_part_3] != '请选择') {
          if (that.data.array_model_3[that.data.index_model_3] != '无' && that.data.array_model_3[that.data.index_model_3] != null) {
            flag = true;
          }
          else {
            toast("无当前零件型号");
          }
        }
        else {
          toast("未选择零件");
        }
        if (flag == true) {
          var count = await db.collection('SELECTION').where({
            keyValue: null,
            process: that.data.process,
            plan: that.data.array_plan[that.data.index_plan],
            face: that.data.array_face[that.data.index_face],
            frock: that.data.frock,
            part: that.data.array_part_3[that.data.index_part_3],
            model: that.data.array_model_3[that.data.index_model_3]
          }).count();
          var count = count.total;
          if (count > 0) {
            toast("请勿重复添加");
          }
          else {
            db.collection('SELECTION').add({
              data: {
                keyValue: null,
                process: that.data.process,
                plan: that.data.array_plan[that.data.index_plan],
                face: that.data.array_face[that.data.index_face],
                frock: that.data.frock,
                part: that.data.array_part_3[that.data.index_part_3],
                model: that.data.array_model_3[that.data.index_model_3]
              },
              success: function(res) {
                toast("添加成功");
              }
            })
          }
        }
        break;
      case 4:
        that.data.frock = '量具';
        if (that.data.array_part_4[that.data.index_part_4] != '请选择') {
          if (that.data.array_model_4[that.data.index_model_4] != '无' && that.data.array_model_4[that.data.index_model_4] != null) {
            flag = true;
          }
          else {
            toast("无当前零件型号");
          }
        }
        else {
          toast("未选择零件");
        }
        if (flag == true) {
          var count = await db.collection('SELECTION').where({
            keyValue: null,
            process: that.data.process,
            plan: that.data.array_plan[that.data.index_plan],
            face: that.data.array_face[that.data.index_face],
            frock: that.data.frock,
            part: that.data.array_part_4[that.data.index_part_4],
            model: that.data.array_model_4[that.data.index_model_4]
          }).count();
          var count = count.total;
          if (count > 0) {
            toast("请勿重复添加");
          }
          else {
            db.collection('SELECTION').add({
              data: {
                keyValue: null,
                process: that.data.process,
                plan: that.data.array_plan[that.data.index_plan],
                face: that.data.array_face[that.data.index_face],
                frock: that.data.frock,
                part: that.data.array_part_4[that.data.index_part_4],
                model: that.data.array_model_4[that.data.index_model_4]
              },
              success: function(res) {
                toast("添加成功");
              }
            })
          }
        }
        break;
    }
  },
  resetProcess: function(e) {
    var that = this;
    wx.showModal({
      content: "确认重置当前工序？", // 提示内容
      showCancel: true, // 是否显示取消按钮，默认true
      cancelText: "取消", // 取消按钮的文字，最多4个字符
      cancelColor: "#000000", // 取消按钮的文字颜色
      confirmText: "确认", // 确认按钮的文字，最多4个字符
      confirmColor: "#c42929", // 确认按钮的文字颜色
      success: function (res) {
        if (res.confirm) {
          wx.cloud.callFunction({
            name: 'delPro', // 删除操作的云函数名称
            data: {
              process: that.data.process
            },
            success: async function(res) {
              toast("已重置");
            },
            fail: function(res) {
              toast("重置失败");
            },
          })
        }
      }
    })
  }
})