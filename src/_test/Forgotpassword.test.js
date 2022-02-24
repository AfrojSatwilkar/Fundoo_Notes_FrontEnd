import React from 'react';
import { shallow } from 'enzyme';
import Forgotpassword from '../pages/auth/Forgotpassword';

describe('Forgot password component', () => {
    const wrapper = shallow(<Forgotpassword />);

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
});