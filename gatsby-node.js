exports.onCreateBabelConfig = ({ actions }, pluginOptions) => {
  actions.setBabelPlugin(
    {
      name: 'babel-plugin-tailwind',
    },
    {
      name: `babel-plugin-emotion`,
      options: {
        sourceMap: process.env.NODE_ENV === `production` ? false : true,
        ...(pluginOptions ? pluginOptions : {}),
      },
    }
  )
}

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
