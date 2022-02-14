export const fileFetch: (file: Blob, url?: string) => Promise<Response> = async (file, url = 'files/upload') => {
  const formData = new FormData();

  formData.append('file', file);

  try {
    const request = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/${url}`, {
      method: 'POST',
      body: formData,
      credentials: 'include',
    });

    if (request.status === 401) {
      throw new Error('Unauthorized');
    }

    return request;
  } catch (e) {
    throw new Error('File not found');
  }
};
