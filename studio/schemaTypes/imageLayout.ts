import {defineField} from 'sanity'

/**
 * Layout options for an image inside a Portable Text body: where it sits and
 * how wide it is. Left/right images float, so the paragraphs after them wrap
 * alongside (like WordPress "align left/right"); on phones they stack instead.
 */
export const imageLayoutFields = [
  defineField({
    name: 'caption',
    title: 'Caption (optional)',
    description: 'A short line shown right under the image, e.g. what it shows and photo credit.',
    type: 'string',
  }),
  defineField({
    name: 'alignment',
    title: 'Position',
    description:
      'Left or Right: the text that follows wraps beside the image on wide screens. On phones the image always sits on its own line.',
    type: 'string',
    options: {
      list: [
        {title: 'Default (own line)', value: 'none'},
        {title: 'Left, text on the right', value: 'left'},
        {title: 'Center', value: 'center'},
        {title: 'Right, text on the left', value: 'right'},
      ],
      layout: 'radio',
    },
    initialValue: 'none',
  }),
  defineField({
    name: 'size',
    title: 'Size',
    type: 'string',
    options: {
      list: [
        {title: 'Small', value: 'small'},
        {title: 'Medium', value: 'medium'},
        {title: 'Large', value: 'large'},
        {title: 'Full width', value: 'full'},
      ],
      layout: 'radio',
      direction: 'horizontal',
    },
    initialValue: 'full',
  }),
]

const POSITION_LABEL: Record<string, string> = {
  left: '⬅ Left',
  center: '↔ Center',
  right: 'Right ➡',
}

// Shows the layout in the body editor, since Studio doesn't render the wrap.
export const imageLayoutPreview = {
  select: {media: 'asset', alt: 'alt', caption: 'caption', alignment: 'alignment', size: 'size'},
  prepare: ({media, alt, caption, alignment, size}: Record<string, any>) => ({
    media,
    title: caption || alt || 'Image',
    subtitle: [POSITION_LABEL[alignment], size && size !== 'full' ? size : null]
      .filter(Boolean)
      .join(' · '),
  }),
}
