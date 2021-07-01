const na28Verses = require('./parts-of-speech.json');

const sortAlphaNum = (a, b) => a.localeCompare(b, 'en', { numeric: true });

const sortedNA28VerseReferences = Object.keys(na28Verses).sort(sortAlphaNum);

let na28Words = [];

sortedNA28VerseReferences.forEach((na28VerseRef) => {
  const verseWords = na28Verses[na28VerseRef];
  na28Words = na28Words.concat(verseWords);
});

const ugnt = [
  'Παῦλος',
  'δοῦλος',
  'θεοῦ',
  'ἀπόστολος',
  'δὲ',
  'Ἰησοῦ',
  'Χριστοῦ',
  'κατὰ',
  'πίστιν',
  'ἐκλεκτῶν',
  'θεοῦ',
  'καὶ',
  'ἐπίγνωσιν',
  'ἀληθείας',
  'τῆς',
  'κατʼ',
  'εὐσέβειαν',
  'ἐπʼ',
  'ἐλπίδι',
  'ζωῆς',
  'αἰωνίου',
  'ἣν',
  'ἐπηγγείλατο',
  'ὁ',
  'ἀψευδὴς',
  'θεὸς',
  'πρὸ',
  'χρόνων',
  'αἰωνίων',
  'ἐφανέρωσεν',
  'δὲ',
  'καιροῖς',
  'ἰδίοις',
  'τὸν',
  'λόγον',
  'αὐτοῦ',
  'ἐν',
  'κηρύγματι',
  'ὃ',
  'ἐπιστεύθην',
  'ἐγὼ',
  'κατʼ',
  'ἐπιταγὴν',
  'τοῦ',
  'σωτῆρος',
  'ἡμῶν',
  'θεοῦ',
  'Τίτῳ',
  'γνησίῳ',
  'τέκνῳ',
  'κατὰ',
  'κοινὴν',
  'πίστιν',
  'χάρις',
  'καὶ',
  'εἰρήνη',
  'ἀπὸ',
  'θεοῦ',
  'πατρὸς',
  'καὶ',
  'Χριστοῦ',
  'Ἰησοῦ',
  'τοῦ',
  'σωτῆρος',
  'ἡμῶν',
  'Τούτου',
  'χάριν',
  'ἀπέλιπόν',
  'σε',
  'ἐν',
  'Κρήτῃ',
  'ἵνα',
  'τὰ',
  'λείποντα',
  'ἐπιδιορθώσῃ',
  'καὶ',
  'καταστήσῃς',
  'κατὰ',
  'πόλιν',
  'πρεσβυτέρους',
  'ὡς',
  'ἐγώ',
  'σοι',
  'διεταξάμην',
  'εἴ',
  'τίς',
  'ἐστιν',
  'ἀνέγκλητος',
  'μιᾶς',
  'γυναικὸς',
  'ἀνήρ',
  'τέκνα',
  'ἔχων',
  'πιστά',
  'μὴ',
  'ἐν',
  'κατηγορίᾳ',
  'ἀσωτίας',
  'ἢ',
  'ἀνυπότακτα',
  'δεῖ',
  'γὰρ',
  'τὸν',
  'ἐπίσκοπον',
  'ἀνέγκλητον',
  'εἶναι',
  'ὡς',
  'θεοῦ',
  'οἰκονόμον',
  'μὴ',
  'αὐθάδη',
  'μὴ',
  'ὀργίλον',
  'μὴ',
  'πάροινον',
  'μὴ',
  'πλήκτην',
  'μὴ',
  'αἰσχροκερδῆ',
  'ἀλλὰ',
  'φιλόξενον',
  'φιλάγαθον',
  'σώφρονα',
  'δίκαιον',
  'ὅσιον',
  'ἐγκρατῆ',
  'ἀντεχόμενον',
  'τοῦ',
  'κατὰ',
  'τὴν',
  'διδαχὴν',
  'πιστοῦ',
  'λόγου',
  'ἵνα',
  'δυνατὸς',
  'ᾖ',
  'καὶ',
  'παρακαλεῖν',
  'ἐν',
  'τῇ',
  'διδασκαλίᾳ',
  'τῇ',
  'ὑγιαινούσῃ',
  'καὶ',
  'τοὺς',
  'ἀντιλέγοντας',
  'ἐλέγχειν',
  'Εἰσὶν',
  'γὰρ',
  'πολλοὶ',
  'καὶ',
  'ἀνυπότακτοι',
  'ματαιολόγοι',
  'καὶ',
  'φρεναπάται',
  'μάλιστα',
  'οἱ',
  'ἐκ',
  'τῆς',
  'περιτομῆς',
  'οὓς',
  'δεῖ',
  'ἐπιστομίζειν',
  'οἵτινες',
  'ὅλους',
  'οἴκους',
  'ἀνατρέπουσιν',
  'διδάσκοντες',
  'ἃ',
  'μὴ',
  'δεῖ',
  'αἰσχροῦ',
  'κέρδους',
  'χάριν',
];

const trues = [];
const falses = [];

console.log('Position,UGNT,NA28,isEqual,PartOfSpeech');

ugnt.forEach((ugntWord, index) => {
  const na28Word = na28Words[index].text;

  const strippedUgntWord = ugntWord
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

  const strippedNa28Word = na28Word
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(',', '')
    .replace('.', '')
    .replace('’', 'ʼ');

  const wordEquality = strippedUgntWord === strippedNa28Word;

  if (wordEquality) {
    trues.push(index);
  }

  if (!wordEquality) {
    falses.push(index);
  }

  console.log(
    index + ',',
    strippedUgntWord + ',',
    strippedNa28Word + ',',
    wordEquality + ',',
    na28Words[index].cat
  );
});

console.log('Total:,', ugnt.length);
console.log('Matches:,', trues.length);
console.log('Mismatches:,', falses.length);