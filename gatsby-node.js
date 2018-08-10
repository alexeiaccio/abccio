exports.onCreateBabelConfig = ({
  actions
}) => {
  if (process.env.NODE_ENV !== `production`) {
    return actions.setBabelPlugin({
      name:  `babel-plugin-emotion`,
      options: {
        sourceMap: true,
      },
    })
  }
  return actions.setBabelPlugin({
    name:  `babel-plugin-emotion`
  })
}