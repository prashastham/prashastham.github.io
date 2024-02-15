/** @type {import('next').NextConfig} */
const nextConfig = {
	pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
	basePath: "",
	output: "export",  // <=== enables static exports
  	reactStrictMode: true,
};

export default nextConfig;
