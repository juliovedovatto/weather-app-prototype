import { mount } from '@vue/test-utils';
import { test, expect, vi, beforeEach } from 'vitest';
import { ref, type Ref, nextTick } from 'vue';

import CitySearch from '@/components/search/CitySearch.vue';

type MockLocation = { url: string; name: string; country: string; region: string };
interface QueryState {
  data: Ref<MockLocation[] | null>;
  isLoading: Ref<boolean>;
  isError: Ref<boolean>;
  isFetching: Ref<boolean>;
}

let currentQueryState: QueryState;

function setQueryState(
  options: Partial<{ data: MockLocation[] | null; isLoading: boolean; isError: boolean; isFetching: boolean }>,
) {
  currentQueryState = {
    data: ref(options.data ?? null),
    isLoading: ref(options.isLoading ?? false),
    isError: ref(options.isError ?? false),
    isFetching: ref(options.isFetching ?? false),
  };
}

vi.mock('@/queries/search.query', () => ({
  useCitySearchQuery: () => currentQueryState,
}));

beforeEach(() => {
  setQueryState({ data: null, isLoading: false, isError: false, isFetching: false });
});

function setup() {
  return mount(CitySearch);
}

test('shows validation message when input fewer than min chars', async () => {
  const wrapper = setup();
  const input = wrapper.find('#city-search');
  await input.setValue('a');
  await nextTick();
  expect(wrapper.text()).toContain('Enter at least 2 characters');
});

test('shows loading state while searching', async () => {
  setQueryState({ data: null, isLoading: true, isFetching: true });
  const wrapper = setup();
  const input = wrapper.find('#city-search');
  await input.setValue('Pa');
  await nextTick();
  expect(wrapper.text()).toContain('Searching...');
  expect(wrapper.find('ul').exists()).toBe(false);
});

test('shows "No results" when search completes with empty array', async () => {
  setQueryState({ data: [], isLoading: false, isError: false, isFetching: false });
  const wrapper = setup();
  const input = wrapper.find('#city-search');
  await input.setValue('Lo');
  await nextTick();
  expect(wrapper.find('ul').exists()).toBe(true);
  expect(wrapper.text()).toContain('No results');
});

test('emits city-added and clears input when selecting a result', async () => {
  setQueryState({ data: [{ url: 'paris', name: 'Paris', country: 'France', region: 'Ile-de-France' }] });
  const wrapper = setup();
  const input = wrapper.find('#city-search');
  await input.setValue('Pa');
  await nextTick();
  const resultBtn = wrapper.find('ul li button');
  expect(resultBtn.exists()).toBe(true);
  await resultBtn.trigger('click');
  const events = wrapper.emitted('city-added');
  expect(events).toBeTruthy();
  expect(events?.[0]?.[0]).toBe('Paris');
  expect((input.element as HTMLInputElement).value).toBe('');
});

test('does not emit city-added for blank trimmed name', async () => {
  setQueryState({ data: [{ url: 'blank', name: '   ', country: 'Nowhere', region: '' }] });
  const wrapper = setup();
  const input = wrapper.find('#city-search');
  await input.setValue('Bl');
  await nextTick();
  const btn = wrapper.find('ul li button');
  await btn.trigger('click');
  expect(wrapper.emitted('city-added')).toBeUndefined();
});
