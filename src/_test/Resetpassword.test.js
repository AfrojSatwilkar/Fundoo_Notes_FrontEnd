import React from 'react';
import { shallow } from 'enzyme';
import Resetpassword from '../pages/auth/Resetpassword';

describe('Reset password component', () => {
    const wrapper = shallow(<Resetpassword />);

    it('should have an password field', () => {
        expect(wrapper.find('input[name="new_password"]').length).toEqual(1);
    });

    it('should set the password data value', () => {
        wrapper.find('input[name="new_password"]').simulate('change',{ 
            target: {
                name: 'new_password',
                value: 'Afroj@786',
        },
            
        });

        expect(wrapper.find('input[name="new_password"]').prop('value')).toEqual(
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