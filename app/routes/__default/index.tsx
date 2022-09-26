import { css } from '@emotion/css';

import { useOptionalUser } from '~/utils';
import { Input, Row, Col, Card } from 'antd';

export default function Index() {
  const user = useOptionalUser();
  return (
    <div>
      <Row className={styles.searchArea}>
        <Col span={12} offset={6}>
          <Input.Search size="large" placeholder="键入关键字搜索开发者工具" enterButton="点我搜索" />
        </Col>
      </Row>
      <div className={styles.favoriteArea}>
        <Card title={<span>我的收藏</span>}>
          <Card.Grid>aaa</Card.Grid>
          <Card.Grid>aaa</Card.Grid>
          <Card.Grid>aaa</Card.Grid>
          <Card.Grid>aaa</Card.Grid>
        </Card>
      </div>
    </div>
  );
}

const styles = {
  searchArea: css`
    padding-top: 120px;
  `,
  favoriteArea: css`
    padding: 24px;
  `,
};
