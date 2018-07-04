import json
from pprint import pprint

district_data = {}

with open('senate.json') as f:
    district_data = json.load(f)


senate_districts = {
    "state": "New York",
    "districts": []
}


def process_polygon(coords):
    return [[{"lat": p[1], "lng":p[0]} for p in lr] for lr in coords]


def process_multipolygon(polygons):
    p = []
    for polygon in polygons:
        p.extend(process_polygon(polygon))
    return p


for district in district_data["features"]:
    coords = []
    if district["geometry"]["type"] == "Polygon":
        coords = process_polygon(district["geometry"]["coordinates"])
    elif district["geometry"]["type"] == "MultiPolygon":
        coords = process_multipolygon(district["geometry"]["coordinates"])

    senate_districts["districts"].append(
        {
            "number": district["properties"]["DISTRICT"],
            "area": district["properties"]["AREA"],
            "population": district["properties"]["POPULATION"],
            "coordinates": coords
        }
    )

with open('senateDistricts.json', 'w') as f:
    json.dump(senate_districts, f, separators=(',', ':'))


# json_str = json.dumps(senate_districts)           # 2. string (i.e. JSON)
# json_bytes = json_str.encode('utf-8')            # 3. bytes (i.e. UTF-8)

# with gzip.GzipFile('senateDistricts.json', 'w') as f:   # 4. gzip
#     f.write(json_bytes)
