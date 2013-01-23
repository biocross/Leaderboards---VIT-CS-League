// Set up a collection to contain player information. On the server,
// it is backed by a MongoDB collection named "players".


//Program has begun!



Players = new Meteor.Collection("players");

if (Meteor.isClient) {
  Template.leaderboard.playersa = function () {
    q = Players.find({}, {limit: 6} );
    q = q.find({}, {sort:{score: -1  }} )
    return q;
  };
  
  Template.leaderboard.playersb = function () {
    return Players.find({}, {limit: 6, skip: 6} );
  };
  
  Template.leaderboard.playersc = function () {
    return Players.find({}, {limit: 6, skip: 12} );
  };
  
  Template.leaderboard.playersd = function () {
    return Players.find({}, {limit: 7, skip: 18} );
  };
  

  currentUserId = "9acac734-c883-48b9-8865-2c1f0a8f2008";

  Template.leaderboard.selected_name = function () {
    var player = Players.findOne(Session.get("selected_player"));
    return player && player.name;
  };

  Template.player.selected = function () {
    return Session.equals("selected_player", this._id) ? "selected" : '';
  };

//event handlers
  Template.leaderboard.events({
    'click input.win': function () {
    	//if starts
    	if(Meteor.userId() == currentUserId){
      Players.update(Session.get("selected_player"), {$inc: {score: 3, wins: 1}});
      } //end of if
     else{
	     alert("Sorry, you don't have the sufficient privileges to do that!");
     }
    }
  });
  
  Template.leaderboard.events({
    'click input.winbonus': function () {
    if(Meteor.userId() == currentUserId){
      Players.update(Session.get("selected_player"), {$inc: {score: 4, wins: 1}});
      } //end of if
     else{
	     alert("Sorry, you don't have the sufficient privileges to do that!");
     }
    }
  });
  
  Template.leaderboard.events({
    'click input.bonus': function () {
    //if starts
    	if(Meteor.userId() == currentUserId){
      Players.update(Session.get("selected_player"), {$inc: {score: 1, loss: 1}});
      } //end of if
      else{
	     alert("Sorry, you don't have the sufficient privileges to do that!");
     }//end of else    
    }
  });
  
  Template.leaderboard.events({
    'click input.lossbutton': function () {   
    //if starts
    	if(Meteor.userId() == currentUserId){
      Players.update(Session.get("selected_player"), {$inc: {loss: 1}});
      } //end of if
      else{
	     alert("Sorry, you don't have the sufficient privileges to do that!");
     }//end of else  
    }
  });
  
  
  
  
  // begin undo handlers 
  
  Template.leaderboard.events({
    'click input.u_win': function () {
    	//if starts
    	if(Meteor.userId() == currentUserId){
      Players.update(Session.get("selected_player"), {$inc: {score: -3, wins: -1}});
      } //end of if
      else{
	     alert("Sorry, you don't have the sufficient privileges to do that!");
     }//end of else
    }
  });
  
  Template.leaderboard.events({
    'click input.u_winbonus': function () {
    if(Meteor.userId() == currentUserId){
      Players.update(Session.get("selected_player"), {$inc: {score: -4, wins: -1}});
      } //end of if
     else{
	     alert("Sorry, you don't have the sufficient privileges to do that!");
     }
    }
  });
  
  Template.leaderboard.events({
    'click input.u_bonus': function () {
    //if starts
    	if(Meteor.userId() == currentUserId){
      Players.update(Session.get("selected_player"), {$inc: {score: -1, loss: -1}});
      } //end of if
      else{
	     alert("Sorry, you don't have the sufficient privileges to do that!");
     }//end of else    
    }
  });
  
  Template.leaderboard.events({
    'click input.u_lossbutton': function () {   
    //if starts
    	if(Meteor.userId() == currentUserId){
      Players.update(Session.get("selected_player"), {$inc: {loss: -1}});
      } //end of if
      else{
	     alert("Sorry, you don't have the sufficient privileges to do that!");
     }//end of else  
    }
  });


//---------end handlers 
  Template.player.events({
    'click': function () {
      Session.set("selected_player", this._id);
    }
  });
  
 var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-37731486-1']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();
  
  


}

// On server startup, create some players if the database is empty.
if (Meteor.isServer) {
  Meteor.startup(function () {
    if (Players.find().count() === 0) {
      var names = [	"Indian Chopsticks",
      				"GliTch",
      				"DDK",
      				"hidden ace",
      				"The Martial Warlocks",
      				"Arcons",
      				"$AdakchAAp",
      				"|saX|",
      				"_KuKaKi_",
      				"Fifth echlon",
      				"CumFiesta",
      				"Knightmare",
      				"NOOBIES",
      				"saXC",
      				"|ToD|: tools of death",
      				"KEH KE LENGE",
      				"COCKBUSTERS",
      				"The absolution",
      				"AL - qaida",
      				"MORIGOL",
      				"Regulars",
      				"Stupid Cupids",
      				"TheRapist",
      				"Anonymus",
      				"Void"

      ];
      for (var i = 0; i < names.length; i++)
        Players.insert({name: names[i], score: 0, wins : 0, loss: 0});
    }
  });


Players.allow({

  update: function (userId) {
    // can only change your own documents
    if(userId == "9acac734-c883-48b9-8865-2c1f0a8f2008"){
	    return true;
    }
    else{
	    return false;
    }
    
      },


});


}
