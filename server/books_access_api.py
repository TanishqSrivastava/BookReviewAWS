import requests as rq
import json

api_key = "AIzaSyBb_w6EWijM0kL66MeJSLS_sAggv4O7vJ8"

def get_data():
    for item in books_data.get('items', []):
        volume_info = item['volumeInfo']

        title = volume_info.get('title', 'N/A')
        authors = volume_info.get('authors', ['Unknown Author'])
        publisher = volume_info.get('publisher', 'Unknown Publisher')
        published_date = volume_info.get('publishedDate', 'Unknown Date')
        description = volume_info.get('description', 'No description available.')
        page_count = volume_info.get('pageCount', 'Unknown Page Count')
        categories = volume_info.get('categories', ['No categories available'])
        average_rating = volume_info.get('averageRating', 'No rating')
        ratings_count = volume_info.get('ratingsCount', 'No ratings count')
        image_links = volume_info.get('imageLinks', {})
        
        # Extract only thumbnail and smallThumbnail links
        thumbnail = image_links.get('thumbnail', 'No thumbnail available')
        small_thumbnail = image_links.get('smallThumbnail', 'No small thumbnail available')
        if page_count > 30:
            print(f"Page ID: {item['id']}")
            print(f"Title: {title}")
            print(f"Author(s): {', '.join(authors)}")
            print(f"Publisher: {publisher}")
            print(f"Published Date: {published_date}")
            print(f"Description: {description}")
            print(f"Page Count: {page_count}")
            print(f"Categories: {', '.join(categories)}")
            print(f"Average Rating: {average_rating}")
            print(f"Ratings Count: {ratings_count}")
            print(f"Thumbnail: {thumbnail}")
            print(f"Small Thumbnail: {small_thumbnail}\n")

query = ""
with open("query.txt") as file: 
    for i in file.readlines():
        query = i
    
parameters = {
    "q" : query,
    "key" : api_key,
    "maxResults" : 5
}
response = rq.get(url="https://www.googleapis.com/books/v1/volumes",params=parameters)
books_data = response.json()

get_data()