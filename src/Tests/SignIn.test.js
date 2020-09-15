import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SignIn from './../Components/pages/SignIn';
import { Button } from '@material-ui/core';

Enzyme.configure({
    adapter: new Adapter()
});

describe('Sign In', () => {

    let wrapper;
    let button;
    beforeEach(()=>{
        wrapper = shallow(<SignIn />);
        button = wrapper.find(Button);
    })

    it('when proper email and password should be valid', () => {
        wrapper.setState({
            email:'bhavesh357357@gmail.com',
            password: 'Testing@357'
        })
        button.simulate('click');
        expect(wrapper.state('passwordInvalid')).toBe(false);
        expect(wrapper.state('emailInvalid')).toBe(false);
    });

    it('when improper email and password should be invalid', () => {
        wrapper.setState({
            email:'bhavesh357357gmail',
            password: 'testing@357'
        })
        button.simulate('click');
        expect(wrapper.state('passwordInvalid')).toBe(true);
        expect(wrapper.state('emailInvalid')).toBe(true);
    });
});