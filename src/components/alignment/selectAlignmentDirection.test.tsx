/**
 * @jest-environment jsdom
 */

import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

// i18n
import { IntlProvider } from 'react-intl';
import languageObject from '../../translations/messages';

import { SelectAlignmentDirectionComp } from './selectAlignmentDirection';
import initialState from '../../reducers/initState.data';

Enzyme.configure({ adapter: new Adapter() });
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const store = mockStore(initialState);

describe('SelectAlignmentDirection Component', (): void => {
  describe('display TOP button', (): void => {
    it('displays right icon for normal LTR OT', (): void => {
      const clearMock = jest.fn();
      const wrapper = mount(
        <Provider store={store}>
          <IntlProvider locale="en" messages={languageObject.en}>
            <SelectAlignmentDirectionComp
              isRTL={false}
              isNTrtlAlignSource={false}
              isOTrtlAlignSource={false}
              isNTltrAlignSource={false}
              isOTltrAlignSource={false}
              isNTrtlAlignTarget={false}
              isOTrtlAlignTarget={false}
              isNTltrAlignTarget={false}
              isOTltrAlignTarget={false}
              verseCode="01001001"
              uid=""
              iconPosition="top"
              reverseAlignmentDisplay={false}
              clearLinkSelectionsFunc={clearMock}
            />
          </IntlProvider>
        </Provider>,
      );

      expect(wrapper.find('i.fas.fa-align-right').exists()).toBeTruthy();
    });

    it('display left icon for normal RTL OT', (): void => {
      const clearMock = jest.fn();
      const wrapper = mount(
        <Provider store={store}>
          <IntlProvider locale="en" messages={languageObject.en}>
            <SelectAlignmentDirectionComp
              isRTL
              isNTrtlAlignSource={false}
              isOTrtlAlignSource={false}
              isNTltrAlignSource={false}
              isOTltrAlignSource={false}
              isNTrtlAlignTarget={false}
              isOTrtlAlignTarget={false}
              isNTltrAlignTarget={false}
              isOTltrAlignTarget={false}
              verseCode="01001001"
              uid=""
              iconPosition="top"
              reverseAlignmentDisplay={false}
              clearLinkSelectionsFunc={clearMock}
            />
          </IntlProvider>
        </Provider>,
      );

      expect(wrapper.find('i.fas.fa-align-left').exists()).toBeTruthy();
    });

    it('displays right icon for normal LTR NT', (): void => {
      const clearMock = jest.fn();
      const wrapper = mount(
        <Provider store={store}>
          <IntlProvider locale="en" messages={languageObject.en}>
            <SelectAlignmentDirectionComp
              isRTL={false}
              isNTrtlAlignSource={false}
              isOTrtlAlignSource={false}
              isNTltrAlignSource={false}
              isOTltrAlignSource={false}
              isNTrtlAlignTarget={false}
              isOTrtlAlignTarget={false}
              isNTltrAlignTarget={false}
              isOTltrAlignTarget={false}
              verseCode="66001001"
              uid=""
              iconPosition="top"
              reverseAlignmentDisplay={false}
              clearLinkSelectionsFunc={clearMock}
            />
          </IntlProvider>
        </Provider>,
      );

      expect(wrapper.find('i.fas.fa-align-right').exists()).toBeTruthy();
    });

    it('display left icon for normal RTL NT', (): void => {
      const clearMock = jest.fn();
      const wrapper = mount(
        <Provider store={store}>
          <IntlProvider locale="en" messages={languageObject.en}>
            <SelectAlignmentDirectionComp
              isRTL
              isNTrtlAlignSource={false}
              isOTrtlAlignSource={false}
              isNTltrAlignSource={false}
              isOTltrAlignSource={false}
              isNTrtlAlignTarget={false}
              isOTrtlAlignTarget={false}
              isNTltrAlignTarget={false}
              isOTltrAlignTarget={false}
              verseCode="66001001"
              uid=""
              iconPosition="top"
              reverseAlignmentDisplay={false}
              clearLinkSelectionsFunc={clearMock}
            />
          </IntlProvider>
        </Provider>,
      );

      expect(wrapper.find('i.fas.fa-align-left').exists()).toBeTruthy();
    });

    it('displays left icon for normal LTR OT', (): void => {
      const clearMock = jest.fn();
      const wrapper = mount(
        <Provider store={store}>
          <IntlProvider locale="en" messages={languageObject.en}>
            <SelectAlignmentDirectionComp
              isRTL={false}
              isNTrtlAlignSource
              isOTrtlAlignSource
              isNTltrAlignSource
              isOTltrAlignSource
              isNTrtlAlignTarget
              isOTrtlAlignTarget
              isNTltrAlignTarget
              isOTltrAlignTarget
              verseCode="01001001"
              uid=""
              iconPosition="top"
              reverseAlignmentDisplay={false}
              clearLinkSelectionsFunc={clearMock}
            />
          </IntlProvider>
        </Provider>,
      );

      expect(wrapper.find('i.fas.fa-align-left').exists()).toBeTruthy();
    });

    it('display right icon for normal RTL OT', (): void => {
      const clearMock = jest.fn();
      const wrapper = mount(
        <Provider store={store}>
          <IntlProvider locale="en" messages={languageObject.en}>
            <SelectAlignmentDirectionComp
              isRTL
              isNTrtlAlignSource
              isOTrtlAlignSource
              isNTltrAlignSource
              isOTltrAlignSource
              isNTrtlAlignTarget
              isOTrtlAlignTarget
              isNTltrAlignTarget
              isOTltrAlignTarget
              verseCode="01001001"
              uid=""
              iconPosition="top"
              reverseAlignmentDisplay={false}
              clearLinkSelectionsFunc={clearMock}
            />
          </IntlProvider>
        </Provider>,
      );

      expect(wrapper.find('i.fas.fa-align-right').exists()).toBeTruthy();
    });

    it('displays left icon for normal LTR NT', (): void => {
      const clearMock = jest.fn();
      const wrapper = mount(
        <Provider store={store}>
          <IntlProvider locale="en" messages={languageObject.en}>
            <SelectAlignmentDirectionComp
              isRTL={false}
              isNTrtlAlignSource
              isOTrtlAlignSource
              isNTltrAlignSource
              isOTltrAlignSource
              isNTrtlAlignTarget
              isOTrtlAlignTarget
              isNTltrAlignTarget
              isOTltrAlignTarget
              verseCode="66001001"
              uid=""
              iconPosition="top"
              reverseAlignmentDisplay={false}
              clearLinkSelectionsFunc={clearMock}
            />
          </IntlProvider>
        </Provider>,
      );

      expect(wrapper.find('i.fas.fa-align-left').exists()).toBeTruthy();
    });

    it('display right icon for normal RTL NT', (): void => {
      const clearMock = jest.fn();
      const wrapper = mount(
        <Provider store={store}>
          <IntlProvider locale="en" messages={languageObject.en}>
            <SelectAlignmentDirectionComp
              isRTL
              isNTrtlAlignSource
              isOTrtlAlignSource
              isNTltrAlignSource
              isOTltrAlignSource
              isNTrtlAlignTarget
              isOTrtlAlignTarget
              isNTltrAlignTarget
              isOTltrAlignTarget
              verseCode="66001001"
              uid=""
              iconPosition="top"
              reverseAlignmentDisplay={false}
              clearLinkSelectionsFunc={clearMock}
            />
          </IntlProvider>
        </Provider>,
      );

      expect(wrapper.find('i.fas.fa-align-right').exists()).toBeTruthy();
    });

    it('displays left icon for normal LTR OT', (): void => {
      const clearMock = jest.fn();
      const wrapper = mount(
        <Provider store={store}>
          <IntlProvider locale="en" messages={languageObject.en}>
            <SelectAlignmentDirectionComp
              isRTL={false}
              isNTrtlAlignSource
              isOTrtlAlignSource
              isNTltrAlignSource
              isOTltrAlignSource
              isNTrtlAlignTarget
              isOTrtlAlignTarget
              isNTltrAlignTarget
              isOTltrAlignTarget
              verseCode="01001001"
              uid=""
              iconPosition="top"
              reverseAlignmentDisplay
              clearLinkSelectionsFunc={clearMock}
            />
          </IntlProvider>
        </Provider>,
      );

      expect(wrapper.find('i.fas.fa-align-left').exists()).toBeTruthy();
    });

    it('display right icon for normal RTL OT', (): void => {
      const clearMock = jest.fn();
      const wrapper = mount(
        <Provider store={store}>
          <IntlProvider locale="en" messages={languageObject.en}>
            <SelectAlignmentDirectionComp
              isRTL
              isNTrtlAlignSource
              isOTrtlAlignSource
              isNTltrAlignSource
              isOTltrAlignSource
              isNTrtlAlignTarget
              isOTrtlAlignTarget
              isNTltrAlignTarget
              isOTltrAlignTarget
              verseCode="01001001"
              uid=""
              iconPosition="top"
              reverseAlignmentDisplay
              clearLinkSelectionsFunc={clearMock}
            />
          </IntlProvider>
        </Provider>,
      );

      expect(wrapper.find('i.fas.fa-align-right').exists()).toBeTruthy();
    });

    it('displays left icon for normal LTR NT', (): void => {
      const clearMock = jest.fn();
      const wrapper = mount(
        <Provider store={store}>
          <IntlProvider locale="en" messages={languageObject.en}>
            <SelectAlignmentDirectionComp
              isRTL={false}
              isNTrtlAlignSource
              isOTrtlAlignSource
              isNTltrAlignSource
              isOTltrAlignSource
              isNTrtlAlignTarget
              isOTrtlAlignTarget
              isNTltrAlignTarget
              isOTltrAlignTarget
              verseCode="66001001"
              uid=""
              iconPosition="top"
              reverseAlignmentDisplay
              clearLinkSelectionsFunc={clearMock}
            />
          </IntlProvider>
        </Provider>,
      );

      expect(wrapper.find('i.fas.fa-align-left').exists()).toBeTruthy();
    });

    it('display right icon for normal RTL NT', (): void => {
      const clearMock = jest.fn();
      const wrapper = mount(
        <Provider store={store}>
          <IntlProvider locale="en" messages={languageObject.en}>
            <SelectAlignmentDirectionComp
              isRTL
              isNTrtlAlignSource
              isOTrtlAlignSource
              isNTltrAlignSource
              isOTltrAlignSource
              isNTrtlAlignTarget
              isOTrtlAlignTarget
              isNTltrAlignTarget
              isOTltrAlignTarget
              verseCode="66001001"
              uid=""
              iconPosition="top"
              reverseAlignmentDisplay
              clearLinkSelectionsFunc={clearMock}
            />
          </IntlProvider>
        </Provider>,
      );

      expect(wrapper.find('i.fas.fa-align-right').exists()).toBeTruthy();
    });
  });

  describe('display BOTTOM button', (): void => {
    it('displays right icon for normal LTR OT', (): void => {
      const clearMock = jest.fn();
      const wrapper = mount(
        <Provider store={store}>
          <IntlProvider locale="en" messages={languageObject.en}>
            <SelectAlignmentDirectionComp
              isRTL={false}
              isNTrtlAlignSource={false}
              isOTrtlAlignSource={false}
              isNTltrAlignSource={false}
              isOTltrAlignSource={false}
              isNTrtlAlignTarget={false}
              isOTrtlAlignTarget={false}
              isNTltrAlignTarget={false}
              isOTltrAlignTarget={false}
              verseCode="01001001"
              uid=""
              iconPosition="bottom"
              reverseAlignmentDisplay={false}
              clearLinkSelectionsFunc={clearMock}
            />
          </IntlProvider>
        </Provider>,
      );

      expect(wrapper.find('i.fas.fa-align-right').exists()).toBeTruthy();
    });

    it('display left icon for normal RTL OT', (): void => {
      const clearMock = jest.fn();
      const wrapper = mount(
        <Provider store={store}>
          <IntlProvider locale="en" messages={languageObject.en}>
            <SelectAlignmentDirectionComp
              isRTL
              isNTrtlAlignSource={false}
              isOTrtlAlignSource={false}
              isNTltrAlignSource={false}
              isOTltrAlignSource={false}
              isNTrtlAlignTarget={false}
              isOTrtlAlignTarget={false}
              isNTltrAlignTarget={false}
              isOTltrAlignTarget={false}
              verseCode="01001001"
              uid=""
              iconPosition="bottom"
              reverseAlignmentDisplay={false}
              clearLinkSelectionsFunc={clearMock}
            />
          </IntlProvider>
        </Provider>,
      );

      expect(wrapper.find('i.fas.fa-align-left').exists()).toBeTruthy();
    });

    it('displays right icon for normal LTR NT', (): void => {
      const clearMock = jest.fn();
      const wrapper = mount(
        <Provider store={store}>
          <IntlProvider locale="en" messages={languageObject.en}>
            <SelectAlignmentDirectionComp
              isRTL={false}
              isNTrtlAlignSource={false}
              isOTrtlAlignSource={false}
              isNTltrAlignSource={false}
              isOTltrAlignSource={false}
              isNTrtlAlignTarget={false}
              isOTrtlAlignTarget={false}
              isNTltrAlignTarget={false}
              isOTltrAlignTarget={false}
              verseCode="66001001"
              uid=""
              iconPosition="bottom"
              reverseAlignmentDisplay={false}
              clearLinkSelectionsFunc={clearMock}
            />
          </IntlProvider>
        </Provider>,
      );

      expect(wrapper.find('i.fas.fa-align-right').exists()).toBeTruthy();
    });

    it('display left icon for normal RTL NT', (): void => {
      const clearMock = jest.fn();
      const wrapper = mount(
        <Provider store={store}>
          <IntlProvider locale="en" messages={languageObject.en}>
            <SelectAlignmentDirectionComp
              isRTL
              isNTrtlAlignSource={false}
              isOTrtlAlignSource={false}
              isNTltrAlignSource={false}
              isOTltrAlignSource={false}
              isNTrtlAlignTarget={false}
              isOTrtlAlignTarget={false}
              isNTltrAlignTarget={false}
              isOTltrAlignTarget={false}
              verseCode="66001001"
              uid=""
              iconPosition="bottom"
              reverseAlignmentDisplay={false}
              clearLinkSelectionsFunc={clearMock}
            />
          </IntlProvider>
        </Provider>,
      );

      expect(wrapper.find('i.fas.fa-align-left').exists()).toBeTruthy();
    });

    it('displays left icon for normal LTR OT', (): void => {
      const clearMock = jest.fn();
      const wrapper = mount(
        <Provider store={store}>
          <IntlProvider locale="en" messages={languageObject.en}>
            <SelectAlignmentDirectionComp
              isRTL={false}
              isNTrtlAlignSource
              isOTrtlAlignSource
              isNTltrAlignSource
              isOTltrAlignSource
              isNTrtlAlignTarget
              isOTrtlAlignTarget
              isNTltrAlignTarget
              isOTltrAlignTarget
              verseCode="01001001"
              uid=""
              iconPosition="bottom"
              reverseAlignmentDisplay={false}
              clearLinkSelectionsFunc={clearMock}
            />
          </IntlProvider>
        </Provider>,
      );

      expect(wrapper.find('i.fas.fa-align-left').exists()).toBeTruthy();
    });

    it('display right icon for normal RTL OT', (): void => {
      const clearMock = jest.fn();
      const wrapper = mount(
        <Provider store={store}>
          <IntlProvider locale="en" messages={languageObject.en}>
            <SelectAlignmentDirectionComp
              isRTL
              isNTrtlAlignSource
              isOTrtlAlignSource
              isNTltrAlignSource
              isOTltrAlignSource
              isNTrtlAlignTarget
              isOTrtlAlignTarget
              isNTltrAlignTarget
              isOTltrAlignTarget
              verseCode="01001001"
              uid=""
              iconPosition="bottom"
              reverseAlignmentDisplay={false}
              clearLinkSelectionsFunc={clearMock}
            />
          </IntlProvider>
        </Provider>,
      );

      expect(wrapper.find('i.fas.fa-align-right').exists()).toBeTruthy();
    });

    it('displays left icon for normal LTR NT', (): void => {
      const clearMock = jest.fn();
      const wrapper = mount(
        <Provider store={store}>
          <IntlProvider locale="en" messages={languageObject.en}>
            <SelectAlignmentDirectionComp
              isRTL={false}
              isNTrtlAlignSource
              isOTrtlAlignSource
              isNTltrAlignSource
              isOTltrAlignSource
              isNTrtlAlignTarget
              isOTrtlAlignTarget
              isNTltrAlignTarget
              isOTltrAlignTarget
              verseCode="66001001"
              uid=""
              iconPosition="bottom"
              reverseAlignmentDisplay={false}
              clearLinkSelectionsFunc={clearMock}
            />
          </IntlProvider>
        </Provider>,
      );

      expect(wrapper.find('i.fas.fa-align-left').exists()).toBeTruthy();
    });

    it('display right icon for normal RTL NT', (): void => {
      const clearMock = jest.fn();
      const wrapper = mount(
        <Provider store={store}>
          <IntlProvider locale="en" messages={languageObject.en}>
            <SelectAlignmentDirectionComp
              isRTL
              isNTrtlAlignSource
              isOTrtlAlignSource
              isNTltrAlignSource
              isOTltrAlignSource
              isNTrtlAlignTarget
              isOTrtlAlignTarget
              isNTltrAlignTarget
              isOTltrAlignTarget
              verseCode="66001001"
              uid=""
              iconPosition="bottom"
              reverseAlignmentDisplay={false}
              clearLinkSelectionsFunc={clearMock}
            />
          </IntlProvider>
        </Provider>,
      );

      expect(wrapper.find('i.fas.fa-align-right').exists()).toBeTruthy();
    });

    it('displays left icon for normal LTR OT', (): void => {
      const clearMock = jest.fn();
      const wrapper = mount(
        <Provider store={store}>
          <IntlProvider locale="en" messages={languageObject.en}>
            <SelectAlignmentDirectionComp
              isRTL={false}
              isNTrtlAlignSource
              isOTrtlAlignSource
              isNTltrAlignSource
              isOTltrAlignSource
              isNTrtlAlignTarget
              isOTrtlAlignTarget
              isNTltrAlignTarget
              isOTltrAlignTarget
              verseCode="01001001"
              uid=""
              iconPosition="bottom"
              reverseAlignmentDisplay
              clearLinkSelectionsFunc={clearMock}
            />
          </IntlProvider>
        </Provider>,
      );

      expect(wrapper.find('i.fas.fa-align-left').exists()).toBeTruthy();
    });

    it('display right icon for normal RTL OT', (): void => {
      const clearMock = jest.fn();
      const wrapper = mount(
        <Provider store={store}>
          <IntlProvider locale="en" messages={languageObject.en}>
            <SelectAlignmentDirectionComp
              isRTL
              isNTrtlAlignSource
              isOTrtlAlignSource
              isNTltrAlignSource
              isOTltrAlignSource
              isNTrtlAlignTarget
              isOTrtlAlignTarget
              isNTltrAlignTarget
              isOTltrAlignTarget
              verseCode="01001001"
              uid=""
              iconPosition="bottom"
              reverseAlignmentDisplay
              clearLinkSelectionsFunc={clearMock}
            />
          </IntlProvider>
        </Provider>,
      );

      expect(wrapper.find('i.fas.fa-align-right').exists()).toBeTruthy();
    });

    it('displays left icon for normal LTR NT', (): void => {
      const clearMock = jest.fn();
      const wrapper = mount(
        <Provider store={store}>
          <IntlProvider locale="en" messages={languageObject.en}>
            <SelectAlignmentDirectionComp
              isRTL={false}
              isNTrtlAlignSource
              isOTrtlAlignSource
              isNTltrAlignSource
              isOTltrAlignSource
              isNTrtlAlignTarget
              isOTrtlAlignTarget
              isNTltrAlignTarget
              isOTltrAlignTarget
              verseCode="66001001"
              uid=""
              iconPosition="bottom"
              reverseAlignmentDisplay
              clearLinkSelectionsFunc={clearMock}
            />
          </IntlProvider>
        </Provider>,
      );

      expect(wrapper.find('i.fas.fa-align-left').exists()).toBeTruthy();
    });

    it('display right icon for normal RTL NT', (): void => {
      const clearMock = jest.fn();
      const wrapper = mount(
        <Provider store={store}>
          <IntlProvider locale="en" messages={languageObject.en}>
            <SelectAlignmentDirectionComp
              isRTL
              isNTrtlAlignSource
              isOTrtlAlignSource
              isNTltrAlignSource
              isOTltrAlignSource
              isNTrtlAlignTarget
              isOTrtlAlignTarget
              isNTltrAlignTarget
              isOTltrAlignTarget
              verseCode="66001001"
              uid=""
              iconPosition="bottom"
              reverseAlignmentDisplay
              clearLinkSelectionsFunc={clearMock}
            />
          </IntlProvider>
        </Provider>,
      );

      expect(wrapper.find('i.fas.fa-align-right').exists()).toBeTruthy();
    });
  });
});
