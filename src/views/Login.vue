<template>
    <div class="login">
        <simple-header :name="type === 'login' ? '登录' : '注册'" :back="'/home'"></simple-header>
        <img class="logo" src="//s.weituibao.com/1582958061265/mlogo.png" alt="">
        <div v-if="type === 'login'" class="login-body login">
            <van-form @submit="onSubmit">
                <van-field
                        v-model="username"
                        name="username"
                        label="用户名"
                        placeholder="请输入用户名"
                        :rules="[{required:true, message: '请输入用户名'}]"
                />
                <van-field
                        v-model="password"
                        name="password"
                        type="password"
                        label="密码"
                        placeholder="请输入密码"
                        :rules="[{required:true, message: '请输入密码'}]"
                />
                <div class="verify">
                    <Verify ref="loginVerifyRef" @error="error" :showButton="false" @success="success" :width="'100%'"
                            :height="'40px'" :fontSize="'16px'" :type="2"></Verify>
                </div>
                <div style="margin: 16px;">
                    <van-button round block type="info" color="#1baeae" native-type="submit">登录</van-button>
                </div>
            </van-form>
        </div>
        <div v-else class="login-body register">
            <van-form @submit="onSubmit">
                <van-field
                        v-model="username"
                        name="username1"
                        label="用户名"
                        placeholder="请输入用户名"
                        :rules="[{required:true, message: '请输入用户名'}]"
                />
                <van-field
                        v-model="password"
                        name="password1"
                        type="password"
                        label="密码"
                        placeholder="请输入密码"
                        :rules="[{required:true, message: '请输入密码'}]"
                />
                <div class="verify">
                    <Verify ref="registerVerifyRef" @error="error" :showButton="false" @success="success"
                            :width="'100%'" :height="'40px'" :fontSize="'16px'" :type="2"></Verify>
                </div>
                <div style="margin: 16px;">
                    <div class="link-login" @click="toggle('login')">已有登录账号</div>
                    <van-button round block type="info" color="#1baeae" native-type="submit">注册</van-button>
                </div>
            </van-form>
        </div>
    </div>
</template>

<script>
    import sHeader from '@/components/SimpleHeader'
    //请求接口
    import {login, register} from "../service/user";
    //本地存储
    import {setLocal} from '@/common/js/utils'
    import {Toast} from 'vant'
    import Verify from 'vue2-verify'
    import SimpleHeader from "../components/SimpleHeader";

    export default {
        name: "Login",
        data() {
            return {
                username: '',
                password: '',
                username1: '',
                password1: '',
                type: 'login',
                //判断验证码输入是否正确
                verify: false
            }
        },
        //注册组件
        components: {
            SimpleHeader,
            Verify
        },
        methods: {
            //执行验证码
            dealTriVer() {
                this.$refs.loginVerifyRef.$refs.instance.checkCode();
            },
            toggle(v) {
                this.verify = false;
                this.type = v;
            },
            //提交
            async onSubmit(values) {
                //每次提交之前都要执行一次验证码，获取 verify 的最新值
                this.dealTriVer();
                if (!this.verify) {
                    Toast.fail('验证码未填，或填写错误');
                    return;
                }
                if (this.type === 'login') {
                    //登录
                    const {data} = await login({
                        "username": values.username,
                        "password": this.$md5(values.password)
                    });
                    console.log(`token：${data.token}`);
                    //保存Token到本地
                    setLocal('token', data.token);
                    //保存用户信息到本地
                    setLocal('user', data);
                    //登录成功，跳转到首页
                    window.location.href = '/';
                } else {
                    //注册
                    const {data} = await register({
                        "username": values.username1,
                        "password": this.$md5(values.password)
                    });
                    Toast.success("注册成功");
                    //注册成功，切换到登录样式
                    this.type = 'login';
                }
            },
            //Verify组件验证成功的回调
            success(obj) {
                this.verify = true;
            },
            //Verify组件验证失败的回调
            error(obj) {
                this.verify = false;
            }
        }
    }
</script>

<style lang="less">
    .login {
        .logo {
            width: 120px;
            height: 120px;
            display: block;
            margin: 80px auto 0px;
        }

        .login-body {
            padding: 0 20px;
        }

        .login {
            .link-register {
                font-size: 14px;
                margin-bottom: 20px;
                color: #1989fa;
                display: inline-block;
            }
        }

        .register {
            .link-login {
                font-size: 14px;
                margin-bottom: 20px;
                color: #1989fa;
                display: inline-block;
            }
        }

        .verify-bar-area {
            margin-top: 24px;

            .verify-left-bar {
                border-color: #1baeae;
            }

            .verify-move-block {
                background-color: #1baeae;
                color: #fff;
            }
        }

        .verify {
            > div {
                width: 100%;
            }

            display: flex;
            justify-content: center;

            .cerify-code-panel {
                margin-top: 16px;
            }

            .verify-code {
                width: 40% !important;
                float: left !important;
            }

            .verify-code-area {
                float: left !important;
                width: 54% !important;
                margin-left: 14px !important;

                .varify-input-code {
                    width: 90px;
                    height: 38px !important;
                    border: 1px solid #e9e9e9;
                    padding-left: 10px;
                    font-size: 16px;
                }

                .verify-change-area {
                    line-height: 44px;
                }
            }
        }
    }
</style>
