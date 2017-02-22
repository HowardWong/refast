import { Component, PropTypes } from 'react';
import isEqual from 'lodash.isequal';

export default class LogicRender extends Component {

  static propTypes = {
    action: PropTypes.string,
    awareOf: PropTypes.any,
    empty: PropTypes.bool,
    loading: PropTypes.bool,
    show: PropTypes.bool,
    children: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.array,
    ]),
  }

  static defaultProps = {
    action: null,
    awareOf: '',
    empty: false,
    loading: false,
    show: true,
    children: [],
    Loading: 'div',
    Empty: 'div',
  }

  static contextTypes = {
    host: PropTypes.any,
  }
  componentDidMount() {
    this.executeAction();
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(nextProps.awareOf, this.props.awareOf)) {
      this.executeAction();
    }
  }

  executeAction() {
    const host = this.context.host;
    const { action, awareOf } = this.props;
    if (action) {
      host.execute(action, awareOf);
    }
  }

  render() {
    let content = null;
    const {
      show,
      loading,
      empty,
      children,
      className,
      loadingProps,
      emptyProps,
      Loading,
      Empty,
    } = this.props;
    const cls = className || '';

    if (!show) {
      content = null;
    } else if (loading) {
      content = (
        <Loading className={`${cls} noflux-loading`} {...loadingProps} />
      );
    } else if (empty) {
      content = (
        <Empty className={`${cls} noflux-empty`} {...emptyProps} />
      );
    } else {
      content = (
        <div className={cls}>{children}</div>
      );
    }

    return content;
  }
}
