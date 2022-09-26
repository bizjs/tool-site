import { Outlet, useLoaderData } from '@remix-run/react';
import { type LoaderArgs, type LinksFunction, json, redirect } from '@remix-run/server-runtime';
import { Layout } from 'antd';
import { css } from '@emotion/css';
import { getUserId } from '~/session.server';

export const links: LinksFunction = () => {
  return [];
};

type LoaderData = {
  tools: any[];
};

export async function loader({ request }: LoaderArgs) {
  const userId = await getUserId(request);
  if (!userId) {
    return redirect('/');
  }
  // const userId = await requireUserId(request);
  // const noteListItems = await getNoteListItems({ userId });
  return json({ tools: [1, 2, 3] } as LoaderData);
}

export default () => {
  const loaderData = useLoaderData<LoaderData>();
  return (
    <Layout className="h-full">
      <Layout.Header>Header</Layout.Header>
      <Layout hasSider>
        <Layout.Sider width={200} theme="light" className="h-full">
          <div className="logo">LOGO</div>
        </Layout.Sider>
        <Layout.Content className="main-content">
          <Outlet />
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

const styles = {
  leftSider: css`
    border-right: 1px solid #eee;
  `,
  layoutSearch: css`
    padding: 16px 24px;
    height: 64px;
    border-bottom: 1px solid #eee;
  `,
  toolList: css`
    height: calc(100vh - 64px);
    overflow-y: auto;
  `,
  toolItem: css`
    padding: 0 24px;
    min-height: 100px;
  `,
  mainContent: css`
    overflow-y: auto;
  `,
};
