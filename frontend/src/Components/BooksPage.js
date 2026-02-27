import React, { useState, useEffect } from 'react';
import './BooksPage.css';

// SVG Icons (same as before, keeping them concise)
const Icons = {
  Books: ({ size = 24, color = "currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" stroke={color} strokeWidth="2"/>
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" stroke={color} strokeWidth="2"/>
    </svg>
  ),
  Search: ({ size = 24, color = "currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="11" cy="11" r="8" stroke={color} strokeWidth="2"/>
      <path d="M21 21l-4.35-4.35" stroke={color} strokeWidth="2"/>
    </svg>
  ),
  User: ({ size = 24, color = "currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke={color} strokeWidth="2"/>
      <circle cx="12" cy="7" r="4" stroke={color} strokeWidth="2"/>
    </svg>
  ),
  Users: ({ size = 24, color = "currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke={color} strokeWidth="2"/>
      <circle cx="9" cy="7" r="4" stroke={color} strokeWidth="2"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke={color} strokeWidth="2"/>
    </svg>
  ),
  Plus: ({ size = 24, color = "currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 5v14M5 12h14" stroke={color} strokeWidth="2"/>
    </svg>
  ),
  Edit: ({ size = 24, color = "currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke={color} strokeWidth="2"/>
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke={color} strokeWidth="2"/>
    </svg>
  ),
  Trash: ({ size = 24, color = "currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke={color} strokeWidth="2"/>
    </svg>
  ),
  Close: ({ size = 24, color = "currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M18 6L6 18M6 6l12 12" stroke={color} strokeWidth="2"/>
    </svg>
  ),
  Eye: ({ size = 24, color = "currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke={color} strokeWidth="2"/>
      <circle cx="12" cy="12" r="3" stroke={color} strokeWidth="2"/>
    </svg>
  ),
  Grid: ({ size = 24, color = "currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="3" y="3" width="7" height="7" stroke={color} strokeWidth="2"/>
      <rect x="14" y="3" width="7" height="7" stroke={color} strokeWidth="2"/>
      <rect x="3" y="14" width="7" height="7" stroke={color} strokeWidth="2"/>
      <rect x="14" y="14" width="7" height="7" stroke={color} strokeWidth="2"/>
    </svg>
  ),
  List: ({ size = 24, color = "currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <line x1="8" y1="6" x2="21" y2="6" stroke={color} strokeWidth="2"/>
      <line x1="8" y1="12" x2="21" y2="12" stroke={color} strokeWidth="2"/>
      <line x1="8" y1="18" x2="21" y2="18" stroke={color} strokeWidth="2"/>
      <line x1="3" y1="6" x2="3.01" y2="6" stroke={color} strokeWidth="2"/>
      <line x1="3" y1="12" x2="3.01" y2="12" stroke={color} strokeWidth="2"/>
      <line x1="3" y1="18" x2="3.01" y2="18" stroke={color} strokeWidth="2"/>
    </svg>
  ),
  ChevronLeft: ({ size = 24, color = "currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M15 18l-6-6 6-6" stroke={color} strokeWidth="2"/>
    </svg>
  ),
  ChevronRight: ({ size = 24, color = "currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M9 18l6-6-6-6" stroke={color} strokeWidth="2"/>
    </svg>
  ),
  Check: ({ size = 24, color = "currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M20 6L9 17l-5-5" stroke={color} strokeWidth="2"/>
    </svg>
  ),
  Refresh: ({ size = 24, color = "currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" stroke={color} strokeWidth="2"/>
      <path d="M3 3v5h5" stroke={color} strokeWidth="2"/>
    </svg>
  ),
  Star: ({ size = 24, color = "currentColor", filled = false }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? color : "none"}>
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke={color} strokeWidth="2"/>
    </svg>
  ),
  Clock: ({ size = 24, color = "currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2"/>
      <path d="M12 6v6l4 2" stroke={color} strokeWidth="2"/>
    </svg>
  ),
  Calendar: ({ size = 24, color = "currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="3" y="4" width="18" height="18" rx="2" stroke={color} strokeWidth="2"/>
      <path d="M16 2v4M8 2v4M3 10h18" stroke={color} strokeWidth="2"/>
    </svg>
  ),
  DollarSign: ({ size = 24, color = "currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <line x1="12" y1="1" x2="12" y2="23" stroke={color} strokeWidth="2"/>
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" stroke={color} strokeWidth="2"/>
    </svg>
  ),
  AlertCircle: ({ size = 24, color = "currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2"/>
      <line x1="12" y1="8" x2="12" y2="12" stroke={color} strokeWidth="2"/>
      <line x1="12" y1="16" x2="12.01" y2="16" stroke={color} strokeWidth="2"/>
    </svg>
  ),
  History: ({ size = 24, color = "currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" stroke={color} strokeWidth="2"/>
      <path d="M3 3v5h5" stroke={color} strokeWidth="2"/>
    </svg>
  ),
  Download: ({ size = 24, color = "currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" stroke={color} strokeWidth="2"/>
    </svg>
  ),
};

const BooksPage = () => {
  // State Management
  const [userRole, setUserRole] = useState('admin');
  const [activeTab, setActiveTab] = useState('books');
  
  // Books State
  const [bookPage, setBookPage] = useState(0);
const [bookSize, setBookSize] = useState(10);
const [bookTotalPages, setBookTotalPages] = useState(0);
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState(['all']);
  const [selectedPublishers, setSelectedPublishers] = useState(['all']);
  const [selectedAuthors, setSelectedAuthors] = useState(['all']);
  const [availability, setAvailability] = useState('all');
  const [minRating, setMinRating] = useState(0);
  const [yearRange, setYearRange] = useState({ from: '', to: '' });
  const [sortBy, setSortBy] = useState('title-asc');
  const [viewMode, setViewMode] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);

  // Members State
  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [memberSearchTerm, setMemberSearchTerm] = useState('');
  const [selectedMembershipTypes, setSelectedMembershipTypes] = useState(['all']);
  const [memberStatus, setMemberStatus] = useState('all');

  // Borrowing State
  const [borrowRecords, setBorrowRecords] = useState([]);
  const [filteredBorrowRecords, setFilteredBorrowRecords] = useState([]);
  const [borrowStatus, setBorrowStatus] = useState('all');

  // Modal States
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isBorrowModalOpen, setIsBorrowModalOpen] = useState(false);
  const [isMemberModalOpen, setIsMemberModalOpen] = useState(false);
  const [isMemberDetailsModalOpen, setIsMemberDetailsModalOpen] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [isPenaltyModalOpen, setIsPenaltyModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  
  // Form States
  const [currentBook, setCurrentBook] = useState(null);
  const [currentMember, setCurrentMember] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedMember, setSelectedMember] = useState(null);
  const [confirmAction, setConfirmAction] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
const loadBooks = async (page = bookPage, size = bookSize) => {
  try {
    let url = `http://localhost:8080/api/books?page=${page}&size=${size}`;

    if (!selectedCategories.includes('all')) {
      url += `&genre=${selectedCategories[0]}`;
    }

    if (!selectedAuthors.includes('all')) {
      url += `&author=${selectedAuthors[0]}`;
    }

    if (!selectedPublishers.includes('all')) {
      url += `&publisher=${selectedPublishers[0]}`;
    }

    if (searchTerm) {
      url += `&title=${searchTerm}`;
    }

    const res = await fetch(url);
    const data = await res.json();

    setBooks(data.content);
    setFilteredBooks(data.content);
    setBookTotalPages(data.totalPages);
  } catch (err) {
    console.error(err);
  }
};
  // Initialize Sample Data
 useEffect(() => {
  loadBooks();
  loadIssues();
}, []);

  // Get unique publishers and authors
  const publishers = ['all', ...new Set(books.map(b => b.publisher))];
  const authors = ['all', ...new Set(books.map(b => b.author))];

  // Filtering Logic for Books
useEffect(() => {
  loadBooks(bookPage, bookSize);
}, [bookPage, bookSize, selectedCategories, selectedAuthors, selectedPublishers, searchTerm]);

const loadMembers = async (page = 0, size = 10) => {
  try {
    const res = await fetch(
      `http://localhost:8080/api/members?page=${page}&size=${size}`
    );

    const data = await res.json();

    setMembers(data.content);
    setFilteredMembers(data.content);
  } catch (err) {
    console.error(err);
  }
};
  // Filtering Logic for Members
  useEffect(() => {
    let result = [...members];

    if (memberSearchTerm) {
      result = result.filter(member =>
        member.name.toLowerCase().includes(memberSearchTerm.toLowerCase()) ||
        member.email.toLowerCase().includes(memberSearchTerm.toLowerCase()) ||
        member.phone.includes(memberSearchTerm)
      );
    }

    if (!selectedMembershipTypes.includes('all')) {
      result = result.filter(member => selectedMembershipTypes.includes(member.membershipType));
    }

    if (memberStatus !== 'all') {
      result = result.filter(member => member.status === memberStatus);
    }

    setFilteredMembers(result);
    setCurrentPage(1);
  }, [memberSearchTerm, selectedMembershipTypes, memberStatus, members]);

  // Filtering Logic for Borrow Records
  useEffect(() => {
    let result = [...borrowRecords];

    if (borrowStatus !== 'all') {
      result = result.filter(record => record.status === borrowStatus);
    }

    setFilteredBorrowRecords(result);
    setCurrentPage(1);
  }, [borrowStatus, borrowRecords]);

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  
  const currentItems = activeTab === 'books' 
    ? filteredBooks.slice(indexOfFirstItem, indexOfLastItem)
    : activeTab === 'members'
    ? filteredMembers.slice(indexOfFirstItem, indexOfLastItem)
    : filteredBorrowRecords.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(
    (activeTab === 'books' ? filteredBooks.length :
     activeTab === 'members' ? filteredMembers.length :
     filteredBorrowRecords.length) / itemsPerPage
  );

  // Handlers
  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
  };

  const handleCategoryChange = (category) => {
    if (category === 'all') {
      setSelectedCategories(['all']);
    } else {
      let newCategories = selectedCategories.filter(c => c !== 'all');
      if (newCategories.includes(category)) {
        newCategories = newCategories.filter(c => c !== category);
      } else {
        newCategories.push(category);
      }
      setSelectedCategories(newCategories.length === 0 ? ['all'] : newCategories);
    }
  };

  const handlePublisherChange = (publisher) => {
    if (publisher === 'all') {
      setSelectedPublishers(['all']);
    } else {
      let newPublishers = selectedPublishers.filter(p => p !== 'all');
      if (newPublishers.includes(publisher)) {
        newPublishers = newPublishers.filter(p => p !== publisher);
      } else {
        newPublishers.push(publisher);
      }
      setSelectedPublishers(newPublishers.length === 0 ? ['all'] : newPublishers);
    }
  };

  const handleAuthorChange = (author) => {
    if (author === 'all') {
      setSelectedAuthors(['all']);
    } else {
      let newAuthors = selectedAuthors.filter(a => a !== 'all');
      if (newAuthors.includes(author)) {
        newAuthors = newAuthors.filter(a => a !== author);
      } else {
        newAuthors.push(author);
      }
      setSelectedAuthors(newAuthors.length === 0 ? ['all'] : newAuthors);
    }
  };

  const handleMembershipTypeChange = (type) => {
    if (type === 'all') {
      setSelectedMembershipTypes(['all']);
    } else {
      let newTypes = selectedMembershipTypes.filter(t => t !== 'all');
      if (newTypes.includes(type)) {
        newTypes = newTypes.filter(t => t !== type);
      } else {
        newTypes.push(type);
      }
      setSelectedMembershipTypes(newTypes.length === 0 ? ['all'] : newTypes);
    }
  };

  const resetFilters = () => {
    setSelectedCategories(['all']);
    setSelectedPublishers(['all']);
    setSelectedAuthors(['all']);
    setAvailability('all');
    setMinRating(0);
    setYearRange({ from: '', to: '' });
    setSearchTerm('');
    setMemberSearchTerm('');
    setSelectedMembershipTypes(['all']);
    setMemberStatus('all');
    setBorrowStatus('all');
  };

  // Book CRUD Operations
  const handleAddBook = () => {
    if (userRole === 'user') {
      showToast('Only admins and librarians can add books', 'error');
      return;
    }
    setIsEditMode(false);
    setCurrentBook(null);
    setIsBookModalOpen(true);
  };
const fetchBookById = async (id) => {
  const res = await fetch(`http://localhost:8080/api/books/${id}`);
  const data = await res.json();
  setSelectedBook(data);
};
  const handleEditBook = (book) => {
    if (userRole === 'user') {
      showToast('Only admins and librarians can edit books', 'error');
      return;
    }
    setIsEditMode(true);
    setCurrentBook(book);
    setIsBookModalOpen(true);
  };
const handleDeleteBook = (book) => {
  if (userRole === 'user') {
    showToast('Only admins and librarians can delete books', 'error');
    return;
  }

  setSelectedBook(book);

  setConfirmAction(() => async () => {
    try {
      await fetch(`http://localhost:8080/api/books/${book.id}`, {
        method: "DELETE"
      });

      showToast('Book deleted successfully', 'success');
      loadBooks(); // refresh list
    } catch (error) {
      console.error(error);
      showToast('Failed to delete book', 'error');
    }

    setIsConfirmModalOpen(false);
  });

  setIsConfirmModalOpen(true);
};
  const handleSubmitBook = async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);

  const bookData = {
    title: formData.get("title"),
    series: null,
    description: formData.get("description"),
    pages: parseInt(formData.get("pages")),
    publicationDate: formData.get("publicationDate"),
    language: formData.get("language"),
    rating: parseFloat(formData.get("rating")),
    ratings: 0,
    imageURL: formData.get("imageURL"),
    genre: formData.get("genre"),
    author: formData.get("author"),
    publisher: formData.get("publisher"),
    availability: parseInt(formData.get("availability")),
    mrp: parseFloat(formData.get("mrp"))
  };

  if (isEditMode) {
    await fetch(`http://localhost:8080/api/books/${currentBook.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bookData)
    });
  } else {
    await fetch("http://localhost:8080/api/books", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bookData)
    });
  }

  loadBooks();
  setIsBookModalOpen(false);
};
  // Member CRUD Operations
  const handleAddMember = () => {
    if (userRole === 'user') {
      showToast('Only admins and librarians can add members', 'error');
      return;
    }
    setIsEditMode(false);
    setCurrentMember(null);
    setIsMemberModalOpen(true);
  };

  const handleEditMember = (member) => {
    if (userRole === 'user') {
      showToast('Only admins and librarians can edit members', 'error');
      return;
    }
    setIsEditMode(true);
    setCurrentMember(member);
    setIsMemberModalOpen(true);
  };

 const handleDeleteMember = (member) => {
  if (userRole === 'user') {
    showToast('Only admins and librarians can delete members', 'error');
    return;
  }

  setSelectedMember(member);

  setConfirmAction(() => async () => {
    await fetch(`http://localhost:8080/api/members/${member.id}`, {
      method: "DELETE"
    });

    loadMembers();
    showToast('Member deleted successfully', 'success');
    setIsConfirmModalOpen(false);
  });

  setIsConfirmModalOpen(true);
};
useEffect(() => {
  if (activeTab === 'members') {
    loadMembers();
  }
}, [activeTab]);
  const handleSubmitMember = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const memberData = {
      id: currentMember?.id || Date.now(),
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      address: formData.get('address'),
      membershipType: formData.get('membershipType'),
      membershipFee: parseFloat(formData.get('membershipFee')),
      joinDate: formData.get('joinDate'),
      expiryDate: formData.get('expiryDate'),
      status: formData.get('status'),
      borrowedBooks: currentMember?.borrowedBooks || 0,
      overdueBooks: currentMember?.overdueBooks || 0,
      totalPenalties: currentMember?.totalPenalties || 0,
    };

    if (isEditMode) {
      setMembers(members.map(m => m.id === memberData.id ? memberData : m));
      showToast('Member updated successfully', 'success');
    } else {
      setMembers([...members, memberData]);
      showToast('Member added successfully', 'success');
    }
    setIsMemberModalOpen(false);
  };

  // Borrowing Operations
  const handleBorrowBook = (book) => {
    if (book.availability === 0) {
      showToast('No copies available for borrowing', 'error');
      return;
    }
    setSelectedBook(book);
    setIsBorrowModalOpen(true);
  };
const loadIssues = async () => {
  try {
    const res = await fetch("http://localhost:8080/api/issues");
    const data = await res.json();
    setBorrowRecords(data);
    setFilteredBorrowRecords(data);
  } catch (err) {
    console.error(err);
  }
};
const loadMemberHistory = async (userId) => {
  const res = await fetch(
    `http://localhost:8080/api/members/${userId}/history`
  );
  const data = await res.json();
  setBorrowRecords(data);
};
const handleSubmitBorrow = async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);

  try {
    await fetch("http://localhost:8080/api/issues", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        bookId: selectedBook.id,
        username: formData.get("username")
      })
    });

    showToast("Book issued successfully");
    loadBooks();
    loadIssues();
    setIsBorrowModalOpen(false);
  } catch (err) {
    console.error(err);
    showToast("Issue failed", "error");
  }
};
 const handleReturnBook = async (issueId) => {
  await fetch("http://localhost:8080/api/returns", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
  issueId,
  status: "RETURNED"
})
  });

  loadBooks();
  loadIssues();
};

  const handleViewDetails = (book) => {
    setSelectedBook(book);
    setIsDetailsModalOpen(true);
  };

  const handleViewMemberDetails = (member) => {
    setSelectedMember(member);
    setIsMemberDetailsModalOpen(true);
  };

  const handleViewHistory = (member) => {
    setSelectedMember(member);
    setIsHistoryModalOpen(true);
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Icons.Star 
          key={i} 
          size={16} 
          color="#FF9B7A" 
          filled={i <= Math.round(rating)} 
        />
      );
    }
    return stars;
  };

  // Component Renderers
  const BookCard = ({ book }) => (
    <div className={`book-card ${viewMode}`}>
      <div className="book-cover">
        <img src={book.imageURL} alt={book.title} />
        <div className="book-overlay">
          <button className="btn-icon" onClick={() => handleViewDetails(book)} title="View Details">
            <Icons.Eye size={20} />
          </button>
          {(userRole === 'admin' || userRole === 'librarian') && (
            <>
              <button className="btn-icon" onClick={() => handleEditBook(book)} title="Edit Book">
                <Icons.Edit size={20} />
              </button>
              <button className="btn-icon btn-danger" onClick={() => handleDeleteBook(book)} title="Delete Book">
                <Icons.Trash size={20} />
              </button>
            </>
          )}
        </div>
        <div className={`availability-badge ${book.availability > 0 ? 'available' : 'borrowed'}`}>
  {book.availability > 0 ? `${book.availability} Available` : 'Not Available'}
</div>
      </div>
      <div className="book-info">
        <h3 className="book-title">{book.title}</h3>
        <p className="book-author">{book.author}</p>
        <p className="book-publisher">{book.publisher}</p>
        <div className="book-meta">
          <span className="book-year">
  {new Date(book.publicationDate).getFullYear()}
</span>
          <span className="book-category">{book.category}</span>
          <span className="book-genre">{book.genre}</span>
        </div>
        <div className="book-rating">
          {renderStars(book.rating)}
          <span>{book.rating}</span>
        </div>
        <div className="book-actions">
          {book.availability > 0 ? (
            <button className="btn-primary-small" onClick={() => handleBorrowBook(book)}>
              Borrow Book
            </button>
          ) : (
            (userRole === 'admin' || userRole === 'librarian') && (
              <button className="btn-secondary-small" disabled>
                All Borrowed
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );

  const MemberCard = ({ member }) => (
    <div className="member-card">
      <div className="member-header">
        <div className="member-avatar">
          <Icons.User size={32} color="#FF9B7A" />
        </div>
        <div className="member-info">
          <h3>{member.name}</h3>
          <p>{member.email}</p>
          <p>{member.phone}</p>
        </div>
        <div className={`member-status status-${member.status}`}>
          {member.status}
        </div>
      </div>
      <div className="member-details">
        <div className="detail-row">
          <span className="label">Membership:</span>
          <span className={`membership-type type-${member.membershipType}`}>
            {member.membershipType}
          </span>
        </div>
        <div className="detail-row">
          <span className="label">Fee:</span>
          <span>${member.membershipFee.toFixed(2)}/year</span>
        </div>
        <div className="detail-row">
          <span className="label">Joined:</span>
          <span>{member.joinDate}</span>
        </div>
        <div className="detail-row">
          <span className="label">Expires:</span>
          <span>{member.expiryDate}</span>
        </div>
        <div className="detail-row">
          <span className="label">Borrowed:</span>
          <span>{member.borrowedBooks} books</span>
        </div>
        {member.overdueBooks > 0 && (
          <div className="detail-row overdue">
            <span className="label">Overdue:</span>
            <span>{member.overdueBooks} books</span>
          </div>
        )}
        {member.totalPenalties > 0 && (
          <div className="detail-row penalty">
            <span className="label">Penalties:</span>
            <span>${member.totalPenalties.toFixed(2)}</span>
          </div>
        )}
      </div>
      <div className="member-actions">
        <button className="btn-icon-text" onClick={() => handleViewHistory(member)}>
          <Icons.History size={18} />
          History
        </button>
        {(userRole === 'admin' || userRole === 'librarian') && (
          <>
            <button className="btn-icon-text" onClick={() => handleEditMember(member)}>
              <Icons.Edit size={18} />
              Edit
            </button>
            <button className="btn-icon-text btn-danger" onClick={() => handleDeleteMember(member)}>
              <Icons.Trash size={18} />
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );

  const BorrowRecordRow = ({ record }) => (
    <tr className={`record-row status-${record.status}`}>
      <td>{record.bookTitle}</td>
      <td>{record.username}</td>
      <td>{record.issueDate}</td>
      <td>{record.dueDate}</td>
      <td>{record.returnDate || '-'}</td>
      <td>
        <span className={`status-badge status-${record.status}`}>
          {record.status}
        </span>
      </td>
      <td>
        {record.daysOverdue > 0 ? (
          <span className="overdue-days">{record.daysOverdue} days</span>
        ) : (
          '-'
        )}
      </td>
      <td>
        {record.penalty > 0 ? (
          <span className="penalty-amount">${record.penalty.toFixed(2)}</span>
        ) : (
          '-'
        )}
      </td>
      <td>
        {record.status === 'ISSUED' && (userRole === 'admin' || userRole === 'librarian') && (
          <button
            className="btn-return"
           onClick={() => handleReturnBook(record.issueId)}
          >
            Return
          </button>
        )}
      </td>
    </tr>
  );

  return (
    <div className="books-page">
      {/* Background Shapes */}
      <div className="background-shapes">
        <div className="floating-shape shape-1"></div>
        <div className="floating-shape shape-2"></div>
        <div className="floating-shape shape-3"></div>
      </div>

      {/* Navigation */}
      <nav className="navbar">
        <div className="logo">
          <Icons.Books size={36} color="#FF9B7A" />
          <span>LibraryHub</span>
        </div>
        <ul className="nav-links">
          <li><a href="#dashboard">Dashboard</a></li>
          <li><a href="#books" className={activeTab === 'books' ? 'active' : ''} onClick={() => setActiveTab('books')}>Books</a></li>
          <li><a href="#members" className={activeTab === 'members' ? 'active' : ''} onClick={() => setActiveTab('members')}>Members</a></li>
          <li><a href="#borrowing" className={activeTab === 'borrowing' ? 'active' : ''} onClick={() => setActiveTab('borrowing')}>Borrowing</a></li>
        </ul>
        <div className="nav-user">
          <div className={`user-role-badge role-${userRole}`}>{userRole}</div>
          <button 
            className="btn-switch-role" 
            onClick={() => {
              const roles = ['admin', 'librarian', 'user'];
              const currentIndex = roles.indexOf(userRole);
              setUserRole(roles[(currentIndex + 1) % roles.length]);
              showToast(`Switched to ${roles[(currentIndex + 1) % roles.length]} role`, 'info');
            }}
          >
            Switch Role
          </button>
          <div className="user-avatar">
            <Icons.User size={24} />
          </div>
        </div>
      </nav>

      {/* Main Container */}
      <div className="container">
        {/* Sidebar Filters */}
        <aside className="sidebar">
          <div className="sidebar-header">
            <h3>Filters</h3>
            <button className="btn-reset" onClick={resetFilters}>
              <Icons.Refresh size={16} />
              Reset
            </button>
          </div>

          {activeTab === 'books' && (
            <>
              {/* Category Filter */}
              <div className="filter-section">
                <h4>Category</h4>
                <div className="filter-options">
                  {['all', 'fiction', 'non-fiction', 'science', 'technology', 'history', 'literature'].map(cat => (
                    <label key={cat} className="filter-checkbox">
                      <input 
                        type="checkbox" 
                        checked={selectedCategories.includes(cat)}
                        onChange={() => handleCategoryChange(cat)}
                      />
                      <span>{cat.charAt(0).toUpperCase() + cat.slice(1).replace('-', ' ')}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Publisher Filter */}
              <div className="filter-section">
                <h4>Publisher</h4>
                <div className="filter-options">
                  {publishers.map(pub => (
                    <label key={pub} className="filter-checkbox">
                      <input 
                        type="checkbox" 
                        checked={selectedPublishers.includes(pub)}
                        onChange={() => handlePublisherChange(pub)}
                      />
                      <span>{pub === 'all' ? 'All Publishers' : pub}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Author Filter */}
              <div className="filter-section">
                <h4>Author</h4>
                <div className="filter-options">
                  {authors.slice(0, 6).map(auth => (
                    <label key={auth} className="filter-checkbox">
                      <input 
                        type="checkbox" 
                        checked={selectedAuthors.includes(auth)}
                        onChange={() => handleAuthorChange(auth)}
                      />
                      <span>{auth === 'all' ? 'All Authors' : auth}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Availability Filter */}
              <div className="filter-section">
                <h4>Availability</h4>
                <div className="filter-options">
                  {['all', 'available', 'borrowed'].map(avail => (
                    <label key={avail} className="filter-radio">
                      <input 
                        type="radio" 
                        name="availability" 
                        checked={availability === avail}
                        onChange={() => setAvailability(avail)}
                      />
                      <span>{avail.charAt(0).toUpperCase() + avail.slice(1)}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Rating Filter */}
              <div className="filter-section">
                <h4>Minimum Rating</h4>
                <div className="rating-slider">
                  <input 
                    type="range" 
                    min="0" 
                    max="5" 
                    step="0.5" 
                    value={minRating}
                    onChange={(e) => setMinRating(parseFloat(e.target.value))}
                  />
                  <div className="rating-value">
                    <span>{minRating.toFixed(1)}</span>
                    <div className="stars">{renderStars(minRating)}</div>
                  </div>
                </div>
              </div>

              {/* Year Filter */}
              <div className="filter-section">
                <h4>Publication Year</h4>
                <div className="year-range">
                  <input 
                    type="number" 
                    placeholder="From" 
                    value={yearRange.from}
                    onChange={(e) => setYearRange({...yearRange, from: e.target.value})}
                    min="1900" 
                    max="2026"
                  />
                  <span>-</span>
                  <input 
                    type="number" 
                    placeholder="To" 
                    value={yearRange.to}
                    onChange={(e) => setYearRange({...yearRange, to: e.target.value})}
                    min="1900" 
                    max="2026"
                  />
                </div>
              </div>
            </>
          )}

          {activeTab === 'members' && (
            <>
              {/* Membership Type Filter */}
              <div className="filter-section">
                <h4>Membership Type</h4>
                <div className="filter-options">
                  {['all', 'basic', 'standard', 'premium'].map(type => (
                    <label key={type} className="filter-checkbox">
                      <input 
                        type="checkbox" 
                        checked={selectedMembershipTypes.includes(type)}
                        onChange={() => handleMembershipTypeChange(type)}
                      />
                      <span>{type.charAt(0).toUpperCase() + type.slice(1)}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Member Status Filter */}
              <div className="filter-section">
                <h4>Status</h4>
                <div className="filter-options">
                  {['all', 'active', 'expired', 'suspended'].map(status => (
                    <label key={status} className="filter-radio">
                      <input 
                        type="radio" 
                        name="memberStatus" 
                        checked={memberStatus === status}
                        onChange={() => setMemberStatus(status)}
                      />
                      <span>{status.charAt(0).toUpperCase() + status.slice(1)}</span>
                    </label>
                  ))}
                </div>
              </div>
            </>
          )}

          {activeTab === 'borrowing' && (
            <>
              {/* Borrow Status Filter */}
              <div className="filter-section">
                <h4>Status</h4>
                <div className="filter-options">
                  {['all', 'borrowed', 'overdue', 'returned'].map(status => (
                    <label key={status} className="filter-radio">
                      <input 
                        type="radio" 
                        name="borrowStatus" 
                        checked={borrowStatus === status}
                        onChange={() => setBorrowStatus(status)}
                      />
                      <span>{status.charAt(0).toUpperCase() + status.slice(1)}</span>
                    </label>
                  ))}
                </div>
              </div>
            </>
          )}
        </aside>

        {/* Main Content */}
        <main className="main-content">
          {/* Top Bar */}
          <div className="top-bar">
            <div className="page-title">
              <h1>
                {activeTab === 'books' && 'Books Collection'}
                {activeTab === 'members' && 'Library Members'}
                {activeTab === 'borrowing' && 'Borrowing Records'}
              </h1>
              <p>
                {activeTab === 'books' && `${filteredBooks.length} books found`}
                {activeTab === 'members' && `${filteredMembers.length} members`}
                {activeTab === 'borrowing' && `${filteredBorrowRecords.length} records`}
              </p>
            </div>
            <div className="top-actions">
              <div className="search-bar">
                <Icons.Search size={20} />
                <input 
                  type="text" 
                  placeholder={
                    activeTab === 'books' ? "Search books..." :
                    activeTab === 'members' ? "Search members..." :
                    "Search records..."
                  }
                  value={activeTab === 'books' ? searchTerm : memberSearchTerm}
                  onChange={(e) => activeTab === 'books' ? setSearchTerm(e.target.value) : setMemberSearchTerm(e.target.value)}
                />
              </div>
              {activeTab === 'books' && (
                <>
                  <select 
                    className="sort-select" 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="title-asc">Title (A-Z)</option>
                    <option value="title-desc">Title (Z-A)</option>
                    <option value="author-asc">Author (A-Z)</option>
                    <option value="author-desc">Author (Z-A)</option>
                    <option value="year-desc">Year (Newest)</option>
                    <option value="year-asc">Year (Oldest)</option>
                    <option value="rating-desc">Rating (High-Low)</option>
                    <option value="rating-asc">Rating (Low-High)</option>
                  </select>
                  <button 
                    className="btn-view-toggle" 
                    onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                    title="Toggle View"
                  >
                    {viewMode === 'grid' ? <Icons.List size={20} /> : <Icons.Grid size={20} />}
                  </button>
                  <button className="btn-add-book" onClick={handleAddBook}>
                    <Icons.Plus size={20} />
                    Add Book
                  </button>
                </>
              )}
              {activeTab === 'members' && (userRole === 'admin' || userRole === 'librarian') && (
                <button className="btn-add-book" onClick={handleAddMember}>
                  <Icons.Plus size={20} />
                  Add Member
                </button>
              )}
            </div>
          </div>

          {/* Content Area */}
          {activeTab === 'books' && (
            <div className={`books-grid ${viewMode}`}>
              {filteredBooks.map(book => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          )}

          {activeTab === 'members' && (
            <div className="members-grid">
              {currentItems.map(member => (
                <MemberCard key={member.id} member={member} />
              ))}
            </div>
          )}

          {activeTab === 'borrowing' && (
            <div className="borrowing-table-container">
              <table className="borrowing-table">
                <thead>
                  <tr>
                    <th>Book Title</th>
                    <th>Member Name</th>
                    <th>Borrow Date</th>
                    <th>Due Date</th>
                    <th>Return Date</th>
                    <th>Status</th>
                    <th>Days Overdue</th>
                    <th>Penalty</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map(record => (
                    <BorrowRecordRow key={record.issueId} record={record} />
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {activeTab === 'books' && bookTotalPages > 1 && (
  <div className="pagination">
    <button
      className="btn-page"
      disabled={bookPage === 0}
      onClick={() => setBookPage(prev => prev - 1)}
    >
      <Icons.ChevronLeft size={16} />
      Previous
    </button>

    <span className="page-info">
      Page {bookPage + 1} of {bookTotalPages}
    </span>

    <button
      className="btn-page"
      disabled={bookPage + 1 >= bookTotalPages}
      onClick={() => setBookPage(prev => prev + 1)}
    >
      Next
      <Icons.ChevronRight size={16} />
    </button>

    <select
      value={bookSize}
      onChange={(e) => {
        setBookSize(parseInt(e.target.value));
        setBookPage(0);
      }}
    >
      <option value={10}>10</option>
      <option value={20}>20</option>
      <option value={50}>50</option>
    </select>
  </div>
)}
        </main>
      </div>

      {/* MODALS - Add/Edit Book Modal, Member Modal, Borrow Modal, etc. will continue in next message due to length */}
      
      {/* Toast Notification */}
      {toast.show && (
        <div className={`toast ${toast.type}`}>
          <div className="toast-icon">
            {toast.type === 'success' && <Icons.Check size={20} />}
            {toast.type === 'error' && <Icons.Close size={20} />}
            {toast.type === 'info' && <Icons.AlertCircle size={20} />}
          </div>
          <div className="toast-message">{toast.message}</div>
        </div>
      )}
    </div>
  );
};

export default BooksPage;
