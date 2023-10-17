/** @type {import('next').NextConfig} */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const withPWA = require("next-pwa");

const config = {
    experimental: {
        appDir: true,
    },
    images: {
        domains: [
            "avatars.githubusercontent.com",
            "lh3.googleusercontent.com",
            "res.cloudinary.com",
        ],
    },
};

module.exports = withPWA({
    dest: "public",
    register: true,
    skipWaiting: true,
    runtimeCaching: require("next-pwa/cache"),
})(config);
