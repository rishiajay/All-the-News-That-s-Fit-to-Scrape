// obtained code from HW #18 MongoDB NYT Scraper from class homework video
$(document).ready(function(){
    var articleContainer = $(".article-container");

    $(document).on("click", ".btn.delete", handleArticleDelete);
    $(document).on("click", ".btn.notes", handleArticleNotes);
    $(document).on("click", ".btn.save", handleNoteSave);
    $(document).on("click", ".btn.note-delete", handleNoteDelete);

    initPage();

    function initPage() {
        articleContainer.empty();
        $.get("/api/headlines?sved=true").then(function(data){
            if(data && data.length) {
                renderArticles(data);
            } else {
                renderEmpty();
            }
        });
    }

    // used to bring out articles
    function renderHeadlines(article) {
        var articlePanels = [];

        for (var i = 0; i < article.length; i++){
            articlePanels.push(createPanel(articles[i]));
        }
        // need to work on
        panel.data("_id", article._id);

        return panel;
    }

    function createPanel(article){
        var panel = 
        $(["<div class='panel panel-default'>",
        "<div class='panel-heading'>",
        "<h3>",
        article.headline,
        "Delete from Saved",
        "</a>",
        "<a class='btn btn-info notes'>Article Notes</a>",
        "</h3>",
        "</div>",
        "<div class='panel-body'>",
        article.summry,
        "</div>",
        "</div>"
        ].join(""));

        panel.data("_id", article._id);
        return panel;
    }

    function renderEmpty() {
        var emptyAlert = 
        $(["<div class='alert alert-warning text-center'>",
        "<h4>Uh Oh. Looks like we don't have any new articles.</h4>",
        "</div>",
        "<div class='panel panel-default'>",
        "<div class='panel-heading text-center'>",
        "<h3>What Would You Like to Do?</h3>",
        "</div>",
        "<div class='panel-body text-center'>",
        "<h4><a href='/'>Browse Articles</a></h4>",
        "</div>",
        "</div>"
        ].join(""));
        articleContainer.append(emptyAlert);
    }
function renderNotesList(data) {
    var notesToRender = [];
    var currentNote;
    // For articles that do not exist
    if (!data.notes.length) {
        currentNote = [
        "<li class='list-group-item'>",
        "No notes for this article yet.",
        "</li>"
        ].join("");
        notesToRender.push(currentNote);
    }
    else {
        // Go through every note that are in the database
        for (var i = 0; i < data.notes.length; i++) {
            currentNote = $([
                "<li class = 'list-group-item note'>",
                data.notes[i].noteText,
                "</li>"
            ].join(""));
            currentNote.children("button").data("_id", data.notes[i]._id);
            notesToRender.push(currentNote);
        }
    }
    // appends notesToRender into note-container
    $(".note-container").append(notesToRender);
}

function handleArticleDelete() {
    var articleToDelete = $(this).parents(".panel").data();
    // function to delete article/headline
    $.ajax({
        method: "DELETE",
        url: "/api/headlines" + articleToDelete._id
    }).then(function(data) {
        if (data.ok) {
            initPage();
        }
    });
}

// add a function

// this function is designed to save a note
function handleNoteSave() {
    var noteData;
    var newNote = $(".bootbox-body textarea").val().trim();
    if (newNote) {
        noteData = {
            _id: $(this).data("article")._id,
            noteText: newNote
        };
        $.post("/api/notes", noteData).then(function(){
            bootbox.hideAll();
        });
    }
}

function handleNoteDelete() {
    var noteToDelete = $(this).data("_id");

    $.ajax({
        url: "/api/notes" + noteToDelete,
        method: "DELETE"
    }).then(function(){
        bootbox.hideAll();
    });
}

});