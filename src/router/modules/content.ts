import { lazy } from 'react';
import { ViewModuleIcon } from 'tdesign-icons-react';
import { IRouter } from '../index';

const result: IRouter[] = [
  {
    path: '/content',
    meta: {
      title: '内容管理',
      Icon: ViewModuleIcon,
    },
    children: [
      {
        path: 'article',
        Component: lazy(() => import('pages/Content/Article')),
        meta: {
          title: '文章管理',
        },
      },
      {
        path: 'category',
        Component: lazy(() => import('pages/Content/Category')),
        meta: {
          title: '分类管理',
        },
      },
      {
        path: 'tags',
        Component: lazy(() => import('pages/Content/Tags')),
        meta: { title: '标签管理' },
      },
      {
        path: 'column',
        Component: lazy(() => import('pages/Content/Column')),
        meta: { title: '专栏管理' },
      },
    ],
  },
];

export default result;
