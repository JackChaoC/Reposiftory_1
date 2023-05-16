<template>
    <div class="detail-container">
        <div class="icon" @mouseup="goBack">
            <img src="../assets/icon/back.png" alt="" />
        </div>
        <div class="subject">
            <p>{{ data.subject }}</p>
        </div>
        <div class="problem">
            <img :src="data.qUrl" alt="" />
        </div>
        <div class="content">
            <img :src="data.uUrl" alt="" />
        </div>
    </div>
</template>
<script>
export default {
    name: "Detail",
    props: ["item"],
    data() {
        return {
            data: {},
        };
    },
    methods: {
        goBack() {
            this.$router.go(-1);
        },
    },
    created() {
        this.$request({
            method: "get",
            url: `/get/${this.item.id}`,
        }).then(
            (res) => {
                if (res.data.code == 1) {
                    console.log("ok");
                    console.log(res.data);
                    this.data = res.data.data;
                }
            },
            (err) => {
                console.log("访问错误", err);
            }
        );
    },
    mounted() {},
};
</script>
<style lang="less">
.detail-container {
    height: 100%;
    background-color: #ffffff;
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
        width: 95%;
        margin: 2.5%;
        font-size: 30px;
        font-weight: 600;
        
    }
    .problem {
        padding: 5px;
        min-height: 15%;
        margin: 0 2.5%;
        border-radius: 5px;
        word-break: break-all;
        box-shadow: 0 0 20px 1px rgba(186, 224, 230, 0.522);
        img{
            width: 250px;
            height: 200px;
            object-fit:contain
        }
    }
    .content {
        padding: 5px;
        min-height: 65%;
        margin: 0 2.5%;
        border-radius: 5px;
        word-break: break-all;
        box-shadow: 0 0 20px 1px rgba(175, 243, 255, 0.519);
        img{
            width: 350px;
            height: 300px;
            object-fit:contain
        }
    }
}
</style>