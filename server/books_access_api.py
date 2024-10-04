# main.py (FastAPI Server)
from fastapi import FastAPI, HTTPException, Query, Path
import requests as rq
from typing import List, Dict
from fastapi.middleware.cors import CORSMiddleware
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For production, specify allowed origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

api_key = "AIzaSyBb_w6EWijM0kL66MeJSLS_sAggv4O7vJ8"  # Ensure this is your actual API key

def get_books_data(query: str) -> List[Dict]:
    parameters = {
        "q": query,
        "key": api_key,
        "maxResults": 16
    }
    logger.info(f"Fetching books for query: {query}")
    response = rq.get(url="https://www.googleapis.com/books/v1/volumes", params=parameters)
    books_data = response.json()

    if 'items' not in books_data:
        logger.warning("No items found in books data.")
        return []

    books_list = []

    for item in books_data.get('items', []):
        volume_info = item.get('volumeInfo', {})

        book_data = {
            "id": item.get('id', 'N/A'),
            "title": volume_info.get('title', 'N/A'),
            "authors": volume_info.get('authors', ['Unknown Author']),
            "publisher": volume_info.get('publisher', 'Unknown Publisher'),
            "published_date": volume_info.get('publishedDate', 'Unknown Date'),
            "description": volume_info.get('description', 'No description available.'),
            "page_count": volume_info.get('pageCount', 'Unknown Page Count'),
            "categories": volume_info.get('categories', ['No categories available']),
            "average_rating": volume_info.get('averageRating', 'No rating'),
            "ratings_count": volume_info.get('ratingsCount', 'No ratings count'),
            "thumbnail": volume_info.get('imageLinks', {}).get('thumbnail', 'https://via.placeholder.com/128x192?text=No+Image'),
            "small_thumbnail": volume_info.get('imageLinks', {}).get('smallThumbnail', 'https://via.placeholder.com/128x192?text=No+Image')
        }

        if isinstance(book_data["page_count"], int) and book_data["page_count"] > 30:
            books_list.append(book_data)

    logger.info(f"Number of books fetched: {len(books_list)}")
    return books_list

def get_book_by_id(book_id: str) -> Dict:
    parameters = {
        "key": api_key
    }
    logger.info(f"Fetching details for book ID: {book_id}")
    response = rq.get(url=f"https://www.googleapis.com/books/v1/volumes/{book_id}", params=parameters)

    if response.status_code != 200:
        logger.error(f"Failed to fetch book ID {book_id}. Status Code: {response.status_code}")
        return None

    item = response.json()
    volume_info = item.get('volumeInfo', {})

    book_data = {
        "id": item.get('id', 'N/A'),
        "title": volume_info.get('title', 'N/A'),
        "authors": volume_info.get('authors', ['Unknown Author']),
        "publisher": volume_info.get('publisher', 'Unknown Publisher'),
        "published_date": volume_info.get('publishedDate', 'Unknown Date'),
        "description": volume_info.get('description', 'No description available.'),
        "page_count": volume_info.get('pageCount', 'Unknown Page Count'),
        "categories": volume_info.get('categories', ['No categories available']),
        "average_rating": volume_info.get('averageRating', 'No rating'),
        "ratings_count": volume_info.get('ratingsCount', 'No ratings count'),
        "thumbnail": volume_info.get('imageLinks', {}).get('thumbnail', 'https://via.placeholder.com/128x192?text=No+Image'),
        "small_thumbnail": volume_info.get('imageLinks', {}).get('smallThumbnail', 'https://via.placeholder.com/128x192?text=No+Image')
    }

    return book_data

@app.get('/api/books')
async def send_books_data(query: str = Query(..., min_length=1)):
    if not query:
        logger.warning("Query parameter is missing.")
        raise HTTPException(status_code=400, detail="Query parameter is missing")
    
    books_data = get_books_data(query)
    
    if not books_data:
        logger.warning(f"No books found for query: {query}")
        raise HTTPException(status_code=404, detail="No books found")
    
    return books_data

@app.get('/api/book/{book_id}')
async def send_book_data(book_id: str = Path(..., min_length=1)):
    if not book_id:
        logger.warning("Book ID is missing.")
        raise HTTPException(status_code=400, detail="Book ID is missing")
    
    book_data = get_book_by_id(book_id)
    if not book_data:
        logger.error(f"Book with ID {book_id} not found.")
        raise HTTPException(status_code=404, detail="Book not found")
    
    return book_data

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
