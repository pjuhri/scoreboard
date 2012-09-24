'use strict';

$(function() {
    var currentRow, lastRow;
    $('#addPlayer').click(function(e) {
      var playerName = $('#playerName').val();
      var newPlayer = $('<span class="label label-success playerLabel">'+playerName+'</span>');
      newPlayer.click(function(e) {
        $(this).remove();
      });
      $('#playerLabels').append(newPlayer);
    });

    $('#savePlayers').click(function(e) {
      var tableHead = $('#scoreboard > thead > tr');
      var tableBody = $('#scoreboard > tbody > tr');
      var tricksModalBody = $('#enterTricksModal > .modal-body');
      var scoreModalBody = $('#scoreModal > .modal-body');
      var players = $('.playerLabel').map(function() {
        return $(this).text();
      });
      players.each(function(i, player) {
        var newHeader = $('<th>'+player+'</th><th>T</th>');
        tableHead.append(newHeader);
        tableBody.each(function() {
          $(this).append('<td></td><td></td>');
        });
        var trickInput = $('<div class="input-prepend">' +
                            '<span class="add-on">'+player+'</span>' +
                            '<input size="5" maxlength="1" type="text" placeholder="Tricks">' +
                            '</div>');
        tricksModalBody.append(trickInput);
        var radioButtons = $('<div class="btn-group scoreButtons">' +
                              '<button type="button" class="btn disabled">'+player+'</button>' +
                              '<button type="button" class="btn btn-success" data-toggle="button">Win</button>' +
                              '</div>');
        scoreModalBody.append(radioButtons);
        });
    });

    $('#saveTricks').click(function(e) {
      var tableBody = $('#scoreboard > tbody > tr');
      var trickInputs = $('#enterTricksModal').find('input');
      currentRow = tableBody.filter(function() {
        var secondColumn = $(this).find('td')[1]
        return $(secondColumn).text() == '' ? true : false;
      }).first();
      var trickCells = currentRow.find('td').slice(1).filter(':odd');
      trickInputs.each(function(i, trickInput) {
          var tricks = $(trickInput).val();
          var span = $('<span class="badge">'+tricks+'</span>');
          $(trickCells[i]).append(span);
          $(trickInput).val('');
      });
    });

    $('#saveScores').click(function(e) {
      var buttonGroups = $('#scoreModal > .modal-body > .scoreButtons');
      var scoreCells = currentRow.find('td').slice(1).filter(':even');
      var trickCells = currentRow.find('td').slice(1).filter(':odd');
      var isFirstRound = lastRow ? false : true;
      buttonGroups.each(function(i, buttonGroup) {
        var button = $(buttonGroup).find('button:contains("Win")');
        var wonRound = button.hasClass('active');
        var tricks = parseInt($(trickCells[i]).text());
        var score = wonRound ? 10 + tricks : 0;
        if(isFirstRound) {
          $(scoreCells[i]).text(score);
        } else {
          var lastScore = lastRow.find('td').slice(1).filter(':even')[i];
          $(scoreCells[i]).text(score + parseInt($(lastScore).text()));
        }
        button.removeClass('active');
      });
      lastRow = currentRow;
    });
})

