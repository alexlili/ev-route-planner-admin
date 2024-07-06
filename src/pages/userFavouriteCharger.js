import { getUrl } from 'aws-amplify/storage';
import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import { listFavouriteChargerLists } from "../graphql/queries";
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
        const apiData = await client.graphql({ query: listFavouriteChargerLists });
        const dataListFromAPI = apiData.data.listFavouriteChargerLists.items;

        setData(dataListFromAPI);
    }
    return (
        <div>
            <Table
            rowKey={record=>record.id}

                bordered
                dataSource={data}
                columns={columns}
            />
        </div>
    );
};

export default Index;