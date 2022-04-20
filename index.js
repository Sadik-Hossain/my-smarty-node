const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
//* for parsing data from client
app.use(express.json());

const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("hello from here");
});

const users = [
  {
    id: 1,
    name: "sam",
    email: "sam@gmail.com",
  },
  {
    id: 2,
    name: "tom",
    email: "tom@gmail.com",
  },
  {
    id: 3,
    name: "tim",
    email: "tim@gmail.com",
  },
  {
    id: 4,
    name: "jim",
    email: "jim@gmail.com",
  },
];
// //* query param
// app.get("/users", (req, res) => {
//   //* query param
//   console.log("query", req.query);
//   res.send(users);
// });

//* filter by search query param
app.get("/users", (req, res) => {
  //* query matching cond.
  if (req.query.name) {
    const search = req.query.name.toLowerCase();
    const matched = users.filter((user) =>
      user.name.toLowerCase().includes(search)
    );
    res.send(matched);
  } else {
    res.send(users);
  }
});

// app.get("/users/:id", (req, res) => {
//   console.log(req.params);
//   res.send("finding user");
// });

//* sending users index wise data
// app.get("/users/:id", (req, res) => {
//   console.log(req.params);
//   const id = req.params.id;
//   const user = users[id];
//   res.send(user);
// });

//* sending users id search wise data =======================
// app.get("/users/:id", (req, res) => {
//   console.log(req.params);
//   const id = req.params.id;
//   //? id is in string format
//   const user = users.find((u) => u.id == id);
//   res.send(user);
// });
app.get("/users/:id", (req, res) => {
  console.log(req.params);
  const id = parseInt(req.params.id);
  //? id is in integer format
  const user = users.find((u) => u.id === id);
  res.send(user);
});

//* getting data from client
// app.post("/user",
//   (req, res) => {
//     console.log("request", req.body);
//     res.send("post method success");
//   });

//* getting data from client and updating server data
app.post("/user", (req, res) => {
  console.log("request", req.body);
  const user = req.body;
  user.id = users.length + 1;
  //* adding clients data into server's data
  users.push(user);
  res.send(user);
});

app.listen(port, () => {
  console.log("listening to port", port);
});
