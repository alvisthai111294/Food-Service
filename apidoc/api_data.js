define({ "api": [
  {
    "type": "delete",
    "url": "/auth",
    "title": "Request to sign out in the system",
    "name": "DeleteAuth",
    "group": "Auth",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true when successfully sign out and delete cookies</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "deleted",
            "description": "<p>&quot;true&quot;</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/signin.js",
    "groupTitle": "Auth"
  },
  {
    "type": "get",
    "url": "/auth",
    "title": "Request to sign a user in the system",
    "name": "GetAuth",
    "group": "Auth",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>&quot;username:password&quot; uses Basic Auth</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true when the name is found and password matches</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;Authentication successful!&quot;&quot;</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>JSON Web Token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 OK\n{\n  \"success\": true,\n  \"message\": \"Authentication successful!\",\n  \"email\" : \"cfb3@fake.email\",\n  \"token\": \"eyJhbGciO...abc123\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "404: User Not Found": [
          {
            "group": "404: User Not Found",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;User not found&quot;</p>"
          }
        ],
        "400: Invalid Credentials": [
          {
            "group": "400: Invalid Credentials",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;Credentials did not match&quot;</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/signin.js",
    "groupTitle": "Auth"
  },
  {
    "type": "post",
    "url": "/auth",
    "title": "Request to register a user",
    "name": "PostAuth",
    "group": "Auth",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "first",
            "description": "<p>a users first name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "last",
            "description": "<p>a users last name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>a users email *unique</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>a users password</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "confirmpassword",
            "description": "<p>confirmation of password</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "username",
            "description": "<p>a username *unique, if none provided, email will be used</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Body-Example:",
          "content": "{\n    \"first\":\"Charles\",\n    \"last\":\"Bryan\",\n    \"email\":\"cfb3@fake.email\",\n    \"password\":\"test12345\"\n    \"confirmpassword\":\"test12345\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 201": [
          {
            "group": "Success 201",
            "type": "boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true when the name is inserted</p>"
          },
          {
            "group": "Success 201",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>the email of the user inserted</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "400: Missing Parameters": [
          {
            "group": "400: Missing Parameters",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;Missing required information&quot;</p>"
          }
        ],
        "400: Parameters Invalid": [
          {
            "group": "400: Parameters Invalid",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;Parameters value is invalid&quot;</p>"
          }
        ],
        "400: Email exists": [
          {
            "group": "400: Email exists",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;Email exists&quot;</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/register.js",
    "groupTitle": "Auth"
  },
  {
    "type": "delete",
    "url": "/carts",
    "title": "Request to remove an item in cart",
    "name": "DeleteItemInCart",
    "group": "Carts",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true when successfully remove item</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;Authentication successful!&quot;&quot;</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>JSON Web Token</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "400: Missing Authorization Header": [
          {
            "group": "400: Missing Authorization Header",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;Missing Authorization Header&quot;</p>"
          }
        ],
        "400: Malformed Authorization Header": [
          {
            "group": "400: Malformed Authorization Header",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;Malformed Authorization Header&quot;</p>"
          }
        ],
        "404: User Not Found": [
          {
            "group": "404: User Not Found",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;User not found&quot;</p>"
          }
        ],
        "400: Invalid Credentials": [
          {
            "group": "400: Invalid Credentials",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;Credentials did not match&quot;</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/carts.js",
    "groupTitle": "Carts"
  },
  {
    "type": "get",
    "url": "/carts",
    "title": "Request to count entries in the cart",
    "name": "GetCartItemCount",
    "group": "Carts",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Valid JSON Web Token JWT</p>"
          }
        ]
      }
    },
    "parameter": {
      "examples": [
        {
          "title": "Request-Query-Example:",
          "content": "https://uwnetid-tcss460-w21.herokuapp.com/carts/count",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "Item",
            "description": "<p>Count in Cart</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "404: No Item Found": [
          {
            "group": "404: No Item Found",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;No Item&quot;</p>"
          }
        ],
        "400: JSON Error": [
          {
            "group": "400: JSON Error",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;malformed JSON in parameters&quot;</p>"
          }
        ],
        "403: JSON Error": [
          {
            "group": "403: JSON Error",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;Token is not valid&quot; when a JWT is provided but it is expired or otherwise not valid</p>"
          }
        ],
        "401: JSON Error": [
          {
            "group": "401: JSON Error",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;Auth token is not supplied&quot; when a JWT is not provided or it is provided in an incorrect format</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/carts.js",
    "groupTitle": "Carts"
  },
  {
    "type": "get",
    "url": "/carts",
    "title": "Request to get all Items entries in the carts",
    "name": "GetCarts",
    "group": "Carts",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Valid JSON Web Token JWT</p>"
          }
        ]
      }
    },
    "parameter": {
      "examples": [
        {
          "title": "Request-Query-Example:",
          "content": "https://uwnetid-tcss460-w21.herokuapp.com/carts",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "Cart",
            "description": "<p>Item List in the database</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "404: No Item Found": [
          {
            "group": "404: No Item Found",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;No Item&quot;</p>"
          }
        ],
        "400: JSON Error": [
          {
            "group": "400: JSON Error",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;malformed JSON in parameters&quot;</p>"
          }
        ],
        "403: JSON Error": [
          {
            "group": "403: JSON Error",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;Token is not valid&quot; when a JWT is provided but it is expired or otherwise not valid</p>"
          }
        ],
        "401: JSON Error": [
          {
            "group": "401: JSON Error",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;Auth token is not supplied&quot; when a JWT is not provided or it is provided in an incorrect format</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/carts.js",
    "groupTitle": "Carts"
  },
  {
    "type": "post",
    "url": "/carts/updatequantity",
    "title": "update quantity of an order in the DB",
    "name": "PostCarts",
    "group": "Carts",
    "parameter": {
      "examples": [
        {
          "title": "Request-Query-Example:",
          "content": "https://uwnetid-tcss460-w21.herokuapp.com/carts/updatequantity",
          "type": "json"
        }
      ],
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "orderid",
            "description": "<p>ID of the order</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "quantity",
            "description": "<p>Quantity of order</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Valid JSON Web Token JWT</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 201": [
          {
            "group": "Success 201",
            "type": "boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true when the order is inserted</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "400: Missing Parameters": [
          {
            "group": "400: Missing Parameters",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;Missing required information&quot;</p>"
          }
        ],
        "404: MemberID Not Exist": [
          {
            "group": "404: MemberID Not Exist",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;MemberID not exist&quot;</p>"
          }
        ],
        "400: JSON Error": [
          {
            "group": "400: JSON Error",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;malformed JSON in parameters&quot;</p>"
          }
        ],
        "403: JSON Error": [
          {
            "group": "403: JSON Error",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;Token is not valid&quot; when a JWT is provided but it is expired or otherwise not valid</p>"
          }
        ],
        "401: JSON Error": [
          {
            "group": "401: JSON Error",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;Auth token is not supplied&quot; when a JWT is not provided or it is provided in an incorrect format</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/carts.js",
    "groupTitle": "Carts"
  },
  {
    "type": "post",
    "url": "/carts/updatefavorite",
    "title": "update favorite of an order in the DB",
    "name": "PostCarts",
    "group": "Carts",
    "parameter": {
      "examples": [
        {
          "title": "Request-Query-Example:",
          "content": "https://uwnetid-tcss460-w21.herokuapp.com/carts/updatefavorite",
          "type": "json"
        }
      ],
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "orderid",
            "description": "<p>ID of the order</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "favorite",
            "description": "<p>Favorited order</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Valid JSON Web Token JWT</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 201": [
          {
            "group": "Success 201",
            "type": "boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true when the order is inserted</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "400: Missing Parameters": [
          {
            "group": "400: Missing Parameters",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;Missing required information&quot;</p>"
          }
        ],
        "404: MemberID Not Exist": [
          {
            "group": "404: MemberID Not Exist",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;MemberID not exist&quot;</p>"
          }
        ],
        "400: JSON Error": [
          {
            "group": "400: JSON Error",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;malformed JSON in parameters&quot;</p>"
          }
        ],
        "403: JSON Error": [
          {
            "group": "403: JSON Error",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;Token is not valid&quot; when a JWT is provided but it is expired or otherwise not valid</p>"
          }
        ],
        "401: JSON Error": [
          {
            "group": "401: JSON Error",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;Auth token is not supplied&quot; when a JWT is not provided or it is provided in an incorrect format</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/carts.js",
    "groupTitle": "Carts"
  },
  {
    "type": "get",
    "url": "/member",
    "title": "Request to get member's information",
    "name": "GetMemberInfo",
    "group": "Member",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Valid JSON Web Token JWT</p>"
          }
        ]
      }
    },
    "parameter": {
      "examples": [
        {
          "title": "Request-Query-Example:",
          "content": "https://uwnetid-tcss460-w21.herokuapp.com/member",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "Member",
            "description": "<p>information in the database</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "404: User Not Found": [
          {
            "group": "404: User Not Found",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;User not found&quot;</p>"
          }
        ],
        "400: JSON Error": [
          {
            "group": "400: JSON Error",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;malformed JSON in parameters&quot;</p>"
          }
        ],
        "403: JSON Error": [
          {
            "group": "403: JSON Error",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;Token is not valid&quot; when a JWT is provided but it is expired or otherwise not valid</p>"
          }
        ],
        "401: JSON Error": [
          {
            "group": "401: JSON Error",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;Auth token is not supplied&quot; when a JWT is not provided or it is provided in an incorrect format</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/member.js",
    "groupTitle": "Member"
  },
  {
    "type": "delete",
    "url": "/orders",
    "title": "Request to remove an order in DB",
    "name": "DeleteOrder",
    "group": "Orders",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true when successfully remove order</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;Authentication successful!&quot;&quot;</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>JSON Web Token</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "400: Missing Authorization Header": [
          {
            "group": "400: Missing Authorization Header",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;Missing Authorization Header&quot;</p>"
          }
        ],
        "400: Malformed Authorization Header": [
          {
            "group": "400: Malformed Authorization Header",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;Malformed Authorization Header&quot;</p>"
          }
        ],
        "404: User Not Found": [
          {
            "group": "404: User Not Found",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;User not found&quot;</p>"
          }
        ],
        "400: Invalid Credentials": [
          {
            "group": "400: Invalid Credentials",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;Credentials did not match&quot;</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/orders.js",
    "groupTitle": "Orders"
  },
  {
    "type": "get",
    "url": "/orders",
    "title": "Request to get all Orders entries in the DB",
    "name": "GetOrders",
    "group": "Orders",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Valid JSON Web Token JWT</p>"
          }
        ]
      }
    },
    "parameter": {
      "examples": [
        {
          "title": "Request-Query-Example:",
          "content": "https://uwnetid-tcss460-w21.herokuapp.com/orders",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "Order",
            "description": "<p>List in the database</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "400: JSON Error": [
          {
            "group": "400: JSON Error",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;malformed JSON in parameters&quot;</p>"
          }
        ],
        "403: JSON Error": [
          {
            "group": "403: JSON Error",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;Token is not valid&quot; when a JWT is provided but it is expired or otherwise not valid</p>"
          }
        ],
        "401: JSON Error": [
          {
            "group": "401: JSON Error",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;Auth token is not supplied&quot; when a JWT is not provided or it is provided in an incorrect format</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/orders.js",
    "groupTitle": "Orders"
  },
  {
    "type": "post",
    "url": "/orders",
    "title": "Add an order into the cart",
    "name": "PostOrdersCart",
    "group": "Orders",
    "parameter": {
      "examples": [
        {
          "title": "Request-Query-Example:",
          "content": "https://uwnetid-tcss460-w21.herokuapp.com/orders",
          "type": "json"
        },
        {
          "title": "Request-Body-Example:",
          "content": "{\n    productid: 5,\n    size: 'Large +$8.00',\n    crust: 'Spicy +$2.00',\n    sauce: 'Tomatoes Sauce',\n    cheese: 'Extra Chesse +$3.00',\n    meats: 'Sausage,Ground Beef,Seafood',\n    veggies: 'Mushrooms,Onions',\n    quantity: 2,\n    price: 30.99,\n    favorite: true\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "productid",
            "description": "<p>ID of the product of order</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "size",
            "description": "<p>Size option of order</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "crust",
            "description": "<p>Crust option of order</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "sauce",
            "description": "<p>Sauce option of order</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "cheese",
            "description": "<p>cheese option of order</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "meats",
            "description": "<p>List of meats of order</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "veggies",
            "description": "<p>List of veggies of order</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "quantity",
            "description": "<p>Quantity of order</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "price",
            "description": "<p>Price of 1 item of order</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "favorite",
            "description": "<p>Favorited order</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Valid JSON Web Token JWT</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 201": [
          {
            "group": "Success 201",
            "type": "boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true when the order is inserted</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "400: Missing Parameters": [
          {
            "group": "400: Missing Parameters",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;Missing required information&quot;</p>"
          }
        ],
        "400: Parameters Invalid": [
          {
            "group": "400: Parameters Invalid",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;Parameters value is invalid&quot;</p>"
          }
        ],
        "400: Boolean Invalid": [
          {
            "group": "400: Boolean Invalid",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;Boolean value is invalid&quot;</p>"
          }
        ],
        "404: User Not Found": [
          {
            "group": "404: User Not Found",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;User Not Found&quot;</p>"
          }
        ],
        "400: JSON Error": [
          {
            "group": "400: JSON Error",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;malformed JSON in parameters&quot;</p>"
          }
        ],
        "403: JSON Error": [
          {
            "group": "403: JSON Error",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;Token is not valid&quot; when a JWT is provided but it is expired or otherwise not valid</p>"
          }
        ],
        "401: JSON Error": [
          {
            "group": "401: JSON Error",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;Auth token is not supplied&quot; when a JWT is not provided or it is provided in an incorrect format</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/orders.js",
    "groupTitle": "Orders"
  },
  {
    "type": "post",
    "url": "/orders",
    "title": "Add an order of the guest into the DB",
    "name": "PostOrdersNotSingnedIn",
    "group": "Orders",
    "parameter": {
      "examples": [
        {
          "title": "Request-Query-Example:",
          "content": "https://uwnetid-tcss460-w21.herokuapp.com/ordersguest",
          "type": "json"
        }
      ],
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "first",
            "description": "<p>users first name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "last",
            "description": "<p>users last name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>users email *unique</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "address",
            "description": "<p>users address</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "city",
            "description": "<p>users city</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "state",
            "description": "<p>users state</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "zip",
            "description": "<p>users zip</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "nameoncard",
            "description": "<p>name on card</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "expmonth",
            "description": "<p>cards expmonth</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "expyear",
            "description": "<p>cards expyear</p>"
          },
          {
            "group": "Parameter",
            "type": "Object[]",
            "optional": false,
            "field": "orders",
            "description": "<p>order list</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Valid JSON Web Token JWT</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 201": [
          {
            "group": "Success 201",
            "type": "boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true when the order is inserted</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "400: Missing Parameters": [
          {
            "group": "400: Missing Parameters",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;Missing required information&quot;</p>"
          }
        ],
        "404: Orders not found": [
          {
            "group": "404: Orders not found",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;Orders not found&quot;</p>"
          }
        ],
        "400: JSON Error": [
          {
            "group": "400: JSON Error",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;malformed JSON in parameters&quot;</p>"
          }
        ],
        "403: JSON Error": [
          {
            "group": "403: JSON Error",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;Token is not valid&quot; when a JWT is provided but it is expired or otherwise not valid</p>"
          }
        ],
        "401: JSON Error": [
          {
            "group": "401: JSON Error",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;Auth token is not supplied&quot; when a JWT is not provided or it is provided in an incorrect format</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/ordersguest.js",
    "groupTitle": "Orders"
  },
  {
    "type": "post",
    "url": "/orders",
    "title": "Add an order into the DB",
    "name": "PostOrdersSingnedIn",
    "group": "Orders",
    "parameter": {
      "examples": [
        {
          "title": "Request-Query-Example:",
          "content": "https://uwnetid-tcss460-w21.herokuapp.com/orders/signedin",
          "type": "json"
        }
      ],
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "first",
            "description": "<p>users first name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "last",
            "description": "<p>users last name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>users email *unique</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "address",
            "description": "<p>users address</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "city",
            "description": "<p>users city</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "state",
            "description": "<p>users state</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "zip",
            "description": "<p>users zip</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "nameoncard",
            "description": "<p>name on card</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "expmonth",
            "description": "<p>cards expmonth</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "expyear",
            "description": "<p>cards expyear</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Valid JSON Web Token JWT</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 201": [
          {
            "group": "Success 201",
            "type": "boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true when the order is inserted</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "400: Missing Parameters": [
          {
            "group": "400: Missing Parameters",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;Missing required information&quot;</p>"
          }
        ],
        "404: User not found": [
          {
            "group": "404: User not found",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;User not found&quot;</p>"
          }
        ],
        "404: Orders not found": [
          {
            "group": "404: Orders not found",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;Orders not found&quot;</p>"
          }
        ],
        "400: JSON Error": [
          {
            "group": "400: JSON Error",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;malformed JSON in parameters&quot;</p>"
          }
        ],
        "403: JSON Error": [
          {
            "group": "403: JSON Error",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;Token is not valid&quot; when a JWT is provided but it is expired or otherwise not valid</p>"
          }
        ],
        "401: JSON Error": [
          {
            "group": "401: JSON Error",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;Auth token is not supplied&quot; when a JWT is not provided or it is provided in an incorrect format</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/orders.js",
    "groupTitle": "Orders"
  },
  {
    "type": "get",
    "url": "/products/productid",
    "title": "Request to get a Product entries in the DB",
    "name": "GetProductByID",
    "group": "Products",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Valid JSON Web Token JWT</p>"
          }
        ]
      }
    },
    "parameter": {
      "examples": [
        {
          "title": "Request-Query-Example:",
          "content": "https://uwnetid-tcss460-w21.herokuapp.com/products/productid",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "Product",
            "description": "<p>in the database</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "400: Missing Parameters": [
          {
            "group": "400: Missing Parameters",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;Missing required information&quot;</p>"
          }
        ],
        "404: No Product Found": [
          {
            "group": "404: No Product Found",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;No Product&quot;</p>"
          }
        ],
        "400: JSON Error": [
          {
            "group": "400: JSON Error",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;malformed JSON in parameters&quot;</p>"
          }
        ],
        "403: JSON Error": [
          {
            "group": "403: JSON Error",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;Token is not valid&quot; when a JWT is provided but it is expired or otherwise not valid</p>"
          }
        ],
        "401: JSON Error": [
          {
            "group": "401: JSON Error",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;Auth token is not supplied&quot; when a JWT is not provided or it is provided in an incorrect format</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/products.js",
    "groupTitle": "Products"
  },
  {
    "type": "get",
    "url": "/products",
    "title": "Request to get all Product entries in the DB",
    "name": "GetProducts",
    "group": "Products",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Valid JSON Web Token JWT</p>"
          }
        ]
      }
    },
    "parameter": {
      "examples": [
        {
          "title": "Request-Query-Example:",
          "content": "https://uwnetid-tcss460-w21.herokuapp.com/products",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "Product",
            "description": "<p>List in the database</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "404: No Product Found": [
          {
            "group": "404: No Product Found",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;No Product&quot;</p>"
          }
        ],
        "400: JSON Error": [
          {
            "group": "400: JSON Error",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;malformed JSON in parameters&quot;</p>"
          }
        ],
        "403: JSON Error": [
          {
            "group": "403: JSON Error",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;Token is not valid&quot; when a JWT is provided but it is expired or otherwise not valid</p>"
          }
        ],
        "401: JSON Error": [
          {
            "group": "401: JSON Error",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;Auth token is not supplied&quot; when a JWT is not provided or it is provided in an incorrect format</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/products.js",
    "groupTitle": "Products"
  }
] });
