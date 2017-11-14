import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

configure({ adapter: new Adapter() });

global.shallow = shallow;
global.mount = mount;

// Fail tests on any warning
// e.g prop types validatioin will make test fail

console.error = (message) => { // eslint-disable-line no-console
  throw new Error(message);
};
