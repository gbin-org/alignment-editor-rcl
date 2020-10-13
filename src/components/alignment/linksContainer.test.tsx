/**
 * @jest-environment jsdom
 */

//import React from 'react';
//import Enzyme, { mount } from 'enzyme';
//import Adapter from 'enzyme-adapter-react-16';
//import configureStore from 'redux-mock-store';
//import { Provider } from 'react-redux';
//import thunk from 'redux-thunk';

//import { LinksContainerComp, mapStateToProps } from './linksContainer';
//import initialState from '../../reducers/initState.data';

//Enzyme.configure({ adapter: new Adapter() });
//const mockStore = configureStore([thunk]);
//const store = mockStore(initialState);

//describe('Link Container Component', (): void => {
//it('shows text segments', (): void => {
//const sourceText = ['the', 'source', 'text'];
//const targetText = ['a', 'target', 'text'];
//const links = [{ sources: [0], targets: [1] }];
//const wrapper = mount(
//<Provider store={store}>
//<LinksContainerComp
//links={links}
//sourceText={sourceText}
//targetText={targetText}
///>
//</Provider>
//);
//const segments = wrapper.find('.text-segment');
//expect(segments.exists()).toBeTruthy();
//expect(segments.length).toBe(6);
//});
//it('shows grouped text segments', (): void => {
//const sourceText = ['the', 'source', 'text'];
//const targetText = ['a', 'target', 'text'];
//const links = [{ sources: [0], targets: [1, 2] }];
//const wrapper = mount(
//<Provider store={store}>
//<LinksContainerComp
//links={links}
//sourceText={sourceText}
//targetText={targetText}
///>
//</Provider>
//);
//const segments = wrapper.find('.text-segment.blue');
//expect(segments.exists()).toBeTruthy();
//expect(segments.length).toBe(3);
//});

//------------- RTL TESTS --------------------
//it('handles RTL OT text', (): void => {
//const sourceText = ['the', 'source', 'text'];
//const targetText = ['a', 'target', 'text'];
//const links = [{ sources: [0], targets: [1] }];
//const wrapper = mount(
//<Provider store={store}>
//<LinksContainerComp
//links={links}
//sourceText={sourceText}
//targetText={targetText}
//verseCode="01001001"
//isRTL
///>
//</Provider>
//);
//const segments = wrapper.find('.text-segment');
//expect(segments.exists()).toBeTruthy();
//expect(segments.length).toBe(6);
//});

//it('handles RTL OT text direction flipped', (): void => {
//const sourceText = ['the', 'source', 'text'];
//const targetText = ['a', 'target', 'text'];
//const links = [{ sources: [0], targets: [1] }];
//const wrapper = mount(
//<Provider store={store}>
//<LinksContainerComp
//links={links}
//sourceText={sourceText}
//targetText={targetText}
//verseCode="01001001"
//isRTL
//isOTrtlAlignSource
//isOTrtlAlignTarget
///>
//</Provider>
//);
//const segments = wrapper.find('.text-segment');
//expect(segments.exists()).toBeTruthy();
//expect(segments.length).toBe(6);
//});

//it('handles RTL NT text', (): void => {
//const sourceText = ['the', 'source', 'text'];
//const targetText = ['a', 'target', 'text'];
//const links = [{ sources: [0], targets: [1] }];
//const wrapper = mount(
//<Provider store={store}>
//<LinksContainerComp
//links={links}
//sourceText={sourceText}
//targetText={targetText}
//verseCode="66001001"
//isRTL
///>
//</Provider>
//);
//const segments = wrapper.find('.text-segment');
//expect(segments.exists()).toBeTruthy();
//expect(segments.length).toBe(6);
//});

//it('handles RTL NT text direction flipped', (): void => {
//const sourceText = ['the', 'source', 'text'];
//const targetText = ['a', 'target', 'text'];
//const links = [{ sources: [0], targets: [1] }];
//const wrapper = mount(
//<Provider store={store}>
//<LinksContainerComp
//links={links}
//sourceText={sourceText}
//targetText={targetText}
//verseCode="66001001"
//isRTL
//isNTrtlAlignSource
//isNTrtlAlignTarget
///>
//</Provider>
//);
//const segments = wrapper.find('.text-segment');
//expect(segments.exists()).toBeTruthy();
//expect(segments.length).toBe(6);
//});

