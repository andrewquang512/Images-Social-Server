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


def getMockImageURLs(count, methodCode):
    if methodCode == 1:
        return getMockImageURLsMethodOne(count)
    else:
        return getMockImageURLsMethodTwo(count)


def getMockImageURLsMethodOne(count):
    return ["https://picsum.photos/1000/1000"] * count
    # return ["https://picsum.photos/800/1200"] * count
    # return ["https://picsum.photos/1200/800"] * count


def getMockImageURLsMethodTwo(count):
    TOTAL = 873
    MAX_LIMIT = 50

    url = "https://dummyapi.io/data/v1/post"
    items = []

    while len(items) < count:
        limitQuery = random.randint(5, MAX_LIMIT)
        page = random.randint(0, count // limitQuery)

        if page > TOTAL // MAX_LIMIT:
            page = random.randint(0, TOTAL // limitQuery)

        print()
        response = requests.get(
            f"{url}?page={page}&limit={limitQuery}",
            headers={"app-id": "656303bede22a264704a3a6b"},
        )

        if response.status_code == 200:
            items.extend(response.json()["data"])
        else:
            print(f"Error getMockImageURLsMethodTwo: {response.status_code}")
            return None

    randomData = items[:count]
    return [item["image"] for item in randomData]


# Get user list from database
current_user_list = [
    "6496c0da518d8caaf82fcac3",
    "653e0f9e048b56b72b30a608",
    "653e0fe9048b56b72b30a615",
    "653e1030048b56b72b30a625",
    "653e1134048b56b72b30a635",
    "653fc769943f19b91c4e966e",
    "6540d86ee74e56935507e613",
    "6540d8c1e74e56935507e617",
    "6572da64084ddc1939caf475",
    "6562d43b8e0242521a110e89",
    "659adac07b988d2407980450",
    # "659adbba7b988d2407980454",
    # "659add8d7b988d240798045b",
    # "659ade507b988d2407980467",
    # "659addf57b988d240798045f",
    # "659adf327b988d240798046b",
    # "659ae1037b988d2407980473",
    # "659ae0507b988d240798046f",
    # "659ae42b7b988d24079805b7",
    # "659ae4817b988d24079805ff",
    # "659ae5857b988d240798070b",
    # "659ae5657b988d24079806d7",
    # "659ae5127b988d2407980693",
    # "659ae4d67b988d240798065b",
    # "659ae68e7b988d2407980803",
    # "659ae66e7b988d24079807cf",
    # "659ae6447b988d240798079b",
    # "659ae6187b988d240798075f",
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


titles = [
    "Eternal Dawn",
    "Whispers of the Wind",
    "Lost Horizon",
    "Silent Echoes",
    "Glimpse of Serenity",
    "Infinite Skies",
    "Shadows of Time",
    "Starlight Serenade",
    "Ripples of Reflection",
    "Moonlit Whispers",
    "Solitude Symphony",
    "Ephemeral Dreams",
    "Whirlwind Wonder",
    "Chasing Shadows",
    "Aurora Reverie",
    "Echoes of Eternity",
    "Enchanted Essence",
    "Twilight Tango",
    "Crimson Cascade",
    "Harmony Unveiled"
]



captions = [
    "Chase your dreams, not the competition.",
    "Be a voice, not an echo.",
    "Create your sunshine.",
    "Embrace the glorious mess that you are.",
    "Be kind to yourself; it's a tough world out there.",
    "Your vibe attracts your tribe.",
    "Do more things that make you forget to check your phone.",
    "Smile big, laugh often.",
    "Wake up with determination, go to bed with satisfaction.",
    "Confidence level: Selfie with no filter.",
    "Life is short, make it sweet.",
    "Stay close to what keeps you feeling alive.",
    "Escape the ordinary.",
    "Do it for the 'Wow!', not the likes.",
    "Good things come to those who hustle.",
    "Leave a little sparkle wherever you go.",
    "Collect moments, not things.",
    "Less perfection, more authenticity.",
    "Live for the moments you can't put into words.",
    "Don't just exist; live."
]
camera_models = [
    "Canon EOS R5",
    "Nikon Z6 II",
    "Sony Alpha A7 III",
    "Fujifilm X-T4",
    "Panasonic Lumix GH5",
    "Olympus OM-D E-M1 Mark III",
    "Leica Q2",
    "Sony Cyber-shot RX100 VII",
    "DJI Pocket 2",
    "Canon PowerShot G7 X Mark III",
    "Nikon D850",
    "Sony Alpha A6400",
    "Fujifilm GFX 100S",
    "Canon EOS-1D X Mark III",
    "Sony A9 II",
    "Panasonic Lumix S1R",
    "Leica M10-P",
    "Olympus PEN-F",
    "GoPro HERO10 Black",
    "DJI Mavic Air 2"
]

aperture_values = [
    "1.4",
    "1.8",
    "2",
    "2.8",
    "3.5",
    "4",
    "5.6",
    "8",
    "11",
    "16",
    "22",
    "2.0",
    "2.2",
    "2.5",
    "3.2",
    "3.8",
    "4.5",
    "6.3",
    "7.1",
    "9"
]

focal_lengths = [
    "24",
    "35",
    "50",
    "85",
    "100",
    "135",
    "200",
    "300",
    "400",
    "500",
    "600",
    "14",
    "20",
    "28",
    "40",
    "105",
    "180",
    "200",
    "70",
    "55"
]

iso_values = [
    "100",
    "200",
    "400",
    "800",
    "1600",
]

shutter_speeds = [
    "1/1000",
    "1/500",
    "1/250",
    "1/125",
    "1/60",
    "1/30",
    "1/15",
    "1/8",
    "1/4",
    "1/2"
]


date_times_before_2024 = [
    "2022-01-01 12:00:00",
    "2022-02-15 08:30:45",
    "2022-03-20 18:15:30",
    "2022-04-05 14:45:00",
    "2022-05-10 20:10:22",
    "2022-06-25 09:55:10",
    "2022-07-12 16:20:55",
    "2022-08-18 11:30:40",
    "2022-09-03 05:12:15",
    "2022-10-29 22:48:33",
    "2022-11-14 07:25:50",
    "2022-12-30 03:05:17",
    "2023-01-17 17:40:05",
    "2023-02-22 13:08:27",
    "2023-03-08 19:33:14",
    "2023-04-14 10:15:59",
    "2023-05-20 04:50:37",
    "2023-06-05 23:22:18",
    "2023-07-11 08:58:44",
    "2023-08-27 14:28:08",
    "2023-09-13 06:45:26",
    "2023-10-18 21:18:53",
    "2023-11-24 16:02:40",
    "2023-12-09 12:31:09",
    "2024-01-25 02:55:36",
    "2024-02-09 18:40:20",
    "2024-03-16 09:11:45",
    "2024-04-01 15:35:29",
    "2024-05-07 11:02:54",
    "2024-06-22 20:27:42",
    "2024-07-08 13:50:18",
    "2024-08-13 07:16:03",
    "2024-09-18 23:44:29",
    "2024-10-04 19:20:52",
    "2024-11-20 04:38:07",
    "2024-12-05 21:05:34"
]

tags = [
    "travel",
    "foodie",
    "photography",
    "fitness",
    "fashion",
    "technology",
    "art",
    "nature",
    "music",
    "books",
    "architecture",
    "wedding",
    "family",
    "pets",
    "health",
    "beauty",
    "diy",
    "motivation",
    "business",
    "entrepreneurship",
    "inspiration",
    "mindfulness",
    "coding",
    "programming",
    "design",
    "gaming",
    "movies",
    "sports",
    "adventure",
    "cooking",
    "crafts",
    "home decor",
    "gardening",
    "humor",
    "quotes",
    "productivity",
    "education",
    "science",
    "history",
    "finance"
]

contests = [
    "6582c0aaf28777cfa97c8860",
    "6582c15cae0c9ecfec2f9088",
    ]

def uploadImagesToS3(urls, bucket):
    uploaded_urls = []
    for url in urls:
        for x in contests:
            for y in current_user_list:
                try:
                    imageLink = url
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
                                "title": random.choice(titles),
                                "userId": y,
                                "categoryId": random.choice(current_category_list),
                                "postViewStatus": "PUBLIC",
                                "caption":  random.choice(captions),
                                "contestId": x,
                                "aperture": random.choice(aperture_values),
                                "camera": random.choice(camera_models),
                                "copyRight": "CopyRight_" + id_generator(),
                                "focalLength": random.choice(focal_lengths),
                                "ISO": random.choice(iso_values),
                                "lens": random.choice(focal_lengths),
                                "shutterSpeed": random.choice(shutter_speeds),
                                "shutterSpeed": random.choice(shutter_speeds),
                                "tag": [random.choice(tags), random.choice(tags),random.choice(tags)],
                                "takenWhen": random.choice(date_times_before_2024),
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


def main(count, method_code):
    LIMIT = 20

    if count <= LIMIT:
        uploadImagesToS3(getMockImageURLs(count, method_code), bucket_name)
    else:
        thread_count = (count + LIMIT - 1) // LIMIT

        threads = []

        for i in range(thread_count):
            values = (i + 1) * LIMIT
            if count - values >= LIMIT:
                values = LIMIT
            else:
                values = abs(count - values)
            thread = threading.Thread(
                target=uploadImagesToS3,
                args=(getMockImageURLs(values, method_code), bucket_name),
            )
            threads.append(thread)

        print(f"There are total {len(threads)} Threads")
        for thread in threads:
            thread.start()

        for thread in threads:
            thread.join()


if __name__ == "__main__":
    count_value = input("Enter the amount of mock posts - default is 20: ")
    method_code = input("Enter the method of mock posts generate - default is 1: ")
    if count_value == "":
        count_value = 20
    if method_code == "":
        method_code = 1
    main(int(count_value), int(method_code))
