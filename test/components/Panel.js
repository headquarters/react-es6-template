import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Panel from '../../src/components/Panel';

describe('The Panel', () => {
  it('renders a text string provided as props', () => {
    const output = shallow(
      <Panel text="Howdy!" />
    );

    expect(output.text()).to.equal('Howdy!');
  });
});
