import React from 'react';
import { yuan } from '../components/Charts';
/** 减少使用 dangerouslySetInnerHTML */
// tips: 这种方式相较于 dangerouslySetInnerHTML 的好处就是代码更可控
export default class Yuan extends React.Component<{
  children: React.ReactText;
}> {
  main: HTMLSpanElement | undefined | null = null;

  componentDidMount() {
    this.renderToHtml();
  }

  componentDidUpdate() {
    this.renderToHtml();
  }

  renderToHtml = () => {
    const { children } = this.props;
    if (this.main) {
      this.main.innerHTML = yuan(children);
    }
  };

  render() {
    return (
      <span
        ref={(ref) => {
          this.main = ref;
        }}
      />
    );
  }
}
