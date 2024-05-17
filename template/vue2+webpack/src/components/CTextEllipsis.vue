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

<script lang="ts">
import {
  Vue,
  Component,
  Prop,
  Watch,
  Ref,
} from 'vue-property-decorator';

@Component({})
export default class CTextEllipsis extends Vue {
  @Prop() content!: string;
  @Prop({ default: 1 }) rows!: number;
  @Prop({ default: 1.5 }) lineHeight!: number;
  @Prop({ default: '展开' }) expandText!: string;
  @Prop({ default: '收起' }) collapseText!: string;

  @Ref('containerRef') readonly containerRef!: HTMLElement;
  @Ref('contentRef') readonly contentRef!: HTMLElement;

  containerHeight = 0;
  expanded = false;
  hasAction = false;

  /**
   * 切换文本的展开状态 true为展开 false为收起 不传参为切换
   */
  toggle(isExpanded = !this.expanded) {
    this.expanded = isExpanded;
  }

  /**
   * 文本有变化时重新计算是否展示展开/收起按钮
   * 采用css覆盖层隐藏的方案不能实现此效果（文本变化）
   */
  calcHasAction() {
    const contentHeight = this.contentRef.offsetHeight;
    this.hasAction = contentHeight > this.containerHeight;
  }

  mounted() {
    this.containerHeight = this.containerRef.offsetHeight;
    this.calcHasAction();
  }

  @Watch('content')
  @Watch('rows')
  @Watch('lineHeight')
  /**
   * 文本有变化时重新计算是否展示展开/收起按钮
   * 采用css覆盖层隐藏的方案不能实现此效果（文本变化）
   */
  calcHasActionNextTick() {
    this.$nextTick(this.calcHasAction);
  }
}
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
