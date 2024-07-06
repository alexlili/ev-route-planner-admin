import React, { useState, useEffect } from "react";
import { Table } from "antd";
import {
  listSearchLoactionLists,
  listFavouriteChargerLists,
} from "../graphql/queries";
import { generateClient } from "aws-amplify/api";
import ReactECharts from 'echarts-for-react';
import * as echarts from "echarts";
const client = generateClient();

const ChargerMap = ({ data }) => {
  // 数据处理函数
  const processData = (data) => {
    const timestamps = data.map((item) =>
      new Date(item.createdAt).toISOString()
    );

    const counts = timestamps.reduce((acc, timestamp) => {
      const date =
        timestamp.split("T")[0] +
        " " +
        timestamp.split("T")[1].split(":")[0] +
        ":00";
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});

    return {
      labels: Object.keys(counts),
      values: Object.values(counts),
    };
  };
  const { labels, values } = processData(data);

  useEffect(() => {
    const chartDom = document.getElementById("myChart");
    const myChart = echarts.init(chartDom);

    // ECharts configuration
    const option = {
      title: {
        text: "Search Frequency",
      },
      tooltip: {
        trigger: "axis",
      },
      xAxis: {
        type: "category",
        data: labels,
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: values,
          type: "line",
          smooth: true,
        },
      ],
    };

    myChart.setOption(option);

    return () => {
      myChart.dispose();
    };
  }, []);

  return <div id="myChart" style={{ width: "100%", height: "400px" }}></div>;
};
const ChartComponent = ({ data }) => {

  
    const distances = data.map(charger => charger.addressInfo ? JSON.parse(charger.addressInfo).Distance : 0);
    const locations = data.map(charger => JSON.parse(charger.addressInfo).Title);
  
    // 计算每个充电桩的出现次数
    const locationCount = {};
    locations.forEach(location => {
      locationCount[location] = (locationCount[location] || 0) + 1;
    });
  
    // 将数据转换为 echarts 需要的格式
    const barChartOptions = {
      title: {
        text: '充电桩分布情况',
      },
      tooltip: {},
      legend: {
        data: ['充电桩数量'],
      },
      xAxis: {
        type: 'category',
        data: Object.keys(locationCount),
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: '充电桩数量',
          type: 'bar',
          data: Object.values(locationCount),
        },
      ],
    };
  
    const pieChartOptions = {
      title: {
        text: '充电桩距离分布情况',
        subtext: '以距离为单位',
        left: 'center',
      },
      tooltip: {
        trigger: 'item',
      },
      legend: {
        orient: 'vertical',
        left: 'left',
      },
      series: [
        {
          name: '距离',
          type: 'pie',
          radius: '50%',
          data: distances.reduce((acc, distance) => {
            const range = Math.floor(distance / 2) * 2;
            if (!acc[range]) acc[range] = 0;
            acc[range] += 1;
            return acc;
          }, {}),
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
    };
  
    return (
      <div>
        <ReactECharts option={barChartOptions} style={{ height: '400px', width: '100%' }} />
        <ReactECharts option={pieChartOptions} style={{ height: '400px', width: '100%' }} />
      </div>
    );
  };
  const RadarChart = ({ data }) => {
    // 从数据中提取信息
    const items = data.map(item => JSON.parse(item.addressInfo));
    const titles = Array.from(new Set(items.map(item => item.Title)));
    const distances = titles.map(title => 
        Math.max(...items.filter(item => item.Title === title).map(item => item.Distance))
    );

    const option = {
        title: {
            text: '雷达图 - 充电站距离分布'
        },
        tooltip: {},
        legend: {
            data: ['距离']
        },
        radar: {
            indicator: titles.map(title => ({ name: title, max: Math.max(...distances) })),
        },
        series: [{
            name: '距离',
            type: 'radar',
            data: [{
                value: distances,
                name: '距离'
            }]
        }]
    };

    return (
        <div style={{ height: '400px' }}>
            <ReactECharts option={option} />
        </div>
    );
};

const Index = () => {
  const [data, setData] = useState([]);
  const [listFavouriteChargerListsData, setListFavouriteChargerListsData] =
    useState([]);

  const columns = [
    {
      title: "uuid",
      dataIndex: "uuid",
      width: "25%",
      editable: false,
    },
    {
      title: "addressInfo",
      dataIndex: "addressInfo",
      width: "15%",
      editable: true,
    },
  ];

  useEffect(() => {
    fetchAllFeaturedTodays();
    getListFavouriteChargerLists();
  }, []);
  const ScatterPlot = ({ data }) => {
    // 从数据中提取经纬度和距离信息
    const coordinates = data.map(item => {
        const { Latitude, Longitude, Distance } = JSON.parse(item.addressInfo);
        return [Longitude, Latitude, Distance];
    });

    const option = {
        title: {
            text: '散点图 - 充电站位置与距离'
        },
        tooltip: {},
        xAxis: {
            name: '经度',
            type: 'value',
            nameLocation: 'middle',
            nameGap: 25
        },
        yAxis: {
            name: '纬度',
            type: 'value',
            nameLocation: 'middle',
            nameGap: 35
        },
        visualMap: {
            min: Math.min(...coordinates.map(coord => coord[2])),
            max: Math.max(...coordinates.map(coord => coord[2])),
            dimension: 2,
            inRange: {
                symbolSize: [5, 30]
            },
            text: ['大距离', '小距离']
        },
        series: [{
            symbolSize: 10,
            data: coordinates,
            type: 'scatter',
            label: {
                show: true,
                formatter: params => `距离: ${params.data[2].toFixed(2)} km`,
                position: 'top'
            },
            itemStyle: {
                color: '#ff7f50'
            }
        }]
    };

    return (
        <div style={{ height: '400px' }}>
            <ReactECharts option={option} />
        </div>
    );
};


  async function fetchAllFeaturedTodays() {
    const apiData = await client.graphql({ query: listSearchLoactionLists });
    const dataListFromAPI = apiData.data.listSearchLoactionLists.items;
    setData(dataListFromAPI);
  }
  async function getListFavouriteChargerLists() {
    const apiData = await client.graphql({ query: listFavouriteChargerLists });
    const dataListFromAPI = apiData.data.listFavouriteChargerLists.items;
    setListFavouriteChargerListsData(dataListFromAPI);
  }
  return (
    <div>
        {
            data.length&& <ChargerMap data={data} />
        }
        {
            listFavouriteChargerListsData.length&&<ScatterPlot data={listFavouriteChargerListsData} />
        }
        {
            listFavouriteChargerListsData.length&&<RadarChart data={listFavouriteChargerListsData} />
        }
     
    </div>
  );
};

export default Index;
