import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import pluginChecker from "vite-plugin-checker";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), pluginChecker({ typescript: true })],
    resolve: {
        alias: {
            "@materialUI-extends": "/src/@materialUI-extends",
            "@share": "/src/@share",
            api: "/src/api",
            assets: "/src/assets",
            components: "/src/components",
            helper: "/src/helper",
            pages: "/src/pages",
            services: "/src/services",
            store: "/src/store",
            theme: "/src/theme",
            types: "/src/types",
            utils: "/src/utils",
            main: "/src/main"
        }
    },
    server: {
        port: 5178
    }
});
