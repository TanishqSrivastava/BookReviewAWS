import boto3
import json

# Load AWS credentials from JSON file
with open('config/aws_credentials.json') as f:
    credentials = json.load(f)

# Create a session using the loaded credentials 
session = boto3.Session(
    aws_access_key_id=credentials['aws_access_key_id'],  # Match key from your JSON
    aws_secret_access_key=credentials['aws_secret_access_key'],  # Match key from your JSON
    region_name=credentials['region_name']  # Use region from your JSON
)

# Initialize the DynamoDB client
dynamodb = session.resource('dynamodb')

# Function defined to create a table in DynamoDB with all important features 
def create_book_reviews_table():
    try:
        table = dynamodb.create_table(
            TableName='BookReviews',
            KeySchema=[
                {'AttributeName': 'userId', 'KeyType': 'HASH'},  # Partition key
                {'AttributeName': 'bookId', 'KeyType': 'RANGE'}  # Sort key
            ],
            AttributeDefinitions=[
                {'AttributeName': 'userId', 'AttributeType': 'S'},
                {'AttributeName': 'bookId', 'AttributeType': 'S'}
            ],
            ProvisionedThroughput={
                'ReadCapacityUnits': 5,  # Stay within free tier limits
                'WriteCapacityUnits': 5  # Stay within free tier limits
            }
        )
        print("Table status:", table.table_status)
    except Exception as e:
        print("Error creating table:", e)

if __name__ == '__main__':
    create_book_reviews_table()
