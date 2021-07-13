<template>
<div>
  <mark-down-editor
    :preview-after-action='false'
    v-model='content'
    ref='editor'
  />
  <div>Current : {{content}}</div>
  <input type='text' v-model='content'>
</div>
</template>

<script>
import MarkDownEditor from '@/components/Editor/MarkDownEditor'
export default {
  name: 'Test',
  data(){
    return {
      content: 'text'
    }
  },
  components: {
    MarkDownEditor
  }
}
</script>

<style scoped>

</style>