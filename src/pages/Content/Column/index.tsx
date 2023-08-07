import { Button, Card, Input, message, Tabs } from 'antd';
import React, { useEffect, useState } from 'react';

import Loading from '@/components/Loading';
import { deleteColById, getColumns, getCounts, newColumn } from '@/services/api/content';
import { SearchOutlined } from '@ant-design/icons';
import { useRequest } from '@umijs/max';

import ColumnMainArea from './ColumnMainArea';
import styles from './index.module.less';
import NewColumnModal from './NewColumnModal/index';

const RightOperation: React.FC<{ handleAdd: () => void }> = ({ handleAdd }) => {
  return (
    <>
      <div className={styles['right-operation']}>
        <Input
          suffix={<SearchOutlined style={{ color: 'rgba(0,0,0,.45)' }} />}
          placeholder='输入搜索内容'
        />
        <Button type='primary' onClick={() => handleAdd()}>
          新建专栏
        </Button>
      </div>
    </>
  );
};

const PageTabs: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<'add' | 'edit'>('add');
  const [initialValues, setInitialValues] = useState<API.Column>();
  const [list, setList] = useState<API.Columns>([]);
  const [count, setCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const handleEdit = (columnRecord: API.Column) => {
    console.log('[columnRecord]: ', columnRecord);
    setInitialValues(columnRecord);
    setType('edit');
    setOpen(true);
  };
  const handleAdd = () => {
    setInitialValues(undefined);
    setType('add');
    setOpen(true);
  };

  const handleDelete = async (columnRecord: API.Column) => {
    if (columnRecord.colid) {
      const res = await deleteColById(columnRecord.colid);
      if (res.code === 0) {
        message.success(res.message);
        setOpen(false);
      } else {
        message.error(res.message);
      }
      loadData();
    }
  };

  const loadData = async () => {
    const loadColumns = async () => {
      const res = await getColumns();
      if (!res.data) {
        message.error(res.message);
      }
      setList(res.data);
    };

    const loadColCount = async () => {
      const res = await getCounts('columns');
      if (res.code !== 0) {
        message.error(res.message);
      }
      setCount(res.data);
    };

    setLoading(true);
    Promise.allSettled([loadColumns(), loadColCount()]).finally(() => {
      setLoading(false);
    });
  };
  useEffect(() => {
    loadData();
  }, []);
  const onValidateFinish = async (values: any) => {
    const { colid, cover, description, name, visible } = values;
    const res = await newColumn({
      colid,
      cover,
      description,
      name,
      visible: visible ? 1 : 0,
    });
    if (res.code === 0) {
      message.success(res.message);
      setOpen(false);
    } else {
      message.error(res.message);
    }
    loadData();
  };

  return (
    <>
      <Tabs
        tabBarExtraContent={<RightOperation handleAdd={handleAdd} />}
        items={[
          {
            label: `专栏(${loading ? 'querying...' : count})`,
            key: 'essays',
            children: loading ? (
              <Loading />
            ) : (
              <ColumnMainArea
                handleDelete={handleDelete}
                handleEdit={handleEdit}
                data={list}
              />
            ),
          }, // remember to pass the key prop
        ]}
      />
      <NewColumnModal
        open={open}
        type={type}
        initialValues={initialValues}
        onValidateFinish={onValidateFinish}
        onModalClose={() => setOpen(false)}
      />
    </>
  );
};

export default () => {
  return (
    <>
      <Card>
        <PageTabs />
      </Card>
    </>
  );
};
