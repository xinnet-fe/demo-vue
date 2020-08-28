<template>
  <div class="notice-container">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="通知公告" name="first">
        <List :list="list" @showDetail="handleShow" />
      </el-tab-pane>
      <el-tab-pane label="精选活动" name="second">
        <List :list="list2" @showDetail="handleShow" />
      </el-tab-pane>
    </el-tabs>
    <el-drawer
      :title="title"
      size="50%"
      :visible.sync="drawer"
      :direction="direction"
      :before-close="handleClose"
    >
      <div slot="title">
        <h3>{{ title }}</h3>
        <p><span>发布时间：{{ time }}</span><span>发布者：{{ author }}</span></p>
      </div>
      <div class="article" v-html="article" />
    </el-drawer>
  </div>
</template>

<script>
import List from './list'
export default {
  name: 'Notice',
  components: { List },
  data() {
    return {
      activeName: 'first',
      drawer: false,
      direction: 'rtl',
      title: '',
      time: '2020-05-05',
      author: '新网',
      article: '<div class="article-content"><p><span class="bjh-p"><span class="bjh-strong">科技行业新鲜趣事早知道，今日份《科技早报》为君奉上。</span></span></p><p><span class="bjh-p">前TikTok CEO辞职的原因似乎已经发现，因为微软的收购案快要谈成了。</span></p><p><span class="bjh-blockquote"><span class="bjh-p"><span class="bjh-strong">传微软收购TikTok48小时官宣 微软股价直线拉升</span></span></span></p><div class="img-container"><img class="large" data-loadfunc="0" src="https://pics4.baidu.com/feed/203fb80e7bec54e7c2ac465d4b42aa574ec26ab7.jpeg?token=09467500d6382447cbcbe58d61652a39" data-loaded="0"></div><p><span class="bjh-p">美国CNBC昨晚表示，据一名消息人士透露，TikTok首席执行官凯文·梅耶尔（Kevin Mayer）系因被排除在该公司与微软和甲骨文的交易谈判之外而辞职。此外，多个消息源还告诉CNBC，梅耶尔的辞职表明，TikTok很可能会在未来48小时内与微软达成出售交易。微软股价直线拉升3.4%。</span></p><p><span class="bjh-p">小米10青春版的新限量版，明天就要预售了。<span class="bjh-br"></span></span></p><p><span class="bjh-blockquote"><span class="bjh-p"><span class="bjh-strong">小米10青春版哆啦A梦限量版明日预售 10月1日开售</span></span></span></p><div class="img-container"><img class="large" data-loadfunc="0" src="https://pics4.baidu.com/feed/d6ca7bcb0a46f21f56895e9f005e5a670d33ae3b.jpeg?token=c129671af7aff57d1e98284cb506d043" data-loaded="0"></div><p><span class="bjh-p">近日小米手机宣布，今天下午两点，一位新同学将和大家见面。小米10青春版献礼新学期。小米官方虽未挑明具体事宜，但是博主哆啦 A 梦王国曝光了相关秘密。小米10青春版哆啦A梦限定款马上要来了，明天8月28日开启预售，9月1日首发。小米10青春版哆啦A梦限定款的包装盒、手机背面、手机壳，还有重点手办都采用了哆啦 A 梦元素。</span></p><p><span class="bjh-p">realme最近即将推出多款新机，伴随而来的是许多传言。</span></p><p><span class="bjh-blockquote"><span class="bjh-p"><span class="bjh-strong">realme副总裁确认 不会推出骁龙860这款型号</span></span></span></p><div class="img-container"><img class="large" data-loadfunc="0" src="https://pics3.baidu.com/feed/eac4b74543a98226bf9477d67ff888064b90eb68.jpeg?token=48a0ff834aabef6a223b5993b9b04fe7" data-loaded="0"></div><p><span class="bjh-p">realme X7系列新机将于9月1日正式发布，该系列将包括两款机型：realme X7和realme X7 Pro。此前有消息称realme X7 Pro将有一款玩家版机型，并且首发骁龙 860处理器。随后，realme副总裁、全球产品线总裁王伟发布微博澄清表示，没有骁龙860版本型号，大家散了吧。</span></p><p><span class="bjh-p">小鹏汽车终于成功上市了，雷军也发来祝贺。<span class="bjh-br"></span></span></p><p><span class="bjh-blockquote"><span class="bjh-p"><span class="bjh-strong">小鹏汽车成功在纽交所上市 雷军发来祝贺</span></span></span></p><div class="img-container"><img class="large" data-loadfunc="0" src="https://pics4.baidu.com/feed/960a304e251f95caefc3f4793f6d4e3966095248.jpeg?token=85ae1b6883a1387383973dc96786818e" data-loaded="0"></div><p><span class="bjh-p">昨天晚间，小鹏汽车成功在纽交所上市，发行价15美元/股，按照发行价计算，小鹏汽车的市值达到108亿美元，约合人民币743亿元。雷军发微博表示祝贺。他表示：“今晚小鹏汽车上市，我特别激动，发自内心深处为何小鹏高兴！”</span></p><p><span class="bjh-p">一加一直在扩展他们的产品线，智能手表也是一环。<span class="bjh-br"></span></span></p><p><span class="bjh-blockquote"><span class="bjh-p"><span class="bjh-strong">一加将发布首款智能手表 型号为W301GB</span></span></span></p><div class="img-container"><img class="large" data-loadfunc="0" src="https://pics6.baidu.com/feed/ac6eddc451da81cb63e1ee84a41ce111082431f1.jpeg?token=377999c061b4450ddeebb9ded7bc82d9" data-loaded="0"></div><p><span class="bjh-p">2020年对于OnePlus来说是相当令人兴奋的一年，因为它成功地扩展了其产品组合：第一台智能电视，真无线耳塞和无线充电板。2020年剩下的时间里，OnePlus还将在其产品组合中再增加一项产品。型号为W301GB的OnePlus Watch已经通过了IMDA认证，这暗示着该公司已经相当接近推出其首款智能手表。</span></p><p><span class="bjh-p">最近出现了阿里控股圆通的消息，随后他们进行了澄清。</span></p><p><span class="bjh-blockquote"><span class="bjh-p"><span class="bjh-strong">阿里否认就控股圆通展开谈判 已集齐五家快递公司</span></span></span></p><div class="img-container"><img class="large" data-loadfunc="0" src="https://pics2.baidu.com/feed/35a85edf8db1cb132ed90405272e674993584bf1.jpeg?token=9d3bde381f0ac4b174128978ed8a1ff8" data-loaded="0"></div><p><span class="bjh-p">此前路透社援引知情人士消息称，阿里巴巴正与圆通快递创始人进行谈判，希望增持圆通快递股份，成为圆通的最大股东。界面新闻对此向双方求证，阿里巴巴否认了上述消息，圆通方面则表示暂不做回应。</span></p><p><span class="bjh-p">好了，以上就是今天《科技早报》全部内容，明天见！</span></p><p><span class="bjh-p">（本文图片来自于互联网）</span></p><p><span class="bjh-p">（7513186）<span class="bjh-br"></span></span></p></div>',
      list: [{
        date: '2016-05-03',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-02',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-04',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-01',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-08',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-06',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }],
      list2: [{
        date: '2016-05-03',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '奥斯卡的解放路',
        zip: 200333
      }, {
        date: '2016-05-02',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '奥斯卡的解放路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-04',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '奥斯卡的解放路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-01',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '奥斯卡的解放路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-08',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '奥斯卡的解放路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-06',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '奥斯卡的解放路 1518 弄',
        zip: 200333
      }]
    }
  },
  created() {
  },
  methods: {
    handleClick() {},
    handleClose() {
      this.drawer = false
    },
    handleShow(param) {
      this.title = param.address
      this.drawer = true
    }
  }
}
</script>
<style lang="scss">
.notice-container{
  padding: 0 20px;
  .el-drawer{
    .el-drawer__header {
      margin-bottom: 0px;
      border-bottom: 1px solid #e5e5e5;
      padding-top: 27px;
      padding-bottom: 27px;
      *{
        outline: none;
      }
      h3{
        margin-top: 0px;
        font-size: 16px;
        line-height: 24px;
        color: #333;
        font-weight: normal;
      }
      p{
        margin: 0px;
      }
      p span{
        font-size: 12px;
        display: inline-block;
        margin-right: 20px;
      }
    }
    .el-drawer__body {
      overflow: auto;
      /* overflow-x: auto; */
    }
    .article {
      font-size: 12px;
      line-height: 24px;
      padding: 0 20px;
    }
  }
}
</style>
