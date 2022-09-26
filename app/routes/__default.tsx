import { Outlet, useLoaderData } from '@remix-run/react';
import { type LoaderArgs, type LinksFunction, json } from '@remix-run/server-runtime';
import { Input, Layout } from 'antd';
import { css } from '@emotion/css';

export const links: LinksFunction = () => {
  return [];
};

type LoaderData = {
  tools: any[];
};

export async function loader({ request }: LoaderArgs) {
  // const userId = await requireUserId(request);
  // const noteListItems = await getNoteListItems({ userId });
  return json({ tools: [1, 2, 3] } as LoaderData);
}

export default () => {
  const loaderData = useLoaderData<LoaderData>();
  return (
    <Layout className="h-full">
      <Layout.Sider width={64} theme="light" className={`h-full ${styles.leftSider}`}>
        <div className="logo">LOGO</div>
      </Layout.Sider>
      <Layout>
        <Layout.Sider width={300} theme="light">
          <div className={styles.layoutSearch}>
            <Input.Search placeholder="搜索开发者工具" />
          </div>
          <div className={styles.toolList}>
            {loaderData.tools?.map((tool) => {
              return (
                <div key={tool.toString()} className={styles.toolItem}>
                  Hello
                </div>
              );
            })}
          </div>
        </Layout.Sider>
        <Layout.Content className={styles.mainContent}>
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
