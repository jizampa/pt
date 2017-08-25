var players=[];

function load()
{
	initial();
}

function initial()
{
	var content = document.getElementById("content");
	content.style.backgroundImage = 'url("images/background2.jpg")';
	// HEADER - title = Add Players	
	document.getElementById("title").innerHTML = "ADD PLAYERS";
	// SECTION -create 6 input 
	document.getElementsByTagName("section")[0].innerHTML = "<input id='firstinp'><br><input><br><input><br><input><br><input><br><input><br>";
	// FOOTER -  Add start game - button (on click call start_game())	
	document.getElementsByTagName("footer")[0].innerHTML = '<button onclick="start_game()">START</button>';      
}

function start_game()
{

	var number_of_players = 0;
	var input = document.getElementsByTagName("input");
    // counted the number of plyers entered 
	for(i=0; i < input.length; i++)
	{
		if(input[i].value.trim() != '')
		{
			players[number_of_players]= [input[i].value.trim(),0];
			number_of_players ++;
		}		
	}

	if(number_of_players > 1 && number_of_players % 2 == 0)
	{
		playing_game();
	}
	else
	{
		show_alert("Add a new player");
		players=[];
	}
}

function playing_game()
{	
	var content = document.getElementById("content");
	content.style.background = 'black';
	// HEADER - title = Playing....
	document.getElementById("title").innerHTML = "Playing...";
	// SECTION - build player's table
	document.getElementsByTagName("section")[0].innerHTML = create_table();	
	// FOOTER - add refresh_points - button (on click call update_points())
	document.getElementsByTagName("footer")[0].innerHTML = '<button onclick="update_game()">UPDATE</button><button onclick="new_game()">NEW</button>';
}

function create_table()
{
	var th = "";	
	var td = "";

	for (var i = 0; i < players.length; i++)
	{
		th += "<th>"+players[i][0]+"</th>";
		td += '<td><input placeholder="Add points"></td>';
	}

	return "<table><tr>"+th+"</tr>"+td+"</table>"; 
}

function update_game()
{
	var is_valid = true;
	
	for (var i = 0; is_valid && i < document.getElementsByTagName("input").length; i++) 
	{
		var input = parseInt(document.getElementsByTagName("input")[i].value.trim());		

		is_valid = Number.isInteger(input);
	}
	
	if(!is_valid)
	{
		show_alert("please enter all points.");
	}

	else
	{
		var table = document.getElementsByTagName("table")[0];
		var row = table.insertRow(-1);
				
		for (var i = 0; i < players.length; i++)
		{
			var player_points = players[i][1];
			var points = document.getElementsByTagName("input")[i].value;
			
			player_points += parseInt(points);
			players[i][1] = player_points;
			
			var cel = row.insertCell(i);
			cel.innerHTML = player_points;
			document.getElementsByTagName("input")[i].value = '';					
		}		
	}
}

function show_alert(msg)
{
	alert(msg);
}

function new_game()
{
	if(confirm("Do you want to start a new game?"))
	{
		initial();
	}
	
}

document.addEventListener("DOMContentLoaded",load);