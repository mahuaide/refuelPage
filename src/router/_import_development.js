//module.exports = file => require('@/views/' + file + '.vue').default // vue-loader at least v13.0.0+
module.exports = file => () => import('@/components' + file + '.vue')
