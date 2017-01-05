import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Panel from '../../src/components/Panel';

describe('The Panel', () => {
  // If we're going to "reuse" props through many tests,
  // it's sometimes useful to declare them outside the scope of the tests
  // themselves. However, be aware that assigning this object
  // to a locally-scoped object and then mutating the locally-scoped one
  // can cause problems.
  let props = {
    text: 'Howdy!'
  };

  // The following two tests are order-dependent due to an object mutation bug.
  // If you swap the order, the `renders a text string` test will fail.
  // See the comments below to understand why.

  it('renders a text string provided as props', () => {
    // Use the original props object as-is, without mutation
    const output = shallow(
      <Panel {...props} />
    );

    expect(output.text()).to.equal('Howdy!');
  });

  it('renders nothing without a text string prop', () => {
    // Assign the props object to a locally-scoped object, in order to manipulate it.
    // This seems reasonable at first, but modifying `propsWithBlankText.text` modifies
    // the original `props` object because JavaScript uses a kind of weird
    // pass by reference hybrid for handling the internals of an object: http://stackoverflow.com/a/3638034/360509
    let propsWithBlankText = props;
    propsWithBlankText.text = '';

    const output = shallow(
      <Panel {...props} />
    );

    expect(output.html()).to.be.null;
  });

  // Uncomment the following test to see that it fails, despite being the exact
  // same test as the first one. This happens because the `props` object has been manipulated in
  // the previous test. `npm test` will result in 
  // AssertionError: expected '' to equal 'Howdy!'
  // + expected - actual
  //
  // +Howdy!

  // it('renders a text string provided as props, round 2', () => {
  //   // Use the original props object as-is, without mutation
  //   const output = shallow(
  //     <Panel {...props} />
  //   );
  //
  //   expect(output.text()).to.equal('Howdy!');
  // });
});
