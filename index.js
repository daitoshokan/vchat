var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);


Array.prototype.randomElement = function () {
    return this[Math.floor(Math.random() * this.length-1)];
}

var censor = ["alphadraft",
"alpha draft",
"friend",
"richard lewis",
"rlewis",
"chris badawi",
"thorin",
"montecristo",
"thooorin",
"yasuo",
"riven",
"toxic",
"sjokz",
"cam",
"mic",
"Kappa",
"cancer",
"lancer",
"tranny",
"faggot",
"kyke",
"dike",
"buttsex",
"fanny",
"anal",
"anus",
"arse",
"ass",
"ballsack",
"balls",
"bastard",
"bitch",
"biatch",
"bloody",
"blowjob",
"blow job",
"bollock",
"bollok",
"boner",
"boob",
"bugger",
"bum",
"butt",
"buttplug",
"clitoris",
"cock",
"coon",
"crap",
"cunt",
"damn",
"dick",
"dildo",
"dyke",
"fag",
"feck",
"fellate",
"fellatio",
"felching",
"fuck",
"f u c k",
"fudgepacker",
"fudge packer",
"flange",
"Goddamn",
"God damn",
"hell",
"homo",
"jerk",
"jizz",
"knobend",
"knob end",
"labia",
"lmao",
"lmfao",
"muff",
"nigger",
"nigga",
"omg",
"penis",
"piss",
"poop",
"prick",
"pube",
"pussy",
"queer",
"scrotum",
"sex",
"shit",
"s hit",
"sh1t",
"slut",
"smegma",
"spunk",
"tit",
"tosser",
"turd",
"twat",
"vagina",
"wank",
"whore",
"wtf"];

var people = {}
var randomUserNames = ["Jackson",
"Aiden",
"Liam",
"Lucas",
"Noah",
"Mason",
"Ethan",
"Caden",
"Jacob",
"Logan",
"Jayden",
"Elijah",
"Jack",
"Luke",
"Michael",
"Benjamin",
"Alexander",
"James",
"Jayce",
"Caleb",
"Connor",
"William",
"Carter",
"Ryan",
"Oliver",
"Matthew",
"Daniel",
"Gabriel",
"Henry",
"Owen",
"Grayson",
"Dylan",
"Landon",
"Isaac",
"Nicholas",
"Wyatt",
"Nathan",
"Andrew",
"Cameron",
"Dominic",
"Joshua",
"Eli",
"Sebastian",
"Hunter",
"Brayden",
"David",
"Samuel",
"Evan",
"Gavin",
"Christian",
"Max",
"Anthony",
"Joseph",
"Julian",
"John"];

var randomMessages = ["@Imaqtpie can I cat sit for you?", 
"mn si grozen", 
"Remember when QT called MF trash among the king of trash",
"CLG = Can't Leave Group",
"@CrumbleDabs poo? ya?",
"NA best of 3 EU best of 2 qtpUSA",
"@Imaqtpie what do you build on urgot",
"Suck my fat American cock u EuroPeon trash 4Head",
"@Imaqtpie read controversial they the best comments in threads",
"hiii all",
"!uptime",
"COMPETITIVE INTEGRITY",
"gimme some of what lisha is cooking.. quit being selfish",
"Hey EU remember IEM? EleGiggle",
"@imaqtpie what about twitch? u havent played him a lot the past few days",
"how did NA do in Worlds again Kappa?",
"European immigrants in Na > Eu",
" tfw the EU region noone cares about pees on the overpaid/imports only NA teams 4Head EleGiggle",
"I HOPE Kappa",
"Fortune doesnt favor... ResidentSleeper",
"cookin up that kitty for you bb",
"Limited edition gold foil BDC shirts and hoodies being sold PogChamp :",
"Kappa = (space)",
"HEARD THE MICROWAVE LOL",
"lol",
"wtf",
"DAMN",
"dank memes",
"F A I T H A G E B O I Z",
"Vulcun > Alphadraft",
"brazil?",
"huehuehuehue",
"morde es numero uno",
"calculated",
"RUINED",
"SAVED"
];


//maybe add toUpper to both strings to make it case-insensitive
function censorMessage(msg){
  var sentence = msg.split(" ");
  var censored = "";
  
  for (var j=0;j<sentence.length;j++)
    {
  		for (var i =0;i<censor.length;i++)
    	{
      	if(sentence[j].includes(censor[i]))
          {
            sentence[j] = "****";
            break;
          }
    	}
    
    }
 	return sentence.join(" ");
};


function sendRandomMessage(){
  io.emit('chat message', censorMessage(randomUserNames.randomElement()+" : "+randomMessages.randomElement()));
};

function sendNMessages(){
  
  for(var i=0;i<1000;i++)
  {
    sendRandomMessage();
  }
  
};

setInterval(
  sendNMessages
  ,5000);


app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

var socket = http.listen(process.env.PORT,process.env.IP, function(){
  console.log('listening on *:3000');
});

io.on('connection', function(client){
  console.log("a user connected");
  
  client.on("join", function(name){
    people[client.id] = name;
    client.emit("update", "You have connected to the server.");
    //io.emit("update", name+" has joined the server.")
  });
  
  //this will need to be updated with [client.id]
  client.on('chat message', function(msg){
    io.emit('chat message', censorMessage(msg));
  });
  client.on('disconnect', function(){
    console.log('user disconnected');
    io.emit("update", people[client.id] + "has left the server");
    delete people[client.id];
    io.emit("update-people", people);
  });
});


