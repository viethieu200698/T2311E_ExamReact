import React, { useState, useEffect } from 'react';

const AddInformationForm = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [favorite, setFavorite] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [genres] = useState(['Khoa học', 'Toán học', 'Văn học', 'Lịch sử','Truyện tranh','Sinh học']);

  useEffect(() => {
    const results = books.filter(book =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  }, [searchTerm, books]);

  const handleGenreClick = (genre) => {
    setSelectedGenre(genre);
    setSearchTerm('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    
    try {
      
      setSuccessMessage('File saved successfully');     
      const newBook = { title: title, author: author, favorite: favorite, genre: selectedGenre };
      setBooks([...books, newBook]);
      setTitle('');
      setAuthor('');
      setFavorite(false);
      setSelectedGenre('');
    } catch (error) {
      
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title text-center mb-4" style={{ color: '#007bff' }}>Thư viện tìm kiếm sách</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Tên sách:</label>
                  <input type="text" id="title" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="author" className="form-label">Tác giả:</label>
                  <input type="text" id="author" className="form-control" value={author} onChange={(e) => setAuthor(e.target.value)} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="genre" className="form-label">Thể loại:</label>
                  <div className="btn-group d-flex">
                    {genres.map((genre, index) => (
                      <button
                        key={index}
                        type="button"
                        className={`btn btn-outline-primary ${selectedGenre === genre ? 'active' : ''}`}
                        onClick={() => handleGenreClick(genre)}
                      >
                        {genre}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="mb-3 form-check">
                  <input type="checkbox" id="favorite" className="form-check-input" checked={favorite} onChange={(e) => setFavorite(e.target.checked)} />
                  <label htmlFor="favorite" className="form-check-label">Ưa thích</label>
                </div>
                <button type="submit" className="btn btn-primary">Tìm kiếm</button>
              </form>
              {successMessage && <p className="text-success text-center mt-3">{successMessage}</p>}
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-md-6 offset-md-3">
          <h3 className="text-center" style={{ color: '#007bff' }}>Danh sách sách</h3>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Tìm kiếm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <ul className="list-group">
            {searchResults.map((book, index) => (
              <li key={index} className="list-group-item">
                <strong style={{ color: '#007bff' }}>Title:</strong> {book.title}, <strong style={{ color: '#007bff' }}>Author:</strong> {book.author}, <strong style={{ color: '#007bff' }}>Favorite:</strong> {book.favorite ? 'Yes' : 'No'}, <strong style={{ color: '#007bff' }}>Genre:</strong> {book.genre}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AddInformationForm;
