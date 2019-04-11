<template>
  <div class="ichat-addressBooks">
    <div class="ichat-addressBooks-wrapper" ref="wrapper">
      <ul class="ichat-addressBooks-list" ref="contactsList">
        <li v-for="item in contactsList">
          <div
            class="ichat-addressBooks-list-key"
            ref="contactsListIndex"
            v-if="item.showKey"
          >{{item.key}}</div>
          <div class="ichat-addressBooks-list-item">{{item.value}}</div>
        </li>
      </ul>
    </div>
    <div class="ichat-addressBooks-initial" v-show="showCurrentIndex">{{this.currentIndex}}</div>
    <ul
      class="ichat-addressBooks-index"
      ref="contactsIndex"
      @touchstart.stop.prevent="touchstart"
      @touchmove.stop.prevent="touchmove"
      @touchend.stop.prevent="touchend"
      @touchcancel.stop.prevent="touchcancel"
    >
      <li v-for="item in keys" :key="item">{{item}}</li>
    </ul>
  </div>
</template>

<script>
import { isChinese, getPinYinFirstCharacter, getPinYin, arraySearch, compare } from '../../utils/getPinYinSort.js'
import { log } from 'util'
import BScroll from 'better-scroll'

export default {
  name: '',
  data() {
    return {
      contactsList: [],
      keys: [],
      contactsListmoveY: 0,
      contactsIndexHeight: 0,
      contactsIndexOffsetTop: 0,
      currentIndex: '',
      scroll: {},
      showCurrentIndex: false,
    }
  },
  created: function() {
    let Capital = []
    for (var i = 0; i < 26; i++) {
      Capital.push(String.fromCharCode(65 + i))
    }
    this.keys = ['☆', ...Capital]
    let data = [
      '河北省石家庄市',
      '河北省唐山市',
      '山西省太原市',
      '内蒙包头市',
      'aaa',
      '北京',
      '辽宁省大连市',
      '辽宁省鞍山市',
      '辽宁省抚顺市',
      '吉林省吉林市',
      '黑龙江省齐齐哈尔市',
      '江苏省徐州市',
      '浙江省杭州市',
      '福建省福州市',
      '江西省南昌市',
      '山东省济南市',
      '山东省青岛市',
      '山东省淄博市',
      '河南省郑州市',
      '$我是随意加的',
      '!哈哈哈',
      '@哇哇哇',
      '湖南省长沙市',
      '贵州省贵阳市',
      '云南省昆明市',
      '甘肃省兰州市',
      '新疆乌鲁木齐市',
    ]
    this.init(data)
  },
  mounted: function() {
    this.scroll = new BScroll(this.$refs.wrapper, { bounceTime: 0 })
    this.contactsIndexOffsetTop = this.$refs.contactsIndex.getBoundingClientRect().top
    this.contactsIndexHeight = this.$refs.contactsIndex.clientHeight
  },
  methods: {
    // 初始化
    init(data) {
      this.currentIndex = -1
      // 一、处理数据
      let tempData = data || []
      // 排序
      tempData = tempData.sort()
      let preCharacter = ''
      let key = ''
      let temp = []

      //二、生成key和是否显示key
      for (let i = 0; i < tempData.length; i++) {
        // 调用pinyin.js里面的方法获取首个汉字拼音首字母
        key = getPinYinFirstCharacter(tempData[i], '', true).substring(0, 1)
        temp.push({
          key: key,
          value: tempData[i],
          showKey: preCharacter != key,
        })
        preCharacter = key
      }
      // 三、按key排序
      temp = temp.sort(compare('key'))
      // 四、key还有重复 去掉重复key
      for (let i = temp.length - 1; i >= 1; i--) {
        if (temp[i].key === temp[i - 1].key) {
          temp[i].showKey = false
        } else {
          temp[i].showKey = true
        }
      }
      this.contactsList = temp
    },
    touchstart(e) {
      this.currentIndex = e.target.innerText
      this.showCurrentIndex = true
      this.locate(this.currentIndex)
    },
    touchmove(e) {
      this.getTouchMoveIndex(e)
    },
    touchend() {
      this.showCurrentIndex = false
    },
    touchcancel() {
      this.showCurrentIndex = false
    },
    locate(currentIndex) {
      if (currentIndex === '☆') {
        this.scroll.scrollTo(0, 0)
        return
      }
      const index = this.$refs.contactsListIndex.findIndex(item => {
        return item.innerText === currentIndex
      })
      if (index > -1) {
        this.contactsListmoveY = this.$refs.contactsListIndex[index].offsetTop
        this.scroll.scrollTo(0, -this.contactsListmoveY)
      }
    },
    getTouchMoveIndex(e) {
      const clientY = e.touches[0].clientY
      const contactsIndexItemY = clientY - this.contactsIndexOffsetTop
      const contactsIndexItemHeight = this.contactsIndexHeight / 27
      const keysIndex = parseInt((contactsIndexItemY / contactsIndexItemHeight).toFixed(0))
      this.currentIndex = this.keys[keysIndex]
      const isMove = this.contactsList.some(item => {
        return item.key === this.currentIndex
      })
      if (isMove || this.currentIndex === '☆') {
        this.showCurrentIndex = true
        this.locate(this.currentIndex)
      }
      if (!this.currentIndex) {
        this.showCurrentIndex = false
      }
    },
  },

  components: {},
}
</script>

<style lang="less" rel='stylesheet/less'>
.@{ichat-css-prefix}addressBooks {
  height: 100%;
  position: relative;
  &-wrapper {
    height: 100%;
  }
  &-list {
    // height: 100%;
    // overflow: auto;
    li {
      padding-right: 0.2rem;
      div {
        padding: 0.1rem 0 0.1rem 0.1rem;
        border-bottom: 1px solid #ebedf0;
      }
    }
    &-key {
      background-color: #f6f5f6;
    }
  }
  &-initial {
    position: fixed;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    text-align: center;
    line-height: 60px;
    background-color: rgba(0, 0, 0, 0.2);
    color: #fff;
    font-size: 33px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  &-index {
    position: fixed;
    top: 0.46rem;
    right: 0;
    bottom: 0;
    height: fit-content;
    width: 0.2rem;
    text-align-last: center;
    z-index: 1000;

    li {
      font-size: 0.13rem;
    }
  }
}
</style>