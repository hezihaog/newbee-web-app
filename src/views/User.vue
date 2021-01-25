<template>
    <div class="user-box">
        <s-header :title="'我的'"></s-header>
        <div class="user-info" @click="clickUserInfo">
            <div class="info">
                <img src="//s.weituibao.com/1583583975067/user-graduate%20(1).png"/>
                <div class="user-desc">
                    <span>昵称：{{ user.nickname }}</span>
                    <span>登录名：{{ user.username }}</span>
                    <span class="name">个性签名：{{ user.sign }}</span>
                </div>
            </div>
        </div>
        <ul class="user-list">
            <li>
                <span>我的订单</span>
                <van-icon name="arrow"/>
            </li>
            <li>
                <span>账号管理</span>
                <van-icon name="arrow"/>
            </li>
            <li>
                <span>地址管理</span>
                <van-icon name="arrow"/>
            </li>
            <li>
                <span>关于我们</span>
                <van-icon name="arrow"/>
            </li>
        </ul>
    </div>
</template>

<script>
    import navBar from '@/components/NavBar'
    import sHeader from '@/components/SimpleHeader'
    import {getUserInfo} from "../service/user";
    //本地存储
    import {getLocal} from '@/common/js/utils'
    import {Toast} from "vant";

    export default {
        name: 'User',
        components: {
            navBar,
            sHeader
        },
        data() {
            return {
                //用户信息
                user: {}
            }
        },
        methods: {
            clickUserInfo() {
                //如果未登录，则跳转去登录页面
                let userInfo = getLocal('user');
                if (!userInfo) {
                    this.$router.push({path: '/login'});
                }
            }
        },
        async mounted() {
            //从本地获取用户信息
            let userInfo = getLocal('user');
            if (!userInfo) {
                Toast.success("未登录");
                return
            }
            console.log(`userInfo.id：${userInfo.id}`);
            const {data} = await getUserInfo(userInfo.id);
            this.user = data;
        }
    }
</script>

<style lang="less" scoped>
    @import '../common/style/mixin';

    .user-box {
        .user-header {
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

            .user-name {
                font-size: 14px;
            }
        }

        .user-info {
            width: 94%;
            margin: 10px;
            height: 115px;
            background: linear-gradient(90deg, @primary, #51c7c7);
            box-shadow: 0 2px 5px #269090;
            border-radius: 6px;
            margin-top: 50px;

            .info {
                position: relative;
                display: flex;
                width: 100%;
                height: 100%;
                padding: 25px 20px;
                .boxSizing();

                img {
                    .wh(60px, 60px);
                    border-radius: 50%;
                    margin-top: 4px;
                }

                .user-desc {
                    display: flex;
                    flex-direction: column;
                    margin-left: 10px;
                    line-height: 20px;
                    font-size: 14px;
                    color: #fff;

                    span {
                        color: #fff;
                        font-size: 14px;
                        padding: 2px 0;
                    }
                }

                .account-setting {
                    position: absolute;
                    top: 10px;
                    right: 20px;
                    font-size: 13px;
                    color: #fff;

                    .van-icon-setting-o {
                        font-size: 16px;
                        vertical-align: -3px;
                        margin-right: 4px;
                    }
                }
            }
        }

        .user-list {
            padding: 0 20px;
            margin-top: 20px;

            li {
                height: 40px;
                line-height: 40px;
                border-bottom: 1px solid #e9e9e9;
                display: flex;
                justify-content: space-between;
                font-size: 14px;

                .van-icon-arrow {
                    margin-top: 13px;
                }
            }
        }
    }
</style>
