/** @type {import('next').NextConfig} */
const nextConfig = {
  modularizeImports: {
    "recharts": {
      transform: "recharts/{{member}}",
    },
  },
}

export default nextConfig
