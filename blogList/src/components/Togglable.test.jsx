import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Togglable from './Togglable'
import BlogDetails from './BlogDetails'

const blogs = [{
    id:1,
    title: 'Testing Title',
    author: 'Test Author',
    url: 'Test URL',
    likes: 1
}]

const mockHandler = vi.fn()

describe('<Togglable />', () => {
  beforeEach(() => {
    render(
        <Togglable buttonLabel="show details">
        <BlogDetails blogs={blogs} handleAddLike={mockHandler} handleBlogDelete={mockHandler} />
        </Togglable>
    )
  })

  test('renders its children', () => {
    screen.getByText('Blog Details')
  })

  test('at start the children are not displayed', () => {
    const element = screen.getByText('Blog Details')
    expect(element).not.toBeVisible()
  })

  test('after clicking the button, children are displayed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('show details')
    await user.click(button)

    const urlTest = screen.getByText('Test URL')
    const likesTest = screen.getByText('1')

    expect(urlTest).toBeDefined()
    expect(likesTest).toBeDefined()
  })

})