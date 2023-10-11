/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  rewrites: async () => {
    return [
      {
        source: "/:customPage",
        destination: "/:customPage/index.html",
      }
    ]
  }
}

export default nextConfig;
