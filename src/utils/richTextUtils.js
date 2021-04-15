export function parseRichTextToTexts(obj) {
  if (!obj) return [];
  if (obj.nodeType === 'text') return obj.value;
  if (!obj.content) return [obj];
  return obj.content.flatMap(o => parseRichTextToTexts(o));
}
