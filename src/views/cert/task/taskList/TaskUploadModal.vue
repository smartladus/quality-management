<template>
<div>
  <a-modal
      title="批量上传任务"
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
        <a-button type="link" icon="download"><a :href="templateDownloadUrl">下载模板</a></a-button>
      </a-col>
    </a-row>
    <a-row type="flex" :gutter="[0,24]">
      <a-col :span="24">
        <a-alert v-if="mode === 'add'" message="已选择增量上传，仅增加任务编号不同的行。" type="info" show-icon />
        <a-alert v-if="mode === 'replace'" message="已选择覆盖替换，请谨慎操作！" type="warning" show-icon />
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
import { uploadTaskList, templateDownloadUrl } from '@/api/cert'

export default {
  name: "TaskUploadModal",
  data() {
    return {
      headers:{},
      fileList:[],
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
      mode: "add",
      uploading: false,
      templateDownloadUrl
    }
  },
  props: {
    visible: {
      type: Boolean,
      default() {
        return false;
      },
      required: true
    }
  },
  methods: {
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
      uploadTaskList(this.mode, data).then(res => {
        if (this.mode === 'replace') {
          if (res === -1) {
            this.$notification['err']({
              message: fileName + "：任务清单替换失败！"
            })
          } else {
            this.$notification['success']({
              message: fileName + "：任务清单替换成功！",
              description: "上传了 " + res + " 条数据！"
            })
          }
        } else {
          if (res === -1) {
            this.$notification['err']({
              message: fileName + "：任务清单更新失败！"
            })
          } else {
            this.$notification['success']({
              message: fileName + "：任务清单上传成功！",
              description: "新增了 " + res + " 条数据！"
            })
          }
        }
        this.$emit("task_list_updated");
        this.resetModal();
        this.closeModal();
      }).catch(err => {
        this.$notification['err']({
          message: fileName + "文件上传失败！",
          description: err
        });
        console.log(err)
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
      this.$emit('close');
    }
  }
}
</script>

<style scoped>

</style>