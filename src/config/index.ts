const loc = window.location;
let apiURL;
let authURL;
let sockURL;
if (loc.protocol === 'https:') {
  sockURL = 'wss:';
} else {
  sockURL = 'ws:';
}
if (
  process.env.NODE_ENV.trim() === 'development' ||
  process.env.NODE_ENV.trim() === 'test'
) {
  apiURL = `${window.location.protocol}//${window.location.hostname}:8080`;
  authURL = `${window.location.protocol}//${window.location.hostname}:3000`;
  sockURL += `//${window.location.hostname}:8080`;
} else {
  authURL = '/api/auth';
  apiURL = '/chaos/api/graphql';
  sockURL += `//${loc.host}/chaos/api/graphql`;
}
export default {
  environment: process.env.NODE_ENV,
  analytics: {
    url:
      process.env.ANALYTICS_API || 'https://hub.litmuschaos.io/api/community',
  },
  auth: {
    url: process.env.AUTH_API || authURL,
  },
  grahqlEndpoint: process.env.GQL_API || apiURL,
  grahqlEndpointSubscription: process.env.GQL_API || sockURL,
};
