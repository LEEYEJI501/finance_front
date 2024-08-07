export default {
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: 'http://192.168.0.184/orchestrator/:path*', // 서버의 실제 API 주소
        },
      ];
    },
  };