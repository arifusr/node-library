const CreateBookSchema = {
    type: 'object',
    properties: {
        title: { type: 'string' },
        author: { type: 'string' },
        publishedYear: { type: 'number' },
        genres: { type: 'array', items: { type: 'string' } },
        stock: { type: 'number' },
    },
    required: [
        'title',
        'author',
        'publishedYear',
        'genres',
        'stock',
    ],
}


const BookSchema = {
    type: 'object',
    properties: {
        id: { type: 'string' },
        title: { type: 'string' },
        author: { type: 'string' },
        publishedYear: { type: 'number' },
        genres: { type: 'array', items: { type: 'string' } },
        stock: { type: 'number' },
    }
}

const PaginationSchema = {
    type: 'object',
    properties: {
        page: { type: 'number' },
        totalPages: { type: 'number' },
        totalBooks: { type: 'number' },
        books: {
            type: 'array',
            items: BookSchema
        }
    }
};


const LibrarySchema = {
    CreateBookSchema: {
        schema: {
            description: 'Create a new book',
            tags: ['Library'],
            body: CreateBookSchema,
            response: {
                201: {
                    description: 'Book created successfully',
                    type: 'null',
                },
            },
        },
    },
    GetAllBookSchema: {
        schema: {
            description: 'Get all books',
            tags: ['Library'],
            response: {
                200: PaginationSchema
            },
        },
    },
    GetBookByIdSchema: {
        schema: {
            description: 'Get single books',
            tags: ['Library'],
            response: {
                200: BookSchema
            },
        },
    },
    UpdateBookByIdSchema: {
        schema: {
            description: 'Update a book',
            tags: ['Library'],
            body: CreateBookSchema,
            response: {
                201: {
                    description: 'Book updated successfully',
                    type: 'null',
                },
            },
        },
    },
    DeleteBookByIdSchema: {
        schema: {
            description: 'Delete a book',
            tags: ['Library'],
            response: {
                204: {
                    description: 'Book deleted successfully',
                    type: 'null',
                },
            },
        },
    }
};

export default LibrarySchema;
