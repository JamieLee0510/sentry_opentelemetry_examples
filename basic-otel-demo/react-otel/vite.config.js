import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    // eslint-disable-next-line no-undef
    const env = loadEnv(mode, process.cwd());

    return {
        plugins: [react()],
        server: {
            proxy: {
                '/v1/traces': {
                    target: env.VITE_JAEGER_API, // 使用环境变量
                    changeOrigin: true, // 修改请求头中的源为目标服务器
                    // configure: (proxy) => {
                    //     proxy.on('proxyReq', (proxyReq, req) => {
                    //         // 确保 'traceparent' 头被代理服务器转发
                    //         console.log('---req.header:', req.headers);
                    //         const traceparent = req.headers['traceparent'];
                    //         if (traceparent) {
                    //             proxyReq.setHeader('traceparent', traceparent);
                    //         }
                    //     });
                    // },
                },
            },
        },
    };
});
