import { lazy } from 'react';
import { HomeIcon } from 'tdesign-icons-react';

import { IRouter } from '../index';

const dashboard: IRouter[] = [
  {
    path: '/dashboard',
    meta: {
      title: '统计报表',
      Icon: HomeIcon,
    },
    children: [
      {
        path: 'base',
        Component: lazy(() => import('pages/Dashboard/Base')),
        meta: {
          title: '概览仪表盘',
        },
      },
      {
        path: 'detail',
        Component: lazy(() => import('pages/Dashboard/Detail')),
        meta: {
          title: '统计报表',
        },
      },
    ],
  },
];

export default dashboard;
