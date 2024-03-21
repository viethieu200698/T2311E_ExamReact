// App.js
import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [bookInfo, setBookInfo] = useState({
    title: '',
    author: '',
    ISBN: ''
  });
  const [message, setMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [books, setBooks] = useState([]);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookInfo({
      ...bookInfo,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!bookInfo.title || !bookInfo.author || !bookInfo.ISBN) {
      setMessage('Please fill in all fields.');
      return;
    }

    // Save to JSON file (simulated)
    saveToJsonFile(bookInfo);
    setMessage('File saved successfully.');
    setBookInfo({ title: '', author: '', ISBN: '' });
  };

  const saveToJsonFile = (data) => {
    // In a real application, you would perform actual file saving operations here
    setBooks([...books, data]); // Simulating adding book to a list
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredBooks = books.filter(book => {
    const { title, author, ISBN } = book;
    return title.toLowerCase().includes(searchTerm.toLowerCase()) ||
           author.toLowerCase().includes(searchTerm.toLowerCase()) ||
           ISBN.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="container">
      <h1>Hệ thống quản lý thư viện</h1>
      <div className="search-bar">
        <input type="text" placeholder="Tìm kiếm..." value={searchTerm} onChange={handleSearch} />
      </div>
      <div className="add-book">
        <h2>Thêm một cuốn sách mới</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Tiêu đề:</label>
            <input type="text" name="Tiêu đề" value={bookInfo.title} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label>Tác giả :</label>
            <input type="text" name="Tác Giả" value={bookInfo.author} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label>ISBN:</label>
            <input type="text" name="ISBN" value={bookInfo.ISBN} onChange={handleInputChange} />
          </div>
          <button type="submit">Thêm sách</button>
        </form>
        {message && <p className="message">{message}</p>}
      </div>
      <div className="Danh sách">
        <h2>Danh sách</h2>
        <ul>
          {filteredBooks.map((book, index) => (
            <li key={index}>
              <strong>Title:</strong> {book.title}, <strong>Author:</strong> {book.author}, <strong>ISBN:</strong> {book.ISBN}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;