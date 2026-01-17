import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

/*
test('Verify the blogform component', async () => {
  const handleAddBlog = vi.fn()
  const handleTitleChange = vi.fn()
  const handleAuthorChange = vi.fn()
  const handleUrlChange = vi.fn()
  const handleLikesChange = vi.fn()
  
  const user = userEvent.setup()
  
  render(<BlogForm 
    newTitle=""
    newAuthor=""
    newUrl=""
    likes=""
    handleAddBlog={handleAddBlog} 
    handleTitleChange={handleTitleChange} 
    handleAuthorChange={handleAuthorChange}
    handleUrlChange={handleUrlChange} 
    handleLikesChange={handleLikesChange}
  />)
  
  const titleInput = screen.getByPlaceholderText('write title here')
  const authorInput = screen.getByPlaceholderText('write author here')
  const urlInput = screen.getByPlaceholderText('write url here')
  const sendButton = screen.getByText('add')
  
  await user.type(titleInput, 'testing new title')
  await user.type(authorInput, 'testing new author')
  await user.type(urlInput, 'testing new url')
  await user.click(sendButton)
  
  // Just verify the form submission handler was called
  expect(handleAddBlog).toHaveBeenCalledTimes(1)
  
  // Verify change handlers were called with the typed values
  expect(handleTitleChange).toHaveBeenCalled()
  expect(handleAuthorChange).toHaveBeenCalled()
  expect(handleUrlChange).toHaveBeenCalled()
})

  Yritä modata blogform niin että tämä toimii!
    Ongelma on APP.jsxssä oleva blogForm - käyttö

*/
test('Verify the blogform component', async () => {
  const createBlog = vi.fn()
  const user = userEvent.setup()
  
  render(<BlogForm createBlog={createBlog} />)
  
  await user.type(screen.getByPlaceholderText('write title here'), 'testing new title')
  await user.type(screen.getByPlaceholderText('write author here'), 'testing new author')
  await user.type(screen.getByPlaceholderText('write url here'), 'testing new url')
  await user.click(screen.getByText('add'))
  
  expect(createBlog).toHaveBeenCalledTimes(1)
  expect(createBlog.mock.calls[0][0].title).toBe('testing new title')
  expect(createBlog.mock.calls[0][0].author).toBe('testing new author')
  expect(createBlog.mock.calls[0][0].url).toBe('testing new url')
})