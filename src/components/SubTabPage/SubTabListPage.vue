<template>
<div>
  <a-space class='action-bar'>
    <a-button icon="plus" type="primary" @click='createItem'>
      新建
    </a-button>
    <a-button
      icon='sync'
      :disabled="listLoading"
      @click="reloadList"
      :loading="listLoading"
    >
      刷新
    </a-button>
    <a-button icon='upload' @click='showUploadModal'>
      批量上传
    </a-button>
    <upload-modal
      v-model='uploadModalVisible'
      :uploading='uploadModalInfo.uploading'
      :title='uploadModalInfo.title'
      :tip-of-add='uploadModalInfo.tipOfAdd'
      @upload='doUpload'
    />
  </a-space>
</div>
</template>

<script>
import UploadModal from '@/views/common/UploadModal'

export default {
  name: 'SubTabListPage',
  data() {
    return {
      uploadModalVisible: false,
    }
  },
  props: {
    uploadModalInfo: {
      type: Object,
      required: false,
      default() {
        return {
          title: '上传资料',
          tipOfAdd: '增量上传',
          uploading: false
        }
      }
    },
    listLoading: {
      type: Boolean,
      required: false,
      default() {
        return false;
      }
    }
  },
  methods: {
    showUploadModal() {
      this.uploadModalVisible = true;
    },
    createItem() {
      this.$emit('createItem');
    },
    doUpload(mode, fileList) {
      this.$emit("upload", mode, fileList)
    },
    reloadList() {
      this.$emit('reloadList');
    }
  },
  components: {
    UploadModal
  }
}
</script>

<style scoped>
.action-bar{
  position: absolute;
  right: -8px;
  top: 36px;
}
</style>