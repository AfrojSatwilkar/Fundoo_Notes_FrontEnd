import React from 'react';
import { shallow } from 'enzyme';
import Register from '../pages/auth/Register';

describe('Register component', () => {
    const wrapper = shallow(<Register />);

    it('should have an email field', () => {
        expect(wrapper.find('input[type="email"]').length).toEqual(1);
    });

    it('should set the firstname data value', () => {
        wrapper.find('input[name="firstname"]').simulate('change',{ 
            target: {
                name: 'firstname',
                value: 'Afroj',
        },
            
        });

        expect(wrapper.find('input[name="firstname"]').prop('value')).toEqual(
            'Afroj',
        );
    });

    it('should set the lastname data value', () => {
        wrapper.find('input[name="lastname"]').simulate('change', {
            target: {
                name: 'lastname',
                value: 'Satwilkar',
                
            },
        });
        expect(wrapper.find('input[name="lastname"]').prop('value')).toEqual(
            'Satwilkar',
        );
    });

    it('should set the email data value', () => {
        wrapper.find('input[name="email"]').simulate('change', {
            target: {
                name: 'email',
                value: 'email@gmail.com',
                
            },
        });
        expect(wrapper.find('input[name="email"]').prop('value')).toEqual(
            'email@gmail.com',
        );
    });

    it('should set the password data value', () => {
        wrapper.find('input[name="password"]').simulate('change', {
            target: {
                name: 'password',
                value: 'Afroj@786',
                
            },
        });
        expect(wrapper.find('input[name="password"]').prop('value')).toEqual(
            'Afroj@786',
        );
    });

    it('should set the confirm password data value', () => {
        wrapper.find('input[name="confirm_password"]').simulate('change', {
            target: {
                name: 'confirm_password',
                value: 'Afroj@786',
                
            },
        });
        expect(wrapper.find('input[name="confirm_password"]').prop('value')).toEqual(
            'Afroj@786',
        );
    });
});