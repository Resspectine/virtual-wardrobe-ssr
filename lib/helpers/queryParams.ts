export const createQueryParams = (params: any): URLSearchParams => {
  const queryParams = new URLSearchParams();

  Object.entries<string>(params)
    .filter(([_, value]) => value)
    .forEach(([key, value]) => queryParams.append(key, value));

  return queryParams;
};
