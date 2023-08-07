import { Radio } from 'antd';
import React, { useEffect, useState } from 'react';

import { getCategorys } from '@/services/api/content';
import { useRequest } from '@umijs/max';

import styles from './FormItemCategory.module.less';

import type { RadioChangeEvent } from 'antd';
interface CategoryProps {
  value?: string;
  onChange?: (value: string) => void;
}
const App: React.FC<CategoryProps> = ({ value, onChange }) => {
  console.log('[value]: ', value);
  type RadioGroupOpt = {
    label: string;
    value: string;
  };
  const [options, setOptions] = useState<RadioGroupOpt[]>([]);
  const { data, error, loading } = useRequest(() => {
    return getCategorys();
  });
  useEffect(() => {
    if (data) {
      const opts = data.map((it) => ({
        label: it.name,
        value: it.catid,
      })) as RadioGroupOpt[];
      setOptions(opts);
    }
  }, [data]);

  const handleOnChange = (e: RadioChangeEvent) => {
    onChange?.(e.target.value);
    console.log(`radio checked:${e.target.value}`);
  };
  return (
    <>
      <Radio.Group
        value={value}
        onChange={handleOnChange}
        className={styles['radio-group']}
      >
        {options.map((it) => {
          return (
            <Radio.Button key={it.value} value={it.value}>
              {it.label}
            </Radio.Button>
          );
        })}
      </Radio.Group>
    </>
  );
};

export default App;
