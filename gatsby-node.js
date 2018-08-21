exports.onCreateBabelConfig = ({ actions }) =>
  actions.setBabelPlugin({
    name: 'babel-plugin-tailwind',
  })

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    node: {
      console: true,
      fs: 'empty',
      net: 'empty',
      tls: 'empty',
    },
  })
}
