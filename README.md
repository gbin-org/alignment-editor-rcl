# Alignment Editor RCL

_A react component library providing a user experience for creating, viewing, and modifying an alignment of texts._
_Try it out [here](https://alignment-editor-rcl.netlify.app/)._

## Features

- Ability to view both source and target text as RTL or LTR.
- `updatedState` hook for consuming applications to capture changes.
- Users can align to a source text or an aligned reference (aka "bridge") text.
- Two alternative view styles.
- Optional gloss tagging for source text.
- Experimental part of speech highlighting.

## Usage

Add the package:

```cli
yarn add alignment-editor-rcl
```

Import the react component and its provider:

```ts
import { AlignmentEditor, AlignmentProvider } from 'alignment-editor-rcl';
```

Wrapped in its provider, render `AlignmentEditor` as you would any other react component, providing `sourceSegments`, `targetSegments`, (preexisting)`links`, and a `stateUpdatedHook`. Optionally, `sourceGlosses` can be provided:

```tsx
<AlignmentProvider>
  <AlignmentEditor
    sourceGlosses={[
      { position: 2, glossText: 'anyone' },
      { position: 5, glossText: 'hearer' },
    ]}
    sourceSegments={[
      { text: 'ὅτι' },
      { text: 'εἴ' },
      { text: 'τις' },
      { text: 'ἀκροατὴς' },
      { text: 'λόγου' },
      { text: 'ἐστὶν' },
    ]}
    targetSegments={[
      { text: 'For' },
      { text: 'if' },
      { text: 'anyone' },
      { text: 'is' },
      { text: 'a' },
      { text: 'hearer' },
    ]}
    links={[
      { sources: [0], targets: [1, 2], type: 'manual' },
      { sources: [3], targets: [5], type: 'manual' },
    ]}
    stateUpdatedHook={(a) => {
      console.log('STATE UPDATED', a);
    }}
  />
</AlignmentProvider>
```

## API

### Required Parameters

#### `sourceSegments`

Represents the source text -- an "original" text that a target will be aligned to.

An array of objects that implement:

```typescript
interface UserTextSegment {
  text: string;
  partOfSpeech?: string;
}
```

#### `targetSegments`

Represents the target text -- an "translation" text that will be aligned to its source.

An array of objects that implement:

```typescript
interface UserTextSegment {
  text: string;
  partOfSpeech?: string;
}
```

### Optional Parameters

#### `links`

A "link" is an alignment of target text tokens to source text tokens. Links can be Many:Many.

This parameter represents preexisting links. These will be displayed and users can remove or modify them. Note than links can be labeled as 'machine' or 'manual'. In the future, a visual delineation between the two will be provided.

An array of objects that implement: `{ sources: number[], target: number[], type: 'manual'|'machine' }`

#### `referenceSegments`

Represents the reference text -- a previously aligned translation of the source that users will align their target to.
Reference text mode is enabled by providing `referenceSegments` and `referenceLinks`.
In reference text mode users can only align to the reference text.

An array of objects that implement:

```typescript
interface UserTextSegment {
  text: string;
  partOfSpeech?: string;
}
```

#### `referenceLinks`

A set of links that describes the alignment of the reference text to the source.
Reference text mode is enabled by providing `referenceSegments` and `referenceLinks`.

An array of objects that implement: `{ sources: number[], target: number[], type: 'manual'|'machine' }`

#### `stateUpdatedHook`

This hook is a function that will be called by the component library when the user manipulates the state of the links representing the alignment.

The function receives an array of links as specified above.

#### `sourceGlosses`

To assist users in alignment activities who may not have extensive knowledge of original languages, a set of sourceGlosses can be provided to the component. When sourceGlosses are turned on, they are displayed as tags providing an additional string of information for source text segments.

An array of objects that implement: `{ position: number, glossText: string }`
