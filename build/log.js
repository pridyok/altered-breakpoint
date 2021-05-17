import PrettyError from 'pretty-error'
import chalk from 'chalk'

const pe = new PrettyError()

pe.filter(traceLine => {
  if (traceLine.what)
    traceLine.what = traceLine.what.replace(/(\[[^\]]+\])/g, chalk.dim('$1'))
})

pe.appendStyle({
  'pretty-error > header > title > kind': { padding: '0 1' },
  'pretty-error > header > colon': { display: 'none' },
  'pretty-error > header > message': { display: 'block', marginTop: 1 },
  'pretty-error > trace > item': {
    marginLeft: 3,
    bullet: '"<grey>-></grey>"',
    marginBottom: 0,
  },
  'pretty-error > trace > item > footer > addr': { display: 'none' },
})

export const log = (err, type = 'error') => {
  if (err.stack) {
    // Update eval-based stack trace to be compatible with pretty-error
    err.stack = err.stack.replace(
      /at [^\s]*\.*eval ?(?:\[(as [^\]]+)\])? \(eval at ([^\s\(]+) \(([^,]+)\), (<[^:]+>:[^\)]+):[\d]+\)$/gim,
      (match, p1, p2, p3, p4) => {
        return `at ${p2} [eval${p4 ? ` ${p4}` : ''}${
          p1 ? ` ${p1}` : ''
        }] (${p3})`
      },
    )
  }

  pe.appendStyle(style(type))

  return console.log(pe.render(err))
}

const palettes = {
  error: {
    primary: 'red',
    secondary: 'magenta',
  },
  warning: {
    primary: 'yellow',
    secondary: 'bright-yellow',
  },
  default: {
    primary: 'cyan',
    secondary: 'blue',
  },
}

const style = type => {
  const palette = palettes[type] || palettes.default

  return {
    'pretty-error > header > title > kind': { background: palette.primary },
    'pretty-error > header > message': { color: palette.primary },
    // 'pretty-error > trace > item > header > pointer > file': { color: palette.secondary },
    // 'pretty-error > trace > item > header > pointer > line': { color: palette.secondary },
  }
}

export default log
