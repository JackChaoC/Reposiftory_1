<template>
    <div class="detail-content">
        <div class="search">
            <van-search
                v-model="value"
                placeholder="请输入搜索关键词"
                @keyup="search"
            />
        </div>
        <div class="item" v-for="(item, index) in filterList">
            <div class="item-span" @mouseup.prevent="toDetail(item)">
                <span class="subject">{{ item.subject }}</span>
                <!-- 打包用下面 -->
                <img :src="item.qUrl" alt="" class="qPic" />
                <!-- 开发用下面 -->
                <!-- <img src="../assets/pic/pic.jpg" class="qPic" alt=""> -->
            </div>
            <div class="item-right">
                <van-tag
                    type="success"
                    v-show="item.proficiency == 2 ? true : false"
                    @mouseup="changeShow(index, item.id)"
                    >熟练</van-tag
                >
                <van-tag
                    type="warning"
                    v-show="item.proficiency == 1 ? true : false"
                    @mouseup="changeShow(index, item.id)"
                    >了解</van-tag
                >
                <van-tag
                    type="danger"
                    v-show="item.proficiency == 0 ? true : false"
                    @mouseup="changeShow(index, item.id)"
                    >生疏</van-tag
                >
                <button
                    type="info"
                    size="normal"
                    @mouseup.prevent="toUpdate(item)"
                >
                    修改
                </button>
                <button
                    class="dangerbtn"
                    type="danger"
                    size="normal"
                    @mouseup.prevent="deleteById(index, item.id)"
                >
                    删除
                </button>
            </div>
        </div>
        <van-popup v-model="show" position="bottom">
            <van-picker
                show-toolbar
                :columns="columns"
                @change="onChange"
                @confirm="onConfirm"
                :default-index="0"
                title="熟练度"
            />
        </van-popup>
    </div>
</template>
<script>
export default {
    name: "List",
    data() {
        return {
            value: "",
            list: [],
            filterList: [],
            show: false,
            listIndex: "",
            itemId: "",
            columns: ["生疏", "了解", "熟练"],
        };
    },
    methods: {
        //搜索框
        search() {
            this.filterList = this.list.filter((value, index, arr) => {
                return value.subject.indexOf(this.value) >= 0;
            });
            // this.list.forEach((item,index)=>{
            //     console.log(item.subject);
            //     console.log(index,item.subject.indexOf(this.value));

            // })
            console.log("filterList", this.filterList);
        },
        //点击熟练度触发事件
        changeShow(index, id) {
            this.show = !this.show;
            this.listIndex = index;
            //选中的要修改proficiency的item的id
            this.itemId = id;
        },
        //改变熟练度触发事件
        onChange(picker, value, index) {
            console.log(index);
            this.$request({
                method: "post",
                url: "/update/proficiency",
                data: {
                    id: this.itemId,
                    proficiency: index,
                },
            }).then(
                (res) => {
                    if (res.data.code == 1) {
                        this.$message.success("修改成功");
                        console.log("修改成功");
                    }
                    //修改当前list的数据
                    this.$set(this.list[this.listIndex], "proficiency", index);
                },
                (err) => {
                    this.$message.warning("修改失败");
                    console.log("访问出错", err);
                }
            );
        },
        //删除item
        deleteById(index, id) {
            //先把list里面的给删除了
            this.list.splice(index, 1);
            //发送ajax请求
            this.$request({
                method: "delete",
                url: `/delete/${id}`,
            }).then(
                (res) => {
                    if (res.data.code == 1) {
                        this.$message("删除成功");
                    } else {
                        this.$message("访问成功,删除失败");
                    }
                },
                (err) => {
                    console.log("访问失败", err);
                }
            );
        },
        onConfirm(value, index) {
            this.show = false;
        },
        //前往detail路由
        toDetail(item) {
            this.$router.push({
                name: "detail",
                params: {
                    item,
                },
            });
        },
        //前往update路由
        toUpdate(item) {
            this.$router.push({
                name: "update",
                params: {
                    item: item,
                },
            });
        },
    },
    // watch: {
    //     $route: function (to, from) {
    //         if (to.path != from.path) {
    //             console.log(to.path);
    //             console.log('ok');
    //         }
    //     },
    // },
    //获取数据
    created() {
        // this.list = JSON.parse(localStorage.getItem("list"));
        this.$request({
            method: "get",
            url: "/getList",
        }).then((res) => {
            if (res.data.code == 1) {
                console.log(1);
                this.list = res.data.data;
                console.log(this.list);
                this.filterList = this.list.filter((value, index, arr) => {
                    return value.subject.indexOf(this.value) >= 0;
                });
            }
        });
    },
    // mounted() {
    //     this.filterList = this.list.filter((value, index, arr) => {
    //         return value.subject.indexOf(this.value) >= 0;
    //     });
    // },
};
</script>
<style lang="less">
.detail-content {
    height: 93%;
    overflow: scroll;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    .search {
        height: 40px;
        width: 100%;
        background-color: #ffffff;
        border-radius: 5px;
        margin-bottom: 25px;
        z-index: 1;
    }
    .item {
        width: 95%;
        min-height: 170px;
        background-color: #ffffff;
        border-radius: 5px;
        box-shadow: 0 0 10px 5px #f0f0f0;
        margin-bottom: 10px;
        display: flex;

        .item-span {
            width: 80%;
            .subject {
                display: block;
                font-size: 18px;
                font-weight: 600;
                margin: 4px;
                margin-left: 7px;
            }
            .qPic {
                height: 120px;
                margin-left: 10px;
                margin-bottom: 10px;
            }
        }

        .item-right {
            width: 20%;
            display: flex;
            flex-direction: column;
            align-items: center;
            color: #ffffff;
            .van-tag {
                margin: 10px;
            }
            button {
                margin: 10px;
                margin-top: 0;
                height: 30px;
                width: 60px;
                border: none;
                background-color: #cccccc;
                border-radius: 5px;
            }
            .dangerbtn {
                background-color: rgb(246, 94, 94);
            }
        }
    }
}
</style>