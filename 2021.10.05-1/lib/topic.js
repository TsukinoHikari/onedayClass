//exports api를 여러개를 사용할때 //하나를 사용할때 module.export
//topic.js 라는 파일이 lib파일 밑에 동시에 존재함
var db = require("./db");
//topic.js 라는 파일이 lib파일 밑에 동시에 존재함
var template = require("./template.js");

var url = require("url");

var qs = require("querystring");
const { request } = require("http");

exports.home = function (request, response) {
    db.query(`SELECT * FROM topic`, function (error, topics) {
        var title = "Welcome";
        var description = "Hello, Node.js";
        var list = template.list(topics);
        var html = template.HTML(
            title,
            list,
            `<h2>${title}</h2>${description}`,
            `<a href="/create">create</a>`
        );
        response.writeHead(200);
        response.end(html);
    });
};

exports.page = function (request, response) {
    var _url = request.url;
    var queryData = url.parse(_url, true).query;

    db.query(`SELECT * FROM topic`, function (error, topics) {
        if (error) {
            throw error;
        }
        db.query(
            `SELECT * FROM topic WHERE id=?`,
            [queryData.id],
            function (error2, topic) {
                if (error2) {
                    throw error2;
                }
                var title = topic[0].title;
                var description = topic[0].description;
                var list = template.list(topics);
                var html = template.HTML(
                    title,
                    list,
                    `<h2>${title}</h2>${description}`,
                    `<a href="/create">create</a>
                <a href="/update?id=${queryData.id}">update</a>
                <form action="delete_process" method="post">
                <input type="hidden" name="id" value="${queryData.id}">
                <input type="submit" value="delete">
                </form>`
                );
                response.writeHead(200);
                response.end(html);
            }
        );
    });
};

exports.search = function (request, response) {
    db.query(`SELECT * FROM topic`, function (error, topics) {
        //authors 저자들의 목록 불러오기
        db.query(`SELECT * FROM author`, function (error2, authors) {
            var title = "Search";
            var list = template.list(topics);
            var html = template.HTML(
                title,
                list,
                `
                <form action="/" method="post">

                </form>
                `,
                `<a href="/create">create</a>`
            );
            response.writeHead(200);
            response.end(html);
        });
    });
};

exports.create = function (request, response) {
    db.query(`SELECT * FROM topic`, function (error, topics) {
        //authors 저자들의 목록 불러오기
        db.query(`SELECT * FROM author`, function (error2, authors) {
            var title = "Create";
            var list = template.list(topics);
            var html = template.HTML(
                title,
                list,
                `
                <form action="/create_process" method="post">
                    <p><input type="text" name="title" placeholder="title"></p>
                    <p>
                    <textarea name="description" placeholder="description"></textarea>
                    </p>
                    <p>
                        ${template.authorSelect(authors)}
                    <p>
                    <input type="submit">
                    </p>
                    </p>
                </form>
                `,
                `<a href="/create">create</a>`
            );
            response.writeHead(200);
            response.end(html);
        });
    });
};

exports.create_process = function (request, response) {
    var body = "";
    request.on("data", function (data) {
        body = body + data;
    });
    request.on("end", function () {
        var post = qs.parse(body);
        db.query(
            `INSERT INTO topic (title, description, created, author_id) VALUES(?, ?, NOW(), ?)`,
            [post.title, post.description, post.author],
            function (error, result) {
                if (error) {
                    throw error;
                }
                response.writeHead(302, {
                    Location: `/?id=${result.insertId}`,
                });
                response.end();
            }
        );
    });
};

exports.update = function (request, response) {
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    db.query("SELECT * FROM topic", function (error, topics) {
        if (error) {
            throw error;
        }
        db.query(
            `SELECT * FROM topic WHERE id=?`,
            [queryData.id],
            function (error2, topic) {
                if (error2) {
                    throw error2;
                }
                var list = template.list(topics);
                var html = template.HTML(
                    topic[0].title,
                    list,
                    `
        <form action="/update_process" method="post">
          <input type="hidden" name="id" value="${topic[0].id}">
          <p><input type="text" name="title" placeholder="title" value="${topic[0].title}"></p>
          <p>
            <textarea name="description" placeholder="description">${topic[0].description}</textarea>
          </p>
          <p>
            <input type="submit">
          </p>
        </form>
        `,
                    `<a href="/create">create</a> <a href="/update?id=${topic[0].id}">update</a>`
                );
                response.writeHead(200);
                response.end(html);
            }
        );
    });
};

exports.update_process = function (request, response) {
    var body = "";
    request.on("data", function (data) {
        body = body + data;
    });
    request.on("end", function () {
        var post = qs.parse(body);
        db.query(
            `UPDATE topic SET title=?, description=?, author_id=1 WHERE id=?`,
            [post.title, post.description, post.id],
            function (error, result) {
                if (error) {
                    throw error;
                }
                response.writeHead(302, { Location: `/?id=${post.id}` });
                response.end();
            }
        );
    });
};

exports.delete_process = function (request, response) {
    var body = "";
    request.on("data", function (data) {
        body = body + data;
    });

    request.on("end", function () {
        var post = qs.parse(body);
        db.query(
            `DELETE FROM topic WHERE id = ?`,
            [post.id],
            function (error, result) {
                if (error) {
                    throw error;
                }
                response.writeHead(302, { Location: `/` });
                response.end();
            }
        );
    });
};