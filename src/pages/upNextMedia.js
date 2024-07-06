import { uploadData, getUrl, remove } from 'aws-amplify/storage';
import React, { useState, useEffect } from 'react';
import { Image, Button, Table, Typography, Modal } from 'antd';
import { listUpNextMedias } from "../graphql/queries";
import {
    createUpNextMedia as createUpNextMediaMutation,
    deleteUpNextMedia as deleteUpNextMediaMutation,
} from "../graphql/mutations";
import { generateClient } from "aws-amplify/api";
import {
    Flex,
    Text,
    TextField,
    View,
    DropZone,
    Button as AmplifyButton
} from "@aws-amplify/ui-react";
const client = generateClient();

const Index = () => {
    const [data, setData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [coverImages, setCoverImages] = React.useState([]);
    const [profileImages, setProfileImages] = React.useState([]);

    const columns = [
        {
            title: 'coverImage',
            dataIndex: 'coverImage',
            width: '25%',
            editable: false,
            render: (_, record) => {
                console.log(record)
                return <Image
                    width={50}
                    src={record.coverImage}
                    preview={{
                        src: record.coverImage,
                      }}
                />
            },
        },
        {
            title: 'profileImage',
            dataIndex: 'profileImage',
            width: '25%',
            editable: false,
            render: (_, record) => {
                console.log(record)
                return <Image
                    width={50}
                    src={record.profileImage}
                    preview={{
                        src: record.profileImage,
                      }}
                />
            },
        },
        {
            title: 'title',
            dataIndex: 'title',
            width: '15%',
            editable: true,
        },
        {
            title: 'operation',
            dataIndex: 'operation',
            render: (_, record) => {
                return (
                    <span>
                        <Typography.Link
                            onClick={() => deleteUpNextMediaItem(record)}
                            style={{
                                marginRight: 8,
                            }}
                        >
                            Delete
                        </Typography.Link>
                    </span>
                );
            },
        },
    ];

    useEffect(() => {
        fetchAllUpNextMedias();
    }, [])
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
      };
    async function createUpNextMediaItem(event) {
        event.preventDefault();
        const form = new FormData(event.target);
        const data = {
            title: form.get("title"),
            coverImage: coverImages[0],
            profileImage:profileImages[0]
        };
        console.log(data)
        if (!!data.coverImage) {
            const coverImageResult = await uploadData({
                key: form.get("title")+'cover',
                data: coverImages[0]
            }).result;
            console.log('Succeeded: ', coverImageResult);
        };
        if (!!data.profileImage) {
            const profileImageResult = await uploadData({
                key: form.get("title")+'profile',
                data: profileImages[0]
            }).result;
            console.log('Succeeded: ', profileImageResult);
        };
        await client.graphql({
            query: createUpNextMediaMutation,
            variables: { input: data },
        });
        fetchAllUpNextMedias();
        setIsModalOpen(false);
        event.target.reset();
    }
    async function deleteUpNextMediaItem({ id, title }) {
        const newNotes = data.filter((note) => note.id !== id);
        setData(newNotes);
        await remove({ key: title });
        await client.graphql({
            query: deleteUpNextMediaMutation,
            variables: { input: { id } },
        });
    }
    async function fetchAllUpNextMedias() {
        const apiData = await client.graphql({ query: listUpNextMedias });
        const dataListFromAPI = apiData.data.listUpNextMedias.items;
        await Promise.all(
            dataListFromAPI.map(async (note) => {
                console.log(note)
                if (note.coverImage) {
                    const getUrlResult = await getUrl({ key: note.title+'cover' });
                    console.log(getUrlResult)
                    note.coverImage = getUrlResult.url;
                }
                if (note.profileImage) {
                    const getUrlResult = await getUrl({ key: note.title+'profile' });
                    console.log(getUrlResult)
                    note.profileImage = getUrlResult.url;
                }
                return note;
            })
        );
        setData(dataListFromAPI);
    }
    return (
        <div>
            <Button
                onClick={showModal}
                type="primary"
                style={{
                    marginBottom: 16,
                }}
            >
                Add a up next media
            </Button>
            <Table
            rowKey={record=>record.id}

                bordered
                dataSource={data}
                columns={columns}
            />
            <Modal title="Create a piece of top news" open={isModalOpen} footer={null} onCancel={handleCancel}>
                <View as="form" margin="3rem 0" onSubmit={createUpNextMediaItem}>
                    <Flex direction="column" justifyContent="center">
                        <DropZone
                            onDropComplete={({ acceptedFiles, rejectedFiles }) => {
                                setCoverImages(acceptedFiles);
                            }}
                        >
                            Drag cover image here
                        </DropZone>
                        {coverImages.map((file) => (
                            <Text key={file.name}>{file.name}</Text>
                        ))}
                        <DropZone
                            onDropComplete={({ acceptedFiles, rejectedFiles }) => {
                                setProfileImages(acceptedFiles);
                            }}
                        >
                            Drag profile image here
                        </DropZone>
                        {profileImages.map((file) => (
                            <Text key={file.name}>{file.name}</Text>
                        ))}
                        <TextField
                            name="title"
                            placeholder="UpNextMedia title"
                            label="UpNextMedia title"
                            variation="quiet"
                            labelHidden={true}
                            required
                        />

                        <AmplifyButton type="submit" variation="primary">
                            Create UpNextMedia
                        </AmplifyButton>
                    </Flex>
                </View>
            </Modal>

        </div>
    );
};

export default Index;