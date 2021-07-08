<template>
<page-header-wrapper
  :title='title'
>
  <template
    v-slot:extra
    v-if='taskNo !== undefined'
  >
    <a-button>取消</a-button>
    <a-button type="primary" >保存</a-button>
  </template>

  <a-card v-if='taskNo === undefined'>
    <a-empty>
      <span slot="description">未选择编辑内容</span>
      <a-button type="primary" @click='setModeSelectModal(true)'>
        点击选择
      </a-button>
      <mode-select-modal
        :visible='modeSelectModalVisible'
        @close='setModeSelectModal(false)'
        @editModeSelected='initEdit'
      />
    </a-empty>
  </a-card>

</page-header-wrapper>
</template>

<script>
import ModeSelectModal from '@/views/cert/taskEdit/ModeSelectModal'

export default {
  name: 'CertTaskEdit',
  data() {
    return {
      taskNo: undefined,
      modeSelectModalVisible: false
    }
  },
  computed: {
    title() {
      switch (this.taskNo) {
        case 'new':
          return '新建任务'
        case undefined :
          return '###'
        default:
          return this.taskNo
      }
    }
  },
  mounted() {
    this.taskNo = this.$route.params.taskNo;
  },
  methods: {
    setModeSelectModal(visible) {
      this.modeSelectModalVisible = visible;
    },
    initEdit(form) {
      console.log(form);
      if (form.mode === 'new') {
        this.taskNo = 'new';
        this.$router.push('/cert/task/edit/new');
      } else {
        this.taskNo = form.taskNo;
        this.$router.push('/cert/task/edit/' + form.taskNo);
      }
    }
  },
  components: {
    ModeSelectModal
  }
}
</script>

<style scoped>

</style>