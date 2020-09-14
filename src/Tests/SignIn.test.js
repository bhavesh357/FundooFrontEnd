import React from 'react';
import Enzyme, { render, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SignIn from './../Components/pages/SignIn';
import { TextField } from '@material-ui/core';
import { BrowserRouter } from 'react-router-dom';


React.useLayoutEffect = React.useEffect;
Enzyme.configure({
    adapter: new Adapter()
});

describe('Sign In', () => {
    it('Should be true', () => {
        const wrapper = shallow(<SignIn />);
        const fields = wrapper.find('Hello');
        console.log(fields);
        expect(fields).to.have.lengthOf(1);
    });
});