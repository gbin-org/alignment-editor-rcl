import { ReactElement } from 'react';
import Enzyme, { mount, ReactWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

const mountRender = (component: ReactElement): ReactWrapper => {
  return mount(component);
};

export default mountRender;
