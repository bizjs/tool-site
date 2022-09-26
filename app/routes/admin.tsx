import { Outlet, useLoaderData } from '@remix-run/react';
import { type LoaderArgs, type LinksFunction, json } from '@remix-run/server-runtime';
import { Input, Layout } from 'antd';
import styles from '../styles/admin.css';

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: styles }];
};

type LoaderData = {
  tools: any[];
};

export async function loader({ request }: LoaderArgs) {
  // const userId = await requireUserId(request);
  // const noteListItems = await getNoteListItems({ userId });
  return json({ tools: [1, 2, 3] } as LoaderData);
}

console.log(styles);

export default () => {
  const loaderData = useLoaderData<LoaderData>();
  return (
    <Layout className="h-full">
      <Layout.Sider width={64} theme="light" className="h-full left-sider">
        <div className="logo">LOGO</div>
      </Layout.Sider>
      <Layout>
        <Layout.Sider width={300} theme="light">
          <div className="layout-search">
            <Input.Search placeholder="搜索开发者工具" />
          </div>
          <div className="tool-list">
            {loaderData.tools?.map((tool) => {
              return <div className="tool-item">Hello</div>;
            })}
          </div>
        </Layout.Sider>
        <Layout.Content className="main-content">
          <Outlet />
        </Layout.Content>
      </Layout>
    </Layout>
  );
};
