/**
 * @jest-environment jsdom
 */

import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

// i18n
import { IntlProvider } from 'react-intl';
import languageObject from '../../translations/messages';

import {
  TextSegmentComp,
  mapDispatchToProps,
  mapStateToProps,
} from './textSegment';
import { TextSegmentState } from '../../types/textSegment';
import initialState from '../../reducers/initState.data';

Enzyme.configure({ adapter: new Adapter() });
const mockStore = configureStore([thunk]);
const store = mockStore(initialState);

describe('TextSegment Component', (): void => {
  describe('display', (): void => {
    it('can show a selected segment', (): void => {
      const wrapper = mount(
        <Provider store={store}>
          <IntlProvider locale="en" messages={languageObject.en}>
            <TextSegmentComp
              verseCode="01001001"
              alignmentData={{ '01001001': { links: [] } }}
              source={[{ position: 0 }]}
              target={[{ position: 0 }]}
              refName="source-0"
              linkSelected
            />
          </IntlProvider>
        </Provider>
      );
      const selectedSegments = wrapper.find('span.text-segment.selected');
      expect(selectedSegments.length).toEqual(1);
    });

    it('can show an unselected segment', (): void => {
      const wrapper = mount(
        <Provider store={store}>
          <IntlProvider locale="en" messages={languageObject.en}>
            <TextSegmentComp
              verseCode="01001001"
              alignmentData={{ '01001001': { links: [] } }}
              source={[{ position: 0 }]}
              target={[{ position: 0 }]}
              refName="source-1"
            />
          </IntlProvider>
        </Provider>
      );
      const selectedSegments = wrapper.find('span.text-segment.selected');
      expect(selectedSegments.length).toEqual(0);
    });
    it('can show a color segment', (): void => {
      const wrapper = mount(
        <Provider store={store}>
          <IntlProvider locale="en" messages={languageObject.en}>
            <TextSegmentComp
              verseCode="01001001"
              alignmentData={{ '01001001': { links: [] } }}
              source={[{ position: 0 }]}
              target={[{ position: 0 }]}
              refName="source-1"
              segment={{ color: 1, text: 'logos', group: 1 }}
            />
          </IntlProvider>
        </Provider>
      );
      const blueSegment = wrapper.find('span.text-segment.blue');
      expect(blueSegment.exists()).toBeTruthy();
    });
    it('can show a linked  source segment as disabled', (): void => {
      const wrapper = mount(
        <Provider store={store}>
          <IntlProvider locale="en" messages={languageObject.en}>
            <TextSegmentComp
              verseCode="01001001"
              alignmentData={{
                '01001001': { links: [{ sources: [0], targets: [0] }] },
              }}
              source={[{ position: 0 }]}
              target={[{ position: 0 }]}
              refName="source-0"
              segment={{ color: 1, text: 'logos', group: 1 }}
              linkSelected
            />
          </IntlProvider>
        </Provider>
      );

      const disabledSegment = wrapper.find('span.text-segment.disabled');
      expect(disabledSegment.exists()).toBeTruthy();
    });

    it('can show a linked  target segment as disabled', (): void => {
      const wrapper = mount(
        <Provider store={store}>
          <IntlProvider locale="en" messages={languageObject.en}>
            <TextSegmentComp
              verseCode="01001001"
              alignmentData={{
                '01001001': { links: [{ sources: [0], targets: [0] }] },
              }}
              source={[{ position: 0 }]}
              target={[{ position: 0 }]}
              refName="target-0"
              segment={{ color: 1, text: 'logos', group: 1 }}
              linkSelected
            />
          </IntlProvider>
        </Provider>
      );
      const disabledSegment = wrapper.find('span.text-segment.disabled');
      expect(disabledSegment.exists()).toBeTruthy();
    });
    it('can show a gloss beneath a segment', (): void => {
      const wrapper = mount(
        <Provider store={store}>
          <IntlProvider locale="en" messages={languageObject.en}>
            <TextSegmentComp
              verseCode="01001001"
              alignmentData={{ '01001001': { links: [] } }}
              source={[]}
              target={[]}
              refName="source-1"
              isLinkable
              segment={{
                text: 'word',
                english: 'word-gloss',
                group: 0,
                color: 0,
              }}
            />
          </IntlProvider>
        </Provider>
      );
      const segmentGloss = wrapper.find('.enriched-data');
      expect(segmentGloss.text()).toEqual('word-gloss');
    });
  });

  describe('interactions', (): void => {
    it('can select an unselected source segment', (): void => {
      const selectSourceTextMock = jest.fn();
      const wrapper = mount(
        <Provider store={store}>
          <IntlProvider locale="en" messages={languageObject.en}>
            <TextSegmentComp
              verseCode="01001001"
              alignmentData={{ '01001001': { links: [] } }}
              source={[{ position: 0 }]}
              target={[{ position: 0 }]}
              refName="source-1"
              selectSourceTextSegmentFunc={selectSourceTextMock}
              isLinkable
            />
          </IntlProvider>
        </Provider>
      );
      const segment = wrapper.find('span.text-segment.source-1');
      segment.simulate('click');
      expect(selectSourceTextMock).toHaveBeenCalled();
    });
    it('can select an unselected target segment', (): void => {
      const selectTargetTextMock = jest.fn();
      const wrapper = mount(
        <Provider store={store}>
          <IntlProvider locale="en" messages={languageObject.en}>
            <TextSegmentComp
              verseCode="01001001"
              alignmentData={{ '01001001': { links: [] } }}
              source={[{ position: 0 }]}
              target={[{ position: 0 }]}
              refName="target-1"
              selectTargetTextSegmentFunc={selectTargetTextMock}
              isLinkable
            />
          </IntlProvider>
        </Provider>
      );
      const segment = wrapper.find('span.text-segment.target-1');
      segment.simulate('click');
      expect(selectTargetTextMock).toHaveBeenCalled();
    });
    it('can deselect a selected source segment', (): void => {
      const deSelectSourceTextMock = jest.fn();
      const wrapper = mount(
        <Provider store={store}>
          <IntlProvider locale="en" messages={languageObject.en}>
            <TextSegmentComp
              verseCode="01001001"
              alignmentData={{ '01001001': { links: [] } }}
              source={[{ position: 0 }]}
              target={[{ position: 0 }]}
              refName="source-0"
              deSelectSourceTextSegmentFunc={deSelectSourceTextMock}
              isLinkable
            />
          </IntlProvider>
        </Provider>
      );
      const segment = wrapper.find('span.text-segment.source-0');
      segment.simulate('click');
      expect(deSelectSourceTextMock).toHaveBeenCalled();
    });
    it('can deselect a selected target segment', (): void => {
      const deSelectTargetTextMock = jest.fn();
      const wrapper = mount(
        <Provider store={store}>
          <IntlProvider locale="en" messages={languageObject.en}>
            <TextSegmentComp
              verseCode="01001001"
              alignmentData={{ '01001001': { links: [] } }}
              source={[{ position: 0 }]}
              target={[{ position: 0 }]}
              refName="target-0"
              deSelectTargetTextSegmentFunc={deSelectTargetTextMock}
              isLinkable
            />
          </IntlProvider>
        </Provider>
      );
      const segment = wrapper.find('span.text-segment.target-0');
      segment.simulate('click');
      expect(deSelectTargetTextMock).toHaveBeenCalled();
    });

    it('will not allow unlinkable source segments to be selected', (): void => {
      const selectTargetTextMock = jest.fn();
      const wrapper = mount(
        <Provider store={store}>
          <IntlProvider locale="en" messages={languageObject.en}>
            <TextSegmentComp
              verseCode="01001001"
              alignmentData={{ '01001001': { links: [] } }}
              source={[{ position: 0 }]}
              target={[{ position: 0 }]}
              refName="source-0"
              selectTargetTextSegmentFunc={selectTargetTextMock}
              isLinkable={false}
            />
          </IntlProvider>
        </Provider>
      );
      const segment = wrapper.find('span.text-segment.source-0');
      segment.simulate('click');
      expect(selectTargetTextMock).toHaveBeenCalledTimes(0);
    });
  });
  describe('mapStateToProps', (): void => {
    it('includes source selections', (): void => {
      const result: TextSegmentState = mapStateToProps(initialState);
      expect(Object.keys(result).includes('source')).toBeTruthy();
    });
    it('includes target selections', (): void => {
      const result: TextSegmentState = mapStateToProps(initialState);
      expect(Object.keys(result).includes('target')).toBeTruthy();
    });

    it('includes linkSelected', (): void => {
      const result: TextSegmentState = mapStateToProps(initialState);
      expect(Object.keys(result).includes('linkSelected')).toBeTruthy();
    });
  });

  describe('mapDispatchToProps', (): void => {
    it('dispatches for selectSourceTextSegmentFunc', (): void => {
      const dispatch = jest.fn();
      mapDispatchToProps(dispatch).selectSourceTextSegmentFunc();
      expect(dispatch.mock.calls[0][0]).toBeTruthy();
    });
    it('dispatches for selectTargetTextSegmentFunc', (): void => {
      const dispatch = jest.fn();
      mapDispatchToProps(dispatch).selectTargetTextSegmentFunc();
      expect(dispatch.mock.calls[0][0]).toBeTruthy();
    });
    it('dispatches for deSelectSourceTextSegmentFunc', (): void => {
      const dispatch = jest.fn();
      mapDispatchToProps(dispatch).deSelectSourceTextSegmentFunc();
      expect(dispatch.mock.calls[0][0]).toBeTruthy();
    });
    it('dispatches for deSelectTargetTextSegmentFunc', (): void => {
      const dispatch = jest.fn();
      mapDispatchToProps(dispatch).deSelectTargetTextSegmentFunc();
      expect(dispatch.mock.calls[0][0]).toBeTruthy();
    });

    it('dispatches for searchConcordance', (): void => {
      const dispatch = jest.fn();
      mapDispatchToProps(dispatch).searchConcordance();
      expect(dispatch.mock.calls[0][0]).toBeTruthy();
    });
  });
});
