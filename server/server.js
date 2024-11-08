const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const app = express();
const port = 8080;
const mongoose = require("mongoose");
const Book = require("./bookModel")
const RestrictedPatrons = require("./restrictedPatrons")
const CheckOutNames = require("./checkoutModel");

// app.use(express.json());
app.use(cors());
app.use(bodyParser.json());


mongoose.connect("mongodb://127.0.0.1:27017/newLibraryForLibrary", () => {
    console.log("MongoDB is now connected")
}, e => console.log(e));

app.get("/", (req, res) => {
    res.send("hello world")
})


//--------------------------Check-out/Check-in Info-----------------

//below creates and adds studentName to my database
app.post("/checkIn", (req, res) => {
    // console.log(req.body)
    const { FirstName, LastName,BuildingName, title, bookID, dueDate, genre } = req.body;
    const newUser = new CheckOutNames({
        FirstName: FirstName,
        LastName: LastName,
        BuildingName:BuildingName,
        title: title,
        authorFirst: req.body.authorFirst,
        authorLast: req.body.authorLast,
        bookID: bookID,
        genre: genre,
        dueDate: dueDate
    });
    newUser.save()
        .then(savedUser => {
            console.log("user saved:", savedUser);
            res.json(savedUser);
        })
        .catch(error => {
            console.error("Error savng user:", error);
            res.status(500).json({ error: " An error occured while saving the user" })
        });
});

app.get("/checkIn", async (req, res) => {
    try {
        const people = await CheckOutNames.find({});
        const Alphabetized = people.sort((a, b) => {
            // Convert names to lowercase for case-insensitive comparison
            const nameA = a.LastName.toUpperCase();
            const nameB = b.LastName.toUpperCase();
            // Compare the names and return -1, 0, or 1 accordingly
            if (nameA < nameB) return -1; // If nameA comes before nameB, return -1
            if (nameA > nameB) return 1; // If nameA comes after nameB, return 1
            return 0; // If names are equal, return 0
        })
        res.json(Alphabetized);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching data from database")
    }
})

// Update checkout info by id
app.put("/checkIn/:id", (req, res) => {
    CheckOutNames.findByIdAndUpdate(
        req.params.id,
        {
            FirstName: req.body.FirstName,
            LastName: req.body.LastName,
            BuildingName:req.body.BuildingName,//
            title: req.body.title,
            authorFirst: req.body.authorFirst,
            authorLast: req.body.authorLast,
            bookID: req.body.bookID,
            genre: req.body.genre,
            dueDate: req.body.dueDate
        },
        { new: true }
    )
        .then((data) => {
            console.log("Checkouts updated: " + data);
            res.json(data);
        })
        .catch((err) => {
            console.log("error updating Checkouts: " + err);
            res.status(500).send("Error updating Checkouts");
        });
});


//Delete Checkout info based off params
app.delete("/checkIn/:bookID", (req, res) => {
    // console.log(req.params.bookID)
    // console.log(typeof req.params.bookID)
    CheckOutNames.findOneAndDelete({ bookID: req.params.bookID })
        .then((data) => {
            console.log("Checkout deleted: " + data);
            res.send("checkout deleted")// Closes request by responding to it
        })
        .catch((err) => {
            console.log("Error deleting checkout: " + err);
            res.status(500).send("Error deleting checkout");
        })
})


// Update checkout info by id
app.put("/checkIn/:id", (req, res) => {
    CheckOutNames.findByIdAndUpdate(
        req.params.id,
        {
            FirstName: req.body.FirstName,
            LastName: req.body.LastName,
            BuildingName:req.body.BuildingName,//
            title: req.body.title,
            authorFirst: req.body.authorFirst,
            authorLast: req.body.authorLast,
            bookID: req.body.bookID,
            genre: req.body.genre,
            dueDate: req.body.dueDate
        },
        { new: true }
    )
        .then((data) => {
            console.log("Checkouts updated: " + data);
            res.json(data);
        })
        .catch((err) => {
            console.log("error updating Checkouts: " + err);
            res.status(500).send("Error updating Checkouts");
        });
});



//------------------------------------------Deleted Patrons---------------------

//below creates and adds Restricted patrons to my database
app.post("/restrictedPatrons", (req, res) => {
    // console.log(req.body)
    const { FirstName, LastName, Reason,Date } = req.body;
    const newRestrictedUser = new RestrictedPatrons({
        FirstName: FirstName,
        LastName: LastName,
        Reason: Reason,
        Date: Date
    });
    newRestrictedUser.save()
        .then(savedUser => {
            console.log("user saved:", savedUser);
            res.json(savedUser);
        })
        .catch(error => {
            console.error("Error savng user:", error);
            res.status(500).json({ error: " An error occured while saving the user" })
        });
});

// View restricted patrons
app.get("/restrictedPatrons", async (req, res) => {
    try {
        const people = await RestrictedPatrons.find({});
        const Alphabetized = people.sort((a, b) => {
            // Convert names to lowercase for case-insensitive comparison
            const nameA = a.LastName.toUpperCase();
            const nameB = b.LastName.toUpperCase();
            // Compare the names and return -1, 0, or 1 accordingly
            if (nameA < nameB) return -1; // If nameA comes before nameB, return -1
            if (nameA > nameB) return 1; // If nameA comes after nameB, return 1
            return 0; // If names are equal, return 0
        })
        res.json(Alphabetized);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching data from database")
    }
})

