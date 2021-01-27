import autoFocus from '@/directives/autoFocus/autoFocus'

const install = function (Vue) {
  Vue.directive('autoFocus', autoFocus)
}
autoFocus.install = install
export default autoFocus