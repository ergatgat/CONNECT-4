let http = require('http');
let url = require('url');
let st = require('./server_tools');

http.createServer((req, res) => {
    let q = url.parse(req.url, true);
    let path = q.pathname;

    if (path.startsWith("/api")) {
        path = path.substring(4);
        if (path.startsWith("/find_winner")) {
            let winner = q.query.winner;
            let player1 = q.query.player1;
            let player2 = q.query.player2;
            let id = q.query.gameid;
            console.log("saver prints:" + winner, player1, player2 + " " + "id=" + id);
            st.query("INSERT INTO game_db(id,player1,player2,winner) VALUES (?,?,?,?)", [id, player1, player2, winner], (result, err) => {
                if (err) {
                    res.writeHead(200, { "Content-Type": "text/plain" });
                    res.end("error,try again");
                    return;
                }
                res.writeHead(200, { "Content-Type": "text/plain" });
                res.end("ok");
                return;
            });
        }
    } else {
        st.serveStaticFile(path, res);
    }
}).listen(8080, () => {
    console.log('saver works');
});


