import React from 'react';
import { shallow } from 'enzyme';
import Icons from '../components/icons/Icons';
describe('Display note component', () => {
    
    const Element = () => {
        const props = Icons({});
        return <div {...props} />;
    };
    const wrapper = shallow(<Element />);
    it('should set the title data value', () => {
        wrapper.find('DateTimePickerComponent[name="reminder"]').simulate('change', {
            target: {
                value: '2022-02-02 01:02:00',
            },
        });
        expect(wrapper.find('DateTimePickerComponent').value).toEqual(
            '2022-02-02 01:02:00',
        );
    });

    // it('should set the description data value', () => {
    //     wrapper.find('input[name="description"]').simulate('change', {
    //         target: {
    //             name: 'description',
    //             value: 'hello',
                
    //         },
    //     });
    //     expect(wrapper.find('input[name="description"]').prop('value')).toEqual(
    //         'hello',
    //     );
    // });
});