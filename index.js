import express from "express";
import { todoList } from "./todoList.js";
import morgan from "morgan";
import { requestTime } from "./middleware.js";
const port = 3000;
const app = express();
app.use(express.json(), morgan('tiny'), requestTime);//ポストリクエストの解析を適用

app.get("/", (req, res) => {
  console.log("リクエストタイム" + req.requestTime);
  res.send("Hello World");
});

app.get('/todo/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const todo = todoList.find(item => item.id === id);
  if (!todo) {
    return res.status(404).send('404エラー');
  }
  res.json(todo);
});

app.get('/todo', (req, res) => {
  const title = req.query.title;
  if (title) {
    console.log(title);
    const filteredTodo = todoList.filter(todo => todo.title.includes(title));
    res.json(filteredTodo);
  } else {
    res.json(todoList);
  }
});

app.post('/todo', (req, res) => {
  res.json(req.body);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
