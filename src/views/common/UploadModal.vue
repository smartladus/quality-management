<template>
<div class='uploadModal'>
  <a-button icon="upload" @click="setModalVisible(true)">
    批量上传
  </a-button>
  <a-modal
    :title="title"
    :visible="visible"
    @cancel="handleCancel"
  >
    <a-upload-dragger
      name="file"
      :multiple="false"
      :headers="headers"
      :before-upload="beforeTaskUpload"
      :file-list="fileList"
      :remove="handleRemove"
    >
      <p class="ant-upload-drag-icon">
        <a-icon type="inbox" />
      </p>
      <p>
        将文件拖动到此区域或点击以上传文件
      </p>
    </a-upload-dragger>
    <a-divider></a-divider>
    <a-row type="flex" align="middle" :gutter="[0,24]">
      <a-col flex="auto">
        选择上传方式：
        <a-radio-group default-value="add" button-style="solid" v-model="mode">
          <a-radio-button value="add">
            增量上传
          </a-radio-button>
          <a-radio-button value="replace">
            覆盖替换
          </a-radio-button>
        </a-radio-group>
      </a-col>
      <a-col :span="5">
        <a-button type="link" icon="download"><a :href="templateDownloadUrl" @click='onTemplateDownload'>下载模板</a></a-button>
      </a-col>
    </a-row>
    <a-row type="flex" :gutter="[0,24]">
      <a-col :span="24">
        <a-alert v-if="mode === 'add'" :message="tipOfAdd" type="info" show-icon />
        <a-alert v-if="mode === 'replace'" :message="tipOfReplace" type="warning" show-icon />
      </a-col>
    </a-row>
    <template slot="footer">
      <a-button key="back" @click="handleCancel">
        取消
      </a-button>
      <a-button
        key="submit"
        type="primary"
        :loading="uploading"
        @click="handleOk"
        :disabled="fileList.length === 0"
      >
        确认上传
      </a-button>
    </template>
  </a-modal>
</div>
</template>

<script>
export default {
  name: "UploadModal",
  data() {
    return {
      visible: false,
      headers:{},
      fileList:[],
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
      mode: "add",
      uploading: false,
    }
  },
  props: {
    title: {
      type: String,
      default() {
        return '批量上传';
      }
    },
    tipOfAdd: {
      type: String,
      default() {
        return '已选择增量上传，仅增加不同的行。';
      }
    },
    tipOfReplace: {
      type: String,
      default() {
        return '已选择覆盖替换，请谨慎操作！';
      }
    },
    templateDownloadUrl: {
      type: String,
      default() {
        return 'javascript:void(0);';
      }
    },
    doUpload: {
      type: Function,
      default() {
        return new Promise(resolve => {
          this.$message.info('未设置上传功能');
        })
      }
    },
  },
  methods: {
    setModalVisible(visible) {
      this.visible = visible
    },
    resetModal() {
      this.uploading = false;
      this.fileList = [];
      this.mode = 'add';
    },
    handleRemove(file) {
      const index = this.fileList.indexOf(file);
      const newFileList = this.fileList.slice();
      newFileList.splice(index, 1);
      this.fileList = newFileList;
    },
    handleOk() {
      this.uploading = true;
      let data = new FormData();
      data.append('file', this.fileList[0]);
      let fileName = this.fileList[0].name;
      this.doUpload(this.mode, data).then(res => {
        this.$emit("updated", this.mode, fileName, res);
        this.resetModal();
        this.closeModal();
      }).catch(err => {
        this.$emit("uploadError", this.mode, fileName, err);
        this.resetModal();
      });
    },
    handleCancel() {
      this.resetModal();
      this.closeModal();
    },
    beforeTaskUpload(file) {
      this.fileList = [...this.fileList, file];
      return false;
    },
    closeModal() {
      this.visible = false;
    },
    onTemplateDownload() {
      if (this.templateDownloadUrl === 'javascript:void(0);') {
        this.$message.info('未设置模板下载链接');
      }
    }
  }
}
</script>

<style scoped>
.uploadModal{
  display: inline-block;
}
</style>