import React from 'react'
import { mount } from 'enzyme'

import DataLoader from './DataLoader'

describe('DataLoader', () => {
  it('sets loading status when mounted', async () => {
    const childrenFn = jest.fn()
    childrenFn.mockReturnValue(<div />)

    const wrapper = await mount(
      <DataLoader path="/user/1">{childrenFn}</DataLoader>
    )

    expect(wrapper.state()).toEqual({
      data: null,
      error: null,
      loading: true,
    })
  })

  it('passes data to children', async () => {
    const data: Record<string, any> = { result: 'SOME_DATA' }
    window.fetch = jest.fn().mockImplementation(() => ({
      status: 200,
      then: () =>
        new Promise(resolve => {
          resolve(data)
        }),
    }))
    const childrenFn = jest.fn()
    childrenFn.mockReturnValue(<div />)

    const wrapper = await mount(
      <DataLoader path="/user/1">{childrenFn}</DataLoader>
    )

    expect(childrenFn).toBeCalledWith({
      data,
      error: null,
      loading: false,
    })
  })

  it('passes error state to children', async () => {
    const error: Record<string, any> = { error: 'SOME_ERROR' }

    window.fetch = jest.fn().mockImplementation(() => ({
      status: 200,
      then: () =>
        new Promise((_, reject) => {
          reject(error)
        }),
    }))

    const childrenFn = jest.fn()
    childrenFn.mockReturnValue(<div />)

    const wrapper = await mount(
      <DataLoader path="/user/1">{childrenFn}</DataLoader>
    )
    await wrapper.update()

    expect(childrenFn).toBeCalledWith({
      data: null,
      error,
      loading: false,
    })
  })
})
