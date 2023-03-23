import React from 'react';

import { type ComponentStory, type ComponentMeta } from '@storybook/react';

import Editor from '../Editor';
import './styles.css';
import './stories.css';

// eslint-disable-next-line
export default {
  title: 'Glyf Editor',
  component: Editor
} as ComponentMeta<typeof Editor>;

// @ts-expect-error not sure about this one - something in storybook?
const Template: ComponentStory<typeof Editor> = (args) => <Editor {...args} />;

export const FirstStory = Template.bind({});

FirstStory.args = {
  /* 👇 The args you need here will depend on your component */
};