app.delete("/restrictedPatrons/:id", (req, res) => {
    RestrictedPatrons.findByIdAndDelete(req.params.id)
        .then((data) => {
            console.log("Restriction deleted: " + data);
            res.send("Restriction  deleted")// Closes request by responding to it
        })
        .catch((err) => {
            console.log("Error deleting Restriction : " + err);
            res.status(500).send("Error deleting Restriction ");
        })
})


//---------------------------------------------Book Info-----------------------


// below is to add book information to my database
app.post("/inventory", (req, res) => {
    // console.log(req.body)
    const newBook = new Book({
        title: req.body.title,
        authorFirst: req.body.authorFirst,
        authorLast: req.body.authorLast,
        genre: req.body.genre,
        bookID: req.body.bookID,
        avaliable: req.body.avaliable
    });
    newBook.save()
        .then(savedUser => {
            console.log("checkout saved:", savedUser);
            res.json(savedUser);
        })
        .catch(error => {
            console.error("Error savng checkout:", error);
            res.status(500).json({ error: " An error occured while saving the user" })
        });

})

//view book in inventory in alphabetical order by lastname
app.get("/inventory", async (req, res) => {
    // console.log("Inventory get request hit")
    try {
        const book = await Book.find({});
        const Alphabetized = book.sort((a, b) => {
            // Convert names to lowercase for case-insensitive comparison
            const nameA = a.authorLast.toUpperCase();
            const nameB = b.authorLast.toUpperCase();
            // Compare the names and return -1, 0, or 1 accordingly
            if (nameA < nameB) return -1; // If nameA comes before nameB, return -1
            if (nameA > nameB) return 1; // If nameA comes after nameB, return 1
            return 0; // If names are equal, return 0
        })
        res.json(Alphabetized);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching data from database")
    }
})

//view book in inventory in alphabetical order by firstname
app.get("/inventory/firstName", async (req, res) => {
    // console.log("Inventory get request hit")
    try {
        const book = await Book.find({});
        const Alphabetized = book.sort((a, b) => {
            // Convert names to lowercase for case-insensitive comparison
            const nameA = a.authorFirst.toUpperCase();
            const nameB = b.authorFirst.toUpperCase();
            // Compare the names and return -1, 0, or 1 accordingly
            if (nameA < nameB) return -1; // If nameA comes before nameB, return -1
            if (nameA > nameB) return 1; // If nameA comes after nameB, return 1
            return 0; // If names are equal, return 0
        })
        res.json(Alphabetized);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching data from database")
    }
})

//view book in inventory in alphabetical order by firstname
app.get("/inventory/bookName", async (req, res) => {
    // console.log("Inventory get request hit")
    try {
        const book = await Book.find({});
        const Alphabetized = book.sort((a, b) => {
            // Convert names to lowercase for case-insensitive comparison
            const nameA = a.title.toUpperCase();
            const nameB = b.title.toUpperCase();
            // Compare the names and return -1, 0, or 1 accordingly
            if (nameA < nameB) return -1; // If nameA comes before nameB, return -1
            if (nameA > nameB) return 1; // If nameA comes after nameB, return 1

            return 0; // If names are equal, return 0
        })
        res.json(Alphabetized);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching data from database")
    }
})


// get book by genre -authors last name
app.get("/inventory/:genre", async (req, res) => {
    // console.log(req.params.genre);
    try {
        const genre = await Book.find({ genre: req.params.genre }).exec();
        const Alphabetized = genre.sort((a, b) => {
            // Convert names to lowercase for case-insensitive comparison
            const nameA = a.authorLast.toUpperCase();
            const nameB = b.authorLast.toUpperCase();
            // Compare the names and return -1, 0, or 1 accordingly
            if (nameA < nameB) return -1; // If nameA comes before nameB, return -1
            if (nameA > nameB) return 1; // If nameA comes after nameB, return 1
            return 0; // If names are equal, return 0
        })
        res.json(Alphabetized);
    } catch (err) {
        console.error("Error finding book: " + err);
        res.status(500).send("Error finding book by genre");
    }
});

// Delete a book
app.delete("/inventory/:bookID", (req, res) => {
    Book.findOneAndDelete({ bookID: req.params.bookID })
        .then((data) => {
            console.log("Testing stuff: " + data);
            res.send("book deleted")// Closes request by responding to it
        })
        .catch((err) => {
            console.log("Error deleting book: " + err);
            res.status(500).send("Error deleting book");
        })
})

//--------------------------------------------------Updated Book Info

// Get the Updated book
app.get("/update/:id", async (req, res) => {
    //the server is getting confused b/c of 2 gets with /inventory params
    try {
        const book = await Book.findById(req.params.id)
        res.json(book)
    }
    catch (err) {
        console.error("Error finding book: " + err);
        res.status(400).json("Error:" + err)
    }
})


// Update a book
app.put("/update/:id", (req, res) => {
    Book.findByIdAndUpdate(
        req.params.id,
        {
            title: req.body.title,
            authorFirst: req.body.authorFirst,
            authorLast: req.body.authorLast,
            genre: req.body.genre,
            bookID: req.body.bookID,
            avaliable: req.body.avaliable
        },
        { new: true }
    )
        .then((data) => {
            console.log("Books updated: " + data);
            res.json(data);
        })
        .catch((err) => {
            console.log("error updating book: " + err);
            res.status(500).send("Error updating book");
        });
})



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});