import '../index.less'
import routers from '@app/routers'
import { generatorSubRouter } from '@common/router'

export default () => {
  return generatorSubRouter(routers.one.children, '第一章')
}
