import { Select } from 'antd';
import React from 'react';
import { useRequest } from 'umi';

import { getTags } from '@/services/api/content';

import styles from './FormItemAddTag.module.less';

// import type { SelectProps } from 'antd';
// const options: SelectProps['options'] = [];

// for (let i = 10; i < 36; i++) {
//   options.push({
//     value: i.toString(36) + i + i,
//     label: i.toString(36) + i,
//   });
// }

interface AddtagProps {
  value?: string;
  onChange?: (value: string) => void;
}
const FormItemAddTag: React.FC<AddtagProps> = ({ value, onChange }) => {
  const { data, error, loading } = useRequest(() => {
    return getTags();
  });
  const handleChange = (value: string) => {
    console.log('[value]: ', value);
    onChange?.(value);
  };
  return (
    <Select
      value={value}
      showArrow
      mode='tags'
      style={{ width: '100%' }}
      placeholder='添加标签'
      onChange={handleChange}
      options={data}
      className={styles['select-tag']}
      fieldNames={{ label: 'name', value: 'tagid' }}
    />
  );
};

export default FormItemAddTag;
