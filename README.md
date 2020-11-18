# it-logger-doc

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