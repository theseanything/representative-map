import requests
from bs4 import BeautifulSoup
from pprint import pprint
import re
import json

result = requests.get("https://www.nysenate.gov/senators-committees")

if result.status_code == 200:
    c = result.content
else:
    raise Exception()

soup = BeautifulSoup(c, "lxml")
senators = soup.find_all(class_="nys-senator--info")

senator_json = {
    "state": "New York",
    "senators": []
}

for s in senators:
    name = s.h4.string
    info = list(
        s.find(class_="nys-senator--district").stripped_strings)

    district = re.match(r"(\d+).*", info[1]).group(1)
    raw_parties = info[0]

    raw_link = s.parent.find('img')["src"]
    link = re.match(r"(.*)\?itok=.*", raw_link).group(1)

    p = raw_parties[1:len(raw_parties)-1].split(", ")

    senator_json["senators"].append(
        {
            "name": name,
            "parties": p,
            "district": district,
            "headshot": link
        }
    )

with open('senators.json', 'w') as f:
    json.dump(senator_json, f, separators=(',', ':'))
