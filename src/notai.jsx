import React, { useState } from 'react';

function PersonalNotesApp() {
  // Initial data
  const initialNotes = [
    {
      id: 1,
      title: "Babel",
      body: "Babel merupakan tools open-source yang digunakan untuk mengubah sintaks ECMAScript 2015+ menjadi sintaks yang didukung oleh JavaScript engine versi lama. Babel sering dipakai ketika kita menggunakan sintaks terbaru termasuk sintaks JSX.",
      archived: false,
      createdAt: '2022-04-14T04:27:34.572Z'
    }
  ];

  // States
  const [notes, setNotes] = useState(initialNotes);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const maxTitleLength = 50;

  // Handlers
  function handleTitleChange(e) {
    const newTitle = e.target.value;
    if (newTitle.length <= maxTitleLength) {
      setTitle(newTitle);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return;

    const newNote = {
      id: +new Date(),
      title: title.trim(),
      body: body.trim(),
      archived: false,
      createdAt: new Date().toISOString()
    };

    setNotes([...notes, newNote]);
    setTitle('');
    setBody('');
  }

  function handleDelete(id) {
    setNotes(notes.filter(note => note.id !== id));
  }

  function handleArchive(id) {
    setNotes(notes.map(note => 
      note.id === id ? { ...note, archived: !note.archived } : note
    ));
  }

  function handleSearch(e) {
    setSearchKeyword(e.target.value);
  }

  // Filter notes based on search and archive status
  function filterNotes(archived) {
    return notes.filter(note => {
      // Filter berdasarkan status arsip
      const archiveMatch = note.archived === archived;
      
      // Filter berdasarkan keyword pencarian (jika ada)
      const searchMatch = searchKeyword.trim() === '' || 
        note.title.toLowerCase().includes(searchKeyword.toLowerCase());
      
      return archiveMatch && searchMatch;
    });
  }

  const activeNotes = filterNotes(false);
  const archivedNotes = filterNotes(true);

  // Note List Component
  function NotesList({ notes, type }) {
    return (
      <div className="notes-section">
        <h2>{type} Notes</h2>
        {notes.length === 0 ? (
          <p className="empty-notes">No {type.toLowerCase()} notes</p>
        ) : (
          <div className="notes-grid">
            {notes.map(note => (
              <div key={note.id} className="note-card">
                <div className="note-header">
                  <h3>{note.title}</h3>
                  <small>{new Date(note.createdAt).toLocaleDateString()}</small>
                </div>
                <div className="note-body">
                  <p>{note.body}</p>
                </div>
                <div className="note-footer">
                  <button
                    className="button archive-button"
                    onClick={() => handleArchive(note.id)}
                  >
                    {note.archived ? 'Unarchive' : 'Archive'}
                  </button>
                  <button
                    className="button delete-button"
                    onClick={() => handleDelete(note.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="app-container">
      <h1>Personal Notes</h1>
      
      {/* Search Bar */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search notes..."
          className="search-input"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
        />
      </div>

      {/* Add Note Form */}
      <div className="form-container">
        <h2>Add New Note</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={handleTitleChange}
              className="form-input"
            />
            <p className="char-counter">
              Characters remaining: {maxTitleLength - title.length}
            </p>
          </div>
          <div className="form-group">
            <textarea
              placeholder="Note content..."
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="form-textarea"
              rows={4}
            />
          </div>
          <button 
            type="submit" 
            className="button submit-button"
            disabled={!title.trim() || !body.trim()}
          >
            Add Note
          </button>
        </form>
      </div>

      {/* Active Notes */}
      <NotesList notes={activeNotes} type="Active" />

      {/* Archived Notes */}
      <NotesList notes={archivedNotes} type="Archived" />

      <style jsx>{`
        .app-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
        }

        .search-container {
          margin-bottom: 20px;
        }

        .search-input {
          width: 100%;
          padding: 8px;
          border: 1px solid #ddd;
          border-radius: 4px;
        }

        .form-container {
          background: #f5f5f5;
          padding: 20px;
          border-radius: 8px;
          margin-bottom: 20px;
        }

        .form-group {
          margin-bottom: 15px;
        }

        .form-input,
        .form-textarea {
          width: 100%;
          padding: 8px;
          border: 1px solid #ddd;
          border-radius: 4px;
          margin-bottom: 5px;
        }

        .char-counter {
          font-size: 0.8em;
          color: #666;
        }

        .button {
          padding: 8px 16px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        .button:disabled {
          background: #ccc;
          cursor: not-allowed;
        }

        .submit-button {
          background: #4CAF50;
          color: white;
        }

        .submit-button:hover {
          background: #45a049;
        }

        .notes-section {
          margin-top: 30px;
        }

        .notes-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 20px;
          margin-top: 20px;
        }

        .note-card {
          background: white;
          border: 1px solid #ddd;
          border-radius: 8px;
          padding: 15px;
        }

        .note-header {
          margin-bottom: 10px;
        }

        .note-header h3 {
          margin: 0;
          margin-bottom: 5px;
        }

        .note-body {
          margin-bottom: 15px;
        }

        .note-footer {
          display: flex;
          justify-content: flex-end;
          gap: 10px;
        }

        .archive-button {
          background: #2196F3;
          color: white;
        }

        .delete-button {
          background: #f44336;
          color: white;
        }

        .empty-notes {
          color: #666;
          text-align: center;
          padding: 20px;
        }
      `}</style>
    </div>
  );
}

export default PersonalNotesApp;