<template>
    <div>
        <slot :data="items"></slot>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                items: [1,2,3,4,5,6]
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>