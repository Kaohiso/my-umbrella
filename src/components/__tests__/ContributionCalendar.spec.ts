import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import ContributionCalendar from '../ContributionCalendar.vue'
import moment from 'moment'

describe('Contribution calendar html', () => {
  it('renders a list of week (odd)', () => {
    const wrapper = mount(ContributionCalendar)

    expect(wrapper.findAll('span')).toHaveLength(3)

    expect(wrapper.text()).toContain('Mon')
    expect(wrapper.text()).toContain('Wed')
    expect(wrapper.text()).toContain('Fri')
  })
})

describe('Contribution calendar methods', () => {
  it('renders a date like January 1st', () => {
    const dateTest = new Date('2025-01-01')
    expect(moment(dateTest).format('MMMM Do')).toBe('January 1st')
  })
})
