import React from 'react';
import { shallow } from 'enzyme';
import Login from '../pages/auth/Login';
// import Sample from '../components/Sample';

describe('Login component', () => {
    const wrapper = shallow(<Login />);

    it('should have an email field', () => {
        expect(wrapper.find('input[type="email"]').length).toEqual(1);
    });

    it('should set the email data value', () => {
        wrapper.find('input[type="email"]').simulate('change',{ 
            target: {
                name: 'email',
                value: 'email@gmail.com',
        },
            
        });

        expect(wrapper.find('input[type="email"]').prop('value')).toEqual(
            'email@gmail.com',
        );
    });

    it('should set the password data value', () => {
        wrapper.find('input[type="password"]').simulate('change', {
            target: {
                name: 'password',
                value: 'afroj@786',
                
            },
        });
        expect(wrapper.find('input[type="password"]').prop('value')).toEqual(
            'afroj@786',
        );
    });
});