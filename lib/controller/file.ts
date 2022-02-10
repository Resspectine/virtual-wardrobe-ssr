export const fileFetch: (file: Blob, url?: string) => Promise<Response> = async (file, url = 'files/upload') => {
  const formData = new FormData();

  formData.append('file', file);

  const request = await fetch(`http://localhost:3030/api/${url}`, {
    method: 'POST',
    body: formData,
    credentials: 'include',
  });

  if (request.status === 401) {
    throw new Error('Unauthorized');
  }

  return request;
};
