
<template>
  <div class="uploder">
    <div>
      <van-cell title="头像" is-link>
        <!-- 使用 title 插槽来自定义标题 -->
        <template #default>
          <van-uploader :before-read="beforeRead" accept="image/*">
            <img src="https://img01.yzcdn.cn/vant/leaf.jpg" alt="" />
          </van-uploader>
        </template>
      </van-cell>
    </div>
    <div class="uploadava">
      <van-popup
        duration="0"
        v-model="showCropper"
        position="top"
        :style="{ height: '100%' }"
      >
        <div class="cropper-container">
          <van-loading
            v-show="loadingShow"
            size="50"
            color="#fff"
            vertical
            text-color="#fff"
            >上传中...</van-loading
          >
          <vueCropper
            ref="cropper"
            :img="option.img"
            :outputSize="option.outputSize"
            :outputType="option.outputType"
            :info="option.info"
            :full="option.full"
            :autoCropWidth="option.autoCropWidth"
            :autoCropHeight="option.autoCropHeight"
            :canMove="option.canMove"
            :canMoveBox="option.canMoveBox"
            :original="option.original"
            :autoCrop="option.autoCrop"
            :fixed="option.fixed"
            :fixedNumber="option.fixedNumber"
            :centerBox="option.centerBox"
            :infoTrue="option.infoTrue"
            :fixedBox="option.fixedBox"
            :high="option.high"
            :mode="option.mode"
          />
          <van-nav-bar
            left-text="取消"
            right-text="选择"
            @click-left="onClickLeft"
            @click-right="getCropBlob"
          />
        </div>
      </van-popup>
    </div>
  </div>
</template>
 <script>
import { VueCropper } from 'vue-cropper'
export default {
  name: 'uploadAva',
  components: {
    VueCropper,
  },
  props: {
    showAta: {
      default: false,
      type: Boolean,
    },
    avaUrl: {
      default: '',
      type: String,
    },
  },
  data() {
    return {
      show: true, // 上传类型的弹窗
      imageFileName: '',
      showCropper: false, // 裁剪的弹窗
      option: {
        img: '',
        outputSize: 0.8,
        info: false, // 裁剪框的大小信息
        outputType: 'jpeg', // 裁剪生成图片的格式
        canScale: true, // 图片是否允许滚轮缩放
        autoCrop: true, // 是否默认生成截图框
        autoCropWidth: window.innerWidth - 100 + 'px', // 默认生成截图框宽度
        autoCropHeight: window.innerWidth - 100 + 'px', // 默认生成截图框高度
        high: true, // 是否按照设备的dpr 输出等比例图片
        fixedBox: false, // 固定截图框大小 不允许改变
        fixed: true, // 是否开启截图框宽高固定比例
        fixedNumber: [1, 1], // 截图框的宽高比例
        full: true, // 是否输出原图比例的截图
        canMoveBox: true, // 截图框能否拖动
        original: false, // 上传图片按照原始比例渲染
        centerBox: true, // 截图框是否被限制在图片里面
        infoTrue: false, // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
        mode: '100% auto', // 图片默认渲染方式
      },
      loadingShow: false, // 是否展示loading
    }
  },
  methods: {
    beforeRead(file) {
      if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
        this.$toast('请上传 jpg/png 格式图片')
        return false
      }
      this.showCropper = true
      this.imageToBase64(file)
      this.imageFileName = file.name
    },
    imageToBase64(file) {
      let reader = new FileReader()
      console.log(reader)
      reader.readAsDataURL(file)
      reader.onload = () => {
        this.option.img = reader.result
      }
    },
    getCropBlob() {
      // let formData = new FormData()
      this.loadingShow = true
      console.log(this.option)
      this.$refs.cropper.getCropBlob((data) => {
        // formData.append('headFile', data, this.imageFileName)
        // formData.append('id', this.$store.getters.user.userId)
        console.log(data)
        // uploadAva(formData).then((res) => {
        // this.showCropper = false
        this.$emit('update:showAta', false)
        this.showCropper = false
        // this.$emit('update:avaUrl', res.data)
        // })
      })
    },
    onClickLeft() {
      this.loadingShow = false
      this.showCropper = false
      this.$parent.showPhotoUploader = false
    },
  },
}
</script> 
 <style lang="less" scoped>
img {
  width: 40px;
  height: 40px;
  display: block;
}
//  .uploder{
//    overflow: hidden;
//  }
/deep/.cropper-view-box {
  outline: 2px dashed #fff !important;
}
/deep/.crop-point {
  background-color: auto !important;
}
/deep/.van-loading {
  position: absolute;
  //  color: red;
  z-index: 9999;
  left: 50%;
  top: 50%;
  margin-left: -55px;
  margin-top: -30px;
  background: rgba(0, 0, 0, 0.3);
  padding: 10px 30px;
  border-radius: 25px;
}
.change-photo-setter {
  width: 400px;
  background: #fff;
  position: absolute;
  top: 11%;
  left: 40px;
  z-index: 300;
  .sett-item {
    width: 100%;
  }

  .sett-item:first-child {
    border-bottom: 2px solid #ccc;
  }
}
.uploadava {
  .update-avatar {
    height: 100%;
    text-align: center;
    .update-avatar-line {
      width: 100%;
      height: 1px;
      background-color: #979797;
    }
    .avatar-select-type {
      background-color: #fff;
      width: 346px;
      border-radius: 12px;
      padding-bottom: 4px;
      .upload-avator {
        padding: 14px;
      }
    }
    p {
      margin: 15px 0 30px;
      background-color: #fff;
      width: 346px;
      border-radius: 12px;
      padding: 15px 0 18px;
    }
  }
  .cropper-container {
    height: 94vh;
    .van-nav-bar {
      background-color: rgba(0, 0, 0, 0.87);
      :global(.van-nav-bar__text) {
        color: #fff;
        // font-size: $font-size-normal-x;
      }
      :global(.van-nav-bar__text:nth-child(2)) {
        color: #000;
        font-weight: 500;
      }
      // :global(.van-icon) {
      //     color: red;
      // }
    }
  }
  .vue-cropper {
    background: #000;
    height: 100%;
    padding-top: 46px;
    box-sizing: border-box;
  }
}
</style> 
