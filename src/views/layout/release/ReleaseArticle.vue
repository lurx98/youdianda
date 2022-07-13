<template>
  <div class="release-container">
    <van-form ref="form" @submit="onSubmit">
      <van-field
        v-model="user.title"
        name="title"
        label="文章标题"
        placeholder="文章标题"
        :rules="rules.title"
      />
      <!-- 文章分类 -->
      <van-field
        readonly
        clickable
        name="pickerCate"
        :value="catename"
        label="文章分类"
        placeholder="请选择文章分类"
        @click="showPickerCate = true"
        :rules="rules.cateid"
      />
      <van-popup v-model="showPickerCate" position="bottom">
        <van-picker
          show-toolbar
          value-key="catename"
          :columns="cateList"
          @confirm="onConfirmCate"
          @cancel="showPickerCate = false"
        />
      </van-popup>
      <!-- 文章标签 -->
      <van-field
        readonly
        clickable
        name="pickerTags"
        :value="user.tags"
        label="文章标签"
        placeholder="请选择文章标签"
        :rules="rules.tags"
        @click="showPicker = true"
      />
      <van-popup v-model="showPicker" position="bottom">
        <van-picker
          show-toolbar
          value-key="tagname"
          :columns="tagsList"
          @confirm="onConfirmTags"
          @cancel="showPicker = false"
        />
      </van-popup>
      <!-- 图片上传 -->
      <van-field name="uploader" label="文件上传">
        <template #input>
          <van-uploader v-model="fileList" multiple />
        </template>
      </van-field>
      <!-- 文章内容 -->
      <van-field
        name="content"
        v-model="user.content"
        rows="4"
        autosize
        label="文章内容"
        type="textarea"
        placeholder="请输入文章内容"
        :rules="rules.content"
      />

      <div class="button" v-if="queryId">
        <van-button type="info" native-type="button">存草稿</van-button>
        <van-button type="primary" native-type="button">修改文章</van-button>
        <van-button type="danger" native-type="button" @click="onReset"
          >重置</van-button
        >
      </div>
      <div class="button" v-else>
        <van-button type="primary" native-type="button" @click="onSend(2)"
          >发布</van-button
        >
        <van-button type="info" native-type="button" @click="onSend(1)"
          >存草稿</van-button
        >
        <van-button type="danger" native-type="button" @click="onReset"
          >重置</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { getHomeIndexApi } from '@/api/Home'
import { updatedImgApi, addArticleApi } from '@/api/Release'

export default {
  data() {
    return {
      queryId: this.$route.query.id,
      user: {
        author: '',
        title: '',
        cateid: '',
        tags: '',
        pic: '',
        content: '',
        state: 2,
      },
      catename: '',
      fileList: [
        // Uploader 根据文件后缀来判断是否为图片文件
        // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
      ],
      cateList: [],
      tagsList: [],
      showPickerCate: false,
      showPicker: false,
      rules: {
        title: [{ required: true, message: '请填写文章标题' }],
        cateid: [{ required: true, message: '请选择文章分类' }],
        tags: [{ required: true, message: '请选择文章标签' }],
        pic: '',
        content: [{ required: true, message: '请输入文章内容' }],
      },
    }
  },
  created() {
    this.initData()
  },
  methods: {
    async initData() {
      try {
        const { data } = await getHomeIndexApi()
        this.cateList = data.data.allCate
        this.tagsList = data.data.allTag
      } catch (error) {}
    },
    async onSubmit() {},
    //文章分类
    onConfirmCate(value) {
      this.user.cateid = value.id
      this.catename = value.catename
      this.showPickerCate = false
    },
    //文章标签
    onConfirmTags(value) {
      this.user.tags = value.tagname
      this.showPicker = false
    },
    //重置
    onReset() {
      this.catename = ''
      this.user = {
        title: '',
        cateid: '',
        tags: '',
        pic: '',
        content: '',
        state: 2,
      }
      this.fileList = []
    },
    async onSend(state) {
      try {
        await this.$refs.form.validate([
          'title',
          'pickerCate',
          'pickerTags',
          'content',
        ])
        const { data } = await updatedImgApi({
          file: this.fileList[0].file,
        })
        this.user.pic = data.data.savePath
        this.user.state = state.toString()
        await addArticleApi({ ...this.user })
        this.$router.push('/article')
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>

<style lang='less'>
.release-container {
  .button {
    margin-top: 16px;
    padding: 0 50px;
    display: flex;
    justify-content: space-between;
  }
}
</style>
