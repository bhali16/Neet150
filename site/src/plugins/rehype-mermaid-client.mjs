import { visit } from 'unist-util-visit';

function collectText(node) {
  if (node.type === 'text') return node.value;
  if (!node.children) return '';
  return node.children.map(collectText).join('');
}

// Turns ```mermaid fenced code blocks into <pre class="mermaid">…</pre>
// so mermaid.js can find and render them client-side after hydration.
// Runs after Shiki has syntax-highlighted the block (hence matching on the
// pre's data-language attribute rather than the original code[class]).
// No headless browser / build-time rendering involved.
export function rehypeMermaidClient() {
  return (tree) => {
    visit(tree, 'element', (node, index, parent) => {
      if (node.tagName !== 'pre' || !parent) return;
      if (node.properties?.dataLanguage !== 'mermaid') return;

      const text = collectText(node);

      parent.children[index] = {
        type: 'element',
        tagName: 'pre',
        properties: { className: ['mermaid'] },
        children: [{ type: 'text', value: text }],
      };
    });
  };
}
