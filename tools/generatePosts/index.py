import boto3
import requests
from io import BytesIO
import os
from dotenv import load_dotenv
import string
import random
import threading


def id_generator(size=6, chars=string.ascii_uppercase + string.digits):
    return "".join(random.choice(chars) for _ in range(size))


load_dotenv()

aws_access_key_id = os.getenv("AWS_ACCESS_KEY")
aws_secret_access_key = os.getenv("AWS_SECRET_ACCESS")
bucket_name = os.getenv("AWS_BUCKET_NAME")
graphql_api_url = "http://localhost:4000/graphql"

image_urls = ["https://picsum.photos"] * 100

# Get user list from database
current_user_list = [
    "6496c0da518d8caaf82fcac3",
    "64ae4fa84a369587238e7386",
    "65190da5cc1409ef4ac2e54b",
    "653e0f9e048b56b72b30a608",
    "653e0fe9048b56b72b30a615",
    "653e1030048b56b72b30a625",
    "653e1134048b56b72b30a635",
    "653fc769943f19b91c4e966e",
    "6540d86ee74e56935507e613",
]
# Get category list from database
current_category_list = [
    "64ecb68380295e50c958e547",
    "64edaf03809a20aed5684794",
    "64edaf2d809a20aed5684795",
    "64edaf62809a20aed5684798",
    "64edaf4c809a20aed5684797",
    "64edaf3c809a20aed5684796",
    "64edaf66809a20aed5684799",
    "64edaf72809a20aed568479a",
    "64edaf77809a20aed568479b",
    "64edafb5809a20aed568479c",
    "64edb08f809a20aed568479f",
    "64edafbf809a20aed568479e",
    "64edafbb809a20aed568479d",
    "64edb0a5809a20aed56847a0",
    "64edb0ae809a20aed56847a1",
    "64edb0c7809a20aed56847a2",
    "64edb0f6809a20aed56847a5",
    "64edb0e2809a20aed56847a4",
    "64edb0df809a20aed56847a3",
    "64edb0f9809a20aed56847a6",
    "64edb117809a20aed56847a7",
    "64edb11c809a20aed56847a8",
]

s3 = boto3.client(
    "s3",
    aws_access_key_id=aws_access_key_id,
    aws_secret_access_key=aws_secret_access_key,
)


def upload_images_to_s3(urls, bucket):
    uploaded_urls = []
    for url in urls:
        try:
            imageLink = url + "/900/900"
            response = requests.get(imageLink)
            print(f"Image Link {imageLink}")
            if response.status_code == 200:
                image_data = BytesIO(response.content)
                file_name = "MockImage_" + id_generator(12) + ".jpg"
                s3.upload_fileobj(image_data, bucket, file_name)
                uploaded_url = f"https://{bucket}.s3.amazonaws.com/{file_name}"
                uploaded_urls.append(uploaded_url)
                print(f"Uploaded {file_name} to {bucket}. URL: {uploaded_url}")

                graphql_payload = {
                    "data": {
                        "imageURL": uploaded_url,
                        "title": "MockTitle" + id_generator(12),
                        "userId": random.choice(current_user_list),
                        "categoryId": random.choice(current_category_list),
                        "postViewStatus": "PUBLIC",
                        "caption": "",
                        "contestId": "",
                        "aperture": "",
                        "camera": "",
                        "copyRight": "MockCopyRight" + id_generator(),
                        "focalLength": "",
                        "ISO": "",
                        "lens": "",
                        "shutterSpeed": "",
                        "takenWhen": "",
                    }
                }
                graphql_query = "mutation CreatePost($data: CreatePostInput!) { createPost(data: $data) {id}}"
                graphql_response = requests.post(
                    graphql_api_url,
                    json={"query": graphql_query, "variables": graphql_payload},
                )
                print(f"GraphQL API response: {graphql_response.json()}")
            else:
                print(f"Failed to download {url}. Status code: {response.status_code}")
        except Exception as e:
            print(f"Error uploading {url} to {bucket}: {str(e)}")


t1 = threading.Thread(target=upload_images_to_s3, args=(image_urls, bucket_name))
t2 = threading.Thread(target=upload_images_to_s3, args=(image_urls, bucket_name))

t1.start()
t2.start()

t1.join()
t2.join()
