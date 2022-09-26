import type { ActionArgs, LoaderArgs, MetaFunction } from '@remix-run/node';
import { Button, Checkbox, Form, Input, Typography } from 'antd';
import { json, redirect } from '@remix-run/node';
import { Link, useActionData, useLoaderData, useSubmit } from '@remix-run/react';

import { createUserSession, getUserId } from '~/session.server';
import { verifyLogin } from '~/models/user.server';
import { safeRedirect, validateEmail } from '~/utils';

export async function loader({ request }: LoaderArgs) {
  const userId = await getUserId(request);
  if (userId) return redirect('/');
  return json({});
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const data = formData.values();
  console.log('god', request, formData, data);
  const email = formData.get('email');
  const password = formData.get('password');
  const redirectTo = safeRedirect(formData.get('redirectTo'), '/notes');
  const remember = formData.get('remember');

  if (!validateEmail(email)) {
    return json({ errors: { email: 'Email is invalid', password: null } }, { status: 400 });
  }

  if (typeof password !== 'string' || password.length === 0) {
    return json({ errors: { email: null, password: 'Password is required' } }, { status: 400 });
  }

  if (password.length < 8) {
    return json({ errors: { email: null, password: 'Password is too short' } }, { status: 400 });
  }

  const user = await verifyLogin(email, password);

  if (!user) {
    return json({ errors: { email: 'Invalid email or password', password: null } }, { status: 400 });
  }

  return createUserSession({
    request,
    userId: user.id,
    remember: remember === 'on' ? true : false,
    redirectTo,
  });
}

export const meta: MetaFunction = () => {
  return {
    title: '前端工具箱 - 登录',
  };
};

export default function LoginPage() {
  // const [searchParams] = useSearchParams();
  const loaderData = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const submit = useSubmit();

  console.log(loaderData, actionData);

  return (
    <div className="flex min-h-full flex-col justify-center">
      <div className="mx-auto w-full max-w-md px-8">
        <Typography.Title level={2}>登录</Typography.Title>
        <Form
          layout="vertical"
          onFinish={(values) => {
            console.log(values);
            submit(values, { method: 'post' });
          }}
        >
          <Form.Item label="账号" name="email">
            <Input />
          </Form.Item>
          <Form.Item label="密码" name="password">
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button block type="primary" htmlType="submit">
              登录
            </Button>
          </Form.Item>
          <Form.Item>
            <Form.Item noStyle name="remember" valuePropName="checked" initialValue={false}>
              <Checkbox>记住我</Checkbox>
            </Form.Item>

            <span style={{ float: 'right' }}>
              还没有账号？<Link to="/join">立即注册</Link>
            </span>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
