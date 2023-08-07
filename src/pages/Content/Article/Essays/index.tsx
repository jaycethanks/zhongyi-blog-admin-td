import { List, Space } from 'antd';
import React, { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRequest } from 'umi';

import Loading from '@/components/Loading';
import { getArticleList } from '@/services/api/content';
import {
    EyeInvisibleOutlined, EyeOutlined, LikeOutlined, MessageOutlined, ReadOutlined, StarOutlined
} from '@ant-design/icons';

import styles from './index.module.less';

// const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
//   <Space>
//     {React.createElement<{ twoToneColor: string }>((props:any)=>icon, {
//       twoToneColor: '#ff4400',
//     })}
//     {text}
//   </Space>
// );
const IconText = ({ icon, text }: { icon: ReactElement; text: string }) => (
  <Space>
    {icon}
    {text}
  </Space>
);

const Essays: React.FC = () => {
  // const [list, setList] = useState<API.Columns>([]);
  const { data, error, loading } = useRequest(() => {
    return getArticleList(1);
  });

  const navigate = useNavigate();

  const handleEdit = (artid: string) => {
    navigate('/editor/drafts/edit/' + artid);
  };
  // useEffect(() => {
  //   if (data) {
  //     setList(data);
  //   }
  // }, [data]);

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <List
      className='demo-loadmore-list'
      itemLayout='vertical'
      dataSource={data}
      renderItem={(item) => (
        <List.Item
          actions={[
            <a key='list-item-edit' onClick={() => handleEdit(item.artid)}>
              编辑
            </a>,
            [<a key='list-item-delete'>删除</a>],
            // <IconText
            //   icon={ReadOutlined}
            //   text='156'
            //   key='list-vertical-read-o'
            // />,
            <IconText
              icon={<ReadOutlined />}
              text='156'
              key='list-vertical-read-o'
            />,
            <IconText
              icon={<LikeOutlined />}
              text='156'
              key='list-vertical-like-o'
            />,
            <IconText
              icon={<MessageOutlined />}
              text='2'
              key='list-vertical-message'
            />,
            <IconText
              icon={
                item.visible ? (
                  <EyeOutlined />
                ) : (
                  <EyeInvisibleOutlined style={{ color: '#ff4d4f' }} />
                )
              }
              text=''
              key='list-vertical-message'
            />,
            item.password ? <div>阅读密码：{item.password}</div> : '',
          ]}
        >
          <List.Item.Meta
            title={
              <a
                style={{ fontWeight: 600, fontSize: '1.1rem' }}
                href='https://ant.design'
              >
                {item.title}
              </a>
            }
            description={item.description}
            avatar={
              item.cover ? (
                <div
                  className={styles['cover']}
                  style={{ backgroundImage: `url(${item.cover})` }}
                ></div>
              ) : (
                <div
                  className={styles['cover-holder']}
                  style={{
                    height: '6rem',
                    width: '12rem',
                  }}
                >
                  NO COVER
                </div>
              )
            }
          />
          {/* <div>content</div> */}
          {/* <span style={{ width: '4rem', textAlign: 'start' }}>
            {item.visible ? '可见' : '不可见'}
          </span> */}
        </List.Item>
      )}
    />
  );
};
export default Essays;
