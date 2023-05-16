<template>
    <div class="add-container">
        <div class="subject-content">
            <van-field
                v-model="form.subject"
                label="科目"
                placeholder="请输入科目"
            />
        </div>
        <p class="topic">题目:</p>
        <div class="problem">
            <van-uploader
                :after-read="afterRead1"
                v-model="filelist1"
                :max-count="1"
                :preview-size="100"
            />
        </div>
        <p class="topic">纠正:</p>
        <div class="textarea-content">
            <van-uploader
                :after-read="afterRead2"
                v-model="filelist2"
                :max-count="1"
                :preview-size="250"
            />
        </div>
        <div class="submit">
            <van-button size="normal" type="info" @click="submit"
                >提&nbsp&nbsp&nbsp交</van-button
            >
        </div>
    </div>
</template>
<script>
import { nanoid } from "nanoid";
export default {
    name: "Add",
    data() {
        return {
            value: "",
            form: {
                id: undefined,
                subject: "",
            },
            filelist1: [],
            filelist2: [],
        };
    },
    methods: {
        addFormData(subject, qFile, uFile) {
            let listForm = {
                id: nanoid(), //这道题的id,独一无二的
                subject: subject,
                proficiency: "生疏", //熟练程度,String,
            };
            let df = new FormData(); //dataform数据对象
            df.append("question", qFile);
            df.append("answer", uFile);
            df.append("params", listForm);
            return df;
        },
        afterRead1(file) {
            // 此时可以自行将文件上传至服务器
            console.log(file);
            console.log(this.filelist1);
        },
        afterRead2(file) {
            // 此时可以自行将文件上传至服务器
            console.log(file);
        },
        submit() {
            if (this.filelist1!=[] && this.filelist2!=[] && this.form.subject!="") {
                let formdata = this.addFormData(
                    this.form.subject,
                    this.filelist1[0].file,
                    this.filelist2[0].file
                );
                this.$request({
                    method: "post",
                    url: "/add",
                    data: formdata,
                }).then((res) => {
                    if (res.data.code == 1) {
                        this.$message.success("添加成功");
                        this.form.subject=''
                        this.filelist1 =[]
                        this.filelist2 =[]
                    }
                    if (res.data.code == 0) {
                        this.$message.warning("添加失败");
                    }
                });
            } else {
                this.$message.warning("未填写科目或未选择图片!");
            }
            // this.$request({
            //     method: "post",
            //     url: "/add",
            //     data: {
            //         name:"chao"
            //     },
            //     Headers:{
            //         'Content-Type':'multipart/form-data'
            //     }
            // }).then((res) => {
            //     console.log(res.data);
            //     if (res.data.code == 1) {
            //         this.$message.success("添加成功");
            //     }
            //     if (res.data.code == 0) {
            //         this.$message.warning("添加失败");
            //     }
            // });
        },
    },
};
</script>
<style lang="less">
.add-container {
    height: 100%;
    background-color: rgb(249, 249, 249);
    padding-top: 10px;
    word-break: break-all;

    .subject-content {
        width: 95%;
        height: 8%;
        margin: 0 2.5%;
        display: flex;
        align-items: center;
        background-color: white;
        box-shadow: 0 0 20px 5px #f0f0f0;
        border-radius: 5px;
    }
    .topic {
        height: 5%;
        margin-top: 2.5%;
        margin-left: 5%;
    }
    .problem {
        width: 95%;
        height: 16%;
        margin: 0 2.5%;
        background-color: white;
        box-shadow: 0 0 20px 5px #f0f0f0;
        border-radius: 5px;
        padding: 10px;
    }
    .textarea-content {
        width: 95%;
        height: 38%;
        margin: 0 2.5%;
        background-color: white;
        box-shadow: 0 0 20px 5px #f0f0f0;
        border-radius: 5px;
        padding: 10px;
    }
    .submit {
        position: absolute;
        height: 10%;
        margin-top: 3%;
        left: 50%;
        transform: translateX(-50%);
    }
    div > textarea {
        width: 100%;
        height: 100%;
        padding: 0%;
        border: none;
        resize: none;
        line-height: 20px;
    }
}
</style>