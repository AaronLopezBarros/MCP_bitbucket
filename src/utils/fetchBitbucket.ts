export const fetchBitbucket = async (url: string, method: "GET" | "POST", body?: any) => {
  const email = process.env.BITBUCKET_EMAIL;
  const apiToken = process.env.BITBUCKET_API_TOKEN;
  const authHeader = Buffer.from(`${email}:${apiToken}`).toString("base64");

  const response = await fetch(url, {
    method: method,
    headers: {
      Authorization: `Basic ${authHeader}`,
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  return response;
};
