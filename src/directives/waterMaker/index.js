import waterMaker from '@/directives/waterMaker/waterMaker'

const install = function (Vue) {
    Vue.directive('waterMaker', waterMaker)
}
waterMaker.install = install
export default waterMaker