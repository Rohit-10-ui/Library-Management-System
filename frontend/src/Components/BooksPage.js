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

  // Initialize Sample Data
  useEffect(() => {
    const sampleBooks = [
      {
        id: 1,
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        isbn: "978-0-7432-7356-5",
        publisher: "Scribner",
        year: 1925,
        pages: 180,
        category: "fiction",
        genre: "Classic Literature",
        copies: 5,
        available: 3,
        description: "A classic American novel set in the Jazz Age.",
        cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400",
        rating: 4.5,
      },
      {
        id: 2,
        title: "Sapiens",
        author: "Yuval Noah Harari",
        isbn: "978-0-06-231609-7",
        publisher: "Harper",
        year: 2011,
        pages: 443,
        category: "non-fiction",
        genre: "History",
        copies: 8,
        available: 6,
        description: "A brief history of humankind.",
        cover: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400",
        rating: 4.8,
      },
      {
        id: 3,
        title: "A Brief History of Time",
        author: "Stephen Hawking",
        isbn: "978-0-553-10953-5",
        publisher: "Bantam",
        year: 1988,
        pages: 256,
        category: "science",
        genre: "Cosmology",
        copies: 4,
        available: 2,
        description: "An exploration of cosmology and the nature of time.",
        cover: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400",
        rating: 4.6,
      },
      {
        id: 4,
        title: "Clean Code",
        author: "Robert C. Martin",
        isbn: "978-0-13-235088-4",
        publisher: "Prentice Hall",
        year: 2008,
        pages: 464,
        category: "technology",
        genre: "Programming",
        copies: 10,
        available: 8,
        description: "A handbook of agile software craftsmanship.",
        cover: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400",
        rating: 4.7,
      },
      {
        id: 5,
        title: "1984",
        author: "George Orwell",
        isbn: "978-0-452-28423-4",
        publisher: "Signet Classic",
        year: 1949,
        pages: 328,
        category: "fiction",
        genre: "Dystopian",
        copies: 6,
        available: 0,
        description: "A dystopian social science fiction novel.",
        cover: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400",
        rating: 4.9,
      },
    ];

    const sampleMembers = [
      {
        id: 1,
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "+1 (555) 123-4567",
        address: "123 Main St, City, State 12345",
        membershipType: "premium",
        membershipFee: 99.99,
        joinDate: "2023-01-15",
        expiryDate: "2024-01-15",
        status: "active",
        borrowedBooks: 2,
        overdueBooks: 0,
        totalPenalties: 0,
      },
      {
        id: 2,
        name: "Jane Smith",
        email: "jane.smith@example.com",
        phone: "+1 (555) 234-5678",
        address: "456 Oak Ave, City, State 12346",
        membershipType: "standard",
        membershipFee: 49.99,
        joinDate: "2023-03-20",
        expiryDate: "2024-03-20",
        status: "active",
        borrowedBooks: 1,
        overdueBooks: 1,
        totalPenalties: 15.50,
      },
      {
        id: 3,
        name: "Mike Johnson",
        email: "mike.j@example.com",
        phone: "+1 (555) 345-6789",
        address: "789 Pine Rd, City, State 12347",
        membershipType: "basic",
        membershipFee: 24.99,
        joinDate: "2023-06-10",
        expiryDate: "2024-06-10",
        status: "expired",
        borrowedBooks: 0,
        overdueBooks: 0,
        totalPenalties: 0,
      },
    ];

    const sampleBorrowRecords = [
      {
        id: 1,
        bookId: 1,
        bookTitle: "The Great Gatsby",
        memberId: 1,
        memberName: "John Doe",
        borrowDate: "2024-01-15",
        dueDate: "2024-02-15",
        returnDate: null,
        status: "borrowed",
        daysOverdue: 0,
        penalty: 0,
      },
      {
        id: 2,
        bookId: 2,
        bookTitle: "Sapiens",
        memberId: 2,
        memberName: "Jane Smith",
        borrowDate: "2023-12-20",
        dueDate: "2024-01-20",
        returnDate: null,
        status: "overdue",
        daysOverdue: 15,
        penalty: 15.50,
      },
      {
        id: 3,
        bookId: 3,
        bookTitle: "A Brief History of Time",
        memberId: 1,
        memberName: "John Doe",
        borrowDate: "2024-01-10",
        dueDate: "2024-02-10",
        returnDate: "2024-02-05",
        status: "returned",
        daysOverdue: 0,
        penalty: 0,
      },
    ];

    setBooks(sampleBooks);
    setFilteredBooks(sampleBooks);
    setMembers(sampleMembers);
    setFilteredMembers(sampleMembers);
    setBorrowRecords(sampleBorrowRecords);
    setFilteredBorrowRecords(sampleBorrowRecords);
  }, []);

  // Get unique publishers and authors
  const publishers = ['all', ...new Set(books.map(b => b.publisher))];
  const authors = ['all', ...new Set(books.map(b => b.author))];

  // Filtering Logic for Books
  useEffect(() => {
    let result = [...books];

    if (searchTerm) {
      result = result.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.isbn.includes(searchTerm) ||
        book.publisher.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (!selectedCategories.includes('all')) {
      result = result.filter(book => selectedCategories.includes(book.category));
    }

    if (!selectedPublishers.includes('all')) {
      result = result.filter(book => selectedPublishers.includes(book.publisher));
    }

    if (!selectedAuthors.includes('all')) {
      result = result.filter(book => selectedAuthors.includes(book.author));
    }

    if (availability === 'available') {
      result = result.filter(book => book.available > 0);
    } else if (availability === 'borrowed') {
      result = result.filter(book => book.available === 0);
    }

    if (minRating > 0) {
      result = result.filter(book => book.rating >= minRating);
    }

    if (yearRange.from) {
      result = result.filter(book => book.year >= parseInt(yearRange.from));
    }
    if (yearRange.to) {
      result = result.filter(book => book.year <= parseInt(yearRange.to));
    }

    result.sort((a, b) => {
      switch (sortBy) {
        case 'title-asc': return a.title.localeCompare(b.title);
        case 'title-desc': return b.title.localeCompare(a.title);
        case 'author-asc': return a.author.localeCompare(b.author);
        case 'author-desc': return b.author.localeCompare(a.author);
        case 'year-desc': return b.year - a.year;
        case 'year-asc': return a.year - b.year;
        case 'rating-desc': return b.rating - a.rating;
        case 'rating-asc': return a.rating - b.rating;
        default: return 0;
      }
    });

    setFilteredBooks(result);
    setCurrentPage(1);
  }, [searchTerm, selectedCategories, selectedPublishers, selectedAuthors, availability, minRating, yearRange, sortBy, books]);

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
    setConfirmAction(() => () => {
      setBooks(books.filter(b => b.id !== book.id));
      showToast('Book deleted successfully', 'success');
      setIsConfirmModalOpen(false);
    });
    setIsConfirmModalOpen(true);
  };

  const handleSubmitBook = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const bookData = {
      id: currentBook?.id || Date.now(),
      title: formData.get('title'),
      author: formData.get('author'),
      isbn: formData.get('isbn'),
      publisher: formData.get('publisher'),
      year: parseInt(formData.get('year')),
      pages: parseInt(formData.get('pages')),
      category: formData.get('category'),
      genre: formData.get('genre'),
      copies: parseInt(formData.get('copies')),
      available: currentBook ? currentBook.available : parseInt(formData.get('copies')),
      description: formData.get('description'),
      cover: formData.get('cover') || 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400',
      rating: parseFloat(formData.get('rating')) || 0,
    };

    if (isEditMode) {
      setBooks(books.map(b => b.id === bookData.id ? bookData : b));
      showToast('Book updated successfully', 'success');
    } else {
      setBooks([...books, bookData]);
      showToast('Book added successfully', 'success');
    }
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
    setConfirmAction(() => () => {
      setMembers(members.filter(m => m.id !== member.id));
      showToast('Member deleted successfully', 'success');
      setIsConfirmModalOpen(false);
    });
    setIsConfirmModalOpen(true);
  };

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
    if (book.available === 0) {
      showToast('No copies available for borrowing', 'error');
      return;
    }
    setSelectedBook(book);
    setIsBorrowModalOpen(true);
  };

  const handleSubmitBorrow = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const borrowData = {
      id: Date.now(),
      bookId: selectedBook.id,
      bookTitle: selectedBook.title,
      memberId: parseInt(formData.get('memberId')),
      memberName: members.find(m => m.id === parseInt(formData.get('memberId')))?.name || 'Unknown',
      borrowDate: formData.get('borrowDate'),
      dueDate: formData.get('dueDate'),
      returnDate: null,
      status: 'borrowed',
      daysOverdue: 0,
      penalty: 0,
    };

    setBooks(books.map(b => 
      b.id === selectedBook.id ? { ...b, available: b.available - 1 } : b
    ));
    setBorrowRecords([...borrowRecords, borrowData]);
    showToast('Book borrowed successfully', 'success');
    setIsBorrowModalOpen(false);
  };

  const handleReturnBook = (record) => {
    if (userRole === 'user') {
      showToast('Only admins and librarians can process returns', 'error');
      return;
    }
    
    const today = new Date();
    const dueDate = new Date(record.dueDate);
    const daysOverdue = Math.max(0, Math.floor((today - dueDate) / (1000 * 60 * 60 * 24)));
    const penalty = daysOverdue * 1.0; // $1 per day penalty

    setBorrowRecords(borrowRecords.map(r =>
      r.id === record.id
        ? { ...r, returnDate: today.toISOString().split('T')[0], status: 'returned', daysOverdue, penalty }
        : r
    ));

    setBooks(books.map(b =>
      b.id === record.bookId ? { ...b, available: b.available + 1 } : b
    ));

    if (penalty > 0) {
      setMembers(members.map(m =>
        m.id === record.memberId
          ? { ...m, totalPenalties: m.totalPenalties + penalty, overdueBooks: Math.max(0, m.overdueBooks - 1) }
          : m
      ));
      showToast(`Book returned with $${penalty.toFixed(2)} penalty`, 'info');
    } else {
      showToast('Book returned successfully', 'success');
    }
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
        <img src={book.cover} alt={book.title} />
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
        <div className={`availability-badge ${book.available > 0 ? 'available' : 'borrowed'}`}>
          {book.available > 0 ? `${book.available} Available` : 'Not Available'}
        </div>
      </div>
      <div className="book-info">
        <h3 className="book-title">{book.title}</h3>
        <p className="book-author">{book.author}</p>
        <p className="book-publisher">{book.publisher}</p>
        <div className="book-meta">
          <span className="book-year">{book.year}</span>
          <span className="book-category">{book.category}</span>
          <span className="book-genre">{book.genre}</span>
        </div>
        <div className="book-rating">
          {renderStars(book.rating)}
          <span>{book.rating}</span>
        </div>
        <div className="book-actions">
          {book.available > 0 ? (
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
      <td>{record.memberName}</td>
      <td>{record.borrowDate}</td>
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
        {record.status === 'borrowed' && (userRole === 'admin' || userRole === 'librarian') && (
          <button
            className="btn-return"
            onClick={() => handleReturnBook(record)}
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
              {currentItems.map(book => (
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
                    <BorrowRecordRow key={record.id} record={record} />
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="pagination">
              <button 
                className="btn-page" 
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                <Icons.ChevronLeft size={16} />
                Previous
              </button>
              <div className="page-numbers">
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    className={`page-number ${currentPage === i + 1 ? 'active' : ''}`}
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
              <button 
                className="btn-page" 
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
              >
                Next
                <Icons.ChevronRight size={16} />
              </button>
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
