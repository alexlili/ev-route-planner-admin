
import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import {listSearchLoactionLists } from "../graphql/queries";
import { generateClient } from "aws-amplify/api";

const client = generateClient();

const Index = () => {
    const [data, setData] = useState([]);

    const columns = [
        {
            title: 'uuid',
            dataIndex: 'uuid',
            width: '25%',
            editable: false,
        },
        {
            title: 'addressInfo',
            dataIndex: 'addressInfo',
            width: '15%',
            editable: true,
        },
        
    ];

    useEffect(() => {
        fetchAllFeaturedTodays();
    }, [])

    async function fetchAllFeaturedTodays() {
        const apiData = await client.graphql({ query: listSearchLoactionLists });
        const dataListFromAPI = apiData.data.listSearchLoactionLists.items;
        setData(dataListFromAPI);
    }
    return (
        <div>
            111
        </div>
    );
};

export default Index;