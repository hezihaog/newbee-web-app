<template>
    <header class="simple-header">
        <i class="nbicon nbfanhui" @click="goBack"></i>
        <div class="simple-header-title">{{ title }}</div>
        <i class="nbicon nbmore"></i>
    </header>
</template>

<script>
    export default {
        name: "SimpleHeader",
        props: {
            //需要传递title参数，默认为空
            title: {
                type: String,
                default: ''
            }
        },
        methods: {
            //返回上一页
            goBack() {
                this.$router.go(-1);
            }
        }
    }
</script>

<style lang="less" scoped>
    @import '../common/style/mixin';

    .simple-header {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 10000;
        .fj();
        .wh(100%, 44px);
        line-height: 44px;
        padding: 0 10px;
        .boxSizing();
        color: #252525;
        background: #fff;
        border-bottom: 1px solid #dcdcdc;

        .simple-header-title {
            font-size: 14px;
        }
    }
</style>
