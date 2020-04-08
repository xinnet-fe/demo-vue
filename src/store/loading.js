// 定义模块名
const NAMESPACE = 'loading'
// 显示mutation 同步type
const SHOW = '@@SHOW'
const HIDE = '@@HIDE'

const createLoadingPlugin = ({
  namespace = NAMESPACE,
  includes = [],
  excludes = []
} = {}) => {
  return store => {
    if (store.state[namespace]) {
      throw new Error(
        `createLoadingPlugin: ${namespace} exited in current store`
      )
    }

    // new vuex的时候注册一个模块进去
    store.registerModule(namespace, {
      namespaced: true,
      state: {
        // 定义全局loading
        global: false,
        effects: {}
      },
      // 同步方法
      mutations: {
        [SHOW](state, { payload }) {
          state.global = true
          // console.log(state.effects)
          state.effects = {
            ...state.effects,
            // 将当前的action 置为true
            [payload]: true
          }
        },
        [HIDE](state, { payload }) {
          // setTimeout(() => {
          state.global = false
          state.effects = {
            ...state.effects,
            // 将当前的action 置为false
            [payload]: false
          }
          // }, 300)
        }
      }
    })

    store.subscribeAction({
      // 发起一个action 之前会走这里
      before: action => {
        // console.log(`before action ${action.type}`)
        if (onEffect(action, includes, excludes)) {
          store.commit({ type: `${namespace}/${SHOW}`, payload: action.type })
        }
      },
      // 发起一个action 之后会走这里
      after: action => {
        // console.log(`after action ${action.type}`)
        if (onEffect(action, includes, excludes)) {
          store.commit({ type: `${namespace}/${HIDE}`, payload: action.type })
        }
      }
    })
  }
}

// 判断是否要执行
function onEffect({ type }, includes, excludes) {
  if (includes.length === 0 && excludes.length === 0) {
    return true
  }

  if (includes.length > 0) {
    return includes.indexOf(type) > -1
  }

  return excludes.length > 0 && excludes.indexOf(type) === -1
}

export default createLoadingPlugin