//------------- LTR TESTS --------------------
//it('handles LTR OT text', (): void => {
//const sourceText = ['the', 'source', 'text'];
//const targetText = ['a', 'target', 'text'];
//const links = [{ sources: [0], targets: [1] }];
//const wrapper = mount(
//<Provider store={store}>
//<LinksContainerComp
//links={links}
//sourceText={sourceText}
//targetText={targetText}
//verseCode="01001001"
//isRTL={false}
///>
//</Provider>
//);
//const segments = wrapper.find('.text-segment');
//expect(segments.exists()).toBeTruthy();
//expect(segments.length).toBe(6);
//});

//it('handles LTR OT text direction flipped', (): void => {
//const sourceText = ['the', 'source', 'text'];
//const targetText = ['a', 'target', 'text'];
//const links = [{ sources: [0], targets: [1] }];
//const wrapper = mount(
//<Provider store={store}>
//<LinksContainerComp
//links={links}
//sourceText={sourceText}
//targetText={targetText}
//verseCode="01001001"
//isRTL={false}
//isOTltrAlignSource
//isOTltrAlignTarget
///>
//</Provider>
//);
//const segments = wrapper.find('.text-segment');
//expect(segments.exists()).toBeTruthy();
//expect(segments.length).toBe(6);
//});

//it('handles LTR NT text', (): void => {
//const sourceText = ['the', 'source', 'text'];
//const targetText = ['a', 'target', 'text'];
//const links = [{ sources: [0], targets: [1] }];
//const wrapper = mount(
//<Provider store={store}>
//<LinksContainerComp
//links={links}
//sourceText={sourceText}
//targetText={targetText}
//verseCode="66001001"
//isRTL
///>
//</Provider>
//);
//const segments = wrapper.find('.text-segment');
//expect(segments.exists()).toBeTruthy();
//expect(segments.length).toBe(6);
//});

//it('handles LTR NT text direction flipped', (): void => {
//const sourceText = ['the', 'source', 'text'];
//const targetText = ['a', 'target', 'text'];
//const links = [{ sources: [0], targets: [1] }];
//const wrapper = mount(
//<Provider store={store}>
//<LinksContainerComp
//links={links}
//sourceText={sourceText}
//targetText={targetText}
//verseCode="66001001"
//isRTL={false}
//isNTltrAlignSource
//isNTltrAlignTarget
///>
//</Provider>
//);
//const segments = wrapper.find('.text-segment');
//expect(segments.exists()).toBeTruthy();
//expect(segments.length).toBe(6);
//});

//it('shows many grouped text segments', (): void => {
//const sourceText = [
//'the',
//'source',
//'text',
//'has',
//'many',
//'words',
//'in',
//'this',
//'list',
//'for',
//'testing',
//'purposes',
//];
//const targetText = [
//'a',
//'target',
//'text',
//'also',
//'has',
//'many',
//'words',
//'in',
//'this',
//'list',
//'for',
//'testing',
//'purposes',
//];
//const links = [
//{ sources: [0, 1, 2], targets: [0, 1, 2] },
//{ sources: [3, 4], targets: [3, 4] },
//{ sources: [5, 6], targets: [5, 6] },
//{ sources: [7, 8], targets: [7, 8] },
//{ sources: [9, 10, 11], targets: [9, 10, 11, 12] },
//];
//const wrapper = mount(
//<Provider store={store}>
//<LinksContainerComp
//links={links}
//sourceText={sourceText}
//targetText={targetText}
///>
//</Provider>
//);
//const defaultSegments = wrapper.find('.text-segment.default');
//expect(defaultSegments.exists()).toBeFalsy();

//const blueSegments = wrapper.find('.text-segment.blue');
//expect(blueSegments.exists()).toBeTruthy();
//expect(blueSegments.length).toBe(10);

//const greenSegments = wrapper.find('.text-segment.green');
//expect(greenSegments.exists()).toBeTruthy();
//expect(greenSegments.length).toBe(11);

//const orangeSegments = wrapper.find('.text-segment.orange');
//expect(orangeSegments.exists()).toBeTruthy();
//expect(orangeSegments.length).toBe(4);

//const segments = wrapper.find('.text-segment');
//expect(segments.exists()).toBeTruthy();
//expect(segments.length).toBe(25);
//});

//describe('props mapping', (): void => {
//it('maps props correctly', (): void => {
//const result = mapStateToProps(initialState);
//expect(Object.keys(result).includes('source')).toBeTruthy();
//expect(Object.keys(result).includes('target')).toBeTruthy();
//expect(
//Object.keys(result).includes('reverseAlignmentDisplay')
//).toBeTruthy();
//expect(Object.keys(result).includes('glosses')).toBeTruthy();
//});
//});
//});
