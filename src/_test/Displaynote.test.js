import React from 'react';
import { shallow } from 'enzyme';
import DisplayNote from '../components/displayNote/DisplayNote';

describe('Display note component', () => {
    const wrapper = shallow(<DisplayNote />);

    // it('should have an email field', () => {
    //     expect(wrapper.find('input[type="email"]').length).toEqual(1);
    // });

    it('should set the title data value', () => {
        wrapper.find('input[name="title"]').simulate('change', {
            target: {
                name: 'title',
                value: 'afroj',
                
            },
        });
        expect(wrapper.find('input[name="title"]').prop('value')).toEqual(
            'afroj',
        );
    });

    it('should set the description data value', () => {
        wrapper.find('input[name="description"]').simulate('change', {
            target: {
                name: 'description',
                value: 'hello',
                
            },
        });
        expect(wrapper.find('input[name="description"]').prop('value')).toEqual(
            'hello',
        );
    });
});