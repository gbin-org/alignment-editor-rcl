#### An experimental alternative interface

Just something I'm thinking about.

```ts
<LinksContainer2
  sourceSegments={[
    { text: 'ὅτι', type: 'source', position: 0 },
    { text: 'εἴ', type: 'source', position: 1 },
    { text: 'τις', type: 'source', position: 2 },
    { text: 'ἀκροατὴς', type: 'source', position: 3 },
    { text: 'λόγου', type: 'source', position: 4 },
    { text: 'ἐστὶν', type: 'source', position: 5 },
    { text: 'καὶ', type: 'source', position: 6 },
    { text: 'οὐ', type: 'source', position: 7 },
    { text: 'ποιητής', type: 'source', position: 8 },
    { text: 'οὗτος', type: 'source', position: 9 },
    { text: 'ἔοικεν', type: 'source', position: 10 },
    { text: 'ἀνδρὶ', type: 'source', position: 11 },
    { text: 'κατανοοῦντι', type: 'source', position: 12 },
    { text: 'τὸ', type: 'source', position: 13 },
    { text: 'πρόσωπον', type: 'source', position: 14 },
    { text: 'τῆς', type: 'source', position: 15 },
    { text: 'γενέσεως', type: 'source', position: 16 },
    { text: 'αὐτοῦ', type: 'source', position: 17 },
    { text: 'ἐν', type: 'source', position: 18 },
    { text: 'ἐσόπτρῳ', type: 'source', position: 19 },
  ]}
  targetSegments={[
    { text: 'For', type: 'target', position: 0 },
    { text: 'if', type: 'target', position: 1 },
    { text: 'anyone', type: 'target', position: 2 },
    { text: 'is', type: 'target', position: 3 },
    { text: 'a', type: 'target', position: 4 },
    { text: 'hearer', type: 'target', position: 5 },
    { text: 'of', type: 'target', position: 6 },
    { text: 'the', type: 'target', position: 7 },
    { text: 'word', type: 'target', position: 8 },
    { text: 'and', type: 'target', position: 9 },
    { text: 'not', type: 'target', position: 10 },
    { text: 'a', type: 'target', position: 11 },
    { text: 'doer', type: 'target', position: 12 },
    { text: 'he', type: 'target', position: 13 },
    { text: 'is', type: 'target', position: 14 },
    { text: 'like', type: 'target', position: 15 },
    { text: 'a', type: 'target', position: 16 },
    { text: 'man', type: 'target', position: 17 },
    { text: 'who', type: 'target', position: 18 },
    { text: 'looks', type: 'target', position: 19 },
    { text: 'intently', type: 'target', position: 20 },
    { text: 'at', type: 'target', position: 21 },
    { text: 'his', type: 'target', position: 22 },
    { text: 'natural', type: 'target', position: 23 },
    { text: 'face', type: 'target', position: 24 },
    { text: 'in', type: 'target', position: 25 },
    { text: 'a', type: 'target', position: 26 },
    { text: 'mirror', type: 'target', position: 27 },
  ]}
  selectTextSegmentFunc={(type, position) => {}}
  deSelectTextSegmentFunc={(type, position) => {}}
  links={[
    { sources: [3], targets: [5], type: 'manual' },
    { sources: [4], targets: [8], type: 'manual' },
    { sources: [12], targets: [19, 20, 21], type: 'manual' },
  ]}
/>
```
