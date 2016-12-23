import React from 'react'
import TestUtils from 'react-addons-test-utils'
import chai from 'chai'

const should = chai.should()

import PanelContainer from '../client/js/components/panel-container'

describe('PanelContainer component', function(){
  it.only('Renders a div with className panel-container', function() {
        result.type.should.equal("div");
        result.props.className.should.equal('panel-container');
  });
})
