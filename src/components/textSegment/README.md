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
  textSegment={{text: 'ταχὺς', type: 'source', position: 1 }}
  group="1"
  displayStyle="line"
  isLinked
/>

<TextSegmentComponent
  textSegment={{text: 'ἀκοῦσαι', type: 'source', position: 2 }}
  group="1"
  displayStyle="line"
  isLinked
/>
```
