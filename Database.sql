
DROP TABLE IF EXISTS Members_Orders CASCADE;
DROP TABLE IF EXISTS Carts_Orders CASCADE;
DROP TABLE IF EXISTS Orders CASCADE;
DROP TABLE IF EXISTS Products CASCADE;
DROP TABLE IF EXISTS Members CASCADE;

DROP TYPE IF EXISTS SIZE;
DROP TYPE IF EXISTS CRUST;
DROP TYPE IF EXISTS SAUCE;
DROP TYPE IF EXISTS CHEESE;

CREATE TYPE SIZE AS ENUM ('Small', 'Medium +$4.00', 'Large +$8.00', 'Extra Large +$12.00');
CREATE TYPE CRUST AS ENUM ('Regular', 'Thin +$1.00', 'Spicy +$2.00', 'Garlic +$3.00');
CREATE TYPE SAUCE AS ENUM ('BBQ Sauce', 'Garlic Sauce', 'Tomatoes Sauce', 'No Sauce');
CREATE TYPE CHEESE AS ENUM ('Regular', 'Extra Chesse +$3.00', 'No Cheese');



-- Products Table -------------------------------------------------------

-- DROP TABLE IF EXISTS Products CASCADE;
CREATE TABLE Products (ProductID SERIAL PRIMARY KEY
                    , Name VARCHAR(255)
                    , Description VARCHAR(255)
                    , ImagePath VARCHAR(255)
                    , BasePrice MONEY
                    , Special BOOLEAN
);

INSERT INTO 
    Products(Name, Description, ImagePath, BasePrice, Special)
VALUES
    ('Cheese Pizza'
    , 'Pizza made with processed and modified cheese such as mozzarella cheese'
    , 'images/pizza_menu/cheese.jpg'
    , 12.99
    , false);

INSERT INTO 
    Products(Name, Description, ImagePath, BasePrice, Special)
VALUES
    ('Chicken BBQ Pizza'
    , 'Pizza with Grilled Chicken and BBQ Sauce, cilantro, peppers and onion covered with cheese'
    , 'images/pizza_menu/chicken pizza.jfif'
    , 15.99
    , false);

INSERT INTO 
    Products(Name, Description, ImagePath, BasePrice, Special)
VALUES
    ('Beef and Onion Pizza'
    , 'Pizza made with ground beef(93% lean or leaner), white ring onion, stripped thin red bell pepper'
    , 'images/pizza_menu/beef pizza.jpg'
    , 14.99
    , true);

INSERT INTO 
    Products(Name, Description, ImagePath, BasePrice, Special)
VALUES
    ('Pepperonni Pizza'
    , 'Pizza made with cured pork and beef seasoned with paprika and chilli pepper.'
    , 'images/pizza_menu/pepperoni.jpg'
    , 13.99
    , false);

INSERT INTO 
    Products(Name, Description, ImagePath, BasePrice, Special)
VALUES
    ('Combo Pizza'
    , 'Pizza special: pizza mixed with mushroom, beef, chicken and cheese'
    , 'images/pizza_menu/combo.jpg'
    , 14.99
    , false);

INSERT INTO 
    Products(Name, Description, ImagePath, BasePrice, Special)
VALUES
    ('Custom Pizza'
    , 'Pick Your Own Ingredients To Create A Pizza of Your Own'
    , 'images/pizza_menu/custom.jpg'
    , 5.99
    , false);

-- End Products Table -------------------------------------------------------

-- Members Table -------------------------------------------------------

-- DROP TABLE IF EXISTS Members CASCADE;
CREATE TABLE Members (MemberID SERIAL PRIMARY KEY,
                    FirstName VARCHAR(30) NOT NULL,
                    LastName VARCHAR(30) NOT NULL,
                    Username VARCHAR(100) NOT NULL, -- UNIQUE,
                    Email VARCHAR(255) NOT NULL UNIQUE,
                    Password VARCHAR(255) NOT NULL,
                    SALT VARCHAR(255),
                    Verification INT DEFAULT 0
                    , StreetAddress VARCHAR(255) DEFAULT ''
                    , City VARCHAR(50) DEFAULT ''
                    , State VARCHAR(2) DEFAULT ''
                    , ZipCode VARCHAR(5) DEFAULT ''
                    , NameOnCard VARCHAR(255) DEFAULT ''
                    , CardNumber VARCHAR(4) DEFAULT ''
                    , ExpMonth INT DEFAULT 0
                    , ExpYear INT DEFAULT 0
);

