import { Outlet, useLoaderData, useNavigate } from '@remix-run/react';
import { type LoaderArgs, type LinksFunction, json } from '@remix-run/server-runtime';
import { Avatar, Input, Layout, List, PageHeader } from 'antd';
import { css } from '@emotion/css';
import type { Tool } from '~/types/entities';
import { useState } from 'react';
// import {} from '@bizjs/biz-utils';

export const links: LinksFunction = () => {
  return [];
};

type LoaderData = {
  tools: Tool[];
};

export async function loader({ request }: LoaderArgs) {
  // const userId = await requireUserId(request);
  // const noteListItems = await getNoteListItems({ userId });
  return json({
    tools: [
      { id: 'ts-run', title: '运行 TS 代码', description: '粘贴 TS 代码并在控制台运行' },
      { id: 'urlencode', title: 'URL 编码/解码', description: '对 URL 进行编码和解码，支持多次编码和解码' },
    ],
  } as LoaderData);
}

export default () => {
  const loaderData = useLoaderData<LoaderData>();
  const navigate = useNavigate();
  const [currentTool, setCurrentTool] = useState<Tool | null>(null);

  function handleToolClick(item: Tool) {
    setCurrentTool(item);
    navigate(`/tools/${item.id}`);
  }

  return (
    <Layout className="h-full" hasSider>
      <Layout.Sider width={64} theme="light" className={`h-full ${styles.leftSider}`}>
        <div className={styles.logo}>LOGO</div>
      </Layout.Sider>
      <Layout>
        <Layout.Sider width={300} theme="light" className={styles.toolCate}>
          <div className={styles.layoutSearch}>
            <Input.Search placeholder="搜索开发者工具" />
          </div>
          <List
            className={styles.toolList}
            dataSource={loaderData.tools || []}
            renderItem={(item) => {
              return (
                <List.Item key={item.id} className={styles.toolItem} onClick={() => handleToolClick(item)}>
                  <List.Item.Meta avatar={<Avatar size="large" />} title={item.title} description={item.description} />
                </List.Item>
              );
            }}
          />
        </Layout.Sider>
        <Layout.Content className={styles.mainContent}>
          {currentTool ? (
            <PageHeader
              className={styles.contentHeader}
              title={currentTool.title}
              onBack={() => {
                setCurrentTool(null);
                navigate('/');
              }}
            />
          ) : null}
          <Outlet />
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

const styles = {
  logo: css`
    text-align: center;
  `,
  leftSider: css`
    border-right: 1px solid #eee;
  `,
  layoutSearch: css`
    padding: 16px 24px;
    height: 64px;
    border-bottom: 1px solid #eee;
  `,
  toolCate: css`
    border-right: 1px solid #eee;
  `,
  toolList: css`
    height: calc(100vh - 64px);
    overflow-y: auto;
  `,
  toolItem: css`
    padding: 12px;
    cursor: pointer;
  `,
  contentHeader: css`
    background: #fff;
    height: 64px;
    border-bottom: 1px solid #eee;
    padding: 12px 24px;
  `,
  mainContent: css`
    overflow-y: auto;
  `,
};
