const taskStatMap = {
  NEW: {
    index: 0,
    name: '新建',
    tagColor: 'blue'
  },
  DOC_PREPARE: {
    index: 1,
    name: '资料准备',
    tagColor: 'blue'
  },
  TEST: {
    index: 2,
    name: '型式试验',
    tagColor: 'blue'
  },
  GET_CERT: {
    index: 3,
    name: '获证',
    tagColor: 'blue'
  },
  DONE: {
    index: 4,
    name: '已完成',
    tagColor: 'green'
  },
  CANCELLED: {
    index: 4,
    name: '已取消',
    tagColor: 'gray'
  }
}

export {
  taskStatMap
}