import React, { Component } from 'react'

describe('<EmailField attr={...}/> and <Errors attr={...}/>', () => {
  describe('#initializeView', () => {
    let main
    let errors
    let fooTemplate
    let childTemplate

    beforeEach(() => {
      main = $('<EmailField/>').appendTo($('body'))
      fooTemplate = $('<div>foo</div>').appendTo(main)
      childTemplate = $('<div>child</div>').appendTo(main)
      errors = $('<Errors/>').appendTo(main)
    })

    afterEach(() => {
      main.remove()
    })

    it('throws error if `el` is not provided', () => {
      const FooView = View.extend({ template: fooTemplate })
      const subject = new FooView({ prerendered: true })
      const initializeView = () => subject.initializeView(View, {})
      expect(initializeView).toThrow(/'el' required for/)
    })

    it('forwards the prerendered option with the kickbox api', () => {
      let childOptions

      const FooView = View.extend({ template: fooTemplate })
      const ChildView = View.extend({
        template: childTemplate,
        initialize (options) { childOptions = options },
      })
      const parentView = new FooView({ prerendered: true })
      parentView.initializeView(ChildView, { prerendered: 'foo', el: 'foo', 'KICKBOX_ENDPOINT_URL': '/kickbox' })

      expect(childOptions.prerendered).toEqual('foo')
    })

    describe('when prerendered option is true', () => {
      it('instantiates the child view providing an `el`', () => {
        const FooView = View.extend({ template: fooTemplate })
        const ChildView = View.extend({ template: childTemplate })
        const el = errors
        const prerendered = true
        const subject = new FooView({ prerendered })
        const view = subject.initializeView(ChildView, { prerendered, el })
        expect(view.$el).toEqual(el)
      })
    })

    describe('when prerendered option is false', () => {
      it('instantiates the child view without providing an `el`', () => {
        const FooView = View.extend({ template: fooTemplate })
        const ChildView = View.extend({ template: childTemplate })
        const el = errors
        const subject = new FooView({ prerendered: false })
        const view = subject.initializeView(ChildView, { prerendered: false, el })
        expect(view.$el).not.toEqual(el)
      })
    })
  })

  describe('#initializeViews', () => {
    let main
    let errors
    let fooRegion
    let barRegion

    beforeEach(() => {
      main = $('<main/>').appendTo($('body'))
      errors = $('<div></div>').appendTo(main)
      fooRegion = $('<div>fooRegion</div>').appendTo(errors)
      barRegion = $('<div>barRegion</div>').appendTo(errors)
    })

    afterEach(() => { main.remove() })

    it('returns an array of initialized views with their region as `el`', () => {
      const SubjectView = View.extend({ initialize: () => {}, template: errors })
      const FooView = View.extend({ name: 'fooName' })
      const BarView = View.extend({ name: 'barName' })
      const views = { foo: FooView, bar: BarView }
      const fooEl = fooRegion
      const barEl = barRegion
      const regions = { foo: fooEl, bar: barEl }
      const subject = new SubjectView({ el: errors })
      const initializedViews = subject.initializeViews(views, regions, { prerendered: true })

      expect(initializedViews.foo.name).toEqual('fooName')
      expect(initializedViews.foo.$el.html()).toEqual(fooEl.html())
      expect(initializedViews.bar.name).toEqual('barName')
      expect(initializedViews.bar.$el.html()).toEqual(barEl.html())
    })

    it('initializes views with given options', () => {
      const initialize = function (options) { this.options = options }
      const FooView = View.extend({ name: 'fooName', initialize })
      const BarView = View.extend({ name: 'barName', initialize })
      const views = { foo: FooView, bar: BarView }
      const regions = { foo: 'fooRegion', bar: 'barRegion' }
      const SubjectView = View.extend({ views, regions })
      const subject = new SubjectView({ prerendered: true })
      const initializedViews = subject.initializeViews(views, regions, {
        prerendered: true,
        pudim: 'want!',
      })

      expect(initializedViews.foo.options.pudim).toEqual('want!')
      expect(initializedViews.bar.options.pudim).toEqual('want!')
    })
  })

  describe('#viewInstancesToRender', () => {
    it('sets views to be rendered into their regions on `onRender`', () => {
      const FooView = View.extend({ template: () => '<foo>' })
      const BarView = View.extend({ template: () => '<bar>' })
      const fooView = new FooView()
      const barView = new BarView()
      const views = { foo: fooView, bar: barView }
      const regions = { foo: '#fooRegion', bar: '#barRegion' }
      const template = () => '<div id="fooRegion"></div><div id="barRegion"></div>'
      const SubjectView = View.extend({ regions, template })
      const subject = new SubjectView()

      subject.viewInstancesToRender(views)
      subject.render()

      expect($(fooView.$el).parent().attr('id')).toEqual('fooRegion')
      expect($(barView.$el).parent().attr('id')).toEqual('barRegion')
    })
  })

  describe('#initialize', () => {
    const FooView = View.extend({
      views: { foo: View },
      regions: { foo: 'foo-region' },
    })
    const options = {}
    let subject

    beforeEach(() => {
      View.prototype.initializeViews = jest.fn()
      View.prototype.viewInstancesToRender = jest.fn()
      View.prototype.renderIfNotPrerendered = jest.fn()
      subject = new FooView(options)
    })

    afterEach(() => {
      View.prototype.initializeViews.mockReset()
      View.prototype.viewInstancesToRender.mockReset()
      View.prototype.renderIfNotPrerendered.mockReset()
    })


    it('calls initializeViews with its views and regions', () => {
      expect(View.prototype.initializeViews).toBeCalledWith(subject.views, subject.regions, options)
    })

    it('calls viewInstancesToRender', () => {
      expect(View.prototype.viewInstancesToRender.called)
    })

    it('calls renderIfNotPrerendered', () => {
      expect(View.prototype.renderIfNotPrerendered.called)
    })
  })

  describe('#initialize', () => {
    const FooView = View.extend({
      views: { foo: View },
      regions: { foo: 'foo-region' },
    })
    const options = {}
    let subject

    beforeEach(() => {
      View.prototype.initializeViews = jest.fn()
      View.prototype.viewInstancesToRender = jest.fn()
      View.prototype.renderIfNotPrerendered = jest.fn()
      subject = new FooView(options)
    })

    afterEach(() => {
      View.prototype.initializeViews.mockReset()
      View.prototype.viewInstancesToRender.mockReset()
      View.prototype.renderIfNotPrerendered.mockReset()
    })


    it('calls initializeViews with its views and regions', () => {
      expect(View.prototype.initializeViews).toBeCalledWith(subject.views, subject.regions, options)
    })

    it('calls viewInstancesToRender', () => {
      expect(View.prototype.viewInstancesToRender.called)
    })

    it('calls renderIfNotPrerendered', () => {
      expect(View.prototype.renderIfNotPrerendered.called)
    })
  })
})
