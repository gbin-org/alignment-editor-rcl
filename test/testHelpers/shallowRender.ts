import { ReactElement } from 'react';
import Enzyme, { shallow, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

const shallowRender = (component: ReactElement): ShallowWrapper => {
  return shallow(component);
};

export default shallowRender;
