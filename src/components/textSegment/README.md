#### Linkable (i.e. "content" words)

```ts
<TextSegmentComponent
  textSegment={{
    text: 'ἀκοῦσαι',
    color: 0,
    group: 0,
    type: 'source',
    position: 1,
  }}
/>
```

#### Non-Linkable / Disabled (i.e. "function" words)

```ts
<TextSegmentComponent
  textSegment={{
    text: 'ἀκοῦσαι',
    color: 0,
    group: 0,
    type: 'source',
    position: 1,
  }}
  isDisabled
/>
```

#### Linked

```ts
<TextSegmentComponent
  textSegment={{
    text: 'ἀκοῦσαι',
    color: 0,
    group: 0,
    type: 'source',
    position: 1,
  }}
  isLinked
/>
```

#### Selected

```ts
<TextSegmentComponent
  textSegment={{
    text: 'ἀκοῦσαι',
    color: 0,
    group: 0,
    type: 'source',
    postition: 1,
  }}
  isSelected
/>
```

#### Linked and Grouped

```ts
<TextSegmentComponent
  textSegment={{text: 'ταχὺς', color: 1, group: 1, type: 'source', position: 1 }}
  isLinked
/>

<TextSegmentComponent
  textSegment={{text: 'ἀκοῦσαι', color: 1, group: 1, type: 'source', position: 2 }}
  isLinked
/>
```