--Remove the user test1
DELETE FROM Members 
WHERE Email='test1@test.com';

--Add the User test1  (password is: test12345)
INSERT INTO 
    Members(FirstName, LastName, Username, Email, Password, Salt)
VALUES
    ('test1First', 'test1Last', 'test1@test.com', 'test1@test.com', 'aafc93bbad0671a0531fa95168c4691be3a0d5e033c33a7b8be9941d2702e566', '5a3d1d9d0bda1e4855576fe486c3a188e14a3f1a381ea938cacdb8c799a3205f');

--Remove the user test2
DELETE FROM Members 
WHERE Email='test2@test.com';

--Add the User test2  (password is: test12345)
INSERT INTO 
    Members(FirstName, LastName, Username, Email, Password, Salt)
VALUES
    ('test2First', 'test2Last', 'test2@test.com', 'test2@test.com', 'aafc93bbad0671a0531fa95168c4691be3a0d5e033c33a7b8be9941d2702e566', '5a3d1d9d0bda1e4855576fe486c3a188e14a3f1a381ea938cacdb8c799a3205f');

-- End Members Table -------------------------------------------------------

-- Orders Table -------------------------------------------------------

-- DROP TYPE IF EXISTS SIZE;
-- CREATE TYPE SIZE AS ENUM ('Small', 'Medium - +$4.00', 'Large +$8.00', 'Extra Large +$12.00');

-- DROP TYPE IF EXISTS CRUST;
-- CREATE TYPE CRUST AS ENUM ('Regular', 'Thin $1', 'Spicy $2', 'Garlic $3');

-- DROP TYPE IF EXISTS SAUCE;
-- CREATE TYPE SAUCE AS ENUM ('BBQ Sauce', 'Garlic Sauce', 'Tomatoes Sauce', 'No Sauce');

-- DROP TYPE IF EXISTS CHEESE;
-- CREATE TYPE CHEESE AS ENUM ('Regular', 'Extra Chesse*', 'No Cheese');

-- DROP TABLE IF EXISTS Orders CASCADE;
CREATE TABLE Orders (
                    OrderID SERIAL PRIMARY KEY
                    , MemberID INT,
                    ProductID INT,
                    Size SIZE,
                    Crust CRUST,
                    Sauce SAUCE,
                    Cheese CHEESE,
                    Meats VARCHAR(255),
                    Veggies VARCHAR(255)
                    , Quantity INT
                    , Price MONEY
                    , Favorite BOOLEAN
                    -- , FOREIGN KEY(MemberID) REFERENCES Members(MemberID)
                    , FOREIGN KEY(ProductID) REFERENCES Products(ProductID)
);

--Add Multiple orders
INSERT INTO 
    Orders(MemberID, ProductID, Size, Crust, Sauce, Cheese, Meats, Veggies, Quantity, Price, Favorite)
VALUES (
    1
    ,1,
    'Medium +$4.00', 
    'Thin +$1.00',
    'Garlic Sauce',
    'No Cheese'
    , 'Ground Beef, Seafood'
    , 'Onions'
    , 2
    , 37.98
    , true
);

INSERT INTO 
    Orders(MemberID, ProductID, Size, Crust, Sauce, Cheese, Meats, Veggies, Quantity, Price, Favorite)
VALUES (
    1,
    2,
    'Medium +$4.00', 
    'Thin +$1.00',
    'Garlic Sauce',
    'No Cheese'
    , ''
    , ''
    , 1
    , 20.99
    , false
);

