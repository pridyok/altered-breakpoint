import { debounce } from 'debounce'

// TODO: Fix event emitting twice if instantiated twice
export class Breakpoint {
  private static instance: Breakpoint
  private rootStyles: CSSStyleDeclaration
  private data: { breakpoint: string }
  private breakpoints: Record<string, number>
  private eventDelay: number
  private eventTarget: Window|Element

  constructor({ breakpoints, source, event = { delay: 0, target: window } }: { breakpoints?: Array<string>|null, source?: Element, event?: { delay: number, target: Window|Element } } = {}) {
    if (Breakpoint.instance) return Breakpoint.instance

    source ??= document.documentElement
    this.rootStyles = window.getComputedStyle(source)
    this.data = { breakpoint: this.current() }
    this.breakpoints = {}
    this.eventDelay = event.delay || 0
    this.eventTarget = event.target // TODO: Better defaults

    const breakpointKeyString = this.rootStyles.getPropertyValue('--breakpoint-keys')

    breakpoints ??= breakpointKeyString ? breakpointKeyString.trim().split(' ') : [ 'base', 'xs', 's', 'm', 'l', 'xl' ]
    this.breakpoints = breakpoints.reduce((result, key, index) => ({ ...result, [key]: index}), {})

    this.bindEvents()

    Breakpoint.instance = this
    // Object.freeze(Breakpoint.instance)
  }

  bindEvents(): void {
    this.eventTarget.addEventListener('load', this.update.bind(this))
    this.eventTarget.addEventListener('resize', (this.eventDelay ? debounce(this.update, this.eventDelay) : this.update).bind(this))
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
    console.log('emitting bp!')
    const breakpointChange = new CustomEvent('breakpoint', {
      detail: {
        bp: {
          old: this.data.breakpoint,
          new: newBreakpoint,
        }
      }
    })

    this.eventTarget.dispatchEvent(breakpointChange)
  }

  current(): string {
    return this.rootStyles.getPropertyValue('--breakpoint').trim().replace(/^"(.*)"$/, '$1')
  }

  update(): void {
    console.log('updating bp!')
    const breakpoint = this.current()

    if (this.data.breakpoint !== breakpoint) {
      this.emitEvent(breakpoint)
      this.data.breakpoint = breakpoint
    }
  }
}

export default Breakpoint

if (module.hot) module.hot.accept()
