const tree = {
  type: 'sentence',
  children: [
    {
      type: 'cl',
      start: 0,
      end: 2,
      children: [
        { type: 'v.part', start: 0, end: 0, text: 'διαγενομένου' },
        { type: 's', start: 1, end: 2, text: 'τοῦ σαββάτου' },
      ],
    },
    {
      type: 's',
      start: 3,
      end: 12,
      text: 'Μαρία ἡ Μαγδαληνὴ καὶ Μαρία ἡ τοῦ Ἰακώβου καὶ Σαλώμη',
    },
    { type: 'v', start: 13, end: 13, text: 'ἠγόρασαν' },
    { type: 'o', start: 14, end: 14, text: 'ἀρώματα' },
    {
      type: 'cl',
      start: 15,
      end: 18,
      children: [
        {
          type: 'cl',
          start: 15,
          end: 15,
          text: 'ἵνα',
          children: [{ type: 'v.part', start: 16, end: 16, text: 'ἐλθοῦσαι' }],
        },
        { type: 'v', start: 17, end: 17, text: 'ἀλείψωσιν' },
        { type: 'o', start: 18, end: 18, text: 'αὐτόν' },
      ],
    },
  ],
};

const traverse = (node, depth) => {
  let indent = '';

  if (depth > 0) {
    const range = Array(depth);
    indent = range.join('  ');
  }

  console.log(`${indent}${node.type}`);

  if (node.children) {
    return node.children.map((child) => traverse(child, depth + 1));
  }
  return node;
};

traverse(tree, 0);
