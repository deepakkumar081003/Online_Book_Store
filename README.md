# Online_Book_Store  

Switch to master branch to see the code
  
Description  
The Online Bookstore is a full-stack web application where users can browse, add, remove, and update books in their personalized shopping cart. The application supports individual user accounts with custom shopping carts.
  
Features  
User Authentication: Each user has a unique login ID and password.  
Shopping Cart: Users can add, remove, or update the quantity of books in the cart.  
Book Management: Dynamic update of cart items and total price.  
Admin Panel: For managing book inventory and orders (optional).  
  
Tech Stack  
Frontend: HTML, CSS, JavaScript, React.js  
Backend: Node.js, Express.js  
Database: MongoDB
  
How to Run  
Clone the repository:  
git clone https://github.com/your-username/Online_Book_Store.git
  
Install dependencies:  
npm install  
  
Run the backend server:  
npm run server  
  
Run the frontend React app:  
npm start  

MongoDB requirements  
Database: bs  
Collection: users  

[
  {
    "_id": "66471a2a15f6339ebb164a39",
    "username": "deepak",
    "password": "123",
    "cart": [
      "",
      "book3",
      "book4"
    ]
  },
  {
    "_id": "664a2b90de43965a1a3ae78b",
    "username": "dee",
    "password": "123",
    "cart": [
      "",
      "book2",
      "book3"
    ]
  },
  {
    "_id": "664a472e40cb1be0f304e2eb",
    "username": "abc",
    "password": "123",
    "cart": [
      "",
      "book1",
      "book2"
    ]
  }
]
  
Future Enhancements  
Implement a review and rating system for books.  
Add a recommendation system based on past purchases.  
Integrate third-party payment gateways for order checkout.
