export default function findParentNodeByName(self, name) {
  if (self.$parent.$options.name === name) {
    return self.$parent
  } else {
    return findParentNodeByName(self.$parent, name)
  }
}
