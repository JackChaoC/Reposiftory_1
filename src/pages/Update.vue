<template>
    <div class="update-container">
        <div class="icon" @mouseup="goBack">
            <img src="../assets/icon/back.png" alt="" />
        </div>
        <div class="subject">
            <p>{{ item.subject }}</p>
        </div>
        <p class="p1">Problem</p>
        <div class="problem">
            <img :src="item.qUrl" alt="" />
        </div>
        <p class="p2">Answer</p>
        <div class="content">
            <van-uploader
                :after-read="afterRead1"
                v-model="filelist1"
                :max-count="1"
                :preview-size="250"
            />
        </div>
        <div class="submit">
            <button @mouseup="submit">update</button>
        </div>
    </div>
</template>
<script>
export default {
    name: "Update",
    props: ["item"],
    data() {
        return {
            form: {
                id: undefined,
                suject: "",
                problem: "",
                content: "",
            },
            filelist1: [],
        };
    },
    methods: {
        goBack() {
            this.$router.go(-1);
        },
        afterRead1(file) {
            // 此时可以自行将文件上传至服务器
            console.log(file);
            console.log(this.filelist1);
        },
        addFormData(uFile) {
            let df = new FormData(); //dataform数据对象
            df.append("id", this.item.id);
            df.append("file", uFile);
            return df;
        },
        submit() {
            if (this.filelist1 != [] && this.filelist1[0].content) {
                let formdata = this.addFormData(this.filelist1[0].file);
                this.$request({
                    method: "post",
                    url: "/update/answer",
                    data: formdata,
                }).then((res) => {
                    if (res.data.code == 1) {
                        this.$message.success("修改成功");
                    }
                    if (res.data.code == 0) {
                        this.$message.warning("添加失败");
                    }
                });
            } else {
                this.$message.warning("请修改答案后再提交!");
            }
        },
    },
    mounted() {
        console.log(this.item);
        this.filelist1 = [{ url: this.item.uUrl, isImage: true }];
        console.log("filelist[0]", this.filelist1[0]);
    },
};
</script>
<style lang="less">
.update-container {
    background-color: #efefef;
    width: 100%;
    height: 100%;
    word-break: break-all;
    .icon {
        width: 35px;
        height: 35px;
        margin: 5px;
        img {
            width: 35px;
            height: 35px;
        }
    }
    .subject {
        height: 50px;
        width: 95%;
        line-height: 50px;
        margin: 2.5% 2.5%;
        border-radius: 5px;

        p {
            height: 100%;
            font-size: 24px;
        }
    }
    .p1 {
        margin-left: 10px;
        font-size: 16px;
    }
    .problem {
        height: 25%;
        width: 95%;
        line-height: 50px;
        margin: 2.5% 2.5%;
        background-color: rgb(255, 255, 255);
        border-radius: 5px;
        img {
            margin-top: 10px;
            margin-left: 10px;
            width: 230px;
            object-fit: contain;
        }
    }
    .p2 {
        margin-left: 10px;
    }
    .content {
        height: 40%;
        width: 95%;
        line-height: 50px;
        margin: 2.5% 2.5%;
        background-color: rgb(255, 255, 255);
        border-radius: 5px;
        .van-uploader {
            margin-left: 10px;
            margin-top: 10px;
        }
    }
    .submit {
        width: 100%;
        height: 40px;
        display: flex;
        justify-content: center;
        button {
            background-color: #42aaff;
            border-radius: 5px;
            width: 80px;
            height: 40px;
            border: none;
            color: white;
            font-size: 16px;
            box-shadow: 0 0 20px 1px rgb(187, 245, 255);
        }
    }
    div > textarea {
        width: 95%;
        height: 95%;
        margin: 2.5%;
        padding: 0%;
        border: none;
        resize: none;
        line-height: 20px;
    }
}
</style>