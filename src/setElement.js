import Vue from 'vue'
import Cookies from 'js-cookie'
import delay from 'lodash/delay'
import assign from 'lodash/assign'
import isString from 'lodash/isString'
import { duration } from '@/settings'

import {
  Pagination,
  Dialog,
  Autocomplete,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Input,
  InputNumber,
  Radio,
  RadioGroup,
  RadioButton,
  Checkbox,
  CheckboxButton,
  CheckboxGroup,
  Switch,
  Select,
  Option,
  OptionGroup,
  Button,
  ButtonGroup,
  Popconfirm,
  Table,
  TableColumn,
  DatePicker,
  TimeSelect,
  TimePicker,
  Popover,
  Tooltip,
  Breadcrumb,
  BreadcrumbItem,
  Form,
  FormItem,
  Tabs,
  TabPane,
  Tag,
  Tree,
  Alert,
  Slider,
  Icon,
  Row,
  Col,
  Upload,
  Progress,
  Spinner,
  Badge,
  Card,
  Rate,
  Steps,
  Step,
  Carousel,
  CarouselItem,
  Collapse,
  CollapseItem,
  Cascader,
  ColorPicker,
  Transfer,
  Container,
  Header,
  Aside,
  Main,
  Footer,
  Timeline,
  TimelineItem,
  Link,
  Divider,
  Image,
  Calendar,
  Backtop,
  PageHeader,
  CascaderPanel,
  Loading,
  MessageBox,
  Message,
  Notification,
  Scrollbar,
  Popconfirm,
  InfiniteScroll
} from 'element-ui'
import './styles/element-variables.scss'

const { directive: loadingDirective, service: loadingService } = Loading
const msgbox = MessageBox
const msg = Message
const ntftn = Notification

const options = {
  // set element-ui default size
  size: Cookies.get('size') || 'medium'
}

Vue.use(Pagination, options)
Vue.use(Dialog, options)
Vue.use(Autocomplete, options)
Vue.use(Dropdown, options)
Vue.use(DropdownMenu, options)
Vue.use(DropdownItem, options)
Vue.use(Menu, options)
Vue.use(Submenu, options)
Vue.use(MenuItem, options)
Vue.use(MenuItemGroup, options)
Vue.use(Input, options)
Vue.use(InputNumber, options)
Vue.use(Radio, options)
Vue.use(RadioGroup, options)
Vue.use(RadioButton, options)
Vue.use(Checkbox, options)
Vue.use(CheckboxButton, options)
Vue.use(CheckboxGroup, options)
Vue.use(Switch, options)
Vue.use(Select, options)
Vue.use(Option, options)
Vue.use(OptionGroup, options)
Vue.use(Button, options)
Vue.use(ButtonGroup, options)
Vue.use(Table, options)
Vue.use(TableColumn, options)
Vue.use(Popconfirm, options)
Vue.use(DatePicker, options)
Vue.use(TimeSelect, options)
Vue.use(TimePicker, options)
Vue.use(Popover, options)
Vue.use(Tooltip, options)
Vue.use(Breadcrumb, options)
Vue.use(BreadcrumbItem, options)
Vue.use(Form, options)
Vue.use(FormItem, options)
Vue.use(Tabs, options)
Vue.use(TabPane, options)
Vue.use(Tag, options)
Vue.use(Tree, options)
Vue.use(Alert, options)
Vue.use(Slider, options)
Vue.use(Icon, options)
Vue.use(Row, options)
Vue.use(Col, options)
Vue.use(Upload, options)
Vue.use(Progress, options)
Vue.use(Spinner, options)
Vue.use(Badge, options)
Vue.use(Card, options)
Vue.use(Rate, options)
Vue.use(Steps, options)
Vue.use(Step, options)
Vue.use(Carousel, options)
Vue.use(CarouselItem, options)
Vue.use(Collapse, options)
Vue.use(CollapseItem, options)
Vue.use(Cascader, options)
Vue.use(ColorPicker, options)
Vue.use(Transfer, options)
Vue.use(Container, options)
Vue.use(Header, options)
Vue.use(Aside, options)
Vue.use(Main, options)
Vue.use(Footer, options)
Vue.use(Timeline, options)
Vue.use(TimelineItem, options)
Vue.use(Link, options)
Vue.use(Divider, options)
Vue.use(Image, options)
Vue.use(Calendar, options)
Vue.use(Backtop, options)
Vue.use(PageHeader, options)
Vue.use(CascaderPanel, options)
Vue.use(loadingDirective, options)
Vue.use(Scrollbar, options)
Vue.use(Popconfirm, options)
Vue.use(InfiniteScroll, options)

Vue.prototype.$loading = loadingService
Vue.prototype.$messageBox = msgbox
Vue.prototype.$alert = msgbox.alert
Vue.prototype.$confirm = msgbox.confirm
Vue.prototype.$prompt = msgbox.prompt
Vue.prototype.$notify = ntftn
Vue.prototype.$_message = msg

Vue.prototype.$message = function(...props) {
  const msg = assign({ duration }, ...props)
  const $message = new Vue().$_message
  props[0].delay ? delay(() => $message(msg)) : $message(msg)
}

const msgTypes = ['success', 'error', 'info', 'warning']
msgTypes.forEach(type => {
  Vue.prototype.$message[type] = (...props) => {
    const prop = props[0]
    const msg = {
      type,
      duration
    }

    // 默认只接收message，多参数使用{}
    if (isString(prop)) {
      msg.message = prop
    } else {
      assign(msg, prop)
    }

    const $message = new Vue().$_message
    prop.delay ? delay(() => $message(msg)) : $message(msg)
  }
})
