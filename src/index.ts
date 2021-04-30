import { debounce } from 'debounce'

export class Breakpoint {
  private static instance: Breakpoint
  private rootStyles: CSSStyleDeclaration
  private data: { breakpoint: string }
  private breakpoints: Record<string, number>
  private eventDelay: number

  constructor({ breakpoints, delay = 0 }: { breakpoints?: Array<string>|null, delay?: number } = {}) {
    if (Breakpoint.instance) return Breakpoint.instance

    this.rootStyles = window.getComputedStyle(document.documentElement)
    this.data = { breakpoint: this.current() }
    this.breakpoints = {}
    this.eventDelay = delay

    const breakpointKeyString = this.rootStyles.getPropertyValue('--breakpoint-keys')

    breakpoints ??= breakpointKeyString ? breakpointKeyString.trim().split(' ') : [ 'base', 'xs', 's', 'm', 'l', 'xl' ]
    this.breakpoints = breakpoints.reduce((result, key, index) => ({ ...result, [key]: index}), {})

    this.bindEvents()

    Breakpoint.instance = this
    Object.freeze(Breakpoint.instance)
  }

  bindEvents(): void {
    window.addEventListener('load', this.update.bind(this))
    window.addEventListener('resize', (this.eventDelay ? debounce(this.update, this.eventDelay) : this.update).bind(this))
  }

  weight(value = this.data.breakpoint): number {
    return this.breakpoints[value]
  }

  is(target: string, current = this.data.breakpoint): boolean {
    if (current === target) {
      return true
    }

    return false
  }

  min(target: string, current = this.data.breakpoint): boolean {
    if (this.weight(current) >= this.weight(target)) {
      return true
    }

    return false
  }

  max(target: string, current = this.data.breakpoint): boolean {
    if (this.weight(current) <= this.weight(target)) {
      return true
    }

    return false
  }

  emitEvent(newBreakpoint: string): void {
    const breakpointChange = new CustomEvent('breakpoint', {
      detail: {
        bp: {
          old: this.data.breakpoint,
          new: newBreakpoint,
        }
      }
    })

    window.dispatchEvent(breakpointChange)
  }

  current(): string {
    return this.rootStyles.getPropertyValue('--breakpoint').trim().replace(/^"(.*)"$/, '$1')
  }

  update(): void {
    const breakpoint = this.current()

    if (this.data.breakpoint !== breakpoint) {
      this.emitEvent(breakpoint)
      this.data.breakpoint = breakpoint
    }
  }
}

export default Breakpoint

if (module.hot) module.hot.accept()
