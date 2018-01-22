import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

configure({ adapter: new Adapter() });

global.shallow = shallow;
global.mount = mount;
global.token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo4fSwiaWF0IjoxNTE2MzYzMjU2LCJleHAiOjE1MTYzNjY4NTZ9.IX6HbbD574E1fcTdRi8vDIqy7GqrIdV_QOHs-xJiGYE';

// Fail tests on any warning
// e.g prop types validatioin will make test fail
console.error = (message) => { // eslint-disable-line no-console
  throw new Error(message);
};
