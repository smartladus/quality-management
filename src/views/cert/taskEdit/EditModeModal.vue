<template>
<a-modal visible='true'>
  <a-radio-group button-style="solid" v-model="mode">
    <a-radio-button value="new">
      新建任务
    </a-radio-button>
    <a-radio-button value="edit">
      编辑任务
    </a-radio-button>
  </a-radio-group>

  <a-auto-complete
    class="global-search"
    size="large"
    v-if='mode === "edit"'
    style="width: 100%"
    placeholder="查找任务"
    option-label-prop="title"
    @select="onSelect"
    @search="handleSearch"
  >
    <template slot="dataSource">
      <a-select-option v-for="item in dataSource" :key="item.category" :title="item.category">
        Found {{ item.query }} on
        <a
          :href="`https://s.taobao.com/search?q=${item.query}`"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ item.category }}
        </a>
        <span className="global-search-item-count">{{ item.count }} results</span>
      </a-select-option>
    </template>
    <a-input>
      <a-button
        slot="suffix"
        style="margin-right: -12px"
        class="search-btn"
        size="large"
        type="primary"
      >
        <a-icon type="search" />
      </a-button>
    </a-input>
  </a-auto-complete>
</a-modal>
</template>

<script>

export default {
  name: 'EditModeModal',
  data() {
    return {
      mode: 'new'
    }
  },
  components: {
  }
}
</script>

<style scoped>

</style>