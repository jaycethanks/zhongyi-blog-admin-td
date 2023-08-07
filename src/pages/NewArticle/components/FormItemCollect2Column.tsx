import { Select } from 'antd';
import React from 'react';

import { getColumns } from '@/services/api/content';
import { useRequest } from '@umijs/max';

import styles from './FormItemCollect2Column.module.less';

interface ColumnProps {
  value?: string;
  onChange?: (value: string) => void;
}
const App: React.FC<ColumnProps> = ({ value, onChange }) => {
  const handleChange = (value: string) => {
    console.log('[value]: ', value);
    onChange?.(value);
  };

  const { data, error, loading } = useRequest(() => {
    return getColumns();
  });

  return (
    <Select
      value={value}
      allowClear
      onChange={handleChange}
      className={styles['form-item-column']}
      showSearch
      placeholder='选择收录至专栏'
      optionFilterProp='children'
      fieldNames={{ label: 'name', value: 'colid' }}
      filterOption={(input, option) => (option?.name ?? '').includes(input)}
      filterSort={(optionA, optionB) =>
        (optionA?.name ?? '')
          .toLowerCase()
          .localeCompare((optionB?.name ?? '').toLowerCase())
      }
      options={data}
    />
  );
};

export default App;
