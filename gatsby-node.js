exports.onCreateBabelConfig = ({
  actions
}) => {
  if (process.env.NODE_ENV !== `production`) {
    return actions.setBabelPlugin({
      name: `babel-plugin-emotion`,
      options: {
        sourceMap: true,
      },
    })
  }
  return actions.setBabelPlugin({
    name: `babel-plugin-emotion`
  })
}

exports.onCreateWebpackConfig = ({
  actions
}) => {
  actions.setWebpackConfig({
    node: {
      console: true,
      fs: 'empty',
      net: 'empty',
      tls: 'empty'
    }
  })
}