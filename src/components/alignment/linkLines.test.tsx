/**
 * @jest-environment jsdom
 */

import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import * as Mockito from 'ts-mockito';

import { LinkLinesComp, mapDispatchToProps } from './linkLines';
// import { AlignmentState } from '../../types';
import initialState from '../../reducers/initState.data';

Enzyme.configure({ adapter: new Adapter() });
const mockStore = configureStore([thunk]);
const store = mockStore(initialState);

describe('Link Lines Component', (): void => {
  describe('display', (): void => {
    it('can show a line', (): void => {
      const links = [{ sources: [0], targets: [1] }];
      const refDict = new Map();
      refDict.set('source-0', { current: { offsetLeft: 0, offsetTop: 0, classList: ['default'] } });
      refDict.set('target-1', { current: { offsetLeft: 1, offsetTop: 1, classList: ['default'] } });
      const wrapper = mount(
        <Provider store={store}>
          <LinkLinesComp links={links} refDict={refDict} />
        </Provider>,
      );
      const line = wrapper.find('.link-line');
      expect(line.exists()).toBeTruthy();
    });

    it('can show a grouped line, multi source', (): void => {
      const links = [{ sources: [0, 2, 4], targets: [1] }];
      const refDict = new Map();
      refDict.set('source-0', { current: { offsetLeft: 0, offsetTop: 0, classList: ['default'] } });
      refDict.set('target-1', { current: { offsetLeft: 2, offsetTop: 2, classList: ['default'] } });
      const wrapper = mount(
        <Provider store={store}>
          <LinkLinesComp links={links} refDict={refDict} />
        </Provider>,
      );
      const line = wrapper.find('.link-line');
      expect(line.exists()).toBeTruthy();
    });

    it('can show a grouped line, multi target', (): void => {
      const links = [{ sources: [0], targets: [1, 4, 8] }];
      const refDict = new Map();
      refDict.set('source-0', { current: { offsetLeft: 0, offsetTop: 0, classList: ['default'] } });
      refDict.set('target-1', { current: { offsetLeft: 1, offsetTop: 1, classList: ['default'] } });
      const wrapper = mount(
        <Provider store={store}>
          <LinkLinesComp links={links} refDict={refDict} />
        </Provider>,
      );
      const line = wrapper.find('.link-line');
      expect(line.exists()).toBeTruthy();
    });

    it('can show a grouped line, both sides', (): void => {
      const links = [{ sources: [0, 3], targets: [1, 4, 8] }];
      const refDict = new Map();
      refDict.set('source-0', { current: { offsetLeft: 0, offsetTop: 0, classList: ['default'] } });
      refDict.set('target-1', { current: { offsetLeft: 1, offsetTop: 1, classList: ['default'] } });
      const wrapper = mount(
        <Provider store={store}>
          <LinkLinesComp links={links} refDict={refDict} />
        </Provider>,
      );
      const line = wrapper.find('.link-line');
      expect(line.exists()).toBeTruthy();
    });

    it('can show a selected and grouped line', (): void => {
      const links = [{ sources: [0, 3], targets: [1, 4] }];
      const refDict = new Map();
      refDict.set('source-0', {
        current: { offsetLeft: 0, offsetTop: 0, classList: ['default', 'selected'] },
      });
      refDict.set('target-1', {
        current: { offsetLeft: 1, offsetTop: 1, classList: ['default', 'selected'] },
      });
      const wrapper = mount(
        <Provider store={store}>
          <LinkLinesComp links={links} refDict={refDict} />
        </Provider>,
      );
      const line = wrapper.find('.link-line.black');
      expect(line.exists()).toBeTruthy();
    });

    it('handles render when refs are not there yet', (): void => {
      const links = [{ sources: [0], targets: [1] }];
      const MockMap: Map<string, any> = Mockito.mock(Map);
      Mockito.when(MockMap.get('source-0'))
        .thenReturn({})
        .thenReturn({ current: { offsetLeft: 0, offsetTop: 0, classList: ['default'] } });
      Mockito.when(MockMap.get('target-1'))
        .thenReturn({})
        .thenReturn({ current: { offsetLeft: 1, offsetTop: 1, classList: ['default'] } });
      const mockedMapInstance: Map<string, any> = Mockito.instance(MockMap);
      const wrapper = mount(<LinkLinesComp links={links} refDict={mockedMapInstance} />);
      const line = wrapper.find('.link-line');

      // It has changed to re-render by its parent. Otherwise, the alignment view
      // would be crashed due to repeatedly rerender.
      expect(line.exists()).toBeFalsy();
    });

    it('handles render when refs are partially there', (): void => {
      const links = [{ sources: [0], targets: [1] }];
      const MockMap: Map<string, any> = Mockito.mock(Map);
      Mockito.when(MockMap.get('source-0'))
        .thenReturn({ current: null })
        .thenReturn({ current: { offsetLeft: 0, offsetTop: 0, classList: ['default'] } });
      Mockito.when(MockMap.get('target-1'))
        .thenReturn({ current: null })
        .thenReturn({ current: { offsetLeft: 1, offsetTop: 1, classList: ['default'] } });
      const mockedMapInstance: Map<string, any> = Mockito.instance(MockMap);

      const wrapper = mount(
        <Provider store={store}>
          <LinkLinesComp links={links} refDict={mockedMapInstance} />
        </Provider>,
      );
      const line = wrapper.find('.link-line');

      // It has changed to re-render by its parent. Otherwise, the alignment view
      // would be crashed due to repeatedly rerender.
      expect(line.exists()).toBeFalsy();
    });
  });
  describe('interaction', (): void => {
    it('can select a link line', (): void => {
      const selectLinkMock = jest.fn();
      const links = [{ sources: [0], targets: [1] }];
      const refDict = new Map();
      refDict.set('source-0', { current: { offsetLeft: 0, offsetTop: 0, classList: ['default'] } });
      refDict.set('target-1', { current: { offsetLeft: 1, offsetTop: 1, classList: ['default'] } });
      const wrapper = mount(
        <Provider store={store}>
          <LinkLinesComp links={links} refDict={refDict} selectLinkFunc={selectLinkMock} />
        </Provider>,
      );
      const line = wrapper.find('.link-line');
      line.simulate('click');
      expect(selectLinkMock).toHaveBeenCalled();
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
    it('dispatches for selectLinkFunc', (): void => {
      const dispatch = jest.fn();
      mapDispatchToProps(dispatch).selectLinkFunc();
      expect(dispatch.mock.calls[0][0]).toBeTruthy();
    });
  });
});
