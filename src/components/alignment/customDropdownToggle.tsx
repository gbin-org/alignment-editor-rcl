import React, { ReactElement } from 'react';

interface Props {
  onClick?: any;
  children?: any;
  forwardedRef?: any;
}

class CustomDropdownToggle extends React.Component<Props, {}> {
  public constructor(props: Props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  public handleClick(e: any): void {
    const { onClick } = this.props;
    e.preventDefault();

    onClick(e);
  }

  public render(): ReactElement {
    const { children } = this.props;

    return (
      <button type="button" className="btn btn-link" onClick={this.handleClick}>
        {children}
      </button>
    );
  }
}

function ForwardRefComp(props: Props, ref: any): ReactElement {
  /* eslint react/jsx-props-no-spreading: "off" */
  return <CustomDropdownToggle {...props} forwardedRef={ref} />;
}

export default React.forwardRef(ForwardRefComp);
