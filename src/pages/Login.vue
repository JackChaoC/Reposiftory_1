<template>
    <div class="login_container">
        <div class="login_box">
            <!-- 头像区域 -->
            <div class="avatar_box">
                <img src="../assets/头像.jpg" alt="" />
            </div>

            <!-- 登录表单区域 -->
            <el-form
                ref="loginFormRef"
                :model="loginForm"
                :rules="loginFormRules"
                label-width="auto"
                class="login_form"
            >
                <!-- 用户名 （prop指定验证规则） -->
                <el-form-item prop="username">
                    <el-input
                        v-model="loginForm.username"
                        placeholder="name"
                    ></el-input>
                </el-form-item>
                <br />
                <!-- 密码  -->
                <el-form-item prop="password">
                    <el-input
                        v-model="loginForm.password"
                        type="password"
                        placeholder="password"
                        show-password
                    ></el-input>
                </el-form-item>
                <br />

                <!-- 按钮区域 -->
                <el-form-item class="btns" password="buttonClass">
                    <button type="primary" @click="login">
                        登&nbsp&nbsp&nbsp&nbsp录
                    </button>
                </el-form-item>
            </el-form>

            <!-- 转跳到注册 -->
            <div class="register">
                <p>还没有账号？<span @mouseup="toRegister">点击注册</span></p>
            </div>
        </div>
    </div>
</template>
 
<script>
export default {
    data() {
        return {
            // 这是登录表单的数据绑定对象
            loginForm: {
                username: "",
                password: "",
            },
            // 这是表单的验证规则对象
            loginFormRules: {
                // 验证用户名是否合法
                username: [
                    {
                        required: true,
                        message: "请输入登录名称",
                        trigger: "blur",
                    }, //鼠标失去焦点的时候触发
                    {
                        min: 2,
                        max: 10,
                        message: "长度在 2 到 10 个字符",
                        trigger: "blur",
                    },
                ],
                // 验证密码是否合法
                password: [
                    {
                        required: true,
                        message: "请输入登录密码",
                        trigger: "blur",
                    },
                    {
                        min: 6,
                        max: 15,
                        message: "长度在 6 到 15 个字符",
                        trigger: "blur",
                    },
                ],
            },
        };
    },
    methods: {
        login() {
            this.$refs.loginFormRef.validate(async (valid) => {
                // console.log(valid);
                if (!valid) return;
                this.$request({
                    method: "post",
                    url: "login",
                    data: this.loginForm,
                    
                }).then(
                    (res) => {
                        console.log(res);
                        if (res.data.code == 1) {
                            this.$message.success("登录成功");
                            //设置token
                            window.sessionStorage.setItem(
                                "token",
                                res.data.token
                            );
                            this.$router.push({
                                name: "add",
                            });
                        }
                    },
                    (err) => {
                        console.log(err);
                        this.$message.warning("登录失败");
                    }
                );
                //     return this.$message.error("登录失败！");
                // this.$message.success("登录成功");
                // // 1. 将登录成功之后的 token，保存到客户端的 sessionStorage 中
                // //   1.1 项目中出了登录之外的其他API接口，必须在登录之后才能访问
                // //   1.2 token 只应在当前网站打开期间生效，所以将 token 保存在 sessionStorage 中
                // window.sessionStorage.setItem("token", res.data.token);
                // // 2. 通过编程式导航跳转到后台主页，路由地址是 /home
                // this.$router.push("./home/index");
            });
        },
        toRegister() {
            console.log("ok");
            this.$router.push({
                name: "register",
            });
        },
    },
};
</script>
 
<style lang="less" scoped>
html,
body {
    height: 100%;
    width: 100%;
}
.login_container {
    background-image: url(../assets/2.jpg);
    font-size: 16px;
    background-color: white;
    height: 100%;
    background-size: 100% 100%;
}

/deep/ .el-input__inner {
    font-size: 20px !important;
    height: 50px;
    border-radius: 20px;
}

.login_box {
    width: 80%;
    height: 100%;
    margin-left: 10%;
    .avatar_box {
        height: 100px;
        width: 100px;
        position: relative;
        left: 33%;
        top: 10%;
        img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
        }
    }
}

.login_form {
    position: relative;
    top: 20%;
}

.btns {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: center;
    button {
        border: none;
        border-radius: 20px;
        height: 50px;
        width: 120px;
        justify-content: center;
        color: black;
        background-color: #50e3ce;
        font-size: 20px;
    }
}
.register {
    height: 100px;
    width: 200px;
    position: absolute;
    left: 50%;
    bottom: 12%;
    transform: translateX(-40%);
    color: rgb(91, 91, 91);
    span {
        text-decoration: underline;
        color: #50e3ce;
    }
}
</style>