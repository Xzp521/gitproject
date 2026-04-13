<template>
    <div class="styled-text">近十五日分时晋级、溢价率</div>

    <div class="trend-container" ref="trend">
        <div class="trend-part left">
            <DayRise :trendParam="trendParam"></DayRise>
        </div>
        <div class="trend-part middle">
            <riseDis></riseDis>
        </div>
        <div class="trend-part right">
            <TimeShare :trendParam="trendParam"></TimeShare>
        </div>
    </div>

    <div class="trend-container2" ref="trend2">
        <div class="trend-part left">
            <Yj :trendParam="trendParam"></Yj>
        </div>
        <div class="trend-part middle">
            <YjDistribution :trendParam="trendParam"></YjDistribution>
        </div>
        <div class="trend-part right">
            <TimeYj :trendParam="trendParam"></TimeYj>
        </div>
    </div>

    <div class="trend3" ref="trend3">
        <div class="trend-part left">
            <LimitDown :trendParam="trendParam"></LimitDown>
        </div>
        <div class="trend-part middle">
            <LimitDownDis :trendParam="trendParam"></LimitDownDis>
        </div>
        <div class="trend-part right">
            <StockLimitDown :trendParam="trendParam"></StockLimitDown>
        </div>
    </div>


    <div class="trend-container4" ref="trend4">
        <div class="trend-left4">
            <div class="styled-text-table" style="margin-top: 20px;">龙头强势股</div>
            <RencentHotStocks :trendParam="trendParam"></RencentHotStocks>
        </div>
        <div style="height: 20px;"></div>
        <div class="trend-right4">
            <div class="styled-text-table" style="margin-top: 20px;">今日异动股</div>
            <AnomalyToday :trendParam="trendParam"></AnomalyToday>
        </div>
    </div>

    <div class="trend-container5">
        <ConnectedBoardLadder :trendParam="trendParam"></ConnectedBoardLadder>
    </div>

</template>

<script setup lang="ts">
import { defineProps, watch,  } from 'vue';
//引入日线晋级率
import DayRise from './dayRise.vue';
import TimeShare from './timeShare.vue';
import Yj from './yj.vue';
import YjDistribution from './yjDistribution.vue';
import TimeYj from './timeYj.vue';
import LimitDown from './limitDown.vue';
import LimitDownDis from './limitDownDis.vue';
import StockLimitDown from './stockLimitDown.vue';
import RencentHotStocks from './rencentHotStocks.vue';
import AnomalyToday from './anomalyToday.vue';
import ConnectedBoardLadder from './connectedBoardLadder.vue';
import riseDis from './riseDis.vue';

// 定义props
const props = defineProps({
  trendParam: {
    type: [Boolean], // 根据需要指定参数类型
    default: () => false // 默认值
  }
});

</script>

<style>
.styled-text {
    /**字体加粗 */
    font-weight: bold;
    font-size: 20px;
    /* 设置文字大小 */
    width: 100%;
    /* 设置宽度 */
    display: inline-block;
    /* 使宽度设置生效 */
    white-space: nowrap;
    /* 防止文本换行 */
    overflow: hidden;
    margin-left: 25px;

}

.trend-container {
    display: flex;
    height: 350px;
    width: 100%;
    /* 或者你需要的具体宽度 */
}

.trend-part.left {
    flex: 5;
    /* 左边部分占5份 */
    /*background-color: #f0f0f0;  可选：设置背景颜色以区分 */
}

.trend-part.middle {
    flex: 2;
    /* 中间部分占3份 */
    /*background-color: #d0d0d0; /* 可选：设置背景颜色以区分 */
}

.trend-part.right {
    flex: 3;
    /* 右边部分占2份 */
    /*background-color: #b0b0b0; /* 可选：设置背景颜色以区分 */
    margin-right: 25px;
}



.trend-container2 {
    display: flex;
    height: 350px;
    width: 100%;
    /* 或者你需要的具体宽度 */
}

.trend-part.left {
    flex: 5;
    /* 左边部分占5份 */
    /*background-color: #f0f0f0;  可选：设置背景颜色以区分 */
}

.trend-part.middle {
    flex: 2;
    /* 中间部分占3份 */
    /*background-color: #d0d0d0; /* 可选：设置背景颜色以区分 */
}

.trend-part.right {
    flex: 3;
    /* 右边部分占2份 */
    /*background-color: #b0b0b0; /* 可选：设置背景颜色以区分 */
    margin-right: 25px;
}




.trend3 {
    display: flex;
    height: 350px;
    /* 设置.trend的高度为50px */
    width: 100%;
    /* 或者你需要的具体宽度 */
}

/* .trend-part {
    flex: 1;
    height: 100%;
} */

.trend-part.left {
    flex: 5;
    /* 左边部分占5份 */
    /*background-color: #f0f0f0;  可选：设置背景颜色以区分 */
}

.trend-part.middle {
    flex: 2;
    /* 中间部分占3份 */
    /*background-color: #d0d0d0; /* 可选：设置背景颜色以区分 */
}

.trend-part.right {
    flex: 3;
    /* 右边部分占2份 */
    /*background-color: #b0b0b0; /* 可选：设置背景颜色以区分 */
    margin-right: 25px;
}




.trend-container4 {
    display: flex;
    height: 420px;
    width: 100%;
    /* 或者你需要的具体宽度 */

    .styled-text-table {
        /**字体加粗 */
        font-weight: bold;
        font-size: 20px;
        /* 设置文字大小 */
        width: 100%;
        /* 设置宽度 */
        display: inline-block;
        /* 使宽度设置生效 */
        white-space: nowrap;
        /* 防止文本换行 */
        overflow: hidden;
    }

}

.trend-left4 {
    flex: 4;
    margin-left: 35px;
    /* 左边占3份 */
    /*background-color: #ffffff;  可选：设置背景颜色以区分 */
}

.trend-right4 {
    flex: 5;
    /* 右边占2份 */
    /*background-color: #d0d0d0; /* 可选：设置背景颜色以区分 */
    margin-left: 15px;
    margin-right: 80px;
}



.trend-container5 {
    display: flex;
    height: 420px;
    width: 100%;
    /* 或者你需要的具体宽度 */
    margin-left: 35px;

}


/* 假设DayRise组件需要特定的样式 */
DayRise {
    display: block;
    /* 确保DayRise组件作为块级元素显示 */
    width: 100%;
    /* 如果需要，可以让DayRise填满其父容器的宽度 */
    height: 100%;
    /* 如果需要，可以让DayRise填满其父容器的高度 */
}
</style>