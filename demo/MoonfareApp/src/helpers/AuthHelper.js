export const getHeaders = async () => {
  return {
    accept: 'application/json, text/plain, */*',
    'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
    authorization:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiZVgvWUdYZWhLQmxFZDVrRlpLQkZUZz09IiwiaWF0IjoxNjE5MDczOTg2LCJleHAiOjE2MTkwNzc1ODYsInN1YiI6ImF1dGhlbnRpY2F0aW9uIn0.9nsBE3QYG5IZlY3Pw_nbvA7EVj6S7p1cbieLq_vl8hI',
    'cache-control': 'no-cache',
    pragma: 'no-cache',
  };
};

export const getBaseUrl = async () => {
  return 'https://backend-dev-new.moonfare.com/';
};
