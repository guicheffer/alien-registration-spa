import React from 'react'

describe('<EmailField/>', () => {
  it("has the same functionality as react's component", () => {
    expect(Object.getOwnPropertyNames(state).sort().toString())
      .toContain(Object.getOwnPropertyNames(React.Component).sort().toString())
  })

  describe('#initialize', () => {
    describe('when defaults is present', () => {
      it('picks only filters present on defaults property', () => {
        const Subject = Model.extend({ defaults: { foo: null } })
        const subject = new Subject({ foo: 'foo', bar: 'bar' })

        expect(subject.attributes.foo).toEqual('foo')
        expect(subject.attributes.bar).toBeUndefined()
      })
    })

    describe('when defaults is empty ', () => {
      it('pick all filters', () => {
        const subject = new Model({ foo: 'foo', bar: 'bar' })

        expect(subject.attributes.foo).toEqual('foo')
        expect(subject.attributes.bar).toEqual('bar')
      })
    })
  })
})
