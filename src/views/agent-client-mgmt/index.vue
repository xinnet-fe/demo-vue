<template>
  <div class="agent-mgmt-container">
    <el-row :gutter="20">
      <el-col :span="16" class="col1">
        <div class="grid-content grid-content1">
          <div class="adv">

          </div>
          <el-row class="row2" :gutter="20">
            <el-col class="col1-1">
              <div class="grid-content">
                <span class="img"></span>
                <strong>域名</strong>
                <span class="line"></span>
                <ul>
                  <li><a href="http://" target="_blank" rel="noopener noreferrer">域名注册</a></li>
                  <li><a href="http://" target="_blank" rel="noopener noreferrer">商标注册</a></li>
                </ul>
              </div>
            </el-col>
            <el-col class="col1-1">
              <div class="grid-content">
                <span class="img"></span>
                <strong>域名</strong>
                <span class="line"></span>
                <ul>
                  <li><a href="http://" target="_blank" rel="noopener noreferrer">域名注册</a></li>
                  <li><a href="http://" target="_blank" rel="noopener noreferrer">商标注册</a></li>
                </ul>
              </div>
            </el-col>
            <el-col class="col1-1">
              <div class="grid-content">
                <span class="img"></span>
                <strong>域名</strong>
                <span class="line"></span>
                <ul>
                  <li><a href="http://" target="_blank" rel="noopener noreferrer">域名注册</a></li>
                  <li><a href="http://" target="_blank" rel="noopener noreferrer">商标注册</a></li>
                </ul>
              </div>
            </el-col>
            <el-col class="col1-1">
              <div class="grid-content">
                <span class="img"></span>
                <strong>域名</strong>
                <span class="line"></span>
                <ul>
                  <li><a href="http://" target="_blank" rel="noopener noreferrer">域名注册</a></li>
                  <li><a href="http://" target="_blank" rel="noopener noreferrer">商标注册</a></li>
                </ul>
              </div>
            </el-col>
            <el-col class="col1-1">
              <div class="grid-content">
                <span class="img"></span>
                <strong>域名</strong>
                <span class="line"></span>
                <ul>
                  <li><a href="http://" target="_blank" rel="noopener noreferrer">域名注册</a></li>
                  <li><a href="http://" target="_blank" rel="noopener noreferrer">商标注册</a></li>
                </ul>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :span="8" class="col2">
        <div class="grid-content grid-content1">
          <el-row class="row2" :gutter="20">
            <el-col class="col2-1" :span="12">
              <div class="grid-content grid-content2">
                <span class="img"></span>
                <strong>域名</strong>
              </div>
            </el-col>
            <el-col class="col2-1" :span="12">
              <div class="grid-content grid-content2">
                <span class="img"></span>
                <strong>域名</strong>
              </div>
            </el-col>
          </el-row>
          <div class="notice">
            <div class="tit">
              重要公告
              <a href="http://" target="_blank" rel="noopener noreferrer">查看全部</a>
            </div>
            <ul>
              <li>
                <a href="http://" target="_blank" rel="noopener noreferrer">啥快递费建设大街</a>
                <span class="time">2020-4-8</span>
              </li>
              <li>
                <a href="http://" target="_blank" rel="noopener noreferrer">啥快递费建设大街</a>
                <span class="time">2020-4-8</span>
              </li>
            </ul>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { title } from '@/settings'
export default {
  name: 'Dashboard',
  data() {
    return {
      title: title
    }
  }
}
</script>
<style lang="scss" scoped>
.agent-mgmt-container{
  .col1{
    .grid-content1{
      background: #fff;
    }
    .row2{
      margin: 0px!important;
      padding: 20px 10px;
      .img{
        display: inline-block;
        width: 35px;
        height: 35px;
        background: #f00;
        margin-bottom: 15px;
      }
      .line{
        width: 30px;
        height: 1px;
        background: #cccccc;
        display: inline-block;
        margin: 15px 0;
      }
      strong{
        font-weight: normal;
        display: block;
      }
      .grid-content{
        text-align: center;
        padding: 20px 0;
        font-size: 14px;
      }
      ul{
        list-style: none;
        padding: 0px;
        font-size: 12px;
        margin: 0px;
        li{
          line-height: 22px;
        }
        a{
          color: #666;
        }
      }
    }
  }
  .col2{
    .row2{
      margin-bottom: 20px;
    }
    .grid-content2{
      height: 100px;
      background: #aaa;
      text-align: center;
      .img{
        width: 30px;
        height: 30px;
        display: inline-block;
        background: #f00;
        margin-top: 20px;
        margin-bottom: 3px;
      }
      strong{
        display: block;
        color: #fff;
      }
    }
    .notice{
      height: 369px;
      background: #fff;
      padding: 18px;
      .tit{
        font-size: 15px;
        border-bottom: 1px solid #ededed;
        padding-bottom: 15px;
        a{
          float: right;
          font-size: 12px;
          color: #676767;
        }
      }
      ul{
        padding: 0px;
        list-style: none;
        font-size: 12px;
        margin: 0px;
        li{
          padding: 15px 0;
          border-bottom: 1px solid #ededed;
        }
        .time{
          display: block;
          color: #9a9a9a;
          margin-top: 10px;
        }
      }
    }
  }

  .adv{
    min-height: 260px;
    max-height: 260px;
    overflow: hidden;
    background: #999;
  }
  .col1-1{
    width: 20%;
    .grid-content{
      border: 1px solid #e3e3e3;
    }
  }
}
</style>

