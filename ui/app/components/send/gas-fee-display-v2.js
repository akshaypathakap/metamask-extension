const Component = require('react').Component
const h = require('react-hyperscript')
const inherits = require('util').inherits
const CurrencyDisplay = require('./currency-display')
const connect = require('../../metamask-connect')

module.exports = connect()(GasFeeDisplay)

inherits(GasFeeDisplay, Component)
function GasFeeDisplay () {
  Component.call(this)
}

GasFeeDisplay.prototype.render = function () {
  const {
    conversionRate,
    gasTotal,
    onClick,
    primaryCurrency = 'ETH',
    convertedCurrency,
    gasLoadingError,
  } = this.props

  return h('div.send-v2__gas-fee-display', [

    gasTotal
      ? h(CurrencyDisplay, {
        primaryCurrency,
        convertedCurrency,
        value: gasTotal,
        conversionRate,
        convertedPrefix: '$',
        readOnly: true,
      })
      : gasLoadingError
        ? h('div.currency-display.currency-display--message', this.props.t('setGasPrice'))
        : h('div.currency-display', this.props.t('loading')),

    h('button.sliders-icon-container', {
      onClick,
      disabled: !gasTotal && !gasLoadingError,
    }, [
      h('i.fa.fa-sliders.sliders-icon'),
    ]),

  ])
}
