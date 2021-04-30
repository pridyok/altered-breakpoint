module.exports = api => {
  const presets = [
    [
      '@babel/env',
      {
        targets: '> 0.25%, not dead',
        bugfixes: true,
        corejs: '3.10',
        useBuiltIns: 'usage',
      },
    ],
  ]

  if (api.env('test')) {
    presets.push([
      '@babel/typescript',
      {
        allExtensions: true,
        isTSX: true,
      },
    ])
  }

  const plugins = [
    '@babel/plugin-syntax-dynamic-import',
    '@babel/proposal-class-properties',
  ]

  return { presets, plugins }
}
