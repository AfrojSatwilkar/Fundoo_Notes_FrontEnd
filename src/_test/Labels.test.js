import React from 'react';
import { shallow } from 'enzyme';
import Labels from '../components/labels/Labels';
// import Sample from '../components/Sample';

describe('Login component', () => {
    const wrapper = shallow(<Labels />);

    it('should have an labelname field', () => {
        expect(wrapper.find('input[name="labelname"]').length).toEqual(1);
    });

    it('should set the labelname data value', () => {
        wrapper.find('input[name="labelname"]').simulate('change',{ 
            target: {
                name: 'labelname',
                value: 'chandan',
        },
            
        });

        expect(wrapper.find('input[name="labelname"]').prop('value')).toEqual(
            'chandan',
        );
    });

    // it('should set the password data value', () => {
    //     wrapper.find('input[type="password"]').simulate('change', {
    //         target: {
    //             name: 'password',
    //             value: 'afroj@786',
                
    //         },
    //     });
    //     expect(wrapper.find('input[type="password"]').prop('value')).toEqual(
    //         'afroj@786',
    //     );
    // });
});