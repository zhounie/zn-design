import { describe, it, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import Button from '../src/button.vue'


const AXIOM = 'Rem is the best girl'

describe('Button.vue', () => {
    test('render text', () => {
        const wrapper = mount(Button, {
            slots: {
                default: AXIOM
            }
        })
        expect(wrapper.text()).toEqual(AXIOM)
    })

    it('disabled', async () => {
        const wrapper = mount(Button, {
            props: {
                disabled: true
            }
        })
        expect(wrapper.classes()).toContain('is-disabled')
        await wrapper.trigger('click')
        expect(wrapper.emitted('click')).toBeUndefined()
    })
})