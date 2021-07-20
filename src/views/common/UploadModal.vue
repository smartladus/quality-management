<template>
<div class='uploadModal'>
  <a-modal
    :title="title"
    v-model="modalVisible"
    @cancel="handleCancel"
  >
    <a-upload-dragger
      name="file"
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
      modalVisible: this.visible,
      headers:{},
      fileList:[],
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
      mode: "add",
    }
  },
  model: {
    prop: 'visible',
    event: 'visibleChange'
  },
  props: {
    visible: {
      type: Boolean,
      default() {
        return false;
      }
    },
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
    resetAfterAction: {
      type: Boolean,
      default() {
        return true;
      }
    },
    uploading: {
      type: Boolean,
      default() {
        return false;
      }
    },
  },
  watch: {
    visible(val) {
      this.modalVisible = val;
    }
  },
  methods: {
    resetModal() {
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
      this.$emit('upload',this.mode, this.fileList)
      if (this.resetAfterAction) {
        this.resetModal();
      }
    },
    handleCancel() {
      this.$emit('cancel');
      if (this.resetAfterAction) {
        this.resetModal();
      }
      this.$emit('visibleChange', false);
    },
    beforeTaskUpload(file) {
      this.fileList = [...this.fileList, file];
      return false;
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