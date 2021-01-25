/// <reference types="Cypress" />
import React from 'react';
import { mount } from 'cypress-react-unit-test';
import { Typography } from '@material-ui/core';
import ButtonFilled from '../../src/components/Button/ButtonFilled';
import { ButtonOutlined } from 'kubera-ui';

describe('Button Filled', () => {
  it('The button is clickable', () => {
    mount(
      <ButtonFilled isPrimary handleClick={() => console.log('Handle Click')}>
        <Typography>Test</Typography>
      </ButtonFilled>
    );

    cy.get('.MuiButtonBase-root')
      .first()
      .should('be.enabled')
      .click()
      .log('Button Clicked');
  });
});
describe('Button Outline', () => {
  it('The button is disabled', () => {
    mount(
      <ButtonOutlined disabled onClick={() => console.log('Handle Click')}>
        <Typography>Test</Typography>
      </ButtonOutlined>
    );

    cy.get('.MuiButtonBase-root')
      .first()
      .should('be.disabled')
      .log('Button Disabled');
  });
  it('The button is enabled', () => {
    mount(
      <ButtonOutlined
        disabled={false}
        onClick={() => console.log('Handle Click')}
      >
        <Typography>Test</Typography>
      </ButtonOutlined>
    );
    cy.get('.MuiButtonBase-root')
      .first()
      .should('be.enabled')
      .click()
      .log('Button Clicked');
  });
});
