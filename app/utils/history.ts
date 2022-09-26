import { createBrowserHistory, createMemoryHistory } from '@remix-run/router';

const inNode = typeof document === 'undefined';

export const history = inNode ? createMemoryHistory() : createBrowserHistory({});
