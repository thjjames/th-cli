<!--
  对长文本进行省略，支持展开/收起
  展开/收起按钮采用右下角环绕效果
-->
<template>
  <div ref="containerRef" class="c-text-ellipsis" :style="`--c-text-ellipsis-rows: ${rows}; --c-text-ellipsis-line-height: ${lineHeight}`">
    <div :class="['c-text-ellipsis-wrapper', !expanded && 'c-text-ellipsis__collapsed']">
      <span v-if="hasAction" class="c-text-ellipsis__action" @click="toggle()">
        {{ expanded ? collapseText : expandText }}
      </span>
      <span ref="contentRef">{{ content }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    content: string;
    rows?: number;
    lineHeight?: number;
    expandText?: string;
    collapseText?: string;
  }>(), {
    rows: 1,
    lineHeight: 1.5,
    expandText: '展开',
    collapseText: '收起',
  },
);

const containerRef = ref();
const contentRef = ref();
const containerHeight = ref(0);
const expanded = ref(false);
const hasAction = ref(false);

/**
 * 切换文本的展开状态 true为展开 false为收起 不传参为切换
 */
const toggle = (isExpanded = !expanded.value) => {
  expanded.value = isExpanded;
};

/**
 * 文本有变化时重新计算是否展示展开/收起按钮
 * 采用css覆盖层隐藏的方案不能实现此效果（文本变化）
 */
const calcHasAction = () => {
  const contentHeight = contentRef.value.offsetHeight;
  hasAction.value = contentHeight > containerHeight.value;
};

onMounted(() => {
  containerHeight.value = containerRef.value.offsetHeight;
  calcHasAction();
});

watch(
  () => [props.content, props.rows, props.lineHeight],
  () => {
    nextTick(() => {
      calcHasAction();
    });
  },
);

defineExpose({
  toggle,
});
</script>

<style lang="less" scoped>
.c-text-ellipsis {
  display: flex;
  // background: var(--background-color);
  line-height: var(--c-text-ellipsis-line-height);
  &-wrapper {
    position: relative;
    text-align: justify;
    overflow: hidden;
    // white-space: pre-wrap; // safari上与text-align: justify有兼容性问题
    overflow-wrap: break-word;
    // transition: .3s max-height;
    &.c-text-ellipsis__collapsed {
      // hack safari上有文本截断和浮动的兼容性问题
      // display: -webkit-box + float 不能同时出现
      // 浮动是关键实现 只能找文本截断的替代方案
      // display: -webkit-box;
      // -webkit-line-clamp: var(--c-text-ellipsis-rows);
      // -webkit-box-orient: vertical;
      // text-overflow: ellipsis;
      max-height: calc(var(--c-text-ellipsis-rows) * var(--c-text-ellipsis-line-height) * 1em);
      .c-text-ellipsis__action {
        margin-left: 16px;
        &::before {
          visibility: visible;
          // transition: visibility 0s 0.3s step-start;
        }
      }
    }
    // 右下角环绕效果
    &::before {
      content: '';
      float: right;
      width: 0;
      height: 100%;
      margin-bottom: calc(var(--c-text-ellipsis-line-height) * -1em);
    }
  }
  &__action{
    position: relative;
    float: right;
    clear: both;
    margin-left: 4px;
    color: var(--primary-color);
    cursor: pointer;
    &::before{
      visibility: hidden;
      content: '...';
      position: absolute;
      left: -4px;
      color: var(--text-color);
      transform: translateX(-100%);
    }
  }
}
</style>