INSERT INTO 
    Orders(MemberID, ProductID, Size, Crust, Sauce, Cheese, Meats, Veggies, Quantity, Price, Favorite)
VALUES (
    1,
    1,
    'Medium +$4.00', 
    'Thin +$1.00',
    'Garlic Sauce',
    'No Cheese'
    , 'Ground Beef, Seafood'
    , 'Onions'
    , 1
    , 18.99
    , false
);

INSERT INTO 
    Orders(MemberID, ProductID, Size, Crust, Sauce, Cheese, Meats, Veggies, Quantity, Price, Favorite)
VALUES (
    1,
    2,
    'Medium +$4.00', 
    'Thin +$1.00',
    'Garlic Sauce',
    'No Cheese'
    , ''
    , ''
    , 3
    , 62.97
    , true
);

-- End Orders Table -------------------------------------------------------

-- Members_Orders Table -------------------------------------------------------

-- DROP TABLE IF EXISTS Members_Orders CASCADE;
CREATE TABLE Members_Orders (
                    ID SERIAL PRIMARY KEY
                    , MemberID INT DEFAULT 0
                    , Email VARCHAR(255)
                    , OrderID INT
                    , OrderDate TIMESTAMP DEFAULT current_timestamp
                    , FirstName VARCHAR(255) NOT NULL
                    , LastName VARCHAR(255) NOT NULL
                    , StreetAddress VARCHAR(255) NOT NULL
                    , City VARCHAR(255) NOT NULL
                    , State VARCHAR(2) NOT NULL
                    , ZipCode VARCHAR(5) NOT NULL
                    -- , PRIMARY KEY(MemberID, OrderID)
                    , FOREIGN KEY(MemberID) REFERENCES Members(MemberID)
                    , FOREIGN KEY(OrderID) REFERENCES Orders(OrderID)
);

INSERT INTO 
    Members_Orders(MemberID, Email, OrderID, FirstName, LastName, StreetAddress, City, State, ZipCode)
SELECT 
    Members.MemberId
    , 'test1@test.com'
    , 1
    , 'test1First'
    , 'test1Last'
    , '111 A Street'
    , 'Tacoma'
    , 'WA'
    , '98402'
FROM Members
WHERE Members.Email='test1@test.com'
RETURNING *;

INSERT INTO 
    Members_Orders(MemberID, Email, OrderID, FirstName, LastName, StreetAddress, City, State, ZipCode)
SELECT 
    Members.MemberId
    , 'test1@test.com'
    , 2
    , 'test1First'
    , 'test1Last'
    , '111 A Street'
    , 'Tacoma'
    , 'WA'
    , '98402'
FROM Members
WHERE Members.Email='test1@test.com'
RETURNING *;

-- Members_Orders Table -------------------------------------------------------

-- Carts_Orders Table -------------------------------------------------------

-- DROP TABLE IF EXISTS Carts_Orders CASCADE;
CREATE TABLE Carts_Orders (
                    MemberID INT,
                    OrderID INT
                    , PRIMARY KEY(MemberID, OrderID)
                    , FOREIGN KEY(MemberID) REFERENCES Members(MemberID)
                    , FOREIGN KEY(OrderID) REFERENCES Orders(OrderID)
);

INSERT INTO 
    Carts_Orders(MemberID, OrderID)
SELECT 
    Members.MemberId
    , 3
FROM Members
WHERE Members.Email='test1@test.com'
RETURNING *;

INSERT INTO 
    Carts_Orders(MemberID, OrderID)
SELECT 
    Members.MemberId
    , 4
FROM Members
WHERE Members.Email='test1@test.com'
RETURNING *;

-- Members_Orders Table -------------------------------------------------------




--This query WILL FAIL! It demostrates an invalide value for an enum.
-- INSERT INTO 
--     Orders(MemberID, My_Size, My_Color, Option1, Option2, Option3)
-- SELECT 
--     Members.MemberId,
--     'medium_fail', 
--     'green',
--     true,
--     false,
--     true
-- FROM Members
-- WHERE Members.Email='test2@test.com'
-- RETURNING *;
