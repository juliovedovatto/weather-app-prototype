import { mount } from '@vue/test-utils';
import { test, expect } from 'vitest';

import type { TabItem } from '@/models/app';

import CityTabs from '@/components/CityTabs.vue';
import { CITY_TABS } from '@/config';

const ITEMS: TabItem[] = CITY_TABS;

function setup(custom?: Partial<{ items: TabItem[] }>) {
  return mount(CityTabs, {
    props: {
      items: ITEMS,
      ...custom,
    },
  });
}

test('renders all city tabs', () => {
  const wrapper = setup();
  const buttons = wrapper.findAll('button[role="tab"]');
  expect(buttons.length).toBe(ITEMS.length);
  const labels = buttons.map((b) => b.text());
  expect(labels).toEqual(ITEMS.map((i) => i.label));
});

test('first (selected) tab is selected by default', () => {
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

test('emits tabSelected event with correct payload when selecting different tab', async () => {
  const wrapper = setup();
  const buttons = wrapper.findAll('button[role="tab"]');
  const rio = buttons[1]!;
  await rio.trigger('click');
  const events = wrapper.emitted('tabSelected');
  expect(events).toBeTruthy();
  expect(events?.[0]?.[0]).toBe('Rio de Janeiro');
});

test('does not emit tabSelected when clicking already selected tab', async () => {
  const wrapper = setup();
  const buttons = wrapper.findAll('button[role="tab"]');
  await buttons[0]!.trigger('click'); // already selected
  expect(wrapper.emitted('tabSelected')).toBeUndefined();
});
