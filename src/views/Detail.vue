<template>
    <div>
        <s-header :title="'详情'"></s-header>
        <h1>detail</h1>
    </div>
</template>

<script>
    //顶部栏
    import sHeader from '@/components/SimpleHeader'

    export default {
        name: "Detail",
        //注册要使用的组件
        components: {
            sHeader
        }
    }
</script>

<style scoped>

</style>
