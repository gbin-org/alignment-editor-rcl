#### Linkable (i.e. "content" words)

```ts
<TextSegmentComponent
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
<TextSegmentComponent
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
<TextSegmentComponent
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
<TextSegmentComponent
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
<TextSegmentComponent
  segmentData={{text: 'ταχὺς', color: 1, group: 1, type: 'source', position: 1 }}
  isLinked
  selectTextSegmentFunc={(type, position) => {}}
  deSelectTextSegmentFunc={(type, position) => {}}
/>

<TextSegmentComponent
  segmentData={{text: 'ἀκοῦσαι', color: 1, group: 1, type: 'source', position: 2 }}
  isLinked
  selectTextSegmentFunc={(type, position) => {}}
  deSelectTextSegmentFunc={(type, position) => {}}

/>
```
