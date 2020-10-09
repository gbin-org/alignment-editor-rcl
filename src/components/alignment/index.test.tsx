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

import { AlignmentComp, mapDispatchToProps, mapStateToProps } from './index';
import { AlignmentState } from '../../types';
import initialState from '../../reducers/initState.data';

Enzyme.configure({ adapter: new Adapter() });
const mockStore = configureStore([thunk]);
const store = mockStore(initialState);

describe('Alignment Component', (): void => {
  it('can show', (): void => {
    const wrapper = mount(
      <Provider store={store}>
        <IntlProvider locale="en" messages={languageObject.en}>
          <AlignmentComp
            isVisible
            verseCode="01001001"
            alignmentData={{ '01001001': { links: [] } }}
          />
        </IntlProvider>
      </Provider>
    );
    const modal = wrapper.find('div.modal-dialog');
    expect(modal.exists()).toBeTruthy();
  });

  it('can hide', (): void => {
    const wrapper = mount(<AlignmentComp isVisible={false} />);
    const modal = wrapper.find('div.modal-dialog');
    expect(modal.exists()).toBeFalsy();
  });

  it('can handle loading data', (): void => {
    const wrapper = mount(
      <Provider store={store}>
        <IntlProvider locale="en" messages={languageObject.en}>
          <AlignmentComp
            isVisible
            verseCode="01001001"
            alignmentData={{ '01001001': 'loading' }}
          />
        </IntlProvider>
      </Provider>
    );
    const modal = wrapper.find('div.modal-dialog');
    expect(modal.exists()).toBeTruthy();
    const spinner = wrapper.find('div.alignment-spinner');
    expect(spinner.exists()).toBeTruthy();
  });

  it('shows loading partial data (no source text)', (): void => {
    const wrapper = mount(
      <Provider store={store}>
        <IntlProvider locale="en" messages={languageObject.en}>
          <AlignmentComp
            isVisible
            verseCode="01001001"
            alignmentData={{ '01001001': { text: 'this is the text' } }}
          />
          ,
        </IntlProvider>
      </Provider>
    );
    const modal = wrapper.find('div.modal-dialog');
    expect(modal.exists()).toBeTruthy();
    const spinner = wrapper.find('div.alignment-spinner');
    expect(spinner.exists()).toBeTruthy();
  });

  it('shows loading partial data (no target text)', (): void => {
    const wrapper = mount(
      <Provider store={store}>
        <IntlProvider locale="en" messages={languageObject.en}>
          <AlignmentComp
            isVisible
            verseCode="01001001"
            alignmentData={{ '01001001': { sourceText: 'this is the text' } }}
          />
          ,
        </IntlProvider>
      </Provider>
    );
    const modal = wrapper.find('div.modal-dialog');
    expect(modal.exists()).toBeTruthy();
    const spinner = wrapper.find('div.alignment-spinner');
    expect(spinner.exists()).toBeTruthy();
  });

  it('can handle no data', (): void => {
    const wrapper = mount(
      <Provider store={store}>
        <IntlProvider locale="en" messages={languageObject.en}>
          <AlignmentComp
            isVisible
            verseCode="01001001"
            alignmentData={{ '01001001': {} }}
          />
        </IntlProvider>
      </Provider>
    );
    const modal = wrapper.find('div.alignment-modal');
    expect(modal.exists()).toBeTruthy();
    const modalContent = wrapper.find('div.alignment-modal-content');
    expect(modalContent.text()).toBe(
      'Something went wrong. If the problem persists, please contact the YouTranslate.Bible team.'
    );
  });

  it('shows segments when everything is there', (): void => {
    const wrapper = mount(
      <Provider store={store}>
        <IntlProvider locale="en" messages={languageObject.en}>
          <AlignmentComp
            isVisible
            verseCode="01001001"
            alignmentData={{
              '01001001': {
                sourceText: 'this is the text',
                text: 'target',
                sourceManuscriptData: ['this', 'is', 'the', 'text'],
                textSegments: ['target'],
              },
            }}
          />
        </IntlProvider>
      </Provider>
    );
    const modal = wrapper.find('div.modal-dialog');
    expect(modal.exists()).toBeTruthy();
    const segments = wrapper.find('.text-segment');
    expect(segments.exists()).toBeTruthy();
    expect(segments.length).toBe(6);
  });

  it('can verify', (): void => {
    const verifyMock = jest.fn();
    const wrapper = mount(
      <Provider store={store}>
        <IntlProvider locale="en" messages={languageObject.en}>
          <AlignmentComp
            isVisible
            verseCode="01001001"
            alignmentData={{ '01001001': 'loading' }}
            verifyAlignmentFunc={verifyMock}
          />
        </IntlProvider>
      </Provider>
    );
    const verify = wrapper.find('#verify-alignment');
    verify.simulate('click');
    expect(verifyMock).toHaveBeenCalled();
  });

  it('can verify (keyboard)', (): void => {
    const verifyMock = jest.fn();
    const wrapper = mount(
      <Provider store={store}>
        <IntlProvider locale="en" messages={languageObject.en}>
          <AlignmentComp
            isVisible
            verseCode="01001001"
            alignmentData={{ '01001001': 'loading' }}
            verifyAlignmentFunc={verifyMock}
          />
        </IntlProvider>
      </Provider>
    );
    const verify = wrapper.find('#verify-alignment');
    verify.simulate('keydown', { key: ' ' });
    expect(verifyMock).toHaveBeenCalled();
  });

  it('can close', (): void => {
    const closeMock = jest.fn();
    const uncheckMock = jest.fn();
    const openEditorMock = jest.fn();
    const fetchSuggestionMock = jest.fn();
    const updateVerseStatusMock = jest.fn();
    const wrapper = mount(
      <Provider store={store}>
        <IntlProvider locale="en" messages={languageObject.en}>
          <AlignmentComp
            isVisible
            verseCode="01001001"
            alignmentData={{ '01001001': 'loading' }}
            closeAlignmentFunc={closeMock}
            uncheckCompleteBoxFunc={uncheckMock}
            openEditorFunc={openEditorMock}
            fetchSuggestionFunc={fetchSuggestionMock}
            updateVerseStatusFunc={updateVerseStatusMock}
          />
        </IntlProvider>
      </Provider>
    );
    const close = wrapper.find('#close-alignment');
    close.simulate('click');
    expect(closeMock).toHaveBeenCalled();
  });

  it('can close (keyboard)', (): void => {
    const closeMock = jest.fn();
    const uncheckMock = jest.fn();
    const openEditorMock = jest.fn();
    const fetchSuggestionMock = jest.fn();
    const updateVerseStatusMock = jest.fn();
    const wrapper = mount(
      <Provider store={store}>
        <IntlProvider locale="en" messages={languageObject.en}>
          <AlignmentComp
            isVisible
            verseCode="01001001"
            alignmentData={{ '01001001': 'loading' }}
            closeAlignmentFunc={closeMock}
            uncheckCompleteBoxFunc={uncheckMock}
            openEditorFunc={openEditorMock}
            fetchSuggestionFunc={fetchSuggestionMock}
            updateVerseStatusFunc={updateVerseStatusMock}
          />
        </IntlProvider>
      </Provider>
    );
    const close = wrapper.find('#close-alignment');
    close.simulate('keydown', { key: ' ' });
    expect(closeMock).toHaveBeenCalled();
  });

  it('can reverse alignment display', (): void => {
    const reverseMock = jest.fn();
    const wrapper = mount(
      <Provider store={store}>
        <IntlProvider locale="en" messages={languageObject.en}>
          <AlignmentComp
            isVisible
            verseCode="01001001"
            alignmentData={{ '01001001': 'loading' }}
            reverseAlignmentDisplayFunc={reverseMock}
          />
        </IntlProvider>
      </Provider>
    );
    const reverse = wrapper.find('i.reverse');
    reverse.simulate('click');
    expect(reverseMock).toHaveBeenCalled();
  });

  it('can reverse alignment display (keyboard)', (): void => {
    const reverseMock = jest.fn();
    const wrapper = mount(
      <Provider store={store}>
        <IntlProvider locale="en" messages={languageObject.en}>
          <AlignmentComp
            isVisible
            verseCode="01001001"
            alignmentData={{ '01001001': 'loading' }}
            reverseAlignmentDisplayFunc={reverseMock}
          />
        </IntlProvider>
      </Provider>
    );
    const reverse = wrapper.find('i.reverse');
    reverse.simulate('keydown', { key: ' ' });
    expect(reverseMock).toHaveBeenCalled();
  });

  it('can clear selection', (): void => {
    const clearMock = jest.fn();
    const wrapper = mount(
      <Provider store={store}>
        <IntlProvider locale="en" messages={languageObject.en}>
          <AlignmentComp
            isVisible
            verseCode="01001001"
            alignmentData={{ '01001001': 'loading' }}
            clearLinkSelectionsFunc={clearMock}
          />
        </IntlProvider>
      </Provider>
    );
    const clear = wrapper.find('i.clear');
    clear.simulate('click');
    expect(clearMock).toHaveBeenCalled();
  });

  describe('link creation', (): void => {
    it('creates a link (keyboard)', (): void => {
      const addLinkMock = jest.fn();
      const wrapper = mount(
        <Provider store={store}>
          <IntlProvider locale="en" messages={languageObject.en}>
            <AlignmentComp
              isVisible
              verseCode="01001001"
              target={[{ position: 0 }]}
              source={[{ position: 0 }]}
              alignmentData={{
                '01001001': {
                  sourceText: 'this is the text',
                  text: 'target',
                  sourceTextSegments: ['this', 'is', 'the', 'text'],
                  textSegments: ['target'],
                },
              }}
              addLinkFunc={addLinkMock}
            />
          </IntlProvider>
        </Provider>
      );
      wrapper.simulate('keydown', { key: ' ' });
      expect(addLinkMock).toHaveBeenCalled();
    });

    it('does not create a link (isReadOnly, keyboard)', (): void => {
      const addLinkMock = jest.fn();
      const wrapper = mount(
        <Provider store={store}>
          <IntlProvider locale="en" messages={languageObject.en}>
            <AlignmentComp
              isVisible
              verseCode="01001001"
              target={[{ position: 0 }]}
              source={[{ position: 0 }]}
              isReadOnly
              alignmentData={{
                '01001001': {
                  sourceText: 'this is the text',
                  text: 'target',
                  sourceTextSegments: ['this', 'is', 'the', 'text'],
                  textSegments: ['target'],
                },
              }}
              addLinkFunc={addLinkMock}
            />
          </IntlProvider>
        </Provider>
      );
      wrapper.simulate('keydown', { key: ' ' });
      expect(addLinkMock).toHaveBeenCalledTimes(0);
    });

    it('does not create a link (keyboard, weird input)', (): void => {
      const addLinkMock = jest.fn();
      const wrapper = mount(
        <Provider store={store}>
          <IntlProvider locale="en" messages={languageObject.en}>
            <AlignmentComp
              isVisible
              verseCode="01001001"
              target={[{ position: 0 }]}
              source={[{ position: 0 }]}
              alignmentData={{
                '01001001': {
                  sourceText: 'this is the text',
                  text: 'target',
                  sourceTextSegments: ['this', 'is', 'the', 'text'],
                  textSegments: ['target'],
                },
              }}
              addLinkFunc={addLinkMock}
            />
          </IntlProvider>
        </Provider>
      );
      wrapper.simulate('keydown', { key: 'a' });
      expect(addLinkMock).toHaveBeenCalledTimes(0);
    });

    it('does not create link if there is 1 source only selected (keyboard)', (): void => {
      const addLinkMock = jest.fn();
      const wrapper = mount(
        <Provider store={store}>
          <IntlProvider locale="en" messages={languageObject.en}>
            <AlignmentComp
              isVisible
              verseCode="01001001"
              target={[{ position: 0 }]}
              source={[]}
              alignmentData={{
                '01001001': {
                  sourceText: 'this is the text',
                  text: 'target',
                  sourceTextSegments: ['this', 'is', 'the', 'text'],
                  textSegments: ['target'],
                },
              }}
              addLinkFunc={addLinkMock}
            />
          </IntlProvider>
        </Provider>
      );
      wrapper.simulate('keydown', { key: ' ' });
      expect(addLinkMock).toHaveBeenCalledTimes(0);
    });

    it('creates link if there is at least 1 source and target selection', (): void => {
      const addLinkMock = jest.fn();
      const wrapper = mount(
        <Provider store={store}>
          <IntlProvider locale="en" messages={languageObject.en}>
            <AlignmentComp
              isVisible
              verseCode="01001001"
              target={[{ position: 0 }]}
              source={[{ position: 0 }]}
              alignmentData={{
                '01001001': {
                  sourceText: 'this is the text',
                  text: 'target',
                  sourceTextSegments: ['this', 'is', 'the', 'text'],
                  textSegments: ['target'],
                },
              }}
              addLinkFunc={addLinkMock}
            />
          </IntlProvider>
        </Provider>
      );
      const addButton = wrapper.find('.add');
      addButton.simulate('click');
      expect(addLinkMock).toHaveBeenCalled();
    });

    it('does not create link if there is at least 1 source and target selection (isReadOnly)', (): void => {
      const addLinkMock = jest.fn();
      const wrapper = mount(
        <Provider store={store}>
          <IntlProvider locale="en" messages={languageObject.en}>
            <AlignmentComp
              isVisible
              verseCode="01001001"
              target={[{ position: 0 }]}
              source={[{ position: 0 }]}
              isReadOnly
              alignmentData={{
                '01001001': {
                  sourceText: 'this is the text',
                  text: 'target',
                  sourceTextSegments: ['this', 'is', 'the', 'text'],
                  textSegments: ['target'],
                },
              }}
              addLinkFunc={addLinkMock}
            />
          </IntlProvider>
        </Provider>
      );
      const addButton = wrapper.find('.add');
      addButton.simulate('click');
      expect(addLinkMock).toHaveBeenCalledTimes(0);
    });

    it('does not create link if there is 1 source only selected', (): void => {
      const addLinkMock = jest.fn();
      const wrapper = mount(
        <Provider store={store}>
          <IntlProvider locale="en" messages={languageObject.en}>
            <AlignmentComp
              isVisible
              verseCode="01001001"
              target={[{ position: 0 }]}
              source={[]}
              alignmentData={{
                '01001001': {
                  sourceText: 'this is the text',
                  text: 'target',
                  sourceTextSegments: ['this', 'is', 'the', 'text'],
                  textSegments: ['target'],
                },
              }}
              addLinkFunc={addLinkMock}
            />
          </IntlProvider>
        </Provider>
      );
      const addButton = wrapper.find('.add');
      addButton.simulate('click');
      expect(addLinkMock).toHaveBeenCalledTimes(0);
    });

    it('does not create link if there is 1 target only selected', (): void => {
      const addLinkMock = jest.fn();
      const wrapper = mount(
        <Provider store={store}>
          <IntlProvider locale="en" messages={languageObject.en}>
            <AlignmentComp
              isVisible
              verseCode="01001001"
              target={[]}
              source={[{ position: 0 }]}
              alignmentData={{
                '01001001': {
                  sourceText: 'this is the text',
                  text: 'target',
                  sourceTextSegments: ['this', 'is', 'the', 'text'],
                  textSegments: ['target'],
                },
              }}
              addLinkFunc={addLinkMock}
            />
          </IntlProvider>
        </Provider>
      );
      const addButton = wrapper.find('.add');
      addButton.simulate('click');
      expect(addLinkMock).toHaveBeenCalledTimes(0);
    });
  });

  describe('link removal', (): void => {
    it('does not remove a link if there are none selected', (): void => {
      const removeLinkMock = jest.fn();
      const wrapper = mount(
        <Provider store={store}>
          <IntlProvider locale="en" messages={languageObject.en}>
            <AlignmentComp
              isVisible
              verseCode="01001001"
              target={[]}
              source={[{ position: 0 }]}
              alignmentData={{
                '01001001': {
                  sourceText: 'this is the text',
                  text: 'target',
                  sourceTextSegments: ['this', 'is', 'the', 'text'],
                  textSegments: ['target'],
                },
              }}
              removeSelectedLinkFunc={removeLinkMock}
            />
          </IntlProvider>
        </Provider>
      );
      const removeButton = wrapper.find('.remove');
      removeButton.simulate('click');
      expect(removeLinkMock).toHaveBeenCalledTimes(0);
    });

    it('removes a link if there is at least one selected', (): void => {
      const removeLinkMock = jest.fn();
      const wrapper = mount(
        <Provider store={store}>
          <IntlProvider locale="en" messages={languageObject.en}>
            <AlignmentComp
              isVisible
              linkSelected
              verseCode="01001001"
              target={[]}
              source={[{ position: 0 }]}
              alignmentData={{
                '01001001': {
                  sourceText: 'this is the text',
                  text: 'target',
                  sourceTextSegments: ['this', 'is', 'the', 'text'],
                  textSegments: ['target'],
                },
              }}
              removeSelectedLinkFunc={removeLinkMock}
            />
          </IntlProvider>
        </Provider>
      );
      const removeButton = wrapper.find('.remove');
      removeButton.simulate('click');
      expect(removeLinkMock).toHaveBeenCalledTimes(1);
    });

    it('does not remove a link (isReadOnly)', (): void => {
      const removeLinkMock = jest.fn();
      const wrapper = mount(
        <Provider store={store}>
          <IntlProvider locale="en" messages={languageObject.en}>
            <AlignmentComp
              isVisible
              linkSelected
              verseCode="01001001"
              target={[]}
              source={[{ position: 0 }]}
              isReadOnly
              alignmentData={{
                '01001001': {
                  sourceText: 'this is the text',
                  text: 'target',
                  sourceTextSegments: ['this', 'is', 'the', 'text'],
                  textSegments: ['target'],
                },
              }}
              removeSelectedLinkFunc={removeLinkMock}
            />
          </IntlProvider>
        </Provider>
      );
      const removeButton = wrapper.find('.remove');
      removeButton.simulate('click');
      expect(removeLinkMock).toHaveBeenCalledTimes(0);
    });

    it('does not remove a link if there are none selected (keyboard)', (): void => {
      const removeLinkMock = jest.fn();
      const wrapper = mount(
        <Provider store={store}>
          <IntlProvider locale="en" messages={languageObject.en}>
            <AlignmentComp
              isVisible
              verseCode="01001001"
              target={[]}
              source={[{ position: 0 }]}
              alignmentData={{
                '01001001': {
                  sourceText: 'this is the text',
                  text: 'target',
                  sourceTextSegments: ['this', 'is', 'the', 'text'],
                  textSegments: ['target'],
                },
              }}
              removeSelectedLinkFunc={removeLinkMock}
            />
          </IntlProvider>
        </Provider>
      );
      const removeButton = wrapper.find('.remove');
      removeButton.simulate('keydown', { key: ' ' });
      expect(removeLinkMock).toHaveBeenCalledTimes(0);
    });

    it('removes a link if there is at least one selected (keyboard)', (): void => {
      const removeLinkMock = jest.fn();
      const wrapper = mount(
        <Provider store={store}>
          <IntlProvider locale="en" messages={languageObject.en}>
            <AlignmentComp
              isVisible
              linkSelected
              verseCode="01001001"
              target={[]}
              source={[{ position: 0 }]}
              alignmentData={{
                '01001001': {
                  sourceText: 'this is the text',
                  text: 'target',
                  sourceTextSegments: ['this', 'is', 'the', 'text'],
                  textSegments: ['target'],
                },
              }}
              removeSelectedLinkFunc={removeLinkMock}
            />
          </IntlProvider>
        </Provider>
      );
      wrapper.simulate('keydown', { key: ' ' });
      expect(removeLinkMock).toHaveBeenCalledTimes(1);
    });

    it('does not remove a link if there is at least one selected (isReadOnly, keyboard)', (): void => {
      const removeLinkMock = jest.fn();
      const wrapper = mount(
        <Provider store={store}>
          <IntlProvider locale="en" messages={languageObject.en}>
            <AlignmentComp
              isVisible
              linkSelected
              verseCode="01001001"
              target={[]}
              source={[{ position: 0 }]}
              isReadOnly
              alignmentData={{
                '01001001': {
                  sourceText: 'this is the text',
                  text: 'target',
                  sourceTextSegments: ['this', 'is', 'the', 'text'],
                  textSegments: ['target'],
                },
              }}
              removeSelectedLinkFunc={removeLinkMock}
            />
          </IntlProvider>
        </Provider>
      );
      wrapper.simulate('keydown', { key: ' ' });
      expect(removeLinkMock).toHaveBeenCalledTimes(0);
    });
  });

  describe('mapStateToProps', (): void => {
    it('includes alignment state items', (): void => {
      const result: AlignmentState = mapStateToProps(initialState);
      expect(Object.keys(result).includes('isVisible')).toBeTruthy();
      expect(Object.keys(result).includes('isReadOnly')).toBeTruthy();
    });
  });

  describe('mapDispatchToProps', (): void => {
    it('dispatches for verifyAlignmentFunc', (): void => {
      const dispatch = jest.fn();
      mapDispatchToProps(dispatch).verifyAlignmentFunc();
      expect(dispatch.mock.calls[0][0]).toBeTruthy();
    });

    it('dispatches for fetchDataFunc', (): void => {
      const dispatch = jest.fn();
      mapDispatchToProps(dispatch).fetchDataFunc();
      expect(dispatch.mock.calls[0][0]).toBeTruthy();
    });

    it('dispatches for fetchSuggestionFunc', (): void => {
      const dispatch = jest.fn();
      mapDispatchToProps(dispatch).fetchSuggestionFunc();
      expect(dispatch.mock.calls[0][0]).toBeTruthy();
    });

    it('dispatches for addLinkFunc (empty)', (): void => {
      const dispatch = jest.fn();
      mapDispatchToProps(dispatch).addLinkFunc('', [], []);
      expect(dispatch.mock.calls[0][0]).toBeTruthy();
    });

    it('dispatches for addLinkFunc', (): void => {
      const dispatch = jest.fn();
      mapDispatchToProps(dispatch).addLinkFunc(
        '',
        [{ position: '1' }],
        [{ position: '1' }]
      );
      expect(dispatch.mock.calls[0][0]).toBeTruthy();
    });

    it('dispatches for removeSelectedLinkFunc', (): void => {
      const dispatch = jest.fn();
      mapDispatchToProps(dispatch).removeSelectedLinkFunc();
      expect(dispatch.mock.calls[0][0]).toBeTruthy();
    });

    it('dispatches for clearLinkSelectionsFunc', (): void => {
      const dispatch = jest.fn();
      mapDispatchToProps(dispatch).clearLinkSelectionsFunc();
      expect(dispatch.mock.calls[0][0]).toBeTruthy();
    });

    it('dispatches for reverseAlignmentDisplayFunc', (): void => {
      const dispatch = jest.fn();
      mapDispatchToProps(dispatch).reverseAlignmentDisplayFunc();
      expect(dispatch.mock.calls[0][0]).toBeTruthy();
    });

    it('dispatches for closeAlignmentFunc', (): void => {
      const dispatch = jest.fn();
      mapDispatchToProps(dispatch).closeAlignmentFunc();
      expect(dispatch.mock.calls[0][0]).toBeTruthy();
    });

    it('dispatches for uncheckCompleteBoxFunc', (): void => {
      const dispatch = jest.fn();
      mapDispatchToProps(dispatch).uncheckCompleteBoxFunc();
      expect(dispatch.mock.calls[0][0]).toBeTruthy();
    });

    it('dispatches for openEditorFunc', (): void => {
      const dispatch = jest.fn();
      mapDispatchToProps(dispatch).openEditorFunc();
      expect(dispatch.mock.calls[0][0]).toBeTruthy();
    });

    it('dispatches for updateVerseStatusFunc', (): void => {
      const dispatch = jest.fn();
      mapDispatchToProps(dispatch).updateVerseStatusFunc();
      expect(dispatch.mock.calls[0][0]).toBeTruthy();
    });
  });

  describe('RTL/LTR Tests', (): void => {
    // ------------------- RTL TESTS -----------------------
    it('show RTL OT text', (): void => {
      const wrapper = mount(
        <Provider store={store}>
          <IntlProvider locale="en" messages={languageObject.en}>
            <AlignmentComp
              isVisible
              verseCode="01001001"
              alignmentData={{ '01001001': { links: [] } }}
              isRTL
            />
          </IntlProvider>
        </Provider>
      );
      const modal = wrapper.find('div.modal-dialog');
      expect(modal.exists()).toBeTruthy();
    });

    it('creates a RTL OT link (keyboard) with no text flipping', (): void => {
      const addLinkMock = jest.fn();
      const wrapper = mount(
        <Provider store={store}>
          <IntlProvider locale="en" messages={languageObject.en}>
            <AlignmentComp
              isVisible
              verseCode="01001001"
              target={[{ position: 0 }]}
              source={[{ position: 0 }]}
              alignmentData={{
                '01001001': {
                  sourceText: 'this is the text',
                  text: 'target',
                  sourceTextSegments: ['this', 'is', 'the', 'text'],
                  textSegments: ['target'],
                },
              }}
              addLinkFunc={addLinkMock}
            />
          </IntlProvider>
        </Provider>
      );

      wrapper.simulate('keydown', { key: ' ' });
      expect(addLinkMock).toHaveBeenCalled();
    });

    it('show RTL OT text - flip direction', (): void => {
      const wrapper = mount(
        <Provider store={store}>
          <IntlProvider locale="en" messages={languageObject.en}>
            <AlignmentComp
              isVisible
              verseCode="01001001"
              alignmentData={{ '01001001': { links: [] } }}
              isRTL
              isOTrtlAlignSource
              isOTrtlAlignTarget
            />
          </IntlProvider>
        </Provider>
      );
      const modal = wrapper.find('div.modal-dialog');
      expect(modal.exists()).toBeTruthy();
    });

    it('creates a RTL OT link (keyboard) with S0/S1 text flipping', (): void => {
      const addLinkMock = jest.fn();
      const wrapper = mount(
        <Provider store={store}>
          <IntlProvider locale="en" messages={languageObject.en}>
            <AlignmentComp
              isVisible
              verseCode="01001001"
              target={[{ position: 0 }]}
              source={[{ position: 0 }]}
              alignmentData={{
                '01001001': {
                  sourceText: 'this is the text',
                  text: 'target',
                  sourceTextSegments: ['this', 'is', 'the', 'text'],
                  textSegments: ['target'],
                },
              }}
              addLinkFunc={addLinkMock}
              isRTL
              isOTrtlAlignSource
              isOTrtlAlignTarget
            />
          </IntlProvider>
        </Provider>
      );
      wrapper.simulate('keydown', { key: ' ' });
      expect(addLinkMock).toHaveBeenCalled();
    });

    it('removes a RTL OT Flipped link if there is at least one selected', (): void => {
      const removeLinkMock = jest.fn();
      const wrapper = mount(
        <Provider store={store}>
          <IntlProvider locale="en" messages={languageObject.en}>
            <AlignmentComp
              isVisible
              linkSelected
              verseCode="01001001"
              target={[]}
              source={[{ position: 0 }]}
              alignmentData={{
                '01001001': {
                  sourceText: 'this is the text',
                  text: 'target',
                  sourceTextSegments: ['this', 'is', 'the', 'text'],
                  textSegments: ['target'],
                },
              }}
              isRTL
              isOTrtlAlignSource
              isOTrtlAlignTarget
              removeSelectedLinkFunc={removeLinkMock}
            />
          </IntlProvider>
        </Provider>
      );
      const removeButton = wrapper.find('.remove');
      removeButton.simulate('click');
      expect(removeLinkMock).toHaveBeenCalledTimes(1);
    });

    it('show RTL NT text', (): void => {
      const wrapper = mount(
        <Provider store={store}>
          <IntlProvider locale="en" messages={languageObject.en}>
            <AlignmentComp
              isVisible
              verseCode="66001001"
              alignmentData={{ '66001001': { links: [] } }}
              isRTL
            />
          </IntlProvider>
        </Provider>
      );
      const modal = wrapper.find('div.modal-dialog');
      expect(modal.exists()).toBeTruthy();
    });

    it('creates a RTL NT link (keyboard) with no S0/S1 text flipping', (): void => {
      const addLinkMock = jest.fn();
      const wrapper = mount(
        <Provider store={store}>
          <IntlProvider locale="en" messages={languageObject.en}>
            <AlignmentComp
              isVisible
              verseCode="66001001"
              target={[{ position: 0 }]}
              source={[{ position: 0 }]}
              alignmentData={{
                '66001001': {
                  sourceText: 'this is the text',
                  text: 'target',
                  sourceTextSegments: ['this', 'is', 'the', 'text'],
                  textSegments: ['target'],
                },
              }}
              isRTL
              isNTrtlAlignSource
              isNTrtlAlignTarget
              addLinkFunc={addLinkMock}
            />
          </IntlProvider>
        </Provider>
      );
      wrapper.simulate('keydown', { key: ' ' });
      expect(addLinkMock).toHaveBeenCalled();
    });

    it('removes a RTL NT link if there is at least one selected', (): void => {
      const removeLinkMock = jest.fn();
      const wrapper = mount(
        <Provider store={store}>
          <IntlProvider locale="en" messages={languageObject.en}>
            <AlignmentComp
              isVisible
              linkSelected
              verseCode="66001001"
              target={[]}
              source={[{ position: 0 }]}
              alignmentData={{
                '66001001': {
                  sourceText: 'this is the text',
                  text: 'target',
                  sourceTextSegments: ['this', 'is', 'the', 'text'],
                  textSegments: ['target'],
                },
              }}
              isRTL
              isNTrtlAlignSource
              isNTrtlAlignTarget
              removeSelectedLinkFunc={removeLinkMock}
            />
          </IntlProvider>
        </Provider>
      );
      const removeButton = wrapper.find('.remove');
      removeButton.simulate('click');
      expect(removeLinkMock).toHaveBeenCalledTimes(1);
    });

    it('show RTL NT text - flip direction', (): void => {
      const wrapper = mount(
        <Provider store={store}>
          <IntlProvider locale="en" messages={languageObject.en}>
            <AlignmentComp
              isVisible
              verseCode="66001001"
              alignmentData={{ '66001001': { links: [] } }}
              isRTL
              isNTrtlAlignSource
              isNTrtlAlignTarget
            />
          </IntlProvider>
        </Provider>
      );
      const modal = wrapper.find('div.modal-dialog');
      expect(modal.exists()).toBeTruthy();
    });

    it('creates a RTL NT link (keyboard) with S0/S1 text flipping', (): void => {
      const addLinkMock = jest.fn();
      const wrapper = mount(
        <Provider store={store}>
          <IntlProvider locale="en" messages={languageObject.en}>
            <AlignmentComp
              isVisible
              verseCode="66001001"
              target={[{ position: 0 }]}
              source={[{ position: 0 }]}
              alignmentData={{
                '66001001': {
                  sourceText: 'this is the text',
                  text: 'target',
                  sourceTextSegments: ['this', 'is', 'the', 'text'],
                  textSegments: ['target'],
                },
              }}
              isRTL
              isNTrtlAlignSource
              isNTrtlAlignTarget
              addLinkFunc={addLinkMock}
            />
          </IntlProvider>
        </Provider>
      );
      wrapper.simulate('keydown', { key: ' ' });
      expect(addLinkMock).toHaveBeenCalled();
    });

    it('removes a RTL NT FLIPPED link if there is at least one selected', (): void => {
      const removeLinkMock = jest.fn();
      const wrapper = mount(
        <Provider store={store}>
          <IntlProvider locale="en" messages={languageObject.en}>
            <AlignmentComp
              isVisible
              linkSelected
              verseCode="66001001"
              target={[]}
              source={[{ position: 0 }]}
              alignmentData={{
                '66001001': {
                  sourceText: 'this is the text',
                  text: 'target',
                  sourceTextSegments: ['this', 'is', 'the', 'text'],
                  textSegments: ['target'],
                },
              }}
              isRTL
              isNTrtlAlignSource
              isNTrtlAlignTarget
              removeSelectedLinkFunc={removeLinkMock}
            />
          </IntlProvider>
        </Provider>
      );
      const removeButton = wrapper.find('.remove');
      removeButton.simulate('click');
      expect(removeLinkMock).toHaveBeenCalledTimes(1);
    });

    // ------------- LTR TESTS --------------------------
    it('show LTR OT text', (): void => {
      const wrapper = mount(
        <Provider store={store}>
          <IntlProvider locale="en" messages={languageObject.en}>
            <AlignmentComp
              isVisible
              verseCode="01001001"
              alignmentData={{ '01001001': { links: [] } }}
            />
          </IntlProvider>
        </Provider>
      );
      const modal = wrapper.find('div.modal-dialog');
      expect(modal.exists()).toBeTruthy();
    });

    it('creates a LTR OT link (keyboard) with no text flipping', (): void => {
      const addLinkMock = jest.fn();
      const wrapper = mount(
        <Provider store={store}>
          <IntlProvider locale="en" messages={languageObject.en}>
            <AlignmentComp
              isVisible
              verseCode="01001001"
              target={[{ position: 0 }]}
              source={[{ position: 0 }]}
              alignmentData={{
                '01001001': {
                  sourceText: 'this is the text',
                  text: 'target',
                  sourceTextSegments: ['this', 'is', 'the', 'text'],
                  textSegments: ['target'],
                },
              }}
              addLinkFunc={addLinkMock}
            />
          </IntlProvider>
        </Provider>
      );
      wrapper.simulate('keydown', { key: ' ' });
      expect(addLinkMock).toHaveBeenCalled();
    });

    it('show LTR OT text - flip direction', (): void => {
      const wrapper = mount(
        <Provider store={store}>
          <IntlProvider locale="en" messages={languageObject.en}>
            <AlignmentComp
              isVisible
              verseCode="01001001"
              alignmentData={{ '01001001': { links: [] } }}
              isOTltrAlignSource
              isOTltrAlignTarget
            />
          </IntlProvider>
        </Provider>
      );
      const modal = wrapper.find('div.modal-dialog');
      expect(modal.exists()).toBeTruthy();
    });

    it('show LTR NT text', (): void => {
      const wrapper = mount(
        <Provider store={store}>
          <IntlProvider locale="en" messages={languageObject.en}>
            <AlignmentComp
              isVisible
              verseCode="66001001"
              alignmentData={{ '66001001': { links: [] } }}
            />
          </IntlProvider>
        </Provider>
      );
      const modal = wrapper.find('div.modal-dialog');
      expect(modal.exists()).toBeTruthy();
    });

    it('creates a LTR NT link (keyboard) with no text flipping', (): void => {
      const addLinkMock = jest.fn();
      const wrapper = mount(
        <Provider store={store}>
          <IntlProvider locale="en" messages={languageObject.en}>
            <AlignmentComp
              isVisible
              verseCode="66001001"
              target={[{ position: 0 }]}
              source={[{ position: 0 }]}
              alignmentData={{
                '66001001': {
                  sourceText: 'this is the text',
                  text: 'target',
                  sourceTextSegments: ['this', 'is', 'the', 'text'],
                  textSegments: ['target'],
                },
              }}
              addLinkFunc={addLinkMock}
            />
          </IntlProvider>
        </Provider>
      );
      wrapper.simulate('keydown', { key: ' ' });
      expect(addLinkMock).toHaveBeenCalled();
    });

    it('show LTR NT text - flip direction', (): void => {
      const wrapper = mount(
        <Provider store={store}>
          <IntlProvider locale="en" messages={languageObject.en}>
            <AlignmentComp
              isVisible
              verseCode="66001001"
              alignmentData={{ '66001001': { links: [] } }}
              isNTltrAlignSource
              isNTltrAlignTarget
            />
          </IntlProvider>
        </Provider>
      );
      const modal = wrapper.find('div.modal-dialog');
      expect(modal.exists()).toBeTruthy();
    });
  });
});
