import { lazy } from 'react';
import { EditIcon } from 'tdesign-icons-react';
import { IRouter } from '../index';

const result: IRouter[] = [
  {
    path: '/newArticle',
    isFullPage: true,
    meta: {
      title: '新增文章',
      Icon: EditIcon,
    },
    children: [
      {
        path: 'index',
        Component: lazy(() => import('pages/NewArticle')),
        meta: {
          title: '新增文章',
        },
      },
    ],
  },
];

export default result;
