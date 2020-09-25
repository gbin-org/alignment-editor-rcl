# Text Segment

Linkable: 

```ts
<TextSegment 
  segment={{text: 'ἀκοῦσαι', color: 0, group: 0 }} 
  refName="source-1" source={[1]} 
  alignmentData={{'01001001': {}}} 
  linksAlt={[]} 
  isLinkable 
/>
```

Linked: 

```ts
<TextSegment 
  segment={{text: 'ἀκοῦσαι', color: 0, group: 0 }} 
  refName="source-1"  
  source={[]} 
  target={[]} 
  alignmentData={{'01001001': {}}} 
  linksAlt={[{sources: [1], targets: [1]}]} 
  isLinkable 
/>
```

Selected:

```ts
<TextSegment 
  segment={{text: 'ἀκοῦσαι', color: 0, group: 0 }} 
  refName="source-1" source={[{position: 1}]} 
  alignmentData={{'01001001': {}}} 
  linksAlt={[]} 
  isLinkable 
/>
```
Linked and Grouped: 

```ts
<TextSegment 
  segment={{text: 'ταχὺς', color: 1, group: 1 }} 
  refName="source-1"  
  source={[]} 
  target={[]} 
  alignmentData={{'01001001': {}}} 
  linksAlt={[{sources: [1], targets: [1]}]} 
  isLinkable 
/>

<TextSegment 
  segment={{text: 'ἀκοῦσαι', color: 1, group: 1 }} 
  refName="source-1"  
  source={[]} 
  target={[]} 
  alignmentData={{'01001001': {}}} 
  linksAlt={[{sources: [1], targets: [1]}]} 
  isLinkable 
/>
```
