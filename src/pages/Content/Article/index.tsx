import { Card, Input, Tabs } from 'antd';
import React from 'react';

import { getCounts } from '@/services/api/content';
import { SearchOutlined } from '@ant-design/icons';
import { useRequest } from '@umijs/max';

import Drafts from './Drafts';
import Essays from './Essays';

const PageTabs: React.FC = () => {
  const { data: articleCount } = useRequest(() => {
    return getCounts('articles');
  });
  const { data: draftCount } = useRequest(() => {
    return getCounts('drafts');
  });
  const items = [
    {
      label: `文章(${articleCount ?? 'querying...'})`,
      key: 'essays',
      children: <Essays />,
    }, // remember to pass the key prop
    {
      label: `草稿箱(${draftCount ?? 'querying...'})`,
      key: 'drafts',
      children: <Drafts />,
    },
  ];
  return (
    <Tabs
      tabBarExtraContent={
        <Input
          suffix={<SearchOutlined style={{ color: 'rgba(0,0,0,.45)' }} />}
          placeholder='输入搜索内容'
        />
      }
      items={items}
    />
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
