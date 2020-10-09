//import Tokenization, { LocationData } from './tokenization';
import { TranslationLink } from './structs';

//const Token = new Tokenization();

//export const strEscape = (str: string): string => {
//return str.replace(/</g, '&lt;').replace(/>/g, '&gt;');
//};

//export const parseTheLocationKey = (input: string): LocationData => {
//return Token.parseTheLocationKey(input);
//};

//export interface TargetIndexMap {
//[key: number]: number;
//}

//export const highlightLinkedWords = (
//word: string,
//text: string,
//locationKeys: string[],
//): string => {
//try {
//const segments = Token.tokenizer(text);
//const targetIndexMap: TargetIndexMap = {};

//locationKeys.forEach((locationKey) => {
//const { targetIndex } = Token.parseTheLocationKey(locationKey);
//targetIndex?.forEach((index: number) => {
//targetIndexMap[index] = index;
//});
//});

//const textArr: string[] = [];
//segments.forEach((item: string, index: number): void => {
//if (index in targetIndexMap) {
//textArr.push(`<b>${item}</b>`);
//} else {
//textArr.push(item);
//}
//});

//return textArr.join(' ');
//} catch (err) {
//console.log(err);
//return text;
//}
//};

export const computeVerseLinkedWords = (
  links: TranslationLink[],
  textSegments: string[]
): Record<number, string> => {
  const linkedWord: Record<number, string> = {};

  for (let index = 0; index < links.length; index += 1) {
    const { sources, targets } = links[index];

    const linkedTranslationWordsStack: string[] = [];
    targets.forEach((localIndex: number) => {
      linkedTranslationWordsStack.push(textSegments[localIndex]);
    });

    const linkedTranslationWords = linkedTranslationWordsStack.join(' ');
    sources.forEach((localIndex: number) => {
      linkedWord[localIndex] = linkedTranslationWords;
    });
  }

  return linkedWord;
};

//export const getVerseLinkedWords = (textId: string, verses: any[]): Record<number, string> => {
//for (let index = 0; index < verses.length; index += 1) {
//if (verses[index].textId === textId) {
//const { links, textSegments } = verses[index];

//if (links && textSegments) {
//return computeVerseLinkedWords(links, textSegments);
//}
//}
//}

//return {};
//};
