# it-logger-doc

### Basic file structure setup.

1. Create a folder it-logger.

2. Create a new repository in Github, named 'it-logger-doc'.

3. bash commands

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

4. Add a create-react-app client folder

    ```bash
    $ cd it-logger
    $ npx create-react-app client
    ```

5. Copy the .gitignore file in client, paste it in root directory.

6. Git push

    ```bash
    $ git add .
    $ git commit -m'first commit'
    $ git push
    ```