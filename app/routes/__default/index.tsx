import { Link, Outlet } from '@remix-run/react';

import { useOptionalUser } from '~/utils';

export default function Index() {
  const user = useOptionalUser();
  return <div style={{ height: 1600 }}>这是工具首页</div>;
}
