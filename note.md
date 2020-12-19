## Basic files structure setup.

1. Create a folder it-logger(local).

2. Create a new repository in Github, named 'it-logger-doc'.

3. npm initialization.

    ```bash
    $ cd it-logger
    $ npm init
    ```

4. Bash commands

    ```bash
    $ cd it-logger
    $ echo "# it-logger-doc" >> README.md
    $ git init
    $ git add README.md
    $ git commit -m "first commit"
    $ git branch -M main
    $ git remote add origin https://github.com/DonghaoWu/it-logger-doc.git
    $ git push -u origin main
    ```

5. Add a create-react-app client folder.

    ```bash
    $ cd it-logger
    $ npx create-react-app client
    ```

6. Copy the `.gitignore` file in client, paste it in root directory.

7. Git push

    ```bash
    $ cd it-logger
    $ git add .
    $ git commit -m'first commit'
    $ git push
    ```

8. 注意，不能够先创建 client 后连接 GitHub，顺序必须是创建了 root directory 之后先连接 Github ，然后再做其他。

9. 产生以上表现的原因估计是 npx creact-react-app 自动生成 git 相关文件。


# 实际操作：

1. 安装：

```bash
$ npx create-react-app client
$ npm i -D json-server concurrently
$ cd client
$ npm i materilize-css monent react-moment
```

2. package.json in root directory.

```json
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "json-server": "json-server --watch db.json --port 5000",
    "dev": "concurrently \"cd client && npm start\" \"npm run json-server\""
  },
```

3. package.json in client folder

```json
  "proxy": "http://localhost:5000"
```

4. db.json in root directory

```json
{
    "logs": [
      {
        "message": "Changed network card in server 007",
        "attention": false,
        "tech": "Sam Smith",
        "date": "2019-05-31T15:46:10.179Z",
        "id": 1
      },
      {
        "id": 2,
        "message": "Fixed hard drive on workstation 002",
        "attention": false,
        "tech": "John Doe",
        "date": "2019-05-31T16:18:04.245Z"
      },
      {
        "message": "1122 wireless down",
        "attention": true,
        "tech": "Sara Wilson",
        "date": "2019-05-31T15:46:48.690Z",
        "id": 3
      },
      {
        "id": 4,
        "message": "Workstation 026 is up and running",
        "attention": false,
        "tech": "Sara Wilson",
        "date": "2019-05-31T19:57:35.544Z"
      }
    ],
    "techs": [
      {
        "id": 1,
        "firstName": "John",
        "lastName": "Doe"
      },
      {
        "id": 2,
        "firstName": "Sam",
        "lastName": "Smith"
      },
      {
        "id": 3,
        "firstName": "Sara",
        "lastName": "Wilson"
      }
    ]
  }
```

5. Try out.

```bash
$ cd .. // back to root directory
$ npm run dev
```

- try out this route in postman:

    - GET: `http://localhost:5000/logs`