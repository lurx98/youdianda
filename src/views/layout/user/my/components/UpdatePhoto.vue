<template>
  <div class="update-photo">
    <img class="img" :src="img" ref="img" />

    <div class="toolbar">
      <div class="cancel" @click="$emit('close')">取消</div>
      <div class="confirm" @click="onConfirm">完成</div>
    </div>
  </div>
</template>

<script>
import { updatedImgApi } from '@/api/Release'
import { updateUserInfoApi } from '@/api/User'
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
export default {
  name: 'UpdatePhoto',
  components: {},
  props: {
    // 预览图片地址信息
    userInfo: {
      type: Object,
      require: true,
    },
    img: {
      type: [String, Object],
      required: true,
    },
  },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    const image = this.$refs.img
    this.cropper = new Cropper(image, {
      viewMode: 1,
      dragMode: 'move',
      aspectRatio: 1,
      // autoCropArea: 1,
      cropBoxMovable: false,
      cropBoxResizable: false,
      background: false,
    })
  },
  methods: {
    // 确定事件
    onConfirm() {
      this.cropper.getCroppedCanvas().toBlob(async (blob) => {
        try {
          console.log(blob) // 裁剪后的结果信息
          const fd = new FormData()
          fd.append('file', blob)
          const { data } = await updatedImgApi(fd)
          this.$emit('updateImg', data.data.savePath)
          await updateUserInfoApi({
            id: this.userInfo.id,
            icon: data.data.savePath,
          })
          this.$toast.success('上传成功')
          this.$emit('close')
        } catch (error) {
          console.log(error)
          this.$toast.fail('上传失败')
        }
      })
    },
  },
}
</script>

<style scoped lang="less">
.update-photo {
  background-color: #000;
  height: 100%;
  .toolbar {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    .cancel,
    .confirm {
      width: 90px;
      height: 90px;
      font-size: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
    }
  }
}
.img {
  display: block;
  max-width: 100%;
}
</style>
