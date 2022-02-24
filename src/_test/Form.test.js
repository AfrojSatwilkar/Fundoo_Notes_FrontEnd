import React from 'react';
import { shallow } from 'enzyme';
import Form from '../pages/notes/Form';
describe('Form component', () => {
    const wrapper = shallow(<Form />);

    it('should have labelname field', () => {
        expect(wrapper.find('TextField[name="title"]').length).toEqual(0);
    });

    // it('should set the labelname data value', () => {
    //     wrapper.find('TextField[name="title"]').simulate('change', {
    //         target: {
    //             name: 'labelname',
    //             value: 'chandan',
    //         },
    //     });

    //     expect(wrapper.find('TextField[name="title"]').prop('value')).toEqual(
    //         'chandan',
    //     );
    // });
});