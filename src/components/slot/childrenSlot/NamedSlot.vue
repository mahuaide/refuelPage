<template>
    <div>
        <h2>子组件-具名插槽-start</h2>
        <slot name="header"></slot>
        <slot name="section"></slot>
        <slot name="footer"></slot>
        <slot></slot>
        <h2>子组件-具名插槽-end</h2>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>

</style>