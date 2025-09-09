import { mount } from '@vue/test-utils';
import { test, expect } from 'vitest';

import CityTabs from '@/components/CityTabs.vue';

function setup() {
  return mount(CityTabs);
}

test('renders all city tabs', () => {
  const wrapper = setup();
  const buttons = wrapper.findAll('button[role="tab"]');
  // Expect 5 tabs based on component definition
  expect(buttons.length).toBe(5);
  const labels = buttons.map((b) => b.text());
  expect(labels).toEqual(['Denver 🏔', 'Rio de Janeiro ⛱', 'Madrid 💃', 'Japan 🍣', 'Australia 🐨']);
});

test('first tab is selected by default', () => {
  const wrapper = setup();
  const buttons = wrapper.findAll('button[role="tab"]');
  const first = buttons[0]!;
  expect(first.attributes()['aria-selected']).toBe('true');
  buttons.slice(1).forEach((btn) => {
    expect(btn.attributes()['aria-selected']).toBe('false');
  });
});

test('clicking another tab updates selection', async () => {
  const wrapper = setup();
  const buttons = wrapper.findAll('button[role="tab"]');
  const target = buttons[2]!; // Madrid
  await target.trigger('click');
  expect(buttons[0]!.attributes()['aria-selected']).toBe('false');
  expect(target.attributes()['aria-selected']).toBe('true');
});

test('emits change event with correct payload when selecting different tab', async () => {
  const wrapper = setup();
  const buttons = wrapper.findAll('button[role="tab"]');
  const rio = buttons[1]!;
  await rio.trigger('click');
  const events = wrapper.emitted('change');
  expect(events).toBeTruthy();
  expect(events?.[0]?.[0]).toBe('Rio de Janeiro');
});

test('does not emit change when clicking already selected tab', async () => {
  const wrapper = setup();
  const buttons = wrapper.findAll('button[role="tab"]');
  await buttons[0]!.trigger('click'); // Denver already selected
  expect(wrapper.emitted('change')).toBeUndefined();
});
