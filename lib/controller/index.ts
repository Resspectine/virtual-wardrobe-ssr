export const appFetch: (
  input: RequestInfo,
  init?: (Omit<RequestInit, 'body'> & { body?: Record<string, unknown> }) | undefined,
  returnBlob?: boolean
) => Promise<any> = async (input, init, returnBlob) => {
  const headers = new Headers(init?.headers);

  headers.append('Content-Type', 'application/json');

  const request = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/${input}`, {
    ...init,
    body: JSON.stringify(init?.body || undefined),
    headers,
    credentials: 'include',
  });

  if (request.status === 500) {
    throw new Error('Server error');
  }

  if (!returnBlob) {
    const body = await request.json();

    if (body.statusCode === 401 || body.statusCode === 400) {
      throw new Error(body.message);
    }

    return body;
  }

  return request.blob();
};
