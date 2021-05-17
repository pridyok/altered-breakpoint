import Breakpoint from '../..'

describe(
  'Breakpoint JS',
  {
    viewportWidth: 1024,
    viewportHeight: 768,
  },
  () => {
    beforeEach(() => {
      cy.visit('/')
    })

    it('Verifies viewport breakpoint values', () => {
      let breakpoint

      cy.window().then(win => {
        breakpoint =
          win.breakpoint ??
          new Breakpoint({
            source: win.document.documentElement,
            event: { target: win },
          })

        cy.spy(breakpoint, 'emitEvent')
        const rootStyles = win.getComputedStyle(win.document.documentElement)
        const sizes = {
          xl: [1920, 1080],
          base: ['iphone-6'],
        }

        function checkBreakpoint(target, index = 0) {
          cy.wrap(
            rootStyles.getPropertyValue('--breakpoint').replace(/"/g, ''),
          ).should('equal', target)
          cy.wrap(breakpoint.current()).should('equal', target)
          cy.wait(10).then(() => {
            expect(breakpoint.emitEvent).to.have.callCount(index)
          })
        }

        function checkBreakpoints(sizes) {
          let index = 0
          for (const bp in sizes) {
            cy.viewport(...sizes[bp]).then(() => {
              index++
              checkBreakpoint(bp, index)
            })
          }
        }

        checkBreakpoint('m')
        checkBreakpoints(sizes)
      })
    })
  },
)
