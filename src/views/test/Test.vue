<template>
<div>
  <upload-modal
    title='hahah'
    :visible='visible'
    :template-download-url='templateDownloadUrl'
    :do-upload='uploadTaskList'
    @updated='onSuccess'
    @uploadError='onError'

  />
</div>
</template>

<script>
import UploadModal from '@/views/common/UploadModal'
import { uploadTaskList, templateDownloadUrl } from '@/api/cert'

export default {
  name: 'Test',
  data(){
    return {
      visible: false,
      uploadTaskList,
      templateDownloadUrl: templateDownloadUrl(),
    }
  },
  components: {
    UploadModal
  },
  methods: {
    onSuccess(fileName, res) {
      this.$message.info(fileName + res);
    },
    onError(fileName, err) {
      this.$message.error(fileName + err);
    }
  }
}
</script>

<style scoped>

</style>