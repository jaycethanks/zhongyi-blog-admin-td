import { Divider, Table } from 'antd';
import React from 'react';

const TagsMainArea: React.FC<{
  handleEdit: (tagRecord: API.Tag) => void;
  handleDelete: (tagRecord: API.Tag) => void;
  data: API.Tags;
}> = ({ handleEdit, handleDelete, data }) => {
  const columns: any = [
    {
      title: '序号',
      dataIndex: '',
      key: '',
      render: (_: any, __: any, index: number) => {
        return <span>{++index}</span>;
      },
      width: '4rem',
      align: 'center',
    },
    {
      title: '标签名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '可见性',
      dataIndex: 'visible',
      key: 'visible',
      width: '6rem',
      render: (visible: boolean) => {
        return visible ? '可见' : '不可见';
      },
    },
    {
      title: '操作',
      dataIndex: '',
      key: 'x',
      width: '8rem',
      render: (record: API.Tag) => {
        return (
          <>
            <a onClick={() => handleEdit(record)}>编辑</a>
            <Divider type='vertical' />
            <a onClick={() => handleDelete(record)}>删除</a>
          </>
        );
      },
    },
  ];

  return <Table rowKey='tagid' dataSource={data} columns={columns} />;
};

export default TagsMainArea;
