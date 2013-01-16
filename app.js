var express = require('express'),
	routes = require('./routes'),
	http = require('http'),
	path = require('path'),
	f = "Fizz",
	b = "Buzz",
	app = express();

	function fb(n) {
		var data = [],
			i = 1;
		if (n == 0) return;
		if (n == "NaN") return data;
		while (i <= n) {
			if (i % 15 == 0) {
				data.push(f + b)
			} else if (i % 5 == 0) {
				data.push(b)
			} else if (i % 3 == 0) {
				data.push(f)
			} else {
				data.push(i)
			}
			if (i == n) {
				return data;
			};
			i++;

		};
		
	};



app.configure(function() {
	app.set('port', process.env.PORT || 3000);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'hjs');
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function() {
	app.use(express.errorHandler());
});

app.get('/', routes.index);


app.post('/', function(req, res) {
	var data = fb(parseInt(req.body.result));
	if (data == undefined) {
		res.render('result', {
			title : "Sorry, there was an error"
		});
	}else{
		res.render('result', {
			title : "What amazing results",
			data: data
		});
	}
	
});



http.createServer(app).listen(app.get('port'), function() {
	console.log("Application server listening on port " + app.get('port'));
});
