import boto3
import json
from boto3.dynamodb.conditions import Key

# Load AWS credentials from JSON file
with open('config/aws_credentials.json') as f:
    credentials = json.load(f)

# Create a session using the loaded credentials 
session = boto3.Session(
    aws_access_key_id=credentials['aws_access_key_id'],
    aws_secret_access_key=credentials['aws_secret_access_key'],
    region_name=credentials['region_name']
)

# Initialize the DynamoDB client using the session
dynamodb = session.resource('dynamodb')
table = dynamodb.Table('BookReviews')

# Counters
read_count = 0
write_count = 0

def add_review(user_id, book_id, review_text, rating, status):
    global write_count
    
    existing_review = table.get_item(
        Key={
            'userId': user_id,
            'bookId': book_id
        }
    )
    
    if 'Item' in existing_review:
        print("Review already exists. Please update the review instead.")
        return
    
    table.put_item(
        Item={
            'userId': user_id,
            'bookId': book_id,
            'review': review_text,
            'rating': rating,
            'status': status
        }
    )
    write_count += 1
    print("Review added successfully.")

def fetch_reviews(user_id):
    global read_count
    
    response = table.query(
        KeyConditionExpression=Key('userId').eq(user_id)
    )
    
    read_count += 1
    return response.get('Items', [])

def update_status(user_id, book_id, new_status):
    global write_count
    
    table.update_item(
        Key={
            'userId': user_id,
            'bookId': book_id
        },
        UpdateExpression='SET #status = :new_status',
        ExpressionAttributeNames={
            '#status': 'status'
        },
        ExpressionAttributeValues={
            ':new_status': new_status
        }
    )
    write_count += 1
    print("Status updated successfully.")

def delete_review(user_id, book_id):
    global write_count
    
    table.delete_item(
        Key={
            'userId': user_id,
            'bookId': book_id
        }
    )
    write_count += 1
    print("Review deleted successfully.")

def fetch_all_reviews():
    response = table.scan()
    return response.get('Items', [])

def main_menu():
    while True:
        print("\nMenu:")
        print("1. Add a new review")
        print("2. Update an existing review")
        print("3. Fetch reviews")
        print("4. Delete a review")
        print("5. Fetch all reviews")
        print("6. Exit")
        
        choice = input("Enter your choice (1-6): ")
        
        if choice == '1':
            user_id = input("Enter user ID: ")
            book_id = input("Enter book ID: ")
            review_text = input("Enter review text: ")
            rating = int(input("Enter rating (1-5): "))
            status = input("Enter status (have read / reading): ")
            add_review(user_id, book_id, review_text, rating, status)

        elif choice == '2':
            user_id = input("Enter user ID: ")
            book_id = input("Enter book ID: ")
            new_status = input("Enter new status for the book (have read / reading): ")
            update_status(user_id, book_id, new_status)

        elif choice == '3':
            user_id = input("Enter user ID: ")
            print("\nFetching reviews for user:")
            reviews = fetch_reviews(user_id)
            for review in reviews:
                print(review)

        elif choice == '4':
            user_id = input("Enter user ID: ")
            book_id = input("Enter book ID: ")
            delete_review(user_id, book_id)

        elif choice == '5':
            print("\nFetching all reviews:")
            all_reviews = fetch_all_reviews()
            for review in all_reviews:
                print(review)

        elif choice == '6':
            print("Exiting the program.")
            break

        else:
            print("Invalid choice. Please select a valid option.")

# Run the main menu
if __name__ == '__main__':
    main_menu()
    print(f"\nTotal Reads: {read_count}, Total Writes: {write_count}")
