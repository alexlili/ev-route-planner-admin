import React, { useState, useEffect, useRef } from "react";
import { Card } from "antd";
import {
  listSearchLoactionLists,
  listFavouriteChargerLists,
  listClickChargerLists,
  listUserCarLists,
} from "../graphql/queries";
import { generateClient } from "aws-amplify/api";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";
import worldGeoJson from "../assets/custom.geo.json";
const client = generateClient();

const MapChart = ({ jsonData }) => {
  // 提取地址信息和经纬度
  const locations = jsonData.map((item) => {
    const addressInfo = JSON.parse(item.addressInfo);
    return {
      name: addressInfo.name,
      lat: addressInfo.latLng.lat,
      lng: addressInfo.latLng.lng,
    };
  });
  console.log("locations===", locations);

  useEffect(() => {
    // 初始化Echarts实例
    echarts.registerMap("world", worldGeoJson);
    const chartDom = document.getElementById("main");
    const myChart = echarts.init(chartDom);

    // 配置Echarts选项
    const option = {
      title: {
        text: "Location Map",
      },
      tooltip: {
        trigger: "item",
      },
      geo: {
        map: "world",
        roam: true,
        label: {
          emphasis: {
            show: false,
          },
        },
        itemStyle: {
          normal: {
            areaColor: "#323c48",
            borderColor: "#111",
          },
          emphasis: {
            areaColor: "#2a333d",
          },
        },
      },
      series: [
        {
          name: "Locations",
          type: "scatter",
          coordinateSystem: "geo",
          data: locations.map((location) => ({
            name: location.name,
            value: [location.lng, location.lat],
          })),
          symbolSize: 10,
          label: {
            normal: {
              formatter: "{b}",
              position: "right",
              show: false,
            },
            emphasis: {
              show: true,
            },
          },
          itemStyle: {
            normal: {
              color: "#ddb926",
            },
          },
        },
      ],
    };

    // 使用配置项和数据显示图表
    myChart.setOption(option);

    // 组件卸载时销毁图表实例
    return () => {
      myChart.dispose();
    };
  }, []);

  return <div id="main" style={{ width: "100%", height: "500px" }}></div>;
};
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
const DataAnalysis = ({ jsonData }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chart = echarts.init(chartRef.current);
    const items = jsonData;

    // Process data for visualization
    const locations = {};
    items.forEach((item) => {
      const addressInfo = JSON.parse(item.addressInfo);
      const name = addressInfo.name;
      locations[name] = (locations[name] || 0) + 1;
    });

    // Prepare data for ECharts
    const chartData = Object.entries(locations).map(([name, count]) => ({
      name,
      value: count,
    }));

    // ECharts option
    const option = {
      title: {
        text: "Search Location Analysis",
      },
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} ({d}%)",
      },
      series: [
        {
          name: "Location",
          type: "pie",
          radius: "55%",
          center: ["50%", "60%"],
          data: chartData,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
    };

    // Set option and render chart
    chart.setOption(option);

    // Clean up
    return () => {
      chart.dispose();
    };
  }, [jsonData]);

  return <div ref={chartRef} style={{ width: "100%", height: "400px" }} />;
};

