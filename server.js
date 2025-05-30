
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post('/api/encode', (req, res) => {
  const { code } = req.body;
  if (!code) return res.status(400).json({ error: "Code not provided" });

  const encoded = `// Encoded by FRANKI\n(function(){eval(atob("${Buffer.from(code).toString('base64')}"));})();`;
  res.json({ result: encoded });
});

app.post('/api/encode-hard', (req, res) => {
  const { code } = req.body;
  if (!code) return res.status(400).json({ error: "Code not provided" });

  const base64 = Buffer.from(encodeURIComponent(code)).toString('base64');
  const encoded = `// Encoded HARD by FRANKI
(function(){
  const decode = Function("return decodeURIComponent(escape(atob('${base64}')))")();
  eval(decode);
})();`;

  res.json({ result: encoded });
});

app.get('/', (req, res) => {
  res.send("FRANKI JS Encoder API is running!");
});

app.listen(port, () => {
  console.log(`API listening at http://localhost:${port}`);
});
