import { mount } from '@vue/test-utils';
import { test, expect } from 'vitest';
import { nextTick } from 'vue';

import UserName from '@/components/UserName.vue';

function mountComponent(name: string) {
  return mount(UserName, { props: { name } });
}

test('renders static span with name when not editing', () => {
  const wrapper = mountComponent('Alice');
  expect(wrapper.find('span[role="button"]').exists()).toBe(true);
  expect(wrapper.text()).toContain('Alice');
  expect(wrapper.find('input').exists()).toBe(false);
});

test('enters edit mode when span is clicked', async () => {
  const wrapper = mountComponent('Bob');
  await wrapper.find('span[role="button"]').trigger('click');
  expect(wrapper.find('input').exists()).toBe(true);
  expect((wrapper.find('input').element as HTMLInputElement).value).toBe('Bob');
});

test('emits update:name on commit via blur with trimmed value', async () => {
  const wrapper = mountComponent('Carol');
  await wrapper.find('span[role="button"]').trigger('click');
  const input = wrapper.find('input');
  await input.setValue('  Caroline  ');
  await input.trigger('blur');
  const events = wrapper.emitted('update:name');
  expect(events && events[0] && events[0][0]).toBe('Caroline');
});

test('stays in edit mode if committing empty value', async () => {
  const wrapper = mountComponent('Dave');
  await wrapper.find('span[role="button"]').trigger('click');
  const input = wrapper.find('input');
  await input.setValue('   ');
  await input.trigger('blur');
  expect(wrapper.emitted('update:name')).toBeUndefined();
  expect(wrapper.find('input').exists()).toBe(true);
});

test('auto enters edit mode when mounted with empty name', async () => {
  const wrapper = mountComponent('');
  await nextTick();
  expect(wrapper.find('input').exists()).toBe(true);
});

test('cancels editing with Escape key', async () => {
  const wrapper = mountComponent('Eve');
  await wrapper.find('span[role="button"]').trigger('click');
  const input = wrapper.find('input');
  await input.trigger('keydown.esc');
  expect(wrapper.find('input').exists()).toBe(false);
  expect(wrapper.emitted('update:name')).toBeUndefined();
});
