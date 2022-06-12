create TABLE items(
    id SERIAL PRIMARY KEY,
    itemname VARCHAR(255),
    category VARCHAR(255),
    description1 VARCHAR(600),
    description2 VARCHAR(600),
    price VARCHAR(255),
    picture json
);