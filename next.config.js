module.exports = {
    images: {
        domains: ["nfbilder.s3.eu-north-1.amazonaws.com"]
    },
}

const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
  })
  
  module.exports = withBundleAnalyzer({
    reactStrictMode: true,
  })