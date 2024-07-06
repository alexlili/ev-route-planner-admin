import { getUrl } from 'aws-amplify/storage';
import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import { listClickChargerLists } from "../graphql/queries";
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
        const apiData = await client.graphql({ query: listClickChargerLists });
        const dataListFromAPI = apiData.data.listClickChargerLists.items;
        await Promise.all(
            dataListFromAPI.map(async (note) => {
                console.log(note)
                if (note.backgroundImage) {
                    const getUrlResult = await getUrl({ key: note.title });
                    console.log(getUrlResult)
                    note.backgroundImage = getUrlResult.url;
                }
                return note;
            })
        );
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