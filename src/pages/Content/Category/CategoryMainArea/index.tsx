import { Divider, Table } from 'antd';
import React from 'react';

const CategoryMainArea: React.FC<{
  handleEdit: (categoryRecord: API.Category) => void;
  handleDelete: (categoryRecord: API.Category) => void;
  data: API.Categorys;
}> = ({ handleEdit, handleDelete, data }) => {
  const columns: any = [
    {
      title: '序号',
      dataIndex: '',
      key: 'no',
      render: (_: any, __: any, index: number) => {
        return <span>{++index}</span>;
      },
      width: '4rem',
      align: 'center',
    },
    {
      title: '分类名称',
      dataIndex: 'name',
      key: 'name',
      width: '12rem',
    },
    {
      title: '分类描述',
      dataIndex: 'description',
      key: 'description',
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
      render: (record: API.Category) => {
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

  return <Table rowKey='catid' dataSource={data} columns={columns} />;
};

export default CategoryMainArea;
