#### Linkable (i.e. "content" words)

```ts
<TextSegment
  segmentData={{
    text: 'ἀκοῦσαι',
    color: 0,
    group: 0,
    type: 'source',
    position: 1,
  }}
  selectTextSegmentFunc={(type, position) => {}}
  deSelectTextSegmentFunc={(type, position) => {}}
/>
```

#### Non-Linkable / Disabled (i.e. "function" words)

```ts
<TextSegment
  segmentData={{
    text: 'ἀκοῦσαι',
    color: 0,
    group: 0,
    type: 'source',
    position: 1,
  }}
  isDisabled
  selectTextSegmentFunc={(type, position) => {}}
  deSelectTextSegmentFunc={(type, position) => {}}
/>
```

#### Linked

```ts
<TextSegment
  segmentData={{
    text: 'ἀκοῦσαι',
    color: 0,
    group: 0,
    type: 'source',
    position: 1,
  }}
  isLinked
  selectTextSegmentFunc={(type, position) => {}}
  deSelectTextSegmentFunc={(type, position) => {}}
/>
```

#### Selected

```ts
<TextSegment
  segmentData={{
    text: 'ἀκοῦσαι',
    color: 0,
    group: 0,
    type: 'source',
    postition: 1,
  }}
  isSelected
  selectTextSegmentFunc={(type, position) => {}}
  deSelectTextSegmentFunc={(type, position) => {}}
/>
```

#### Linked and Grouped

```ts
<TextSegment
  segmentData={{text: 'ταχὺς', color: 1, group: 1, type: 'source', position: 1 }}
  isLinked
  selectTextSegmentFunc={(type, position) => {}}
  deSelectTextSegmentFunc={(type, position) => {}}
/>

<TextSegment
  segmentData={{text: 'ἀκοῦσαι', color: 1, group: 1, type: 'source', position: 2 }}
  isLinked
  selectTextSegmentFunc={(type, position) => {}}
  deSelectTextSegmentFunc={(type, position) => {}}

/>
```
