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
    Component: lazy(() => import('pages/NewArticle')),
  },
];

export default result;
