import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

test('render blog', () => {
  const blog = {
    title: 'jest testing',
    author: 'me',
    url: 'url.com',
    likes: 99
  }

  const component = render(
    <Blog blogs={[blog]} />
  )

  expect(component.container).toHaveTextContent(
    'jest testing me'
  )

  component.debug()
})