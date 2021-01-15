import { ReactElement } from 'react';
import Enzyme, { mount, ReactWrapper } from 'enzyme';

// This is temporary.
// See: https://github.com/enzymejs/enzyme/issues/2429
// 01/15/2021
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });

const mountRender = (component: ReactElement): ReactWrapper => {
  return mount(component);
};

export default mountRender;