const RadarChart = ({ data }) => {
  // 从数据中提取信息
  const items = data.map((item) => JSON.parse(item.addressInfo));
  const titles = Array.from(new Set(items.map((item) => item.Title)));
  const distances = titles.map((title) =>
    Math.max(
      ...items
        .filter((item) => item.Title === title)
        .map((item) => item.Distance.toFixed(2))
    )
  );

  const option = {
    title: {
      text: "Distribution of User Favourite Charging Station Distances",
      top: -5,
    },
    tooltip: {},
    legend: {
      // data: ["Distances"],
    },
    radar: {
      indicator: titles.map((title) => ({
        name: title,
        max: Math.max(...distances),
      })),
    },
    series: [
      {
        name: "Distances",
        type: "radar",
        data: [
          {
            value: distances,
            name: "Distances",
          },
        ],
      },
    ],
  };

  return (
    <div>
      <ReactECharts option={option} style={{ height: 400 }} />
    </div>
  );
};
const MapClickChargesChart = ({ jsonData }) => {
  const locations = jsonData.map((item) => {
    const addressInfo = JSON.parse(item.addressInfo);
    return {
      country: addressInfo.Country.Title,
      title: addressInfo.Title,
      lat: addressInfo.Latitude,
      lng: addressInfo.Longitude,
    };
  });
  const countryCount = locations.reduce((acc, location) => {
    acc[location.country] = (acc[location.country] || 0) + 1;
    return acc;
  }, {});

  const locationCount = locations.reduce((acc, location) => {
    const key = `${location.title}-${location.lat}-${location.lng}`;
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  const countryData = Object.keys(countryCount).map((country) => ({
    name: country,
    value: countryCount[country],
  }));

  const locationData = Object.keys(locationCount).map((key) => {
    const [title, lat, lng] = key.split("-");
    return {
      name: title,
      value: locationCount[key],
    };
  });

  const barOption = {
    title: {
      text: "Charging Station Count by Country",
    },
    tooltip: {},
    xAxis: {
      data: Object.keys(countryCount),
    },
    yAxis: {},
    series: [
      {
        name: "Count",
        type: "bar",
        data: Object.values(countryCount),
      },
    ],
  };

  const pieOption = {
    title: {
      text: "Charging Station Distribution by Country",
    },
    tooltip: {
      trigger: "item",
    },
    series: [
      {
        name: "Country",
        type: "pie",
        radius: "50%",
        data: countryData,
      },
    ],
  };

  const scatterOption = {
    title: {
      text: "Charging Station Count by Location",
    },
    tooltip: {
      trigger: "item",
    },
    xAxis: {
      type: "category",
      data: locationData.map((item) => item.name),
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: "Count",
        type: "scatter",
        data: locationData.map((item) => item.value),
      },
    ],
  };

  return (
    <div>
      <ReactECharts
        option={barOption}
        style={{ height: "400px", width: "100%" }}
      />
      <ReactECharts
        option={pieOption}
        style={{ height: "400px", width: "100%" }}
      />
      <ReactECharts
        option={scatterOption}
        style={{ height: "400px", width: "100%" }}
      />
    </div>
  );
};
const MapUserCarChart = ({ jsonData }) => {
  const cars = jsonData.map((item) => ({
    brand: item.brand,
    portType: item.portType,
    range: parseInt(item.range, 10),
  }));
  const brandCount = cars.reduce((acc, car) => {
    acc[car.brand] = (acc[car.brand] || 0) + 1;
    return acc;
  }, {});

  const portTypeCount = cars.reduce((acc, car) => {
    acc[car.portType] = (acc[car.portType] || 0) + 1;
    return acc;
  }, {});

  const totalRange = cars.reduce((acc, car) => acc + car.range, 0);
  const averageRange = totalRange / cars.length;

  const brandData = Object.keys(brandCount).map((brand) => ({
    name: brand,
    value: brandCount[brand],
  }));

  const portTypeData = Object.keys(portTypeCount).map((portType) => ({
    name: portType,
    value: portTypeCount[portType],
  }));

  const barOption = {
    title: {
      text: "Car Brand Distribution",
    },
    tooltip: {},
    xAxis: {
      data: Object.keys(brandCount),
    },
    yAxis: {},
    series: [
      {
        name: "Count",
        type: "bar",
        data: Object.values(brandCount),
      },
    ],
  };

  const pieOption = {
    title: {
      text: "Charging Port Type Distribution",
      left: "center",
    },
    tooltip: {
      trigger: "item",
    },
    series: [
      {
        name: "Port Type",
        type: "pie",
        radius: "50%",
        data: portTypeData,
      },
    ],
  };

  const rangeOption = {
    title: {
      text: "Average Car Range",
      left: "center",
    },
    tooltip: {
      trigger: "item",
    },
    xAxis: {
      type: "category",
      data: ["Average Range"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: "Range",
        type: "bar",
        data: [averageRange],
      },
    ],
  };

  return (
    <div>
      <ReactECharts
        option={barOption}
        style={{ height: "400px", width: "100%" }}
      />
      <ReactECharts
        option={pieOption}
        style={{ height: "400px", width: "100%" }}
      />
      {/* <ReactECharts option={rangeOption} style={{ height: '400px', width: '100%' }} /> */}
    </div>
  );
};

const Index = () => {
  const [data, setData] = useState([]);
  const [listFavouriteChargerListsData, setListFavouriteChargerListsData] =
    useState([]);

  const [listClickChargerListsData, setListClickChargerListsData] = useState(
    []
  );
  const [listUserCarListsData, setListUserCarListsData] = useState([]);

  useEffect(() => {
    fetchAllFeaturedTodays();
    getListFavouriteChargerLists();
    getListClickChargerLists();
    getListUserCarLists();
  }, []);

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
  async function getListClickChargerLists() {
    const apiData = await client.graphql({ query: listClickChargerLists });
    const dataListFromAPI = apiData.data.listClickChargerLists.items;
    setListClickChargerListsData(dataListFromAPI);
  }
  async function getListUserCarLists() {
    const apiData = await client.graphql({ query: listUserCarLists });
    const dataListFromAPI = apiData.data.listUserCarLists.items;
    setListUserCarListsData(dataListFromAPI);
  }

  return (
    <div>
      <Card
        title={
          <div style={{ fontSize: 24, fontWeight: "bold", color: "#1677ff" }}>
            Data Analysis from Search Locations
          </div>
        }
        bordered={true}
        style={{marginBottom:20}}
      >
        {data.length && <MapChart jsonData={data} />}
        {data.length && <DataAnalysis jsonData={data} />}
        {data.length && <ChargerMap data={data} />}
      </Card>
      <Card
        title={
          <div style={{ fontSize: 24, fontWeight: "bold", color: "#1677ff" }}>
            Data Analysis from Clicks of EV Charger
          </div>
        }
        bordered={true}
        style={{marginBottom:20}}
      >
        {listClickChargerListsData.length && (
          <MapClickChargesChart jsonData={listClickChargerListsData} />
        )}
      </Card>

      <Card
        title={
          <div style={{ fontSize: 24, fontWeight: "bold", color: "#1677ff" }}>
            Data Analysis from EVs
          </div>
        }
        bordered={true}
        style={{marginBottom:20}}
      >
        {listUserCarListsData.length && (
          <MapUserCarChart jsonData={listUserCarListsData} />
        )}
      </Card>

      <Card
        title={
          <div style={{ fontSize: 24, fontWeight: "bold", color: "#1677ff" }}>
            Data Analysis from User's Favourite EV Chargers
          </div>
        }
        bordered={true}
      >
        {listFavouriteChargerListsData.length && (
          <RadarChart data={listFavouriteChargerListsData} />
        )}
      </Card>
    </div>
  );
};

export default Index;
