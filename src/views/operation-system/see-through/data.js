const tabData = [
  {
    label: '客户基本属性标签',
    children: [
      {
        label: '建档时间',
        labelValue: '建档时间',
        type: '日期',
        unit: '',
        value: '',
        valueOptions: [],
        valueDefault: ''
      },
      {
        label: '客户名称',
        labelValue: '客户名称',
        type: '文本',
        unit: '',
        value: '',
        valueOptions: [],
        valueDefault: ''
      },
      {
        label: '客户ID',
        labelValue: '客户ID',
        type: '文本',
        unit: '',
        value: '',
        valueOptions: [],
        valueDefault: ''
      },
      {
        label: '所属区域',
        labelValue: '所属区域',
        type: '多选',
        unit: '',
        value: '',
        valueOptions: [
          {
            label: '闽汕区',
            value: '闽汕区'
          },
          {
            label: '东北区',
            value: '东北区'
          },
          {
            label: '南广东区',
            value: '南广东区'
          },
          {
            label: '上海区',
            value: '上海区'
          },
          {
            label: '浙江区',
            value: '浙江区'
          },
          {
            label: '苏皖区',
            value: '苏皖区'
          },
          {
            label: '西部区',
            value: '西部区'
          },
          {
            label: '北广东区',
            value: '北广东区'
          },
          {
            label: '京津石区',
            value: '京津石区'
          },
          {
            label: '山东区',
            value: '山东区'
          },
          {
            label: '华中区',
            value: '华中区'
          },
          {
            label: '总部销售区',
            value: '总部销售区'
          },
          {
            label: '深圳区',
            value: '深圳区'
          }
        ],
        valueDefault: ''
      },
      {
        label: '所属分司',
        labelValue: '所属分司',
        type: '多选',
        unit: '',
        value: '',
        valueOptions: [
          {
            label: '大连分公司'
          },
          {
            label: '哈尔滨分公司'
          },
          {
            label: '锦州分公司'
          },
          {
            label: '沈阳分公司'
          },
          {
            label: '长春分公司'
          },
          {
            label: '哈尔滨第二分公司'
          }
        ],
        valueDefault: ''
      },
      {
        label: '成立日期',
        labelValue: '成立日期',
        type: '日期',
        unit: '',
        value: '',
        valueOptions: [],
        valueDefault: ''
      },
      {
        label: '所在行业',
        labelValue: '所在行业',
        type: '多选',
        unit: '',
        value: '',
        valueOptions: [
          {
            label: '科学研究和技术服务业'
          }
        ],
        valueDefault: ''
      },
      {
        label: '所属行业',
        labelValue: '所属行业',
        type: '级联',
        unit: '',
        value: '',
        valueOptions: [
          {
            label: '批发和零售业',
            children: [
              {
                label: '零售业'
              },
              {
                label: '批发业'
              }
            ]
          }
        ],
        valueDefault: ''
      },
      {
        label: '注册资金',
        labelValue: '注册资金',
        type: '数值',
        unit: '万',
        value: '',
        valueOptions: [],
        valueDefault: ''
      },
      {
        label: '注册地址',
        labelValue: '注册地址',
        type: '级联',
        unit: '',
        value: '',
        valueOptions: [],
        valueDefault: ''
      },
      {
        label: '是否含进出口',
        labelValue: '是否含进出口',
        type: '布尔',
        unit: '',
        value: '',
        valueOptions: [
          {
            label: '有'
          },
          {
            label: '无'
          }
        ],
        valueDefault: ''
      },
      {
        label: '渠道来源',
        labelValue: '渠道来源',
        type: '多选',
        unit: '',
        value: '',
        valueOptions: [
          {
            label: '阿里云心选'
          },
          {
            label: '高呈'
          },
          {
            label: '京东云'
          },
          {
            label: '猪八戒'
          },
          {
            label: '新网商城'
          },
          {
            label: '新网代理'
          },
          {
            label: '腾讯云中企店铺'
          },
          {
            label: '新网会员'
          }
        ],
        valueDefault: ''
      },
      {
        label: '是否有商标',
        labelValue: '是否有商标',
        type: '布尔',
        unit: '',
        value: '',
        valueOptions: [
          {
            label: '有'
          },
          {
            label: '无'
          }
        ],
        valueDefault: ''
      },
      {
        label: '是否有专利',
        labelValue: '是否有专利',
        type: '布尔',
        unit: '',
        value: '',
        valueOptions: [
          {
            label: '有'
          },
          {
            label: '无'
          }
        ],
        valueDefault: ''
      },
      {
        label: '营业执照是否有变更',
        labelValue: '营业执照是否有变更',
        type: '布尔',
        unit: '',
        value: '',
        valueOptions: [
          {
            label: '有'
          },
          {
            label: '无'
          }
        ],
        valueDefault: ''
      },
      {
        label: '是否有百度竞价推广（SEM）',
        labelValue: '是否有百度竞价推广（SEM）',
        type: '布尔',
        unit: '',
        value: '',
        valueOptions: [
          {
            label: '有'
          },
          {
            label: '无'
          }
        ],
        valueDefault: ''
      },
      {
        label: '是否有公众号',
        labelValue: '是否有公众号',
        type: '布尔',
        unit: '',
        value: '',
        valueOptions: [
          {
            label: '有'
          },
          {
            label: '无'
          }
        ],
        valueDefault: ''
      }
    ]
  }, {
    label: '客户消费类标签',
    children: [
      {
        label: '是否有短信产品',
        labelValue: '是否有短信产品',
        type: '布尔',
        unit: '',
        value: '',
        valueOptions: [
          {
            label: '有'
          },
          {
            label: '无'
          }
        ],
        valueDefault: ''
      },
      {
        label: '客户是否有订购支付产品',
        labelValue: '客户是否有订购支付产品',
        type: '布尔',
        unit: '',
        value: '',
        valueOptions: [
          {
            label: '有'
          },
          {
            label: '无'
          }
        ],
        valueDefault: ''
      },
      {
        label: '客户支付成功金额（元）',
        labelValue: '客户支付成功金额（元）',
        type: '数值',
        unit: '',
        value: '',
        valueOptions: [],
        valueDefault: ''
      }
    ]
  }, {
    label: '客户行为标签',
    children: [
      {
        label: '门户后台登录次数',
        labelValue: '门户后台登录次数',
        type: '数值',
        unit: '',
        value: '',
        valueOptions: [],
        valueDefault: ''
      },
      {
        label: '门户后台最近一次登录时间',
        labelValue: '门户后台最近一次登录时间',
        type: '日期',
        unit: '',
        value: '',
        valueOptions: [],
        valueDefault: ''
      },
      {
        label: '速成建站首页登录用户数',
        labelValue: '速成建站首页登录用户数',
        type: '数值',
        unit: '',
        value: '',
        valueOptions: [],
        valueDefault: ''
      },
      {
        label: '全网网站概况登用户数',
        labelValue: '全网网站概况登用户数',
        type: '数值',
        unit: '',
        value: '',
        valueOptions: [],
        valueDefault: ''
      },
      {
        label: '外贸-全球站点登用户数',
        labelValue: '外贸-全球站点登用户数',
        type: '数值',
        unit: '',
        value: '',
        valueOptions: [],
        valueDefault: ''
      },
      {
        label: '全球-全球站点登用户数',
        labelValue: '全球-全球站点登用户数',
        type: '数值',
        unit: '',
        value: '',
        valueOptions: [],
        valueDefault: ''
      },
      {
        label: '产品管理点击次数',
        labelValue: '产品管理点击次数',
        type: '数值',
        unit: '',
        value: '',
        valueOptions: [],
        valueDefault: ''
      },
      {
        label: '资讯管理点击次数',
        labelValue: '资讯管理点击次数',
        type: '数值',
        unit: '',
        value: '',
        valueOptions: [],
        valueDefault: ''
      },
      {
        label: '资源管理点击次数',
        labelValue: '资源管理点击次数',
        type: '数值',
        unit: '',
        value: '',
        valueOptions: [],
        valueDefault: ''
      },
      {
        label: '线索处理点击次数',
        labelValue: '线索处理点击次数',
        type: '数值',
        unit: '',
        value: '',
        valueOptions: [],
        valueDefault: ''
      },
      {
        label: '操作SEO设置点击次数',
        labelValue: '操作SEO设置点击次数',
        type: '数值',
        unit: '',
        value: '',
        valueOptions: [],
        valueDefault: ''
      },
      {
        label: '访问统计点击次数',
        labelValue: '访问统计点击次数',
        type: '数值',
        unit: '',
        value: '',
        valueOptions: [],
        valueDefault: ''
      },
      {
        label: '客户商城访问统计的数量',
        labelValue: '客户商城访问统计的数量',
        type: '数值',
        unit: '',
        value: '',
        valueOptions: [],
        valueDefault: ''
      },
      {
        label: '常规业务受理的数量',
        labelValue: '常规业务受理的数量',
        type: '数值',
        unit: '',
        value: '',
        valueOptions: [],
        valueDefault: ''
      },
      {
        label: '客户售后咨询的数量',
        labelValue: '客户售后咨询的数量',
        type: '数值',
        unit: '',
        value: '',
        valueOptions: [],
        valueDefault: ''
      },
      {
        label: '客诉的数量',
        labelValue: '客诉的数量',
        type: '数值',
        unit: '',
        value: '',
        valueOptions: [],
        valueDefault: ''
      },
      {
        label: '网站制作类的数量',
        labelValue: '网站制作类的数量',
        type: '数值',
        unit: '',
        value: '',
        valueOptions: [],
        valueDefault: ''
      },
      {
        label: '平台生产异常的数量',
        labelValue: '平台生产异常的数量',
        type: '数值',
        unit: '',
        value: '',
        valueOptions: [],
        valueDefault: ''
      },
      {
        label: '是否提交事件单',
        labelValue: '是否提交事件单',
        type: '布尔',
        unit: '',
        value: '',
        valueOptions: [
          {
            label: '有'
          },
          {
            label: '无'
          }
        ],
        valueDefault: ''
      }
    ]
  }, {
    label: '产品服务标签',
    children: [
      {
        label: '网站状态',
        labelValue: '网站状态',
        type: '多选',
        value: '',
        valueOptions: [
          {
            label: '新开'
          },
          {
            label: '生产中'
          },
          {
            label: '制作中'
          },
          {
            label: '已发布'
          },
          {
            label: '待上线'
          },
          {
            label: '待计费'
          },
          {
            label: '运营中'
          },
          {
            label: '已升级'
          },
          {
            label: '暂停'
          },
          {
            label: '关停'
          },
          {
            label: '90天到期'
          },
          {
            label: '到期'
          }
        ],
        valueDefault: ''
      },
      {
        label: '产品开通时间',
        labelValue: '产品开通时间',
        type: '日期',
        value: '',
        valueOptions: [],
        valueDefault: ''
      },
      {
        label: '产品到期时间',
        labelValue: '产品到期时间',
        type: '日期',
        value: '',
        valueOptions: [],
        valueDefault: ''
      },
      {
        label: '产品服务是否过期',
        labelValue: '产品服务是否过期',
        type: '',
        value: '',
        valueOptions: [
          {
            label: '有'
          },
          {
            label: '无'
          }
        ],
        valueDefault: ''
      },
      {
        label: 'SEO推广状态',
        labelValue: 'SEO推广状态',
        type: '多选',
        value: '',
        valueOptions: [
          {
            label: '计费中（有消耗）'
          },
          {
            label: '已开始(运营中）'
          }
        ],
        valueDefault: ''
      }
    ]
  }, {
    label: '产品基本属性标签',
    children: [
      {
        label: '产品分类',
        labelValue: '产品分类',
        type: '多选',
        value: '',
        valueOptions: [
          {
            label: '中企所有SKU的产品分类'
          }
        ],
        valueDefault: ''
      },
      {
        label: '产品名称',
        labelValue: '产品名称',
        type: '多选',
        value: '',
        valueOptions: [
          {
            label: '中企所有SKU的产品分类'
          }
        ],
        valueDefault: ''
      },
      {
        label: '是否有优惠政策',
        labelValue: '是否有优惠政策',
        type: '布尔',
        value: '',
        valueOptions: [
          {
            label: '有'
          },
          {
            label: '无'
          }
        ],
        valueDefault: ''
      }
    ]
  }, {
    label: '产品服务效果标签',
    children: [
      {
        label: '企业全称是否在百度首页有排名',
        labelValue: '企业全称是否在百度首页有排名',
        type: '布尔',
        value: '',
        valueOptions: [
          {
            label: '有'
          },
          {
            label: '无'
          }
        ],
        valueDefault: ''
      },
      {
        label: '客户网站的UV',
        labelValue: '客户网站的UV',
        type: '数值',
        unit: '人',
        value: '',
        valueOptions: [],
        valueDefault: ''
      },
      {
        label: '客户网站平均访问深度',
        labelValue: '客户网站平均访问深度',
        type: '数值',
        unit: '',
        value: '',
        valueOptions: [],
        valueDefault: ''
      },
      {
        label: '客户网站的线索数量',
        labelValue: '客户网站的线索数量',
        type: '数值',
        unit: '人',
        value: '',
        valueOptions: [],
        valueDefault: ''
      },
      {
        label: '客户网站的产品数量',
        labelValue: '客户网站的产品数量',
        type: '数值',
        unit: '个',
        value: '',
        valueOptions: [],
        valueDefault: ''
      },
      {
        label: '客户网站的页面数量',
        labelValue: '客户网站的页面数量',
        type: '数值',
        unit: '个',
        value: '',
        valueOptions: [],
        valueDefault: ''
      },
      {
        label: '客户推广已消耗金额',
        labelValue: '客户推广已消耗金额',
        type: '金钱',
        unit: '元',
        value: '',
        valueOptions: [],
        valueDefault: ''
      },
      {
        label: '客户推广账户余额',
        labelValue: '客户推广账户余额',
        type: '金钱',
        unit: '元',
        value: '',
        valueOptions: [],
        valueDefault: ''
      },
      {
        label: '客户推广在百度的达标天数',
        labelValue: '客户推广在百度的达标天数',
        type: '数值',
        unit: '天',
        value: '',
        valueOptions: [],
        valueDefault: ''
      },
      {
        label: '官网SEO出现效果的关键词数量',
        labelValue: '官网SEO出现效果的关键词数量',
        type: '数值',
        unit: '个',
        value: '',
        valueOptions: [],
        valueDefault: ''
      },
      {
        label: '客户商城的订单量',
        labelValue: '客户商城的订单量',
        type: '数值',
        unit: '笔',
        value: '',
        valueOptions: [],
        valueDefault: ''
      },
      {
        label: '客户商城的成交订单总额',
        labelValue: '客户商城的成交订单总额',
        type: '金钱',
        unit: '元',
        value: '',
        valueOptions: [],
        valueDefault: ''
      },
      {
        label: '网站打开速度',
        labelValue: '网站打开速度',
        type: '数值',
        unit: 's',
        value: '',
        valueOptions: [],
        valueDefault: ''
      },
      {
        label: '网站是否备案',
        labelValue: '网站是否备案',
        type: '布尔',
        value: '',
        valueOptions: [
          {
            label: '有'
          },
          {
            label: '无'
          }
        ],
        valueDefault: ''
      },
      {
        label: '网站访问统计数量',
        labelValue: '网站访问统计数量',
        type: '数值',
        unit: '',
        value: '',
        valueOptions: [],
        valueDefault: ''
      },
      {
        label: '客户的网站询盘统计数',
        labelValue: '客户的网站询盘统计数',
        type: '数值',
        unit: '',
        value: '',
        valueOptions: [],
        valueDefault: ''
      },
      {
        label: '客户网站流量来源（细分）',
        labelValue: '客户网站流量来源（细分）',
        type: '多选',
        value: '',
        valueOptions: [],
        valueDefault: ''
      },
      {
        label: '客户网站流量来源的UV数',
        labelValue: '客户网站流量来源的UV数',
        type: '数值',
        unit: '',
        value: '',
        valueOptions: [],
        valueDefault: ''
      },
      {
        label: '客户网站在百度的收录页面数',
        labelValue: '客户网站在百度的收录页面数',
        type: '数值',
        unit: '页',
        value: '',
        valueOptions: [],
        valueDefault: ''
      },
      {
        label: '客户网站设置的中文关键词是否有百度排名',
        labelValue: '客户网站设置的中文关键词是否有百度排名',
        type: '布尔',
        value: '',
        valueOptions: [
          {
            label: '有'
          },
          {
            label: '无'
          }
        ],
        valueDefault: ''
      },
      {
        label: '客户网站设置的英文关键词是否有谷歌排名',
        labelValue: '客户网站设置的英文关键词是否有谷歌排名',
        type: '布尔',
        value: '',
        valueOptions: [
          {
            label: '有'
          },
          {
            label: '无'
          }
        ],
        valueDefault: ''
      }
    ]
  }
]

export { tabData }
