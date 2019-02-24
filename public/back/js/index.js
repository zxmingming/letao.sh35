//-----------------------------首页
// echarts.js插件, 实现数据可视化(数据图表化) => 柱状图和饼图
$(function() {

    // 1. 左侧柱状图:
    // 基于准备好的dom，初始化echarts实例
    var echarts_left = echarts.init(document.querySelector('.echarts_left'));

    // 指定图表的配置项和数据
    var option1 = {
        // 大标题
        title: {
            // 标题文本
            text: '2019年注册人数'
        },
        // 提示框组件
        tooltip: {},
        // 图例, 图例一定要和数据项的 name 一一对应
        legend: {
            data:['销量','人数']
        },
        // x轴的刻度
        xAxis: {
            data: ["1月","2月","3月","4月","5月","6月"]
        },
        // y轴的刻度: 应该根据数据动态生成
        yAxis: {},

        // 数据项列表
        series: [{
            name: '销量',
            type: 'bar', // bar 柱状图, line 折线图, pie 饼图
            data: [50, 200, 360, 100, 100, 200]
        },
        {
            name: '人数',
            type: 'bar',
            data: [25, 210, 316, 110, 110, 120]
        }]
    };

    // 使用刚指定的配置项和数据显示图表。
    echarts_left.setOption(option1);


    // 2. 右侧饼图:
    // 基于准备好的dom，初始化echarts实例
    var echarts_right = echarts.init(document.querySelector('.echarts_right'));

    // 指定图表的配置项和数据
    var option2 = {
        // 大标题
        title: {
            // 标题文本
            text: '热门品牌销售',
            // 副标题文本
            subtext: '2019年2月',
            // 控制水平方向位置
            x:'center',
            // 控制主标题文本的样式
            textStyle: {
                color: 'red',
                fontSize: 25
            }
        },
        // 提示框组件
        tooltip: {
            trigger: 'item',
            // 专门配置提示框组件的内容
            // 饼图、仪表盘、漏斗图: {a}（系列名称），{b}（数据项名称），{c}（数值）, {d}（百分比）
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        // 图例
        legend: {
            // 配置图例的对齐方式: vertical => 垂直排列, horizontal => 水平排布
            orient: 'vertical',
            left: 'left',
            data: ['耐克','阿迪','新百伦','李宁','阿迪王']
        },
        // 数据项列表
        series: [
            {
                name: '品牌热销', // 系列名称
                type: 'pie', // 饼图
                radius : '55%', // 控制圆的大小
                center: ['50%', '60%'], // 控制圆心的坐标系
                data:[
                    {value:335, name:'耐克'}, // 数据项名称
                    {value:310, name:'阿迪'},
                    {value:234, name:'新百伦'},
                    {value:135, name:'李宁'},
                    {value:1548, name:'阿迪王'}
                ],
                // 额外的效果
                itemStyle: {
                    // 设置一些阴影效果
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        // shadowColor: 'rgba(0, 0, 0, 0.5)',
                        shadowColor: 'yellow'
                    }
                }
            }
        ]
    };

    // 使用刚指定的配置项和数据显示图表。
    echarts_right.setOption(option2);

});