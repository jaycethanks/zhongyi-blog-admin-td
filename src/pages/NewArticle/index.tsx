import 'bytemd/dist/index.css';
import {
  Form,
  Row,
  Col,
  Input,
  Radio,
  Button,
  Popup,
  DatePicker,
  Select,
  Textarea,
  Avatar,
  Upload,
  MessagePlugin,
} from 'tdesign-react';
import { useState } from 'react';

import gfm from '@bytemd/plugin-gfm';
import { Editor } from '@bytemd/react';

import styles from './index.module.less';

const plugins = [gfm()];

const NewArticle = () => {
  const [content, setContent] = useState('');

  return (
    <>
      {/* 头部操作区域 */}
      <header className={styles['editor-header']}>
        {/* 左侧标题录入 */}
        <Input placeholder='起一个响亮的标题吧' />
        {/* 右侧草稿箱 + 发布 */}
        <div className={styles['btn-group']}>
          <Button>发布</Button>
        </div>
      </header>

      {/* markdown 编辑器 */}
      <div className={styles.main}>
        <Editor
          value={content}
          plugins={plugins}
          onChange={(v) => {
            setContent(v);
          }}
        />
      </div>
    </>
  );
};
export default NewArticle;
