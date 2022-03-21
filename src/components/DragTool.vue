<template>
  <div class="drag-tool" @click.stop="active" :class="{active: state.active === id}">
    <div class="drag-mask" v-if="mask"></div>
    <div class="drag-l">
      <div class="drag-btn _fc-drag-btn" v-if="state.active === id && dragBtn !== false" style="cursor: move;">
        <i class="fc-icon icon-move"></i>
      </div>
    </div>
    <div class="drag-r">
      <div class="drag-btn" @click="$emit('add')">
        <i class="fc-icon icon-add"></i>
      </div>
      <div class="drag-btn" @click="$emit('copy')">
        <i class="fc-icon icon-copy"></i>
      </div>
      <div class="drag-btn" v-if="children" @click="$emit('addChild')">
        <i class="fc-icon icon-add-child"></i>
      </div>
      <div class="drag-btn drag-btn-danger" @click="$emit('delete')">
        <i class="fc-icon icon-delete"></i>
      </div>
    </div>
    <slot name="default"></slot>
  </div>
</template>

<script>
let id = 1;
export default {
    name: 'DragTool',
    inject: ['fcx'],
    props: ['dragBtn', 'children', 'unique', 'mask'],
    data() {
        return {
            id: this.unique || id++,
            state: this.fcx
        };
    },
    methods: {
        active() {
            if (this.state.active === this.id) return;
            this.state.active = this.id;
            this.$emit('active');
        }
    },
    beforeDestroy() {
        this.state = {};
    }
};
</script>

<style>
.drag-tool {
  position: relative;
  min-height: 20px;
  box-sizing: border-box;
  padding: 2px;
  outline: 1px dashed #2E73FF;
  overflow: hidden;
  word-wrap: break-word;
  word-break: break-all;
}

.drag-tool .drag-tool {
  margin: 5px;
}

.drag-tool + .drag-tool {
  margin-top: 5px;
}

.drag-tool.active {
  outline: 2px solid #2E73FF;
}

.drag-tool.active > div > .drag-btn {
  display: flex;
}

.drag-tool .drag-btn {
  display: none;
}

.drag-r {
  position: absolute;
  right: 2px;
  bottom: 2px;
  z-index: 1904;
}

.drag-l {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1904

}

.drag-btn {
  height: 18px;
  width: 18px;
  color: #fff;
  background-color: #2E73FF;
  text-align: center;
  line-height: 20px;
  padding-bottom: 1px;
  float: left;
  cursor: pointer;
  justify-content: center;
}

.drag-btn + .drag-btn {
  margin-left: 2px;
}

.drag-btn-danger {
  background-color: #FF2E2E;
}

.drag-btn i {
  font-size: 13px;
}

.drag-mask{
    z-index: 1900;
    position: absolute;
    top:0;
    left:0;
    right:0;
    bottom: 0;
;}
</style>
